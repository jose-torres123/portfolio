# Configuraciones Detalladas

## ESLint (packages/config/eslint/)
```javascript
// base.js — config compartida
module.exports = {
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'plugin:react-hooks/recommended', 'prettier'],
  rules: {
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/explicit-function-return-type': 'warn',
    'react-hooks/exhaustive-deps': 'error',
    'no-console': ['warn', { allow: ['warn', 'error'] }],
  },
};

// En workspace apps/web/.eslintrc.cjs:
module.exports = { extends: ['@repo/eslint-config/base'] };
```

## TypeScript (packages/config/typescript/)
```json
// base.json
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "forceConsistentCasingInFileNames": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "jsx": "react-jsx",
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true
  }
}
```

## Prettier (root .prettierrc)
```json
{
  "semi": true,
  "singleQuote": true,
  "trailingComma": "all",
  "printWidth": 100,
  "tabWidth": 2,
  "plugins": ["prettier-plugin-tailwindcss"]
}
```

## Vite (apps/web/vite.config.ts)
```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: { alias: { '@': path.resolve(__dirname, './src') } },
  build: { rollupOptions: { output: { manualChunks: { vendor: ['react', 'react-dom'], supabase: ['@supabase/supabase-js'], query: ['@tanstack/react-query'] } } } },
});
```

## Tailwind (tailwind.config.ts)
```typescript
import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{ts,tsx}', '../../packages/ui/src/**/*.{ts,tsx}'],
  theme: { extend: {} },
  plugins: [require('tailwindcss-animate')],
} satisfies Config;
```
