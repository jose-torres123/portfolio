# Supabase — Patrones Avanzados

## Auth
```typescript
// Login
const { data, error } = await supabase.auth.signInWithPassword({ email, password });

// Signup
const { data, error } = await supabase.auth.signUp({ email, password, options: { data: { full_name } } });

// Session listener
const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => { ... });
// SIEMPRE cleanup: subscription.unsubscribe()
```

## Realtime
```typescript
const channel = supabase.channel('changes')
  .on('postgres_changes', { event: '*', schema: 'public', table: 'TABLE' }, (payload) => { ... })
  .subscribe();
// SIEMPRE cleanup: supabase.removeChannel(channel)
```

## Storage
```typescript
const { data, error } = await supabase.storage.from('bucket').upload(path, file);
const { data: { publicUrl } } = supabase.storage.from('bucket').getPublicUrl(path);
```

## Edge Functions (Deno)
```typescript
// supabase/functions/my-function/index.ts
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

serve(async (req) => {
  const supabase = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!);
  // ... lógica
  return new Response(JSON.stringify({ data }), { headers: { 'Content-Type': 'application/json' } });
});
```

## RLS Policies
```sql
-- Usuarios solo ven sus propios datos
CREATE POLICY "Users see own data" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

-- Usuarios solo editan sus propios datos
CREATE POLICY "Users update own data" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);
```
