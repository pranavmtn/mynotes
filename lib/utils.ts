import type { Idea } from "./types";

export const ideaColors = [
  "#7C8DA6",
  "#7D9B83",
  "#B28B67",
  "#927FA8",
  "#A87878",
  "#6F9696",
  "#A29A6F",
  "#9A7F91",
];

export function nextIdeaColor(existingIdeas: Idea[]): string {
  const lastColor = existingIdeas[existingIdeas.length - 1]?.color;
  const lastIndex = ideaColors.indexOf(lastColor ?? "");
  const nextIndex = (lastIndex + 1) % ideaColors.length;
  return ideaColors[nextIndex];
}

export function generateId(): string {
  return crypto.randomUUID();
}

export function nowISO(): string {
  return new Date().toISOString();
}

export function planProgress(plan: { steps: { completed: boolean }[] }): number {
  if (plan.steps.length === 0) return 0;
  const completed = plan.steps.filter((s) => s.completed).length;
  return Math.round((completed / plan.steps.length) * 100);
}

export function ideaProgress(idea: Idea): number {
  const allSteps = idea.plans.flatMap((p) => p.steps);
  if (allSteps.length === 0) return 0;
  const completed = allSteps.filter((s) => s.completed).length;
  return Math.round((completed / allSteps.length) * 100);
}

export function formatDate(iso: string): string {
  const date = new Date(iso);
  return date.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
  });
}

export function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export function colorForName(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = (hash * 31 + name.charCodeAt(i)) >>> 0;
  }
  return ideaColors[hash % ideaColors.length];
}
