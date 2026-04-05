import { builder } from '../../builder'

import './inputs'
import './resolvers/createLearnStrategyStage'
import './resolvers/deleteLearnStrategyStage'
import './resolvers/learnStrategyStage'
import './resolvers/learnStrategyStages'
import './resolvers/learnStrategyStagesCount'

builder.prismaObject('LearnStrategyStage', {
  fields: (t) => ({
    id: t.exposeID('id', {
      nullable: false,
    }),
    createdAt: t.expose('createdAt', { type: 'DateTime', nullable: false }),
    updatedAt: t.expose('updatedAt', { type: 'DateTime', nullable: false }),
    learnStrategyId: t.exposeString('learnStrategyId'),
    learnStrategyTargetId: t.exposeString('learnStrategyTargetId', {
      nullable: true,
    }),
    technologyId: t.exposeString('technologyId', { nullable: true }),
    level: t.exposeInt('level', { nullable: true }),
    LearnStrategy: t.relation('LearnStrategy'),
    LearnStrategyTarget: t.relation('LearnStrategyTarget'),
    Technology: t.relation('Technology'),
  }),
})
