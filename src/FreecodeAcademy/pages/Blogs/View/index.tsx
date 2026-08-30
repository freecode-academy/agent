import { ResourcesPageViewProps } from './interfaces'
import { ResourceFreecode as Resource } from '@/components/Resource'
import {
  ResourcesPageViewStyled,
  ResourcesPageViewTitleStyled,
  ResourcesPageViewListStyled,
  ResourcesPageViewToolbarStyled,
} from './styles'
import { Pagination } from 'src/components/Pagination'
// import { Button } from 'src/ui-kit/Button'
// import Link from 'next/link'

export const ResourcesPageView: React.FC<ResourcesPageViewProps> = ({
  resources,
  count,
  page,
  title,
}) => {
  const totalPages = count ? Math.ceil(count / 10) : 0

  return (
    <ResourcesPageViewStyled>
      <ResourcesPageViewToolbarStyled>
        <ResourcesPageViewTitleStyled>{title}</ResourcesPageViewTitleStyled>

        {/* <Link href="/resources/create">
          <Button>Create resource</Button>
        </Link> */}
      </ResourcesPageViewToolbarStyled>

      <ResourcesPageViewListStyled>
        {resources.map((resource) => (
          <Resource key={resource.id} resource={resource} variant="list" />
        ))}
      </ResourcesPageViewListStyled>

      <Pagination currentPage={page} totalPages={totalPages} />
    </ResourcesPageViewStyled>
  )
}
