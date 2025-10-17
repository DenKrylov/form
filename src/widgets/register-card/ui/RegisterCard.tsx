import { Paper, Stack, Typography } from '@mui/material'

import { RegisterUserForm } from '@/features/auth/register-user'

export const RegisterCard = () => {
  return (
    <Paper
      elevation={6}
      sx={{
        p: { xs: 3, md: 4 },
        width: '100%',
        maxWidth: 460,
        borderRadius: 4,
      }}
    >
      <Stack spacing={3}>
        <Stack spacing={0.5}>
          <Typography variant="h4" component="h1">
            Создайте аккаунт
          </Typography>
          <Typography variant="body2" color="text.secondary">
             Заполните форму, чтобы создать новый профиль всего за пару минут.
          </Typography>
        </Stack>
        <RegisterUserForm />
      </Stack>
    </Paper>
  )
}
