// import from libraries
import 'styled-components/macro'
import { Dialog, DialogProps, DialogContent } from '@mui/material'
import { Close } from '@mui/icons-material'

// import from this project
import { Heading } from 'components/parts/Texts'
import { IconButton } from 'components/parts/IconButton'

export type Props = DialogProps & {
  title?: string
}

export const Modal: React.FC<Props> = ({ children, title, ...restProps }) => {
  const { onClose } = restProps

  return (
    <Dialog {...restProps}>
      <DialogContent>
        <div>
          {onClose && (
            <IconButton
              icon={<Close />}
              onClick={() => onClose({}, 'backdropClick')}
            />
          )}
          {title && (
            <div>
              <Heading>{title}</Heading>
            </div>
          )}
          <div>{children}</div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
