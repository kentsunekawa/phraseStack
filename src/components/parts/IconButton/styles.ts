// import from libraries
import { css } from 'styled-components'

// import from this project
import { StyleBaseData } from 'hooks'

export const createStyles = ({ theme }: StyleBaseData) => ({
  container: css`
    position: relative;
    width: 40px;
    border-radius: 50%;
    overflow: hidden;
    &:before {
      content: '';
      display: block;
      padding-top: 100%;
    }
  `,
  iconWrapper: css`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    align-content: center;
  `,
})
