import { Button, buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import NavigationTags from "../common/navigation-tags";
import Link from "next/link";
import { EyeIcon, TrendingUp, UsersIcon } from "lucide-react";
import ProjectCard from "./project-card";
import FeaturedProject from "./featured-project";
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
            { name: "All", route: "/" },
            { name: "Popular", route: "/popular" },
            { name: "Full-Stack", route: "/full-stack" },
            { name: "Frontend", route: "/frontend" },
            { name: "Backend", route: "/backend" },
            { name: "Mobile", route: "/mobile" },
            { name: "AI/ML", route: "/ai-ml" },
          ]}
        ></NavigationTags>
        <div className="flex flex-col items-center justify-center text-center lg:py-8 py-5">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-12 max-w-2xl w-full">
            <FeaturedProject></FeaturedProject>
            {/* {projectData.map((stat) => (
              <ProjectCard key={stat.label} {...stat} />
            ))} */}
          </div>
        </div>
      </div>
    </section>
  );
}
