"use client";

import { ChangeEvent } from "react";
import { Search } from "lucide-react";
import { cn } from "@/components/ui/cn";

type Props = {
  value: string;
  onChange: (value: string) => void;
  className?: string;
};

export function SearchBar({ value, onChange, className }: Props) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    onChange(e.target.value);

  return (
    <div
      className={cn(
        "flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-100 focus-within:ring-2 focus-within:ring-sky-500",
        className,
      )}
    >
      <Search className="h-4 w-4 text-slate-400" />
      <input
        aria-label="Search coins"
        placeholder="Search by name or symbol (e.g., BTC, ETH)"
        className="w-full bg-transparent outline-none placeholder:text-slate-500"
        value={value}
        onChange={handleChange}
      />
    </div>
  );
}

