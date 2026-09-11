import { Prisma, ProjectType, UserStatus } from '@prisma/client'
import { Request, Response } from 'express'
import { prismaClient } from 'server/prisma'
import { buildProjectsWhere } from 'server/schema/types/Project/helpers/buildProjectsWhere'
import { buildResourcesWhere } from 'server/schema/types/Resource/helpers/buildResourcesWhere'
import { buildUserWhere } from 'server/schema/types/User/helpers/buildUserWhere'

const SITEMAP_LIMIT = 1000

export type SitemapSection =
  | 'main'
  | 'users'
  | 'topics'
  | 'resources'
  | 'tags'
  | 'offers'
  | 'projects'
  | 'tasks'
  | 'worklogs'

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

const resourcesWhereCommon = buildResourcesWhere()

const topicsWhere: Prisma.ResourceWhereInput = {
  ...resourcesWhereCommon,
  type: 'Topic',
}

const otherResourcesWhere: Prisma.ResourceWhereInput = {
  ...resourcesWhereCommon,
  type: {
    not: 'Topic',
  },
}

const getSectionCount = async (section: SitemapSection): Promise<number> => {
  switch (section) {
    case 'users':
      return prismaClient.user.count({ where: usersWhere })
    case 'topics':
      return prismaClient.resource.count({ where: topicsWhere })
    case 'resources':
      return prismaClient.resource.count({ where: otherResourcesWhere })
    case 'tags':
      return prismaClient.tag.count({ where: tagsWhere })
    case 'offers':
      return prismaClient.offer.count({ where: offersWhere })
    case 'projects':
      return prismaClient.project.count({ where: projectsWhere })
    case 'tasks':
      return prismaClient.task.count({ where: tasksWhere })
    case 'worklogs':
      return prismaClient.taskWorkLog.count({ where: workLogsWhere })
    case 'main':
      return 0
  }
}

