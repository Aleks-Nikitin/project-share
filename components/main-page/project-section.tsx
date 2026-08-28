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
    <section className="relative bg-[#0B0F17] overflow-hidden text-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="wrapper">
        <NavigationTags
          tags={[...NAV_TAG_SLUGS]}
          activeTag={activeTag}
          searchQuery={searchQuery}
        />
        <div className="max-w-7xl mx-auto px-4 py-8">
          <h2 className="text-xl font-semibold text-slate-100 mb-6">
            Discover Architecture
          </h2>

          {projectData.length === 0 ? (
            <p className="py-12 text-center text-slate-400">
              No projects found.
            </p>
          ) : (
            <>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <FeaturedHeroCard project={projectData[0]} />
                </div>

                <div className="flex flex-col gap-6">
                  {projectData.slice(1, 3).map((project) => (
                    <ProjectCard key={project.id} project={project} />
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
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
