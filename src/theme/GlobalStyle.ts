import { createGlobalStyle } from 'styled-components'
import { theme } from './index'
import { MarkdownEditorGlobalStyled } from 'src/components/Markdown/Editor/styles'

export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    margin-top: 0;
    margin-bottom: 0;

    &:focus {
      outline: none;
    }
  }

  html, body{
    height: 100%;
    padding: 0;
    margin: 0;
  }

  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    font-size: 16px;
    line-height: 1.6;
    background: ${theme.backgrounds.page};
    color: ${theme.colors.text.primary};
  }

  #__next {
    height: 100%;
  }

  a {
    text-decoration: none;
    color: ${theme.colors.foreground};
    
    &:hover {
      text-decoration: underline;
    }
    
    &:active {
      text-decoration: none;
    }
  }

  button {
    &:enabled {
      cursor: pointer;
    }
  }

  ${MarkdownEditorGlobalStyled}

  /* 
    Custom
  */

  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&display=swap');
  *, *::before, *::after { box-sizing: border-box; }
  html, body, #root { margin: 0; padding: 0; }
  body {
    background: ${theme.bg};
    color: ${theme.ink};
    font-family: ${theme.font};
    -webkit-font-smoothing: antialiased;
    line-height: 1.55;
  }
  img { display: block; max-width: 100%; }
  a { color: inherit; text-decoration: none; }
`
