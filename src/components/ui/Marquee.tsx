import { cn } from "@/lib/utils";

/**
 * Pure-CSS infinite marquee: track holds two identical halves and
 * translates -50%. Pauses on hover; killed by reduced-motion CSS.
 */
export function Marquee({
  children,
  speed = 42,
  className,
}: {
  children: React.ReactNode;
  speed?: number;
  className?: string;
}) {
  return (
    <div className={cn("marquee", className)}>
      <div
        className="marquee-track"
        style={{ "--marquee-duration": `${speed}s` } as React.CSSProperties}
      >
        <div className="flex shrink-0 items-center gap-4 pr-4">{children}</div>
        <div className="flex shrink-0 items-center gap-4 pr-4" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}
