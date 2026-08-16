import { FlameIcon, ArrowUpRightIcon } from "lucide-react";
import Link from "next/link";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
interface Project {
  id: string;
  title: string;
  description: string;
  votes: number;
  tags: string[];
  avatar: string;
  username: string;
}
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
export default function FeaturedProject({ project }: { project: Project }) {
  return (
    <Link
      href={`projects/${project.id}`}
      className="py-5 border border-zinc-800/80"
    >
      <Card className="relative mx-auto w-full pt-0 bg-[#0B0F17] text-white">
        <div className=" bg-black/35" />
        <CardHeader>
          <CardTitle>Design systems meetup</CardTitle>
          <CardDescription>
            A practical talk on component APIs, accessibility, and shipping
            faster.
          </CardDescription>
        </CardHeader>
        <CardFooter className="bg-[#0B0F17] px-0 border-0 flex flex-col gap-2">
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
          <div className="mt-4 text-sm text-muted-foreground flex justify-between items-center gap-2">
            {project.username && <span> {project.username}</span>}
            {project.votes} votes.
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
