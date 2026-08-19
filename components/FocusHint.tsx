"use client";

import { useEffect, useState } from "react";

export function FocusHint({
  title,
  className = "",
}: {
  title: string;
  className?: string;
}) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 20000);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <p className={`text-xs text-muted ${className}`}>
      Focused on &ldquo;{title}&rdquo; — click empty space to show all ideas.
    </p>
  );
}
