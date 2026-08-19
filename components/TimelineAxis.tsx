"use client";

import { formatShortDate } from "@/lib/utils";

export function TimelineAxis({
  range,
  ticks,
  onTickClick,
}: {
  range: { start: string; end: string };
  ticks: { id: string; date: string }[];
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
      {ticks.map((tick) => (
        <div
          key={tick.id}
          className="group absolute left-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{ top: `${percentFor(tick.date)}%` }}
        >
          <button
            type="button"
            onClick={() => onTickClick(tick.id)}
            aria-label={`Go to step dated ${formatShortDate(tick.date)}`}
            className="block h-2.5 w-2.5 rounded-full border-2 border-background bg-muted transition-colors hover:bg-foreground cursor-pointer"
          />
          <span className="pointer-events-none absolute right-full top-1/2 mr-2 -translate-y-1/2 whitespace-nowrap rounded-md border border-border bg-surface px-1.5 py-0.5 text-[10px] text-muted opacity-0 shadow-sm transition-opacity group-hover:opacity-100">
            {formatShortDate(tick.date)}
          </span>
        </div>
      ))}
    </div>
  );
}
