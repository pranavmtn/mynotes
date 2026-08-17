"use client";

import type { Tab } from "@/lib/types";

const TABS: { id: Tab; label: string }[] = [
  { id: "idea", label: "IDEA" },
  { id: "plan", label: "PLAN" },
  { id: "growth", label: "GROWTH" },
];

export function Navigation({
  active,
  onChange,
}: {
  active: Tab;
  onChange: (tab: Tab) => void;
}) {
  return (
    <nav className="border-b border-border">
      <div className="mx-auto flex max-w-3xl items-center gap-8 px-6 sm:px-8">
        {TABS.map((tab) => {
          const isActive = tab.id === active;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onChange(tab.id)}
              aria-current={isActive ? "page" : undefined}
              className={`relative py-4 text-sm font-medium tracking-wide transition-colors cursor-pointer ${
                isActive ? "text-foreground" : "text-muted hover:text-foreground"
              }`}
            >
              {tab.label}
              <span
                className={`absolute inset-x-0 -bottom-px h-px transition-opacity ${
                  isActive ? "bg-foreground opacity-100" : "opacity-0"
                }`}
              />
            </button>
          );
        })}
      </div>
    </nav>
  );
}
