import { TeamMemberStatus } from '@prisma/client'
import { builder } from 'server/schema/builder'

export const TeamMemberStatusEnum = builder.enumType('TeamMemberStatus', {
  values: Object.values(TeamMemberStatus),
})
