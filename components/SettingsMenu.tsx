"use client";

import { Info, LogOut, Settings, SlidersHorizontal, User } from "lucide-react";
import { useState } from "react";

const MENU_ITEMS = [
  { label: "Profile", icon: User, href: undefined },
  { label: "Settings", icon: Settings, href: undefined },
  { label: "Preferences", icon: SlidersHorizontal, href: undefined },
  { label: "Logout", icon: LogOut, href: "/api/auth/logout" },
  { label: "About", icon: Info, href: undefined },
] as const;

export function SettingsMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        aria-label="Open menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="flex h-7 w-7 items-center justify-center rounded-full text-muted transition-colors hover:text-foreground cursor-pointer"
      >
        <Settings size={16} />
      </button>

      {open && (
        <>
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-10 cursor-default"
          />
          <div className="absolute right-0 z-20 mt-2 w-44 overflow-hidden rounded-xl border border-border bg-surface py-1 shadow-sm">
            {MENU_ITEMS.map(({ label, icon: Icon, href }) =>
              href ? (
                <a
                  key={label}
                  href={href}
                  className="flex w-full items-center gap-2.5 px-3 py-2 text-left text-sm text-foreground transition-colors hover:bg-background cursor-pointer"
                >
                  <Icon size={14} className="text-muted" />
                  {label}
                </a>
              ) : (
                <button
                  key={label}
                  type="button"
                  onClick={() => setOpen(false)}
                  className="flex w-full items-center gap-2.5 px-3 py-2 text-left text-sm text-foreground transition-colors hover:bg-background cursor-pointer"
                >
                  <Icon size={14} className="text-muted" />
                  {label}
                </button>
              )
            )}
          </div>
        </>
      )}
    </div>
  );
}
