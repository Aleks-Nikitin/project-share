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
    <Card className="relative flex h-full flex-col justify-between border-zinc-800/80 bg-[#0B0F17] p-6 text-white hover:border-zinc-700">
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

        <div className="flex flex-wrap gap-2 pb-4">
          {(project.tags || []).map((tag) => (
            <Badge
              variant="secondary"
              key={tag}
              className="border border-zinc-800/80 bg-[#182232] p-4 text-lg text-white"
            >
              {tag}
            </Badge>
          ))}
        </div>
      </Link>

      <CardFooter className="mt-1 flex flex-col gap-3 border-0 border-t border-zinc-800/60 bg-[#0B0F17] p-0 pt-4">
        <div className="text-muted-foreground flex w-full items-center justify-center gap-5 p-4 text-lg">
          <Avatar className="h-7 w-7">
            <AvatarFallback>{project.name?.charAt(0) || "U"}</AvatarFallback>
          </Avatar>
          <span className="font-medium text-slate-300">{project.submittedBy}</span>
          <VoteButton
            projectId={project.id}
            initialVoteCount={project.voteCount}
            initialHasVoted={project.hasVoted}
          />
        </div>
      </CardFooter>
    </Card>
  );
}
