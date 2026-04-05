import styled from 'styled-components'

export const LearnStageTechnologyStyled = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  background: #f9fafb;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
`

export const TechnologyName = styled.span`
  font-weight: 500;
  color: #1f2937;

  a {
    color: inherit;
    text-decoration: none;

    &:hover {
      color: #3b82f6;
    }
  }
`

export const TechnologyLevel = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border-radius: 4px;
  background: #e5e7eb;
  cursor: help;

  svg {
    width: 12px;
    height: 12px;
    color: #6b7280;
  }
`
