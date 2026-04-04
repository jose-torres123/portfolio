# 📋 Plan de Desarrollo — Portfolio CMS

## ✅ Estado Actual (4 Abril 2026)
- Monorepo inicializado con Turborepo + React/Vite
- Feature `portfolio` scaffolding completado
- **NUEVA: Feature `auth` COMPLETADA** (v1.0.0 → v1.0.1)
- Servidor de desarrollo corriendo (`pnpm dev → http://localhost:3000`)
- Supabase tipos placeholder (en espera de CLI)

---

## 🎯 Fases de Implementación

### FASE 1: Portfolio Feature (ACTUAL)
**Objetivo**: Listar y detallar proyectos del portafolio  
**Duración estimada**: 2-3 horas  
**Status**: EN PROGRESO

#### 1.1 UI / Componentes Portfolio
- [ ] `PortfolioList.tsx` — Grid responsive con tarjetas animadas (Framer Motion)
- [ ] `PortfolioDetail.tsx` — Modal/página de detalle
- [ ] Integración con Tailwind responsive (mobile-first)
- [ ] Verificar shadcn/ui componentes necesarios

#### 1.2 Hooks & Queries con TanStack Query
- [ ] `usePortfolios()` — Fetch lista (con cache 5 min)
- [ ] `usePortfolio(id)` — Fetch detalle individual
- [ ] Loading states + error handling
- [ ] Optimistic updates (si hay mutations)

#### 1.3 Página de Portfolio
- [ ] `src/app/features/portfolio/page.tsx` o ruta equivalente
- [ ] Integración con React Router
- [ ] Loading skeletons con Framer Motion
- [ ] Empty states

#### 1.4 Validación
- [ ] `pnpm type-check` → sin errores
- [ ] `pnpm lint` → sin warnings
- [ ] Tests básicos en `__tests__/`

---

### FASE 3: Autenticación Completa (✅ COMPLETADA)
**Objetivo**: Implementar auth con Context API + Formularios + Router protection  
**Duración**: ~45 minutos  
**Status**: ✅ DONE

#### 3.1 Hooks & Context
- [x] `useAuth()` — Context con estado de usuario
- [x] `login(email, password)` — Mock auth
- [x] `signup(email, password)` — Mock auth
- [x] `logout()` — Limpiar sesión
- [x] Persistencia en localStorage con validación de expiración

#### 3.2 Forms con Zod + React Hook Form
- [x] `LoginForm.tsx` — email + password + validación
- [x] `SignupForm.tsx` — email + password + confirm
- [x] Schemas Zod en `types/auth.schemas.ts`
- [x] Manejo de errores y loading states
- [x] Framer Motion para transiciones

#### 3.3 Pages & Router
- [x] `LoginPage.tsx` — Ruta `/login`
- [x] `SignupPage.tsx` — Ruta `/signup`
- [x] `PrivateRoute.tsx` — Wrapper para proteger rutas
- [x] Integración en `app.tsx` y `main.tsx`
- [x] Links de navegación entre login/signup

#### 3.4 Tests & Calidad
- [x] Tests básicos en `__tests__/`
- [x] Validación Zod con casos de error
- [x] Tipos Completos (sin `any`)
- [x] Barrel exports configurados

#### 3.5 Archivos Creados
✅ **14 archivos nuevos:**
- `types/auth.schemas.ts` + `auth.types.ts` + `index.ts`
- `hooks/useAuth.tsx` + `useLoginForm.ts` + `useSignupForm.ts` + `index.ts`
- `components/LoginForm.tsx` + `SignupForm.tsx` + `index.ts`
- `pages/LoginPage.tsx` + `SignupPage.tsx` + `index.ts`
- `utils/PrivateRoute.tsx` + `index.ts`
- `__tests__/useAuth.test.tsx` + `schemas.test.ts`
- Feature `index.ts` (barrel export)

✅ **2 archivos modificados:**
- `main.tsx` — Agregado `<AuthProvider>`
- `app.tsx` — Agregadas rutas `/login` y `/signup`

✅ **1 archivo renombrado:**
- `src/features/portfolio/__tests__/PortfolioForm.test.ts` → `.tsx`

#### Notas Importantes
- Mock auth sin integración real a Supabase Auth aún
- localStorage usa estructura `{ user, token, expiresAt }`
- PrivateRoute redirige a `/login` cuando no autenticado
- Forms con validación Zod en español
- Todos los tipos con `strict: true` en TypeScript

---

### FASE 2: Feature Blog (PLANIFICADO)
**Objetivo**: Crear, editar, publicar blog posts  
**Duración estimada**: 3-4 horas  
**Status**: PENDIENTE

- [ ] Componentes: BlogList, BlogDetail, BlogForm
- [ ] Services para CRUD
- [ ] Slug generation automático
- [ ] Publicación programada
- [ ] Página blog con búsqueda/filtrado

---

### FASE 3: Autenticación (PLANIFICADO)
**Objetivo**: Login/signup con Supabase Auth  
**Duración estimada**: 2-3 horas  
**Status**: PENDIENTE

- [ ] Supabase auth setup
- [ ] Hook `useAuth()` con contexto
- [ ] UI: Login, Signup, Profile
- [ ] PrivateRoute protection

---

### FASE 4: CMS Dashboard (PLANIFICADO)
**Objetivo**: Panel admin para gestionar contenido  
**Duración estimada**: 4-5 horas  
**Status**: PENDIENTE

- [ ] Layout dashboard (sidebar + header)
- [ ] Admin Portfolio (CRUD projects)
- [ ] Admin Blog (CRUD posts)
- [ ] TanStack Table para listings

---

### FASE 5: API de Estadísticas (PLANIFICADO)
**Objetivo**: Mostrar stats del portafolio  
**Duración estimada**: 1-2 horas  
**Status**: PENDIENTE

- [ ] Stats queries
- [ ] Cards de resumen
- [ ] Gráficos

---

## 🎬 ¿Qué Hacemos Primero?

**Opción A**: FASE 1 - Portfolio Feature (Recomendado)
- Scaffolding ya existe
- Feature más visible
- Base para otras features

**Opción B**: FASE 3 - Autenticación
- Desbloquea admin/dashboard
- Pero requiere portfolio primero

**Opción C**: Todo en orden: 1→2→3→4→5
- Plan completo pero más lento 
