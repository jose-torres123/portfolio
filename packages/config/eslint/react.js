import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import reactRefreshPlugin from "eslint-plugin-react-refresh";
import baseConfig from "./base.js";
import tseslint from "typescript-eslint";

export default tseslint.config(...baseConfig, {
  plugins: {
    react: reactPlugin,
    "react-hooks": reactHooksPlugin,
    "react-refresh": reactRefreshPlugin,
  },
  settings: { react: { version: "detect" } },
  rules: {
    ...reactPlugin.configs.recommended.rules,
    ...reactHooksPlugin.configs.recommended.rules,
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
    "react/react-in-jsx-scope": "off",
    "react/prop-types": "off",
  },
});
