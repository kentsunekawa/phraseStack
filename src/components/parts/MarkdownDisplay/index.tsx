import { useEffect } from "react"
import ReactMarkdown from "react-markdown"
import gfm from "remark-gfm"

import { useStyle } from "hooks"
import { createStyles } from "./styles"

type Props = {
  children: string
}

export const MarkdownDisplay: React.FC<Props> = ({ children }) => {
  const { styles } = useStyle(createStyles)

  useEffect(() => {
    const linkes = document.querySelectorAll("a")
    linkes.forEach((a) => {
      a.setAttribute("target", "_blank")
    })
  }, [])

  return (
    <div css={styles.container}>
      <ReactMarkdown rehypePlugins={[gfm]} className="markdown-body">
        {children}
      </ReactMarkdown>
    </div>
  )
}
