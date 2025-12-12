"use client";

import { cn } from "@/components/ui/cn";

type Props = React.HTMLAttributes<HTMLDivElement> & {
  shimmer?: boolean;
};

export function Skeleton({
  className,
  shimmer = true,
  ...props
}: Props) {
  return (
    <div
      className={cn(
        "rounded-md bg-white/10",
        shimmer && "animate-pulse",
        className,
      )}
      {...props}
    />
  );
}

