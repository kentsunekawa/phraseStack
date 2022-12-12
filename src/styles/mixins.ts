// import from libraries
import { css, FlattenSimpleInterpolation } from 'styled-components'

// import from this project

import { CombinedDefaultTheme } from 'styles/theme'

// 共通フォント
export const baseFont = (): FlattenSimpleInterpolation => css`
  font-family: 'Roboto', Helvetica, Arial, sans-serif;
`

export const borderFrame = (theme: CombinedDefaultTheme) => css`
  border-radius: 8px;
  border: 1px solid ${theme.palette.grey[300]};
  overflow: hidden;
`
