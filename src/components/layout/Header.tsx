"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { Logo } from "@/components/graphics/LogoMark";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { MobileNav } from "@/components/layout/MobileNav";
import { navLinks } from "@/lib/data";
import { EASE } from "@/lib/animations";
import { cn } from "@/lib/utils";

/**
 * Fixed header: transparent at the top of the page, glass once scrolled,
 * hides on scroll-down / reveals on scroll-up. The header element itself is
 * never transformed so the fixed mobile overlay can position off the viewport.
 */
export function Header() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 40);
    setHidden(y > 180 && y > prev && !menuOpen);
  });

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <MobileNav open={menuOpen} onClose={() => setMenuOpen(false)} />

      <motion.div
        animate={{ y: hidden ? -80 : 0 }}
        transition={{ duration: 0.35, ease: EASE }}
        className={cn(
          "relative z-10 transition-[background-color,border-color] duration-300",
          scrolled || menuOpen
            ? "glass rounded-none border-x-0 border-t-0"
            : "border-b border-transparent"
        )}
      >
        <div className="container-site flex h-16 items-center justify-between">
          <Logo />

          <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "group relative px-3.5 py-2 text-sm transition-colors duration-200",
                    active ? "text-primary" : "text-secondary hover:text-primary"
                  )}
                >
                  {link.label}
                  {active ? (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute inset-x-3.5 bottom-0 h-[1.5px] bg-gradient-to-r from-(--accent-a) to-(--accent-c)"
                    />
                  ) : (
                    <span className="absolute inset-x-3.5 bottom-0 h-[1.5px] origin-left scale-x-0 bg-gradient-to-r from-(--accent-a) to-(--accent-c) transition-transform duration-250 group-hover:scale-x-100" />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="hidden md:block">
            <MagneticButton
              href="/contact"
              className="px-5 py-2.5 text-[13px]"
              strength={0.25}
            >
              Book a Site Assessment
            </MagneticButton>
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen((o) => !o)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="flex size-10 flex-col items-center justify-center gap-1.5 md:hidden"
          >
            <span
              className={cn(
                "block h-[1.5px] w-5 bg-(--text-primary) transition-transform duration-300",
                menuOpen && "translate-y-[3.75px] rotate-45"
              )}
            />
            <span
              className={cn(
                "block h-[1.5px] w-5 bg-(--text-primary) transition-transform duration-300",
                menuOpen && "-translate-y-[3.75px] -rotate-45"
              )}
            />
          </button>
        </div>
      </motion.div>
    </header>
  );
}
