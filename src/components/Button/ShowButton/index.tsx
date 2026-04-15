import { EyeIcon } from 'src/components/icons/EyeIcon'
import { ShowButtonStyled } from './styles'

interface ShowButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactNode
}

export const ShowButton: React.FC<ShowButtonProps> = ({
  onClick,
  icon,
  ...other
}) => {
  return (
    <ShowButtonStyled onClick={onClick} type="button" {...other}>
      {icon ?? <EyeIcon />}
    </ShowButtonStyled>
  )
}
