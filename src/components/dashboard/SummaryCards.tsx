"use client";

import { TrendingDown, TrendingUp, Wallet, Waves } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { formatCurrency, formatPercent } from "@/lib/format";
import { GlobalStats } from "@/lib/types";

type Props = {
  stats?: GlobalStats;
  isLoading: boolean;
};

export function SummaryCards({ stats, isLoading }: Props) {
  return (
    <div className="grid-auto">
      <Card className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-wide text-[#8b9196]">
              Total Market Cap
            </p>
            {isLoading ? (
              <Skeleton className="mt-2 h-6 w-32" />
            ) : (
              <p className="text-2xl font-semibold text-[#f0f2f1]">
                {formatCurrency(stats?.total_market_cap ?? 0, {
                  notation: "compact",
                })}
              </p>
            )}
          </div>
          <Wallet className="h-6 w-6 text-[#00c9a7]" />
        </div>
        <Badge
          variant={
            (stats?.market_cap_change_percentage_24h ?? 0) >= 0
              ? "success"
              : "danger"
          }
        >
          {isLoading
            ? "—"
            : `${stats?.market_cap_change_percentage_24h?.toFixed(2)}% 24h`}
        </Badge>
      </Card>

      <Card className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-wide text-[#8b9196]">
              24h Market Movement
            </p>
            {isLoading ? (
              <Skeleton className="mt-2 h-6 w-28" />
            ) : (
              <div className="flex items-center gap-2">
                {(stats?.market_cap_change_percentage_24h ?? 0) >= 0 ? (
                  <TrendingUp className="h-5 w-5 text-[#00d084]" />
                ) : (
                  <TrendingDown className="h-5 w-5 text-[#ff4d6d]" />
                )}
                <p className="text-xl font-semibold text-[#f0f2f1]">
                  {formatPercent(stats?.market_cap_change_percentage_24h ?? 0)}
                </p>
              </div>
            )}
          </div>
          <Waves className="h-6 w-6 text-[#00c9a7]" />
        </div>
      </Card>

      <Card className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-wide text-[#8b9196]">
              Volume (24h)
            </p>
            {isLoading ? (
              <Skeleton className="mt-2 h-6 w-28" />
            ) : (
              <p className="text-2xl font-semibold text-[#f0f2f1]">
                {formatCurrency(stats?.total_volume_24h ?? 0)}
              </p>
            )}
          </div>
          <TrendingUp className="h-6 w-6 text-[#00c9a7]" />
        </div>
      </Card>
    </div>
  );
}
