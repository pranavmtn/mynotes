"use client";

import type { Idea } from "@/lib/types";
import { ideaProgress } from "@/lib/utils";

export function PlanCard({ idea, onOpen }: { idea: Idea; onOpen: () => void }) {
  const progress = ideaProgress(idea);
  return (
    <button
      type="button"
      onClick={onOpen}
      className="group flex w-full items-center justify-between gap-4 rounded-xl border bg-surface px-4 py-3 text-left transition-colors hover:border-foreground/30 cursor-pointer"
      style={{ borderColor: idea.color + "80" }}
    >
      <div className="flex min-w-0 items-center gap-3">
        <span
          className="h-2 w-2 shrink-0 rounded-full"
          style={{ backgroundColor: idea.color }}
          aria-hidden
        />
        <div className="min-w-0">
          <p className="truncate text-sm text-foreground">{idea.title}</p>
          <p className="text-xs text-muted">
            {idea.plans.length} {idea.plans.length === 1 ? "plan" : "plans"}
          </p>
        </div>
      </div>
      <span className="shrink-0 text-xs text-muted tabular-nums">{progress}%</span>
    </button>
  );
}
