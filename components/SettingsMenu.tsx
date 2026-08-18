"use client";

import { Info, LogOut, Settings, SlidersHorizontal, User } from "lucide-react";
import { useEffect, useState } from "react";
import { Avatar } from "@/components/Avatar";
import { ProfilePanel } from "@/components/ProfilePanel";

type Profile = { name: string; email: string };

const STATIC_ITEMS = [
  { label: "Settings", icon: Settings, href: undefined },
  { label: "Preferences", icon: SlidersHorizontal, href: undefined },
  { label: "Logout", icon: LogOut, href: "/api/auth/logout" },
  { label: "About", icon: Info, href: undefined },
] as const;

export function SettingsMenu() {
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    fetch("/api/profile")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => data && setProfile(data));
  }, []);

  return (
    <div className="relative">
      <button
        type="button"
        aria-label="Open menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="flex items-center justify-center rounded-full transition-opacity hover:opacity-80 cursor-pointer"
      >
        <Avatar name={profile?.name ?? "?"} size={28} />
      </button>

      {open && (
        <>
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-10 cursor-default"
          />
          <div className="absolute right-0 z-20 mt-2 w-56 overflow-hidden rounded-xl border border-border bg-surface py-1 shadow-sm">
            {profile && (
              <div className="flex items-center gap-2.5 border-b border-border px-3 py-2.5">
                <Avatar name={profile.name} size={32} />
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-foreground">
                    {profile.name}
                  </p>
                  <p className="truncate text-xs text-muted">{profile.email}</p>
                </div>
              </div>
            )}

            <button
              type="button"
              onClick={() => {
                setOpen(false);
                setProfileOpen(true);
              }}
              className="flex w-full items-center gap-2.5 px-3 py-2 text-left text-sm text-foreground transition-colors hover:bg-background cursor-pointer"
            >
              <User size={14} className="text-muted" />
              Profile
            </button>

            {STATIC_ITEMS.map(({ label, icon: Icon, href }) =>
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

      {profileOpen && profile && (
        <ProfilePanel
          profile={profile}
          onClose={() => setProfileOpen(false)}
          onSave={(name) => setProfile((p) => (p ? { ...p, name } : p))}
        />
      )}
    </div>
  );
}
