import { IndiaDotMap } from "@/components/graphics/IndiaDotMap";
import { GlassCard } from "@/components/ui/GlassCard";
import { Reveal } from "@/components/ui/Reveal";
import { Em, SectionHeading } from "@/components/ui/SectionHeading";

const tiles = [
  {
    value: "200+",
    label: "Client properties",
    caption: "IT parks to gated communities",
  },
  {
    value: "5",
    label: "States",
    caption: "Operations across South and West India",
  },
  {
    value: "10+",
    label: "Sectors served",
    caption: "From pharma plants to hotels",
  },
  {
    value: "24×7",
    label: "Operations cover",
    caption: "Shifts, reserves, and escalation paths",
  },
];

export function PresenceMap() {
  return (
    <section aria-labelledby="presence-heading" className="section-pad">
      <div className="container-site">
        <SectionHeading
          align="center"
          eyebrow="Where we operate"
          title={
            <span id="presence-heading">
              Trusted across <Em>five</Em> states.
            </span>
          }
        />

        <div className="mt-16 grid items-center gap-14 lg:grid-cols-[1fr_1.1fr]">
          <Reveal>
            <IndiaDotMap className="mx-auto w-full max-w-[400px]" />
          </Reveal>

          <div className="grid gap-5 sm:grid-cols-2">
            {tiles.map((tile, i) => (
              <Reveal key={tile.label} delay={i * 0.08}>
                <GlassCard interactive className="p-7">
                  <p className="font-display text-4xl font-bold tracking-tight text-primary">
                    {tile.value}
                  </p>
                  <p className="mt-2.5 text-sm font-medium text-primary">
                    {tile.label}
                  </p>
                  <p className="mt-1 text-sm text-muted">{tile.caption}</p>
                </GlassCard>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
