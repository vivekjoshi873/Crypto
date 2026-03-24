"use client";

import { cn } from "@/components/ui/cn";

type CardProps = React.HTMLAttributes<HTMLDivElement>;

export function Card({ className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-[#1e2124] bg-[#141618] p-4 text-[#f0f2f1] backdrop-blur",
        className
      )}
      {...props}
    />
  );
}
