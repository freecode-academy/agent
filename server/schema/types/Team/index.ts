import { builder } from 'server/schema/builder'
import { TeamStatusEnum } from './types'

import './resolvers/team'
import './resolvers/teams'
import './resolvers/teamsCount'
import './resolvers/createTeam'
import './resolvers/updateTeam'

builder.prismaObject('Team', {
  fields: (t) => ({
    id: t.exposeID('id', {
      nullable: false,
    }),
    createdAt: t.expose('createdAt', { type: 'DateTime', nullable: false }),
    updatedAt: t.expose('updatedAt', { type: 'DateTime', nullable: false }),
    title: t.exposeString('name', { nullable: false }),
    website: t.exposeString('website'),
    address: t.exposeString('address'),
    description: t.exposeString('description'),
    intro: t.exposeString('intro'),
    image: t.exposeString('image'),
    email: t.exposeString('email'),
    phone: t.exposeString('phone'),

    // url: t.exposeString('url'),
    // description: t.exposeString('description', { nullable: true }),
    content: t.exposeString('content', { nullable: true }),
    // public: t.exposeBoolean('public'),

    createdById: t.exposeString('CreatedBy'),
    CreatedBy: t.relation('User'),

    // type: t.field({
    //   type: TeamTypeEnum,
    //   resolve: ({ type }) => type,
    // }),

    status: t.field({
      type: TeamStatusEnum,
      resolve: ({ status }) => status,
    }),

    Members: t.relation('TeamMembers'),

    /**
     * Нету там контента
     */
    // Resources: t.relation('Resources'),
  }),
})
