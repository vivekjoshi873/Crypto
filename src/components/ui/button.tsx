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
    {
      className,
      asChild = false,
      variant = "primary",
      size = "md",
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        className={cn(
          "rounded-lg font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500 disabled:cursor-not-allowed disabled:opacity-50",
          {
            primary:
              "bg-gradient-to-r from-sky-500 to-indigo-500 text-white hover:from-sky-400 hover:to-indigo-400",
            ghost:
              "bg-transparent text-slate-200 hover:bg-white/5 border border-transparent",
            outline:
              "border border-white/10 text-slate-100 hover:bg-white/5",
          }[variant],
          {
            sm: "px-3 py-1.5 text-sm",
            md: "px-4 py-2 text-sm",
            lg: "px-5 py-3 text-base",
            icon: "p-2",
          }[size],
          className,
        )}
        {...props}
      />
    );
  },
);

Button.displayName = "Button";

