"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Icon } from "@/components/graphics/Icon";
import { siteConfig } from "@/lib/data";
import type { IconName } from "@/types/content";

const rows: { icon: IconName; label: string; value: string; href?: string }[] = [
  {
    icon: "phone",
    label: "Call us",
    value: siteConfig.contact.phone,
    href: siteConfig.contact.phoneHref,
  },
  {
    icon: "mail",
    label: "Write to us",
    value: siteConfig.contact.email,
    href: `mailto:${siteConfig.contact.email}`,
  },
  {
    icon: "pin",
    label: "Visit us",
    value: siteConfig.contact.address,
  },
];

function CopyButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    []
  );

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      timer.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard unavailable (permissions/insecure context) — ignore
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={copied ? "Copied" : `Copy ${value}`}
      className="ml-auto grid size-9 shrink-0 place-items-center rounded-lg border border-(--border-subtle) text-muted transition-colors duration-200 hover:border-(--border-strong) hover:text-primary"
    >
      <AnimatePresence mode="wait" initial={false}>
        {copied ? (
          <motion.span
            key="check"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="text-(--accent-a)"
          >
            <Icon name="check" className="size-4" />
          </motion.span>
        ) : (
          <motion.span
            key="copy"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            <svg
              viewBox="0 0 24 24"
              className="size-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <rect x="9" y="9" width="11" height="11" rx="2" />
              <path d="M5 15V6a2 2 0 0 1 2-2h9" />
            </svg>
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}

export function ContactInfo() {
  return (
    <div className="space-y-3.5">
      {rows.map((row) => (
        <div
          key={row.label}
          className="glass flex items-center gap-4 rounded-2xl p-4 transition-[border-color] duration-300 hover:border-(--border-strong)"
        >
          <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-(--accent-dim) text-(--accent-a)">
            <Icon name={row.icon} className="size-5" />
          </span>
          <div className="min-w-0">
            <p className="font-mono text-[10px] tracking-[0.18em] text-muted uppercase">
              {row.label}
            </p>
            {row.href ? (
              <a
                href={row.href}
                className="mt-0.5 block truncate text-[15px] font-medium text-primary transition-colors hover:text-(--accent-a)"
              >
                {row.value}
              </a>
            ) : (
              <p className="mt-0.5 text-[15px] font-medium text-primary">
                {row.value}
              </p>
            )}
          </div>
          <CopyButton value={row.value} />
        </div>
      ))}

      {/* stylized HQ map card — pure SVG, no map SDK */}
      <div className="glass relative overflow-hidden rounded-2xl">
        <div className="bg-grid absolute inset-0 opacity-60" />
        <svg viewBox="0 0 400 180" className="relative w-full" aria-hidden>
          {Array.from({ length: 9 }, (_, r) =>
            Array.from({ length: 20 }, (_, c) => (
              <circle
                key={`${r}-${c}`}
                cx={c * 20 + 10}
                cy={r * 20 + 10}
                r={1.6}
                fill="#5F6E68"
                opacity={((r * 5 + c * 3) % 7) % 2 === 0 ? 0.35 : 0.15}
              />
            ))
          )}
          {/* a couple of "roads" */}
          <path
            d="M 0 120 Q 120 100 210 96 T 400 60"
            fill="none"
            stroke="#2DD4BF"
            strokeOpacity="0.18"
            strokeWidth="2"
          />
          <path
            d="M 140 180 Q 180 120 230 92 T 330 0"
            fill="none"
            stroke="#2DD4BF"
            strokeOpacity="0.12"
            strokeWidth="2"
          />
        </svg>
        <div className="absolute left-[52%] top-[48%]">
          <span className="absolute size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-(--gold) shadow-[0_0_16px_rgba(217,180,91,0.7)]" />
          <span
            className="absolute size-3 -translate-x-1/2 -translate-y-1/2 rounded-full border border-(--gold)"
            style={{ animation: "pulse-ring 2.6s ease-out infinite" }}
          />
        </div>
        <p className="absolute bottom-3 left-4 font-mono text-[10px] tracking-[0.18em] text-muted uppercase">
          HQ — Cyberabad, Hyderabad
        </p>
      </div>
    </div>
  );
}
