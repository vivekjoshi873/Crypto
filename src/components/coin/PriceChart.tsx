"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { HistoryPoint } from "@/lib/types";
import { formatCurrency, formatDate } from "@/lib/format";
import { Skeleton } from "@/components/ui/skeleton";

type Props = {
  data?: HistoryPoint[];
  isLoading: boolean;
};

export function PriceChart({ data = [], isLoading }: Props) {
  if (isLoading) {
    return <Skeleton className="h-80 w-full rounded-xl" />;
  }

  const color =
    (data?.[data.length - 1]?.price ?? 0) >= (data?.[0]?.price ?? 0)
      ? "#34d399"
      : "#f472b6";

  return (
    <div className="h-80 w-full">
      <ResponsiveContainer>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color} stopOpacity={0.35} />
              <stop offset="95%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="rgba(255,255,255,0.05)"
          />
          <XAxis
            dataKey="time"
            tickFormatter={(value) => new Date(value).toLocaleDateString()}
            stroke="#6b7280"
          />
          <YAxis
            stroke="#6b7280"
            tickFormatter={(value) =>
              formatCurrency(value as number, { notation: "compact" })
            }
            width={72}
          />
          <Tooltip
            contentStyle={{
              background: "#0f172a",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
            labelFormatter={(value) => formatDate(value)}
            formatter={(value: number) =>
              formatCurrency(value, { notation: "standard" })
            }
          />
          <Area
            type="monotone"
            dataKey="price"
            stroke={color}
            fill="url(#priceGradient)"
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
