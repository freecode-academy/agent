import styled from 'styled-components'

export const FilesViewListStyled = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;

  @media (max-width: 640px) {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 12px;
  }
`

export const FilesViewStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`
