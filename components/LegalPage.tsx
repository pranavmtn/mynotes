import Link from "next/link";
import type { ReactNode } from "react";

export function LegalPage({
  title,
  effectiveDate,
  children,
}: {
  title: string;
  effectiveDate: string;
  children: ReactNode;
}) {
  return (
    <div className="mx-auto w-full max-w-2xl px-6 py-16 sm:px-8">
      <Link
        href="/"
        className="text-sm text-muted transition-colors hover:text-foreground"
      >
        ← Back
      </Link>

      <h1 className="mt-6 text-2xl font-medium text-foreground">{title}</h1>
      <p className="mt-1 text-sm text-muted">Effective {effectiveDate}</p>

      <div className="mt-8 flex flex-col gap-6 text-sm leading-relaxed text-foreground [&_h2]:mt-2 [&_h2]:text-base [&_h2]:font-medium [&_h2]:text-foreground [&_p]:text-muted [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:text-muted [&_li]:mt-1">
        {children}
      </div>
    </div>
  );
}
