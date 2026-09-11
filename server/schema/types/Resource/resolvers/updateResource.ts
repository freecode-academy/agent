// import { Prisma } from '@prisma/client'
import { builder } from '../../../builder'
import { ResourceUpdateDataInput, ResourceWhereUniqueInput } from '../inputs'
import { validateResource } from '../helpers/validate'

builder.mutationField('updateResource', (t) =>
  t.prismaField({
    type: 'Resource',
    args: {
      where: t.arg({ type: ResourceWhereUniqueInput, required: true }),
      data: t.arg({ type: ResourceUpdateDataInput, required: true }),
    },
    resolve: async (_query, _root, args, ctx) => {
      if (!ctx.currentUser) {
        throw new Error('Unauthorized')
      }
      if (!args.where.id) {
        throw new Error('Resource id did not provided')
      }

      const resource = await ctx.prisma.resource.findUnique({
        where: { id: args.where.id },
      })

      if (!resource) {
        throw new Error('Resource not found')
      }

      if (resource.CreatedBy !== ctx.currentUser.id) {
        throw new Error('Forbidden')
      }

      const { contentV3: content } = args.data

      const validation = validateResource({
        title: args.data.title ?? resource.name,
        description: args.data.description ?? resource.longtitle,
        intro: args.data.intro ?? resource.intro,
        content: content ?? resource.contentV3,
      })

      if (!validation.valid) {
        const errorMessages = validation.errors.map(
          (e) => `${e.field}: ${e.message}`,
        )
        throw new Error(`Validation failed: ${errorMessages.join('; ')}`)
      }

      // Shared content fields between Resource and ResourceRevision (see prisma/schema.prisma)
      // IMPORTANT: Keep this list in sync with schema.
      // const sharedFields: Pick<
      //   Prisma.ResourceRevisionCreateInput,
      //   'status' | 'title' | 'description' | 'intro' | 'content' | 'signature'
      // > = {
      //   status: resource.status,
      //   title: resource.title,
      //   description: resource.description,
      //   intro: resource.intro,
      //   content: resource.content,
      //   signature: resource.signature,
      // }

      const updatedResource = await ctx.prisma.resource.update({
        where: { id: args.where.id },
        data: {
          name: args.data.title ?? undefined,
          longtitle: args.data.description ?? undefined,
          intro: args.data.intro ?? undefined,
          contentV3: content ?? undefined,
          // status: args.data.status ?? undefined,
          // revision: { increment: 1 },
          // signature: null,
          // Revisions: {
          //   create: {
          //     ...sharedFields,
          //   },
          // },
        },
      })

      return updatedResource
    },
  }),
)
