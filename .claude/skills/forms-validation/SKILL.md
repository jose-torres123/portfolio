---
name: forms-validation
description: Patrones de formularios con Zod + React Hook Form + shadcn/ui Form. Activar ante "formulario", "form", "validación", "input", "crear form", "editar form", "wizard", "multi-step".
license: MIT
compatibility: Requires react-hook-form, @hookform/resolvers, zod, and shadcn/ui Form components.
metadata:
  author: netxa
  version: "3.4"
model: opus
---

# Formularios — Zod + React Hook Form + shadcn/ui

## Estructura de Archivos por Feature
```
features/[feature]/
├── types/[feature].schemas.ts    ← Schemas Zod + tipos inferidos
├── hooks/useCreate[Feature]Form.ts
├── components/Create[Feature]Form.tsx
```

## Patrón Obligatorio
1. Schema Zod en `types/[feature].schemas.ts`
2. Hook con `useForm` + `zodResolver` en `hooks/`
3. Componente con `<Form>` + `<FormField>` + `<FormMessage>` de shadcn/ui
4. SIEMPRE deshabilitar submit durante `mutation.isPending`
5. Mensajes de validación en español para UI

## Convenciones de Naming
- Schema: `create[Entity]Schema`, `update[Entity]Schema`
- Tipo: `Create[Entity]Input`, `Update[Entity]Input`
- Hook: `useCreate[Entity]Form()`
- Componente: `Create[Entity]Form`

Para patrones detallados, código de ejemplo, y validaciones chilenas comunes: ver [references/PATTERNS.md](references/PATTERNS.md)

Para formularios multi-step/wizard: ver [references/WIZARD.md](references/WIZARD.md)

## Checklist Pre-Commit
- [ ] Schema Zod con mensajes en español
- [ ] Tipo inferido exportado
- [ ] Hook con `zodResolver`
- [ ] `<FormMessage />` en cada campo
- [ ] Submit deshabilitado durante `isPending`
- [ ] Mobile-first layout
- [ ] Test: submit válido + inválido
