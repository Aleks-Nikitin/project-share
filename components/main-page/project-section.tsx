import { Button, buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import NavigationTags from "../common/navigation-tags";
import Link from "next/link";
import { EyeIcon, TrendingUp, UsersIcon } from "lucide-react";
import FeaturedProject from "./featured-project";

const projectData = [
  {
    id: "food-ordering-app",
    title: "Food ordering app",
    description: "Order food from your favorite restaurants with ease.",
    votes: 10,
    tags: ["React", "TypeScript", "Next.js"],
    avatar: "/path/to/avatar1.jpg",
    username: "john_doe",
  },
  {
    id: "resume-application-tracker",
    title: "Resume application tracker",
    description: "Track and manage your job applications with ease.",
    votes: 15,
    tags: ["React", "TypeScript", "Next.js"],
    avatar: "/path/to/avatar1.jpg",
    username: "jane_smith",
  },
  {
    id: "twitter-clone",
    title: "Twitter clone",
    description: "A simple Twitter clone built with React and Express.js.",
    votes: 15,
    tags: ["React", "TypeScript", "Next.js"],
    avatar: "/path/to/avatar1.jpg",
    username: "jane_smith",
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
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-12 max-w-4xl w-full">
            {projectData.map((project) => (
              <FeaturedProject key={project.id} project={project} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
