// import from libraries
import 'styled-components/macro'

// import from this project
import { useStyle } from 'hooks'
import { MarkdownDisplay } from 'components/parts/MarkdownDisplay'
import { Subtitle } from 'components/parts/Texts'
import { Modal, Props as ModalProps } from 'components/parts/Modal'
import { createStyles } from './styles'

export type Props = ModalProps & {
  dismiss: () => void
  contents: {
    description?: string | null
  }
}

export const DescriptionModal: React.FC<Props> = ({
  contents,
  dismiss,
  ...modalProps
}) => {
  const { styles } = useStyle(createStyles)

  const { description } = contents

  return (
    <Modal
      fullScreen
      onClose={dismiss}
      actions={[
        {
          label: 'Close',
          action: dismiss,
        },
      ]}
      {...modalProps}
    >
      <div css={styles.container}>
        {description && (
          <div css={styles.section.container}>
            <Subtitle size='large' css={styles.section.title}>
              Description
            </Subtitle>
            <div>
              <MarkdownDisplay>{description}</MarkdownDisplay>
            </div>
          </div>
        )}
      </div>
    </Modal>
  )
}
