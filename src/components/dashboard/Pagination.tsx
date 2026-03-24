"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/components/ui/cn";

type Props = {
  page: number;
  onPageChange: (page: number) => void;
  disabled?: boolean;
};

export function Pagination({ page, onPageChange, disabled }: Props) {
  return (
    <div className="flex items-center justify-between gap-3">
      <Button
        variant="outline"
        size="sm"
        disabled={disabled || page === 1}
        onClick={() => onPageChange(Math.max(1, page - 1))}
        className={cn("flex items-center gap-2 border-[#1e2124] text-[#8b9196]")}
      >
        <ChevronLeft className="h-4 w-4" />
        Prev
      </Button>
      <span className="text-xs text-[#8b9196]">Page {page}</span>
      <Button
        variant="outline"
        size="sm"
        disabled={disabled}
        onClick={() => onPageChange(page + 1)}
        className="flex items-center gap-2 border-[#1e2124] text-[#8b9196]"
      >
        Next
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
}
