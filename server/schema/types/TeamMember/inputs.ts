import { builder } from '../../builder'
import { SortOrder } from '../common'
import { TeamWhereUniqueInput } from '../Team/inputs'
import { TeamMemberStatusEnum } from './types'

export const TeamMemberOrderByInput = builder.inputType(
  'TeamMemberOrderByInput',
  {
    fields: (t) => ({
      createdAt: t.field({ type: SortOrder }),
      updatedAt: t.field({ type: SortOrder }),
    }),
  },
)

export const TeamMemberWhereInput = builder.inputType('TeamMemberWhereInput', {
  fields: (t) => ({
    status: t.field({ type: TeamMemberStatusEnum }),
  }),
})

export const TeamMemberWhereUniqueInput = builder.inputType(
  'TeamMemberWhereUniqueInput',
  {
    fields: (t) => ({
      id: t.id(),
    }),
  },
)

export const TeamMemberCreateInput = builder.inputType(
  'TeamMemberCreateInput',
  {
    fields: (t) => ({
      team: t.field({ type: TeamWhereUniqueInput, required: true }),
    }),
  },
)

export const TeamMemberUpdateInput = builder.inputType(
  'TeamMemberUpdateInput',
  {
    fields: (t) => ({
      status: t.field({ type: TeamMemberStatusEnum, required: false }),
    }),
  },
)
