import Link from "next/link";
import { cn } from "@/lib/utils";

export function LogoGlyph({
  className,
  gradientId = "logo-grad",
}: {
  className?: string;
  gradientId?: string;
}) {
  return (
    <svg viewBox="0 0 32 32" className={cn("size-8", className)} aria-hidden>
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#34D399" />
          <stop offset="100%" stopColor="#22D3EE" />
        </linearGradient>
      </defs>
      <rect
        x="1.25"
        y="1.25"
        width="29.5"
        height="29.5"
        rx="8.5"
        fill="none"
        stroke={`url(#${gradientId})`}
        strokeWidth="1.5"
        strokeOpacity="0.85"
      />
      {/* A as a tower: two legs, a floor line, one lit window */}
      <path
        d="M16 7.5 9.5 24.5 M16 7.5 22.5 24.5 M12 18.5 h8"
        stroke={`url(#${gradientId})`}
        strokeWidth="1.8"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="16" cy="13.5" r="1.3" fill="#34D399" />
    </svg>
  );
}

export function Logo({
  className,
  gradientId,
}: {
  className?: string;
  gradientId?: string;
}) {
  return (
    <Link
      href="/"
      className={cn("group inline-flex items-center gap-2.5", className)}
    >
      <LogoGlyph
        gradientId={gradientId}
        className="transition-transform duration-300 group-hover:rotate-[-6deg]"
      />
      <span className="font-display text-lg font-bold tracking-tight text-primary">
        AMAZE
      </span>
      <span className="rounded-md border border-(--border-subtle) px-1.5 py-0.5 font-mono text-[10px] font-medium tracking-[0.2em] text-muted">
        PMS
      </span>
    </Link>
  );
}
