import {
  UserTechnologyHiringStatus,
  UserTechnologyStatus,
} from '@prisma/client'
import { builder } from 'server/schema/builder'

export const UserTechnologyStatusEnum = builder.enumType(
  'UserTechnologyStatus',
  {
    values: Object.values(UserTechnologyStatus),
  },
)

export const UserTechnologyHiringStatusEnum = builder.enumType(
  'UserTechnologyHiringStatus',
  {
    values: Object.values(UserTechnologyHiringStatus),
  },
)
