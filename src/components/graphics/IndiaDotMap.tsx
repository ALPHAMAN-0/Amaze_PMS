"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { cn } from "@/lib/utils";

/**
 * Dot-matrix India built from a coarse bitmap (no map SDK, no geodata
 * download). Dots fade in radially outward from the Hyderabad HQ marker.
 */
const ROWS = [
  "....##..............",
  "...####.............",
  "..#####.............",
  "..######............",
  ".########...........",
  ".#########..........",
  "##########...####...",
  "###################.",
  ".##################.",
  ".################...",
  "..#############.....",
  "..###########.......",
  "...##########.......",
  "...#########........",
  "....########........",
  "....#######.........",
  ".....######.........",
  ".....#####..........",
  "......####..........",
  "......###...........",
  ".......##...........",
  ".......#............",
];

const HQ = { row: 12, col: 7 };

const MARKERS = [
  { row: 12, col: 7, label: "Hyderabad — HQ", hq: true },
  { row: 10, col: 4, label: "Regional operations", hq: false },
  { row: 16, col: 6, label: "Regional operations", hq: false },
  { row: 15, col: 9, label: "Regional operations", hq: false },
  { row: 7, col: 12, label: "Regional operations", hq: false },
];

const COLS = ROWS[0].length;
const CELL = 10;

export function IndiaDotMap({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div ref={ref} className={cn("relative", className)}>
      <svg
        viewBox={`0 0 ${COLS * CELL} ${ROWS.length * CELL}`}
        className="w-full"
        aria-hidden
      >
        {ROWS.flatMap((row, r) =>
          row.split("").map((cell, c) => {
            if (cell !== "#") return null;
            const d = Math.hypot(c - HQ.col, r - HQ.row);
            return (
              <circle
                key={`${r}-${c}`}
                cx={c * CELL + CELL / 2}
                cy={r * CELL + CELL / 2}
                r={2.2}
                fill="#5F6E68"
                style={{
                  opacity: inView ? 0.4 : 0,
                  transition: "opacity 0.5s ease",
                  transitionDelay: `${d * 0.05}s`,
                }}
              />
            );
          })
        )}
      </svg>

      {MARKERS.map((m, i) => (
        <motion.div
          key={i}
          className="group absolute"
          style={{
            left: `${((m.col + 0.5) / COLS) * 100}%`,
            top: `${((m.row + 0.5) / ROWS.length) * 100}%`,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={inView ? { opacity: 1, scale: 1 } : undefined}
          transition={{
            delay: 0.5 + i * 0.12,
            type: "spring",
            stiffness: 260,
            damping: 16,
          }}
        >
          <span
            className={cn(
              "absolute -translate-x-1/2 -translate-y-1/2 rounded-full",
              m.hq
                ? "size-3.5 bg-(--gold) shadow-[0_0_14px_rgba(217,180,91,0.6)]"
                : "size-2.5 bg-(--accent-a) shadow-[0_0_10px_rgba(52,211,153,0.55)]"
            )}
          />
          <span
            className={cn(
              "absolute -translate-x-1/2 -translate-y-1/2 rounded-full border",
              m.hq ? "size-3.5 border-(--gold)" : "size-2.5 border-(--accent-a)"
            )}
            style={{ animation: "pulse-ring 2.6s ease-out infinite" }}
          />
          <span className="glass pointer-events-none absolute left-2.5 top-0 z-10 -translate-y-1/2 whitespace-nowrap rounded-lg px-2.5 py-1 font-mono text-[10px] tracking-wider text-primary opacity-0 transition-opacity duration-200 group-hover:opacity-100">
            {m.label}
          </span>
        </motion.div>
      ))}
    </div>
  );
}
