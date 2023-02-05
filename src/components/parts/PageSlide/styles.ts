// import from libraries
import { css } from 'styled-components'
import { rgba } from 'polished'

// import from this project
import type { StyleBaseData } from 'hooks'
import { limitedTextRow } from 'styles/mixins'

export const createStyles = ({ theme }: StyleBaseData) => ({
  container: css`
    position: relative;
    width: 100vw;
    height: 100vh;
    padding-top: 4px;
    border: 1px solid ${rgba(theme.palette.primary.main, 0.1)};
  `,
  titleArea: css`
    position: absolute;
    left: 0;
    top: 0;
    z-index: 1;
    width: 100%;
    height: 72px;
    overflow: hidden;
    background: #fafafa;
    border-bottom: 1px solid #ddd;
    padding: 16px 16px;
  `,
  title: css`
    ${limitedTextRow(2)}
    line-height: 22px;
    color: ${theme.palette.grey[700]};
  `,
  scrollArea: css`
    width: 100%;
    height: 100%;
    overflow-y: scroll;
  `,
  inner: css`
    padding: 96px 24px;
  `,
  mainArea: css`
    width: 100%;
  `,
  phrasesArea: css`
    display: flex;
    flex-wrap: wrap;
    gap: 16px 0;
  `,
  phraseItem: css`
    width: 100%;
  `,
})
