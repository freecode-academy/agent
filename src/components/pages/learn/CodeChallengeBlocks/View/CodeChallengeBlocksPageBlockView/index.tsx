import React, { useMemo } from 'react'
import { CodeChallengeBlocksPageBlockViewProps } from './interfaces'
import { CodeChallengeBlocksPageBlockViewStyled } from './styles'
import { CodeChallengeBlocksPageChallenge } from './CodeChallengeBlocksPageChallenge'
import Link from 'next/link'

export const CodeChallengeBlocksPageBlockView: React.FC<
  CodeChallengeBlocksPageBlockViewProps
> = ({
  object,
  // children,
  opened = false,
}) => {
  // const context = useContext(Context) as PrismaCmsContext

  // const [opened, setOpened] = useState(openedProps)

  // const toggleOpened = useCallback(
  //   (event: React.MouseEvent) => {
  //     event.preventDefault()
  //     event.stopPropagation()
  //     setOpened(!opened)
  //   },
  //   [opened]
  // )

  const block = object

  const [content] = useMemo(() => {
    if (!block) {
      return []
    }

    const children = block.Children
    const challenges = block.Challenges

    let content: React.ReactNode[] = []

    /**
     * For src/components/pages/learn/CodeChallengeBlocks/CodeChallengeBlock
     */
    if (challenges?.length) {
      const challengesContent = challenges.map((challenge) => {
        // const codeChallengeCompletion =
        //   context.user?.CodeChallengeCompletions?.find(
        //     (n) => n.CodeChallenge && n.CodeChallenge.id === challenge.id,
        //   )

        return (
          <CodeChallengeBlocksPageChallenge
            key={challenge.id}
            object={challenge}
            // codeChallengeCompletion={codeChallengeCompletion}
          />
        )
      })

      return [opened ? challengesContent : null]
    }

    if (children && opened) {
      content = children.map((n) => {
        const challenges = n.Challenges || []

        return (
          challenges.length > 0 && (
            <CodeChallengeBlocksPageBlockView key={n.id} object={n}>
              {challenges.map((challenge) => {
                // const codeChallengeCompletion =
                //   context.user?.CodeChallengeCompletions?.find(
                //     (n) => n.CodeChallenge && n.CodeChallenge.id === challenge.id,
                //   )

                return (
                  <CodeChallengeBlocksPageChallenge
                    key={challenge.id}
                    object={challenge}
                    // codeChallengeCompletion={codeChallengeCompletion}
                  />
                )
              })}
            </CodeChallengeBlocksPageBlockView>
          )
        )
      })
    }

    return [content]
  }, [block, opened])

  if (!block) {
    return null
  }

  return (
    <CodeChallengeBlocksPageBlockViewStyled>
      <div>
        <Link href={`/learn/sections/${block.id}`} title={block.name || ''}>
          <span className="title opener">
            {!opened ? '↳' : '↴'} {block.name}
          </span>
        </Link>{' '}
      </div>
      {content}
      {/* {opened ? children : null} */}
    </CodeChallengeBlocksPageBlockViewStyled>
  )
}
