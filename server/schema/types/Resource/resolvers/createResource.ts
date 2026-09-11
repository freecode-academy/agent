import { slugify } from 'transliteration'
import { builder } from '../../../builder'
import { ResourceCreateInput } from '../inputs'
import { validateResource } from '../helpers/validate'
import { Resource, ResourceType } from '@prisma/client'

builder.mutationField('createResource', (t) =>
  t.prismaField({
    type: 'Resource',
    args: {
      data: t.arg({ type: ResourceCreateInput, required: true }),
    },
    resolve: async (_query, _root, args, ctx) => {
      const { currentUser, prisma } = ctx

      if (!currentUser) {
        throw new Error('Unauthorized')
      }

      const {
        title,
        description,
        intro,
        contentV3: content,
        type,
        parentId,
        ...other
      } = args.data

      if (!title) {
        throw new Error('title is empty')
      }

      const baseUri = `/topics/${slugify(title, { lowercase: true })}`
      let uri = baseUri
      let suffix = 2

      while (await prisma.resource.findFirst({ where: { uri } })) {
        uri = `${baseUri}-${suffix}`
        suffix++
      }

      const validation = validateResource({
        title,
        description,
        intro,
        content,
      })

      if (!validation.valid) {
        const errorMessages = validation.errors.map(
          (e) => `${e.field}: ${e.message}`,
        )
        throw new Error(`Validation failed: ${errorMessages.join('; ')}`)
      }

      let parent: Resource | null

      if (parentId) {
        parent = await prisma.resource.findUnique({
          where: {
            id: parentId,
          },
        })

        if (!parent) {
          throw new Error(`Can not get parent resource`)
        }
      } else {
        parent = null
      }

      const resource = await prisma.resource.create({
        data: {
          ...other,
          type: type || ResourceType.Topic,
          name: title,
          longtitle: description,
          intro,
          contentV3: content,
          // status: status ?? 'draft',
          CreatedBy: currentUser.id,
          // parentId,
          // rootId: parent?.rootId ?? parent?.id,
          isfolder: false,
          uri,
        },
      })

      return resource
    },
  }),
)
