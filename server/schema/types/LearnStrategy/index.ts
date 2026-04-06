import { builder } from '../../builder'

import './inputs'
import './resolvers/createLearnStrategy'
import './resolvers/updateLearnStrategy'
import './resolvers/learnStrategy'
import './resolvers/learnStrategies'
import './resolvers/learnStrategiesCount'

builder.prismaObject('LearnStrategy', {
  fields: (t) => ({
    id: t.exposeID('id', {
      nullable: false,
    }),
    createdAt: t.expose('createdAt', { type: 'DateTime', nullable: false }),
    updatedAt: t.expose('updatedAt', { type: 'DateTime', nullable: false }),
    name: t.exposeString('name', {
      nullable: false,
    }),
    description: t.exposeString('description', { nullable: true }),
    level: t.exposeInt('level', {
      nullable: false,
    }),
    createdById: t.exposeString('createdById', {
      nullable: false,
    }),
    CreatedBy: t.relation('CreatedBy'),
    LearnStrategyStages: t.relation('LearnStrategyStages'),
    UserLearnStrategies: t.relation('UserLearnStrategies'),
  }),
})
