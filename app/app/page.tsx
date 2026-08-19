"use client";

import { Suspense, useCallback, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { IdeaTab } from "@/components/IdeaTab";
import { Navigation } from "@/components/Navigation";
import { PlanTab } from "@/components/PlanTab";
import { TimelineTab } from "@/components/TimelineTab";
import { WelcomeMessage } from "@/components/WelcomeMessage";
import { useIdeas } from "@/hooks/useIdeas";
import type { Tab } from "@/lib/types";

function isTab(value: string | null): value is Tab {
  return value === "idea" || value === "plan" || value === "timeline";
}

function AppContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tab: Tab = isTab(searchParams.get("tab")) ? (searchParams.get("tab") as Tab) : "idea";
  const [selectedIdeaId, setSelectedIdeaId] = useState<string | null>(null);

  const setTab = useCallback(
    (next: Tab) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("tab", next);
      router.push(`/app?${params.toString()}`, { scroll: false });
    },
    [router, searchParams]
  );

  const toggleSelectIdea = useCallback((ideaId: string) => {
    setSelectedIdeaId((prev) => (prev === ideaId ? null : ideaId));
  }, []);

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

  const focusedIdea = selectedIdeaId
    ? ideas.find((idea) => idea.id === selectedIdeaId)
    : undefined;
  const visibleIdeas = focusedIdea ? [focusedIdea] : ideas;

  return (
    <div className="flex min-h-screen flex-col">
      <Navigation active={tab} onChange={setTab} />
      <main
        className="mx-auto w-full max-w-3xl flex-1 px-6 py-8 sm:px-8"
        onClick={(e) => {
          if (e.target === e.currentTarget && selectedIdeaId) setSelectedIdeaId(null);
        }}
      >
        <WelcomeMessage />
        {!loaded ? (
          <p className="pt-16 text-center text-sm text-muted">Loading...</p>
        ) : tab === "idea" ? (
          <IdeaTab
            ideas={ideas}
            selectedIdeaId={selectedIdeaId}
            onToggleSelect={toggleSelectIdea}
            onAdd={addIdea}
            onUpdateTitle={updateIdeaTitle}
          />
        ) : tab === "plan" ? (
          <PlanTab
            ideas={visibleIdeas}
            focusedIdeaTitle={focusedIdea?.title}
            onDeleteIdea={deleteIdea}
            onAddPlan={addPlan}
            onUpdatePlanTitle={(ideaId, planId, title) =>
              updatePlan(ideaId, planId, { title })
            }
            onUpdatePlanNotes={(ideaId, planId, notes) =>
              updatePlan(ideaId, planId, { notes })
            }
            onDeletePlan={deletePlan}
            onAddStep={addStep}
            onUpdateStepText={(ideaId, planId, stepId, text) =>
              updateStep(ideaId, planId, stepId, { text })
            }
            onDeleteStep={deleteStep}
          />
        ) : (
          <TimelineTab
            ideas={visibleIdeas}
            focusedIdeaTitle={focusedIdea?.title}
            onToggleStep={(ideaId, planId, stepId) => {
              const idea = ideas.find((i) => i.id === ideaId);
              const plan = idea?.plans.find((p) => p.id === planId);
              const step = plan?.steps.find((s) => s.id === stepId);
              if (step) updateStep(ideaId, planId, stepId, { completed: !step.completed });
            }}
            onSetStepDates={(ideaId, planId, stepId, start, end) =>
              updateStep(ideaId, planId, stepId, { startDate: start, endDate: end })
            }
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
