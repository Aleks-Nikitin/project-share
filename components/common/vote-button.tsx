"use client";

import {
  getUserVoteStatus,
  toggleVoteAction,
} from "@/src/actions/product-actions";
import { SignInButton, useAuth } from "@clerk/nextjs";
import { Button } from "../ui/button";
import { ChevronUpIcon } from "lucide-react";
import { useEffect, useRef, useState, useTransition } from "react";

function voteButtonClass(hasVoted: boolean, compact: boolean, extra = "") {
  return `${compact ? "text-sm" : "text-lg"} border transition-colors ${extra} ${
    hasVoted
      ? "bg-emerald-600 text-white border-emerald-500 hover:bg-emerald-700"
      : "bg-[#0B0F17] text-white border-zinc-800/80 hover:bg-[#182232]/80"
  }`;
}

export default function VoteButton({
  projectId,
  initialVoteCount,
  initialHasVoted = false,
  compact = false,
}: {
  projectId: number;
  initialVoteCount: number;
  initialHasVoted?: boolean;
  compact?: boolean;
}) {
  const { isSignedIn, isLoaded } = useAuth();
  const [isPending, startTransition] = useTransition();
  const [hasVoted, setHasVoted] = useState(initialHasVoted);
  const [voteCount, setVoteCount] = useState(initialVoteCount);
  const isToggling = useRef(false);

  useEffect(() => {
    setVoteCount(initialVoteCount);
  }, [initialVoteCount, projectId]);

  useEffect(() => {
    if (!isLoaded || !isSignedIn) {
      setHasVoted(false);
      return;
    }

    let cancelled = false;

    getUserVoteStatus(projectId).then(({ hasVoted: voted }) => {
      if (!cancelled) {
        setHasVoted(voted);
      }
    });

    return () => {
      cancelled = true;
    };
  }, [projectId, isLoaded, isSignedIn]);

  const buttonSize = "lg";

  if (!isLoaded) {
    return (
      <Button
        size={buttonSize}
        disabled
        className={voteButtonClass(false, compact, "opacity-50")}
      >
        <ChevronUpIcon fill="currentColor" />
        {voteCount}
      </Button>
    );
  }

  if (!isSignedIn) {
    return (
      <SignInButton mode="modal">
        <Button
          type="button"
          size={buttonSize}
          title="Sign in to vote"
          aria-label="Sign in to vote"
          onClick={(e) => e.stopPropagation()}
          className={voteButtonClass(
            false,
            compact,
            "cursor-pointer opacity-60 hover:opacity-80",
          )}
        >
          <ChevronUpIcon fill="currentColor" />
          {voteCount}
        </Button>
      </SignInButton>
    );
  }

  return (
    <Button
      type="button"
      size={buttonSize}
      disabled={isPending}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();

        if (isToggling.current || isPending) {
          return;
        }

        isToggling.current = true;
        const nextVotedState = !hasVoted;
        setHasVoted(nextVotedState);
        setVoteCount((prev) => (nextVotedState ? prev + 1 : prev - 1));

        startTransition(async () => {
          try {
            const result = await toggleVoteAction(projectId);

            if (!result.success) {
              setHasVoted(!nextVotedState);
              setVoteCount((prev) => (nextVotedState ? prev - 1 : prev + 1));
              return;
            }

            if (typeof result.hasVoted === "boolean") {
              setHasVoted(result.hasVoted);
            }
          } finally {
            isToggling.current = false;
          }
        });
      }}
      className={voteButtonClass(hasVoted, compact, "hover:cursor-pointer")}
    >
      <ChevronUpIcon fill="currentColor" />
      {voteCount}
    </Button>
  );
}
