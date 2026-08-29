"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useEffect, useState, useTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function SearchBar({ placeholder }: { placeholder: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") ?? "");
  const [, startTransition] = useTransition();

  useEffect(() => {
    const nextQuery = searchQuery.trim();
    const currentQuery = searchParams.get("q") ?? "";

    if (nextQuery === currentQuery) {
      return;
    }

    const timeout = window.setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());

      if (nextQuery) {
        params.set("q", nextQuery);
      } else {
        params.delete("q");
      }

      const query = params.toString();
      startTransition(() => {
        router.replace(`${pathname}${query ? `?${query}` : ""}`, {
          scroll: false,
        });
      });
    }, 300);

    return () => window.clearTimeout(timeout);
  }, [pathname, router, searchParams, searchQuery]);

  return (
    <div className="relative flex w-full items-center min-[750px]:max-w-sm">
      <Search className="absolute left-3 h-4 w-4 text-muted-foreground pointer-events-none" />
      <Input
        type="search"
        placeholder={placeholder}
        value={searchQuery}
        onChange={(event) => setSearchQuery(event.target.value)}
        aria-label={placeholder}
        className="bg-slate-800/60 text-slate-300 border-slate-700/50  pl-9 pr-4 border-0 focus-visible:ring-2 focus-visible:ring-emerald-500/40 focus-visible:ring-offset-0 shadow-[0_0_15px_rgba(16,185,129,0.15)]"
      />
    </div>
  );
}
