"use client";

type Props = {
  title: string;
  description?: string;
};

export function EmptyState({ title, description }: Props) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-6 text-center text-sm text-slate-300">
      <p className="font-semibold text-white">{title}</p>
      {description && <p className="mt-2 text-slate-400">{description}</p>}
    </div>
  );
}

