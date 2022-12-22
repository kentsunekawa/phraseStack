// import from libraries
import 'styled-components/macro'
import { Settings } from '@mui/icons-material'

// import from this project
import { useStyle, toggleSettingMenu } from 'hooks'
import { SettingMenu } from 'components/contents/SettingMenu'
import { IconButton } from 'components/parts/IconButton'
import { createStyles } from './styles'

type Props = { children: React.ReactNode }

export const Frame: React.FC<Props> = ({ children }) => {
  const { styles } = useStyle(createStyles)

  return (
    <>
      <SettingMenu />
      <IconButton
        insertStyles={{ container: styles.settingMenuButton }}
        onClick={() => toggleSettingMenu(true)}
        icon={<Settings />}
      />
      {children}
    </>
  )
}
