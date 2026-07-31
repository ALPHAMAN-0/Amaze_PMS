"use client";

import { useRef } from "react";
import Link from "next/link";
import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { MeshBlobs } from "@/components/graphics/MeshBlobs";
import { GridBeams } from "@/components/graphics/GridBeams";
import {
  SkylineBack,
  SkylineFront,
  SkylineMid,
} from "@/components/graphics/Skyline";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Em } from "@/components/ui/SectionHeading";
import { Icon } from "@/components/graphics/Icon";

/**
 * "The Living Skyline." Headline entrance is CSS-keyframe-driven (.line-rise)
 * so the LCP paints before hydration; Framer only handles the scroll-out
 * parallax. Mesh glow leans toward the cursor on fine pointers.
 */
export function Hero() {
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // depth: far layers lag behind the scroll, content lifts away
  const backY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const midY = useTransform(scrollYProgress, [0, 1], [0, 66]);
  const frontY = useTransform(scrollYProgress, [0, 1], [0, 16]);
  const contentY = useTransform(scrollYProgress, [0, 0.7], [0, -80]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const blobX = useSpring(mx, { stiffness: 40, damping: 20 });
  const blobY = useSpring(my, { stiffness: 40, damping: 20 });

  const handlePointerMove = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    const { innerWidth, innerHeight } = window;
    mx.set((e.clientX / innerWidth - 0.5) * 36);
    my.set((e.clientY / innerHeight - 0.5) * 24);
  };

  return (
    <section
      ref={ref}
      onPointerMove={handlePointerMove}
      aria-labelledby="hero-heading"
      className="relative flex min-h-svh flex-col overflow-hidden"
    >
      <motion.div style={{ x: blobX, y: blobY }} className="absolute inset-0">
        <MeshBlobs />
      </motion.div>
      <GridBeams className="opacity-60" />

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="container-site relative z-10 flex flex-1 flex-col justify-center pb-[clamp(16rem,40vh,23rem)] pt-36"
      >
        <p
          className="rise-in eyebrow flex items-center gap-2.5"
          style={{ "--rise-delay": "0.05s" } as React.CSSProperties}
        >
          <span className="relative flex size-2">
            <span
              className="absolute inline-flex h-full w-full rounded-full bg-(--accent-a)"
              style={{ animation: "pulse-ring 2.4s ease-out infinite" }}
            />
            <span className="relative inline-flex size-2 rounded-full bg-(--accent-solid)" />
          </span>
          An ACTION GROUP company — est. 2001
        </p>

        <h1
          id="hero-heading"
          className="text-display mt-6 max-w-4xl font-bold text-primary"
        >
          <span className="line-mask">
            <span
              className="line-rise"
              style={{ "--line-i": 0 } as React.CSSProperties}
            >
              India&apos;s landmark
            </span>
          </span>
          <span className="line-mask">
            <span
              className="line-rise"
              style={{ "--line-i": 1 } as React.CSSProperties}
            >
              spaces run <Em>flawlessly.</Em>
            </span>
          </span>
        </h1>

        <p
          className="rise-in mt-7 max-w-xl text-lg text-secondary"
          style={{ "--rise-delay": "0.55s" } as React.CSSProperties}
        >
          Amaze delivers fully in-house facility management — security,
          engineering, and care — across 20 million sq ft, with 15,000+
          trained professionals who treat your property like their own.
        </p>

        <div
          className="rise-in mt-9 flex flex-wrap items-center gap-4"
          style={{ "--rise-delay": "0.7s" } as React.CSSProperties}
        >
          <MagneticButton href="/contact">Book a Site Assessment</MagneticButton>
          <Link
            href="/services"
            className="group inline-flex items-center gap-2 px-2 py-3 text-sm font-medium text-primary transition-colors hover:text-(--accent-a)"
          >
            Explore our services
            <Icon
              name="arrow-right"
              className="size-4 transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </div>

        <p
          className="rise-in mt-12 font-mono text-xs tracking-[0.16em] text-muted"
          style={{ "--rise-delay": "0.85s" } as React.CSSProperties}
        >
          200+ CLIENTS&ensp;·&ensp;5 STATES&ensp;·&ensp;24 YEARS
        </p>
      </motion.div>

      {/* layered skyline */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[36vh] min-h-[240px]">
        <motion.div style={{ y: backY }} className="absolute inset-0">
          <SkylineBack className="h-full w-full" />
        </motion.div>
        <motion.div style={{ y: midY }} className="absolute inset-0">
          <SkylineMid className="h-full w-full" />
        </motion.div>
        <motion.div style={{ y: frontY }} className="absolute inset-0">
          <SkylineFront className="h-full w-full" />
        </motion.div>
      </div>

      {/* scroll cue */}
      <div
        className="rise-in absolute bottom-7 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2.5"
        style={{ "--rise-delay": "1.2s" } as React.CSSProperties}
      >
        <span className="font-mono text-[10px] tracking-[0.3em] text-muted">
          SCROLL
        </span>
        <span className="relative h-10 w-px overflow-hidden bg-(--border-subtle)">
          <span
            className="absolute inset-0 bg-gradient-to-b from-(--accent-a) to-(--accent-c)"
            style={{ animation: "scroll-cue 2.2s ease-in-out infinite" }}
          />
        </span>
      </div>
    </section>
  );
}
