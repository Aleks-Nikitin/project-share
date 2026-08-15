import { LucideIcon } from "lucide-react";

export default function SectionHeader({
  title,
  icon: Icon,
  description,
}: {
  title: string;
  description: string;
  icon: LucideIcon;
}) {
  return (
    <div className="mb-12">
      <div className="flex items-center gap-2 mb-3">
        <Icon className="size-6 text-primary " />
        <h2 className="text-3xl font-bold">{title}</h2>
      </div>
      <p className="text-lg">{description}</p>
    </div>
  );
}
