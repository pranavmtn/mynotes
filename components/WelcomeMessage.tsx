"use client";

import { useEffect, useState } from "react";

const QUOTES = [
  "Great ideas start as small sparks.",
  "Every business began with a single idea.",
  "Your next big idea could change everything.",
  "Turn thoughts into action, one step at a time.",
  "Ideas are worthless without execution.",
  "The best time to start was yesterday. Next best: now.",
  "Small steps every day lead to big outcomes.",
  "Don't wait for the perfect moment — create it.",
  "Every plan you write brings your idea closer to life.",
  "Progress beats perfection.",
  "The world needs what only you can build.",
  "One idea, executed well, can change your life.",
  "Momentum starts with a single completed step.",
  "Consistency turns ideas into reality.",
  "You don't need permission to start building.",
  "Businesses are just ideas that didn't give up.",
  "Today's plan is tomorrow's progress.",
  "Focus on progress, not perfection.",
  "Great execution beats a great idea alone.",
  "Keep going — you're closer than you think.",
];

function pickNext(prevIndex: number): number {
  if (QUOTES.length <= 1) return 0;
  let next = Math.floor(Math.random() * QUOTES.length);
  while (next === prevIndex) {
    next = Math.floor(Math.random() * QUOTES.length);
  }
  return next;
}

export function WelcomeMessage() {
  const [name, setName] = useState<string | null>(null);
  const [quoteIndex, setQuoteIndex] = useState<number | null>(null);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    fetch("/api/profile")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => data && setName(data.name));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        setQuoteIndex((prev) => pickNext(prev ?? -1));
        setFading(false);
      }, 200);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  if (!name) return null;

  const text = quoteIndex === null ? `Welcome, ${name}` : QUOTES[quoteIndex];

  return (
    <div className="mb-4 flex w-fit items-center gap-2 rounded-full border border-border bg-surface px-3 py-1.5 text-xs text-muted">
      <span className="flex shrink-0 items-center gap-0.5" aria-hidden>
        <span className="h-1 w-1 animate-bounce rounded-full bg-muted [animation-delay:0ms]" />
        <span className="h-1 w-1 animate-bounce rounded-full bg-muted [animation-delay:150ms]" />
        <span className="h-1 w-1 animate-bounce rounded-full bg-muted [animation-delay:300ms]" />
      </span>
      <span
        className={`transition-opacity duration-200 ${
          fading ? "opacity-0" : "opacity-100"
        }`}
      >
        {text}
      </span>
    </div>
  );
}
