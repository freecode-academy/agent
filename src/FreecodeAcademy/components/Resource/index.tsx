import { ResourceFragment } from 'src/gql/generated'
import { FormattedDate } from 'src/ui-kit/format/FormattedDate'
import { Markdown } from 'src/components/Markdown'
import {
  ResourceStyled,
  ResourceMetaStyled,
  ResourceAuthorStyled,
  ResourceDateStyled,
  ResourceContentStyled,
  ResourceStyledToolbar,
} from './styles'
import { ResourceVariant } from './interfaces'
import { ResourceLink } from 'src/components/Link/Resource'
import { SeparatorStyled } from 'src/components/Separator/styles'
import { UserLink } from 'src/components/Link/User'
import { ResourceFullView } from './Full'

type ResourceProps = {
  resource: ResourceFragment
  variant?: ResourceVariant
}

export const ResourceFreecode: React.FC<ResourceProps> = ({
  resource,
  variant = 'list',
}) => {
  let dateNode: React.ReactNode | null = resource.createdAt && (
    <ResourceDateStyled>
      <FormattedDate value={resource.createdAt} format="dateMedium" />
    </ResourceDateStyled>
  )

  if (variant === 'comment') {
    dateNode = <ResourceLink resource={resource}>{dateNode}</ResourceLink>
  }

  return variant === 'full' ? (
    <ResourceFullView resource={resource} />
  ) : (
    <ResourceStyled $variant={variant}>
      <ResourceStyledToolbar>
        {variant === 'list' ? <ResourceLink resource={resource} /> : null}

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
            <Markdown>{resource.content}</Markdown>

            {/* {currentUser && <CreateResourceComment resource={resource} />} */}
          </>
        )}
      </ResourceContentStyled>
    </ResourceStyled>
  )
}
