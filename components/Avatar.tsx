import { colorForName, getInitials } from "@/lib/utils";

export function Avatar({ name, size = 28 }: { name: string; size?: number }) {
  return (
    <span
      className="flex shrink-0 items-center justify-center rounded-full font-medium text-white"
      style={{
        width: size,
        height: size,
        backgroundColor: colorForName(name),
        fontSize: size * 0.4,
      }}
      aria-hidden
    >
      {getInitials(name)}
    </span>
  );
}
