import { Page } from 'src/components/pages/_App/interfaces'
import { SeoHeaders } from 'src/components/seo/SeoHeaders'
import { ProjectEditForm } from '../Form'

export const ProjectCreatePage: Page = () => {
  return (
    <>
      <SeoHeaders title="Create project" noindex nofollow />

      <ProjectEditForm project={undefined} cancelHandler={undefined} />
    </>
  )
}
