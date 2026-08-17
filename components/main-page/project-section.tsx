import { Button, buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import NavigationTags from "../common/navigation-tags";
import Link from "next/link";
import { EyeIcon, TrendingUp, UsersIcon } from "lucide-react";
import ProjectCard from "./project-card";
import FeaturedHeroCard from "./featured-card";

const projectData = [
  {
    id: "food-ordering-app",
    title: "Food ordering app",
    description: "Order food from your favorite restaurants with ease.",
    votes: 10,
    tags: ["React", "TypeScript", "Next.js"],
    avatar: "/path/to/avatar1.jpg",
    username: "john_doe",
    isFeatured: true,
  },
  {
    id: "resume-application-tracker",
    title: "Resume application tracker",
    description: "Track and manage your job applications with ease.",
    votes: 15,
    tags: ["React", "TypeScript", "Next.js"],
    avatar: "/path/to/avatar1.jpg",
    username: "jane_smith",
    isFeatured: false,
  },
  {
    id: "twitter-clone",
    title: "Twitter clone",
    description: "A simple Twitter clone built with React and Express.js.",
    votes: 15,
    tags: ["React", "TypeScript", "Next.js"],
    avatar: "/path/to/avatar1.jpg",
    username: "jane_smith",
    isFeatured: false,
  },
];

export default function ProjectSection() {
  return (
    <section className="relative bg-[#0B0F17] overflow-hidden text-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="wrapper">
        <NavigationTags
          tags={[
            { name: "All", route: "/" },
            { name: "Popular", route: "/popular" },
            { name: "Full-Stack", route: "/full-stack" },
            { name: "Frontend", route: "/frontend" },
            { name: "Backend", route: "/backend" },
            { name: "Mobile", route: "/mobile" },
            { name: "AI/ML", route: "/ai-ml" },
          ]}
        ></NavigationTags>
        <div className="max-w-7xl mx-auto px-4 py-8">
          <h2 className="text-xl font-semibold text-slate-100 mb-6">
            Discover Architecture
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {true && (
              <div className="lg:col-span-2">
                <FeaturedHeroCard project={projectData[0]} />
              </div>
            )}

            <div className="flex flex-col gap-6">
              {projectData.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            {projectData.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
