import type { Idea } from "./types";

const STORAGE_KEY = "idea-plan-growth:ideas";

export interface DataStore {
  load(): Idea[];
  save(ideas: Idea[]): void;
}

class LocalStorageStore implements DataStore {
  load(): Idea[] {
    if (typeof window === "undefined") return [];
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) return [];
      return parsed as Idea[];
    } catch {
      return [];
    }
  }

  save(ideas: Idea[]): void {
    if (typeof window === "undefined") return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(ideas));
    } catch {
      // ignore write failures (e.g. storage quota, private mode)
    }
  }
}

export const dataStore: DataStore = new LocalStorageStore();
