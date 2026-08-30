import { UserQueryVariables } from 'src/gql/generated'

export function getUserQueryVariables(
  id: string | undefined,
  username: string | undefined,
): UserQueryVariables {
  return {
    where: {
      id,
      username,
    },
    withUserTechnologies: true,
  }
}
