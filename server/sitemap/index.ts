import { Prisma, UserStatus } from '@prisma/client'
import { Request, Response } from 'express'
import { prismaClient } from 'server/prisma'
import { buildResourcesWhere } from 'server/schema/types/Resource/helpers/buildResourcesWhere'
import { buildUserWhere } from 'server/schema/types/User/helpers/buildUserWhere'

const SITEMAP_LIMIT = 1000

export type SitemapSection = 'main' | 'users' | 'resources' | 'tags' | 'offers'

type UrlItem = {
  url: string
  updatedAt: string
}

type SitemapGeneratorProps = {
  siteOrigin: string
}

const generateSitemapXML = (
  items: UrlItem[],
  {
    siteOrigin,
    priority = 0.9,
  }: SitemapGeneratorProps & {
    priority?: number
  },
): string => {
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n'
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'

  items.forEach((item) => {
    xml += '  <url>\n'
    xml += `    <loc>${siteOrigin}${item.url}</loc>\n`
    xml += `    <lastmod>${item.updatedAt}</lastmod>\n`
    xml += `    <priority>${priority}</priority>\n`
    xml += '  </url>\n'
  })

  xml += '</urlset>'
  return xml
}

const getSectionCount = async (section: SitemapSection): Promise<number> => {
  switch (section) {
    case 'users':
      return prismaClient.user.count({ where: usersWhere })
    case 'resources':
      return prismaClient.resource.count({ where: resourcesWhere })
    case 'tags':
      return prismaClient.tag.count({ where: tagsWhere })
    case 'offers':
      return prismaClient.offer.count({ where: offersWhere })
    case 'main':
      return 0
  }
}

export const generateSitemapIndex = async ({
  siteOrigin,
}: SitemapGeneratorProps): Promise<string> => {
  const [usersCount, resourcesCount, tagsCount, offersCount] =
    await Promise.all([
      getSectionCount('users'),
      getSectionCount('resources'),
      getSectionCount('tags'),
      getSectionCount('offers'),
    ])

  const usersPages = Math.ceil(usersCount / SITEMAP_LIMIT)
  const resourcesPages = Math.ceil(resourcesCount / SITEMAP_LIMIT)
  const tagsPages = Math.ceil(tagsCount / SITEMAP_LIMIT)
  const offersPages = Math.ceil(offersCount / SITEMAP_LIMIT)

  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n'
  xml += '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'

  xml += `  <sitemap><loc>${siteOrigin}/sitemap.xml?section=main</loc></sitemap>\n`

  for (let i = 1; i <= usersPages; i++) {
    xml += `  <sitemap><loc>${siteOrigin}/sitemap.xml?section=users&amp;page=${i}</loc></sitemap>\n`
  }

  for (let i = 1; i <= resourcesPages; i++) {
    xml += `  <sitemap><loc>${siteOrigin}/sitemap.xml?section=resources&amp;page=${i}</loc></sitemap>\n`
  }

  for (let i = 1; i <= tagsPages; i++) {
    xml += `  <sitemap><loc>${siteOrigin}/sitemap.xml?section=tags&amp;page=${i}</loc></sitemap>\n`
  }

  for (let i = 1; i <= offersPages; i++) {
    xml += `  <sitemap><loc>${siteOrigin}/sitemap.xml?section=offers&amp;page=${i}</loc></sitemap>\n`
  }

  xml += '</sitemapindex>'
  return xml
}

export const generateSitemapMain = async (
  props: SitemapGeneratorProps,
): Promise<string> => {
  const now = new Date()
  const dayOfWeek = now.getDay()
  const diffToMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1
  const monday = new Date(now)
  monday.setDate(now.getDate() - diffToMonday)

  const xmlData: UrlItem[] = [
    {
      url: `/`,
      updatedAt: monday.toISOString().split('T')[0],
    },
    {
      url: `/comments`,
      updatedAt: monday.toISOString().split('T')[0],
    },
    {
      url: `/people`,
      updatedAt: monday.toISOString().split('T')[0],
    },
    {
      url: `/about`,
      updatedAt: monday.toISOString().split('T')[0],
    },
    {
      url: `/start/developers`,
      updatedAt: monday.toISOString().split('T')[0],
    },
  ]

  return generateSitemapXML(xmlData, props)
}

