import styled, { css } from 'styled-components'
import { ResourceVariant } from './interfaces'

type ResourceStyledProps = {
  $variant: ResourceVariant
}

export const ResourceBannerStyled = styled.div`
  background: #fff3cd;
  border: 1px solid #ffc107;
  color: #856404;
  padding: 12px 16px;
  border-radius: 4px;
  margin-bottom: 20px;
`

type ResourceTitleStyledProps = {
  $variant: ResourceVariant
}

export const ResourceTitleStyled = styled.h2<ResourceTitleStyledProps>`
  margin: 0 0 ${({ $variant }) => ($variant === 'list' ? '8px' : '16px')};
  font-size: ${({ $variant }) => ($variant === 'list' ? '1.25rem' : '2rem')};

  ${({ $variant }) =>
    $variant === 'list' &&
    css`
      cursor: pointer;

      &:hover {
        color: #0066cc;
      }
    `}
`

export const ResourceDescriptionStyled = styled.p`
  margin: 0 0 12px;
  color: #666;
`

export const ResourceMetaStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-bottom: 24px;
`

export const ResourceAuthorStyled = styled.span``

export const ResourceDateStyled = styled.span``

export const ResourceIntroStyled = styled.p`
  font-size: 1.125rem;
  color: #444;
  margin-bottom: 24px;
  font-style: italic;
`

export const ResourceContentStyled = styled.div`
  line-height: 1.6;

  &:empty {
    display: none;
  }
`

export const ResourceStyledToolbar = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`

export const ResourceStyled = styled.article<ResourceStyledProps>`
  ${({ $variant }) =>
    $variant === 'list' &&
    css`
      padding: 16px;
      border: 1px solid #eee;
      border-radius: 8px;
    `}
`
