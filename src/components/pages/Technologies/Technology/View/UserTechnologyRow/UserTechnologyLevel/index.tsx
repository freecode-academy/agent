import React, { useMemo, useCallback } from 'react'
import { UserTechnologyLevelProps } from './interfaces'
import { getUserTechnologyLevelText } from 'src/components/pages/UserTechnologies/helpers/getUserTechnologyLevelText'
import { TextField } from 'src/ui-kit/controls/TextField'
import { FormControl } from 'src/ui-kit/FormControl'

export const UserTechnologyLevel: React.FC<UserTechnologyLevelProps> = ({
  inEditMode,
  value,
  onChange: onChangeProp,
  error,
  name,
  ...other
}) => {
  const onChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      let newValue: number | null | undefined

      if (event.target.value) {
        const value = parseInt(event.target.value)

        if (!isFinite(value) || value < 1 || value > 5) {
          return
        }

        newValue = value
      } else {
        newValue = null
      }

      if (newValue !== undefined) {
        onChangeProp?.(event, newValue ? newValue : null)
      }
    },
    [onChangeProp],
  )

  return useMemo(() => {
    const title = value ? getUserTechnologyLevelText(value) : null

    if (inEditMode) {
      return (
        <FormControl
          error={!!error}
          label="Уровень"
          helperText={error || title || 'Укажите от 1 до 5'}
        >
          <TextField
            name={name}
            value={value || ''}
            onChange={onChange}
            type="number"
            // fullWidth
            {...other}
          />
        </FormControl>
      )
    } else {
      return <>{title}</>
    }
  }, [error, inEditMode, name, onChange, other, value])
}
