"use client";
import { toggleVoteAction } from "@/src/actions/product-actions";
import { Button } from "../ui/button";
import { ChevronUpIcon } from "lucide-react";
import { useEffect, useState, useTransition } from "react";

export default function VoteButton({
  projectId,
  initialVoteCount,
  initialHasVoted,
}: {
  projectId: number;
  initialVoteCount: number;
  initialHasVoted: boolean;
}) {
  const [isPending, startTransition] = useTransition();
  const [hasVoted, setHasVoted] = useState(initialHasVoted);
  const [voteCount, setVoteCount] = useState(initialVoteCount);
  useEffect(() => {
    setHasVoted(initialHasVoted);
    setVoteCount(initialVoteCount);
  }, [initialHasVoted, initialVoteCount]);
  return (
    <Button
      size="lg"
      disabled={isPending}
      onClick={(e) => {
        e.preventDefault();
        const nextVotedState = !hasVoted;
        setHasVoted(nextVotedState);
        setVoteCount((prev) => (nextVotedState ? prev + 1 : prev - 1));

        startTransition(async () => {
          const result = await toggleVoteAction(projectId);
          if (!result.success) {
            setHasVoted(!nextVotedState);
            setVoteCount((prev) => (!nextVotedState ? prev + 1 : prev - 1));
          }
        });
      }}
      className={`text-lg border transition-colors ${
        hasVoted
          ? "bg-emerald-600 text-white border-emerald-500 hover:bg-emerald-700"
          : "bg-[#0B0F17] text-white border-zinc-800/80 hover:bg-[#182232]/80"
      }`}
    >
      <ChevronUpIcon fill="currentColor" />
      {voteCount}
    </Button>
  );
}
