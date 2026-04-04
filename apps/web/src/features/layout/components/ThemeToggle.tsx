import { Sun, Moon, Monitor } from "lucide-react";
import { useTheme } from "@/lib/theme/index.js";
import type { Theme } from "@/lib/theme/index.js";

const THEMES: { value: Theme; icon: React.JSX.Element; label: string }[] = [
  { value: "light", icon: <Sun className="size-3.5" />, label: "Light" },
  { value: "system", icon: <Monitor className="size-3.5" />, label: "System" },
  { value: "dark", icon: <Moon className="size-3.5" />, label: "Dark" },
];

export function ThemeToggle(): React.JSX.Element {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex items-center gap-0.5 rounded-lg border border-border/50 p-0.5">
      {THEMES.map((t) => (
        <button
          key={t.value}
          type="button"
          onClick={() => setTheme(t.value)}
          className={`rounded-md p-1.5 transition-colors ${
            theme === t.value
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:text-foreground"
          }`}
          aria-label={t.label}
        >
          {t.icon}
        </button>
      ))}
    </div>
  );
}
