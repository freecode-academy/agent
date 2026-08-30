import {
  MeUserFragment,
  UsersConnectionQueryVariables,
  UserStatusEnum,
} from 'src/gql/generated'

const limit = 6

type getUsersQueryVariablesProps = {
  page: number
  currentUser: MeUserFragment | null | undefined
}

export function getUsersQueryVariables({
  currentUser,
  page,
}: getUsersQueryVariablesProps): UsersConnectionQueryVariables {
  const shortSkip = limit

  const first = page > 1 ? limit : shortSkip

  return {
    where: {
      status: currentUser?.sudo ? undefined : UserStatusEnum.ACTIVE,
      image: {
        not: {
          equals: '',
        },
      },
    },
    skip:
      page > 2 ? (page - 2) * first + shortSkip : page === 2 ? shortSkip : 0,
    first,
  }
}
