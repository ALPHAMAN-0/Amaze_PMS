"use client";

import { useRef, useState } from "react";
import { motion, useScroll } from "motion/react";
import { ServiceOrbit } from "@/components/graphics/ServiceOrbit";
import { Icon } from "@/components/graphics/Icon";
import { Em, SectionHeading } from "@/components/ui/SectionHeading";
import { services, whyUs } from "@/lib/data";

/**
 * Sticky step stack: the left panel (heading + service orbit) pins while
 * four proof blocks scroll past on the right. The block nearest the viewport
 * center becomes active — it brightens and swings the orbit to a new angle.
 */
export function WhyAmaze() {
  const [active, setActive] = useState(0);
  const listRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ["start center", "end center"],
  });

  return (
    <section aria-labelledby="why-heading" className="bg-raised section-pad">
      <div className="container-site grid gap-14 lg:grid-cols-2 lg:gap-20">
        <div className="lg:sticky lg:top-[14vh] lg:self-start">
          <SectionHeading
            eyebrow="Why Amaze"
            title={
              <span id="why-heading">
                Everything in-house. Nothing left to <Em>chance</Em>.
              </span>
            }
            description="One employer, one training calendar, one accountable standard across every discipline on your property."
          />
          <ServiceOrbit
            items={services.map((s) => ({ icon: s.icon, title: s.title }))}
            activeIndex={(active * 2) % services.length}
            className="mx-auto mt-14 hidden w-full max-w-[380px] lg:block"
          />
        </div>

        <div ref={listRef} className="relative pl-8 sm:pl-10">
          <span
            aria-hidden
            className="absolute left-0 top-0 h-full w-px bg-(--border-subtle)"
          />
          <motion.span
            aria-hidden
            className="absolute left-0 top-0 h-full w-px origin-top bg-gradient-to-b from-(--accent-a) to-(--accent-c)"
            style={{ scaleY: scrollYProgress }}
          />

          <div className="flex flex-col">
            {whyUs.map((point, i) => (
              <motion.div
                key={point.title}
                onViewportEnter={() => setActive(i)}
                viewport={{ margin: "-45% 0px -45% 0px" }}
                animate={{ x: active === i ? 0 : -4 }}
                transition={{ duration: 0.45 }}
                className="flex flex-col justify-center py-10 lg:min-h-[48vh] lg:py-8"
              >
                {/* The index numeral is a decorative marker (same treatment as
                    the "01/07" readouts elsewhere on the site) — it stays at
                    full color regardless of active state. Fading it along with
                    the rest of the block pushed its already-small mono text
                    below WCAG AA contrast; only the content that actually needs
                    de-emphasis is wrapped in the opacity animation below. */}
                <span className="font-mono text-xs tracking-[0.2em] text-muted">
                  0{i + 1}
                </span>
                <motion.div
                  animate={{ opacity: active === i ? 1 : 0.85 }}
                  transition={{ duration: 0.45 }}
                >
                  <div className="mt-4 inline-grid size-12 place-items-center rounded-xl bg-(--accent-dim) text-(--accent-a)">
                    <Icon name={point.icon} className="size-5" />
                  </div>
                  <h3 className="mt-5 font-display text-2xl font-semibold text-primary">
                    {point.title}
                  </h3>
                  <p className="mt-3 max-w-md leading-relaxed text-secondary">
                    {point.description}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
