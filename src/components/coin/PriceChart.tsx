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
      ? "#00d084"
      : "#ff4d6d";

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
            stroke="#1e212420"
          />
          <XAxis
            dataKey="time"
            tickFormatter={(value) => new Date(value).toLocaleDateString()}
            stroke="#8b9196"
          />
          <YAxis
            stroke="#8b9196"
            tickFormatter={(value) =>
              formatCurrency(value as number, { notation: "compact" })
            }
            width={72}
          />
          <Tooltip
            contentStyle={{
              background: "#141618",
              border: "1px solid #1e2124",
              borderRadius: "12px",
              color: "#f0f2f1",
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
