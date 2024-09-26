import React from "react";
import { cn } from "@/lib/utils";
import { VariantProps, cva } from "class-variance-authority";
import { Loader2 } from "lucide-react";

const spinnerVariants = cva("flex-col items-center justify-center", {
  variants: {
    show: {
      true: "flex",
      false: "hidden",
    },
  },
  defaultVariants: {
    show: true,
  },
});

const loaderVariants = cva("animate-spin text-primary", {
  variants: {
    size: {
      small: "size-6",
      medium: "size-8",
      large: "size-12",
    },
  },
  defaultVariants: {
    size: "medium",
  },
});

interface SpinnerContentProps
  extends VariantProps<typeof spinnerVariants>,
    VariantProps<typeof loaderVariants> {
  className?: string;
  children?: React.ReactNode;
  hover?: boolean;
}

export function Loader({
  size,
  show,
  children,
  className,
  hover,
}: SpinnerContentProps) {
  return (
    <span
      className={spinnerVariants({ show })}
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",

        ...(hover && {
          position: "absolute",
          top: "50%",
          left: "50%",
          zIndex: 1000,
          transform: "translate(-50%, -50%)",
        }),
      }}
    >
      <Loader2 className={cn(loaderVariants({ size }), className)} />
      {children}
    </span>
  );
}
