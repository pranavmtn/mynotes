"use client";

import { useState } from "react";
import { FocusHint } from "@/components/FocusHint";
import { IdeaDetail } from "@/components/IdeaDetail";
import { PlanCard } from "@/components/PlanCard";
import type { Idea } from "@/lib/types";

export function PlanTab({
  ideas,
  focusedIdeaTitle,
  onDeleteIdea,
  onAddPlan,
  onUpdatePlanTitle,
  onUpdatePlanNotes,
  onDeletePlan,
  onAddStep,
  onUpdateStepText,
  onDeleteStep,
}: {
  ideas: Idea[];
  focusedIdeaTitle?: string;
  onDeleteIdea: (ideaId: string) => void;
  onAddPlan: (ideaId: string, title: string) => void;
  onUpdatePlanTitle: (ideaId: string, planId: string, title: string) => void;
  onUpdatePlanNotes: (ideaId: string, planId: string, notes: string) => void;
  onDeletePlan: (ideaId: string, planId: string) => void;
  onAddStep: (ideaId: string, planId: string, text: string) => void;
  onUpdateStepText: (ideaId: string, planId: string, stepId: string, text: string) => void;
  onDeleteStep: (ideaId: string, planId: string, stepId: string) => void;
}) {
  const [openIdeaId, setOpenIdeaId] = useState<string | null>(null);
  const openIdea = ideas.find((idea) => idea.id === openIdeaId) ?? null;

  if (openIdea) {
    return (
      <IdeaDetail
        idea={openIdea}
        onBack={() => setOpenIdeaId(null)}
        onDeleteIdea={() => {
          onDeleteIdea(openIdea.id);
          setOpenIdeaId(null);
        }}
        onAddPlan={(title) => onAddPlan(openIdea.id, title)}
        onUpdatePlanTitle={(planId, title) => onUpdatePlanTitle(openIdea.id, planId, title)}
        onUpdatePlanNotes={(planId, notes) => onUpdatePlanNotes(openIdea.id, planId, notes)}
        onDeletePlan={(planId) => onDeletePlan(openIdea.id, planId)}
        onAddStep={(planId, text) => onAddStep(openIdea.id, planId, text)}
        onUpdateStepText={(planId, stepId, text) =>
          onUpdateStepText(openIdea.id, planId, stepId, text)
        }
        onDeleteStep={(planId, stepId) => onDeleteStep(openIdea.id, planId, stepId)}
      />
    );
  }

  return (
    <div className="flex flex-col gap-2">
      {focusedIdeaTitle && <FocusHint key={focusedIdeaTitle} title={focusedIdeaTitle} />}
      {ideas.length === 0 ? (
        <div className="py-16 text-center">
          <p className="text-sm text-foreground">No ideas to plan yet.</p>
          <p className="mt-1 text-sm text-muted">Add an idea to get started.</p>
        </div>
      ) : (
        ideas.map((idea) => (
          <PlanCard key={idea.id} idea={idea} onOpen={() => setOpenIdeaId(idea.id)} />
        ))
      )}
    </div>
  );
}
