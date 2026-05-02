import React, { useCallback } from 'react'
import dynamic from 'next/dynamic'

import * as yup from 'yup'

import {
  TaskWorkLogEditFormStyled,
  TaskWorkLogEditFormToolbarStyled,
} from './styles'

import {
  Controller,
  ControllerProps,
  FormProvider,
  useForm,
} from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import {
  TaskWorkLogCreateInput,
  TaskWorkLogFragment,
  useCreateTaskWorkLogMutation,
  UserStatusEnum,
  useUpdateTaskWorkLogMutation,
} from 'src/gql/generated'
import { useSnackbar } from 'src/ui-kit/Snackbar'
import { FormControl } from 'src/ui-kit/FormControl'
import { Button } from 'src/ui-kit/Button'
import { ComponentVariant } from 'src/ui-kit/interfaces'
import { useAppContext } from 'src/components/AppContext'
import { OfferBannerStyled } from 'src/components/Offer/styles'

const MarkdownEditor = dynamic(
  () => import('src/components/Markdown/Editor').then((r) => r.MarkdownEditor),
  {
    ssr: false,
  },
)

type FormData = TaskWorkLogCreateInput

type getDefaultValuesProps = {
  taskWorkLog: TaskWorkLogEditFormProps['taskWorkLog']
  taskId: string
}

function getDefaultValues({
  taskWorkLog,
  taskId,
}: getDefaultValuesProps): FormData {
  return {
    content: taskWorkLog?.content ?? '',
    taskId: taskWorkLog?.taskId ?? taskId,
  }
}

export const schema: yup.ObjectSchema<FormData> = yup.object().shape({
  content: yup.string().required(),
  taskId: yup.string().required(),
})

type TaskWorkLogEditFormProps = {
  taskId: string
  taskWorkLog: TaskWorkLogFragment | undefined
  cancelHandler: (() => void) | undefined
  onSuccess?: (taskWorkLog: TaskWorkLogFragment) => void
}

export const TaskWorkLogEditForm: React.FC<TaskWorkLogEditFormProps> = ({
  taskId,
  taskWorkLog,
  cancelHandler,
  onSuccess,
}) => {
  const { user: currentUser } = useAppContext()

  const { addMessage } = useSnackbar() || {}

  const [createTaskWorkLogMutation, { loading: loadingCreateTaskWorkLog }] =
    useCreateTaskWorkLogMutation({
      refetchQueries: [],
    })
  const [updateTaskWorkLogMutation, { loading: loadingUpdateTaskWorkLog }] =
    useUpdateTaskWorkLogMutation({
      refetchQueries: [],
    })

  const loading = loadingCreateTaskWorkLog || loadingUpdateTaskWorkLog

  const form = useForm<FormData>({
    defaultValues: getDefaultValues({
      taskWorkLog,
      taskId,
    }),
    resolver: yupResolver(schema),
    shouldFocusError: false,
    reValidateMode: 'onChange',
    mode: 'all',
  })

  const onSubmit = useCallback(
    (event: React.FormEvent) => {
      event.preventDefault()

      form
        .trigger()
        .then(async (reason) => {
          if (reason === true) {
            const { ...other } = form.getValues()

            const request = taskWorkLog
              ? updateTaskWorkLogMutation({
                  variables: {
                    data: {
                      ...other,
                    },
                    where: {
                      id: taskWorkLog.id,
                    },
                  },
                })
              : createTaskWorkLogMutation({
                  variables: {
                    data: {
                      ...other,
                    },
                  },
                })

            request
              .then((r) => {
                const taskWorkLog = r.data?.response

                if (taskWorkLog) {
                  addMessage?.('Success', {
                    variant: 'success',
                  })

                  cancelHandler?.()

                  onSuccess?.(taskWorkLog)
                } else {
                  addMessage?.('Error', { variant: 'error' })
                }
              })
              .catch((error) => {
                const errorMessage = error.message || 'Request error'
                addMessage?.(errorMessage, { variant: 'error' })
              })
          } else {
            console.error('Form errors', form.formState.errors)

            const errorMessage = 'Please, check form'
            addMessage?.(errorMessage, { variant: 'warning' })
          }
        })
        .catch((error) => {
          console.error(error)
          addMessage?.('Unexpected error', {
            variant: 'error',
          })
        })
    },
    [
      addMessage,
      cancelHandler,
      createTaskWorkLogMutation,
      form,
      onSuccess,
      taskWorkLog,
      updateTaskWorkLogMutation,
    ],
  )

  const fieldRenderer = useCallback<
    ControllerProps<FormData, 'content'>['render']
  >(({ field: { name, value, onChange }, fieldState: { error } }) => {
    let label: string
    const helperText = undefined
    let EditorComponent: typeof MarkdownEditor

    switch (name) {
      case 'content':
        label = 'Content'
        EditorComponent = MarkdownEditor
        break
    }

    return (
      <FormControl
        label={label}
        helperText={error ? error.message : helperText}
        error={!!error}
      >
        <EditorComponent value={value || ''} onChange={onChange} />
      </FormControl>
    )
  }, [])

  const isActive = currentUser && currentUser.status === UserStatusEnum.ACTIVE

  return (
    <FormProvider {...form}>
      <TaskWorkLogEditFormStyled onSubmit={onSubmit}>
        {!isActive && (
          <OfferBannerStyled>
            You cannot publish taskTaskWorkLogs until you are activated
          </OfferBannerStyled>
        )}

        <Controller name="content" render={fieldRenderer} />

        <TaskWorkLogEditFormToolbarStyled>
          {cancelHandler && (
            <Button
              variant={ComponentVariant.SECONDARY}
              type="button"
              onClick={cancelHandler}
            >
              Cancel
            </Button>
          )}

          <Button
            variant={ComponentVariant.SUCCESS}
            type="submit"
            disabled={!isActive || loading}
          >
            Save
          </Button>
        </TaskWorkLogEditFormToolbarStyled>
      </TaskWorkLogEditFormStyled>
    </FormProvider>
  )
}
