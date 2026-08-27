import { SquareTerminal } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "../ui/button";
import { Show, SignInButton, SignUpButton } from "@clerk/nextjs";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { cn } from "@/lib/utils";
import SearchBar from "@/components/header/search-bar";
import ClerkUserButton from "@/components/header/clerk-user-button";
import { Suspense } from "react";
export default function Header({ className }: { className?: string }) {
  return (
    <header className={cn("py-4 px-6 border-b border-gray-200", className)}>
      <div className="flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <SquareTerminal className="h-6 w-6 text-emerald-400" />
          <span className="font-bold text-lg tracking-tight text-white">
            Project Share
          </span>
        </Link>
        <SearchBar placeholder="Search projects..." />

        <Suspense fallback={<div className="text-white">Loading...</div>}>
          <Show when="signed-out">
            <SignInButton />
            <SignUpButton>
              <button className="bg-emerald-500 text-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
                Sign Up
              </button>
            </SignUpButton>
          </Show>
          <Show when="signed-in">
            <Link
              href="/submit"
              className={cn(
                buttonVariants({ variant: "default", size: "lg" }),
                "text-base text-white px-8 shadow-lg bg-emerald-700 hover:bg-emerald-900",
              )}
            >
              Submit Project
            </Link>
          </Show>
        </Suspense>
        <ClerkUserButton />
        {/* <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar> */}
      </div>
    </header>
  );
}
