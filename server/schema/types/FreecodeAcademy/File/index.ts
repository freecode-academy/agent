import { builder } from 'server/schema/builder'

builder.prismaObjectFields('File', (t) => ({
  // newField1: t.string({
  //   resolve: () => 'value1',
  // }),
  // newField2: t.int({
  //   resolve: () => 123,
  // }),

  imageResourceId: t.exposeID('ImageResource', { nullable: true }),
  ImageResource: t.relation('Resource', { nullable: true }),
}))

// ImageResource
