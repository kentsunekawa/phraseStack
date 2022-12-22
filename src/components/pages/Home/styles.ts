// import from libraries
import { css } from 'styled-components'

// import from this project
import { StyleBaseData } from 'hooks'

export const createStyles = ({ theme }: StyleBaseData) => ({
  descriptionButton: css`
    position: fixed;
    right: 20px;
    bottom: 20px;
    background: #ddd;
    z-index: 900;
  `,
  listButton: css`
    position: fixed;
    left: 80px;
    bottom: 20px;
    background: #ddd;
    z-index: 900;
  `,
  hide: css`
    display: none;
  `,
})
