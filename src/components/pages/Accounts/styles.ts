// import from libraries
import { css } from 'styled-components'

// import from this project
import type { StyleBaseData } from 'hooks'

export const createStyles = ({ theme }: StyleBaseData) => ({
  container: css`
    padding: 40px 24px;
  `,
  list: css`
    display: flex;
    flex-wrap: wrap;
  `,
  item: css`
    width: 50%;
  `,
  button: css`
    width: 100%;
  `,
})
