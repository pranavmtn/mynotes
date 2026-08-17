export function ProgressIndicator({
  percent,
  color,
}: {
  percent: number;
  color?: string;
}) {
  return (
    <div className="flex items-center gap-2">
      <div className="h-1 w-24 overflow-hidden rounded-full bg-border/60">
        <div
          className="h-full rounded-full transition-all"
          style={{
            width: `${percent}%`,
            backgroundColor: color ?? "#3F3F3F",
          }}
        />
      </div>
      <span className="text-xs text-muted tabular-nums">{percent}%</span>
    </div>
  );
}
