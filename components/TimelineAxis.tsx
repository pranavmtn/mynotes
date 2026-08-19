"use client";

import { formatShortDate } from "@/lib/utils";

export function TimelineAxis({
  range,
  ticks,
  onTickClick,
}: {
  range: { start: string; end: string };
  ticks: { id: string; start: string; end: string }[];
  onTickClick: (id: string) => void;
}) {
  const startMs = new Date(`${range.start}T00:00:00`).getTime();
  const endMs = new Date(`${range.end}T00:00:00`).getTime();
  const span = endMs - startMs || 1;

  function percentFor(date: string) {
    const ms = new Date(`${date}T00:00:00`).getTime();
    return Math.min(100, Math.max(0, ((ms - startMs) / span) * 100));
  }

  return (
    <div className="relative hidden w-8 shrink-0 self-stretch sm:block">
      <div className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-border" />
      {ticks.map((tick) => {
        const top = percentFor(tick.start);
        const bottom = Math.max(top, percentFor(tick.end));
        return (
          <div key={tick.id} className="group">
            <button
              type="button"
              onClick={() => onTickClick(tick.id)}
              aria-label={`Go to task from ${formatShortDate(tick.start)} to ${formatShortDate(tick.end)}`}
              className="absolute left-1/2 w-1 -translate-x-1/2 cursor-pointer rounded-full bg-muted transition-colors hover:bg-foreground"
              style={{ top: `${top}%`, height: `${Math.max(bottom - top, 1)}%` }}
            />
            <span
              className="pointer-events-none absolute left-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-background bg-muted"
              style={{ top: `${top}%` }}
            />
            <span
              className="pointer-events-none absolute left-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-background bg-muted"
              style={{ top: `${bottom}%` }}
            />
            <span
              className="pointer-events-none absolute right-full top-0 mr-2 -translate-y-1/2 whitespace-nowrap rounded-md border border-border bg-surface px-1.5 py-0.5 text-[10px] text-muted opacity-0 shadow-sm transition-opacity group-hover:opacity-100"
              style={{ top: `${top}%` }}
            >
              {formatShortDate(tick.start)} → {formatShortDate(tick.end)}
            </span>
          </div>
        );
      })}
    </div>
  );
}
