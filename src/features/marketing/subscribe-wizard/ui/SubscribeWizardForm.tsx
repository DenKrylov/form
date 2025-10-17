import { useActionState } from 'react'

import { Alert, Button, Stack, TextField, Typography } from '@mui/material'

import {
  EMAIL_REGEX,
  subscribeWizardInitialState,
  type SubscribeWizardState,
  type SubscribeWizardStep,
} from '../model'

type WizardIntent = 'next' | 'back' | 'reset'

const resolveIntent = (formData: FormData): WizardIntent => {
  const intent = (formData.get('intent') as WizardIntent | null) ?? 'next'

  if (intent === 'back' || intent === 'reset') {
    return intent
  }

  return 'next'
}

const toStep = (formData: FormData, fallback: SubscribeWizardStep): SubscribeWizardStep => {
  const rawStep = formData.get('step') as SubscribeWizardStep | null

  if (rawStep === 'email' || rawStep === 'confirm' || rawStep === 'success') {
    return rawStep
  }

  return fallback
}

const nextWizardState = async (
  previousState: SubscribeWizardState,
  formData: FormData,
): Promise<SubscribeWizardState> => {
  const intent = resolveIntent(formData)

  if (intent === 'reset') {
    return { ...subscribeWizardInitialState }
  }

  if (intent === 'back') {
    return {
      step: 'email',
      email: previousState.email,
    }
  }

  const step = toStep(formData, previousState.step)

  if (step === 'email') {
    const emailFromForm = (formData.get('email') as string | null) ?? ''
    const email = emailFromForm.trim()

    if (!email) {
      return {
        step: 'email',
        email,
        error: 'Укажите электронную почту',
      }
    }

    if (!EMAIL_REGEX.test(email)) {
      return {
        step: 'email',
        email,
        error: 'Введите корректный адрес электронной почты',
      }
    }

    return {
      step: 'confirm',
      email,
    }
  }

  if (step === 'confirm') {
    const email = ((formData.get('email') as string | null) ?? previousState.email).trim()

    if (!email) {
      return {
        step: 'email',
        email,
        error: 'Укажите электронную почту',
      }
    }

    await new Promise((resolve) => setTimeout(resolve, 800))

    return {
      step: 'success',
      email,
      message: `Письмо с подтверждением отправлено на ${email}.`,
    }
  }

  return previousState
}

export const SubscribeWizardForm = () => {
  const [wizardState, formAction, isPending] = useActionState(
    nextWizardState,
    subscribeWizardInitialState,
  )

  const isEmailStep = wizardState.step === 'email'
  const isConfirmStep = wizardState.step === 'confirm'
  const isSuccessStep = wizardState.step === 'success'

  return (
    <Stack component="form" action={formAction} spacing={2.5} noValidate>
      <input type="hidden" name="step" value={wizardState.step} />

      {isEmailStep ? (
        <TextField
          name="email"
          type="email"
          label="Электронная почта"
          variant="outlined"
          fullWidth
          defaultValue={wizardState.email}
          autoComplete="email"
          error={Boolean(wizardState.error)}
          helperText={wizardState.error}
          disabled={isPending}
        />
      ) : null}

      {isConfirmStep ? (
        <Stack spacing={1.5}>
          <input type="hidden" name="email" value={wizardState.email} />
          <Typography variant="body1">
            Мы подпишем <strong>{wizardState.email}</strong> на обновления продукта.
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Подтвердите подписку или вернитесь, чтобы изменить адрес.
          </Typography>
        </Stack>
      ) : null}

      {isSuccessStep ? (
        <Alert severity="success">{wizardState.message ?? 'Подписка оформлена.'}</Alert>
      ) : null}

      {!isEmailStep && wizardState.error ? (
        <Alert severity="error">{wizardState.error}</Alert>
      ) : null}

      {isPending ? (
        <Alert severity="info" icon={false}>
          Обрабатываем запрос...
        </Alert>
      ) : null}

      <Stack direction="row" spacing={1.5} justifyContent="flex-end" flexWrap="wrap">
        {isConfirmStep ? (
          <Button
            type="submit"
            name="intent"
            value="back"
            variant="outlined"
            disabled={isPending}
          >
            Назад
          </Button>
        ) : null}

        {isSuccessStep ? (
          <Button type="submit" name="intent" value="reset" variant="outlined" disabled={isPending}>
            Подписать другой адрес
          </Button>
        ) : null}

        {!isSuccessStep ? (
          <Button type="submit" variant="contained" disabled={isPending}>
            {isConfirmStep ? 'Подтвердить подписку' : 'Продолжить'}
          </Button>
        ) : null}
      </Stack>
    </Stack>
  )
}
