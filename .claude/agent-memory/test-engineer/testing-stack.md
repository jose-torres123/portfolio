---
name: Testing Stack
description: Vitest + Testing Library for unit tests, Playwright for e2e. Config details and file locations.
type: project
---

- Unit tests: Vitest with jsdom, globals:true, setup in `apps/web/src/test/setup.ts`
- e2e tests: Playwright with chromium + Mobile Chrome projects
- vite.config.ts has `test.exclude: ["e2e/**", "node_modules/**"]` to prevent Playwright files from being picked by Vitest
- Playwright config: `apps/web/playwright.config.ts`, testDir: `./e2e`, baseURL: `http://localhost:5173`
- Scripts: `test:e2e` and `test:e2e:ui` added to apps/web/package.json
- tsconfig does NOT include vitest global types — IDE shows errors for `describe/it/expect/vi` but tests run fine at runtime

**Why:** Separation ensures Vitest doesn't try to run Playwright spec files.
**How to apply:** Always check vite.config.ts exclude when adding new test directories.
