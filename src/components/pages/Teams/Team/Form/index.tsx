import * as yup from 'yup'
import {
  Controller,
  ControllerProps,
  FormProvider,
  useForm,
} from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import {
  TeamCreateInput,
  TeamDetailedFragment,
  TeamStatus,
  useCreateTeamMutation,
  useUpdateTeamMutation,
} from 'src/gql/generated'
import { TeamFormButtonsStyled, TeamFormStyled } from './styles'
import { useCallback } from 'react'
import { TextField, TextFieldProps } from 'src/ui-kit/controls/TextField'
import { FormControl } from 'src/ui-kit/FormControl'
import { Button } from 'src/ui-kit/Button'
import { ComponentVariant } from 'src/ui-kit/interfaces'
import { useSnackbar } from 'src/ui-kit/Snackbar'
import { useRouter } from 'next/router'
import { makeTeamLink } from 'src/components/Link/Team'

import dynamic from 'next/dynamic'
import { useApolloClient } from '@apollo/client/react'
import { FileUploader, FileUploaderProps } from 'src/components/FileUploader'

const MarkdownEditor = dynamic(
  () => import('src/components/Markdown/Editor').then((r) => r.MarkdownEditor),
  {
    ssr: false,
  },
)

type FormData = TeamCreateInput

type FieldName = keyof FormData

export const schema: yup.ObjectSchema<FormData> = yup.object().shape({
  name: yup.string().required(),
  address: yup.string(),
  website: yup.string(),
  content: yup.string(),
  description: yup.string(),
  intro: yup.string(),
  image: yup.string(),
  status: yup
    .mixed<TeamStatus>()
    .oneOf(Object.values(TeamStatus))
    .required()
    .label('Status'),
})

function getDefaultValues(object: TeamFormProps['team']): FormData {
  return {
    name: object?.title ?? '',
    address: object?.address ?? '',
    website: object?.website ?? '',
    content: object?.content ?? '',
    description: object?.description ?? '',
    intro: object?.intro ?? '',
    image: object?.image ?? '',
    status: object?.status ?? TeamStatus.ACTIVE,
  }
}

type TeamFormProps = {
  team: TeamDetailedFragment | null | undefined
  cancelHandler: (() => void) | undefined
}

export const TeamForm: React.FC<TeamFormProps> = ({
  team: object,
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

  const onChangeImage = useCallback<NonNullable<FileUploaderProps['onChange']>>(
    (file) => {
      if (file?.path) {
        form.setValue('image', file.path, {
          shouldValidate: true,
        })
      }
    },
    [form],
  )

  const fieldRenderer = useCallback<
    ControllerProps<FormData, FieldName>['render']
  >(
    ({ field: { name, value, onChange, onBlur }, fieldState: { error } }) => {
      let label: string
      const helperText = undefined
      let EditorComponent:
        | typeof TextField
        | typeof MarkdownEditor
        | React.FC<{
            value: string
          }>
        | React.FC<React.HtmlHTMLAttributes<HTMLSelectElement>> = TextField

      const type: TextFieldProps['type'] | undefined = undefined

      switch (name) {
        case 'name':
          label = 'Name'
          break

        case 'description':
          label = 'SEO description'
          break

        case 'image':
          label = 'Main image'

          EditorComponent = ({ value }: { value: string }) => {
            return (
              <>
                <FileUploader
                  value={value ? `/images/resized/middle/${value}` : ''}
                  onChange={onChangeImage}
                />
              </>
            )
          }
          break

        case 'address':
          label = 'Address'
          break

        case 'website':
          label = 'Website url'
          break

        case 'status':
          label = 'Status'

          EditorComponent = (
            props: React.HtmlHTMLAttributes<HTMLSelectElement>,
          ) => {
            return (
              <select {...props}>
                {Object.values(TeamStatus).map((n) => {
                  return (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  )
                })}
              </select>
            )
          }
          break

        case 'intro':
          label = 'Intro'
          EditorComponent = MarkdownEditor
          break
        case 'content':
          label = 'Content'
          EditorComponent = MarkdownEditor
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
    },
    [onChangeImage],
  )

  const [create, { loading: createLoading }] = useCreateTeamMutation()
  const [update, { loading: updateLoading }] = useUpdateTeamMutation()

  const loading = createLoading || updateLoading

  const onSubmit = useCallback(
    (event: React.FormEvent) => {
      event.preventDefault()

      form
        .trigger()
        .then(async (reason) => {
          if (reason === true) {
            const { name, ...other } = form.getValues()

            const commonData = {
              name,
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
                    router.push(makeTeamLink(r.data.response))
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
      <TeamFormStyled onSubmit={onSubmit}>
        <h3>{object ? 'Edit' : 'Create'} team</h3>

        <Controller name="status" render={fieldRenderer} />
        <Controller name="name" render={fieldRenderer} />
        <Controller name="image" render={fieldRenderer} />
        <Controller name="description" render={fieldRenderer} />
        <Controller name="address" render={fieldRenderer} />
        <Controller name="website" render={fieldRenderer} />
        <Controller name="intro" render={fieldRenderer} />
        <Controller name="content" render={fieldRenderer} />

        <TeamFormButtonsStyled>
          <Button onClick={cancelHandler}>Cancel</Button>
          <Button variant={ComponentVariant.PRIMARY} disabled={loading}>
            Save
          </Button>
        </TeamFormButtonsStyled>
      </TeamFormStyled>
    </FormProvider>
  )
}
