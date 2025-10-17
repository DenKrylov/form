import { z } from 'zod'

export const registerUserSchema = z
  .object({
    username: z
      .string()
      .min(1, 'Имя пользователя обязательно')
      .min(3, 'Минимум 3 символа'),
    email: z
      .string()
      .min(1, 'Электронная почта обязательна')
      .email('Введите корректный адрес электронной почты'),
    password: z
      .string()
      .min(1, 'Пароль обязателен')
      .min(6, 'Пароль должен содержать минимум 6 символов'),
    confirmPassword: z.string().min(1, 'Подтверждение пароля обязательно'),
    socialLinks: z.array(
      z.object({
        url: z
          .string()
          .trim()
          .optional()
          .transform((value) => value ?? '')
          .refine((value) => value.length === 0 || /^https?:\/\/.+/i.test(value), {
            message: 'Некорректный URL',
          }),
      }),
    ),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Пароли должны совпадать',
    path: ['confirmPassword'],
  })

export type RegisterUserFormValues = z.infer<typeof registerUserSchema>

export const registerUserDefaultValues: RegisterUserFormValues = {
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
  socialLinks: [{ url: '' }],
}

