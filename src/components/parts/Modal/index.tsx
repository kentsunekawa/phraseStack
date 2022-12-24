// import from libraries
import 'styled-components/macro'
import {
  Dialog,
  DialogProps,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Button,
} from '@mui/material'
import { Close } from '@mui/icons-material'

// import from this project
import { useStyle } from 'hooks'
import { createStyles } from './styles'

export type Props = DialogProps & {
  title?: string
  actions?: {
    label: string
    action: () => void
  }[]
}

export const Modal: React.FC<Props> = ({
  children,
  title,
  actions,
  ...restProps
}) => {
  const { onClose } = restProps

  const { styles } = useStyle(createStyles)

  return (
    <Dialog {...restProps}>
      {title && <DialogTitle>{title}</DialogTitle>}
      {children && (
        <DialogContent>
          {onClose && (
            <IconButton
              onClick={() => onClose({}, 'backdropClick')}
              css={styles.closeButton}
            >
              <Close />
            </IconButton>
          )}
          <div>{children}</div>
        </DialogContent>
      )}
      {actions && (
        <DialogActions>
          {actions.map(({ action, label }, i) => (
            <Button onClick={() => action()} key={`${i.toString()}`}>
              {label}
            </Button>
          ))}
        </DialogActions>
      )}
    </Dialog>
  )
}
