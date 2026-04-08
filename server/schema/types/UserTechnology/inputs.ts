import { builder } from '../../builder'
import {
  UserTechnologyHiringStatusEnum,
  UserTechnologyStatusEnum,
} from './types'

export const UserTechnologyWhereUniqueInput = builder.inputType(
  'UserTechnologyWhereUniqueInput',
  {
    fields: (t) => ({
      id: t.id(),
    }),
  },
)

export const UserTechnologyCreateInput = builder.inputType(
  'UserTechnologyCreateInput',
  {
    fields: (t) => ({
      technologyId: t.string({ required: true }),
      date_from: t.field({ type: 'DateTime', required: false }),
      date_till: t.field({ type: 'DateTime', required: false }),
      status: t.field({ type: UserTechnologyStatusEnum, required: false }),
      hiring_status: t.field({
        type: UserTechnologyHiringStatusEnum,
        required: false,
      }),
      level: t.int({ required: false }),
      // isMentor: t.boolean({ required: false }),
      // components: t.field({ type: 'Json', required: false }),
    }),
  },
)

export const UserTechnologyUpdateInput = builder.inputType(
  'UserTechnologyUpdateInput',
  {
    fields: (t) => ({
      date_from: t.field({ type: 'DateTime', required: false }),
      date_till: t.field({ type: 'DateTime', required: false }),
      status: t.field({ type: UserTechnologyStatusEnum, required: false }),
      hiring_status: t.field({
        type: UserTechnologyHiringStatusEnum,
        required: false,
      }),
      level: t.int({ required: false }),
      // isMentor: t.boolean({ required: false }),
      // components: t.field({ type: 'Json', required: false }),
    }),
  },
)
