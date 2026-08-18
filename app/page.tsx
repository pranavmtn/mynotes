import { Lightbulb, ListChecks, TrendingUp } from "lucide-react";
import { Footer } from "@/components/Footer";

const FEATURES = [
  {
    icon: Lightbulb,
    title: "Capture ideas fast",
    body: "Jot down a thought the moment it hits. No forms, no friction — just type and press Enter.",
  },
  {
    icon: ListChecks,
    title: "Turn them into plans",
    body: "Break an idea into concrete plans and steps, so it's clear what to actually do next.",
  },
  {
    icon: TrendingUp,
    title: "Track your progress",
    body: "Watch completion percentages climb as you execute, from a single idea to a finished project.",
  },
];

export default async function Home(props: PageProps<"/">) {
  const searchParams = await props.searchParams;
  const error = typeof searchParams.error === "string" ? searchParams.error : null;

  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex flex-1 flex-col items-center justify-center px-6 py-16 sm:px-8">
        <div className="flex w-full max-w-md flex-col items-center gap-10 text-center">
          <div className="flex flex-col items-center gap-3">
            <h1 className="text-2xl font-medium text-foreground">spootin</h1>
            <p className="text-sm text-muted">
              A minimal, distraction-free way to take an idea from a passing
              thought to a finished plan.
            </p>
          </div>

          <div className="flex w-full flex-col items-center gap-3">
            <a
              href="/api/auth/google"
              className="flex w-full items-center justify-center gap-3 rounded-xl border border-border bg-surface px-4 py-3 text-sm font-medium text-foreground transition-colors hover:border-foreground/40"
            >
              <GoogleIcon />
              Continue with Google
            </a>
            {error && (
              <p className="text-xs text-muted">
                Sign-in didn&apos;t go through. Please try again.
              </p>
            )}
          </div>

          <div className="flex w-full flex-col gap-4">
            {FEATURES.map(({ icon: Icon, title, body }) => (
              <div
                key={title}
                className="flex items-start gap-3 rounded-xl border border-border bg-surface p-4 text-left"
              >
                <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-border text-muted">
                  <Icon size={14} />
                </span>
                <div>
                  <p className="text-sm font-medium text-foreground">{title}</p>
                  <p className="mt-0.5 text-sm text-muted">{body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 48 48" aria-hidden>
      <path
        fill="#FFC107"
        d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.6-6 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.5 6 29.5 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.3-.4-3.5z"
      />
      <path
        fill="#FF3D00"
        d="M6.3 14.7l6.6 4.8C14.6 15.9 18.9 13 24 13c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.5 6 29.5 4 24 4c-7.5 0-14 4.2-17.7 10.7z"
      />
      <path
        fill="#4CAF50"
        d="M24 44c5.4 0 10.3-1.9 14-5.3l-6.5-5.4C29.5 35 26.9 36 24 36c-5.3 0-9.7-3.4-11.3-8l-6.6 5.1C9.9 39.6 16.4 44 24 44z"
      />
      <path
        fill="#1976D2"
        d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.1-4 5.4l6.5 5.4C40.9 36.4 44 30.9 44 24c0-1.3-.1-2.3-.4-3.5z"
      />
    </svg>
  );
}
