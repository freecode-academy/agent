import React, { useCallback } from 'react'
import dynamic from 'next/dynamic'

import * as yup from 'yup'

import { OfferEditFormStyled, OfferEditFormToolbarStyled } from './styles'

import {
  Controller,
  ControllerProps,
  FormProvider,
  useForm,
} from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/router'
import {
  OfferCreateInput,
  OfferFragment,
  OffersConnectionDocument,
  useCreateOfferMutation,
  UserStatusEnum,
  useUpdateOfferMutation,
} from 'src/gql/generated'
import { useSnackbar } from 'src/ui-kit/Snackbar'
import { TextField } from 'src/ui-kit/controls/TextField'
import { FormControl } from 'src/ui-kit/FormControl'
import { Button } from 'src/ui-kit/Button'
import { ComponentVariant } from 'src/ui-kit/interfaces'
import { OfferBannerStyled } from 'src/components/Offer/styles'
import { useAppContext } from 'src/components/AppContext'
import { useApolloClient } from '@apollo/client/react'
import { FileUploader, FileUploaderProps } from 'src/components/FileUploader'

const MarkdownEditor = dynamic(
  () => import('src/components/Markdown/Editor').then((r) => r.MarkdownEditor),
  {
    ssr: false,
  },
)

type FormData = Omit<OfferCreateInput, 'parentId'>

function getDefaultValues(offer: OfferEditFormProps['offer']): FormData {
  return {
    title: offer?.title ?? '',
    description: offer?.description ?? '',
    intro: offer?.intro ?? '',
    content: offer?.content ?? '',
    image: offer?.image ?? '',
    published: offer?.published ?? true,
  }
}

export const schema: yup.ObjectSchema<FormData> = yup.object().shape({
  title: yup.string().required(),
  description: yup.string(),
  intro: yup.string(),
  content: yup.string(),
  image: yup.string(),
  published: yup.boolean(),
})

type OfferEditFormProps = {
  offer: OfferFragment | undefined
  cancelHandler: (() => void) | undefined
}

export const OfferEditForm: React.FC<OfferEditFormProps> = ({
  offer,
  cancelHandler,
}) => {
  const { user: currentUser } = useAppContext()

  const { addMessage } = useSnackbar() || {}

  const router = useRouter()

  const [createOfferMutation, { loading: loadingCreateOffer }] =
    useCreateOfferMutation({
      refetchQueries: [OffersConnectionDocument],
    })
  const [updateOfferMutation, { loading: loadingUpdateOffer }] =
    useUpdateOfferMutation({
      refetchQueries: [OffersConnectionDocument],
    })

  const client = useApolloClient()

  const loading = loadingCreateOffer || loadingUpdateOffer

  const form = useForm<FormData>({
    defaultValues: getDefaultValues(offer),
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

            const request = offer
              ? updateOfferMutation({
                  variables: {
                    // lang: language,
                    data: {
                      ...other,
                    },
                    where: {
                      id: offer.id,
                    },
                  },
                })
              : createOfferMutation({
                  variables: {
                    // lang: language,
                    data: {
                      ...other,
                    },
                  },
                })

            request
              .then((r) => {
                const offer = r.data?.response

                if (offer) {
                  addMessage?.('Success', {
                    variant: 'success',
                  })

                  cancelHandler?.()

                  client.resetStore().catch(console.error)

                  router.push(`/offers/${offer.id}`)
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
      createOfferMutation,
      form,
      offer,
      router,
      updateOfferMutation,
      cancelHandler,
      client,
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
      'content' | 'description' | 'intro' | 'title' | 'image'
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
        case 'title':
          label = 'Title'
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
      <OfferEditFormStyled onSubmit={onSubmit}>
        {!isActive && (
          <OfferBannerStyled>
            You cannot publish offers until you are activated
          </OfferBannerStyled>
        )}

        <Controller name="title" render={fieldRenderer} />
        <Controller name="image" render={fieldRenderer} />
        <Controller name="description" render={fieldRenderer} />
        <Controller name="intro" render={fieldRenderer} />
        <Controller name="content" render={fieldRenderer} />

        <OfferEditFormToolbarStyled>
          {cancelHandler && (
            <Button
              variant={ComponentVariant.SECONDARY}
              type="button"
              onClick={cancelHandler}
            >
              Отмена
            </Button>
          )}

          <Button
            variant={ComponentVariant.SUCCESS}
            type="submit"
            disabled={!isActive || loading}
          >
            Сохранить
          </Button>
        </OfferEditFormToolbarStyled>
      </OfferEditFormStyled>
    </FormProvider>
  )
}
