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
        "rounded-full px-2.5 py-1 text-xs font-semibold",
        {
          success: "bg-emerald-500/15 text-emerald-300",
          danger: "bg-rose-500/15 text-rose-300",
          warning: "bg-amber-500/15 text-amber-200",
          muted: "bg-white/10 text-slate-200",
        }[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
