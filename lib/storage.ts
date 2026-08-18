import type { Idea } from "./types";

export interface DataStore {
  load(): Promise<Idea[]>;
  save(ideas: Idea[]): Promise<void>;
}

class RemoteStore implements DataStore {
  async load(): Promise<Idea[]> {
    try {
      const res = await fetch("/api/ideas", { cache: "no-store" });
      if (!res.ok) return [];
      return (await res.json()) as Idea[];
    } catch {
      return [];
    }
  }

  async save(ideas: Idea[]): Promise<void> {
    try {
      await fetch("/api/ideas", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(ideas),
      });
    } catch {
      // ignore network failures; local state remains the source of truth for this session
    }
  }
}

export const dataStore: DataStore = new RemoteStore();
