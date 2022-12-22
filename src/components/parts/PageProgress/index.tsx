// import from libraries
import 'styled-components/macro'

// import from this project
import { useStyle } from 'hooks'
import { Text } from 'components/parts/Texts'
import { createStyles } from './styles'

export type PageInfo = {
  pageNum: number | string
  maxNum: number | string
}

export type Props = {
  pageInfo: PageInfo
}

export const PageProgress: React.FC<Props> = ({
  pageInfo: { pageNum, maxNum },
}) => {
  const { styles } = useStyle(createStyles)

  return (
    <div css={styles.container}>
      <Text css={styles.num}>{pageNum}</Text>
      <Text css={styles.slash}>/</Text>
      <Text css={styles.max}>{maxNum}</Text>
    </div>
  )
}
