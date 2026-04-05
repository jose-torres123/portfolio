import { forwardRef } from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        gradient:
          "bg-linear-to-r from-[hsl(262_83%_58%)] via-[hsl(330_81%_60%)] to-[hsl(25_95%_53%)] text-white shadow-lg hover:shadow-xl hover:opacity-90",
        default:
          "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm",
        outline:
          "border-2 border-primary/50 text-primary hover:border-primary hover:bg-primary/5",
        ghost:
          "text-muted-foreground hover:bg-primary/10 hover:text-primary rounded-lg",
        secondary:
          "bg-secondary/10 text-secondary border border-secondary/20 hover:bg-secondary/20",
      },
      size: {
        default: "px-8 py-3",
        sm: "px-4 py-2 text-xs",
        lg: "px-10 py-4 text-base",
        icon: "size-9 rounded-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
