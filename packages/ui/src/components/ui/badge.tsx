import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-shadow",
  {
    variants: {
      variant: {
        default:  "bg-primary/10 text-primary",
        primary:  "bg-primary/10 text-primary",
        secondary:"bg-secondary/10 text-secondary",
        accent:   "bg-accent/10 text-accent",
        amber:    "bg-amber/10 text-amber",
        emerald:  "bg-emerald/10 text-emerald",
        outline:  "border border-border text-muted-foreground",
        chip:     "rounded-lg border px-4 py-2 text-sm hover:shadow-md",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps): React.JSX.Element {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
