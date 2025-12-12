"use client";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { formatCurrency, formatNumber, formatPercent } from "@/lib/format";
import { CoinMarket } from "@/lib/types";

type Props = {
  coin?: CoinMarket;
};

const rows: Array<{
  label: string;
  accessor: (coin: CoinMarket) => string;
}> = [
  { label: "Market Cap", accessor: (c) => formatCurrency(c.market_cap) },
  { label: "Volume 24h", accessor: (c) => formatCurrency(c.total_volume) },
  {
    label: "Circulating Supply",
    accessor: (c) => formatNumber(c.circulating_supply ?? 0),
  },
  {
    label: "24h Change",
    accessor: (c) => formatPercent(c.price_change_percentage_24h),
  },
  {
    label: "7d Change",
    accessor: (c) =>
      formatPercent(c.price_change_percentage_7d_in_currency ?? 0),
  },
  {
    label: "30d Change",
    accessor: (c) =>
      formatPercent(c.price_change_percentage_30d_in_currency ?? 0),
  },
];

export function StatGrid({ coin }: Props) {
  return (
    <div className="grid-auto">
      {rows.map((row) => {
        const value = coin ? row.accessor(coin) : "—";
        const isPercent = value.includes("%");
        return (
          <Card key={row.label} className="space-y-2">
            <p className="text-xs uppercase tracking-wide text-slate-400">
              {row.label}
            </p>
            {isPercent ? (
              <Badge
                variant={value.startsWith("-") ? "danger" : "success"}
                className="text-base"
              >
                {value}
              </Badge>
            ) : (
              <p className="text-lg font-semibold text-gray-900 dark:text-white">
                {value}
              </p>
            )}
          </Card>
        );
      })}
    </div>
  );
}
