import Link from "next/link";
import { Badge } from "../ui/badge";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { ProductWithVote } from "@/src/types/product";
import VoteButton from "../common/vote-button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function ProjectCard({ project }: { project: ProductWithVote }) {
  return (
    <Card className="relative w-full overflow-hidden border-zinc-800/80 bg-[#0B0F17] text-white transition-transform duration-300 min-[750px]:hover:scale-[1.02]">
      <Link href={`projects/${project.slug}`} className="block">
        <CardHeader className="space-y-2 px-4 pb-3 pt-4 min-[750px]:px-6">
          <CardTitle className="text-base leading-tight min-[750px]:text-lg">
            {project.name}
          </CardTitle>
          <CardDescription className="line-clamp-2 text-sm text-zinc-400">
            {project.description}
          </CardDescription>
        </CardHeader>

        {(project.tags || []).length > 0 && (
          <div className="flex flex-wrap gap-1.5 px-4 pb-3 min-[750px]:gap-2 min-[750px]:px-6">
            {(project.tags || []).map((tag) => (
              <Badge
                variant="secondary"
                key={tag}
                className="whitespace-nowrap border border-zinc-800/80 bg-[#182232] px-2 py-0.5 text-xs text-white min-[750px]:px-2.5 min-[750px]:py-1 min-[750px]:text-sm"
              >
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </Link>

      <CardFooter className="border-t border-zinc-800/60 bg-[#0B0F17] px-4 py-3 min-[750px]:px-6">
        <div className="flex w-full items-center gap-2 min-[750px]:gap-3">
          <Avatar className="h-8 w-8 shrink-0">
            <AvatarFallback className="text-xs">
              {project?.submittedBy?.charAt(0) || "A"}
            </AvatarFallback>
          </Avatar>
          <span className="min-w-0 flex-1 truncate text-xs text-slate-300 min-[750px]:text-sm">
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
