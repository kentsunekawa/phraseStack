// import from libraries
import { css } from 'styled-components'

// import from this project
import type { StyleBaseData } from 'hooks'

export const createFormStyles = ({ theme }: StyleBaseData) => ({
  rows: css`
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
  `,
  row: css`
    width: 100%;
  `,
})
