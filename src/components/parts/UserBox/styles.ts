// import from libraries
import { css } from 'styled-components'

// import from this project
import type { StyleBaseData } from 'hooks'

export const createStyles = ({ theme }: StyleBaseData) => ({
  container: css`
    display: flex;
    flex-wrap: wrap;
    gap: 8px 0;
    justify-content: center;
  `,
  name: css`
    width: 100%;
  `,
})
