"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Reveal } from "@/components/ui/Reveal";
import { testimonials } from "@/lib/data";
import { EASE } from "@/lib/animations";

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(
      () => setIndex((i) => (i + 1) % testimonials.length),
      6000
    );
    return () => clearInterval(id);
  }, [paused]);

  const t = testimonials[index];

  return (
    <section
      aria-labelledby="testimonials-heading"
      className="bg-raised section-pad"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className="container-site max-w-3xl text-center">
        <h2 id="testimonials-heading" className="sr-only">
          What clients say
        </h2>
        <Reveal>
          <span
            aria-hidden
            className="text-gradient font-serif text-7xl italic leading-none"
          >
            &ldquo;
          </span>
        </Reveal>

        <div aria-live="off" className="relative mt-2 min-h-[210px] sm:min-h-[170px]">
          <AnimatePresence mode="wait">
            <motion.figure
              key={index}
              initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -20, filter: "blur(4px)" }}
              transition={{ duration: 0.5, ease: EASE }}
            >
              <blockquote className="text-xl leading-relaxed text-primary sm:text-2xl">
                {t.quote}
              </blockquote>
              <figcaption className="mt-6 font-mono text-xs tracking-[0.16em] text-muted uppercase">
                {t.author} — {t.role}
              </figcaption>
            </motion.figure>
          </AnimatePresence>
        </div>

        <div className="mt-8 flex justify-center gap-1.5">
          {testimonials.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Show testimonial ${i + 1}`}
              aria-pressed={index === i}
              className="relative grid h-7 w-7 place-items-center"
            >
              <span className="size-1.5 rounded-full bg-(--border-strong)" />
              {index === i && (
                <motion.span
                  layoutId="testimonial-pill"
                  className="absolute inset-x-1 top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-(--accent-solid)"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>

        <Reveal delay={0.15}>
          <div className="glass mx-auto mt-14 flex max-w-xl items-center gap-4 rounded-2xl p-5 text-left">
            <span className="grid size-12 shrink-0 place-items-center rounded-full bg-gradient-to-br from-(--accent-a) to-(--accent-c) font-display text-sm font-bold text-(--bg-base)">
              SA
            </span>
            <div>
              <p className="text-sm font-semibold text-primary">
                Subhani Abdul — Founder
              </p>
              <p className="mt-0.5 text-xs text-muted">
                Indian Navy veteran · Certified security practitioner
              </p>
              <p className="mt-1.5 font-serif text-sm italic text-secondary">
                &ldquo;Service discipline, learned at sea, applied to every
                square foot.&rdquo;
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
