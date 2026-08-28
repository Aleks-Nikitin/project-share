"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Check, Loader2, Trash2, X } from "lucide-react";
import {
  approveProject,
  deleteProject,
  rejectProject,
} from "@/src/actions/admin-actions";

export default function AdminActions({
  status,
  projectId,
}: {
  status: string;
  projectId: number;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  function runAction(
    action: () => Promise<{ success: boolean; message: string }>,
  ) {
    setError(null);

    startTransition(async () => {
      const result = await action();

      if (!result.success) {
        setError(result.message);
        return;
      }

      router.refresh();
    });
  }

  return (
    <div className="flex flex-col items-end gap-2">
      <div className="flex items-center gap-2">
        {status === "pending" && (
          <>
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={isPending}
              className="border-emerald-500/30 bg-[#182232] text-emerald-500 transition-colors hover:bg-emerald-500 hover:text-white"
              onClick={() => runAction(() => approveProject(projectId))}
            >
              {isPending ? (
                <Loader2 className="mr-1 h-4 w-4 animate-spin" />
              ) : (
                <Check className="mr-1 h-4 w-4" />
              )}
              Approve
            </Button>

            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={isPending}
              className="border-amber-500/30 bg-[#182232] text-amber-500 transition-colors hover:bg-amber-500 hover:text-white"
              onClick={() => runAction(() => rejectProject(projectId))}
            >
              {isPending ? (
                <Loader2 className="mr-1 h-4 w-4 animate-spin" />
              ) : (
                <X className="mr-1 h-4 w-4" />
              )}
              Reject
            </Button>
          </>
        )}

        <Button
          type="button"
          variant="ghost"
          size="sm"
          disabled={isPending}
          className="ml-2 text-red-400 hover:bg-red-500/10 hover:text-red-300"
          onClick={() => {
            if (
              !window.confirm(
                "Delete this project permanently? This cannot be undone.",
              )
            ) {
              return;
            }

            runAction(() => deleteProject(projectId));
          }}
        >
          {isPending ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Trash2 className="h-4 w-4" />
          )}
        </Button>
      </div>

      {error && (
        <p className="max-w-xs text-right text-xs text-red-400">{error}</p>
      )}
    </div>
  );
}
