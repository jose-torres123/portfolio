import reactConfig from "@repo/config/eslint/react";

export default [
  ...reactConfig,
  {
    languageOptions: {
      parserOptions: {
        project: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    ignores: ["dist/**"],
  },
];
