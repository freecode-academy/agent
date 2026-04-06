import { TeamStatus } from '@prisma/client'
import { builder } from 'server/schema/builder'

export const TeamStatusEnum = builder.enumType('TeamStatus', {
  values: Object.values(TeamStatus),
})
