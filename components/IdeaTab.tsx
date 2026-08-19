"use client";

import { IdeaCard } from "@/components/IdeaCard";
import { IdeaInput } from "@/components/IdeaInput";
import type { Idea } from "@/lib/types";

export function IdeaTab({
  ideas,
  selectedIdeaId,
  onToggleSelect,
  onAdd,
  onUpdateTitle,
}: {
  ideas: Idea[];
  selectedIdeaId: string | null;
  onToggleSelect: (ideaId: string) => void;
  onAdd: (title: string) => void;
  onUpdateTitle: (ideaId: string, title: string) => void;
}) {
  return (
    <div className="flex flex-col gap-6">
      <IdeaInput onAdd={onAdd} />
      {ideas.length === 0 ? (
        <div className="py-16 text-center">
          <p className="text-sm text-foreground">No ideas yet.</p>
          <p className="mt-1 text-sm text-muted">
            Capture your first idea above.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {ideas.map((idea) => (
            <IdeaCard
              key={idea.id}
              idea={idea}
              selected={idea.id === selectedIdeaId}
              onToggleSelect={() => onToggleSelect(idea.id)}
              onUpdateTitle={(title) => onUpdateTitle(idea.id, title)}
            />
          ))}
        </div>
      )}

      <div className="mt-16 flex flex-col items-center gap-3 pb-8 text-center pointer-events-none select-none">
        <p className="text-3xl font-semibold tracking-widest text-[#1a1a1a]/10">
          An idea is a spark.
        </p>
        <p className="font-[family-name:var(--font-playfair)] text-3xl italic tracking-widest text-[#1a1a1a]/10">
          Ignite it. Fuel it. Fire it.
        </p>
      </div>
    </div>
  );
}
