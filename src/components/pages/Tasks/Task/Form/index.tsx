import React, { useCallback } from 'react'
import dynamic from 'next/dynamic'

import * as yup from 'yup'

import { TaskEditFormStyled, TaskEditFormToolbarStyled } from './styles'

import {
  Controller,
  ControllerProps,
  FormProvider,
  useForm,
} from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/router'
import {
  TaskCreateInput,
  TaskFragment,
  useCreateTaskMutation,
  UserStatusEnum,
  useUpdateTaskMutation,
} from 'src/gql/generated'
import { useSnackbar } from 'src/ui-kit/Snackbar'
import { TextField } from 'src/ui-kit/controls/TextField'
import { FormControl } from 'src/ui-kit/FormControl'
import { Button } from 'src/ui-kit/Button'
import { ComponentVariant } from 'src/ui-kit/interfaces'
import { useAppContext } from 'src/components/AppContext'
import { useApolloClient } from '@apollo/client/react'
// import { FileUploader, FileUploaderProps } from 'src/components/FileUploader'
import { OfferBannerStyled } from 'src/components/Offer/styles'

const MarkdownEditor = dynamic(
  () => import('src/components/Markdown/Editor').then((r) => r.MarkdownEditor),
  {
    ssr: false,
  },
)

type FormData = Omit<
  TaskCreateInput,
  'parentId' | 'assigneeId' | 'startDatePlaning' | 'endDatePlaning'
>

type getDefaultValuesProps = {
  task: TaskEditFormProps['task']
  projectId: string | undefined
}

function getDefaultValues({
  task,
  projectId,
}: getDefaultValuesProps): FormData {
  return {
    name: task?.title ?? '',
    description: task?.description ?? '',
    content: task?.content ?? '',
    projectId: task ? (task?.projectId ?? undefined) : projectId,
    // intro: task?.intro ?? '',
    // image: task?.image ?? '',
    // published: task?.published ?? true,
  }
}

export const schema: yup.ObjectSchema<FormData> = yup.object().shape({
  name: yup.string().required(),
  description: yup.string(),
  content: yup.string(),
  projectId: yup.string(),
  // intro: yup.string(),
  // image: yup.string(),
  // published: yup.boolean(),
})

type TaskEditFormProps = {
  task: TaskFragment | undefined
  cancelHandler: (() => void) | undefined
}

export const TaskEditForm: React.FC<TaskEditFormProps> = ({
  task,
  cancelHandler,
}) => {
  const { user: currentUser } = useAppContext()

  const { addMessage } = useSnackbar() || {}

  const router = useRouter()

  const [createTaskMutation, { loading: loadingCreateTask }] =
    useCreateTaskMutation({
      refetchQueries: [],
    })
  const [updateTaskMutation, { loading: loadingUpdateTask }] =
    useUpdateTaskMutation({
      refetchQueries: [],
    })

  const client = useApolloClient()

  const loading = loadingCreateTask || loadingUpdateTask

  const form = useForm<FormData>({
    defaultValues: getDefaultValues({
      task,
      projectId:
        typeof router.query.projectId === 'string' && router.query.projectId
          ? router.query.projectId
          : undefined,
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

            const request = task
              ? updateTaskMutation({
                  variables: {
                    // lang: language,
                    data: {
                      ...other,
                    },
                    where: {
                      id: task.id,
                    },
                  },
                })
              : createTaskMutation({
                  variables: {
                    // lang: language,
                    data: {
                      ...other,
                    },
                  },
                })

            request
              .then((r) => {
                const task = r.data?.response

                if (task) {
                  addMessage?.('Success', {
                    variant: 'success',
                  })

                  cancelHandler?.()

                  client.resetStore().catch(console.error)

                  router.push(`/tasks/${task.id}`)
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
      createTaskMutation,
      form,
      task,
      router,
      updateTaskMutation,
      cancelHandler,
      client,
    ],
  )

  // const onChangeImage = useCallback<NonNullable<FileUploaderProps['onChange']>>(
  //   (file) => {
  //     if (file?.path) {
  //       form.setValue('image', file.path, {
  //         shouldValidate: true,
  //       })
  //     }
  //   },
  //   [form],
  // )

  const fieldRenderer = useCallback<
    ControllerProps<FormData, 'content' | 'description' | 'name'>['render']
  >(({ field: { name, value, onChange, onBlur }, fieldState: { error } }) => {
    let label: string
    const helperText = undefined
    let EditorComponent:
      | typeof TextField
      | typeof MarkdownEditor
      | React.FC<{
          value: string
        }>
      | React.FC<React.HtmlHTMLAttributes<HTMLSelectElement>> = TextField

    switch (name) {
      case 'name':
        label = 'Title'
        break
      case 'description':
        label = 'SEO description'
        break
      // case 'image':
      //   label = 'Main image'

      //   EditorComponent = ({ value }: { value: string }) => {
      //     return (
      //       <>
      //         <FileUploader
      //           value={value ? `/images/resized/middle/${value}` : ''}
      //           onChange={onChangeImage}
      //         />
      //       </>
      //     )
      //   }
      //   break
      // case 'intro':
      //   label = 'Intro'
      //   EditorComponent = MarkdownEditor
      //   break
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
        <EditorComponent
          value={value || ''}
          onChange={onChange}
          onBlur={onBlur}
        />
      </FormControl>
    )
  }, [])

  const isActive = currentUser && currentUser.status === UserStatusEnum.ACTIVE

  return (
    <FormProvider {...form}>
      <TaskEditFormStyled onSubmit={onSubmit}>
        {!isActive && (
          <OfferBannerStyled>
            You cannot publish tasks until you are activated
          </OfferBannerStyled>
        )}

        <Controller name="name" render={fieldRenderer} />
        {/* <Controller name="image" render={fieldRenderer} /> */}
        <Controller name="description" render={fieldRenderer} />
        {/* <Controller name="intro" render={fieldRenderer} /> */}
        <Controller name="content" render={fieldRenderer} />

        <TaskEditFormToolbarStyled>
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
        </TaskEditFormToolbarStyled>
      </TaskEditFormStyled>
    </FormProvider>
  )
}
