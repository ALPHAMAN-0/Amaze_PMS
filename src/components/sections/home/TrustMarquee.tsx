import { Marquee } from "@/components/ui/Marquee";
import { sectors } from "@/lib/data";

export function TrustMarquee() {
  return (
    <section
      aria-label="Sectors served"
      className="border-y border-(--border-subtle) py-10"
    >
      <p className="eyebrow mb-7 text-center">
        Securing and servicing every sector
      </p>
      <Marquee speed={46}>
        {sectors.map((sector) => (
          <span
            key={sector}
            className="glass inline-flex shrink-0 items-center gap-2.5 rounded-full px-5 py-2.5 font-mono text-xs tracking-[0.14em] text-secondary uppercase transition-colors duration-300 hover:text-primary"
          >
            <span className="size-1.5 rounded-full bg-gradient-to-r from-(--accent-a) to-(--accent-c)" />
            {sector}
          </span>
        ))}
      </Marquee>
    </section>
  );
}
