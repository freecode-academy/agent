import React, { useCallback, useMemo } from 'react'
import {
  GridTableAttributeStyled,
  GridTableItemStyled,
  GridTableAttributesContainerStyled,
} from 'src/components/GridTable/styles'
import { UserLink as UikitUserLink } from 'src/components/Link/User'
import { UserTechnologyRowProps } from './interfaces'
import { FormattedDate } from 'src/ui-kit/format/FormattedDate'
// import {
//   Scalars,
//   // UserTechnologyUpdateInput,
//   UserUpdateInput,
//   // useUpdateUserTechnologyProcessorMutation,
// } from 'src/gql/generated'
// import useProcessorMutation from 'src/hooks/useProcessorMutation'
// import IconButton from 'material-ui/IconButton'
// import SaveIcon from 'material-ui-icons/Save'
// import StartEditIcon from 'material-ui-icons/ModeEdit'
// import ResetIcon from 'material-ui-icons/Restore'
// import TextField from 'material-ui/TextField'
import { UserTechnologyLevel } from './UserTechnologyLevel'
import { UserTechnologyStatusView } from './UserTechnologyStatus'
import { UserTechnologyHiringStatusView } from './UserTechnologyStatusHiring'
// import CheckBox from 'src/uikit/CheckBox'
import TechnologyLink from 'src/components/Link/Technology'

