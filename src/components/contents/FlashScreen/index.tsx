// import from libraries
import 'styled-components/macro'
import GridLoader from 'react-spinners/GridLoader'

// import from this project
import { useStyle } from 'hooks'
import { createStyles } from './styles'

export const FlashScreen: React.FC = () => {
  const { styles } = useStyle(createStyles)

  return (
    <div css={styles.container}>
      <div css={styles.inner}>
        <GridLoader />
      </div>
    </div>
  )
}
