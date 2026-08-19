"use client";

import { Plus } from "lucide-react";
import { useState } from "react";
import { StepItem } from "@/components/StepItem";
import type { Step } from "@/lib/types";

export function StepList({
  steps,
  onAdd,
  onToggleInTimeline,
  onUpdateText,
  onDelete,
}: {
  steps: Step[];
  onAdd: (text: string) => void;
  onToggleInTimeline: (stepId: string) => void;
  onUpdateText: (stepId: string, text: string) => void;
  onDelete: (stepId: string) => void;
}) {
  const [value, setValue] = useState("");

  function handleSubmit() {
    const trimmed = value.trim();
    if (!trimmed) return;
    onAdd(trimmed);
    setValue("");
  }

  return (
    <div className="flex flex-col">
      {steps.map((step) => (
        <StepItem
          key={step.id}
          step={step}
          onToggleInTimeline={() => onToggleInTimeline(step.id)}
          onUpdateText={(text) => onUpdateText(step.id, text)}
          onDelete={() => onDelete(step.id)}
        />
      ))}
      <div className="mt-2 flex items-center gap-3">
        <Plus size={14} className="shrink-0 text-muted" aria-hidden />
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleSubmit();
            }
          }}
          placeholder="Add task..."
          aria-label="Add task"
          className="w-full bg-transparent text-sm text-foreground placeholder:text-muted focus:outline-none"
        />
      </div>
    </div>
  );
}
