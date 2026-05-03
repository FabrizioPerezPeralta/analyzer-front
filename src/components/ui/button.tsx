import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-pill font-text text-[17px] font-normal text-ink transition active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-focus disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-primary text-white",
        secondary: "border border-primary text-primary bg-transparent",
        dark: "bg-ink text-white text-[14px] rounded-sm px-[15px] py-[8px]",
        ghost: "text-primary bg-transparent",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        md: "px-[22px] py-[11px]",
        lg: "px-[28px] py-[14px] text-[18px] font-light",
        sm: "px-[16px] py-[8px] text-[14px]",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
);

Button.displayName = "Button";

export { Button, buttonVariants };
