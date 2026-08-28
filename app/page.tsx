import { Suspense } from "react";
import ProjectSection from "@/components/main-page/project-section";
import ProjectSkeleton from "@/components/main-page/project-skeleton";

export default function Home({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; tag?: string }>;
}) {
  return (
    <div className="">
      <Suspense fallback={<ProjectSkeleton />}>
        <ProjectSection searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
