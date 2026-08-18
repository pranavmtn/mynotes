"use client";

import { IdeaCard } from "@/components/IdeaCard";
import { IdeaInput } from "@/components/IdeaInput";
import type { Idea } from "@/lib/types";

export function IdeaTab({
  ideas,
  onAdd,
  onUpdateTitle,
}: {
  ideas: Idea[];
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
              onUpdateTitle={(title) => onUpdateTitle(idea.id, title)}
            />
          ))}
        </div>
      )}

      <div className="mt-16 flex flex-col items-center gap-2 pb-8 text-center">
        <p className="text-2xl font-semibold text-[#1a1a1a]">
          An idea is a spark.
        </p>
        <p className="font-[family-name:var(--font-playfair)] text-2xl italic text-[#1a1a1a]">
          Ignite it. Fuel it. Fire it.
        </p>
      </div>
    </div>
  );
}
