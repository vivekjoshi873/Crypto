"use client";

import { useState, useRef, useEffect } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CoinMarket } from "@/lib/types";

type Props = {
    coin: CoinMarket;
    currentAmount: number;
    onSave: (amount: number) => void;
    onClose: () => void;
};

export function PortfolioModal({ coin, currentAmount, onSave, onClose }: Props) {
    const [amount, setAmount] = useState(currentAmount > 0 ? currentAmount.toString() : "");
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    // Close on Escape
    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, [onClose]);

    const handleSave = () => {
        const num = parseFloat(amount);
        if (!isNaN(num) && num > 0) {
            onSave(num);
        }
        onClose();
    };

    return (
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm"
            onClick={onClose}
        >
            <div
                className="w-full max-w-sm rounded-2xl border border-[#1e2124] bg-[#141618] p-6 shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-[#f0f2f1]">
                        How many {coin.symbol.toUpperCase()} do you own?
                    </h3>
                    <button
                        onClick={onClose}
                        className="text-[#8b9196] hover:text-[#f0f2f1] transition"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                <input
                    ref={inputRef}
                    type="number"
                    step="any"
                    min="0"
                    placeholder="e.g. 0.5"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSave()}
                    className="w-full rounded-xl border border-[#1e2124] bg-[#0d0f10] px-4 py-3 text-[#f0f2f1] outline-none focus:ring-2 focus:ring-[#00c9a7] placeholder:text-[#8b919660]"
                />

                <div className="mt-4 flex gap-3">
                    <Button
                        onClick={handleSave}
                        className="flex-1 bg-[#00c9a7] text-[#0d0f10] font-semibold hover:bg-[#00d084] cursor-pointer"
                    >
                        Save
                    </Button>
                    <Button
                        variant="outline"
                        onClick={onClose}
                        className="flex-1 border-[#1e2124] text-[#8b9196] hover:text-[#f0f2f1] cursor-pointer"
                    >
                        Cancel
                    </Button>
                </div>
            </div>
        </div>
    );
}
