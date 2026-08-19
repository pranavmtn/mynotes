"use client";

import { StepList } from "@/components/StepList";
import type { Plan } from "@/lib/types";

export function PlanDetail({
  plan,
  onUpdateNotes,
  onAddStep,
  onToggleStepInTimeline,
  onUpdateStepText,
  onDeleteStep,
}: {
  plan: Plan;
  onUpdateNotes: (notes: string) => void;
  onAddStep: (text: string) => void;
  onToggleStepInTimeline: (stepId: string) => void;
  onUpdateStepText: (stepId: string, text: string) => void;
  onDeleteStep: (stepId: string) => void;
}) {
  return (
    <div className="flex flex-col gap-4 px-4 pb-4">
      <div>
        <p className="mb-1 text-xs text-muted">Notes</p>
        <textarea
          defaultValue={plan.notes}
          onBlur={(e) => onUpdateNotes(e.target.value)}
          placeholder="Add notes..."
          rows={2}
          className="w-full resize-none rounded-lg border border-border bg-surface px-3 py-2 text-sm text-foreground placeholder:text-muted focus:outline-none focus:border-foreground/40"
        />
      </div>

      <div>
        <p className="mb-1 text-xs text-muted">Steps</p>
        <StepList
          steps={plan.steps}
          onAdd={onAddStep}
          onToggleInTimeline={onToggleStepInTimeline}
          onUpdateText={onUpdateStepText}
          onDelete={onDeleteStep}
        />
      </div>
    </div>
  );
}
