import { ResourcesPageViewProps } from './interfaces'
import { ResourceFreecode as Resource } from '@/components/Resource'
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

export const TopicsPageView: React.FC<ResourcesPageViewProps> = ({
  resources,
  count,
  page,
}) => {
  const totalPages = count ? Math.ceil(count / 10) : 0

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
