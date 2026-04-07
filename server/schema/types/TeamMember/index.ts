import { builder } from 'server/schema/builder'
import { TeamMemberStatusEnum } from './types'

import './resolvers/teamMembers'
import './resolvers/createTeamMember'
import './resolvers/updateTeamMember'

builder.prismaObject('TeamMember', {
  fields: (t) => ({
    id: t.exposeID('id', {
      nullable: false,
    }),
    createdAt: t.expose('createdAt', { type: 'DateTime', nullable: false }),
    updatedAt: t.expose('updatedAt', { type: 'DateTime', nullable: false }),

    status: t.field({
      type: TeamMemberStatusEnum,
      resolve: ({ status }) => status,
      nullable: false,
    }),

    createdById: t.exposeString('CreatedBy'),
    CreatedBy: t.relation('User_TeamMember_CreatedByToUser'),

    userId: t.exposeString('User'),
    User: t.relation('User_TeamMember_CreatedByToUser'),
  }),
})

// User                            String?          @db.VarChar(36)
// Team                            String?          @db.VarChar(36)
// CreatedBy                       String           @db.VarChar(36)
// createdAt                       DateTime         @default(now()) @db.Timestamp(3)
// updatedAt                       DateTime         @default(now()) @updatedAt @db.Timestamp(3)
// User_TeamMember_CreatedByToUser User             @relation("TeamMember_CreatedByToUser", fields: [CreatedBy], references: [id])
// Team_TeamToTeamMember           Team?            @relation(fields: [Team], references: [id])
// User_TeamMember_UserToUser      User?            @relation("TeamMember_UserToUser", fields: [User], references: [id])
