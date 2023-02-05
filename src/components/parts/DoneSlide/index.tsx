// import from libraries
import 'styled-components/macro'
import { Button } from '@mui/material'

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
      <div css={styles.main}>
        <Button
          onClick={goNext}
          size='large'
          variant='outlined'
          css={styles.button}
        >
          Continue
        </Button>
      </div>
    </div>
  )
}
