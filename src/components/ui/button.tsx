"use client";

import { Slot } from "@radix-ui/react-slot";
import { forwardRef } from "react";
import { cn } from "@/components/ui/cn";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  asChild?: boolean;
  variant?: "primary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg" | "icon";
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, asChild = false, variant = "primary", size = "md", ...props },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        className={cn(
          "rounded-lg font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00c9a7] disabled:cursor-not-allowed disabled:opacity-50",
          {
            primary:
              "bg-[#00c9a7] text-[#0d0f10] hover:bg-[#00d084]",
            ghost:
              "bg-transparent text-[#8b9196] hover:bg-[#1e2124] hover:text-[#f0f2f1] border border-transparent",
            outline: "border border-[#1e2124] text-[#8b9196] hover:bg-[#1e2124] hover:text-[#f0f2f1]",
          }[variant],
          {
            sm: "px-3 py-1.5 text-sm",
            md: "px-4 py-2 text-sm",
            lg: "px-5 py-3 text-base",
            icon: "p-2",
          }[size],
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";
