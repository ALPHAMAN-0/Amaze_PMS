import { cn } from "@/lib/utils";
import { Reveal } from "@/components/ui/Reveal";

/** The single sanctioned accent treatment: one serif-italic gradient word per headline. */
export function Em({ children }: { children: React.ReactNode }) {
  return (
    <em className="text-gradient font-serif italic font-normal [font-size:1.06em]">
      {children}
    </em>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: string;
  align?: "left" | "center";
  className?: string;
}) {
  const centered = align === "center";
  return (
    <div className={cn("max-w-2xl", centered && "mx-auto text-center", className)}>
      {eyebrow && (
        <Reveal>
          <p className="eyebrow flex items-center gap-2.5">
            {!centered && <span className="h-px w-8 bg-(--accent-solid)/60" />}
            {eyebrow}
          </p>
        </Reveal>
      )}
      <Reveal delay={0.08}>
        <h2 className="text-h2 mt-4 font-semibold">{title}</h2>
      </Reveal>
      {description && (
        <Reveal delay={0.16}>
          <p className="mt-5 text-lg text-secondary">{description}</p>
        </Reveal>
      )}
    </div>
  );
}
