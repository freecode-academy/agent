import { ResourceFragment } from 'src/gql/generated'
import { FormattedDate } from 'src/ui-kit/format/FormattedDate'
import { Markdown } from 'src/components/Markdown'
import {
  ResourceStyled,
  ResourceBannerStyled,
  ResourceTitleStyled,
  ResourceDescriptionStyled,
  ResourceMetaStyled,
  ResourceAuthorStyled,
  ResourceDateStyled,
  // ResourceIntroStyled,
  ResourceContentStyled,
  ResourceStyledToolbar,
} from './styles'
import { UserLink } from '../Link/User'
// import { useAppContext } from '../AppContext'
// import { Button } from 'src/ui-kit/Button'
// import { useBoolean } from 'src/hooks/useBoolean'
// import { ResourceEditForm } from '../pages/Resources/Resource/Form'
// import { CreateResourceComment } from './CreateComment'
import { SeparatorStyled } from '../Separator/styles'
import { ResourceLink } from '../Link/Resource'
import { ResourceVariant } from './interfaces'
// import { ResourceStatusChip } from './Status'

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

  // const { user: currentUser } = useAppContext()

  // const [inEditMode, startEditing, stopEditing] = useBoolean()

  // const canEdit =
  //   currentUser && resource.createdById === currentUser.id && variant === 'full'

  // let content: React.ReactNode

  // switch (variant) {
  //   case 'list':

  //   content = <></>
  //     break

  //   case 'full':

  //   content = <></>
  //     break
  // }

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

      {variant === 'list' && (resource.intro || resource.longtitle) && (
        <ResourceDescriptionStyled>
          {resource.intro || resource.longtitle}
        </ResourceDescriptionStyled>
      )}

      <ResourceMetaStyled>
        {resource.CreatedBy && (
          <ResourceAuthorStyled>
            <UserLink user={resource.CreatedBy} />
          </ResourceAuthorStyled>
        )}
        {resource.createdAt && (
          <ResourceDateStyled>
            <FormattedDate value={resource.createdAt} format="dateMedium" />
          </ResourceDateStyled>
        )}
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
