// import from libraries
import 'styled-components/macro'
import { IconButton } from '@mui/material'
import { Settings } from '@mui/icons-material'

// import from this project
import { useStyle, toggleSettingMenu } from 'hooks'
import { SettingMenu } from 'components/contents/SettingMenu'
import { createStyles } from './styles'

type Props = { children: React.ReactNode }

export const Frame: React.FC<Props> = ({ children }) => {
  const { styles } = useStyle(createStyles)

  return (
    <>
      <SettingMenu />
      <IconButton
        css={styles.settingMenuButton}
        onClick={() => toggleSettingMenu(true)}
      >
        <Settings />
      </IconButton>
      {children}
    </>
  )
}
