import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <main className="mx-auto min-h-screen max-w-6xl px-4 py-10 sm:px-6 lg:px-10 space-y-4">
      <Skeleton className="h-8 w-64" />
      <div className="grid-auto">
        <Skeleton className="h-28 w-full rounded-2xl" />
        <Skeleton className="h-28 w-full rounded-2xl" />
        <Skeleton className="h-28 w-full rounded-2xl" />
      </div>
      <Skeleton className="h-12 w-full rounded-2xl" />
      <Skeleton className="h-[480px] w-full rounded-2xl" />
    </main>
  );
}
