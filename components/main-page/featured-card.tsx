import Link from "next/link";
import { Badge } from "../ui/badge";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { ProductWithVote } from "@/src/types/product";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import VoteButton from "../common/vote-button";
import ProjectMetaBadges from "../common/project-meta-badges";

export default function FeaturedHeroCard({
  project,
}: {
  project: ProductWithVote;
}) {
  return (
    <Card className="relative flex h-full flex-col justify-between border-zinc-800/80 bg-[#0B0F17] p-4 text-white hover:border-zinc-700 min-[750px]:p-6">
      <Link
        href={`projects/${project.slug}`}
        className="group block flex-1 transition-transform duration-300"
      >
        <div className="mb-4 flex items-center justify-between">
          <ProjectMetaBadges
            badgeStatus={project.badgeStatus}
            githubStars={project.githubStars}
          />
        </div>

        <div className="relative mb-4 h-48 w-full shrink-0 overflow-hidden rounded-lg border border-zinc-800 bg-black/50 sm:h-64">
          {project.previewImageUrl ? (
            <img
              src={project.previewImageUrl}
              alt={project.name}
              loading="eager"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center font-mono text-xs text-zinc-600">
              [Preview Architecture Graphic]
            </div>
          )}
        </div>

        <CardHeader className="mb-4 p-0">
          <CardTitle className="text-xl font-bold text-white transition-colors group-hover:text-emerald-400 sm:text-2xl">
            {project.name}
          </CardTitle>
          <CardDescription className="mt-1 text-sm text-slate-400">
            {project.description}
          </CardDescription>
        </CardHeader>

        <div className="flex flex-wrap gap-1.5 pb-3 min-[750px]:gap-2 min-[750px]:pb-4">
          {(project.tags || []).map((tag) => (
            <Badge
              variant="secondary"
              key={tag}
              className="border border-zinc-800/80 bg-[#182232] px-2.5 py-1 text-sm text-white min-[750px]:p-4 min-[750px]:text-lg"
            >
              {tag}
            </Badge>
          ))}
        </div>
      </Link>

      <CardFooter className="mt-1 flex flex-col gap-3 border-0 border-t border-zinc-800/60 bg-[#0B0F17] p-0 px-4 pt-3 min-[750px]:px-6">
        <div className="flex w-full items-center gap-2 pb-3 min-[750px]:gap-3 min-[750px]:pb-4">
          <Avatar className="h-8 w-8 shrink-0">
            <AvatarFallback className="text-xs">
              {project.name?.charAt(0) || "U"}
            </AvatarFallback>
          </Avatar>
          <span className="min-w-0 flex-1 truncate text-sm font-medium text-slate-300">
            {project.submittedBy}
          </span>
          <div className="shrink-0">
            <VoteButton
              projectId={project.id}
              initialVoteCount={project.voteCount}
              initialHasVoted={project.hasVoted}
              compact
            />
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
