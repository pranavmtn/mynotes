"use client";

import { useState } from "react";
import type { Idea } from "@/lib/types";
import { formatDate } from "@/lib/utils";

export function IdeaCard({
  idea,
  selected,
  onToggleSelect,
  onUpdateTitle,
}: {
  idea: Idea;
  selected: boolean;
  onToggleSelect: () => void;
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
      className={`group flex items-center justify-between gap-4 rounded-xl border bg-surface px-4 py-3 transition-colors hover:border-foreground/30 ${
        selected ? "border-foreground/40" : ""
      }`}
      style={{ borderColor: selected ? undefined : idea.color + "80" }}
    >
      <div className="flex min-w-0 flex-1 items-center gap-3">
        <button
          type="button"
          aria-pressed={selected}
          aria-label={selected ? `Deselect ${idea.title}` : `Select ${idea.title}`}
          onClick={onToggleSelect}
          className="-m-1 shrink-0 cursor-pointer p-1"
        >
          <span
            className={`block h-2 w-2 rounded-full transition-shadow ${
              selected ? "ring-2 ring-offset-2 ring-foreground/50" : ""
            }`}
            style={{ backgroundColor: idea.color }}
          />
        </button>
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
