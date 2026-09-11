import { ResourceFragment } from 'src/gql/generated'

import {
  ResourceStyled,
  ResourceBannerStyled,
  ResourceTitleStyled,
  ResourceMetaStyled,
  ResourceAuthorStyled,
  ResourceContentStyled,
  ResourceStyledToolbar,
  ResourceDateStyled,
} from '../styles'
import { SeparatorStyled } from 'src/Custom/styles'
import { UserLink } from 'src/components/Link/User'
import { FormattedDate } from 'src/ui-kit/format/FormattedDate'
import { Markdown } from 'src/components/Markdown'
import { useAppContext } from 'src/components/AppContext'
import { ResourceVariant } from '../interfaces'
import {
  ResourceFullViewContentsStyled,
  ResourceFullViewStyled,
} from './styles'

type ResourceFullViewProps = {
  resource: ResourceFragment
}

export const ResourceFullView: React.FC<ResourceFullViewProps> = ({
  resource,
}) => {
  const { user: currentUser } = useAppContext()

  const variant: ResourceVariant = 'full'

  const title = resource.name

  const isPublished = resource.published && !resource.deleted

  const titleElement = (
    <ResourceTitleStyled $variant={variant}>{title}</ResourceTitleStyled>
  )

  const dateNode: React.ReactNode | null = resource.createdAt && (
    <ResourceDateStyled>
      <FormattedDate value={resource.createdAt} format="dateMedium" />
    </ResourceDateStyled>
  )

  let contentNode: React.ReactNode = <Markdown>{resource.content}</Markdown>

  if (currentUser?.sudo) {
    contentNode = (
      <ResourceFullViewContentsStyled>
        <div>
          <h3>New content</h3>

          <Markdown>{resource.content}</Markdown>
        </div>
        <div>
          <h3>Old content</h3>

          <Markdown>{resource.contentOld}</Markdown>
        </div>
      </ResourceFullViewContentsStyled>
    )
  }

  return (
    <ResourceFullViewStyled>
      <ResourceStyled $variant={variant}>
        {!isPublished && (
          <ResourceBannerStyled>
            This resource is not published
          </ResourceBannerStyled>
        )}

        <ResourceStyledToolbar>
          {titleElement}

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
          {contentNode}

          {/* {currentUser && <CreateResourceComment resource={resource} />} */}
        </ResourceContentStyled>
      </ResourceStyled>
    </ResourceFullViewStyled>
  )
}
