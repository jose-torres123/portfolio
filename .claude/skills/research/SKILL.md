---
name: research
description: Investigación técnica guiada para evaluar paquetes, APIs, y enfoques antes de implementar. Activar ante "qué opciones hay", "debería usar", "cuál es mejor", "investigar", "comparar", "evaluar". Incluye protocolo anti-alucinación.
license: MIT
compatibility: Requires internet access for documentation verification.
metadata:
  author: netxa
  version: "3.4"
model: opus
---

Investigación técnica guiada. Consultar SIEMPRE fuentes oficiales.

## Fuentes Oficiales
- Supabase: https://supabase.com/docs
- React: https://react.dev
- TanStack Query: https://tanstack.com/query/latest
- Tailwind: https://tailwindcss.com/docs
- shadcn/ui: https://ui.shadcn.com/docs
- Framer Motion: https://motion.dev/docs
- React Hook Form: https://react-hook-form.com/docs
- Zod: https://zod.dev

## Protocolo
1. Verificar codebase: ¿ya existe solución en nuestro monorepo?
2. Para paquetes npm: verificar existencia, descargas, última actualización, soporte TS.
3. Si no existe o está deprecado: DECIRLO. NUNCA inventar.
4. Reporte máximo 40 líneas con tabla de opciones (máx 5 filas).
5. Si extenso: escribir a `.claude/docs/research-[tema].md`.

## Formato
```
INVESTIGACIÓN: [Título]
VERIFICADO EN: [URLs]
OPCIONES: [tabla comparativa]
RECOMENDACIÓN: [con fuente]
CONFIANZA: [ALTA | MEDIA | BAJA]
```
