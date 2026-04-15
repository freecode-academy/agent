import { FileWithDataFragment } from 'src/gql/generated'
import {
  FileItemStyled,
  FileItemImageStyled,
  FileItemMetaStyled,
  FileItemErrorStyled,
} from './styles'
import { useResizedImage } from 'src/hooks/useResizedImage'
import { UserLink } from 'src/components/Link/User'
import { FormattedDate } from 'src/ui-kit/format/FormattedDate'
import { useBoolean } from 'src/hooks/useBoolean'

type FileItemProps = {
  file: FileWithDataFragment
}

export const FileItem: React.FC<FileItemProps> = ({ file, ...other }) => {
  const [hasError, setHasError] = useBoolean()

  const src = useResizedImage({
    path: file.path,
    size: 'thumb',
  })

  return (
    <FileItemStyled {...other}>
      <FileItemImageStyled>
        {hasError ? (
          <FileItemErrorStyled>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <span>Ошибка загрузки</span>
          </FileItemErrorStyled>
        ) : (
          src && <img src={src} alt="" onError={setHasError} />
        )}
      </FileItemImageStyled>
      <FileItemMetaStyled>
        <FormattedDate value={file.createdAt} format="dateTimeShort" />
        {file.CreatedBy && <UserLink user={file.CreatedBy} />}
      </FileItemMetaStyled>
    </FileItemStyled>
  )
}
