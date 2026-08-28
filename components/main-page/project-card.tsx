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
    <Card className="relative mx-auto w-full border-zinc-800/80 bg-[#0B0F17] pt-0 text-white transition-transform duration-300 hover:scale-105">
      <Link href={`projects/${project.slug}`} className="block py-5">
        <CardHeader>
          <CardTitle className="pb-1">{project.name}</CardTitle>
          <CardDescription>{project.description}</CardDescription>
        </CardHeader>
        <div className="flex flex-wrap gap-2 px-6">
          {(project.tags || []).map((tag) => (
            <Badge
              variant="secondary"
              key={tag}
              className="whitespace-nowrap border border-zinc-800/80 bg-[#182232] p-3 text-sm text-white"
            >
              {tag}
            </Badge>
          ))}
        </div>
      </Link>
      <CardFooter className="flex flex-col gap-2 border-0 bg-[#0B0F17] px-6 py-0 pb-3">
        <div className="text-muted-foreground mt-3 flex items-center justify-between gap-4 text-sm">
          <Avatar>
            <AvatarFallback>
              {project?.submittedBy?.charAt(0) || "A"}
            </AvatarFallback>
          </Avatar>
          <span>{project.submittedBy}</span>
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
