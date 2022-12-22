// import from libraries
import 'styled-components/macro'

// import from this project
import { useStyle, useFixWindowHeight } from 'hooks'
import { createStyles } from './styles'

export type Props = {
  goNext: () => void
}

export const DoneSlide: React.FC<Props> = ({ goNext }) => {
  const { styles } = useStyle(createStyles)
  const { wrapperRef } = useFixWindowHeight()

  return (
    <div css={styles.container} ref={wrapperRef}>
      <button type='button' onClick={goNext}>
        続ける
      </button>
    </div>
  )
}
