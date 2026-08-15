import { Button, buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { EyeIcon, TrendingUp, UsersIcon } from "lucide-react";
import StatsCard from "./stats-card";

const statsData = [
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

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#0352c1] to-[#0f172a] text-white py-20 px-4 sm:px-6 lg:px-8">
      <div className="wrapper">
        <div className="flex flex-col items-center justify-center text-center lg:py-24 py-12">
          <Badge
            variant={"outline"}
            className="mb-8 text-white px-4 py-3 backgrop-blur-sm border-white/20 "
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
            </span>
            <span>
              Join the community of developers and makers sharing their work
            </span>
          </Badge>
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
            {statsData.map((stat) => (
              <StatsCard key={stat.label} {...stat} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
