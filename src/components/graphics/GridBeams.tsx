import { cn } from "@/lib/utils";

const DEFAULT_BEAMS = [
  { x: "18%", dur: 8, delay: 0 },
  { x: "46%", dur: 11.5, delay: 3 },
  { x: "78%", dur: 9.5, delay: 1.4 },
];

/** Faint engineering grid with pulses of light traveling down its columns. */
export function GridBeams({
  className,
  beams = DEFAULT_BEAMS,
}: {
  className?: string;
  beams?: { x: string; dur: number; delay: number }[];
}) {
  return (
    <div
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
      aria-hidden
    >
      <div
        className="bg-grid absolute inset-0"
        style={{
          maskImage:
            "radial-gradient(ellipse 90% 80% at 50% 40%, black 25%, transparent 78%)",
        }}
      />
      {beams.map((b) => (
        <span
          key={b.x}
          className="beam"
          style={
            {
              left: b.x,
              "--beam-dur": `${b.dur}s`,
              "--beam-delay": `${b.delay}s`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}
