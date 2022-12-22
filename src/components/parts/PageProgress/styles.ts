// import from libraries
import { css } from 'styled-components'

// import from this project
import { StyleBaseData } from 'hooks'

export const createStyles = ({ theme }: StyleBaseData) => {
  const text = css`
    font-size: 26px;
  `

  return {
    container: css`
      position: relative;
      width: 60px;
      &:before {
        content: '';
        padding-top: 60px;
        display: block;
      }
    `,
    slash: css`
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 26px;
    `,
    num: css`
      position: absolute;
      top: 5%;
      left: 15%;
      font-size: 18px;
      text-align: center;
    `,
    max: css`
      position: absolute;
      bottom: 5%;
      right: 15%;
      font-size: 18px;
      text-align: center;
    `,
  }
}
