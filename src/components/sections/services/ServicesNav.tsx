"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { useLenis } from "@/components/providers/SmoothScrollProvider";
import { services } from "@/lib/data";
import { cn } from "@/lib/utils";

/**
 * Sticky scroll-spy pill rail. An IntersectionObserver tracks which service
 * block occupies the middle of the viewport; the active pill slides between
 * items via layoutId. Clicking routes through Lenis for a smooth glide.
 */
export function ServicesNav() {
  const [active, setActive] = useState(services[0].slug);
  const lenis = useLenis();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    services.forEach((s) => {
      const el = document.getElementById(s.slug);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const handleClick = (slug: string) => {
    const el = document.getElementById(slug);
    if (!el) return;
    if (lenis) {
      lenis.scrollTo(el, { offset: -132, duration: 1.1 });
    } else {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      aria-label="Services on this page"
      className="glass sticky top-16 z-40 rounded-none border-x-0"
    >
      <div className="container-site flex gap-1.5 overflow-x-auto py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {services.map((s) => {
          const isActive = active === s.slug;
          return (
            <button
              key={s.slug}
              type="button"
              onClick={() => handleClick(s.slug)}
              aria-current={isActive ? "true" : undefined}
              className={cn(
                "relative shrink-0 whitespace-nowrap rounded-full px-4 py-2 text-[13px] transition-colors duration-200",
                isActive ? "text-(--bg-base)" : "text-secondary hover:text-primary"
              )}
            >
              {isActive && (
                <motion.span
                  layoutId="services-pill"
                  className="absolute inset-0 rounded-full bg-(--accent-solid)"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
              <span className="relative font-medium">{s.title}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
