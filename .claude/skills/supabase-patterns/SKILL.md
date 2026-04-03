---
name: supabase-patterns
description: Patrones VALIDADOS de Supabase para monorepo React+TanStack Query. Usar SIEMPRE al trabajar con Supabase. Activar ante "supabase", "database", "auth", "login", "signup", "storage", "realtime", "edge function", "RLS", "migration", "tabla", "query", "mutation". NUNCA improvisar patrones de Supabase sin consultar este skill.
license: MIT
compatibility: Requires Supabase CLI, supabase-js v2, and TanStack Query v5.
metadata:
  author: netxa
  version: "3.4"
model: opus
---

# Supabase — Patrones Validados

## Reglas Fundamentales
- TODAS las tablas con RLS habilitado. NUNCA desactivar.
- Tipos generados SIEMPRE desde `src/lib/supabase/types.ts`.
- NUNCA `service_role` key en frontend.
- NUNCA crear tipos manuales para tablas.
- Después de migration: regenerar tipos inmediatamente.

## Tipos
```typescript
import type { Database } from '@/lib/supabase/types';
type Row = Database['public']['Tables']['TABLE']['Row'];
type Insert = Database['public']['Tables']['TABLE']['Insert'];
type Update = Database['public']['Tables']['TABLE']['Update'];
```

## Query con error handling
```typescript
const { data, error } = await supabase.from('table').select('*');
if (error) throw new Error(`Failed: ${error.message}`);
return data;
```

Para patrones avanzados (auth, realtime, storage, edge functions, RLS): ver [references/ADVANCED.md](references/ADVANCED.md)

Para patrones de TanStack Query con Supabase: ver [references/TANSTACK.md](references/TANSTACK.md)
