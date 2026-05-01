import { useMemo } from 'react'
import { UserPageView } from './View'
import { UserPageProps } from './interfaces'
import { userPageGetInitialProps } from './userPageGetInitialProps'
import { getUserQueryVariables } from './helpers'
import { UserStatusEnum, useUserQuery } from 'src/gql/generated'
import { SeoHeaders } from 'src/components/seo/SeoHeaders'
import { JsonLd } from 'src/components/seo/JsonLd'
import { Page } from '../../_App/interfaces'
import { createPerson } from 'src/components/seo/JsonLd/helpers'

export const UserPage: Page<UserPageProps> = ({ userId, username }) => {
  const variables = getUserQueryVariables(userId, username)

  const response = useUserQuery({
    skip: !variables,
    variables,
  })

  const user = response.data?.object

  const searchable = user?.status === UserStatusEnum.ACTIVE

  const personSchema = useMemo(() => {
    if (!user) {
      return null
    }

    return createPerson({
      name: user.fullname || user.username || '',
      image: user.image ? `/images/resized/big/${user.image}` : undefined,
    })
  }, [user])

  return (
    <>
      <SeoHeaders
        title={
          (user &&
            [user.fullname, user.username].filter((n) => !!n).join(' | ')) ||
          undefined
        }
        noindex={!searchable}
        nofollow={!searchable}
      />
      {personSchema && <JsonLd data={personSchema} />}
      {user && <UserPageView user={user} />}
    </>
  )
}

UserPage.getInitialProps = userPageGetInitialProps
