"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { motion, useMotionValue, useSpring } from "motion/react";
import { usePrefersReducedMotion } from "@/lib/hooks/usePrefersReducedMotion";
import { cn } from "@/lib/utils";

const variants = {
  primary:
    "btn-shine bg-(--accent-solid) text-(--bg-base) font-semibold hover:glow-shadow",
  ghost:
    "glass text-primary hover:border-(--border-strong) hover:bg-(--bg-card-hover)",
} as const;

/**
 * Button/link that leans toward the cursor within a small radius.
 * Magnetism is desktop-only (pointer: fine) and off under reduced motion.
 */
export function MagneticButton({
  children,
  href,
  variant = "primary",
  strength = 0.3,
  className,
  onClick,
  type,
}: {
  children: React.ReactNode;
  href?: string;
  variant?: keyof typeof variants;
  strength?: number;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [magnetic, setMagnetic] = useState(false);
  const reduced = usePrefersReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 18 });
  const sy = useSpring(y, { stiffness: 220, damping: 18 });

  useEffect(() => {
    setMagnetic(window.matchMedia("(pointer: fine)").matches);
  }, []);

  const handleMove = (e: React.PointerEvent) => {
    if (!magnetic || reduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) * strength);
    y.set((e.clientY - rect.top - rect.height / 2) * strength);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  const inner = cn(
    "inline-flex w-full items-center justify-center gap-2 rounded-xl px-7 py-3.5 text-sm tracking-wide transition-[box-shadow,border-color,background-color] duration-200",
    variants[variant],
    className
  );

  return (
    <motion.div
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={reset}
      style={{ x: sx, y: sy }}
      whileTap={{ scale: 0.97 }}
      className="inline-block"
    >
      {href ? (
        <Link href={href} className={inner} onClick={onClick}>
          {children}
        </Link>
      ) : (
        <button type={type ?? "button"} className={inner} onClick={onClick}>
          {children}
        </button>
      )}
    </motion.div>
  );
}
