---
name: Mock Patterns
description: Reusable vi.mock patterns for framer-motion, @repo/ui, i18n, theme in this portfolio project
type: project
---

## framer-motion mock
Passthrough div/form/section/h1/p/span/li/ul. AnimatePresence renders children.
Warning: `whileInView`, `whileHover`, `layoutId` leak as DOM props — harmless in tests.

## @repo/ui mock
Button with `asChild` prop renders `<>{children}</>` (passes through the <a> tag).
Input/Textarea/Label are plain HTML elements. Card/CardContent/CardFooter/Badge are divs/spans.

## i18n mock — `@/lib/i18n/index.js`
Returns `{ locale: "en", setLocale: vi.fn(), t: { ... } }`. Must include the full `t` structure the component needs.

## theme mock — `@/lib/theme/index.js`
Returns `{ theme: "system", resolved: "light", setTheme: vi.fn() }`.

## vi.mock path resolution
Mock paths must be relative to the TEST file, not the source file. E.g., Navbar imports `./ThemeToggle.js` but test mocks `../components/ThemeToggle.js`.

**Why:** Consistent mocks prevent flaky tests and speed up test creation.
**How to apply:** Copy-paste these patterns for any new component test in the portfolio.
