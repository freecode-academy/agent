import { useUsersConnectionQuery } from 'src/gql/generated'
import { Page } from 'src/components/pages/_App/interfaces'
import { UsersView } from './View'
import { SeoHeaders } from 'src/components/seo/SeoHeaders'
import { getUsersQueryVariables } from './helpers'
import { usersPageGetInitialProps } from './usersPageGetInitialProps'
import { UsersPageProps } from './interfaces'
import { useAppContext } from 'src/components/AppContext'
import { useMemo } from 'react'
import { useLexicon } from 'src/Custom/Lexicon'
import { usersPageLexicon } from './lexicon'

export const UsersPageFreecode: Page<UsersPageProps> = ({
  page,
  siteOrigin,
}) => {
  const { t } = useLexicon(usersPageLexicon)
  const { user: currentUser } = useAppContext()

  const response = useUsersConnectionQuery({
    variables: getUsersQueryVariables({ currentUser, page }),
  })

  const users = useMemo(
    () => response.data?.users || [],
    [response.data?.users],
  )

  return (
    <>
      <SeoHeaders
        title={t('usersPage.seo.title')}
        siteOrigin={siteOrigin}
        canonical={`/users${page > 1 ? `?page=${page}` : ''}`}
      />
      <UsersView
        users={users}
        page={page}
        count={response.data?.usersCount ?? 0}
        limit={response.variables.first || 10}
      />
    </>
  )
}

UsersPageFreecode.getInitialProps = usersPageGetInitialProps
