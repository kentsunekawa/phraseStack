// import from libraries
import { css } from 'styled-components'

// import from this project
import type { StyleBaseData } from 'hooks'

export const createStyles = ({ theme }: StyleBaseData) => ({
  container: css`
    display: flex;
    flex-wrap: wrap;
    gap: 12px 16px;
    align-items: center;
  `,
  phrase: css`
    width: calc(100% - 56px);
  `,
  pronounceButton: css`
    background: ${theme.palette.primary.main};
    color: #fff;
  `,
  jpArea: {
    container: css`
      width: 100%;
      padding-left: 56px;
    `,
    button: css`
      color: ${theme.palette.primary.light};
    `,
  },
})
