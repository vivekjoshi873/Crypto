"use client";

import { cn } from "@/components/ui/cn";

type CardProps = React.HTMLAttributes<HTMLDivElement>;

export function Card({ className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "glass rounded-2xl border border-white/5 bg-white/5 p-4 text-gray-900 backdrop-blur dark:text-slate-100",
        className,
      )}
      {...props}
    />
  );
}

