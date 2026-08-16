import { FlameIcon, ArrowUpRightIcon } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "../ui/button";
import { cn } from "@/lib/utils";
export default function FeaturedProject() {
  return (
    <section className="py-20 bg-muted/20">
      <div className="wrapper">
        <div className="flex items-center justify-between mb-8">
          <Link
            href="/explore"
            className={cn(
              buttonVariants({ variant: "outline" }),
              "hidden sm:flex",
            )}
          >
            View All <ArrowUpRightIcon className="size-4" />
          </Link>
        </div>
        <div
          className="grid grid-cols-1 md:grid-cols-2
            lg:grid-cols-3 gap-6"
        ></div>
      </div>
    </section>
  );
}
