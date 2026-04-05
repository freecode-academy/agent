import React from 'react'
import { TagViewProps } from './interfaces'
import { TagViewStyled } from './styles'
import Link from 'next/link'
// import p from 'material-ui/p'
// import { useTopicsConnectionQuery } from 'src/gql/generated'
// import { getTopicsVariables } from 'src/pages/Topics'
// import { TopicsView } from 'src/pages/Topics/View'
// import { NextRouter, useRouter } from 'next/router'
// import { NextPageContextCustom } from 'src/components/pages/_App/interfaces'

// export const getTagTopicsVariables = (
//   router: NextRouter | NextPageContextCustom,
//   tagId: string,
// ) => {
//   if (!tagId) {
//     return
//   }

//   return {
//     ...getTopicsVariables(router, {
//       // Tags_some: {
//       //   Tag: {
//       //     id: tagId,
//       //   },
//       // },
//       ResourceTags: {
//         some: {
//           Tag: {
//             equals: tagId,
//           },
//         },
//       },
//     }),
//   }
// }

const TagView: React.FC<TagViewProps> = (props) => {
  const tag = props.object

  // const router = useRouter()

  // const variables = useMemo(() => {
  //   return getTagTopicsVariables(router, tag?.id || '')
  // }, [tag?.id, router])

  /**
   * Получаем топики в блоге
   */
  // const response = useTopicsConnectionQuery({
  //   skip: !tag?.id,
  //   variables,
  // })

  // const { loading } = response

  if (!tag) {
    return null
  }

  return (
    <TagViewStyled>
      <h1>{tag.name}</h1>

      {/* <TopicsView
        // title={`Топики с тегом "${tag.name}"`}
        // loading={loading}
        objects={response.data?.resources || []}
        count={response.data?.resourcesCount || 0}
        limit={response.variables?.first}
        page={0}
      /> */}

      <Link href="/tags" className="tag--all-tags-link">
        Все теги
      </Link>
    </TagViewStyled>
  )
}

export default TagView
