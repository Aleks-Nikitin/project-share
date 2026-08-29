import { SquareTerminal } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "../ui/button";
import { Show, SignInButton, SignUpButton } from "@clerk/nextjs";
import { cn } from "@/lib/utils";
import SearchBar from "@/components/header/search-bar";
import ClerkUserButton from "@/components/header/clerk-user-button";
import { Suspense } from "react";

export default function Header({ className }: { className?: string }) {
  return (
    <header
      className={cn(
        "border-b border-zinc-800/80 px-3 py-3 min-[750px]:px-6 min-[750px]:py-4",
        className,
      )}
    >
      <div className="flex items-center justify-between gap-2 min-[750px]:gap-4">
        <Link href="/" className="flex shrink-0 items-center gap-2">
          <SquareTerminal className="h-6 w-6 text-emerald-400" />
          <span className="hidden text-lg font-bold tracking-tight text-white min-[750px]:inline">
            Project Share
          </span>
        </Link>

        <div className="min-w-0 flex-1 justify-center px-4 flex">
          <Suspense fallback={<div className="h-10 w-full max-w-sm" />}>
            <SearchBar placeholder="Search projects..." />
          </Suspense>
        </div>

        <div className="flex shrink-0 items-center gap-1.5 min-[750px]:gap-8">
          <Suspense fallback={<div className="h-10 w-16" />}>
            <Show when="signed-out">
              <SignInButton>
                <button className="cursor-pointer rounded-full px-2 py-2 text-xs font-medium text-white min-[750px]:px-4 min-[750px]:text-sm">
                  Sign In
                </button>
              </SignInButton>
              <SignUpButton>
                <button className="h-9 cursor-pointer rounded-full bg-emerald-500 px-3 text-xs font-medium text-white min-[750px]:h-10 min-[750px]:px-5 min-[750px]:text-sm">
                  Sign Up
                </button>
              </SignUpButton>
            </Show>
            <Show when="signed-in">
              <Link
                href="/submit"
                className={cn(
                  buttonVariants({ variant: "default", size: "lg" }),
                  "h-9 bg-emerald-700 px-3 text-xs text-white shadow-lg hover:bg-emerald-900 min-[750px]:h-10 min-[750px]:px-6 min-[750px]:text-sm",
                )}
              >
                <span className="min-[750px]:hidden">Submit</span>
                <span className="hidden min-[750px]:inline">
                  Submit Project
                </span>
              </Link>
            </Show>
          </Suspense>
          <ClerkUserButton />
        </div>
      </div>
    </header>
  );
}
