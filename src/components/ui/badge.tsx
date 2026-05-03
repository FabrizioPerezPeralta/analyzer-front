import * as React from "react";
import { cn } from "@/lib/utils";

const Badge = React.forwardRef<HTMLSpanElement, React.HTMLAttributes<HTMLSpanElement>>(
  ({ className, ...props }, ref) => (
    <span
      ref={ref}
      className={cn(
        "inline-flex items-center rounded-pill border border-divider-soft px-3 py-1 text-[12px] font-text text-ink-muted",
        className
      )}
      {...props}
    />
  )
);

Badge.displayName = "Badge";

export { Badge };
