// import from libraries
import { css } from 'styled-components'

// import from this project
import type { StyleBaseData } from 'hooks'

export const createStyles = ({ theme }: StyleBaseData) => ({
  container: css`
    position: relative;
    width: 100vw;
    height: 100vh;
    background: ${theme.palette.primary.main};
  `,
  main: css`
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  `,
  button: css`
    border-color: #fff;
    color: #fff;
  `,
})
