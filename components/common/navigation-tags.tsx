import { LucideIcon } from "lucide-react";
import Link from "next/link";
interface tag {
  name: string;
  route: string;
}
export default function NavigationTags({ tags }: { tags: tag[] }) {
  return (
    <div className="mb-2 flex justify-center">
      <div className="flex items-center gap-2 mb-3">
        {tags.map((tag, index) => (
          <Link href={tag.route} key={index}>
            <span
              key={index}
              className="bg-primary/10 border border-zinc-800/80 hover:bg-[#1a1d27] text-white text-sm font-medium px-4 py-2 rounded-full"
            >
              {tag.name}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
