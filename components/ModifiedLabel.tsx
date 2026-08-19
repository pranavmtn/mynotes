import { formatRelativeModified } from "@/lib/utils";

export function ModifiedLabel({ updatedAt }: { updatedAt: string }) {
  return (
    <em className="text-[9px] italic text-muted">{formatRelativeModified(updatedAt)}</em>
  );
}
