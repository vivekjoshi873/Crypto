"use client";

import { formatCurrency, formatDate } from "@/lib/format";
import { Ticker } from "@/lib/types";
import { Skeleton } from "@/components/ui/skeleton";

type Props = {
  data?: Ticker[];
  isLoading: boolean;
};

export function PriceFeed({ data = [], isLoading }: Props) {
  if (isLoading) {
    return <Skeleton className="h-48 w-full rounded-xl" />;
  }

  return (
    <div className="overflow-hidden rounded-xl border border-white/5">
      <table className="w-full text-left text-sm">
        <thead className="bg-white/5 text-xs uppercase tracking-wide text-slate-400">
          <tr>
            <th className="px-3 py-3">Market</th>
            <th className="px-3 py-3">Last</th>
            <th className="px-3 py-3">Volume</th>
            <th className="px-3 py-3">Time</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr
              key={`${row.market}-${row.timestamp}`}
              className="border-t border-white/5 hover:bg-white/5"
            >
              <td className="px-3 py-3 text-white">{row.market}</td>
              <td className="px-3 py-3 text-slate-200">
                {formatCurrency(row.converted_last ?? row.last, {
                  notation: "standard",
                  maximumFractionDigits: 5,
                })}
              </td>
              <td className="px-3 py-3 text-slate-300">
                {formatCurrency(row.volume)}
              </td>
              <td className="px-3 py-3 text-slate-400">
                {row.timestamp ? formatDate(row.timestamp) : "—"}
              </td>
            </tr>
          ))}
          {!data.length && (
            <tr>
              <td
                colSpan={4}
                className="px-3 py-4 text-center text-xs text-slate-400"
              >
                No recent trades available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

