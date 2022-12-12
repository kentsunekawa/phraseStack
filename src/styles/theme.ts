import { createTheme } from '@mui/material/styles'

export const muiTheme = createTheme()

export const combinedDefaultTheme = {
  ...muiTheme,
}

export type MuiTheme = typeof muiTheme
export type CombinedDefaultTheme = typeof combinedDefaultTheme
