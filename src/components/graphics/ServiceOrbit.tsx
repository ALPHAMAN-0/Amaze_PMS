"use client";

import { motion } from "motion/react";
import { Icon } from "@/components/graphics/Icon";
import type { IconName } from "@/types/content";
import { cn } from "@/lib/utils";

/**
 * Seven service icons orbiting a central building glyph.
 * - `ambient`: slow CSS rotation (icons counter-rotate to stay upright).
 * - controlled: pass `activeIndex` and the orbit springs so that service's
 *   node swings to the 3 o'clock position and enlarges.
 */
export function ServiceOrbit({
  items,
  activeIndex = null,
  ambient = false,
  className,
}: {
  items: { icon: IconName; title: string }[];
  activeIndex?: number | null;
  ambient?: boolean;
  className?: string;
}) {
  const step = 360 / items.length;
  const rotation = activeIndex == null ? 0 : -activeIndex * step;

  return (
    <div className={cn("relative aspect-square", className)} aria-hidden>
      {/* orbit rings */}
      <div className="absolute inset-[6%] rounded-full border border-dashed border-(--border-strong) opacity-70" />
      <div className="absolute inset-[26%] rounded-full border border-dashed border-(--border-subtle)" />

      {/* center glyph */}
      <div className="glass glow-shadow absolute left-1/2 top-1/2 z-10 grid size-[26%] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full">
        <Icon name="building" className="size-[45%] text-(--accent-b)" />
      </div>

      {/* rotating ring of nodes */}
      <motion.div
        className={cn("absolute inset-0", ambient && "orbit-spin")}
        animate={ambient ? undefined : { rotate: rotation }}
        transition={{ type: "spring", stiffness: 55, damping: 16 }}
      >
        {items.map((item, i) => {
          const active = activeIndex === i;
          return (
            /* arm: rotates the node into place around the ring */
            <div
              key={item.icon}
              className="absolute inset-0"
              style={{ transform: `rotate(${i * step + 90}deg)` }}
            >
              <div className="absolute left-1/2 top-[6%] -translate-x-1/2 -translate-y-1/2">
                {/* un-rotate the static arm angle so content starts upright */}
                <div style={{ transform: `rotate(${-(i * step + 90)}deg)` }}>
                  {/* counter-rotate the dynamic ring rotation */}
                  <motion.div
                    className={ambient ? "orbit-spin-reverse" : undefined}
                    animate={ambient ? undefined : { rotate: -rotation }}
                    transition={{ type: "spring", stiffness: 55, damping: 16 }}
                  >
                    <motion.div
                      title={item.title}
                      animate={{ scale: active ? 1.22 : 1 }}
                      transition={{ type: "spring", stiffness: 260, damping: 18 }}
                      className={cn(
                        "glass grid size-11 place-items-center rounded-full transition-[border-color,box-shadow] duration-300 md:size-12",
                        active
                          ? "border-(--accent-solid) glow-shadow text-(--accent-a)"
                          : "text-secondary"
                      )}
                    >
                      <Icon name={item.icon} className="size-5" />
                    </motion.div>
                  </motion.div>
                </div>
              </div>
            </div>
          );
        })}
      </motion.div>
    </div>
  );
}
