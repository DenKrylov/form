import { useState } from 'react'
import { useForm, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Alert, Button, Stack, TextField, Typography } from '@mui/material'

import {
  registerUserSchema,
  registerUserDefaultValues,
  type RegisterUserFormValues,
} from '../model'

export const RegisterUserForm = () => {
  const [isSubmitted, setIsSubmitted] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm<RegisterUserFormValues>({
    defaultValues: registerUserDefaultValues,
    mode: 'onBlur',
    resolver: zodResolver(registerUserSchema),
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'socialLinks',
  })

  const addSocialLink = () => append({ url: '' })
  const removeSocialLink = (index: number) => remove(index)

  const onSubmit = handleSubmit(async (formValues) => {
    setIsSubmitted(false)

    await new Promise((resolve) => setTimeout(resolve, 500))

    console.info('Данные формы регистрации:', formValues)
    setIsSubmitted(true)
    reset(registerUserDefaultValues)
  })

  return (
    <Stack component="form" spacing={3} onSubmit={onSubmit} noValidate>
      {isSubmitted ? (
        <Alert severity="success" onClose={() => setIsSubmitted(false)}>
          Пользователь успешно зарегистрирован
        </Alert>
      ) : null}

      <TextField
        {...register('username')}
        autoComplete="username"
        label="Имя пользователя"
        variant="outlined"
        fullWidth
        error={Boolean(errors.username)}
        helperText={errors.username?.message}
      />

      <TextField
        {...register('email')}
        type="email"
        autoComplete="email"
        label="Электронная почта"
        variant="outlined"
        fullWidth
        error={Boolean(errors.email)}
        helperText={errors.email?.message}
      />

      <TextField
        {...register('password')}
        type="password"
        autoComplete="new-password"
        label="Пароль"
        variant="outlined"
        fullWidth
        error={Boolean(errors.password)}
        helperText={errors.password?.message}
      />

      <TextField
        {...register('confirmPassword')}
        type="password"
        autoComplete="new-password"
        label="Подтверждение пароля"
        variant="outlined"
        fullWidth
        error={Boolean(errors.confirmPassword)}
        helperText={errors.confirmPassword?.message}
      />

      <Stack spacing={1.5}>
        <Typography variant="subtitle1" component="h3">
          Социальные ссылки — необязательно
        </Typography>

        <Stack spacing={1.5}>
          {fields.length === 0 ? (
            <Typography variant="body2" color="text.secondary">
              Добавьте ссылку, чтобы поделиться профилем.
            </Typography>
          ) : null}

          {fields.map((field, index) => (
            <Stack
              key={field.id}
              direction={{ xs: 'column', sm: 'row' }}
              spacing={1.5}
              alignItems={{ sm: 'flex-end' }}
            >
              <TextField
                {...register(`socialLinks.${index}.url` as const)}
                label={`Ссылка ${index + 1}`}
                variant="outlined"
                fullWidth
                error={Boolean(errors.socialLinks?.[index]?.url)}
                helperText={errors.socialLinks?.[index]?.url?.message}
              />
              <Button type="button" variant="outlined" color="secondary" onClick={() => removeSocialLink(index)}>
                Удалить
              </Button>
            </Stack>
          ))}
        </Stack>

        <Button type="button" variant="outlined" onClick={addSocialLink}>
          Добавить ссылку
        </Button>
      </Stack>

      <Button type="submit" size="large" variant="contained" disabled={isSubmitting}>
        Зарегистрироваться
      </Button>
    </Stack>
  )
}
