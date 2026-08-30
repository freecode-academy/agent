import { User, Prisma } from '@prisma/client'
import { PrismaContext } from 'server/context/interfaces'
import { FieldToTranslate, langKey } from '../interfaces'
import { baseUpdateLang } from './baseUpdateLang'

function mapUserFields(user: User): FieldToTranslate[] {
  const fields: FieldToTranslate[] = []
  if (user.fullname) {
    fields.push({ field: 'fullname', value: user.fullname })
  }
  if (user.intro) {
    fields.push({ field: 'intro', value: user.intro })
  }
  if (user.content) {
    fields.push({ field: 'content', value: user.content })
  }
  return fields
}

type updateUserLangProps = {
  ctx: PrismaContext
  user: User
  validUris: Set<string>
  targetLangs: langKey[]
}

export async function updateUserLang({
  ctx,
  user,
  validUris,
  targetLangs,
}: updateUserLangProps): Promise<true | null> {
  return baseUpdateLang({
    ctx,
    id: user.id,
    existingLangs: { en: user.en },
    fieldsToTranslate: mapUserFields(user),
    validUris,
    targetLangs,
    updateEntity: async (id, data) => {
      await ctx.prisma.user.update({
        where: { id },
        data: data as Prisma.UserUpdateInput,
      })
    },
  })
}
