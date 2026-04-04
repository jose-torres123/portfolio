import { useContext } from "react";
import { ThemeContext } from "./context.js";
import type { ThemeContextValue } from "./context.js";

export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
