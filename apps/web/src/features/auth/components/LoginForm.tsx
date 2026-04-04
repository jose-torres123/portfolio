import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { useLoginForm } from '../hooks/useLoginForm'
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
} from '@/lib/ui'
import { motion } from 'framer-motion'

export function LoginForm() {
  const navigate = useNavigate()
  const { login, isLoading: authLoading, error: authError } = useAuth()
  const form = useLoginForm()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const isLoading = authLoading || isSubmitting

  async function onSubmit(data: { email: string; password: string }) {
    setIsSubmitting(true)
    try {
      await login(data.email, data.password)
      navigate('/')
    } catch {
      // Error is handled by form.setError
      form.setError('root', {
        type: 'manual',
        message: 'Error al iniciar sesión. Verifica tus credenciales.',
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
          <CardTitle>Iniciar sesión</CardTitle>
          <CardDescription>Entre con tu email y contraseña</CardDescription>
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

              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? 'Iniciando sesión...' : 'Iniciar sesión'}
              </Button>

              <p className="text-center text-sm text-gray-600">
                ¿No tienes cuenta?{' '}
                <Link to="/signup" className="font-medium text-blue-600 hover:underline">
                  Regístrate
                </Link>
              </p>
            </form>
          </Form>
        </CardContent>
      </Card>
    </motion.div>
  )
}
