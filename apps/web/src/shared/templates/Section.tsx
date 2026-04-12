import { cn } from "@repo/ui";
import type { ReactNode } from "react";

interface SectionProps {
  id?: string;
  className?: string;
  containerClassName?: string;
  children: ReactNode;
  as?: "section" | "footer" | "header";
  bordered?: boolean;
}

export function Section({
  id,
  className,
  containerClassName,
  children,
  as: Tag = "section",
  bordered = false,
}: SectionProps): React.JSX.Element {
  return (
    <Tag
      id={id}
      className={cn(
        "relative w-full px-6 py-20 md:px-10 md:py-28 lg:px-16 lg:py-36",
        bordered && "border-t border-border",
        className,
      )}
    >
      <div className={cn("mx-auto w-full max-w-7xl", containerClassName)}>{children}</div>
    </Tag>
  );
}
