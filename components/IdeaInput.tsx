"use client";

import { Plus } from "lucide-react";
import { useRef, useState } from "react";

export function IdeaInput({ onAdd }: { onAdd: (title: string) => void }) {
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  function handleSubmit() {
    const trimmed = value.trim();
    if (!trimmed) return;
    onAdd(trimmed);
    setValue("");
    inputRef.current?.focus();
  }

  return (
    <div className="flex items-center gap-3 rounded-xl border border-border bg-surface px-4 py-3 transition-colors focus-within:border-foreground/40">
      <button
        type="button"
        aria-label="Add idea"
        onClick={() => inputRef.current?.focus()}
        className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-border text-muted transition-colors hover:text-foreground cursor-pointer"
      >
        <Plus size={14} />
      </button>
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            handleSubmit();
          }
        }}
        placeholder="Write a new idea..."
        aria-label="New idea"
        className="w-full bg-transparent text-sm text-foreground placeholder:text-muted focus:outline-none"
      />
    </div>
  );
}
