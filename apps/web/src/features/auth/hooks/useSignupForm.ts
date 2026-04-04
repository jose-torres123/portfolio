import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { signupSchema, type SignupInput } from '../types'

export function useSignupForm() {
  return useForm<SignupInput>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  })
}
