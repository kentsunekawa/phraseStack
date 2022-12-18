// import from libraries
import 'styled-components/macro'
import GridLoader from 'react-spinners/GridLoader'

// import from this project
import { useStyle, useLoading } from 'hooks'
import { createStyles } from './styles'

export const Loading: React.FC = () => {
  const { styles } = useStyle(createStyles)
  const { isLoading } = useLoading()

  if (!isLoading) return null

  return (
    <div css={styles.container}>
      <div css={styles.inner}>
        <GridLoader />
      </div>
    </div>
  )
}
