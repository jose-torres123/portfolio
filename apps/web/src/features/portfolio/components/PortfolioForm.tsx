import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle, Button, Input } from '@repo/ui'
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@repo/ui'
import { useCreatePortfolioForm, usePortfolioMutations } from '../hooks'
import type { CreatePortfolioInput } from '../types'

interface PortfolioFormProps {
  onSuccess?: () => void
}

export function PortfolioForm({ onSuccess }: PortfolioFormProps) {
  const form = useCreatePortfolioForm()
  const { createMutation } = usePortfolioMutations()
  const [technologies, setTechnologies] = useState<string[]>([])
  const [techInput, setTechInput] = useState('')

  const onSubmit = async (data: CreatePortfolioInput) => {
    createMutation.mutate(
      { ...data, technologies: technologies.length > 0 ? technologies : data.technologies },
      {
        onSuccess: () => {
          form.reset()
          setTechnologies([])
          onSuccess?.()
        },
      },
    )
  }

  const addTechnology = () => {
    if (techInput.trim() && !technologies.includes(techInput.trim())) {
      setTechnologies([...technologies, techInput.trim()])
      setTechInput('')
    }
  }

  const removeTechnology = (tech: string) => {
    setTechnologies(technologies.filter(t => t !== tech))
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-2xl"
    >
      <Card>
        <CardHeader>
          <CardTitle>Crear Nuevo Proyecto</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Título</FormLabel>
                    <FormControl>
                      <Input placeholder="Nombre del proyecto" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descripción</FormLabel>
                    <FormControl>
                      <textarea
                        placeholder="Descripción breve del proyecto"
                        className="w-full h-24 px-3 py-2 border rounded"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="image_url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>URL de Imagen</FormLabel>
                    <FormControl>
                      <Input placeholder="https://ejemplo.com/imagen.jpg" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div>
                <FormLabel>Tecnologías</FormLabel>
                <div className="flex gap-2 mb-2">
                  <Input
                    placeholder="Agregar tecnología"
                    value={techInput}
                    onChange={e => setTechInput(e.target.value)}
                    onKeyPress={e => e.key === 'Enter' && (e.preventDefault(), addTechnology())}
                  />
                  <Button type="button" onClick={addTechnology} size="sm">
                    Agregar
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {technologies.map(tech => (
                    <span
                      key={tech}
                      className="text-xs bg-primary/10 text-primary px-2 py-1 rounded flex items-center gap-2"
                    >
                      {tech}
                      <button
                        type="button"
                        onClick={() => removeTechnology(tech)}
                        className="hover:text-primary/70"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              <FormField
                control={form.control}
                name="github_url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>URL GitHub (opcional)</FormLabel>
                    <FormControl>
                      <Input placeholder="https://github.com/usuario/proyecto" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="live_url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>URL en Vivo (opcional)</FormLabel>
                    <FormControl>
                      <Input placeholder="https://proyecto.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                disabled={createMutation.isPending}
                className="w-full"
              >
                {createMutation.isPending ? 'Guardando...' : 'Crear Proyecto'}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </motion.div>
  )
}
