import { createTheme } from '@mui/material/styles'

export const muiTheme = createTheme({
  palette: {
    primary: {
      main: '#008B94',
      light: '#00B8C3',
      dark: '#005358',
    },
  },
})

export const combinedDefaultTheme = {
  ...muiTheme,
}

export type MuiTheme = typeof muiTheme
export type CombinedDefaultTheme = typeof combinedDefaultTheme
