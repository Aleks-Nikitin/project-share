import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default function SearchBar({ placeholder }: { placeholder: string }) {
  return (
    <div className="relative w-full max-w-sm flex items-center  ">
      <Search className="absolute left-3 h-4 w-4 text-muted-foreground pointer-events-none" />
      <Input
        type="search"
        placeholder={placeholder}
        className="bg-slate-800/60 text-slate-300 border-slate-700/50  pl-9 pr-4 border-0 focus-visible:ring-2 focus-visible:ring-emerald-500/40 focus-visible:ring-offset-0 shadow-[0_0_15px_rgba(16,185,129,0.15)]"
      />
    </div>
  );
}
