import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().email('Email debe ser válido'),
  password: z.string().min(8, 'Contraseña debe tener mínimo 8 caracteres'),
})

export type LoginInput = z.infer<typeof loginSchema>

export const signupSchema = z
  .object({
    email: z.string().email('Email debe ser válido'),
    password: z.string().min(8, 'Contraseña debe tener mínimo 8 caracteres'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Las contraseñas no coinciden',
    path: ['confirmPassword'],
  })

export type SignupInput = z.infer<typeof signupSchema>
