"use client";

import { HISTORY_RANGES } from "@/lib/constants";
import { Button } from "@/components/ui/button";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export function RangeToggle({ value, onChange }: Props) {
  return (
    <div className="flex flex-wrap gap-2">
      {HISTORY_RANGES.map((range) => (
        <Button
          key={range.value}
          size="sm"
          variant={value === range.value ? "primary" : "outline"}
          onClick={() => onChange(range.value)}
        >
          {range.label}
        </Button>
      ))}
    </div>
  );
}
