import { builder } from '../../builder'

// TaskWorkLog object type
builder.prismaObject('TaskWorkLog', {
  fields: (t) => ({
    id: t.exposeID('id', {
      nullable: false,
    }),
    createdAt: t.expose('createdAt', { type: 'DateTime', nullable: false }),
    content: t.exposeString('content', {
      nullable: false,
    }),
    taskId: t.exposeID('taskId', {
      nullable: false,
    }),
    Task: t.relation('Task'),
    createdById: t.exposeID('createdById', {
      nullable: false,
    }),
    CreatedBy: t.relation('CreatedBy'),
  }),
})

// Import inputs
import './inputs'

// Import resolvers
import './resolvers/taskWorkLog'
import './resolvers/taskWorkLogs'
import './resolvers/taskWorkLogsCount'
import './resolvers/createTaskWorkLog'
import './resolvers/update'
import './resolvers/deleteTaskWorkLog'
