import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { useSignupForm } from '../hooks/useSignupForm'
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Button,
  Input,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@repo/ui'
import { motion } from 'framer-motion'

export function SignupForm() {
  const navigate = useNavigate()
  const { signup, isLoading: authLoading, error: authError } = useAuth()
  const form = useSignupForm()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const isLoading = authLoading || isSubmitting

  async function onSubmit(data: { email: string; password: string; confirmPassword: string }) {
    setIsSubmitting(true)
    try {
      await signup(data.email, data.password)
      navigate('/')
    } catch {
      form.setError('root', {
        type: 'manual',
        message: 'Error al crear cuenta. Intenta de nuevo.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Crear cuenta</CardTitle>
          <CardDescription>Ingresa tus datos para registrarse</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
              {authError && (
                <div className="rounded-md bg-red-50 p-3 text-sm text-red-700">{authError}</div>
              )}

              {form.formState.errors.root && (
                <div className="rounded-md bg-red-50 p-3 text-sm text-red-700">
                  {form.formState.errors.root.message}
                </div>
              )}

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="tu@email.com"
                        type="email"
                        {...field}
                        disabled={isLoading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contraseña</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="••••••••"
                        type="password"
                        {...field}
                        disabled={isLoading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirmar contraseña</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="••••••••"
                        type="password"
                        {...field}
                        disabled={isLoading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? 'Creando cuenta...' : 'Crear cuenta'}
              </Button>

              <p className="text-center text-sm text-gray-600">
                ¿Ya tienes cuenta?{' '}
                <Link to="/login" className="font-medium text-blue-600 hover:underline">
                  Inicia sesión
                </Link>
              </p>
            </form>
          </Form>
        </CardContent>
      </Card>
    </motion.div>
  )
}
