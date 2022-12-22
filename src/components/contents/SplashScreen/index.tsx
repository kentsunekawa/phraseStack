// import from libraries
import 'styled-components/macro'
import GridLoader from 'react-spinners/GridLoader'

// import from this project
import { useStyle, useFixWindowHeight } from 'hooks'
import { createStyles } from './styles'

export const SplashScreen: React.FC = () => {
  const { styles, theme } = useStyle(createStyles)

  const { wrapperRef } = useFixWindowHeight()

  return (
    <div css={styles.container} ref={wrapperRef}>
      <div css={styles.inner}>
        <GridLoader color={theme.palette.primary.main} size={12} />
      </div>
    </div>
  )
}
