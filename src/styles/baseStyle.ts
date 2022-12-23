import { css } from 'styled-components'
import { baseFont } from 'styles/mixins'

export const baseStyle = css`
  body {
    ${baseFont()}
    color: ${({ theme }) => theme.palette.text.primary};
  }

  * {
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    letter-spacing: 0;
    overflow-wrap: break-word;
    list-style: none;
    text-transform: none !important;
  }

  img {
    display: block;
    width: 100%;
  }

  a {
    display: block;
  }

  sup {
    font-size: 80%;
    line-height: 1em;
    color: inherit;
    font-weight: inherit;
  }

  pre {
    display: block;
    width: 100%;
    white-space: pre-wrap;
  }

  svg {
    display: block;
  }
`
