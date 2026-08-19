import type { Idea, Plan } from "./types";

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

export function formatRelativeModified(iso: string): string {
  const date = new Date(iso);
  const now = new Date();
  const diffMinutes = (now.getTime() - date.getTime()) / 60000;
  if (diffMinutes < 1) return "just now";

  const startOfDay = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate());
  const dayDiff = Math.round(
    (startOfDay(now).getTime() - startOfDay(date).getTime()) / 86400000
  );
  if (dayDiff === 0) return "today";
  if (dayDiff === 1) return "yesterday";
  return formatDate(iso);
}

export function sortByLastModified<T extends { updatedAt: string }>(items: T[]): T[] {
  return [...items].sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  );
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

export function formatShortDate(iso: string): string {
  const date = new Date(`${iso}T00:00:00`);
  return date.toLocaleDateString(undefined, { month: "short", day: "numeric" });
}

export function getPlanDateRange(plan: Plan): { start: string; end: string } | null {
  const dated = plan.steps.filter(
    (s): s is typeof s & { startDate: string; endDate: string } =>
      Boolean(s.startDate) && Boolean(s.endDate)
  );
  if (dated.length === 0) return null;
  const start = dated.map((s) => s.startDate).reduce((a, b) => (a < b ? a : b));
  const end = dated.map((s) => s.endDate).reduce((a, b) => (a > b ? a : b));
  return { start, end };
}