const resourcesWhere = buildResourcesWhere()

export const generateSitemapResources = async (
  props: SitemapGeneratorProps & { page: number },
): Promise<string> => {
  const resources = await prismaClient.resource.findMany({
    where: resourcesWhere,
    orderBy: {
      createdAt: 'desc',
    },
    take: SITEMAP_LIMIT,
    skip: (props.page - 1) * SITEMAP_LIMIT,
  })

  const xmlData: UrlItem[] = resources.map((n) => {
    const { uri, updatedAt } = n

    return {
      url: `/${(uri ?? '').replaceAll(/^\/+|\/+$/g, '')}`,
      updatedAt: updatedAt.toISOString(),
    }
  })

  return generateSitemapXML(xmlData, props)
}

const tagsWhere: Prisma.TagWhereInput = {}

export const generateSitemapTags = async (
  props: SitemapGeneratorProps & { page: number },
): Promise<string> => {
  const tags = await prismaClient.tag.findMany({
    where: tagsWhere,
    orderBy: {
      createdAt: 'desc',
    },
    take: SITEMAP_LIMIT,
    skip: (props.page - 1) * SITEMAP_LIMIT,
  })

  const xmlData: UrlItem[] = tags.map((n) => {
    const { name, updatedAt } = n

    return {
      url: `/tag/${name}`,
      updatedAt: updatedAt.toISOString(),
    }
  })

  return generateSitemapXML(xmlData, props)
}

const offersWhere: Prisma.OfferWhereInput = {
  published: true,
}

export const generateSitemapOffers = async (
  props: SitemapGeneratorProps & { page: number },
): Promise<string> => {
  const offers = await prismaClient.offer.findMany({
    where: offersWhere,
    orderBy: {
      updatedAt: 'desc',
    },
    take: SITEMAP_LIMIT,
    skip: (props.page - 1) * SITEMAP_LIMIT,
  })

  const xmlData: UrlItem[] = offers.map((n) => {
    const { id, updatedAt } = n

    return {
      url: `/offers/${id}`,
      updatedAt: updatedAt.toISOString(),
    }
  })

  return generateSitemapXML(xmlData, props)
}

const usersWhere = buildUserWhere(
  {
    status: UserStatus.active,
  },
  undefined,
)

export const generateSitemapUsers = async (
  props: SitemapGeneratorProps & { page: number },
): Promise<string> => {
  const users = await prismaClient.user.findMany({
    where: usersWhere,
    orderBy: {
      createdAt: 'desc',
    },
    take: SITEMAP_LIMIT,
    skip: (props.page - 1) * SITEMAP_LIMIT,
  })

  const xmlData: UrlItem[] = users.map((n) => {
    const { id, username, updatedAt } = n

    return {
      // url: `/users/${id}`,
      url: username ? `/profile/${username}` : `/profile/id/${id}`,
      updatedAt: updatedAt.toISOString(),
    }
  })

  return generateSitemapXML(xmlData, props)
}

/**
 * Обрабатывает запрос для генерации sitemap
 * @param type тип sitemap (cities или companies)
 * @param res объект ответа Express
 */
export const generateSitemap = async (req: Request, res: Response) => {
  res.header('Content-Type', 'application/xml')

  const siteOrigin = `${req.protocol}://${req.headers.host}`
  const section = req.query.section as SitemapSection | undefined
  const page = parseInt(req.query.page as string) || 1

  if (!section) {
    res.send(await generateSitemapIndex({ siteOrigin }))
    return
  }

  switch (section) {
    case 'main':
      res.send(await generateSitemapMain({ siteOrigin }))
      break
    case 'users':
      res.send(await generateSitemapUsers({ siteOrigin, page }))
      break
    case 'resources':
      res.send(await generateSitemapResources({ siteOrigin, page }))
      break
    case 'tags':
      res.send(await generateSitemapTags({ siteOrigin, page }))
      break
    case 'offers':
      res.send(await generateSitemapOffers({ siteOrigin, page }))
      break
    default:
      res.status(404).send('Not found')
  }
}
