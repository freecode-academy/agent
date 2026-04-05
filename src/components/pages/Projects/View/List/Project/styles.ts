import { ProjectLink } from 'src/components/Link/Project'
import styled from 'styled-components'

export const ProjectListProjectTitleStyled = styled(ProjectLink)`
  font-size: 1.125rem;
  font-weight: 600;
  color: #1f2937;
  text-decoration: none;

  &:hover {
    color: #3b82f6;
  }
`

export const ProjectListProjectStyled = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  grid-template-rows: auto auto auto;
  grid-template-areas:
    'title status'
    'author author'
    'description description';
  gap: 8px;
  background: #ffffff;
  border-radius: 12px;
  padding: 12px 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  border: 1px solid #e5e7eb;
  transition:
    box-shadow 0.2s,
    transform 0.2s;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
  }
`

export const ProjectTitleWrapper = styled.h3`
  grid-area: title;
  margin: 0;
  align-self: center;
`

export const ProjectStatusWrapper = styled.div`
  grid-area: status;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`

export const ProjectAuthorWrapper = styled.div`
  grid-area: author;
  display: flex;
  align-items: center;
  gap: 8px;
  align-self: center;
`

export const ProjectDescriptionWrapper = styled.p`
  grid-area: description;
  margin: 0;
  font-size: 0.875rem;
  color: #6b7280;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`

export const ProjectStatusBadge = styled.span<{ $status?: string }>`
  font-size: 0.75rem;
  padding: 2px 8px;
  border-radius: 9999px;
  font-weight: 500;
  background: ${({ $status }) => {
    switch ($status) {
      case 'Completed':
        return '#dcfce7'
      case 'Processing':
        return '#dbeafe'
      case 'New':
        return '#fef3c7'
      case 'Rejected':
        return '#fee2e2'
      default:
        return '#f3f4f6'
    }
  }};
  color: ${({ $status }) => {
    switch ($status) {
      case 'Completed':
        return '#166534'
      case 'Processing':
        return '#1e40af'
      case 'New':
        return '#92400e'
      case 'Rejected':
        return '#991b1b'
      default:
        return '#4b5563'
    }
  }};
`
