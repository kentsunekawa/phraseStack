// import from libraries
import 'styled-components/macro'

// import from this project
import {
  useStyle,
  useSettingMenu,
  toggleSettingMenu,
  useFormStyles,
} from 'hooks'
import { Modal } from 'components/parts/Modal'
import { PageNumSelector } from './PageNumSelector'
import { createStyles } from './styles'

export const SettingMenu: React.FC = () => {
  const { styles } = useStyle(createStyles)
  const { styles: formStyles } = useFormStyles()

  const { isOpen } = useSettingMenu()

  return (
    <Modal
      open={isOpen}
      onClose={() => toggleSettingMenu(false)}
      title='Setting'
      actions={[
        {
          label: 'Close',
          action: () => toggleSettingMenu(false),
        },
      ]}
    >
      <div css={styles.container}>
        <div css={formStyles.rows}>
          <div css={formStyles.row}>
            <PageNumSelector />
          </div>
        </div>
      </div>
    </Modal>
  )
}
