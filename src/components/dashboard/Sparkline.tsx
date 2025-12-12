"use client";

import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  YAxis,
} from "recharts";
import { CoinMarket } from "@/lib/types";

type Props = {
  coin: CoinMarket;
};

export function Sparkline({ coin }: Props) {
  const data =
    coin.sparkline_in_7d?.price.map((price, idx) => ({ idx, price })) ?? [];

  return (
    <div className="h-12 w-32">
      <ResponsiveContainer>
        <LineChart data={data}>
          <YAxis domain={["dataMin", "dataMax"]} hide />
          <Tooltip
            contentStyle={{
              background: "#0f172a",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
            formatter={(value) => `$${(value as number).toFixed(2)}`}
          />
          <Line
            type="monotone"
            dataKey="price"
            stroke={(data.at(-1)?.price ?? 0) >= (data.at(0)?.price ?? 0) ? "#34d399" : "#f472b6"}
            dot={false}
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

