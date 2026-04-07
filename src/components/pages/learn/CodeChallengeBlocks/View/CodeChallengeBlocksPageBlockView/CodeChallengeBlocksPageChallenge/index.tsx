import React from 'react'
import Link from 'next/link'
import { CodeChallengeBlocksPageChallengeProps } from './interfaces'
import { CodeChallengeBlocksPageChallengeStyled } from './styles'
// import CodeChallengeStatusIcon from 'src/components/pages/learn/CodeChallenge/components/StatusIcon'
// import { useCodeChallengStatus } from 'src/hooks/useCodeChallengStatus'

export const CodeChallengeBlocksPageChallenge: React.FC<
  CodeChallengeBlocksPageChallengeProps
> = ({
  object,
  // codeChallengeCompletion
}) => {
  const { name } = object

  // const { status } = useCodeChallengStatus({
  //   codeChallengeCompletion,
  // })

  return (
    <CodeChallengeBlocksPageChallengeStyled>
      {/* <CodeChallengeStatusIcon status={status} />{' '} */}
      <Link
        href={`/learn/exercises/${object.id}`}
        // title={`Перейти к выполнению задания "${title}"` || ''}
        title={name ?? undefined}
      >
        {name}
      </Link>{' '}
    </CodeChallengeBlocksPageChallengeStyled>
  )
}
