import reactConfig from "@repo/config/eslint/react.js";
import tseslint from "typescript-eslint";

export default tseslint.config(...reactConfig, {
  languageOptions: {
    parserOptions: {
      project: true,
      tsconfigRootDir: import.meta.dirname,
    },
  },
  ignores: ["dist/**", "coverage/**", "src/lib/supabase/types.ts"],
});
