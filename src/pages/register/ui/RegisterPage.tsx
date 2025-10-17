import { Box, Container } from '@mui/material'

import { RegisterCard } from '@/widgets/register-card'
import { SubscribeWizardCard } from '@/widgets/subscribe-wizard'

import './RegisterPage.css'

export const RegisterPage = () => {
  return (
    <Container component="section" maxWidth="md" className="register-page">
      <Box className="register-page__content">
        <RegisterCard />
        <SubscribeWizardCard />
      </Box>
    </Container>
  )
}
