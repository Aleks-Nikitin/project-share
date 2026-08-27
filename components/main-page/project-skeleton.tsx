import { Skeleton } from "../ui/skeleton";

export default function ProjectSkeleton() {
  return (
    <section className="relative bg-[#0B0F17] overflow-hidden text-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="wrapper">
        <div className="mb-2 flex justify-center">
          <div className="flex items-center gap-2 mb-3">
            {Array.from({ length: 7 }).map((_, index) => (
              <Skeleton key={index} className="h-2 w-2 rounded-full" />
            ))}
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 py-8">
          <h2 className="text-xl font-semibold text-slate-100 mb-6">
            Discover Architecture
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Skeleton className="h-64 sm:h-80 w-full rounded-lg" />
            </div>

            <div className="flex flex-col gap-6">
              {Array.from({ length: 2 }).map((_, index) => (
                <Skeleton key={index} className="h-48 w-full rounded-lg" />
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            {Array.from({ length: 5 }).map((_, index) => (
              <Skeleton key={index} className="h-48 w-full rounded-lg" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
