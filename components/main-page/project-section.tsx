import NavigationTags from "../common/navigation-tags";
import ProjectCard from "./project-card";
import FeaturedHeroCard from "./featured-card";
import { getProducts } from "@/src/queries/select";
import { auth } from "@clerk/nextjs/server";
import { NAV_TAG_SLUGS } from "@/lib/project-utils";

export default async function ProjectSection({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; tag?: string }>;
}) {
  const { userId } = await auth();
  const { q: searchQuery, tag: activeTag } = await searchParams;
  const projectData = await getProducts(userId, searchQuery, activeTag);

  return (
    <section className="relative overflow-hidden bg-[#0B0F17] px-3 py-6 text-white min-[750px]:px-6 min-[750px]:py-8 lg:px-8">
      <div className="wrapper">
        <NavigationTags
          tags={[...NAV_TAG_SLUGS]}
          activeTag={activeTag}
          searchQuery={searchQuery}
        />
        <div className="mx-auto max-w-7xl py-4 min-[750px]:py-8">
          <h2 className="mb-4 text-lg font-semibold text-slate-100 min-[750px]:mb-6 min-[750px]:text-xl">
            Discover Architecture
          </h2>

          {projectData.length === 0 ? (
            <p className="py-12 text-center text-slate-400">
              No projects found.
            </p>
          ) : (
            <>
              <div className="grid grid-cols-1 gap-4 min-[750px]:gap-6 lg:grid-cols-3">
                <div className="lg:col-span-2">
                  <FeaturedHeroCard project={projectData[0]} />
                </div>

                <div className="flex flex-col gap-4 min-[750px]:gap-6">
                  {projectData.slice(1, 3).map((project) => (
                    <ProjectCard key={project.id} project={project} />
                  ))}
                </div>
              </div>

              <div className="mt-4 grid grid-cols-1 gap-4 min-[750px]:mt-6 min-[750px]:grid-cols-2 min-[750px]:gap-6 lg:grid-cols-3">
                {projectData.slice(3).map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
