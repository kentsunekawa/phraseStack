// import from libraries
import { css } from 'styled-components'

// import from this project
import type { StyleBaseData } from 'hooks'

export const createStyles = ({ theme }: StyleBaseData) => ({
  container: css`
    .markdown-body {
      font-size: 14px;
      ul,
      ol {
        li {
          list-style-type: circle !important;
        }
      }
      ul ul {
        li {
          list-style-type: circle !important;
        }
      }
      ul {
        li {
          list-style-type: disc !important;
        }
      }
    }
  `,
})
