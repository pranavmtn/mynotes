"use client";

import { useEffect, useState } from "react";

export function WelcomeMessage() {
  const [name, setName] = useState<string | null>(null);
  const [fading, setFading] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    fetch("/api/profile")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => data && setName(data.name));
  }, []);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFading(true), 9500);
    const hideTimer = setTimeout(() => setVisible(false), 10000);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  if (!visible || !name) return null;

  return (
    <div
      className={`mb-4 flex w-fit items-center gap-2 rounded-full border border-border bg-surface px-3 py-1.5 text-xs text-muted transition-opacity duration-500 ${
        fading ? "opacity-0" : "opacity-100"
      }`}
    >
      <span className="flex items-center gap-0.5" aria-hidden>
        <span className="h-1 w-1 animate-bounce rounded-full bg-muted [animation-delay:0ms]" />
        <span className="h-1 w-1 animate-bounce rounded-full bg-muted [animation-delay:150ms]" />
        <span className="h-1 w-1 animate-bounce rounded-full bg-muted [animation-delay:300ms]" />
      </span>
      Welcome, {name}
    </div>
  );
}
