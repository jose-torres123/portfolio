# Patrones Detallados de Formularios

## Schema Zod Completo
```typescript
import { z } from 'zod';

export const createUserSchema = z.object({
  name: z.string().min(2, 'Mínimo 2 caracteres').max(100),
  email: z.string().email('Email inválido'),
  age: z.coerce.number().min(18, 'Debe ser mayor de edad').optional(),
});
export type CreateUserInput = z.infer<typeof createUserSchema>;
```

## Hook del Form
```typescript
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

export function useCreateUserForm() {
  return useForm<CreateUserInput>({
    resolver: zodResolver(createUserSchema),
    defaultValues: { name: '', email: '' },
  });
}
```

## Componente con shadcn/ui
```tsx
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@repo/ui';

export function CreateUserForm() {
  const form = useCreateUserForm();
  const mutation = useCreateUser();

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit((data) => mutation.mutate(data))} className="flex flex-col gap-4">
        <FormField control={form.control} name="name" render={({ field }) => (
          <FormItem>
            <FormLabel>Nombre</FormLabel>
            <FormControl><Input {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <Button type="submit" disabled={mutation.isPending}>
          {mutation.isPending ? 'Guardando...' : 'Crear'}
        </Button>
      </form>
    </Form>
  );
}
```

## Validaciones Chilenas Comunes
```typescript
const rutSchema = z.string().regex(/^\d{1,2}\.\d{3}\.\d{3}-[\dkK]$/, 'RUT inválido');
const phoneSchema = z.string().regex(/^\+56\d{9}$/, 'Formato: +56XXXXXXXXX');
const clpSchema = z.coerce.number().int().min(0, 'Debe ser positivo');
const emailSchema = z.string().email('Email inválido').toLowerCase();
const futureDateSchema = z.coerce.date().min(new Date(), 'Debe ser fecha futura');
const fileSchema = z.instanceof(File).refine(f => f.size < 5_000_000, 'Máximo 5MB');
```

## Updates Parciales
```typescript
export const updateUserSchema = createUserSchema.partial();
export type UpdateUserInput = z.infer<typeof updateUserSchema>;
```
