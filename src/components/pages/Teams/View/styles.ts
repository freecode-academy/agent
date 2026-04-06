import styled from 'styled-components'

export const TeamsGridStyled = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

export const TeamsViewStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`
