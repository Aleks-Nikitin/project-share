import { ChevronUpIcon, StarIcon } from "lucide-react";
import { products } from "@/src/schema";
import { InferSelectModel } from "drizzle-orm";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
type Project = InferSelectModel<typeof products>;
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import VoteButton from "../common/vote-button";

export default function FeaturedHeroCard({ project }: { project: Project }) {
  return (
    <Link
      href={`projects/${project.id}`}
      className="block h-full group transition-transform duration-300"
    >
      <Card className="relative h-full flex flex-col justify-between p-6 bg-[#0B0F17] text-white border-zinc-800/80 hover:border-zinc-700">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 bg-black/40 px-3 py-1 rounded-full border border-zinc-800">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-medium text-slate-300">
              Production Ready
            </span>
          </div>

          <div className="flex items-center gap-1 text-sm font-mono text-amber-400 bg-black/40 px-2.5 py-1 rounded-md border border-zinc-800">
            <StarIcon className="h-3.5 w-3.5 fill-amber-400" />
            <span>1.4k</span>
          </div>
        </div>

        <div className="relative w-full h-48 sm:h-64 rounded-lg overflow-hidden mb-4 border border-zinc-800 bg-black/50 shrink-0">
          {project.previewImageUrl ? (
            <Image
              src={project.previewImageUrl}
              alt={project.name}
              loading="eager"
              fill
              sizes="(max-width: 1024px) 100vw, 66vw"
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-xs text-zinc-600 font-mono">
              [Preview Architecture Graphic]
            </div>
          )}
        </div>

        <CardHeader className="p-0 mb-4">
          <CardTitle className="text-xl sm:text-2xl font-bold text-white group-hover:text-emerald-400 transition-colors">
            {project.name}
          </CardTitle>
          <CardDescription className="text-slate-400 text-sm mt-1">
            {project.description}
          </CardDescription>
        </CardHeader>

        <CardFooter className="bg-[#0B0F17] p-0 border-0 flex flex-col gap-3 pt-4 border-t border-zinc-800/60">
          <div className="flex flex-wrap gap-2">
            {(project.tags || []).map((tag) => (
              <Badge
                variant="secondary"
                key={tag}
                className="text-lg p-4 bg-[#182232] text-white border border-zinc-800/80"
              >
                {tag}
              </Badge>
            ))}
          </div>

          <div className="text-lg text-muted-foreground flex gap-5 justify-center p-4 items-center w-full mt-1">
            <Avatar className="h-7 w-7">
              {/* will get data from clerk for the avatar icon 
              <AvatarImage src={project.avatar} alt={project.submittedBy} /> */}
              <AvatarFallback>{project.name?.charAt(0) || "U"}</AvatarFallback>
            </Avatar>
            <span className="text-slate-300 font-medium">
              {project.submittedBy}
            </span>
            <VoteButton
              projectId={project.id}
              initialVoteCount={project.voteCount}
              initialHasVoted={project.hasVoted}
            ></VoteButton>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
