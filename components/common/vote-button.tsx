"use client";
import { toggleVoteAction } from "@/src/actions/product-actions";
import { Button } from "../ui/button";
import { ChevronUpIcon } from "lucide-react";
import { useTransition } from "react";

export default function VoteButton({
  projectId,
  voteCount,
}: {
  projectId: number;
  voteCount: number;
}) {
  const [isPending, startTransition] = useTransition();
  return (
    <Button
      size="lg"
      disabled={isPending}
      onClick={(e) => {
        e.preventDefault();
        startTransition(() => {
          toggleVoteAction(projectId);
        });
      }}
      className="bg-[#0B0F17] text-lg text-white border border-zinc-800/80 hover:bg-[#182232]/80"
    >
      <ChevronUpIcon fill="currentColor" />
      {voteCount}
    </Button>
  );
}
