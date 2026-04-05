import { ResourceType } from '@prisma/client'
import { builder } from 'server/schema/builder'

export const ResourceTypeEnum = builder.enumType('ResourceType', {
  values: Object.values(ResourceType),
})
