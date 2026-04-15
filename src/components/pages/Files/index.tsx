import { SeoHeaders } from 'src/components/seo/SeoHeaders'
import { Page } from '../_App/interfaces'
import { useFilesConnectionQuery } from 'src/gql/generated'
import { useAppContext } from 'src/components/AppContext'
import { FilesPageProps } from './interfaces'
import { getFilesConnectionQueryVariables } from './helpers'
import { FilesView } from './View'

export const FilesPage: Page<FilesPageProps> = ({ page = 1 }) => {
  const { user: currentUser } = useAppContext()

  const response = useFilesConnectionQuery({
    skip: !currentUser?.sudo,
    variables: getFilesConnectionQueryVariables({
      page: page,
    }),
  })

  return (
    <>
      <SeoHeaders title="Files" nofollow noindex />

      <FilesView
        files={response.data?.files ?? []}
        count={response.data?.filesCount ?? 0}
        page={page}
      />
    </>
  )
}

FilesPage.getInitialProps = async ({ query }) => {
  const pageParam = query.page
  const page =
    typeof pageParam === 'string' && parseInt(pageParam, 10) > 0
      ? parseInt(pageParam, 10)
      : 1

  return {
    page,
  }
}
