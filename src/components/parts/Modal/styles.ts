// import from libraries
import { css } from 'styled-components'

// import from this project
import type { StyleBaseData } from 'hooks'

export const createStyles = ({ theme }: StyleBaseData) => ({
  closeButton: css`
    position: absolute;
    right: 0;
    top: 0;
  `,
})
