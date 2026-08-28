import { Skeleton } from "@/components/ui/skeleton";

export default function AdminLoading() {
  return (
    <div className="mx-auto min-h-screen max-w-6xl px-4 py-10 text-white">
      <div className="mb-8 space-y-2">
        <Skeleton className="h-9 w-64 bg-[#182232]" />
        <Skeleton className="h-5 w-96 max-w-full bg-[#182232]" />
      </div>

      <div className="mb-10 grid grid-cols-2 gap-4 md:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <Skeleton key={index} className="h-28 rounded-xl bg-[#182232]" />
        ))}
      </div>

      <Skeleton className="mb-4 h-7 w-48 bg-[#182232]" />

      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, index) => (
          <Skeleton key={index} className="h-36 rounded-xl bg-[#182232]" />
        ))}
      </div>
    </div>
  );
}
