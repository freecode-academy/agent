import { Prisma } from '@prisma/client'
import { builder } from 'server/schema/builder'
import { ResourceWhereInput } from 'server/schema/types/Resource/inputs'
import { processOldContent } from './helpers/processOldContent'

builder.mutationField('adminUpdateResourcesContent', (t) =>
  t.field({
    type: 'Json',
    args: {
      where: t.arg({
        type: ResourceWhereInput,
      }),
      limit: t.arg.int({ required: true }),
    },
    async resolve(_, { limit, where: whereArg }, ctx) {
      const { currentUser, prisma } = ctx

      if (!currentUser?.sudo) {
        throw new Error('Not authorized')
      }

      const where: Prisma.ResourceWhereInput = {
        ...(whereArg as Prisma.ResourceWhereInput),
        // type: {
        //   in: ['Topic'],
        // },
        contentV3: null,
      }

      const total = await prisma.resource.count({ where })

      let success = 0
      let failed = 0
      let skipped = 0

      const ids = await prisma.resource
        .findMany({
          where,
          take: limit || undefined,
          select: {
            id: true,
          },
          orderBy: {
            createdAt: 'asc',
          },
        })
        .then((r) => r.map((n) => n.id))

      for await (const id of ids) {
        const resource = await prisma.resource.findUnique({
          where: { id },
        })

        if (!resource) {
          continue
        }

        const contentV3 = await processOldContent({
          ctx,
          resource,
        })

        if (contentV3) {
          await prisma.resource
            .update({
              data: {
                contentV3,
              },
              where: {
                id,
              },
            })
            .then(() => {
              success++
            })
            .catch(() => {
              failed++
            })
        } else {
          skipped++
        }
      }

      return {
        total,
        success,
        failed,
        skipped,
      }
    },
  }),
)
