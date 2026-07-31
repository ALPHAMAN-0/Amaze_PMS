"use client";

import { useLenis } from "@/components/providers/SmoothScrollProvider";
import { Icon } from "@/components/graphics/Icon";

export function BackToTop() {
  const lenis = useLenis();

  const handleClick = () => {
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.4 });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label="Back to top"
      className="glass group grid size-10 place-items-center rounded-full transition-[border-color,box-shadow] duration-300 hover:border-(--border-strong) hover:glow-shadow"
    >
      <Icon
        name="arrow-right"
        className="size-4 -rotate-90 text-secondary transition-[color,transform] duration-300 group-hover:-translate-y-0.5 group-hover:text-(--accent-a)"
      />
    </button>
  );
}
