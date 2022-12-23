// import from libraries
import { css } from 'styled-components'
import { rgba } from 'polished'

// import from this project
import type { StyleBaseData } from 'hooks'

type Args = {
  width: number
}

export const createStyles = ({ theme }: StyleBaseData, args?: Args) => ({
  container: css`
    position: relative;
    width: 100%;
    height: 4px;
    background: ${rgba(theme.palette.primary.main, 0.2)};
  `,
  bar: css`
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: ${`${args?.width ?? 0}%`};
    background: ${theme.palette.primary.main};
    transition: width 0.25s ease-in-out;
  `,
})
