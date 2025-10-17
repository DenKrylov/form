import { RegisterPage } from '@/pages/register'
import { AppThemeProvider } from './providers'

export const App = () => {
  return (
    <AppThemeProvider>
      <RegisterPage />
    </AppThemeProvider>
  )
}

export default App
