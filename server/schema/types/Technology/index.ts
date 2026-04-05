import { builder } from '../../builder'

import './inputs'
import './resolvers/createTechnology'
import './resolvers/updateTechnology'
import './resolvers/technology'
import './resolvers/technologies'
import './resolvers/technologiesCount'
import './resolvers/validateTechnology'

builder.prismaObject('Technology', {
  fields: (t) => ({
    id: t.exposeID('id', {
      nullable: false,
    }),
    createdAt: t.expose('createdAt', { type: 'DateTime', nullable: false }),
    updatedAt: t.expose('updatedAt', { type: 'DateTime', nullable: false }),
    name: t.exposeString('name'),
    description: t.exposeString('description', { nullable: true }),
    // components: t.expose('components', { type: 'Json', nullable: true }),
    content: t.exposeString('contentText', { nullable: true }),
    site_url: t.exposeString('site_url', { nullable: true }),
    level1hours: t.exposeInt('level1hours', { nullable: true }),
    level2hours: t.exposeInt('level2hours', { nullable: true }),
    level3hours: t.exposeInt('level3hours', { nullable: true }),
    level4hours: t.exposeInt('level4hours', { nullable: true }),
    level5hours: t.exposeInt('level5hours', { nullable: true }),
    // CreatedBy: t.exposeString('CreatedBy'),
    // User: t.relation('User'),
    createdById: t.exposeString('CreatedBy'),
    CreatedBy: t.relation('User'),
    UserTechnologies: t.relation('UserTechnologies'),
    LearnStrategyStages: t.relation('LearnStrategyStages'),
  }),
})