const UserTechnologyRow: React.FC<UserTechnologyRowProps> = ({
  userTechnology,
  // currentUser,
  showActions,
  showCreateBy,
  showTechnology,
  technology,
}) => {
  const getValue = useCallback(
    function <F extends keyof typeof userTechnology>(
      field: F,
    ): (typeof userTechnology)[F] {
      return userTechnology[field]
    },
    [userTechnology],
  )

  // const mutationTuple = useUpdateUserTechnologyProcessorMutation()

  // const { loading, mutation, snakbar, errors } =
  //   useProcessorMutation(mutationTuple)

  // const [data, setData] = useState<UserTechnologyUpdateInput | null>(null)

  // type Data = typeof data
  type Data = typeof userTechnology
  type DataNotNullable = NonNullable<Data>
  type Name = keyof DataNotNullable

  // const dataWithMutations = useMemo(() => {
  //   return {
  //     ...userTechnology,
  //     ...data,
  //   }
  // }, [userTechnology, data])

  /**
   * Получаем текущее значение объекта
   */
  // const getValue = useCallback(
  //   <P extends keyof typeof dataWithMutations>(name: P) => {
  //     return dataWithMutations[name]
  //   },
  //   [dataWithMutations]
  // )

  // const setValue = useCallback(
  //   <Name extends keyof DataNotNullable>(
  //     name: Name,
  //     value: DataNotNullable[Name] | undefined
  //   ) => {
  //     setData({
  //       ...data,
  //       [name]: value,
  //     })
  //   },
  //   [data]
  // )

  // const onChange = useCallback(
  //   (
  //     event: React.ChangeEvent<HTMLInputElement>,
  //     additionalValue?:
  //       | UserUpdateInput['technologyLevel']
  //       | UserUpdateInput['isMentor']
  //   ) => {
  //     const name = event.target.name as Name

  //     if (!name) {
  //       return
  //     }

  //     let value:
  //       | DataNotNullable[Name]
  //       | Scalars['UserTechnologyLevel']
  //       | string
  //       | number
  //       | undefined = event.target.value

  //     switch (name) {
  //       case 'date_from':
  //       case 'date_till':
  //         value = value && typeof value === 'string' ? new Date(value) : null

  //         if (value && !(value instanceof Date)) {
  //           return
  //         }

  //         // value = event.target.value && typeof value === 'string' ? new Date(value) : null;

  //         break

  //       case 'level':
  //         if (!value) {
  //           value = null
  //         } else {
  //           value = parseInt(value)

  //           if (!value || value < 1 || value > 5) {
  //             return
  //           }
  //         }

  //         setValue(name, value as Scalars['UserTechnologyLevel'])

  //         return

  //       case 'isMentor':
  //         if (typeof additionalValue === 'boolean') {
  //           setValue(name, additionalValue)
  //         }
  //         return

  //       // case 'CreatedBy':
  //       // case 'Technology':
  //       case 'components':
  //       case 'status':
  //       case 'hiring_status':
  //         return

  //       // default:
  //       //   console.error(new Error(`Unhandled field name "${name}"`))
  //       //   return;

  //       // value = event.target.value;
  //     }

  //     setValue(name, value)
  //   },
  //   [setValue]
  // )

  // const inEditMode = useMemo(() => !!data, [data])

  // const startEdit = useCallback(() => {
  //   setData({})
  // }, [])

  // const resetData = useCallback(() => {
  //   setData(null)
  // }, [])

  // const onSubmit = useCallback(
  //   (event: React.SubmitEvent) => {
  //     event.preventDefault()

  //     data &&
  //       mutation({
  //         variables: {
  //           data,
  //           where: {
  //             id: userTechnology.id,
  //           },
  //         },
  //       }).then((result) => {
  //         /**
  //          * Если успешно, обновляем сбрасываем даныне формы
  //          */
  //         if (!(result instanceof Error) && result?.data?.response.success) {
  //           resetData()
  //         }

  //         return result
  //       })
  //   },
  //   [data, mutation, userTechnology.id, resetData]
  // )

  // const buttons = useMemo(() => {
  //   const buttons: JSX.Element[] = []

  //   if (currentUser?.id && currentUser?.id === userTechnology.CreatedBy?.id) {
  //     if (data) {
  //       buttons.push(
  //         <IconButton key="resetData" disabled={loading} onClick={resetData}>
  //           <ResetIcon />
  //         </IconButton>
  //       )

  //       if (Object.keys(data).length) {
  //         buttons.push(
  //           <IconButton
  //             key="save"
  //             disabled={loading}
  //             type="submit"
  //             color="secondary"
  //           >
  //             <SaveIcon />
  //           </IconButton>
  //         )
  //       }
  //     } else {
  //       buttons.push(
  //         <IconButton key="startEdit" disabled={loading} onClick={startEdit}>
  //           <StartEditIcon />
  //         </IconButton>
  //       )
  //     }
  //   }

  //   return buttons
  // }, [
  //   data,
  //   loading,
  //   userTechnology.CreatedBy?.id,
  //   resetData,
  //   startEdit,
  //   currentUser?.id,
  // ])

  /**
   * Дата С
   */
  const dateFrom = useMemo(() => {
    const fieldName = 'date_from'
    const value = getValue(fieldName) || ''

    return value ? <FormattedDate value={value} format="datePadded" /> : ''
  }, [getValue])

  /**
   * Дата До
   */
  const dateTill = useMemo(() => {
    const fieldName: Name = 'date_till'
    const value = getValue(fieldName) || ''

    return value ? <FormattedDate value={value} format="datePadded" /> : ''
  }, [getValue])

  /**
   * Технологический уровень
   */
  const level = useMemo(() => {
    const fieldName: Name = 'level'
    const value = getValue(fieldName)

    return <UserTechnologyLevel value={value} name="level" />
  }, [getValue])

  const status = useMemo(() => {
    const fieldName: Name = 'status'
    const value = getValue(fieldName)

    return <UserTechnologyStatusView value={value} />
  }, [getValue])

  const hiring_status = useMemo(() => {
    const fieldName: Name = 'hiring_status'
    const value = getValue(fieldName)

    return <UserTechnologyHiringStatusView value={value} />
  }, [getValue])

  const isMentor = useMemo(() => {
    const fieldName: Name = 'isMentor'
    const checked = getValue(fieldName) || false

    return checked ? 'Да' : null
  }, [getValue])

  // const level = useMemo(() => {
  //   const fieldName: Name = 'level'
  //   const value = getValue(fieldName)

  //   const title = value
  //     ? ['Начальный', 'Ниже среднего', 'Средний', 'Уверенный', 'Эксперт'][
  //         value - 1
  //       ]
  //     : null

  //   if (inEditMode) {
  //     const error = errors.find((n) => n.key === fieldName)

  //     return (
  //       <TextField
  //         name={fieldName}
  //         value={value || ''}
  //         onChange={onChange}
  //         error={!!error}
  //         label="Технологический уровень"
  //         helperText={error?.message || title || 'Укажите от 1 до 5'}
  //         type="number"
  //         fullWidth
  //       />
  //     )
  //   } else {
  //     return title
  //   }
  // }, [errors, getValue, inEditMode, onChange])

  return useMemo(() => {
    const buttons = null

    return (
      <>
        <GridTableItemStyled>
          {showActions ? (
            <GridTableAttributeStyled>{buttons}</GridTableAttributeStyled>
          ) : null}

          {showTechnology && technology ? (
            <GridTableAttributeStyled>
              <TechnologyLink object={technology} />
            </GridTableAttributeStyled>
          ) : null}

          <GridTableAttributeStyled>
            {showCreateBy && userTechnology.CreatedBy ? (
              <UikitUserLink user={userTechnology.CreatedBy} />
            ) : null}
          </GridTableAttributeStyled>

          <GridTableAttributeStyled>{level}</GridTableAttributeStyled>

          <GridTableAttributeStyled>{status}</GridTableAttributeStyled>

          <GridTableAttributeStyled>{hiring_status}</GridTableAttributeStyled>

          <GridTableAttributeStyled>{isMentor}</GridTableAttributeStyled>

          <GridTableAttributesContainerStyled>
            <GridTableAttributeStyled>{dateFrom}</GridTableAttributeStyled>

            <GridTableAttributeStyled>{dateTill}</GridTableAttributeStyled>
          </GridTableAttributesContainerStyled>
        </GridTableItemStyled>
      </>
    )
  }, [
    dateFrom,
    dateTill,
    hiring_status,
    isMentor,
    level,
    showActions,
    showCreateBy,
    showTechnology,
    status,
    technology,
    userTechnology.CreatedBy,
  ])
}

export default UserTechnologyRow
