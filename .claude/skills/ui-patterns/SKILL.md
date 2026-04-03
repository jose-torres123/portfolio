---
name: ui-patterns
description: Patrones de UI probados con Tailwind + shadcn/ui + Framer Motion. Layouts responsive, dashboards, tablas de datos, modals, navegación, empty states, loading patterns. Activar ante "layout", "dashboard", "sidebar", "tabla", "modal", "navegación", "landing", "responsive", "diseño", "UI", "interfaz", "pantalla".
license: MIT
compatibility: Requires Tailwind CSS v4, shadcn/ui, Framer Motion, and Lucide React.
metadata:
  author: netxa
  version: "3.4"
model: opus
---

# UI Patterns — Tailwind + shadcn/ui + Framer Motion

## Principios (OBLIGATORIO)
1. **Mobile-first siempre**: diseñar para móvil, ampliar con `sm:`, `md:`, `lg:`.
2. **shadcn/ui primero**: usar componentes existentes antes de crear custom.
3. **Verificar instalados**: `ls packages/ui/src/components/ui/` antes de usar.
4. **Clases con `cn()`**: nunca template literals para clases condicionales.
5. **Animaciones sutiles**: Framer Motion para transiciones, no decoración.
6. **Estados completos**: loading → skeleton, error → fallback, empty → ilustración + CTA.

## Catálogo de Patrones

Para **layouts y navegación** (sidebar, topbar, responsive shell):
ver [references/LAYOUTS.md](references/LAYOUTS.md)

Para **tablas de datos** (filtros, paginación, sorting, selección):
ver [references/DATA-TABLES.md](references/DATA-TABLES.md)

Para **feedback y estados** (loading, empty, error, toasts, modals, confirmaciones):
ver [references/FEEDBACK.md](references/FEEDBACK.md)

Para **patrones de página** (dashboard, landing, detail, settings, auth):
ver [references/PAGES.md](references/PAGES.md)

## Cuándo Consultar Este Skill
- Antes de crear un layout nuevo → verificar si existe patrón.
- Antes de crear componentes de navegación → usar patrón de shell.
- Cuando una página necesita tabla de datos → usar patrón completo.
- Cuando necesitas estados de feedback → skeleton + error + empty.
