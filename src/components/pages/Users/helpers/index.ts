import {
  MeUserFragment,
  UsersConnectionQueryVariables,
  UserStatusEnum,
} from 'src/gql/generated'

type getUsersQueryVariablesProps = {
  page: number
  currentUser: MeUserFragment | null | undefined
}

export function getUsersQueryVariables({
  currentUser,
  page,
}: getUsersQueryVariablesProps): UsersConnectionQueryVariables {
  const first = 3

  return {
    where: {
      status: currentUser ? undefined : UserStatusEnum.ACTIVE,
      image: {
        not: {
          equals: '',
        },
      },
    },
    skip: (page - 1) * first,
    first,
  }
}
