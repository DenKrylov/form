import { Paper, Stack, Typography } from '@mui/material'

import { SubscribeWizardForm } from '@/features/marketing/subscribe-wizard'

export const SubscribeWizardCard = () => {
  return (
    <Paper
      elevation={4}
      sx={{
        p: { xs: 3, md: 4 },
        width: '100%',
        maxWidth: 400,
        borderRadius: 4,
      }}
    >
      <Stack spacing={3}>
        <Stack spacing={0.5}>
          <Typography variant="h4" component="h2">
            Подписка в два шага
          </Typography>
          <Typography variant="body2" color="text.secondary">
             Пройдите короткий мастер, чтобы получать новости о релизах на почту.
          </Typography>
        </Stack>
        <SubscribeWizardForm />
      </Stack>
    </Paper>
  )
}
