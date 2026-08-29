import { getProjectBySlug } from "@/src/queries/select";
import { notFound } from "next/navigation";
import { connection } from "next/server";
import Link from "next/link";
import { ExternalLink, FolderGitIcon } from "lucide-react";
import VoteButton from "@/components/common/vote-button";
import ProjectMetaBadges from "@/components/common/project-meta-badges";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

export const instant = false;

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  await connection();
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return notFound();
  }

  const {
    id,
    name,
    tagline,
    description,
    website_url,
    githubUrl,
    previewImageUrl,
    tags,
    submittedBy,
    voteCount,
    badgeStatus,
    githubStars,
    organizationId,
  } = project;

  return (
    <main className="max-w-4xl mx-auto px-4 py-12 md:py-20 text-white min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pb-8 border-b border-zinc-800/80">
        <div className="space-y-3">
          <h1 className="text-4xl font-bold tracking-tight">{name}</h1>
          {tagline && <p className="text-xl text-zinc-400">{tagline}</p>}
          <ProjectMetaBadges
            badgeStatus={badgeStatus}
            githubStars={githubStars}
            size="compact"
          />
        </div>
        <div className="shrink-0">
          <VoteButton projectId={id} initialVoteCount={voteCount} />
        </div>
      </div>

      <div className="py-8 space-y-10">
        {previewImageUrl ? (
          <div className="w-full aspect-video relative rounded-xl overflow-hidden border border-zinc-800/80 bg-[#0B0F17] shadow-xl">
            <img
              src={previewImageUrl}
              alt={`${name} preview`}
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          <div className="w-full aspect-video rounded-xl border border-zinc-800/80 bg-[#182232]/50 flex items-center justify-center">
            <span className="text-zinc-600">No preview image provided</span>
          </div>
        )}

        <div className="flex flex-wrap gap-4">
          {website_url && (
            <Link
              href={website_url}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                buttonVariants({ variant: "default", size: "lg" }),
                "text-base text-white px-8 shadow-lg bg-emerald-700 hover:bg-emerald-900",
              )}
            >
              <ExternalLink className="w-5 h-5 mr-2" />
              Visit Website
            </Link>
          )}

          {githubUrl && (
            <Link
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                buttonVariants({ variant: "default", size: "lg" }),
                "text-base text-white px-8 shadow-lg bg-emerald-700 hover:bg-emerald-900",
              )}
            >
              <FolderGitIcon className="w-5 h-5 mr-2" />
              View on GitHub
            </Link>
          )}
        </div>

        <div className="bg-[#0B0F17] border border-zinc-800/80 rounded-xl p-6 md:p-8 space-y-8">
          <div>
            <h2 className="text-xl font-semibold mb-4 text-zinc-100">
              About this project
            </h2>
            <p className="text-zinc-300 leading-relaxed whitespace-pre-wrap">
              {description || "No description provided."}
            </p>
          </div>

          {tags && tags.length > 0 && (
            <div className="pt-6 border-t border-zinc-800/80">
              <h3 className="text-sm font-medium text-zinc-500 mb-3">
                Built with
              </h3>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag: string) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="text-sm px-3 py-1.5 bg-[#182232] text-zinc-200 border border-zinc-800/80"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {organizationId && (
            <div className="pt-6 border-t border-zinc-800/80">
              <h3 className="text-sm font-medium text-zinc-500 mb-2">
                Organization
              </h3>
              <p className="font-mono text-sm text-slate-300">{organizationId}</p>
            </div>
          )}
        </div>

        <div className="flex items-center gap-4 pt-4">
          <Avatar className="w-12 h-12 border border-zinc-800/80">
            <AvatarFallback className="bg-[#182232] text-emerald-500 font-bold text-lg">
              {submittedBy?.charAt(0).toUpperCase() || "A"}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm text-zinc-500">Submitted by</p>
            <p className="font-medium text-zinc-200">{submittedBy}</p>
          </div>
        </div>
      </div>
    </main>
  );
}
