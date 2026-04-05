import styled from 'styled-components'
import { ProjectsListStyled } from './List/styles'

export const ProjectsViewStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  flex: 1;

  ${ProjectsListStyled} {
    flex: 1;
    min-height: 0;
  }
`
