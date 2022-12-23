// import from libraries
import { css } from 'styled-components'

// import from this project
import type { StyleBaseData } from 'hooks'

export const createStyles = ({ theme }: StyleBaseData) => {
  const iconButton = css`
    background: ${theme.palette.primary.main};
    color: #fff;
  `

  return {
    descriptionButton: css`
      position: fixed;
      right: 16px;
      bottom: 16px;
      background: #ddd;
      z-index: 900;
      ${iconButton}
    `,
    listButton: css`
      position: fixed;
      left: 72px;
      bottom: 16px;
      background: #ddd;
      z-index: 900;
      ${iconButton}
    `,
    hide: css`
      display: none;
    `,
    progressBar: css`
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      z-index: 100;
    `,
    overlay: css`
      position: fixed;
      left: 0;
      bottom: 0;
      z-index: 100;
      width: 100vw;
      height: 72px;
      background: rgba(0, 0, 0, 0.1);
    `,
  }
}
