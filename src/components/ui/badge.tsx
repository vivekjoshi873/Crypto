"use client";

import { cn } from "@/components/ui/cn";

type BadgeProps = {
  children: React.ReactNode;
  variant?: "success" | "danger" | "muted" | "warning";
  className?: string;
};

export function Badge({ children, variant = "muted", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold",
        {
          success: "pill-up",
          danger: "pill-down",
          warning: "bg-amber-500/15 text-amber-200",
          muted: "bg-white/10 text-[#8b9196]",
        }[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
