import { builder } from 'server/schema/builder'

export const Offer = builder.simpleObject('Offer', {
  fields: (t) => ({
    id: t.id({
      nullable: false,
    }),
    createdAt: t.field({
      type: 'DateTime',
      nullable: false,
    }),
    updatedAt: t.field({
      type: 'DateTime',
      nullable: false,
    }),
    title: t.string({
      nullable: false,
    }),
    description: t.string({}),
    intro: t.string({}),
    content: t.string({}),
    image: t.string({}),
    createdById: t.id({
      nullable: false,
    }),
    published: t.boolean({
      nullable: false,
    }),
    CreatedBy: t.field({
      type: builder.prismaObject('User', {}),
    }),
  }),
})
