import styled from 'styled-components'

export const DesktopLayoutToolbarStyled = styled.div`
  display: flex;
  align-items: center;

  .tabs {
    flex: 1;
  }
`

/**
 * Этот компонент используется как минимум в CodeChallengeEditViewStyled,
 * так что общие стили раздела надо прописывать здесь.
 * В самый корень проекта эти стили нет особого смысла размещать
 */
export const DesktopLayoutStyled = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  font-size: 1rem;
  line-height: 1.5rem;

  .auth-reminder {
    padding: 10px;
    /* border-bottom: 1px solid lightgrey; */

    button {
      background: none;
      border: none;
      cursor: pointer;
      padding: 0;
      color: #17528c;
    }
  }

  code {
    background: #ddd;
    padding: 2px 4px;
    font-size: 90%;
  }

  code[class*='language-'],
  pre[class*='language-'] {
    background: none;
    white-space: pre-wrap;
  }

  :not(pre) > code[class*='language-'],
  pre[class*='language-'] {
    background: #f5f2f0;
  }
`
