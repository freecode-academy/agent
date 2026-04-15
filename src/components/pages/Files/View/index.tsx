import { FileWithDataFragment } from 'src/gql/generated'
import { FilesViewListStyled, FilesViewStyled } from './styles'
import { FileItem } from './FileItem'
import { Pagination } from 'src/components/Pagination'

type FilesViewProps = {
  files: FileWithDataFragment[]
  count: number
  page: number
}

export const FilesView: React.FC<FilesViewProps> = ({
  files,
  count,
  page,
  ...other
}) => {
  const totalPages = count ? Math.floor(count / 10) + 1 : 0

  return (
    <FilesViewStyled {...other}>
      <FilesViewListStyled>
        {files.map((n) => {
          return <FileItem key={n.id} file={n} />
        })}
      </FilesViewListStyled>

      <Pagination currentPage={page} totalPages={totalPages} />
    </FilesViewStyled>
  )
}
