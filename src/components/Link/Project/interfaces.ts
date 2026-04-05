import { Maybe } from 'src/gql/generated'

export interface ProjectLinkProps extends React.PropsWithChildren {
  object:
    | Maybe<{
        __typename?: 'Project'
        id: string
        name?: string
        Resource?: Maybe<{
          __typename?: 'Resource'
          id: string
          uri: string
        }>
      }>
    | undefined
}
