// import from libraries
import { css } from 'styled-components'

// import from this project
import type { StyleBaseData } from 'hooks'

export const createStyles = ({ theme }: StyleBaseData) => ({
  settingMenuButton: css`
    position: fixed;
    left: 16px;
    bottom: 16px;
    background: #ddd;
    z-index: 900;
    background: ${theme.palette.primary.main};
    color: #fff;
  `,
})
