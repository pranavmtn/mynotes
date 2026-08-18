export function Footer() {
  return (
    <footer className="border-t border-border py-4">
      <div className="mx-auto flex max-w-md flex-wrap items-center justify-center gap-x-4 gap-y-1 px-6 text-xs text-muted">
        <span>&copy; {new Date().getFullYear()} spootin</span>
        <a href="/privacy" className="transition-colors hover:text-foreground">
          Privacy Policy
        </a>
        <a href="/terms" className="transition-colors hover:text-foreground">
          Terms of Service
        </a>
      </div>
    </footer>
  );
}
