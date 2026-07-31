import type { IconName } from "@/types/content";
import { cn } from "@/lib/utils";

/**
 * In-house 24×24 line icon set — 1.5px stroke, rounded caps/joins.
 * One consistent grid instead of a third-party icon library.
 */
const glyphs: Record<IconName, React.ReactNode> = {
  shield: (
    <>
      <path d="M12 3.2 18.8 6v5c0 4.6-2.9 7.6-6.8 9-3.9-1.4-6.8-4.4-6.8-9V6L12 3.2Z" />
      <path d="m9.2 11.6 2 2 3.8-4" />
    </>
  ),
  sparkle: (
    <>
      <path d="M11 5c.55 3.5 2 5 5.5 5.5C13 11 11.55 12.5 11 16c-.55-3.5-2-5-5.5-5.5C9 10 10.45 8.5 11 5Z" />
      <path d="M17.5 14.5c.3 1.9 1.1 2.7 3 3-1.9.3-2.7 1.1-3 3-.3-1.9-1.1-2.7-3-3 1.9-.3 2.7-1.1 3-3Z" />
    </>
  ),
  wrench: (
    <>
      <path d="M14.5 6.5a4.2 4.2 0 0 0-5.6 5.2L4.5 16v3.5H8l4.3-4.4a4.2 4.2 0 0 0 5.2-5.6l-2.7 2.7-2.2-.6-.6-2.2 2.5-2.9Z" />
    </>
  ),
  leaf: (
    <>
      <path d="M5.5 18.5C5.5 11 11 5.5 18.5 5.5c0 7.5-5.5 13-13 13Z" />
      <path d="M5.5 18.5c2.6-4.4 6-7.8 10-10" />
    </>
  ),
  bug: (
    <>
      <circle cx="12" cy="13" r="4.5" />
      <path d="M9.5 9.5c0-1.4 1.1-2.5 2.5-2.5s2.5 1.1 2.5 2.5" />
      <path d="M12 8.5v9M7.5 13h-3m15 0h-3M8.6 10 6 8m9.4 2L18 8m-9.4 6L6 18m9.4-2 2.6 2" />
    </>
  ),
  headset: (
    <>
      <path d="M4.5 14v-1.5a7.5 7.5 0 0 1 15 0V14" />
      <rect x="3.5" y="13" width="3.5" height="5" rx="1.5" />
      <rect x="17" y="13" width="3.5" height="5" rx="1.5" />
      <path d="M19 18v.5a2.5 2.5 0 0 1-2.5 2.5H13" />
    </>
  ),
  car: (
    <>
      <path d="M5 13.5 6.6 8.6A2 2 0 0 1 8.5 7.2h7a2 2 0 0 1 1.9 1.4L19 13.5" />
      <path d="M4.5 13.5h15a1 1 0 0 1 1 1V17a1 1 0 0 1-1 1h-15a1 1 0 0 1-1-1v-2.5a1 1 0 0 1 1-1Z" />
      <path d="M7 15.7h.01M17 15.7h.01" />
    </>
  ),
  users: (
    <>
      <circle cx="9" cy="8.5" r="3" />
      <path d="M3.5 19c.6-3 2.8-4.5 5.5-4.5s4.9 1.5 5.5 4.5" />
      <path d="M15.5 5.9a3 3 0 0 1 0 5.2M17.4 14.9c1.6.7 2.7 2.1 3.1 4.1" />
    </>
  ),
  clipboard: (
    <>
      <rect x="5.5" y="5" width="13" height="15.5" rx="2" />
      <path d="M9 5a3 3 0 0 1 6 0" />
      <path d="m9 13.5 2 2 4-4.5" />
    </>
  ),
  layers: (
    <>
      <path d="m12 3.5 8.5 4.7L12 12.9 3.5 8.2 12 3.5Z" />
      <path d="m4.5 12.5 7.5 4.2 7.5-4.2" />
      <path d="m4.5 16.3 7.5 4.2 7.5-4.2" />
    </>
  ),
  heart: (
    <>
      <path d="M12 19.5s-7-4.4-8.8-8.8c-1-2.6.4-5.4 3-6.2 1.9-.6 4 .1 5.8 2.3 1.8-2.2 3.9-2.9 5.8-2.3 2.6.8 4 3.6 3 6.2C19 15.1 12 19.5 12 19.5Z" />
    </>
  ),
  phone: (
    <>
      <path d="M7.7 4.5c.6 0 1.1.4 1.3 1l.9 2.6a1.4 1.4 0 0 1-.4 1.5l-1.3 1.2a12.5 12.5 0 0 0 5 5l1.2-1.3c.4-.4 1-.6 1.5-.4l2.6.9c.6.2 1 .7 1 1.3v2.2c0 .8-.7 1.5-1.5 1.4C10.6 19.3 4.7 13.4 4.1 6c-.1-.8.6-1.5 1.4-1.5h2.2Z" />
    </>
  ),
  mail: (
    <>
      <rect x="3.5" y="5.5" width="17" height="13" rx="2" />
      <path d="m4.5 7.5 7.5 5.5 7.5-5.5" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s-6.5-5.7-6.5-10.5a6.5 6.5 0 0 1 13 0C18.5 15.3 12 21 12 21Z" />
      <circle cx="12" cy="10.5" r="2.2" />
    </>
  ),
  building: (
    <>
      <rect x="6" y="4" width="12" height="16.5" rx="1" />
      <path d="M9.5 8h1.2m2.6 0h1.2M9.5 11.5h1.2m2.6 0h1.2M9.5 15h1.2m2.6 0h1.2" />
      <path d="M10.5 20.5v-2.5h3v2.5" />
    </>
  ),
  "arrow-right": (
    <>
      <path d="M4.5 12h15" />
      <path d="m13.5 6 6 6-6 6" />
    </>
  ),
  check: (
    <>
      <path d="m5 12.5 4.5 4.5L19 7.5" />
    </>
  ),
};

export function Icon({
  name,
  className,
  strokeWidth = 1.5,
}: {
  name: IconName;
  className?: string;
  strokeWidth?: number;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("size-5", className)}
      aria-hidden="true"
    >
      {glyphs[name]}
    </svg>
  );
}
