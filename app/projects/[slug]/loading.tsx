import { Skeleton } from "@/components/ui/skeleton";

export default function ProjectLoading() {
  return (
    <main className="mx-auto min-h-screen max-w-4xl px-4 py-12 text-white md:py-20">
      <div className="space-y-4 border-b border-zinc-800/80 pb-8">
        <Skeleton className="h-10 w-2/3 bg-[#182232]" />
        <Skeleton className="h-6 w-1/2 bg-[#182232]" />
        <Skeleton className="h-8 w-48 bg-[#182232]" />
      </div>
      <Skeleton className="mt-8 aspect-video w-full rounded-xl bg-[#182232]" />
      <Skeleton className="mt-8 h-48 w-full rounded-xl bg-[#182232]" />
    </main>
  );
}
