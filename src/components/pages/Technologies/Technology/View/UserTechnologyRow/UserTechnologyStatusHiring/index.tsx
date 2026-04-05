import React from 'react'
import { UserTechnologyHiringStatusViewProps } from './interfaces'
import { getUserTechnologyHiringStatusText } from 'src/components/pages/UserTechnologies/helpers/getUserTechnologyHiringStatusText'

export const UserTechnologyHiringStatusView: React.FC<
  UserTechnologyHiringStatusViewProps
> = ({ value }) => {
  return <>{value ? getUserTechnologyHiringStatusText(value) : null}</>
}
