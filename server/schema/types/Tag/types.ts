import { TagStatus } from '@prisma/client'
import { builder } from 'server/schema/builder'

export const TagStatusEnum = builder.enumType('TagStatus', {
  values: Object.values(TagStatus),
})
