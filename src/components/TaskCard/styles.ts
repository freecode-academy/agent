import styled, { css } from 'styled-components'
import { Markdown } from '../Markdown'
import { minWidth } from 'src/theme/helpers'

export const TaskCardCardTitleStyled = styled.span`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 8px;

  ${minWidth.sm(css`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  `)}
`

export const TaskCardTitle = styled.h3`
  margin: 0;
  font-size: 1rem;
  font-weight: 600;
`

export const TaskCardStatus = styled.div``

export const TaskCardMeta = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.text.secondary};

  .date {
    display: flex;
    align-items: center;
    gap: 4px;
  }
`

type TaskCardDescriptionProps = {
  $variant: 'list' | 'full'
}

export const TaskCardDescription = styled(Markdown)<TaskCardDescriptionProps>`
  margin: 0;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.text.secondary};
  overflow: hidden;

  ${({ $variant }) =>
    $variant === 'full' &&
    css`
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    `}
`

export const TaskCardStyled = styled.div`
  background: ${({ theme }) => theme.backgrounds.paper};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  padding: ${({ theme }) => theme.spacing.md};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`
