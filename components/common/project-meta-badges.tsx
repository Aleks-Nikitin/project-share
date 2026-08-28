import { StarIcon } from "lucide-react";
import { formatGithubStars } from "@/lib/project-utils";

export default function ProjectMetaBadges({
  badgeStatus,
  githubStars,
  size = "default",
}: {
  badgeStatus?: string | null;
  githubStars?: number | null;
  size?: "default" | "compact";
}) {
  const status = badgeStatus || "Production Ready";
  const stars = githubStars ?? 0;
  const isCompact = size === "compact";

  return (
    <div className="flex items-center gap-2.5">
      <div
        className={`flex items-center gap-2 rounded-full border border-zinc-800/80 bg-black/40 ${
          isCompact ? "px-2.5 py-1" : "px-3.5 py-1.5"
        }`}
      >
        <span
          className={`rounded-full bg-emerald-500 ${
            isCompact ? "h-2 w-2" : "h-2.5 w-2.5 animate-pulse"
          }`}
        />
        <span
          className={`font-medium text-slate-300 ${
            isCompact ? "text-xs" : "text-sm"
          }`}
        >
          {status}
        </span>
      </div>

      {stars > 0 && (
        <div
          className={`flex items-center gap-1.5 rounded-full border border-zinc-800/80 bg-black/40 font-mono text-amber-400 ${
            isCompact ? "px-2.5 py-1 text-xs" : "px-3.5 py-1.5 text-sm"
          }`}
        >
          <StarIcon
            className={`fill-amber-400 text-amber-400 ${
              isCompact ? "h-3 w-3" : "h-4 w-4"
            }`}
          />
          <span>{formatGithubStars(stars)}</span>
        </div>
      )}
    </div>
  );
}
