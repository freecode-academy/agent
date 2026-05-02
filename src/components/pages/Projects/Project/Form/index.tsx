import React, { useCallback } from 'react'
import dynamic from 'next/dynamic'

import * as yup from 'yup'

import { ProjectEditFormStyled, ProjectEditFormToolbarStyled } from './styles'

import {
  Controller,
  ControllerProps,
  FormProvider,
  useForm,
} from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/router'
import {
  ProjectCreateInput,
  ProjectFragment,
  useCreateProjectMutation,
  UserStatusEnum,
  useUpdateProjectMutation,
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
import { makeProjectLink } from 'src/components/Link/Project'

const MarkdownEditor = dynamic(
  () => import('src/components/Markdown/Editor').then((r) => r.MarkdownEditor),
  {
    ssr: false,
  },
)

type FormData = Omit<ProjectCreateInput, 'parentId' | 'status'>

type getDefaultValuesProps = {
  project: ProjectEditFormProps['project']
}

// export interface ProjectCreateInput {
//   content: Scalars['String']['input'];
//   description?: InputMaybe<Scalars['String']['input']>;
//   /** Reply */
//   parentId?: InputMaybe<Scalars['ID']['input']>;
//   status?: InputMaybe<ProjectStatus>;
//   title: Scalars['String']['input'];
// }

function getDefaultValues({ project }: getDefaultValuesProps): FormData {
  return {
    title: project?.name ?? '',
    description: project?.description ?? '',
    content: project?.content ?? '',
  }
}

export const schema: yup.ObjectSchema<FormData> = yup.object().shape({
  title: yup.string().required(),
  description: yup.string(),
  content: yup.string().required(),
})

type ProjectEditFormProps = {
  project: ProjectFragment | undefined
  cancelHandler: (() => void) | undefined
}

export const ProjectEditForm: React.FC<ProjectEditFormProps> = ({
  project,
  cancelHandler,
}) => {
  const { user: currentUser } = useAppContext()

  const { addMessage } = useSnackbar() || {}

  const router = useRouter()

  const [createProjectMutation, { loading: loadingCreateProject }] =
    useCreateProjectMutation({
      refetchQueries: [],
    })
  const [updateProjectMutation, { loading: loadingUpdateProject }] =
    useUpdateProjectMutation({
      refetchQueries: [],
    })

  const client = useApolloClient()

  const loading = loadingCreateProject || loadingUpdateProject

  const form = useForm<FormData>({
    defaultValues: getDefaultValues({
      project,
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

            const request = project
              ? updateProjectMutation({
                  variables: {
                    // lang: language,
                    data: {
                      ...other,
                    },
                    where: {
                      id: project.id,
                    },
                  },
                })
              : createProjectMutation({
                  variables: {
                    // lang: language,
                    data: {
                      ...other,
                    },
                  },
                })

            request
              .then((r) => {
                const project = r.data?.response

                if (project) {
                  addMessage?.('Success', {
                    variant: 'success',
                  })

                  cancelHandler?.()

                  client.resetStore().catch(console.error)

                  router.push(makeProjectLink(project))
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
      client,
      createProjectMutation,
      form,
      project,
      router,
      updateProjectMutation,
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
    ControllerProps<FormData, 'content' | 'description' | 'title'>['render']
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
      case 'title':
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
      <ProjectEditFormStyled onSubmit={onSubmit}>
        {!isActive && (
          <OfferBannerStyled>
            You cannot publish projects until you are activated
          </OfferBannerStyled>
        )}

        <Controller name="title" render={fieldRenderer} />
        {/* <Controller name="image" render={fieldRenderer} /> */}
        <Controller name="description" render={fieldRenderer} />
        {/* <Controller name="intro" render={fieldRenderer} /> */}
        <Controller name="content" render={fieldRenderer} />

        <ProjectEditFormToolbarStyled>
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
        </ProjectEditFormToolbarStyled>
      </ProjectEditFormStyled>
    </FormProvider>
  )
}
