"use client";

import { ChangeEvent, useEffect, useRef } from "react";
import { Search } from "lucide-react";
import { cn } from "@/components/ui/cn";

type Props = {
  value: string;
  onChange: (value: string) => void;
  className?: string;
};

export function SearchBar({ value, onChange, className }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    onChange(e.target.value);

  // "/" keyboard shortcut to focus search
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (
        e.key === "/" &&
        document.activeElement?.tagName !== "INPUT" &&
        document.activeElement?.tagName !== "TEXTAREA"
      ) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <div
      className={cn(
        "flex items-center gap-2 rounded-xl border border-[#1e2124] bg-[#141618] px-3 py-2 text-sm text-[#f0f2f1] focus-within:ring-2 focus-within:ring-[#00c9a7]",
        className
      )}
    >
      <Search className="h-4 w-4 text-[#8b9196]" />
      <input
        ref={inputRef}
        id="search-coins"
        aria-label="Search coins"
        placeholder="Search by name or symbol (e.g., BTC, ETH)"
        className="w-full bg-transparent outline-none placeholder:text-[#8b919680]"
        value={value}
        onChange={handleChange}
      />
      <kbd className="hidden sm:inline-flex items-center rounded border border-[#1e2124] bg-[#0d0f10] px-1.5 py-0.5 text-[10px] text-[#8b9196] font-mono">
        /
      </kbd>
    </div>
  );
}
