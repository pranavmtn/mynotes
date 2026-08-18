"use client";

import { X } from "lucide-react";
import { useState } from "react";
import { Avatar } from "@/components/Avatar";

export function ProfilePanel({
  profile,
  onClose,
  onSave,
}: {
  profile: { name: string; email: string };
  onClose: () => void;
  onSave: (name: string) => void;
}) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(profile.name);
  const [saving, setSaving] = useState(false);

  async function commit() {
    const trimmed = draft.trim();
    setEditing(false);
    if (!trimmed || trimmed === profile.name) {
      setDraft(profile.name);
      return;
    }
    setSaving(true);
    try {
      const res = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: trimmed }),
      });
      if (res.ok) onSave(trimmed);
      else setDraft(profile.name);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 z-30 flex items-center justify-center px-4">
      <button
        type="button"
        aria-label="Close profile"
        onClick={onClose}
        className="fixed inset-0 cursor-default bg-foreground/10"
      />
      <div className="relative z-40 w-full max-w-sm rounded-2xl border border-border bg-surface p-6">
        <button
          type="button"
          aria-label="Close"
          onClick={onClose}
          className="absolute right-4 top-4 text-muted transition-colors hover:text-foreground cursor-pointer"
        >
          <X size={16} />
        </button>

        <div className="flex flex-col items-center gap-3 pt-2">
          <Avatar name={profile.name} size={56} />
          {editing ? (
            <input
              autoFocus
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onBlur={commit}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  commit();
                }
                if (e.key === "Escape") {
                  setDraft(profile.name);
                  setEditing(false);
                }
              }}
              className="w-full rounded-lg border border-border bg-background px-3 py-1.5 text-center text-sm text-foreground focus:outline-none focus:border-foreground/40"
            />
          ) : (
            <button
              type="button"
              onClick={() => setEditing(true)}
              className="text-sm font-medium text-foreground cursor-text"
            >
              {profile.name}
              <span className="ml-1.5 text-xs text-muted">edit</span>
            </button>
          )}
          <p className="text-xs text-muted">{profile.email}</p>
          {saving && <p className="text-xs text-muted">Saving...</p>}
        </div>
      </div>
    </div>
  );
}
