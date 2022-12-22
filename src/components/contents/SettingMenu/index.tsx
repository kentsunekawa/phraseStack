// import from libraries
import 'styled-components/macro'

// import from this project
import { useStyle, useSettingMenu, toggleSettingMenu } from 'hooks'
import { Modal } from 'components/parts/Modal'

import { VoiceSelector } from './VoiceSelector'
import { PageNumSelector } from './PageNumSelector'
import { createStyles } from './styles'

export const SettingMenu: React.FC = () => {
  const { styles } = useStyle(createStyles)

  const { isOpen } = useSettingMenu()

  return (
    <Modal
      open={isOpen}
      onClose={() => toggleSettingMenu(false)}
      title='Setting'
    >
      <PageNumSelector />
      <VoiceSelector />
    </Modal>
  )
}
