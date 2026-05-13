interface Props {
  level: 1 | 2 | 3 | 4 | 5;
}

const colorByLevel: Record<number, string> = {
  1: "#cbd5e1",
  2: "#94a3b8",
  3: "#f59e0b",
  4: "#f97316",
  5: "#ef4444",
};

export function SeverityDots({ level }: Props) {
  const color = colorByLevel[level];
  return (
    <div className="flex items-center gap-1" aria-label={`Severidade ${level} de 5`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <span
          key={i}
          className="h-1.5 w-1.5 rounded-full"
          style={{ backgroundColor: i <= level ? color : "#e5e7eb" }}
        />
      ))}
    </div>
  );
}
