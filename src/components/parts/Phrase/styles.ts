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
    width: 100%;
  `,
  jpArea: {
    container: css`
      width: 100%;
    `,
    button: css`
      color: ${theme.palette.primary.light};
    `,
  },
})
