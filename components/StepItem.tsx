"use client";

import { Check, Trash2 } from "lucide-react";
import { useState } from "react";
import type { Step } from "@/lib/types";

export function StepItem({
  step,
  onToggleInTimeline,
  onUpdateText,
  onDelete,
}: {
  step: Step;
  onToggleInTimeline: () => void;
  onUpdateText: (text: string) => void;
  onDelete: () => void;
}) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(step.text);

  function commitEdit() {
    setEditing(false);
    const trimmed = draft.trim();
    if (trimmed && trimmed !== step.text) {
      onUpdateText(trimmed);
    } else {
      setDraft(step.text);
    }
  }

  return (
    <div className="group flex items-center gap-3 py-1.5">
      <button
        type="button"
        onClick={onToggleInTimeline}
        disabled={step.completed}
        aria-label={
          step.completed
            ? "Uncomplete in Timeline to change this"
            : step.inTimeline
              ? "Remove from timeline"
              : "Add to timeline"
        }
        title={step.completed ? "Uncomplete in Timeline to change this" : undefined}
        aria-pressed={step.inTimeline}
        className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border transition-colors ${
          step.completed
            ? "cursor-not-allowed opacity-60"
            : "cursor-pointer"
        } ${
          step.inTimeline
            ? "border-foreground/40 bg-foreground/10 text-foreground"
            : "border-border text-transparent"
        }`}
      >
        <Check size={10} strokeWidth={3} />
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
              setDraft(step.text);
              setEditing(false);
            }
          }}
          className="w-full bg-transparent text-sm text-foreground focus:outline-none"
        />
      ) : (
        <button
          type="button"
          onClick={() => setEditing(true)}
          className={`flex-1 truncate text-left text-sm cursor-text ${
            step.completed ? "text-muted line-through" : "text-foreground"
          }`}
        >
          {step.text}
        </button>
      )}
      <button
        type="button"
        aria-label="Delete step"
        onClick={onDelete}
        className="text-muted opacity-100 transition-opacity hover:text-foreground cursor-pointer sm:opacity-0 sm:group-hover:opacity-100"
      >
        <Trash2 size={12} />
      </button>
    </div>
  );
}
