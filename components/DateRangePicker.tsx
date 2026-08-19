"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

const WEEKDAYS = ["M", "T", "W", "T", "F", "S", "S"];

function toISODate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function daysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

function mondayFirstIndex(year: number, month: number): number {
  const day = new Date(year, month, 1).getDay();
  return (day + 6) % 7;
}

export function DateRangePicker({
  startDate,
  endDate,
  onSelect,
  onClose,
}: {
  startDate?: string;
  endDate?: string;
  onSelect: (start: string, end: string) => void;
  onClose: () => void;
}) {
  const initial = startDate ? new Date(`${startDate}T00:00:00`) : new Date();
  const [viewYear, setViewYear] = useState(initial.getFullYear());
  const [viewMonth, setViewMonth] = useState(initial.getMonth());
  const [rangeStart, setRangeStart] = useState<string | undefined>(startDate);
  const [rangeEnd, setRangeEnd] = useState<string | undefined>(endDate);

  function goToMonth(delta: number) {
    const d = new Date(viewYear, viewMonth + delta, 1);
    setViewYear(d.getFullYear());
    setViewMonth(d.getMonth());
  }

  function handleDayClick(iso: string) {
    if (!rangeStart || (rangeStart && rangeEnd)) {
      setRangeStart(iso);
      setRangeEnd(undefined);
      return;
    }
    if (iso < rangeStart) {
      setRangeStart(iso);
      setRangeEnd(undefined);
      return;
    }
    setRangeEnd(iso);
    onSelect(rangeStart, iso);
  }

  const totalDays = daysInMonth(viewYear, viewMonth);
  const leadingBlanks = mondayFirstIndex(viewYear, viewMonth);
  const monthLabel = new Date(viewYear, viewMonth, 1).toLocaleDateString(undefined, {
    month: "long",
    year: "numeric",
  });

  return (
    <>
      <button
        type="button"
        aria-label="Close calendar"
        onClick={onClose}
        className="fixed inset-0 z-20 cursor-default"
      />
      <div className="absolute right-0 z-30 mt-2 w-64 rounded-xl border border-border bg-surface p-3 shadow-sm">
        <div className="flex items-center justify-between">
          <button
            type="button"
            aria-label="Previous month"
            onClick={() => goToMonth(-1)}
            className="text-muted transition-colors hover:text-foreground cursor-pointer"
          >
            <ChevronLeft size={14} />
          </button>
          <span className="text-xs font-medium text-foreground">{monthLabel}</span>
          <button
            type="button"
            aria-label="Next month"
            onClick={() => goToMonth(1)}
            className="text-muted transition-colors hover:text-foreground cursor-pointer"
          >
            <ChevronRight size={14} />
          </button>
        </div>

        <div className="mt-3 grid grid-cols-7 gap-y-1 text-center text-[10px] text-muted">
          {WEEKDAYS.map((w, i) => (
            <span key={i}>{w}</span>
          ))}
        </div>

        <div className="mt-1 grid grid-cols-7 gap-y-1 text-center text-xs">
          {Array.from({ length: leadingBlanks }).map((_, i) => (
            <span key={`blank-${i}`} />
          ))}
          {Array.from({ length: totalDays }).map((_, i) => {
            const dayNum = i + 1;
            const iso = toISODate(new Date(viewYear, viewMonth, dayNum));
            const isStart = iso === rangeStart;
            const isEnd = iso === rangeEnd;
            const inRange =
              rangeStart && rangeEnd && iso > rangeStart && iso < rangeEnd;
            return (
              <button
                key={iso}
                type="button"
                onClick={() => handleDayClick(iso)}
                className={`mx-auto flex h-7 w-7 items-center justify-center rounded-full transition-colors cursor-pointer ${
                  isStart || isEnd
                    ? "bg-foreground text-background"
                    : inRange
                      ? "bg-border text-foreground"
                      : "text-foreground hover:bg-background"
                }`}
              >
                {dayNum}
              </button>
            );
          })}
        </div>

        <p className="mt-2 text-center text-[10px] text-muted">
          {rangeStart && !rangeEnd
            ? "Pick an end date"
            : "Pick a start date"}
        </p>
      </div>
    </>
  );
}
