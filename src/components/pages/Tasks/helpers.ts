import {
  TasksWithCountQueryVariables,
  TaskQueryVariables,
  TaskStatusEnum,
  SortOrder,
} from 'src/gql/generated'

export function getTasksWithCountQueryVariables(
  status: TaskStatusEnum | null,
  page: number,
): TasksWithCountQueryVariables {
  const shortSkip = 3
  const first = page > 1 ? 6 : shortSkip

  return {
    where: {
      status: status ?? undefined,
      incompletedOnly: status === null,
    },
    skip:
      page > 2 ? (page - 2) * first + shortSkip : page === 2 ? shortSkip : 0,
    take: first,
    orderBy: {
      createdAt: SortOrder.DESC,
    },
  }
}

export function getTaskQueryVariables(
  taskId: string | undefined,
): TaskQueryVariables {
  return {
    where: {
      id: taskId,
    },
  }
}
