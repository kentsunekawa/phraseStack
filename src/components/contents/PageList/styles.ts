// import from libraries
import { css } from 'styled-components'
import { rgba } from 'polished'

// import from this project
import type { StyleBaseData } from 'hooks'

export const createStyles = ({ theme }: StyleBaseData) => {
  const itemBase = css`
    display: flex;
    align-content: center;
    align-items: center;
    width: 100%;
    height: 60px;
    text-align: left;
    padding: 8px 16px;
  `

  return {
    container: css`
      position: relative;
      width: 100vw;
      z-index: 990;
      background: #fff;
      padding-bottom: 60px;
    `,
    inner: css``,
    item: css`
      border-bottom: 1px solid ${theme.palette.divider};
    `,
    pageItem: css`
      ${itemBase}
      height: 60px;
    `,
    activeItem: css`
      ${itemBase}
      background: ${rgba(theme.palette.primary.main, 0.1)};
    `,
    loading: css`
      justify-content: center;
    `,
    numItem: css`
      ${itemBase}
      height: 40px;
      justify-content: center;
    `,
    closeButton: css`
      position: fixed;
      bottom: 16px;
      left: 16px;
      z-index: 1;
      background: ${theme.palette.primary.main};
      color: #fff;
    `,
  }
}
