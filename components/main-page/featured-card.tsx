import { ChevronUpIcon, StarIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Project } from "./ProjectCard";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function FeaturedHeroCard({ project }: { project: Project }) {
  return (
    <Link
      href={`projects/${project.id}`}
      className="block h-full group transition-transform duration-300"
    >
      <Card className="relative h-full flex flex-col justify-between p-6 bg-[#0B0F17] text-white border-zinc-800/80 hover:border-zinc-700">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 bg-black/40 px-3 py-1 rounded-full border border-zinc-800">
            <span className="h-3 w-3 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-lg font-medium text-slate-300">
              Production Ready
            </span>
          </div>

          <div className="flex items-center gap-1 text-xl font-mono text-amber-400 bg-black/40 px-2.5 py-1 rounded-md border border-zinc-800">
            <StarIcon className="h-4 w-4 fill-amber-400" />
            <span>1.4k</span>
          </div>
        </div>

        <div className="relative w-full h-52 sm:h-64 rounded-lg overflow-hidden mb-4 border border-zinc-800 bg-black/50">
          {project.previewImage ? (
            <Image
              src={project.previewImage}
              alt={project.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-xs text-zinc-600 font-mono">
              [Preview Architecture Graphic]
            </div>
          )}
        </div>

        <CardHeader className="p-0 pb-0">
          <CardTitle className="text-2xl pb-1 text-white group-hover:text-emerald-400 transition-colors">
            {project.title}
          </CardTitle>
          <CardDescription className="text-slate-400 text-sm">
            {project.description}
          </CardDescription>
        </CardHeader>

        <CardFooter className="bg-[#0B0F17] pb-0 px-0 border-0 flex flex-col items-start gap-3 py-5 border-t border-zinc-800/60">
          <div className="flex flex-wrap gap-2">
            {(project.tags || []).map((tag) => (
              <Badge
                variant="secondary"
                key={tag}
                className="text-lg p-4 whitespace-nowrap bg-[#182232] text-white border border-zinc-800/80"
              >
                {tag}
              </Badge>
            ))}
          </div>
          <div className="mt-1 text-sm text-muted-foreground flex justify-between items-center w-full">
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={project.avatar} alt={project.username} />
                <AvatarFallback>
                  {project.username?.charAt(0) || "U"}
                </AvatarFallback>
              </Avatar>
              <span className="text-slate-300 text-lg">{project.username}</span>
            </div>

            <Button
              size="xl"
              className="bg-[#0B0F17] text-xl text-white border border-zinc-800/80 hover:bg-[#182232]/80 flex items-center gap-1 px-3 py-2"
            >
              <ChevronUpIcon className="h-16 w-16" fill="currentColor" />
              {project.votes}
            </Button>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
