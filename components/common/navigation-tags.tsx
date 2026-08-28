import Link from "next/link";
import { buildTagHref } from "@/lib/project-utils";

interface NavTag {
  name: string;
  slug: string | null;
}

export default function NavigationTags({
  tags,
  activeTag,
  searchQuery,
}: {
  tags: NavTag[];
  activeTag?: string;
  searchQuery?: string;
}) {
  return (
    <div className="mb-2 flex justify-center">
      <div className="mb-3 flex flex-wrap items-center justify-center gap-2">
        {tags.map((tag) => {
          const isActive =
            tag.slug === (activeTag ?? null) ||
            (!activeTag && tag.slug === null);

          return (
            <Link href={buildTagHref(tag.slug, searchQuery)} key={tag.name}>
              <span
                className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? "border-emerald-500/60 bg-emerald-500/15 text-emerald-400"
                    : "border-zinc-800/80 bg-primary/10 text-white hover:bg-[#1a1d27]"
                }`}
              >
                {tag.name}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
