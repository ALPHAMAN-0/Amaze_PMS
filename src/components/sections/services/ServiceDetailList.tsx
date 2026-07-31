"use client";

import { motion } from "motion/react";
import { Icon } from "@/components/graphics/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { services } from "@/lib/data";
import { EASE } from "@/lib/animations";
import { cn } from "@/lib/utils";

function FeatureItem({ text, index }: { text: string; index: number }) {
  return (
    <motion.li
      initial={{ opacity: 0, x: 16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, ease: EASE, delay: index * 0.08 }}
      className="flex items-start gap-3"
    >
      <svg
        viewBox="0 0 24 24"
        className="mt-0.5 size-5 shrink-0 text-(--accent-a)"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <motion.path
          d="m5 12.5 4.5 4.5L19 7.5"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.45, ease: EASE, delay: 0.15 + index * 0.08 }}
        />
      </svg>
      <span className="text-[15px] leading-relaxed text-secondary">{text}</span>
    </motion.li>
  );
}

export function ServiceDetailList() {
  return (
    <div className="container-site">
      {services.map((service, i) => {
        const flipped = i % 2 === 1;
        return (
          <article
            key={service.slug}
            id={service.slug}
            aria-labelledby={`${service.slug}-title`}
            className={cn(
              "grid items-center gap-10 py-16 md:py-20 lg:grid-cols-2 lg:gap-20",
              i > 0 && "border-t border-(--border-subtle)"
            )}
          >
            {/* icon panel */}
            <Reveal className={cn(flipped && "lg:order-2")}>
              <div className="glass relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-3xl">
                <div className="bg-grid absolute inset-0 opacity-50" />
                <span
                  aria-hidden
                  className="absolute -top-8 right-2 font-display text-[9rem] font-bold leading-none text-primary opacity-[0.05] select-none"
                >
                  {service.index}
                </span>
                <div
                  className="grid size-28 place-items-center rounded-3xl bg-(--accent-dim) text-(--accent-a)"
                  style={{ animation: "float 5.5s ease-in-out infinite" }}
                >
                  <Icon name={service.icon} className="size-12" strokeWidth={1.25} />
                </div>
                <span className="absolute bottom-5 left-6 font-mono text-[10px] tracking-[0.2em] text-muted uppercase">
                  {service.chips.join(" · ")}
                </span>
              </div>
            </Reveal>

            {/* copy */}
            <div className={cn(flipped && "lg:order-1")}>
              <Reveal>
                <p className="eyebrow flex items-center gap-2.5">
                  <span className="h-px w-8 bg-(--accent-solid)/60" />
                  {service.index} — {service.title}
                </p>
              </Reveal>
              <Reveal delay={0.08}>
                <h2
                  id={`${service.slug}-title`}
                  className="mt-4 font-display text-3xl font-semibold text-primary"
                >
                  {service.title}
                </h2>
                <p className="mt-2 font-serif text-lg italic text-(--accent-b)">
                  {service.tagline}
                </p>
              </Reveal>
              <Reveal delay={0.14}>
                <p className="mt-5 leading-relaxed text-secondary">
                  {service.description}
                </p>
                <p className="mt-3.5 leading-relaxed text-secondary">
                  {service.detail}
                </p>
              </Reveal>
              <ul className="mt-7 space-y-3">
                {service.features.map((feature, fi) => (
                  <FeatureItem key={feature} text={feature} index={fi} />
                ))}
              </ul>
            </div>
          </article>
        );
      })}
    </div>
  );
}
