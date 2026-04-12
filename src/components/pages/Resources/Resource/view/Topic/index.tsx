import { SortOrder, useResourcesQuery } from 'src/gql/generated'
import { ResourceViewProps } from '../interfaces'
import { Resource } from 'src/components/Resource'
import { TopicViewStyled, TopicViewToolbarStyled } from './styles'
import { useAppContext } from 'src/components/AppContext'
import { useBoolean } from 'src/hooks/useBoolean'
import { Button } from 'src/ui-kit/Button'
import { ComponentSize, ComponentVariant } from 'src/ui-kit/interfaces'
import { ResourceEditForm } from 'src/components/pages/Topics/Topic/Form'

export const TopicView: React.FC<ResourceViewProps> = ({ resource }) => {
  const { user: currentUser } = useAppContext()

  const [inEditMode, startEditing, stopEditing] = useBoolean()

  const response = useResourcesQuery({
    variables: {
      where: {
        topicId: resource.id,
      },
      orderBy: {
        createdAt: SortOrder.ASC,
      },
      resourceWithDetailes: true,
    },
  })

  const resources = response.data?.resources ?? []
  // const count = response.data?.resourcesCount ?? 0

  const canEdit = currentUser && resource.createdById === currentUser.id

  return (
    <TopicViewStyled>
      {inEditMode ? (
        <ResourceEditForm
          resource={resource}
          cancelHandler={stopEditing}
          parentId={undefined}
        />
      ) : (
        <>
          <TopicViewToolbarStyled>
            {canEdit && (
              <Button
                onClick={startEditing}
                variant={ComponentVariant.PRIMARY}
                size={ComponentSize.SM}
              >
                Edit
              </Button>
            )}
          </TopicViewToolbarStyled>

          <Resource resource={resource} variant="full" />

          {resources.length > 0 && (
            <>
              <h3>Comments</h3>

              {resources.map((n) => (
                <Resource key={n.id} resource={n} variant="comment" />
              ))}
            </>
          )}
        </>
      )}
    </TopicViewStyled>
  )
}
