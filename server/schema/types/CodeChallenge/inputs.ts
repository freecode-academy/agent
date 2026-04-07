import { builder } from '../../builder'
import { SortOrder } from '../common'

export const CodeChallengeOrderByInput = builder.inputType(
  'CodeChallengeOrderByInput',
  {
    fields: (t) => ({
      createdAt: t.field({ type: SortOrder }),
      updatedAt: t.field({ type: SortOrder }),
    }),
  },
)

export const CodeChallengeWhereInput = builder.inputType(
  'CodeChallengeWhereInput',
  {
    fields: (t) => ({
      parentId: t.string({}),
    }),
  },
)

export const CodeChallengeWhereUniqueInput = builder.inputType(
  'CodeChallengeWhereUniqueInput',
  {
    fields: (t) => ({
      id: t.id(),
    }),
  },
)
