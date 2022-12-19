// import from libraries
import 'styled-components/macro'

// import from this project
import { useStyle } from 'hooks'
import { MarkdownDisplay } from 'components/parts/MarkdownDisplay'
import { Heading } from 'components/parts/Texts'
import { Modal, Props as ModalProps } from 'components/parts/Modal'
import { createStyles } from './styles'

export type Props = ModalProps & {
  contents: {
    description?: string | null
    references?: string | null
  }
}

export const DescriptionModal: React.FC<Props> = ({
  contents,
  ...modalProps
}) => {
  const { styles } = useStyle(createStyles)

  const { description, references } = contents

  return (
    <Modal {...modalProps}>
      <div css={styles.container}>
        {description && (
          <div>
            <Heading size='h5'>Description</Heading>
            <div>
              <MarkdownDisplay>{description}</MarkdownDisplay>
            </div>
          </div>
        )}
        {references && (
          <div>
            <Heading size='h5'>References</Heading>
            <div>
              <MarkdownDisplay>{references}</MarkdownDisplay>
            </div>
          </div>
        )}
      </div>
    </Modal>
  )
}
