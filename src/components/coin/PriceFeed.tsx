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
    <div className="overflow-hidden rounded-xl border border-[#1e2124]">
      <table className="w-full text-left text-sm">
        <thead className="bg-[#0d0f10] text-xs uppercase tracking-wide text-[#8b9196]">
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
              className="border-t border-[#1e2124] hover:bg-[#1e212420]"
            >
              <td className="px-3 py-3 text-[#f0f2f1]">{row.market}</td>
              <td className="px-3 py-3 text-[#f0f2f1]">
                {formatCurrency(row.converted_last ?? row.last, {
                  notation: "standard",
                  maximumFractionDigits: 5,
                })}
              </td>
              <td className="px-3 py-3 text-[#8b9196]">
                {formatCurrency(row.volume)}
              </td>
              <td className="px-3 py-3 text-[#8b9196]">
                {row.timestamp ? formatDate(row.timestamp) : "—"}
              </td>
            </tr>
          ))}
          {!data.length && (
            <tr>
              <td
                colSpan={4}
                className="px-3 py-4 text-center text-xs text-[#8b9196]"
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
