import styled, { css } from 'styled-components'
import { minWidth } from 'src/theme/helpers/media-query'

type OfferVariant = 'list' | 'full'

type OfferStyledProps = {
  $variant: OfferVariant
}

export const OfferImageStyled = styled.div<{ $variant: OfferVariant }>`
  position: relative;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.gray[100]};

  ${({ $variant }) =>
    $variant === 'list'
      ? css`
          aspect-ratio: 16 / 10;
          border-radius: 12px 12px 0 0;
        `
      : css`
          aspect-ratio: 21 / 9;
          border-radius: 16px;
          margin-bottom: 24px;

          ${minWidth.md(css`
            margin-bottom: 32px;
          `)}
        `}

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.4s ease;
  }
`

export const OfferImagePlaceholderStyled = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.gray[100]} 0%,
    ${({ theme }) => theme.colors.gray[200]} 100%
  );
  color: ${({ theme }) => theme.colors.gray[400]};
  font-size: 7rem;
`

export const OfferBannerStyled = styled.div`
  background: ${({ theme }) => theme.colors.warningBg};
  border: 1px solid ${({ theme }) => theme.colors.warning};
  color: ${({ theme }) => theme.colors.secondary};
  padding: 12px 16px;
  border-radius: 8px;
  margin-bottom: 20px;
  font-size: 0.875rem;
`

type OfferTitleStyledProps = {
  $variant: OfferVariant
}

export const OfferTitleStyled = styled.h2<OfferTitleStyledProps>`
  margin: 0;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text.primary};
  line-height: 1.3;
  letter-spacing: -0.02em;

  ${({ $variant }) =>
    $variant === 'list'
      ? css`
          font-size: 1.125rem;

          ${minWidth.sm(css`
            font-size: 1.25rem;
          `)}
        `
      : css`
          font-size: 1.75rem;

          ${minWidth.sm(css`
            font-size: 2.25rem;
          `)}

          ${minWidth.md(css`
            font-size: 2.75rem;
          `)}
        `}
`

export const OfferDescriptionStyled = styled.p`
  margin: 8px 0 0;
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 0.875rem;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`

export const OfferMetaDateStyled = styled.div`
  white-space: nowrap;
`

export const OfferMetaStyled = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 0.8125rem;
  color: ${({ theme }) => theme.colors.text.secondary};
  justify-content: space-between;

  ${minWidth.sm(css`
    font-size: 0.875rem;
  `)}
`

export const OfferAuthorStyled = styled.span`
  display: flex;
  align-items: center;
  gap: 6px;

  a {
    color: ${({ theme }) => theme.colors.primary};
    font-weight: 500;

    &:hover {
      color: ${({ theme }) => theme.colors.secondary};
    }
  }
`

export const OfferDateStyled = styled.span`
  &::before {
    content: '•';
    margin-right: 12px;
    color: ${({ theme }) => theme.colors.gray[300]};
  }
`

export const OfferIntroStyled = styled.p`
  font-size: 0.9375rem;
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: 1.6;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;

  ${minWidth.sm(css`
    font-size: 1rem;
  `)}
`

export const OfferContentStyled = styled.div`
  line-height: 1.7;
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 1rem;

  ${minWidth.md(css`
    font-size: 1.0625rem;
  `)}

  h2 {
    color: ${({ theme }) => theme.colors.text.primary};
    font-size: 1.5rem;
    font-weight: 600;
    margin: 32px 0 16px;

    &:first-child {
      margin-top: 0;
    }
  }

  h3 {
    color: ${({ theme }) => theme.colors.text.primary};
    font-size: 1.25rem;
    font-weight: 600;
    margin: 24px 0 12px;
  }

  p {
    margin: 0 0 16px;
  }

  ul,
  ol {
    margin: 0 0 16px;
    padding-left: 24px;
  }

  li {
    margin-bottom: 8px;
  }

  strong {
    color: ${({ theme }) => theme.colors.text.primary};
    font-weight: 600;
  }
`

export const OfferStyledToolbar = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 12px;
`

export const OfferHeaderInnerStyled = styled.div`
  flex: 1;
`

export const OfferHeaderStyled = styled.div<{ $variant: OfferVariant }>`
  ${({ $variant }) =>
    $variant === 'list'
      ? css`
          padding: 16px;
          flex: 1;
          display: flex;
          flex-direction: column;

          ${minWidth.sm(css`
            padding: 20px;
          `)}
        `
      : css`
          margin-bottom: 24px;

          ${minWidth.md(css`
            margin-bottom: 32px;
          `)}
        `};
`

export const OfferBodyStyled = styled.div<{ $variant: OfferVariant }>`
  ${({ $variant }) =>
    $variant === 'full' &&
    css`
      max-width: 720px;
    `}
`

export const OfferStyled = styled.article<OfferStyledProps>`
  ${({ $variant, theme }) =>
    $variant === 'list'
      ? css`
          background: ${theme.backgrounds.paper};
          border-radius: 16px;
          overflow: hidden;
          box-shadow: ${theme.shadows.card};
          transition:
            transform 0.3s ease,
            box-shadow 0.3s ease;

          display: flex;
          flex-direction: column;

          &:hover {
            transform: translateY(-4px);
            box-shadow: ${theme.shadows.cardHover};

            ${OfferImageStyled} img {
              transform: scale(1.05);
            }

            ${OfferTitleStyled} {
              color: ${theme.colors.primary};
            }
          }
        `
      : css`
          background: ${theme.backgrounds.paper};
          padding: 20px;
          border-radius: 20px;

          ${minWidth.sm(css`
            padding: 32px;
          `)}

          ${minWidth.md(css`
            padding: 48px;
          `)}
        `}
`
