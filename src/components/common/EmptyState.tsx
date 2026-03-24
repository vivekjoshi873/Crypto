"use client";

type Props = {
  title: string;
  description?: string;
};

export function EmptyState({ title, description }: Props) {
  return (
    <div className="rounded-xl border border-[#1e2124] bg-[#141618] px-4 py-6 text-center text-sm text-[#8b9196]">
      <p className="font-semibold text-[#f0f2f1]">{title}</p>
      {description && <p className="mt-2 text-[#8b9196]">{description}</p>}
    </div>
  );
}
