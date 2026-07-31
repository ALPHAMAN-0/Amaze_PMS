"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { gsap, useGSAP } from "@/lib/gsap";
import { Icon } from "@/components/graphics/Icon";
import { Em, SectionHeading } from "@/components/ui/SectionHeading";
import { services } from "@/lib/data";
import type { Service } from "@/types/content";

function ServiceCard({ service }: { service: Service }) {
  const ref = useRef<HTMLElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  return (
    <motion.article
      ref={ref}
      onMouseMove={handleMouseMove}
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      className="rail-card spotlight-card glass group relative flex h-[540px] w-[82vw] max-w-[420px] shrink-0 snap-center flex-col justify-between overflow-hidden rounded-3xl p-7 transition-[border-color,background-color,box-shadow] duration-300 hover:border-(--border-strong) hover:bg-(--bg-card-hover) hover:glow-shadow sm:p-8 lg:h-[calc(100svh-330px)] lg:max-h-[560px] lg:min-h-[420px] lg:w-[420px]"
    >
      <span
        aria-hidden
        className="absolute -top-7 right-1 font-display text-[7.5rem] font-bold leading-none text-primary opacity-[0.05] select-none"
      >
        {service.index}
      </span>

      <div>
        <div className="rail-icon inline-grid size-14 place-items-center rounded-2xl bg-(--accent-dim) text-(--accent-a) transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110">
          <Icon name={service.icon} className="size-6" />
        </div>
        <h3 className="mt-6 font-display text-2xl font-semibold text-primary">
          {service.title}
        </h3>
        <p className="mt-1.5 font-serif text-lg italic text-(--accent-b)">
          {service.tagline}
        </p>
        <p className="mt-4 text-sm leading-relaxed text-secondary">
          {service.description}
        </p>
      </div>

      <div>
        <div className="flex flex-wrap gap-2">
          {service.chips.map((chip) => (
            <span
              key={chip}
              className="rounded-full border border-(--border-subtle) px-3 py-1 font-mono text-[10px] tracking-[0.12em] text-muted uppercase"
            >
              {chip}
            </span>
          ))}
        </div>
        <Link
          href={`/services#${service.slug}`}
          className="group/link mt-6 inline-flex items-center gap-2 text-sm font-medium text-primary transition-colors hover:text-(--accent-a)"
        >
          Explore
          <Icon
            name="arrow-right"
            className="size-4 transition-transform duration-300 group-hover/link:translate-x-1"
          />
        </Link>
      </div>
    </motion.article>
  );
}

/**
 * Signature scene #2 — the centerpiece. Desktop: the section pins and the
 * card track scrubs horizontally with scroll (icons counter-parallax for
 * depth; progress rail + mono readout track the same scrub). Below lg the
 * pin is dropped entirely: the same track becomes a native scroll-snap
 * carousel and the progress rail binds to scrollLeft instead.
 */
export function ServicesRail() {
  const sectionRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const barRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const readoutRefs = useRef<(HTMLSpanElement | null)[]>([]);

  const setProgress = (p: number) => {
    const count = services.length;
    const idx = Math.min(count, Math.floor(p * (count - 0.001)) + 1);
    barRefs.current.forEach((el) => {
      if (el) el.style.transform = `scaleX(${p})`;
    });
    readoutRefs.current.forEach((el) => {
      if (el) el.textContent = `0${idx} / 0${count}`;
    });
  };

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(
        {
          isDesktop: "(min-width: 1024px)",
          reduceMotion: "(prefers-reduced-motion: reduce)",
        },
        (ctx) => {
          const { isDesktop, reduceMotion } = ctx.conditions!;
          if (!isDesktop || reduceMotion) return;

          const track = trackRef.current!;
          const viewport = viewportRef.current!;
          const distance = () => track.scrollWidth - viewport.clientWidth;

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top top",
              end: () => "+=" + (distance() + window.innerHeight * 0.4),
              pin: true,
              scrub: 1,
              invalidateOnRefresh: true,
              anticipatePin: 1,
              onUpdate: (self) => setProgress(self.progress),
            },
          });

          tl.to(track, { x: () => -distance(), ease: "none" }, 0).fromTo(
            ".rail-icon",
            { x: 26 },
            { x: -26, ease: "none" },
            0
          );
        }
      );
    },
    { scope: sectionRef }
  );

  // Mobile/tablet: progress follows the native carousel scroll.
  const handleNativeScroll = () => {
    const el = viewportRef.current;
    if (!el || window.matchMedia("(min-width: 1024px)").matches) return;
    const max = el.scrollWidth - el.clientWidth;
    if (max > 0) setProgress(el.scrollLeft / max);
  };

  return (
    <section ref={sectionRef} aria-labelledby="services-heading">
      <div className="flex min-h-svh flex-col justify-center py-16 lg:h-svh lg:py-10">
        <div className="container-site mb-8 flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="What we do"
            title={
              <span id="services-heading">
                Seven disciplines. One <Em>accountable</Em> partner.
              </span>
            }
          />
          <div className="hidden flex-col items-end gap-2.5 pb-2 lg:flex">
            <span
              ref={(el) => {
                readoutRefs.current[0] = el;
              }}
              className="font-mono text-xs tracking-[0.2em] text-muted tabular-nums"
            >
              01 / 07
            </span>
            <span className="relative block h-px w-44 bg-(--border-subtle)">
              <span
                ref={(el) => {
                  barRefs.current[0] = el;
                }}
                className="absolute inset-0 origin-left scale-x-0 bg-gradient-to-r from-(--accent-a) to-(--accent-c)"
              />
            </span>
          </div>
        </div>

        <div
          ref={viewportRef}
          onScroll={handleNativeScroll}
          className="snap-x snap-mandatory overflow-x-auto py-2 [scrollbar-width:none] lg:snap-none lg:overflow-hidden [&::-webkit-scrollbar]:hidden"
        >
          <div
            ref={trackRef}
            className="flex w-max gap-5 px-6 md:gap-6 md:px-10 lg:pl-[max(2.5rem,calc((100vw-76rem)/2+2.5rem))] lg:pr-24"
          >
            {services.map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>
        </div>

        <div className="container-site mt-8 flex items-center gap-4 lg:hidden">
          <span className="relative block h-px flex-1 bg-(--border-subtle)">
            <span
              ref={(el) => {
                barRefs.current[1] = el;
              }}
              className="absolute inset-0 origin-left scale-x-0 bg-gradient-to-r from-(--accent-a) to-(--accent-c)"
            />
          </span>
          <span
            ref={(el) => {
              readoutRefs.current[1] = el;
            }}
            className="font-mono text-xs tracking-[0.2em] text-muted tabular-nums"
          >
            01 / 07
          </span>
        </div>
      </div>
    </section>
  );
}
