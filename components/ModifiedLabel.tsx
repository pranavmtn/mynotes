import { formatRelativeModified, isRelativeDayFormat } from "@/lib/utils";

export function ModifiedLabel({ updatedAt }: { updatedAt: string }) {
  const value = formatRelativeModified(updatedAt);
  return (
    <span className="text-xs text-muted">
      Modified {isRelativeDayFormat(value) ? <em className="italic">{value}</em> : value}
    </span>
  );
}
