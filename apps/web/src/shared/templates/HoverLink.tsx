import { cn } from "@repo/ui";
import type { AnchorHTMLAttributes, ReactNode } from "react";

interface HoverLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: ReactNode;
  external?: boolean;
}

/**
 * Link with editorial underline-grow hover effect. Reusable everywhere.
 */
export function HoverLink({
  children,
  className,
  external,
  ...props
}: HoverLinkProps): React.JSX.Element {
  const externalProps = external === true ? { target: "_blank", rel: "noopener noreferrer" } : {};
  return (
    <a
      {...externalProps}
      {...props}
      className={cn(
        "group relative inline-flex items-center gap-2 text-foreground transition-colors hover:text-foreground",
        className,
      )}
    >
      <span className="relative">
        {children}
        <span className="absolute -bottom-0.5 left-0 h-px w-full origin-right scale-x-100 bg-current transition-transform duration-500 ease-out group-hover:origin-left group-hover:scale-x-0" />
        <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-current transition-transform duration-500 ease-out delay-200 group-hover:scale-x-100" />
      </span>
    </a>
  );
}
