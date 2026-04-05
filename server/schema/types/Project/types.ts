import { ProjectStatus, ProjectType } from '@prisma/client'
import { builder } from 'server/schema/builder'

export const ProjectTypeEnum = builder.enumType('ProjectType', {
  values: Object.values(ProjectType),
})

export const ProjectStatusEnum = builder.enumType('ProjectStatus', {
  values: Object.values(ProjectStatus),
})
