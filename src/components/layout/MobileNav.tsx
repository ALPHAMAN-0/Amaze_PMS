"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { navLinks, siteConfig } from "@/lib/data";
import { EASE } from "@/lib/animations";
import { cn } from "@/lib/utils";

/** Full-screen overlay expanding from the hamburger via clip-path circle. */
export function MobileNav({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const pathname = usePathname();

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-0 h-svh bg-[rgba(5,8,10,0.92)] backdrop-blur-2xl md:hidden"
          initial={{ clipPath: "circle(0% at calc(100% - 44px) 32px)" }}
          animate={{ clipPath: "circle(150% at calc(100% - 44px) 32px)" }}
          exit={{ clipPath: "circle(0% at calc(100% - 44px) 32px)" }}
          transition={{ duration: 0.55, ease: EASE }}
        >
          <nav
            aria-label="Mobile"
            className="flex h-full flex-col justify-center gap-1 px-8"
          >
            {navLinks.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: 26 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: { delay: 0.18 + i * 0.07, duration: 0.5, ease: EASE },
                }}
                exit={{ opacity: 0, transition: { duration: 0.15 } }}
              >
                <Link
                  href={link.href}
                  onClick={onClose}
                  className="group flex items-baseline gap-4 py-3"
                >
                  <span className="font-mono text-xs text-muted">0{i + 1}</span>
                  <span
                    className={cn(
                      "font-display text-4xl font-semibold tracking-tight transition-colors",
                      pathname === link.href ? "text-gradient" : "text-primary"
                    )}
                  >
                    {link.label}
                  </span>
                </Link>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.5, duration: 0.5 } }}
              exit={{ opacity: 0, transition: { duration: 0.15 } }}
              className="mt-10 space-y-1.5 border-t border-(--border-subtle) pt-6 font-mono text-sm text-muted"
            >
              <a
                href={siteConfig.contact.phoneHref}
                className="block transition-colors hover:text-primary"
              >
                {siteConfig.contact.phone}
              </a>
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="block transition-colors hover:text-primary"
              >
                {siteConfig.contact.email}
              </a>
            </motion.div>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
