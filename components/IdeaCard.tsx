"use client";

import { useState } from "react";
import type { Idea } from "@/lib/types";
import { formatDate } from "@/lib/utils";

export function IdeaCard({
  idea,
  onUpdateTitle,
}: {
  idea: Idea;
  onUpdateTitle: (title: string) => void;
}) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(idea.title);

  function commitEdit() {
    setEditing(false);
    const trimmed = draft.trim();
    if (trimmed && trimmed !== idea.title) {
      onUpdateTitle(trimmed);
    } else {
      setDraft(idea.title);
    }
  }

  return (
    <div
      className="group flex items-center justify-between gap-4 rounded-xl border bg-surface px-4 py-3 transition-colors hover:border-foreground/30"
      style={{ borderColor: idea.color + "80" }}
    >
      <div className="flex min-w-0 flex-1 items-center gap-3">
        <span
          className="h-2 w-2 shrink-0 rounded-full"
          style={{ backgroundColor: idea.color }}
          aria-hidden
        />
        {editing ? (
          <input
            autoFocus
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onBlur={commitEdit}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                commitEdit();
              }
              if (e.key === "Escape") {
                setDraft(idea.title);
                setEditing(false);
              }
            }}
            className="w-full bg-transparent text-sm text-foreground focus:outline-none"
          />
        ) : (
          <button
            type="button"
            onClick={() => setEditing(true)}
            className="truncate text-left text-sm text-foreground cursor-text"
          >
            {idea.title}
          </button>
        )}
      </div>
      <span className="shrink-0 text-xs text-muted">{formatDate(idea.createdAt)}</span>
    </div>
  );
}
