// import from libraries
import { css } from 'styled-components'

// import from this project
import { destyle } from './destyle'
import { baseStyle } from './baseStyle'
import { githubMarkdown } from './githubMarkdown'

export const globalStyle = css`
  ${destyle}
  ${baseStyle}
  ${githubMarkdown}
`
