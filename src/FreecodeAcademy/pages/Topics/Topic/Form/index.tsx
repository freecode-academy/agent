import React, { useCallback } from 'react'
import dynamic from 'next/dynamic'

import * as yup from 'yup'

import { ResourceEditFormStyled, ResourceEditFormToolbarStyled } from './styles'

import {
  Controller,
  ControllerProps,
  FormProvider,
  useForm,
} from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/router'
import {
  ResourceCreateInput,
  ResourceFragment,
  ResourcesConnectionDocument,
  ResourceType,
  useCreateResourceMutation,
  UserStatusEnum,
  useUpdateResourceMutation,
} from 'src/gql/generated'
import { useSnackbar } from 'src/ui-kit/Snackbar'
import { TextField } from 'src/ui-kit/controls/TextField'
import { FormControl } from 'src/ui-kit/FormControl'
import { Button } from 'src/ui-kit/Button'
import { ComponentVariant } from 'src/ui-kit/interfaces'
import { ResourceBannerStyled } from '@/components/Resource/styles'
import { useAppContext } from 'src/components/AppContext'
import { makeResourceLink } from 'src/components/Link/Resource'
import { FileUploader, FileUploaderProps } from 'src/components/FileUploader'

const MarkdownEditor = dynamic(
  () => import('src/components/Markdown/Editor').then((r) => r.MarkdownEditor),
  {
    ssr: false,
  },
)

type FormData = Omit<ResourceCreateInput, 'parentId' | 'type'>

function getDefaultValues(
  resource: ResourceEditFormProps['resource'],
): FormData {
  return {
    title: resource?.name ?? '',
    description: resource?.longtitle ?? '',
    intro: resource?.intro ?? '',
    contentV3: resource?.content || '',
    // type: resource?.type ?? ResourceType.TOPIC,
    // status: resource?.status ?? ResourceStatus.PUBLISHED,
  }
}

// export interface ResourceCreateInput {
//   content: Scalars['String']['input'];
//   description?: InputMaybe<Scalars['String']['input']>;
//   intro?: InputMaybe<Scalars['String']['input']>;
//   /** Reply */
//   parentId?: InputMaybe<Scalars['ID']['input']>;
//   title?: InputMaybe<Scalars['String']['input']>;
//   type?: InputMaybe<ResourceType>;
// }

export const schema: yup.ObjectSchema<FormData> = yup.object().shape({
  title: yup.string().required(),
  description: yup.string(),
  intro: yup.string(),
  contentV3: yup.string().required(),
  type: yup
    .mixed<ResourceType>()
    .oneOf(Object.values(ResourceType))
    .label('Status'),
  image: yup.string(),
})

type ResourceEditFormProps = {
  resource: ResourceFragment | undefined
  parentId: string | null | undefined
  cancelHandler: (() => void) | undefined
}

export const ResourceEditForm: React.FC<ResourceEditFormProps> = ({
  resource,
  cancelHandler,
  parentId,
}) => {
  const { user: currentUser } = useAppContext()

  const { addMessage } = useSnackbar() || {}

  const router = useRouter()

  const [createResourceMutation, { loading: loadingCreateResource }] =
    useCreateResourceMutation({
      refetchQueries: [ResourcesConnectionDocument],
    })
  const [updateResourceMutation, { loading: loadingUpdateResource }] =
    useUpdateResourceMutation({
      refetchQueries: [ResourcesConnectionDocument],
    })

  const loading = loadingCreateResource || loadingUpdateResource

  const form = useForm<FormData>({
    defaultValues: getDefaultValues(resource),
    resolver: yupResolver(schema),
    shouldFocusError: false,
    reValidateMode: 'onChange',
    mode: 'all',
  })

  const onSubmit = useCallback(
    (event: React.SubmitEvent) => {
      event.preventDefault()

      form
        .trigger()
        .then(async (reason) => {
          if (reason === true) {
            const { ...other } = form.getValues()

            const request = resource
              ? updateResourceMutation({
                  variables: {
                    // lang: language,
                    data: {
                      ...other,
                    },
                    where: {
                      id: resource.id,
                    },
                  },
                }).then((r) => {
                  if (r.data?.response) {
                    cancelHandler?.()
                  }

                  return r
                })
              : createResourceMutation({
                  variables: {
                    // lang: language,
                    data: {
                      ...other,
                      parentId,
                    },
                  },
                }).then((r) => {
                  if (r.data?.response) {
                    router.push(makeResourceLink(r.data.response))
                  }

                  return r
                })

            request
              .then((r) => {
                const resource = r.data?.response

                if (resource) {
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
    [
      addMessage,
      createResourceMutation,
      form,
      resource,
      router,
      updateResourceMutation,
      cancelHandler,
      parentId,
    ],
  )

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
    ControllerProps<
      FormData,
      'contentV3' | 'description' | 'intro' | 'title' | 'image'
    >['render']
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

      switch (name) {
        case 'image':
          label = 'Image'

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
        case 'title':
          label = 'Title'
          break
        case 'description':
          label = 'SEO description'
          break
        case 'intro':
          label = 'Intro'
          EditorComponent = MarkdownEditor
          break
        // case 'status':
        //   label = 'Status'

        //   EditorComponent = (
        //     props: React.HtmlHTMLAttributes<HTMLSelectElement>,
        //   ) => {
        //     return (
        //       <select {...props}>
        //         {Object.values(ResourceStatus).map((n) => {
        //           return (
        //             <option key={n} value={n}>
        //               {n}
        //             </option>
        //           )
        //         })}
        //       </select>
        //     )
        //   }
        //   break
        case 'contentV3':
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
    },
    [onChangeImage],
  )

  const isActive = currentUser && currentUser.status === UserStatusEnum.ACTIVE

  return (
    <FormProvider {...form}>
      <ResourceEditFormStyled onSubmit={onSubmit}>
        {!isActive && (
          <ResourceBannerStyled>
            You cannot publish resources until you are activated
          </ResourceBannerStyled>
        )}

        <Controller name="image" render={fieldRenderer} />
        <Controller name="title" render={fieldRenderer} />
        <Controller name="description" render={fieldRenderer} />
        {/* {resource?.id && <Controller name="status" render={fieldRenderer} />} */}
        <Controller name="intro" render={fieldRenderer} />
        {/* <Controller name="intro" render={fieldRenderer} /> */}
        <Controller name="contentV3" render={fieldRenderer} />

        <ResourceEditFormToolbarStyled>
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
        </ResourceEditFormToolbarStyled>
      </ResourceEditFormStyled>
    </FormProvider>
  )
}
