"use client";

import { motion } from "motion/react";
import { DURATION, EASE, VIEWPORT } from "@/lib/animations";

/** Viewport-triggered fade-and-rise. The workhorse reveal used sitewide. */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  once = VIEWPORT.once,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  once?: boolean;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: VIEWPORT.margin }}
      transition={{ duration: DURATION.reveal, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}
