import { formatRelativeModified } from "@/lib/utils";

export function ModifiedLabel({ updatedAt }: { updatedAt: string }) {
  return (
    <em className="text-xs italic text-muted tabular-nums">
      {formatRelativeModified(updatedAt)}
    </em>
  );
}
