import { User, Prisma } from '@prisma/client'
import { PrismaContext } from 'server/context/interfaces'
import {
  LOCALE_CODES,
  LOCALES,
} from 'src/Custom/components/LocaleSwitcher/interfaces'
import { updateUserLang } from '../helpers/updateUserLang'
import { langKey, ProcessorResult } from '../interfaces'

type ProcessUsersArgs = {
  ctx: PrismaContext
  ids?: string[]
  limit: number
  langsLimit: number | null | undefined
  processAllLangs: boolean
  force: boolean
  validUris: Set<string>
}

export async function processUsers({
  ctx,
  ids,
  limit,
  langsLimit,
  processAllLangs,
  force,
  validUris,
}: ProcessUsersArgs): Promise<ProcessorResult> {
  const { prisma } = ctx

  const where: Prisma.UserWhereInput = {}

  if (ids && ids.length > 0) {
    where.id = { in: ids }
  }

  if (!force) {
    const langConditions = LOCALE_CODES.filter((c) => c !== 'ru')
      .map((c) => `"${c}" IS NULL`)
      .join(' OR ')

    const idsWithMissingLang = await prisma.$queryRaw<{ id: string }[]>`
      SELECT id FROM "User" WHERE ${Prisma.raw(langConditions)}
    `

    where.id = {
      in: idsWithMissingLang.map((r) => r.id),
    }
  }

  const users = await prisma.user.findMany({
    where,
    select: { id: true },
  })

  let processed = 0
  let skipped = 0
  let success = 0

  const failed: Array<{
    entity: User
    error: unknown
  }> = []

  const allLangs = Object.keys(LOCALES).filter((n): n is langKey => n !== 'ru')

  for (const { id } of users) {
    const user = await prisma.user.findUnique({
      where: { id },
    })

    if (!user) {
      continue
    }

    const langsToProcess: langKey[] = []
    for (const lang of allLangs) {
      if (force || !user[lang]) {
        langsToProcess.push(lang)
      }
    }

    if (langsToProcess.length === 0) {
      skipped++
      processed++
      if (limit && processed >= limit) {
        break
      }
      continue
    }

    const batchSize = !langsLimit ? langsToProcess.length : langsLimit
    const batches: langKey[][] = []

    if (processAllLangs) {
      for (let i = 0; i < langsToProcess.length; i += batchSize) {
        batches.push(langsToProcess.slice(i, i + batchSize))
      }
    } else {
      batches.push(langsToProcess.slice(0, batchSize))
    }

    let userSuccess = false
    for (const batch of batches) {
      await updateUserLang({
        ctx,
        user,
        validUris,
        targetLangs: batch,
      })
        .then((r) => {
          if (r === true) {
            userSuccess = true
          }
        })
        .catch((error) => {
          console.error('error', error)

          failed.push({
            error: {
              message: error.message,
              stack: error.stack,
            },
            entity: user,
          })
        })
    }

    if (userSuccess) {
      success++
    }

    processed++

    if (limit && processed >= limit) {
      break
    }
  }

  return {
    total: users.length,
    processed,
    skipped,
    success,
    failed,
  }
}
