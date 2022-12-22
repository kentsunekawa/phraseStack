// import from libraries
import 'styled-components/macro'
import GridLoader from 'react-spinners/GridLoader'

// import from this project
import { useStyle, useLoading, useFixWindowHeight } from 'hooks'
import { createStyles } from './styles'

export const Loading: React.FC = () => {
  const { styles, theme } = useStyle(createStyles)
  const { isLoading } = useLoading()
  const { wrapperRef } = useFixWindowHeight()

  if (!isLoading) return null

  return (
    <div css={styles.container} ref={wrapperRef}>
      <div css={styles.inner}>
        <GridLoader color={theme.palette.primary.main} size={12} />
      </div>
    </div>
  )
}
