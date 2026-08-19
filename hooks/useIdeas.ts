"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { dataStore } from "@/lib/storage";
import type { Idea, Plan, Step } from "@/lib/types";
import { generateId, nextIdeaColor, nowISO } from "@/lib/utils";

export function useIdeas() {
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [loaded, setLoaded] = useState(false);
  const skipNextSave = useRef(true);
  const saveQueue = useRef(Promise.resolve());

  useEffect(() => {
    let cancelled = false;
    dataStore.load().then((loadedIdeas) => {
      if (cancelled) return;
      setIdeas(loadedIdeas);
      setLoaded(true);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!loaded) return;
    if (skipNextSave.current) {
      skipNextSave.current = false;
      return;
    }
    // chain saves so concurrent edits reach the server in the order they happened,
    // instead of racing as independent requests that could resolve out of order
    saveQueue.current = saveQueue.current.then(() => dataStore.save(ideas));
  }, [ideas, loaded]);

  const addIdea = useCallback((title: string) => {
    const trimmed = title.trim();
    if (!trimmed) return;
    setIdeas((prev) => {
      const idea: Idea = {
        id: generateId(),
        title: trimmed,
        createdAt: nowISO(),
        updatedAt: nowISO(),
        color: nextIdeaColor(prev),
        plans: [],
      };
      return [...prev, idea];
    });
  }, []);

  const updateIdeaTitle = useCallback((ideaId: string, title: string) => {
    const trimmed = title.trim();
    if (!trimmed) return;
    setIdeas((prev) =>
      prev.map((idea) =>
        idea.id === ideaId
          ? { ...idea, title: trimmed, updatedAt: nowISO() }
          : idea
      )
    );
  }, []);

  const updateIdeaDescription = useCallback((ideaId: string, description: string) => {
    const trimmed = description.trim();
    setIdeas((prev) =>
      prev.map((idea) =>
        idea.id === ideaId
          ? { ...idea, description: trimmed, updatedAt: nowISO() }
          : idea
      )
    );
  }, []);

  const deleteIdea = useCallback((ideaId: string) => {
    setIdeas((prev) => prev.filter((idea) => idea.id !== ideaId));
  }, []);

  const addPlan = useCallback((ideaId: string, title: string) => {
    const trimmed = title.trim();
    if (!trimmed) return;
    setIdeas((prev) =>
      prev.map((idea) => {
        if (idea.id !== ideaId) return idea;
        const plan: Plan = {
          id: generateId(),
          title: trimmed,
          notes: "",
          steps: [],
          createdAt: nowISO(),
          updatedAt: nowISO(),
        };
        return { ...idea, plans: [...idea.plans, plan], updatedAt: nowISO() };
      })
    );
  }, []);

  const updatePlan = useCallback(
    (ideaId: string, planId: string, updates: Partial<Pick<Plan, "title" | "notes">>) => {
      setIdeas((prev) =>
        prev.map((idea) => {
          if (idea.id !== ideaId) return idea;
          return {
            ...idea,
            updatedAt: nowISO(),
            plans: idea.plans.map((plan) =>
              plan.id === planId
                ? { ...plan, ...updates, updatedAt: nowISO() }
                : plan
            ),
          };
        })
      );
    },
    []
  );

  const deletePlan = useCallback((ideaId: string, planId: string) => {
    setIdeas((prev) =>
      prev.map((idea) => {
        if (idea.id !== ideaId) return idea;
        return {
          ...idea,
          updatedAt: nowISO(),
          plans: idea.plans.filter((plan) => plan.id !== planId),
        };
      })
    );
  }, []);

  const addStep = useCallback((ideaId: string, planId: string, text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    setIdeas((prev) =>
      prev.map((idea) => {
        if (idea.id !== ideaId) return idea;
        return {
          ...idea,
          updatedAt: nowISO(),
          plans: idea.plans.map((plan) => {
            if (plan.id !== planId) return plan;
            const step: Step = { id: generateId(), text: trimmed, completed: false };
            return { ...plan, steps: [...plan.steps, step], updatedAt: nowISO() };
          }),
        };
      })
    );
  }, []);

  const updateStep = useCallback(
    (
      ideaId: string,
      planId: string,
      stepId: string,
      updates: Partial<
        Pick<Step, "text" | "completed" | "startDate" | "endDate" | "inTimeline">
      >
    ) => {
      setIdeas((prev) =>
        prev.map((idea) => {
          if (idea.id !== ideaId) return idea;
          return {
            ...idea,
            updatedAt: nowISO(),
            plans: idea.plans.map((plan) => {
              if (plan.id !== planId) return plan;
              return {
                ...plan,
                updatedAt: nowISO(),
                steps: plan.steps.map((step) =>
                  step.id === stepId ? { ...step, ...updates } : step
                ),
              };
            }),
          };
        })
      );
    },
    []
  );

  const deleteStep = useCallback((ideaId: string, planId: string, stepId: string) => {
    setIdeas((prev) =>
      prev.map((idea) => {
        if (idea.id !== ideaId) return idea;
        return {
          ...idea,
          updatedAt: nowISO(),
          plans: idea.plans.map((plan) => {
            if (plan.id !== planId) return plan;
            return {
              ...plan,
              updatedAt: nowISO(),
              steps: plan.steps.filter((step) => step.id !== stepId),
            };
          }),
        };
      })
    );
  }, []);

  return {
    ideas,
    loaded,
    addIdea,
    updateIdeaTitle,
    updateIdeaDescription,
    deleteIdea,
    addPlan,
    updatePlan,
    deletePlan,
    addStep,
    updateStep,
    deleteStep,
  };
}
