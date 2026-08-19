import { FlameIcon, ArrowUpRightIcon, ChevronUpIcon } from "lucide-react";
import Link from "next/link";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
interface Project {
  id: string;
  title: string;
  description: string;
  voteCount: number;
  tags: string[];
  avatar: string;
  name: string;
  isFeatured: boolean;
  previewImage?: string;
  githubStars?: string;
  statusBadge?: string;
  submittedBy: string;
  githubUrl?: string;
}
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`projects/${project.id}`}
      className="py-5 border-zinc-800/80 hover:scale-105 transition-transform duration-300"
    >
      <Card className="relative mx-auto w-full pt-0 bg-[#0B0F17] text-white">
        <div className=" bg-black/35" />
        <CardHeader className="">
          <CardTitle className="pb-1">{project.name}</CardTitle>
          <CardDescription className="">{project.description}</CardDescription>
        </CardHeader>
        <CardFooter className="bg-[#0B0F17] py-0  pb-3 px-0 border-0 flex flex-col gap-2">
          <div className="flex flex-wrap gap-2">
            {(project.tags || []).map((tag) => (
              <Badge
                variant="secondary"
                key={tag}
                className="text-sm p-3 whitespace-nowrap bg-[#182232] text-white border border-zinc-800/80"
              >
                {tag}
              </Badge>
            ))}
          </div>
          <div className="mt-3 text-sm text-muted-foreground flex justify-between items-center gap-4">
            <Avatar>
              <AvatarImage src={project.avatar} alt={project.submittedBy} />
              <AvatarFallback>{project.submittedBy.charAt(0)}</AvatarFallback>
            </Avatar>
            <span>{project.submittedBy}</span>

            <Button
              size="lg"
              className="bg-[#0B0F17] text-lg text-white border border-zinc-800/80 hover:bg-[#182232]/80"
            >
              <ChevronUpIcon fill="currentColor" />
              {project.voteCount}
            </Button>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
