import { ResourceFragment } from 'src/gql/generated'
import { FormattedDate } from 'src/ui-kit/format/FormattedDate'
import { Markdown } from 'src/components/Markdown'
import {
  ResourceStyled,
  ResourceBannerStyled,
  ResourceTitleStyled,
  ResourceMetaStyled,
  ResourceAuthorStyled,
  ResourceDateStyled,
  ResourceContentStyled,
  ResourceStyledToolbar,
} from './styles'
import { UserLink } from '../Link/User'
import { SeparatorStyled } from '../Separator/styles'
import { ResourceLink } from '../Link/Resource'
import { ResourceVariant } from './interfaces'

type ResourceProps = {
  resource: ResourceFragment
  variant?: ResourceVariant
}

export const Resource: React.FC<ResourceProps> = ({
  resource,
  variant = 'list',
}) => {
  const title = resource.name

  const isPublished = resource.published && !resource.deleted

  const titleElement = (
    <ResourceTitleStyled $variant={variant}>{title}</ResourceTitleStyled>
  )

  let dateNode: React.ReactNode | null = resource.createdAt && (
    <ResourceDateStyled>
      <FormattedDate value={resource.createdAt} format="dateMedium" />
    </ResourceDateStyled>
  )

  if (variant === 'comment') {
    dateNode = <ResourceLink resource={resource}>{dateNode}</ResourceLink>
  }

  return (
    <ResourceStyled $variant={variant}>
      {variant === 'full' && !isPublished && (
        <ResourceBannerStyled>
          This resource is not published
        </ResourceBannerStyled>
      )}

      <ResourceStyledToolbar>
        {variant === 'list' ? (
          <ResourceLink resource={resource} />
        ) : variant === 'full' ? (
          titleElement
        ) : null}

        <SeparatorStyled />
        {/* <ResourceStatusChip resource={resource} /> */}
        {/* {canEdit && <Button onClick={startEditing}>Edit</Button>} */}
      </ResourceStyledToolbar>

      <ResourceMetaStyled>
        {resource.CreatedBy && (
          <ResourceAuthorStyled>
            <UserLink user={resource.CreatedBy} />
          </ResourceAuthorStyled>
        )}
        {dateNode}
      </ResourceMetaStyled>

      <ResourceContentStyled>
        {variant === 'list' ? (
          <Markdown>{resource.intro}</Markdown>
        ) : (
          <>
            <Markdown>{resource.contentV2}</Markdown>

            {/* {currentUser && <CreateResourceComment resource={resource} />} */}
          </>
        )}
      </ResourceContentStyled>
    </ResourceStyled>
  )
}
