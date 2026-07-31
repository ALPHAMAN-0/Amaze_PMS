"use client";

import { useRef } from "react";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { gsap, useGSAP } from "@/lib/gsap";
import { BlueprintTower } from "@/components/graphics/BlueprintTower";
import { Em } from "@/components/ui/SectionHeading";
import { stats } from "@/lib/data";
import { cn } from "@/lib/utils";

gsap.registerPlugin(DrawSVGPlugin);

/**
 * Signature scene #1. Desktop: the section pins for 1600px while the
 * blueprint tower draws itself, a scan line sweeps up, and all four counters
 * scrub WITH the scroll (scroll back and they wind down). Mobile: no pin —
 * a one-shot timeline on entry. Reduced motion: everything set to end state.
 */
export function StatsScene() {
  const sectionRef = useRef<HTMLElement>(null);
  const valueRefs = useRef<(HTMLSpanElement | null)[]>([]);

  const setValues = (p: number) => {
    stats.forEach((s, i) => {
      const el = valueRefs.current[i];
      if (el) {
        el.textContent = Math.round(s.value * p).toLocaleString("en-IN") + s.suffix;
      }
    });
  };

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(
        {
          isDesktop: "(min-width: 1024px)",
          isMobile: "(max-width: 1023px)",
          reduceMotion: "(prefers-reduced-motion: reduce)",
        },
        (ctx) => {
          const { isDesktop, reduceMotion } = ctx.conditions!;

          if (reduceMotion) {
            gsap.set(".bp-win", { opacity: 0.9 });
            gsap.set(".bp-glow", { opacity: 1 });
            setValues(1);
            return;
          }

          setValues(0);
          const counters = { p: 0 };
          const counterTween = (duration: number) =>
            gsap.to(counters, {
              p: 1,
              duration,
              ease: "none",
              onUpdate: () => setValues(counters.p),
            });

          if (isDesktop) {
            const tl = gsap.timeline({
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top top",
                end: "+=1600",
                pin: true,
                scrub: 1,
                anticipatePin: 1,
              },
            });
            tl.from(".bp", { drawSVG: 0, duration: 3, stagger: 0.06, ease: "none" }, 0)
              .set(".bp-scan", { opacity: 1 }, 0.1)
              .to(".bp-scan", { y: -430, duration: 3, ease: "none" }, 0.1)
              .to(".bp-scan", { opacity: 0, duration: 0.4 }, 3.1)
              .from(
                ".stat-row",
                { opacity: 0, x: 36, stagger: 0.4, duration: 0.9 },
                0.7
              )
              .add(counterTween(3), 0.9)
              .to(
                ".bp-win",
                { opacity: 0.9, duration: 1, stagger: { each: 0.06, from: "random" } },
                2.6
              )
              .to(".bp-glow", { opacity: 1, duration: 0.8 }, 3.5);
          } else {
            const tl = gsap.timeline({
              scrollTrigger: { trigger: sectionRef.current, start: "top 65%" },
            });
            tl.from(
              ".bp",
              { drawSVG: 0, duration: 1.6, stagger: 0.015, ease: "power2.inOut" },
              0
            )
              .from(
                ".stat-row",
                { opacity: 0, y: 24, stagger: 0.12, duration: 0.6, ease: "power3.out" },
                0.4
              )
              .add(counterTween(2), 0.5)
              .to(
                ".bp-win",
                { opacity: 0.9, duration: 0.6, stagger: { each: 0.04, from: "random" } },
                1.3
              )
              .to(".bp-glow", { opacity: 1, duration: 0.6 }, 1.7);
          }
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} aria-labelledby="stats-heading" className="bg-raised">
      <div className="container-site flex min-h-svh items-center py-20">
        <div className="grid w-full items-center gap-14 lg:grid-cols-[1fr_1.15fr]">
          <div className="max-w-lg">
            <p className="eyebrow flex items-center gap-2.5">
              <span className="h-px w-8 bg-(--accent-solid)/60" />
              The portfolio
            </p>
            <h2 id="stats-heading" className="text-h2 mt-4 font-semibold">
              The scale behind the <Em>calm</Em>.
            </h2>
            <p className="mt-5 text-lg text-secondary">
              Twenty million square feet stay presentable, safe, and running
              because thousands of trained people show up to the same standard,
              every single day.
            </p>
            <p className="mt-4 font-mono text-xs tracking-[0.14em] text-muted">
              SCROLL — THE NUMBERS BUILD WITH YOU
            </p>
          </div>

          <div className="flex items-center gap-6 sm:gap-10">
            <BlueprintTower className="h-[380px] w-auto shrink-0 sm:h-[480px] lg:h-[62vh] lg:max-h-[560px]" />
            <dl className="flex flex-col gap-9 lg:gap-12">
              {stats.map((stat, i) => (
                // dl's div-wrapping content model requires each group's direct
                // children to be exactly dt then dd — the connector "line" is
                // rendered as a ::before pseudo-element so it never becomes a
                // stray DOM child that would break that structure for a11y tools.
                <div
                  key={stat.label}
                  className={cn(
                    "stat-row relative flex flex-col-reverse gap-1.5 pl-0 sm:pl-12",
                    "before:absolute before:left-0 before:top-1/2 before:hidden before:h-px before:w-8 before:-translate-y-1/2 before:content-[''] sm:before:block",
                    stat.gold
                      ? "before:bg-gradient-to-r before:from-(--gold) before:to-transparent"
                      : "before:bg-gradient-to-r before:from-(--accent-b) before:to-transparent"
                  )}
                >
                  <dt className="text-sm text-secondary">{stat.label}</dt>
                  <dd
                    className={cn(
                      "font-display text-4xl font-bold tabular-nums sm:text-5xl",
                      stat.gold ? "text-(--gold)" : "text-primary"
                    )}
                  >
                    <span
                      ref={(el) => {
                        valueRefs.current[i] = el;
                      }}
                    >
                      {stat.value.toLocaleString("en-IN") + stat.suffix}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
