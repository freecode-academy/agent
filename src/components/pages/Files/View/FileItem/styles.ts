import styled from 'styled-components'

export const FileItemImageStyled = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 1;
  border-radius: 8px;
  overflow: hidden;
  background: #f3f4f6;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.2s;
  }
`

export const FileItemErrorStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  color: #9ca3af;
  font-size: 0.75rem;
  text-align: center;
  gap: 4px;

  svg {
    width: 24px;
    height: 24px;
    opacity: 0.6;
  }
`

export const FileItemMetaStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 8px 0 0;
  font-size: 0.75rem;
  color: #6b7280;
`

export const FileItemStyled = styled.div`
  display: flex;
  flex-direction: column;
  background: #ffffff;
  border-radius: 12px;
  padding: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  border: 1px solid #e5e7eb;
  transition:
    box-shadow 0.2s,
    transform 0.2s;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);

    ${FileItemImageStyled} img {
      transform: scale(1.05);
    }
  }
`
