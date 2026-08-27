import { Suspense } from "react";
import ProjectSection from "@/components/main-page/project-section";
import ProjectSkeleton from "@/components/main-page/project-skeleton";

export default function Home() {
  return (
    <div className="">
      <Suspense fallback={<ProjectSkeleton />}>
        <ProjectSection />
      </Suspense>
    </div>
  );
}
