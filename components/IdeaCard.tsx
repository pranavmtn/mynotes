"use client";

import { Trash2 } from "lucide-react";
import { useState } from "react";
import type { Idea } from "@/lib/types";
import { formatDate } from "@/lib/utils";

export function IdeaCard({
  idea,
  onUpdateTitle,
  onDelete,
}: {
  idea: Idea;
  onUpdateTitle: (title: string) => void;
  onDelete: () => void;
}) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(idea.title);
  const [confirmingDelete, setConfirmingDelete] = useState(false);

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
      <div className="flex shrink-0 items-center gap-3">
        <span className="text-xs text-muted">{formatDate(idea.createdAt)}</span>
        {confirmingDelete ? (
          <div className="flex items-center gap-2 text-xs">
            <button
              type="button"
              onClick={onDelete}
              className="text-foreground underline cursor-pointer"
            >
              Delete
            </button>
            <button
              type="button"
              onClick={() => setConfirmingDelete(false)}
              className="text-muted cursor-pointer"
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            type="button"
            aria-label="Delete idea"
            onClick={() => setConfirmingDelete(true)}
            className="text-muted opacity-0 transition-opacity hover:text-foreground group-hover:opacity-100 cursor-pointer"
          >
            <Trash2 size={14} />
          </button>
        )}
      </div>
    </div>
  );
}
