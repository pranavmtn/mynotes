"use client";

import { ArrowLeft, ChevronDown, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { KillIdeaModal } from "@/components/KillIdeaModal";
import { PlanDetail } from "@/components/PlanDetail";
import { ProgressIndicator } from "@/components/ProgressIndicator";
import type { Idea } from "@/lib/types";
import { ideaProgress, planProgress } from "@/lib/utils";

export function IdeaDetail({
  idea,
  onBack,
  onDeleteIdea,
  onAddPlan,
  onUpdatePlanTitle,
  onUpdatePlanNotes,
  onDeletePlan,
  onAddStep,
  onToggleStep,
  onUpdateStepText,
  onDeleteStep,
}: {
  idea: Idea;
  onBack: () => void;
  onDeleteIdea: () => void;
  onAddPlan: (title: string) => void;
  onUpdatePlanTitle: (planId: string, title: string) => void;
  onUpdatePlanNotes: (planId: string, notes: string) => void;
  onDeletePlan: (planId: string) => void;
  onAddStep: (planId: string, text: string) => void;
  onToggleStep: (planId: string, stepId: string) => void;
  onUpdateStepText: (planId: string, stepId: string, text: string) => void;
  onDeleteStep: (planId: string, stepId: string) => void;
}) {
  const [expandedPlanId, setExpandedPlanId] = useState<string | null>(null);
  const [addingPlan, setAddingPlan] = useState(false);
  const [newPlanTitle, setNewPlanTitle] = useState("");
  const [confirmingDeletePlanId, setConfirmingDeletePlanId] = useState<string | null>(null);
  const [editingPlanTitleId, setEditingPlanTitleId] = useState<string | null>(null);
  const [planTitleDraft, setPlanTitleDraft] = useState("");
  const [killModalOpen, setKillModalOpen] = useState(false);

  function commitPlanTitle(planId: string, originalTitle: string) {
    setEditingPlanTitleId(null);
    const trimmed = planTitleDraft.trim();
    if (trimmed && trimmed !== originalTitle) {
      onUpdatePlanTitle(planId, trimmed);
    }
  }

  function handleAddPlan() {
    const trimmed = newPlanTitle.trim();
    if (!trimmed) return;
    onAddPlan(trimmed);
    setNewPlanTitle("");
    setAddingPlan(false);
  }

  return (
    <div className="flex flex-col gap-6">
      <button
        type="button"
        onClick={onBack}
        className="flex w-fit items-center gap-2 text-sm text-muted transition-colors hover:text-foreground cursor-pointer"
      >
        <ArrowLeft size={14} />
        Back
      </button>

      <div className="flex items-center gap-3">
        <span
          className="h-2.5 w-2.5 shrink-0 rounded-full"
          style={{ backgroundColor: idea.color }}
          aria-hidden
        />
        <h1 className="text-lg font-medium text-foreground">{idea.title}</h1>
      </div>
      <ProgressIndicator percent={ideaProgress(idea)} color={idea.color} />

      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <p className="text-xs font-medium tracking-wide text-muted">PLANS</p>
        </div>

        {idea.plans.length === 0 && !addingPlan && (
          <p className="text-sm text-muted">No plans yet.</p>
        )}

        <div className="flex flex-col gap-2">
          {idea.plans.map((plan) => {
            const expanded = expandedPlanId === plan.id;
            const progress = planProgress(plan);
            return (
              <div
                key={plan.id}
                className="rounded-xl border border-border bg-surface transition-colors"
              >
                <div className="flex items-center justify-between gap-3 px-4 py-3">
                  <div className="flex min-w-0 flex-1 items-center gap-2">
                    <button
                      type="button"
                      aria-label={expanded ? "Collapse plan" : "Expand plan"}
                      onClick={() => setExpandedPlanId(expanded ? null : plan.id)}
                      className="shrink-0 text-muted cursor-pointer"
                    >
                      <ChevronDown
                        size={14}
                        className={`transition-transform ${expanded ? "rotate-180" : ""}`}
                      />
                    </button>
                    {editingPlanTitleId === plan.id ? (
                      <input
                        autoFocus
                        value={planTitleDraft}
                        onChange={(e) => setPlanTitleDraft(e.target.value)}
                        onBlur={() => commitPlanTitle(plan.id, plan.title)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            commitPlanTitle(plan.id, plan.title);
                          }
                          if (e.key === "Escape") {
                            setEditingPlanTitleId(null);
                          }
                        }}
                        className="w-full min-w-0 bg-transparent text-sm text-foreground focus:outline-none"
                      />
                    ) : (
                      <button
                        type="button"
                        onClick={() => {
                          setEditingPlanTitleId(plan.id);
                          setPlanTitleDraft(plan.title);
                        }}
                        className="min-w-0 flex-1 truncate text-left text-sm text-foreground cursor-text"
                      >
                        {plan.title}
                      </button>
                    )}
                  </div>
                  <div className="flex shrink-0 items-center gap-3">
                    <span className="text-xs text-muted tabular-nums">
                      {plan.steps.filter((s) => s.completed).length} / {plan.steps.length}
                    </span>
                    {confirmingDeletePlanId === plan.id ? (
                      <div className="flex items-center gap-2 text-xs">
                        <button
                          type="button"
                          onClick={() => onDeletePlan(plan.id)}
                          className="text-foreground underline cursor-pointer"
                        >
                          Delete
                        </button>
                        <button
                          type="button"
                          onClick={() => setConfirmingDeletePlanId(null)}
                          className="text-muted cursor-pointer"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        aria-label="Delete plan"
                        onClick={() => setConfirmingDeletePlanId(plan.id)}
                        className="text-muted transition-colors hover:text-foreground cursor-pointer"
                      >
                        <Trash2 size={13} />
                      </button>
                    )}
                  </div>
                </div>
                {plan.steps.length > 0 && (
                  <div className="px-4 pb-2">
                    <ProgressIndicator percent={progress} />
                  </div>
                )}
                {expanded && (
                  <PlanDetail
                    plan={plan}
                    onUpdateNotes={(notes) => onUpdatePlanNotes(plan.id, notes)}
                    onAddStep={(text) => onAddStep(plan.id, text)}
                    onToggleStep={(stepId) => onToggleStep(plan.id, stepId)}
                    onUpdateStepText={(stepId, text) =>
                      onUpdateStepText(plan.id, stepId, text)
                    }
                    onDeleteStep={(stepId) => onDeleteStep(plan.id, stepId)}
                  />
                )}
              </div>
            );
          })}
        </div>

        {addingPlan ? (
          <div className="flex items-center gap-3 rounded-xl border border-border bg-surface px-4 py-3">
            <Plus size={14} className="shrink-0 text-muted" aria-hidden />
            <input
              autoFocus
              value={newPlanTitle}
              onChange={(e) => setNewPlanTitle(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleAddPlan();
                }
                if (e.key === "Escape") {
                  setNewPlanTitle("");
                  setAddingPlan(false);
                }
              }}
              onBlur={() => {
                if (!newPlanTitle.trim()) setAddingPlan(false);
              }}
              placeholder="New plan title..."
              aria-label="New plan title"
              className="w-full bg-transparent text-sm text-foreground placeholder:text-muted focus:outline-none"
            />
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setAddingPlan(true)}
            className="flex w-fit items-center gap-2 rounded-lg border border-border px-3 py-1.5 text-xs text-muted transition-colors hover:text-foreground hover:border-foreground/40 cursor-pointer"
          >
            <Plus size={12} />
            Add Plan
          </button>
        )}
      </div>

      <div className="mt-4 border-t border-border pt-4">
        <button
          type="button"
          onClick={() => setKillModalOpen(true)}
          className="text-xs text-muted transition-colors hover:text-red-600 cursor-pointer"
        >
          Kill this idea
        </button>
      </div>

      {killModalOpen && (
        <KillIdeaModal
          ideaTitle={idea.title}
          onCancel={() => setKillModalOpen(false)}
          onConfirm={() => {
            setKillModalOpen(false);
            onDeleteIdea();
          }}
        />
      )}
    </div>
  );
}
