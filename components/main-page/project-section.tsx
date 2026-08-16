import { Button, buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import NavigationTags from "../common/navigation-tags";
import Link from "next/link";
import { EyeIcon, TrendingUp, UsersIcon } from "lucide-react";
import ProjectCard from "./project-card";
const projectData = [
  {
    icon: TrendingUp,
    value: "1.2K",
    label: "Projects shipped",
  },
  {
    icon: UsersIcon,
    value: "2.9K",
    label: "Active inovators",
  },
  {
    icon: EyeIcon,
    value: "6.7K",
    label: "Monthly visitors",
  },
];

export default function ProjectSection() {
  return (
    <section className="relative bg-[#0B0F17] overflow-hidden text-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="wrapper">
        <NavigationTags
          tags={[
            "All",
            "Popular",
            "Full-Stack",
            "Frontend",
            "Backend",
            "Mobile",
            "AI/ML",
          ]}
        ></NavigationTags>
        <div className="flex flex-col items-center justify-center text-center lg:py-8 py-5">
          <h1
            className="text-5xl sm:text-6xl
            lg:text-7xl font-bold tracking-tight mb-6
            max-w-5xl"
          >
            Share What You&apos;ve built, Track new initiatives
          </h1>
          <p
            className="text-lg sm:text-xl
               mb-10 max-w-2xl leading-relaxed"
          >
            A community platform for developers to share their projects, get
            feedback, and discover new ideas.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mb-16">
            <Link
              href="/submit"
              className={cn(
                buttonVariants({ variant: "default", size: "lg" }),
                "text-base px-8 shadow-lg",
              )}
            >
              Share your projects
            </Link>

            <Link
              href="/explore"
              className={cn(
                buttonVariants({ variant: "secondary", size: "lg" }),
                "text-base px-8 shadow-lg",
              )}
            >
              Explore projects
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-12 max-w-2xl w-full">
            {/* {projectData.map((stat) => (
              <ProjectCard key={stat.label} {...stat} />
            ))} */}
          </div>
        </div>
      </div>
    </section>
  );
}
