// import from libraries
import 'styled-components/macro'
import { Typography } from '@mui/material'

// import from this project
import { useStyle } from 'hooks'
import { createStyles } from 'styles/commonStyles/textStyles'

export type Props = React.ComponentProps<typeof Typography>

export const Caption: React.FC<Props> = ({ children, css, ...restProps }) => {
  const { styles } = useStyle(createStyles)

  return (
    <Typography css={[styles.caption, css]} {...restProps}>
      {children}
    </Typography>
  )
}
