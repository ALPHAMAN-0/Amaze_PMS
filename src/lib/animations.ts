/**
 * The site's shared motion vocabulary. Framer, GSAP, and the CSS keyframes in
 * globals.css all speak these same values so animation feels like one system.
 */

/** Primary easing — everything enters with this curve. */
export const EASE = [0.22, 1, 0.36, 1] as const;

export const DURATION = {
  hover: 0.2,
  reveal: 0.7,
  hero: 0.9,
} as const;

/** Default viewport trigger for scroll-in reveals. */
export const VIEWPORT = { once: true, margin: "-80px" } as const;
