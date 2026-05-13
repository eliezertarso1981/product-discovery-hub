import { cn } from "@/lib/utils";

interface AvatarProps {
  initials: string;
  color?: string;
  size?: number;
  className?: string;
}

export function Avatar({ initials, color = "#13c8b5", size = 32, className }: AvatarProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center justify-center rounded-full font-semibold text-white",
        className,
      )}
      style={{
        width: size,
        height: size,
        backgroundColor: color,
        fontSize: size * 0.4,
      }}
    >
      {initials}
    </div>
  );
}
