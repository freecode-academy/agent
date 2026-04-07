import React from 'react'
import { CodeChallengeBlocksPageBlockView } from './CodeChallengeBlocksPageBlockView'
import { CodeChallengeBlocksPageStyled } from './styles'
import { CodeChallengeBlockFragment } from 'src/gql/generated'

export type CodeChallengeBlocksViewProps = {
  objects: CodeChallengeBlockFragment[]
  count: number
}

const CodeChallengeBlocksPageView: React.FC<CodeChallengeBlocksViewProps> = ({
  objects,
}) => {
  return (
    <CodeChallengeBlocksPageStyled>
      <p>Тестовые задания по HTML, CSS, Javascript</p>

      {/* <p>Здесь вы можете пройти различные практические задания.</p> */}

      {/* <p>
        Внимание: к сожалению, не все разделы работают, в некоторых могут быть
        ошибки. Если что-то не так, пишите прямо в самой задаче во вкладке
        Обсудить.
      </p> */}

      {objects.map((n) => {
        return <CodeChallengeBlocksPageBlockView key={n.id} object={n} />
      })}
    </CodeChallengeBlocksPageStyled>
  )
}

export default CodeChallengeBlocksPageView
