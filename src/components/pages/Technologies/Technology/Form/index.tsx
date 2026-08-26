import * as yup from 'yup'
import {
  Controller,
  ControllerProps,
  FormProvider,
  useForm,
} from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import {
  TechnologyCreateInput,
  TechnologyFragment,
  useCreateTechnologyMutation,
  useUpdateTechnologyMutation,
} from 'src/gql/generated'
import { TechnologyFormButtonsStyled, TechnologyFormStyled } from './styles'
import { useCallback } from 'react'
import { TextField, TextFieldProps } from 'src/ui-kit/controls/TextField'
import { FormControl } from 'src/ui-kit/FormControl'
import { Button } from 'src/ui-kit/Button'
import { ComponentVariant } from 'src/ui-kit/interfaces'
import { useSnackbar } from 'src/ui-kit/Snackbar'
import { useRouter } from 'next/router'
import { makeTechnologyLink } from 'src/components/Link/Technology'

import dynamic from 'next/dynamic'
import { useApolloClient } from '@apollo/client/react'

const MarkdownEditor = dynamic(
  () => import('src/components/Markdown/Editor').then((r) => r.MarkdownEditor),
  {
    ssr: false,
  },
)

type FormData = TechnologyCreateInput

type FieldName = keyof FormData

export const schema: yup.ObjectSchema<FormData> = yup.object().shape({
  name: yup.string().required(),
  description: yup.string(),
  site_url: yup.string(),
  content: yup.string(),
  level1hours: yup.number().nullable(),
  level2hours: yup.number().nullable(),
  level3hours: yup.number().nullable(),
  level4hours: yup.number().nullable(),
  level5hours: yup.number().nullable(),
})

function getDefaultValues(object: TechnologyFormProps['technology']): FormData {
  return {
    name: object?.name ?? '',
    description: object?.description ?? '',
    site_url: object?.site_url ?? '',
    content: object?.content ?? '',
    level1hours: object?.level1hours ?? null,
    level2hours: object?.level2hours ?? null,
    level3hours: object?.level3hours ?? null,
    level4hours: object?.level4hours ?? null,
    level5hours: object?.level5hours ?? null,
  }
}

type TechnologyFormProps = {
  technology: TechnologyFragment | null | undefined
  cancelHandler: (() => void) | undefined
}

export const TechnologyForm: React.FC<TechnologyFormProps> = ({
  technology: object,
  cancelHandler,
}) => {
  const { addMessage } = useSnackbar() || {}

  const router = useRouter()

  const client = useApolloClient()

  const form = useForm<FormData>({
    defaultValues: getDefaultValues(object),
    resolver: yupResolver(schema),
    shouldFocusError: false,
    reValidateMode: 'onChange',
    mode: 'all',
  })

  const fieldRenderer = useCallback<
    ControllerProps<FormData, FieldName>['render']
  >(({ field: { name, value, onChange, onBlur }, fieldState: { error } }) => {
    let label: string
    const helperText = undefined
    let EditorComponent: typeof TextField | typeof MarkdownEditor = TextField

    let type: TextFieldProps['type'] = 'text'

    switch (name) {
      case 'name':
        label = 'Name'
        break

      case 'description':
        label = 'Description'
        break

      case 'site_url':
        label = 'Site URL'
        break

      case 'content':
        label = 'Content'
        EditorComponent = MarkdownEditor
        break

      case 'level1hours':
        label = 'Level 1 hours'
        type = 'number'
        break

      case 'level2hours':
        label = 'Level 2 hours'
        type = 'number'
        break

      case 'level3hours':
        label = 'Level 3 hours'
        type = 'number'
        break

      case 'level4hours':
        label = 'Level 4 hours'
        type = 'number'
        break

      case 'level5hours':
        label = 'Level 5 hours'
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
          value={value?.toString() ?? ''}
          onChange={onChange}
          onBlur={onBlur}
          type={type}
        />
      </FormControl>
    )
  }, [])

  const [create, { loading: createLoading }] = useCreateTechnologyMutation()
  const [update, { loading: updateLoading }] = useUpdateTechnologyMutation()

  const loading = createLoading || updateLoading

  const onSubmit = useCallback(
    (event: React.SubmitEvent) => {
      event.preventDefault()

      form
        .trigger()
        .then(async (reason) => {
          if (reason === true) {
            const {
              name,
              level1hours,
              level2hours,
              level3hours,
              level4hours,
              level5hours,
              ...other
            } = form.getValues()

            const commonData = {
              name,

              level1hours: level1hours
                ? parseInt(level1hours.toString())
                : undefined,
              level2hours: level2hours
                ? parseInt(level2hours.toString())
                : undefined,
              level3hours: level3hours
                ? parseInt(level3hours.toString())
                : undefined,
              level4hours: level4hours
                ? parseInt(level4hours.toString())
                : undefined,
              level5hours: level5hours
                ? parseInt(level5hours.toString())
                : undefined,
              ...other,
            } satisfies FormData

            const request = object
              ? update({
                  variables: {
                    data: {
                      ...commonData,
                    },
                    where: {
                      id: object.id,
                    },
                  },
                }).then((r) => {
                  if (r.data?.response) {
                    cancelHandler?.()
                  }

                  return r
                })
              : create({
                  variables: {
                    data: {
                      ...commonData,
                    },
                  },
                }).then((r) => {
                  if (r.data?.response) {
                    router.push(makeTechnologyLink(r.data.response))
                  }

                  return r
                })

            request
              .then((r) => {
                const result = r.data?.response

                if (result) {
                  addMessage?.('Success', {
                    variant: 'success',
                  })

                  client.resetStore().catch(console.error)
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
    [addMessage, cancelHandler, client, create, form, object, router, update],
  )

  return (
    <FormProvider {...form}>
      <TechnologyFormStyled onSubmit={onSubmit}>
        <h3>{object ? 'Edit' : 'Create'} technology</h3>

        <Controller name="name" render={fieldRenderer} />
        <Controller name="description" render={fieldRenderer} />
        <Controller name="site_url" render={fieldRenderer} />
        <Controller name="content" render={fieldRenderer} />
        <Controller name="level1hours" render={fieldRenderer} />
        <Controller name="level2hours" render={fieldRenderer} />
        <Controller name="level3hours" render={fieldRenderer} />
        <Controller name="level4hours" render={fieldRenderer} />
        <Controller name="level5hours" render={fieldRenderer} />

        <TechnologyFormButtonsStyled>
          <Button onClick={cancelHandler}>Cancel</Button>
          <Button variant={ComponentVariant.PRIMARY} disabled={loading}>
            Save
          </Button>
        </TechnologyFormButtonsStyled>
      </TechnologyFormStyled>
    </FormProvider>
  )
}
