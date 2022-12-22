// import from libraries
import { css } from 'styled-components'

// import from this project
import { StyleBaseData } from 'hooks'

export const createStyles = ({ theme }: StyleBaseData) => ({
  container: css`
    position: relative;
    width: 100vw;
    height: 100vh;
  `,
  titleArea: css`
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 60px;
    overflow: hidden;
    background: #fafafa;
    border-bottom: 1px solid #ddd;
    display: flex;
  `,
  title: css`
    padding: 8px;
    width: calc(100% - 60px);
    height: 100%;
    width: 100%;
  `,
  scrollArea: css`
    width: 100%;
    height: 100%;
    overflow-y: scroll;
  `,
  inner: css`
    padding: 24px;
    padding-top: 84px;
  `,
  progress: css``,
})
