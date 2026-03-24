"use client";

import { useMemo } from "react";
import { Trash2 } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatCurrency, formatPercent } from "@/lib/format";
import { usePrices } from "@/hooks/usePrices";
import { PortfolioHolding } from "@/hooks/usePortfolio";

type Props = {
    holdings: PortfolioHolding[];
    onRemove: (coinId: string) => void;
};

const COLORS = [
    "#00c9a7",
    "#00d084",
    "#ff4d6d",
    "#8b9196",
    "#f0f2f1",
    "#00a88a",
    "#e0405a",
    "#6b7178",
];

export function PortfolioTab({ holdings, onRemove }: Props) {
    const coinIds = useMemo(
        () => holdings.map((h) => h.coinId),
        [holdings]
    );

    const { data: coins = [], isLoading } = usePrices({
        ids: coinIds,
        perPage: coinIds.length || 1,
        enabled: coinIds.length > 0,
        sortKey: "market_cap",
    });

    const portfolioData = useMemo(() => {
        return holdings
            .map((holding) => {
                const coin = coins.find((c) => c.id === holding.coinId);
                if (!coin) return null;
                const value = holding.amount * coin.current_price;
                const change24hDollar =
                    holding.amount *
                    coin.current_price *
                    ((coin.price_change_percentage_24h ?? 0) / 100);
                return {
                    id: coin.id,
                    name: coin.name,
                    symbol: coin.symbol,
                    image: coin.image,
                    amount: holding.amount,
                    price: coin.current_price,
                    value,
                    change24h: coin.price_change_percentage_24h ?? 0,
                    change24hDollar,
                };
            })
            .filter(Boolean) as Array<{
                id: string;
                name: string;
                symbol: string;
                image: string;
                amount: number;
                price: number;
                value: number;
                change24h: number;
                change24hDollar: number;
            }>;
    }, [holdings, coins]);

    const totalValue = useMemo(
        () => portfolioData.reduce((sum, item) => sum + item.value, 0),
        [portfolioData]
    );

    const pieData = useMemo(
        () =>
            portfolioData.map((item) => ({
                name: item.symbol.toUpperCase(),
                value: item.value,
                percentage: totalValue > 0 ? (item.value / totalValue) * 100 : 0,
            })),
        [portfolioData, totalValue]
    );

    if (holdings.length === 0) {
        return (
            <Card className="flex flex-col items-center justify-center py-12 text-center">
                <svg
                    width="64"
                    height="64"
                    viewBox="0 0 64 64"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="mb-4 opacity-30"
                >
                    <circle cx="32" cy="32" r="30" stroke="#1e2124" strokeWidth="2" />
                    <path d="M22 32h20M32 22v20" stroke="#00c9a7" strokeWidth="2" strokeLinecap="round" />
                </svg>
                <p className="text-sm text-[#8b9196]">
                    Add coins from the dashboard table using the + button
                </p>
            </Card>
        );
    }

    return (
        <div className="space-y-4">
            {/* Total value */}
            <Card className="text-center">
                <p className="text-xs uppercase tracking-wide text-[#8b9196] mb-1">
                    Total Portfolio Value
                </p>
                <p className="text-3xl font-bold text-[#f0f2f1]">
                    {isLoading ? "..." : formatCurrency(totalValue, { notation: "standard" })}
                </p>
            </Card>

            <div className="grid gap-4 md:grid-cols-2">
                {/* Pie chart */}
                <Card className="flex items-center justify-center p-6">
                    {pieData.length > 0 ? (
                        <ResponsiveContainer width="100%" height={240}>
                            <PieChart>
                                <Pie
                                    data={pieData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={90}
                                    paddingAngle={3}
                                    dataKey="value"
                                    stroke="none"
                                >
                                    {pieData.map((_, index) => (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={COLORS[index % COLORS.length]}
                                        />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: "#141618",
                                        border: "1px solid #1e2124",
                                        borderRadius: "12px",
                                        color: "#f0f2f1",
                                        fontSize: "12px",
                                    }}
                                    formatter={(value: number) => [
                                        formatCurrency(value, { notation: "standard" }),
                                        "",
                                    ]}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    ) : null}
                </Card>

                {/* Legend */}
                <Card className="space-y-2 p-4">
                    {pieData.map((item, index) => (
                        <div key={item.name} className="flex items-center gap-2 text-sm">
                            <div
                                className="h-3 w-3 rounded-full"
                                style={{ backgroundColor: COLORS[index % COLORS.length] }}
                            />
                            <span className="text-[#f0f2f1] font-medium">{item.name}</span>
                            <span className="ml-auto text-[#8b9196]">
                                {item.percentage.toFixed(1)}%
                            </span>
                        </div>
                    ))}
                </Card>
            </div>

            {/* Holdings table */}
            <Card className="overflow-hidden p-0">
                <table className="w-full text-left text-sm">
                    <thead className="bg-[#0d0f10] text-xs uppercase tracking-wide text-[#8b9196]">
                        <tr>
                            <th className="px-4 py-3">Coin</th>
                            <th className="px-4 py-3">Amount</th>
                            <th className="px-4 py-3">Current Value</th>
                            <th className="px-4 py-3">24h Change ($)</th>
                            <th className="px-4 py-3"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {portfolioData.map((item) => (
                            <tr
                                key={item.id}
                                className="border-t border-[#1e2124] text-[#f0f2f1]"
                            >
                                <td className="px-4 py-3">
                                    <div className="flex items-center gap-2">
                                        <span className="font-semibold">{item.name}</span>
                                        <span className="text-xs uppercase text-[#8b9196]">
                                            {item.symbol}
                                        </span>
                                    </div>
                                </td>
                                <td className="px-4 py-3">{item.amount}</td>
                                <td className="px-4 py-3 font-semibold">
                                    {formatCurrency(item.value, { notation: "standard" })}
                                </td>
                                <td className="px-4 py-3">
                                    <Badge
                                        variant={item.change24hDollar >= 0 ? "success" : "danger"}
                                    >
                                        {item.change24hDollar >= 0 ? "+" : ""}
                                        {formatCurrency(Math.abs(item.change24hDollar), {
                                            notation: "standard",
                                        })}
                                    </Badge>
                                </td>
                                <td className="px-4 py-3">
                                    <button
                                        className="text-[#8b9196] hover:text-[#ff4d6d] transition"
                                        onClick={() => onRemove(item.id)}
                                        aria-label={`Remove ${item.name} from portfolio`}
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Card>
        </div>
    );
}
