import { builder } from '../../builder'

export const TagWhereUniqueInput = builder.inputType('TagWhereUniqueInput', {
  fields: (t) => ({
    id: t.id(),
    name: t.string(),
  }),
})
