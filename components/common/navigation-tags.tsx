import { LucideIcon } from "lucide-react";

export default function NavigationTags({ tags }: { tags: string[] }) {
  return (
    <div className="mb-2 flex justify-center">
      <div className="flex items-center gap-2 mb-3">
        {tags.map((tag, index) => (
          <span
            key={index}
            className="bg-primary/10 text-white text-sm font-medium px-3 py-1 rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
