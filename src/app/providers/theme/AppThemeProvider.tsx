import { CssBaseline, ThemeProvider, createTheme } from '@mui/material'
import type { PropsWithChildren } from 'react'

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#19857b',
    },
    background: {
      default: '#f4f6fb',
    },
  },
  shape: {
    borderRadius: 12,
  },
  typography: {
    fontFamily: ['"Roboto"', '"Helvetica"', '"Arial"', 'sans-serif'].join(', '),
  },
})

export const AppThemeProvider = ({ children }: PropsWithChildren) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  )
}

