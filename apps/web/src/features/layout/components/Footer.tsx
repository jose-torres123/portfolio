import { Mail } from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "@/shared/components/brand-icons.js";
import { useI18n } from "@/lib/i18n/index.js";

const SOCIAL_LINKS: { label: string; href: string; icon: React.JSX.Element }[] = [
  { label: "GitHub", href: "https://github.com/jose-torres123", icon: <GitHubIcon className="size-4" /> },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/jose-torres-ad13", icon: <LinkedInIcon className="size-4" /> },
  { label: "Email", href: "mailto:joseprox16@gmail.com", icon: <Mail className="size-4" /> },
];

export function Footer(): React.JSX.Element {
  const { t } = useI18n();

  return (
    <footer className="relative z-10 border-t border-border bg-background">
      <div className="mx-auto w-full max-w-7xl px-6 py-10 md:px-10 md:py-12 lg:px-16">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <p className="font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">
            &copy; {new Date().getFullYear()} — José Torres / {t.footer.rights}
          </p>
          <div className="flex items-center gap-6">
            {SOCIAL_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("mailto:") ? undefined : "_blank"}
                rel={link.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                aria-label={link.label}
                className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.icon}
                {link.label}
              </a>
            ))}
          </div>
          <p className="font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground/70">
            {t.footer.builtWith}
          </p>
        </div>
      </div>
    </footer>
  );
}
