"use client";

import { ArrowRight, Check } from "lucide-react";
import { ProgressIndicator } from "@/components/ProgressIndicator";
import type { Idea } from "@/lib/types";
import { ideaProgress, planProgress } from "@/lib/utils";

export function GrowthTab({
  ideas,
  onToggleStep,
}: {
  ideas: Idea[];
  onToggleStep: (ideaId: string, planId: string, stepId: string) => void;
}) {
  const activeIdeas = ideas.filter((idea) => idea.plans.length > 0);

  if (activeIdeas.length === 0) {
    return (
      <div className="py-16 text-center">
        <p className="text-sm text-foreground">No active ideas yet.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-6">
      {activeIdeas.map((idea) => {
        const progress = ideaProgress(idea);
        const complete = progress === 100;
        return (
        <div
          key={idea.id}
          className="w-full max-w-[1100px] rounded-2xl border bg-surface px-6 py-6 sm:w-4/5 sm:px-8"
          style={{ borderColor: idea.color + "80" }}
        >
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span
                className="h-2.5 w-2.5 shrink-0 rounded-full"
                style={{ backgroundColor: idea.color }}
                aria-hidden
              />
              <h2
                className={`text-base font-medium ${
                  complete ? "text-muted line-through" : "text-foreground"
                }`}
              >
                {idea.title}
              </h2>
            </div>
            <ProgressIndicator percent={progress} color={idea.color} />
          </div>

          {complete && (
            <div className="mt-3 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border bg-background px-4 py-2.5">
              <span className="text-xs font-medium text-foreground">Accomplished</span>
              <button
                type="button"
                title="Coming soon"
                className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:border-foreground/40 cursor-pointer"
              >
                Let&apos;s Execute
                <ArrowRight size={12} />
              </button>
            </div>
          )}

          <div className="mt-5 flex flex-col gap-5">
            {idea.plans.map((plan) => (
              <div key={plan.id}>
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-medium text-foreground">{plan.title}</p>
                  {plan.steps.length > 0 && (
                    <span className="text-xs text-muted tabular-nums">
                      {plan.steps.filter((s) => s.completed).length} / {plan.steps.length}
                    </span>
                  )}
                </div>
                <div className="mt-2 flex flex-col gap-1 pl-1">
                  {plan.steps.length === 0 ? (
                    <p className="text-xs text-muted">No steps yet.</p>
                  ) : (
                    plan.steps.map((step) => (
                      <button
                        key={step.id}
                        type="button"
                        onClick={() => onToggleStep(idea.id, plan.id, step.id)}
                        aria-pressed={step.completed}
                        className="flex items-center gap-3 py-1 text-left cursor-pointer"
                      >
                        <span
                          className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border transition-colors ${
                            step.completed
                              ? "border-foreground/40 bg-foreground/10 text-foreground"
                              : "border-border text-transparent"
                          }`}
                        >
                          <Check size={10} strokeWidth={3} />
                        </span>
                        <span
                          className={`text-sm ${
                            step.completed
                              ? "text-muted line-through"
                              : "text-foreground"
                          }`}
                        >
                          {step.text}
                        </span>
                      </button>
                    ))
                  )}
                </div>
                {plan.steps.length > 0 && (
                  <div className="mt-2 pl-1">
                    <ProgressIndicator percent={planProgress(plan)} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        );
      })}
    </div>
  );
}
