import * as yup from 'yup'
import {
  Controller,
  ControllerProps,
  FormProvider,
  useForm,
} from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import {
  LearnStrategiesDocument,
  LearnStrategyCreateInput,
  LearnStrategyFragment,
  useCreateLearnStrategyMutation,
  useUpdateLearnStrategyMutation,
} from 'src/gql/generated'
import {
  LearnStrategyFormButtonsStyled,
  LearnStrategyFormStyled,
} from './styles'
import { useCallback } from 'react'
import { TextField, TextFieldProps } from 'src/ui-kit/controls/TextField'
import { FormControl } from 'src/ui-kit/FormControl'
import { Button } from 'src/ui-kit/Button'
import { ComponentVariant } from 'src/ui-kit/interfaces'
import { useSnackbar } from 'src/ui-kit/Snackbar'
import { useRouter } from 'next/router'
import { makeLearnStrategyLink } from 'src/components/Link/LearnStrategy'

type FormData = LearnStrategyCreateInput

export const schema: yup.ObjectSchema<FormData> = yup.object().shape({
  name: yup.string().required(),
  description: yup.string(),
  level: yup.number().required(),
})

function getDefaultValues(
  object: LearnStrategyFormProps['learnStrategy'],
): FormData {
  return {
    name: object?.name ?? '',
    description: object?.description ?? '',
    level: object?.level ?? 1,
  }
}

type LearnStrategyFormProps = {
  learnStrategy: LearnStrategyFragment | null | undefined
  cancelHandler: (() => void) | undefined
}

export const LearnStrategyForm: React.FC<LearnStrategyFormProps> = ({
  learnStrategy: object,
  cancelHandler,
}) => {
  const { addMessage } = useSnackbar() || {}

  const router = useRouter()

  const form = useForm<FormData>({
    defaultValues: getDefaultValues(object),
    resolver: yupResolver(schema),
    shouldFocusError: false,
    reValidateMode: 'onChange',
    mode: 'all',
  })

  const fieldRenderer = useCallback<
    ControllerProps<FormData, 'name' | 'description' | 'level'>['render']
  >(({ field: { name, value, onChange, onBlur }, fieldState: { error } }) => {
    let label: string
    const helperText = undefined
    const EditorComponent: typeof TextField = TextField

    let type: TextFieldProps['type'] = 'text'

    switch (name) {
      case 'name':
        label = 'Name'
        break
      case 'description':
        label = 'Description'
        break
      case 'level':
        label = 'Level'
        type = 'number'
        break
    }

    return (
      <FormControl
        key={name}
        label={label}
        helperText={error ? error.message : helperText}
        error={!!error}
      >
        <EditorComponent
          value={value || ''}
          onChange={onChange}
          onBlur={onBlur}
          type={type}
        />
      </FormControl>
    )
  }, [])

  const [create, { loading: createLoading }] = useCreateLearnStrategyMutation({
    refetchQueries: [LearnStrategiesDocument],
  })
  const [update, { loading: updateLoading }] = useUpdateLearnStrategyMutation({
    refetchQueries: [LearnStrategiesDocument],
  })

  const loading = createLoading || updateLoading

  const onSubmit = useCallback(
    (event: React.FormEvent) => {
      event.preventDefault()

      form
        .trigger()
        .then(async (reason) => {
          if (reason === true) {
            const { ...other } = form.getValues()

            const request = object
              ? update({
                  variables: {
                    data: {
                      ...other,
                    },
                    where: {
                      id: object.id,
                    },
                  },
                })
              : create({
                  variables: {
                    data: {
                      ...other,
                    },
                  },
                }).then((r) => {
                  if (r.data?.response) {
                    router.push(makeLearnStrategyLink(r.data.response))
                  }

                  return r
                })

            request
              .then((r) => {
                const object = r.data?.response

                if (object) {
                  addMessage?.('Success', {
                    variant: 'success',
                  })
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
    [addMessage, create, form, object, router, update],
  )

  return (
    <FormProvider {...form}>
      <LearnStrategyFormStyled onSubmit={onSubmit}>
        <h3>{object ? 'Edit' : 'Create'} learn strategy</h3>

        <Controller name="name" render={fieldRenderer} />
        <Controller name="description" render={fieldRenderer} />
        <Controller name="level" render={fieldRenderer} />

        <LearnStrategyFormButtonsStyled>
          <Button onClick={cancelHandler}>Cancel</Button>
          <Button variant={ComponentVariant.PRIMARY} disabled={loading}>
            Save
          </Button>
        </LearnStrategyFormButtonsStyled>
      </LearnStrategyFormStyled>
    </FormProvider>
  )
}
