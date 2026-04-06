import styled from 'styled-components'

export const UsersViewStyled = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
`

export const UsersViewGridStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`

export const UsersViewCardToolbarStyled = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`

export const UsersViewCardStyled = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  display: flex;
  flex-direction: column;
  gap: 10px;
`
