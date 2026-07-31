"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { Reveal } from "@/components/ui/Reveal";
import { milestones } from "@/lib/data";
import { cn } from "@/lib/utils";

/**
 * Vertical timeline whose gradient spine draws with the scroll (scrubbed
 * scaleY — no pinning). Node cards alternate sides on desktop.
 */
export function MilestoneTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const spineRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(
        {
          motionOk: "(prefers-reduced-motion: no-preference)",
          reduceMotion: "(prefers-reduced-motion: reduce)",
        },
        (ctx) => {
          if (ctx.conditions!.reduceMotion) {
            gsap.set(spineRef.current, { scaleY: 1 });
            return;
          }
          gsap.fromTo(
            spineRef.current,
            { scaleY: 0 },
            {
              scaleY: 1,
              ease: "none",
              scrollTrigger: {
                trigger: containerRef.current,
                start: "top 72%",
                end: "bottom 55%",
                scrub: 1,
              },
            }
          );
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className="relative">
      {/* spine */}
      <span
        aria-hidden
        className="absolute left-4 top-0 h-full w-px bg-(--border-subtle) lg:left-1/2"
      />
      <span
        ref={spineRef}
        aria-hidden
        className="absolute left-4 top-0 h-full w-px origin-top scale-y-0 bg-gradient-to-b from-(--accent-a) via-(--accent-b) to-(--accent-c) lg:left-1/2"
      />

      <ol className="space-y-14 lg:space-y-20">
        {milestones.map((m, i) => {
          const left = i % 2 === 0;
          return (
            <li key={m.year} className="relative">
              {/* node dot */}
              <span
                aria-hidden
                className="absolute left-4 top-2 size-2.5 -translate-x-1/2 rounded-full bg-(--accent-solid) shadow-[0_0_12px_rgba(16,185,129,0.6)] lg:left-1/2"
              />
              <Reveal
                className={cn(
                  "pl-12 lg:w-[calc(50%-3rem)] lg:pl-0",
                  left ? "lg:mr-auto lg:pr-0 lg:text-right" : "lg:ml-auto"
                )}
              >
                <p className="font-mono text-xs tracking-[0.2em] text-(--accent-a)">
                  {m.year}
                </p>
                <h3 className="mt-2.5 font-display text-xl font-semibold text-primary">
                  {m.title}
                </h3>
                <p className="mt-2.5 leading-relaxed text-secondary">
                  {m.description}
                </p>
              </Reveal>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
