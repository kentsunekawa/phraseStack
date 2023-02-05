import { ThemeProvider as StyledComponentsThemeProvider } from 'styled-components'
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles'
import { muiTheme, combinedDefaultTheme } from 'styles/theme'

type Props = {
  children?: React.ReactNode
}

export const ThemeProvider: React.FC<Props> = ({ children }) => (
  <MuiThemeProvider theme={muiTheme}>
    <StyledComponentsThemeProvider theme={combinedDefaultTheme}>
      {children}
    </StyledComponentsThemeProvider>
  </MuiThemeProvider>
)
