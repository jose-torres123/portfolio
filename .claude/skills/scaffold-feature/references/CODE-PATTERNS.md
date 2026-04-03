# Patrones de Código para Features

## Servicio — Usar tipos de @/lib/supabase/types
```typescript
import { supabase } from '@/lib/supabase/client';
import type { Database } from '@/lib/supabase/types';

type Row = Database['public']['Tables']['TABLE']['Row'];
type Insert = Database['public']['Tables']['TABLE']['Insert'];

export async function getAll(): Promise<Row[]> {
  const { data, error } = await supabase.from('TABLE').select('*').order('created_at', { ascending: false });
  if (error) throw new Error(`Failed to fetch: ${error.message}`);
  return data;
}
```

## Hooks — Query keys como constantes
```typescript
export const QUERY_KEYS = {
  all: ['TABLE'] as const,
  detail: (id: string) => ['TABLE', id] as const,
};
```

## Form — Zod + React Hook Form + shadcn/ui
```typescript
// types/[nombre].schemas.ts
export const create[Nombre]Schema = z.object({ /* campos */ });
export type Create[Nombre]Input = z.infer<typeof create[Nombre]Schema>;

// hooks/use[Nombre]Form.ts
export function useCreate[Nombre]Form() {
  return useForm<Create[Nombre]Input>({
    resolver: zodResolver(create[Nombre]Schema),
    defaultValues: {},
  });
}
```

## Componente — Mobile-first + Framer Motion
```tsx
<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-4 p-4 md:p-6 lg:p-8">
  <Card className="w-full">...</Card>
</motion.div>
```

## Tipos compartidos (si aplica)
En `packages/shared/src/types/[nombre].types.ts`:
```typescript
// Tipos de dominio usados cross-workspace
export interface UserProfile { ... }
```
Actualizar `packages/shared/src/types/index.ts`.

## Componentes compartidos (si aplica)
Crear en `packages/ui/src/components/`, NO en la feature.