export const generateSitemapIndex = async ({
  siteOrigin,
}: SitemapGeneratorProps): Promise<string> => {
  const [
    usersCount,
    topicsCount,
    resourcesCount,
    tagsCount,
    offersCount,
    projectsCount,
    tasksCount,
    worklogsCount,
  ] = await Promise.all([
    getSectionCount('users'),
    getSectionCount('topics'),
    getSectionCount('resources'),
    getSectionCount('tags'),
    getSectionCount('offers'),
    getSectionCount('projects'),
    getSectionCount('tasks'),
    getSectionCount('worklogs'),
  ])

  const usersPages = Math.ceil(usersCount / SITEMAP_LIMIT)
  const topicsPages = Math.ceil(topicsCount / SITEMAP_LIMIT)
  const resourcesPages = Math.ceil(resourcesCount / SITEMAP_LIMIT)
  const tagsPages = Math.ceil(tagsCount / SITEMAP_LIMIT)
  const offersPages = Math.ceil(offersCount / SITEMAP_LIMIT)
  const projectPages = Math.ceil(projectsCount / SITEMAP_LIMIT)
  const taskPages = Math.ceil(tasksCount / SITEMAP_LIMIT)
  const worklogsPages = Math.ceil(worklogsCount / SITEMAP_LIMIT)

  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n'
  xml += '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'

  xml += `  <sitemap><loc>${siteOrigin}/sitemap.xml?section=main</loc></sitemap>\n`

  for (let i = 1; i <= topicsPages; i++) {
    xml += `  <sitemap><loc>${siteOrigin}/sitemap.xml?section=topics&amp;page=${i}</loc></sitemap>\n`
  }

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

  for (let i = 1; i <= projectPages; i++) {
    xml += `  <sitemap><loc>${siteOrigin}/sitemap.xml?section=projects&amp;page=${i}</loc></sitemap>\n`
  }

  for (let i = 1; i <= taskPages; i++) {
    xml += `  <sitemap><loc>${siteOrigin}/sitemap.xml?section=tasks&amp;page=${i}</loc></sitemap>\n`
  }

  for (let i = 1; i <= worklogsPages; i++) {
    xml += `  <sitemap><loc>${siteOrigin}/sitemap.xml?section=worklogs&amp;page=${i}</loc></sitemap>\n`
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

const generateResourcesSitemap = async (
  props: SitemapGeneratorProps & { page: number },
  where: Prisma.ResourceWhereInput,
): Promise<string> => {
  const resources = await prismaClient.resource.findMany({
    where,
    orderBy: {
      createdAt: 'desc',
    },
    take: SITEMAP_LIMIT,
    skip: (props.page - 1) * SITEMAP_LIMIT,
    select: {
      id: true,
      updatedAt: true,
      uri: true,
    },
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

export const generateSitemapTopics = (
  props: SitemapGeneratorProps & { page: number },
): Promise<string> => generateResourcesSitemap(props, topicsWhere)

export const generateSitemapResources = (
  props: SitemapGeneratorProps & { page: number },
): Promise<string> => generateResourcesSitemap(props, otherResourcesWhere)

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

const projectsWhere: Prisma.ProjectWhereInput = buildProjectsWhere(
  undefined,
  undefined,
)

export const generateSitemapProjects = async (
  props: SitemapGeneratorProps & { page: number },
): Promise<string> => {
  const projects = await prismaClient.project.findMany({
    where: projectsWhere,
    orderBy: {
      updatedAt: 'desc',
    },
    take: SITEMAP_LIMIT,
    skip: (props.page - 1) * SITEMAP_LIMIT,
    include: {
      Resource_Project_ResourceToResource: {
        select: {
          uri: true,
        },
      },
    },
  })

  const xmlData: UrlItem[] = projects.map((n) => {
    const { id, updatedAt, Resource_Project_ResourceToResource: Resource } = n

    const { uri: resourceUri } = Resource || {}

    return {
      url: resourceUri || `/projects/id/${id}`,
      updatedAt: updatedAt.toISOString(),
    }
  })

  return generateSitemapXML(xmlData, props)
}

const tasksWhere: Prisma.TaskWhereInput = {
  Project: {
    OR: [
      {
        type: null,
      },
      {
        type: {
          not: {
            equals: ProjectType.Education,
          },
        },
      },
    ],
  },
}

export const generateSitemapTasks = async (
  props: SitemapGeneratorProps & { page: number },
): Promise<string> => {
  const tasks = await prismaClient.task.findMany({
    where: tasksWhere,
    orderBy: {
      updatedAt: 'desc',
    },
    take: SITEMAP_LIMIT,
    skip: (props.page - 1) * SITEMAP_LIMIT,
  })

  const xmlData: UrlItem[] = tasks.map((n) => {
    const { id, updatedAt } = n

    return {
      url: `/tasks/${id}`,
      updatedAt: updatedAt.toISOString(),
    }
  })

  return generateSitemapXML(xmlData, props)
}

const workLogsWhere: Prisma.TaskWorkLogWhereInput = {}

export const generateSitemapWorkLogs = async (
  props: SitemapGeneratorProps & { page: number },
): Promise<string> => {
  const workLogs = await prismaClient.taskWorkLog.findMany({
    where: workLogsWhere,
    orderBy: {
      createdAt: 'desc',
    },
    take: SITEMAP_LIMIT,
    skip: (props.page - 1) * SITEMAP_LIMIT,
  })

  const xmlData: UrlItem[] = workLogs.map((n) => {
    const { id, createdAt } = n

    return {
      url: `/worklogs/${id}`,
      updatedAt: createdAt.toISOString(),
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
    case 'topics':
      res.send(await generateSitemapTopics({ siteOrigin, page }))
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
    case 'projects':
      res.send(await generateSitemapProjects({ siteOrigin, page }))
      break
    case 'tasks':
      res.send(await generateSitemapTasks({ siteOrigin, page }))
      break
    case 'worklogs':
      res.send(await generateSitemapWorkLogs({ siteOrigin, page }))
      break
    default:
      res.status(404).send('Not found')
  }
}
