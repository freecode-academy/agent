import { builder } from '../../builder'
import { SortOrder } from '../common'

export const CodeChallengeBlockOrderByInput = builder.inputType(
  'CodeChallengeBlockOrderByInput',
  {
    fields: (t) => ({
      createdAt: t.field({ type: SortOrder }),
      updatedAt: t.field({ type: SortOrder }),
      rank: t.field({ type: SortOrder }),
    }),
  },
)

export const CodeChallengeBlockWhereInput = builder.inputType(
  'CodeChallengeBlockWhereInput',
  {
    fields: (t) => ({
      parentId: t.string({}),
    }),
  },
)

export const CodeChallengeBlockWhereUniqueInput = builder.inputType(
  'CodeChallengeBlockWhereUniqueInput',
  {
    fields: (t) => ({
      id: t.id(),
    }),
  },
)
