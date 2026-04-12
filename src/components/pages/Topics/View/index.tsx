import { ResourcesPageViewProps } from './interfaces'
import { Resource } from 'src/components/Resource'
import {
  ResourcesPageViewStyled,
  // ResourcesPageViewTitleStyled,
  ResourcesPageViewListStyled,
  ResourcesPageViewToolbarStyled,
} from './styles'
import { Pagination } from 'src/components/Pagination'
import { Button } from 'src/ui-kit/Button'
import Link from 'next/link'
import { useAppContext } from 'src/components/AppContext'

export const ResourcesPageView: React.FC<ResourcesPageViewProps> = ({
  resources,
  count,
  page,
}) => {
  const totalPages = count ? Math.floor(count / 10) + 1 : 0

  const { user: currentUser } = useAppContext()

  return (
    <ResourcesPageViewStyled>
      <ResourcesPageViewToolbarStyled>
        {/* <ResourcesPageViewTitleStyled>Resources</ResourcesPageViewTitleStyled> */}

        {currentUser?.sudo && (
          <Link href="/topics/create">
            <Button>Create resource</Button>
          </Link>
        )}
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
