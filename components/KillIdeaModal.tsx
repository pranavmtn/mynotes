"use client";

import { useState } from "react";

const CONFIRM_PHRASE = "I am not capable of implementing this idea now or never";

export function KillIdeaModal({
  ideaTitle,
  onConfirm,
  onCancel,
}: {
  ideaTitle: string;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  const [input, setInput] = useState("");
  const matches = input.trim().toLowerCase() === CONFIRM_PHRASE.toLowerCase();

  return (
    <div className="fixed inset-0 z-30 flex items-center justify-center px-4">
      <button
        type="button"
        aria-label="Cancel"
        onClick={onCancel}
        className="fixed inset-0 cursor-default bg-foreground/10"
      />
      <div className="relative z-40 w-full max-w-sm rounded-2xl border border-border bg-surface p-6">
        <p className="text-sm font-medium text-foreground">Kill this idea</p>
        <p className="mt-1.5 text-sm text-muted">
          This permanently deletes &ldquo;{ideaTitle}&rdquo; and every plan and
          step under it. There&apos;s no undo.
        </p>
        <p className="mt-4 text-xs text-muted">Type the phrase below to confirm:</p>
        <p className="mt-1 rounded-lg border border-border bg-background px-3 py-2 text-xs text-foreground">
          {CONFIRM_PHRASE}
        </p>
        <input
          autoFocus
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type it here..."
          aria-label="Confirmation phrase"
          className="mt-3 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted focus:outline-none focus:border-foreground/40"
        />
        <div className="mt-4 flex justify-end gap-2">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg border border-border px-3 py-1.5 text-xs text-muted transition-colors hover:text-foreground cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={!matches}
            onClick={onConfirm}
            className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors ${
              matches
                ? "border-red-300 bg-red-50 text-red-600 hover:bg-red-100 cursor-pointer"
                : "border-border text-muted opacity-50 cursor-not-allowed"
            }`}
          >
            Kill this idea
          </button>
        </div>
      </div>
    </div>
  );
}
