// import from libraries
import 'styled-components/macro'

// import from this project
import { useStyle } from 'hooks'
import { createStyles } from './styles'

export type Props = {
  max: number | null
  current: number | null
}

export const ProgressBar: React.FC<Props> = ({ max, current }) => {
  const width = max !== null && current !== null ? (current / max) * 100 : 0
  const { styles } = useStyle(createStyles, { width })

  return (
    <div css={styles.container}>
      <span css={styles.bar} />
    </div>
  )
}
