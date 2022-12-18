// import from libraries
import 'styled-components/macro'

// import from this project
import { InsertStyles } from 'types'
import { useStyle } from 'hooks'
import { createStyles } from './styles'

export type Props = {
  icon: React.ReactNode
  onClick: () => void
  insertStyles?: InsertStyles<'container'>
}

export const IconButton: React.FC<Props> = ({
  icon,
  onClick,
  insertStyles,
}) => {
  const { styles } = useStyle(createStyles)

  return (
    <button
      css={[styles.container, insertStyles?.container]}
      type='button'
      onClick={onClick}
    >
      <div css={styles.iconWrapper}>{icon}</div>
    </button>
  )
}
