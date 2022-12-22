// import from libraries
import 'styled-components/macro'
import { Avatar } from '@mui/material'

// import from this project
import { useStyle } from 'hooks'
import { Subtitle } from 'components/parts/Texts'
import { createStyles } from './styles'

export type Props = {
  name: string
  url?: string
}

export const UserBox: React.FC<Props> = ({ name, url }) => {
  const { styles } = useStyle(createStyles)

  return (
    <div css={styles.container}>
      <Avatar
        src={url}
        sx={{
          width: 120,
          height: 120,
        }}
      />
      <div css={styles.name}>
        <Subtitle size='large'>{name}</Subtitle>
      </div>
    </div>
  )
}
