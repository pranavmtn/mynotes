"use client";

import { Suspense, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { GrowthTab } from "@/components/GrowthTab";
import { IdeaTab } from "@/components/IdeaTab";
import { Navigation } from "@/components/Navigation";
import { PlanTab } from "@/components/PlanTab";
import { WelcomeMessage } from "@/components/WelcomeMessage";
import { useIdeas } from "@/hooks/useIdeas";
import type { Tab } from "@/lib/types";

function isTab(value: string | null): value is Tab {
  return value === "idea" || value === "plan" || value === "growth";
}

function AppContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tab: Tab = isTab(searchParams.get("tab")) ? (searchParams.get("tab") as Tab) : "idea";

  const setTab = useCallback(
    (next: Tab) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("tab", next);
      router.push(`/app?${params.toString()}`, { scroll: false });
    },
    [router, searchParams]
  );

  const {
    ideas,
    loaded,
    addIdea,
    updateIdeaTitle,
    deleteIdea,
    addPlan,
    updatePlan,
    deletePlan,
    addStep,
    updateStep,
    deleteStep,
  } = useIdeas();

  return (
    <div className="flex min-h-screen flex-col">
      <Navigation active={tab} onChange={setTab} />
      <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-8 sm:px-8">
        <WelcomeMessage />
        {!loaded ? (
          <p className="pt-16 text-center text-sm text-muted">Loading...</p>
        ) : tab === "idea" ? (
          <IdeaTab
            ideas={ideas}
            onAdd={addIdea}
            onUpdateTitle={updateIdeaTitle}
            onDelete={deleteIdea}
          />
        ) : tab === "plan" ? (
          <PlanTab
            ideas={ideas}
            onAddPlan={addPlan}
            onUpdatePlanTitle={(ideaId, planId, title) =>
              updatePlan(ideaId, planId, { title })
            }
            onUpdatePlanNotes={(ideaId, planId, notes) =>
              updatePlan(ideaId, planId, { notes })
            }
            onDeletePlan={deletePlan}
            onAddStep={addStep}
            onToggleStep={(ideaId, planId, stepId) => {
              const idea = ideas.find((i) => i.id === ideaId);
              const plan = idea?.plans.find((p) => p.id === planId);
              const step = plan?.steps.find((s) => s.id === stepId);
              if (step) updateStep(ideaId, planId, stepId, { completed: !step.completed });
            }}
            onUpdateStepText={(ideaId, planId, stepId, text) =>
              updateStep(ideaId, planId, stepId, { text })
            }
            onDeleteStep={deleteStep}
          />
        ) : (
          <GrowthTab
            ideas={ideas}
            onToggleStep={(ideaId, planId, stepId) => {
              const idea = ideas.find((i) => i.id === ideaId);
              const plan = idea?.plans.find((p) => p.id === planId);
              const step = plan?.steps.find((s) => s.id === stepId);
              if (step) updateStep(ideaId, planId, stepId, { completed: !step.completed });
            }}
          />
        )}
      </main>
    </div>
  );
}

export default function AppPage() {
  return (
    <Suspense fallback={null}>
      <AppContent />
    </Suspense>
  );
}
