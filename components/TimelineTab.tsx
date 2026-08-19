"use client";

import { ArrowRight, Calendar, Check } from "lucide-react";
import { useRef, useState } from "react";
import { DateRangePicker } from "@/components/DateRangePicker";
import { FocusHint } from "@/components/FocusHint";
import { ModifiedLabel } from "@/components/ModifiedLabel";
import { ProgressIndicator } from "@/components/ProgressIndicator";
import { TimelineAxis } from "@/components/TimelineAxis";
import type { Idea } from "@/lib/types";
import {
  formatShortDate,
  getIdeaDateRange,
  getPlanDateRange,
  ideaProgress,
  planProgress,
  sortByLastModified,
} from "@/lib/utils";

export function TimelineTab({
  ideas,
  focusedIdeaTitle,
  onToggleStep,
  onSetStepDates,
}: {
  ideas: Idea[];
  focusedIdeaTitle?: string;
  onToggleStep: (ideaId: string, planId: string, stepId: string) => void;
  onSetStepDates: (
    ideaId: string,
    planId: string,
    stepId: string,
    start: string,
    end: string
  ) => void;
}) {
  const [openPickerStepId, setOpenPickerStepId] = useState<string | null>(null);
  const [tooltipStepId, setTooltipStepId] = useState<string | null>(null);
  const [highlightedStepId, setHighlightedStepId] = useState<string | null>(null);
  const stepRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // Timeline only shows plans/ideas that have at least one step explicitly
  // added to the timeline from the Plan tab -- everything else (including
  // progress, date ranges, and axis ticks below) is derived from this
  // filtered view, not the raw plan data.
  const activeIdeas = ideas
    .map((idea) => ({
      ...idea,
      plans: idea.plans
        .map((plan) => ({ ...plan, steps: plan.steps.filter((s) => s.inTimeline) }))
        .filter((plan) => plan.steps.length > 0),
    }))
    .filter((idea) => idea.plans.length > 0);

  function handleToggleClick(ideaId: string, planId: string, step: { id: string; startDate?: string; endDate?: string }) {
    if (!step.startDate || !step.endDate) {
      setTooltipStepId(step.id);
      setTimeout(() => {
        setTooltipStepId((prev) => (prev === step.id ? null : prev));
      }, 2000);
      return;
    }
    onToggleStep(ideaId, planId, step.id);
  }

  function scrollToStep(stepId: string) {
    stepRefs.current[stepId]?.scrollIntoView({ behavior: "smooth", block: "center" });
    setHighlightedStepId(stepId);
    setTimeout(() => {
      setHighlightedStepId((prev) => (prev === stepId ? null : prev));
    }, 1200);
  }

  if (activeIdeas.length === 0) {
    return (
      <div className="py-16 text-center">
        <p className="text-sm text-foreground">No active ideas yet.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-6">
      {focusedIdeaTitle && (
        <FocusHint
          key={focusedIdeaTitle}
          title={focusedIdeaTitle}
          className="w-full max-w-[1100px] sm:w-4/5"
        />
      )}
      {activeIdeas.map((idea) => {
        const progress = ideaProgress(idea);
        const complete = progress === 100;
        const ideaRange = getIdeaDateRange(idea);
        const ticks = idea.plans
          .flatMap((p) => p.steps)
          .filter((s) => s.startDate)
          .map((s) => ({ id: s.id, date: s.startDate as string }));

        const card = (
          <div
            className="w-full flex-1 rounded-2xl border bg-surface px-6 py-6 sm:px-8"
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
                  className={`text-base text-foreground ${
                    complete ? "font-semibold underline decoration-2 underline-offset-2" : "font-medium"
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
              {sortByLastModified(idea.plans).map((plan) => {
                const planRange = getPlanDateRange(plan);
                return (
                  <div
                    key={plan.id}
                    className={`relative pb-4 ${planRange ? "border-l-2 pl-3" : ""}`}
                    style={planRange ? { borderColor: idea.color } : undefined}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
                      <p className="text-sm font-medium text-foreground">{plan.title}</p>
                      <div className="flex flex-wrap items-center gap-3">
                        {planRange && (
                          <span className="text-xs text-muted tabular-nums">
                            {formatShortDate(planRange.start)} → {formatShortDate(planRange.end)}
                          </span>
                        )}
                        <span className="text-xs text-muted tabular-nums">
                          {plan.steps.filter((s) => s.completed).length} / {plan.steps.length}
                        </span>
                      </div>
                    </div>
                    <div className="mt-2 flex flex-col gap-1 pl-1">
                      {plan.steps.map((step) => (
                        <div
                          key={step.id}
                            ref={(el) => {
                              stepRefs.current[step.id] = el;
                            }}
                            className={`flex items-center gap-2 rounded-md py-1 transition-colors duration-500 ${
                              highlightedStepId === step.id ? "bg-background" : ""
                            }`}
                          >
                            <div className="relative shrink-0">
                              <button
                                type="button"
                                onClick={() => handleToggleClick(idea.id, plan.id, step)}
                                aria-pressed={step.completed}
                                className="cursor-pointer"
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
                              </button>
                              {tooltipStepId === step.id && (
                                <span className="pointer-events-none absolute left-1/2 top-full z-10 mt-1.5 -translate-x-1/2 whitespace-nowrap rounded-md border border-border bg-surface px-2 py-1 text-[10px] text-muted shadow-sm">
                                  Select a timeline first
                                </span>
                              )}
                            </div>
                            <span
                              className={`min-w-0 flex-1 truncate text-sm ${
                                step.completed
                                  ? "text-muted line-through"
                                  : "text-foreground"
                              }`}
                            >
                              {step.text}
                            </span>
                            {step.startDate && step.endDate && (
                              <span className="shrink-0 text-[10px] text-muted tabular-nums">
                                {formatShortDate(step.startDate)}–{formatShortDate(step.endDate)}
                              </span>
                            )}
                            <div className="relative shrink-0">
                              <button
                                type="button"
                                aria-label={
                                  step.completed
                                    ? "Uncomplete the step to change its dates"
                                    : "Set step dates"
                                }
                                title={
                                  step.completed
                                    ? "Uncomplete the step to change its dates"
                                    : undefined
                                }
                                disabled={step.completed}
                                onClick={() =>
                                  setOpenPickerStepId(
                                    openPickerStepId === step.id ? null : step.id
                                  )
                                }
                                className={
                                  step.completed
                                    ? "text-muted opacity-40 cursor-not-allowed"
                                    : "text-muted transition-colors hover:text-foreground cursor-pointer"
                                }
                              >
                                <Calendar size={13} />
                              </button>
                              {!step.completed && openPickerStepId === step.id && (
                                <DateRangePicker
                                  startDate={step.startDate}
                                  endDate={step.endDate}
                                  onSelect={(start, end) => {
                                    onSetStepDates(idea.id, plan.id, step.id, start, end);
                                    setOpenPickerStepId(null);
                                  }}
                                  onClose={() => setOpenPickerStepId(null)}
                                />
                              )}
                            </div>
                          </div>
                      ))}
                    </div>
                    <div className="mt-2 pl-1">
                      <ProgressIndicator percent={planProgress(plan)} />
                    </div>
                    <div className="absolute bottom-1 right-1">
                      <ModifiedLabel updatedAt={plan.updatedAt} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );

        return (
          <div key={idea.id} className="flex w-full max-w-[1100px] items-stretch gap-2 sm:w-4/5">
            {ideaRange && (
              <TimelineAxis range={ideaRange} ticks={ticks} onTickClick={scrollToStep} />
            )}
            {card}
          </div>
        );
      })}
    </div>
  );
}
