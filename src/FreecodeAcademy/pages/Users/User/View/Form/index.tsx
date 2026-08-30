import { UserFragment, useUpdateCurrentUserMutation } from 'src/gql/generated'
import { UserEditFormStyled } from './styles'
import {
  Controller,
  ControllerProps,
  FormProvider,
  useForm,
} from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { userEditSchema, UserFormData } from './interfaces'
import React, { useCallback } from 'react'
import dynamic from 'next/dynamic'
import { useSnackbar } from 'src/ui-kit/Snackbar'
import { TextField } from 'src/ui-kit/controls/TextField'
import { FormControl } from 'src/ui-kit/FormControl'
import { Button } from 'src/ui-kit/Button'
import { ComponentVariant } from 'src/ui-kit/interfaces'
import { FileUploader, FileUploaderProps } from 'src/components/FileUploader'
import { PasswordField } from 'src/ui-kit/controls/PasswordField'
import { useLexicon } from 'src/Custom/Lexicon'
import { userEditFormLexicon } from './lexicon'

const MarkdownEditor = dynamic(() => import('src/components/Markdown/Editor'), {
  ssr: false,
})

function getDefaultValues(user: UserEditFormProps['user']): UserFormData {
  return {
    username: user?.username ?? '',
    fullname: user?.fullname ?? '',
    image: user?.image ?? '',
    content: user?.content ?? '',
    intro: user?.intro ?? '',
  }
}

type UserEditFormProps = {
  user: UserFragment
  closeForm?: () => void
}

export const UserEditForm: React.FC<UserEditFormProps> = ({
  user,
  closeForm,
  ...other
}) => {
  const { t } = useLexicon(userEditFormLexicon)
  const { addMessage } = useSnackbar() || {}

  const form = useForm<UserFormData>({
    defaultValues: getDefaultValues(user),
    mode: 'all',
    reValidateMode: 'onChange',
    resolver: yupResolver(userEditSchema),
  })

  const [updateCurrentUserMutation, { loading: updateUserInRequest }] =
    useUpdateCurrentUserMutation()

  const inRequest = updateUserInRequest

  const onSubmit = useCallback(
    (event: React.SubmitEvent) => {
      event.preventDefault()

      form
        .trigger()
        .then((reason) => {
          if (reason === true) {
            const { password, ...other } = form.getValues()

            const request = updateCurrentUserMutation({
              variables: {
                data: {
                  ...other,
                  password: password || undefined,
                },
              },
            })

            request
              .then((r) => {
                const data = r.data?.response

                if (data) {
                  addMessage?.(t('userEditForm.messages.dataSaved'), {
                    variant: 'success',
                  })

                  form.reset(getDefaultValues(data))
                  closeForm?.()
                } else {
                  addMessage?.(t('userEditForm.messages.noDataReceived'), {
                    variant: 'error',
                  })
                }
              })
              .catch((error) => {
                const errorMessage =
                  error.message || t('userEditForm.messages.requestError')
                addMessage?.(errorMessage, { variant: 'error' })
              })
          } else {
            console.error(form.formState.errors)

            addMessage?.(t('userEditForm.messages.validationError'), {
              variant: 'warning',
            })
          }
        })
        .catch((error) => {
          console.error(error)
          addMessage?.(t('userEditForm.messages.unexpectedError'), {
            variant: 'error',
          })
        })
    },
    [addMessage, form, updateCurrentUserMutation, closeForm, t],
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
      UserFormData,
      'username' | 'fullname' | 'image' | 'content' | 'intro' | 'password'
    >['render']
  >(
    ({ field: { name, value, onChange, onBlur }, fieldState: { error } }) => {
      let label: string
      const helperText = undefined
      let EditorComponent:
        | typeof TextField
        | typeof MarkdownEditor
        | typeof PasswordField
        | React.FC<{
            value: string
          }> = TextField

      switch (name) {
        case 'username':
          label = t('userEditForm.fields.username')
          break
        case 'fullname':
          label = t('userEditForm.fields.fullname')
          break
        case 'image':
          label = t('userEditForm.fields.image')

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
        case 'content':
          label = t('userEditForm.fields.content')
          EditorComponent = MarkdownEditor
          break
        case 'intro':
          label = t('userEditForm.fields.intro')
          EditorComponent = MarkdownEditor
          break
        case 'password':
          label = t('userEditForm.fields.password')
          EditorComponent = PasswordField
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
          />
        </FormControl>
      )
    },
    [onChangeImage, t],
  )

  return (
    <UserEditFormStyled {...other} onSubmit={onSubmit}>
      <FormProvider {...form}>
        <Controller name="username" render={fieldRenderer} />
        <Controller name="password" render={fieldRenderer} />
        <Controller name="fullname" render={fieldRenderer} />
        <Controller name="image" render={fieldRenderer} />
        <Controller name="intro" render={fieldRenderer} />
        <Controller name="content" render={fieldRenderer} />

        <div>
          <Button
            type="submit"
            disabled={inRequest}
            variant={ComponentVariant.PRIMARY}
          >
            {t('userEditForm.buttons.save')}
          </Button>
          <Button
            type="button"
            variant={ComponentVariant.SECONDARY}
            onClick={closeForm}
            disabled={inRequest}
            style={{ marginLeft: '8px' }}
          >
            {t('userEditForm.buttons.cancel')}
          </Button>
        </div>
      </FormProvider>
    </UserEditFormStyled>
  )
}
