import type { Metadata } from "next";
import { MilestoneTimeline } from "@/components/sections/about/MilestoneTimeline";
import { TiltCard } from "@/components/sections/about/TiltCard";
import { CtaBanner } from "@/components/sections/home/CtaBanner";
import { MeshBlobs } from "@/components/graphics/MeshBlobs";
import { Icon } from "@/components/graphics/Icon";
import { GlassCard } from "@/components/ui/GlassCard";
import { Reveal } from "@/components/ui/Reveal";
import { Em, SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "About",
  description:
    "Founded in 2001 as part of the ACTION GROUP, Amaze PMS grew from a security firm into a fully in-house facility management company with 15,000+ people.",
  alternates: { canonical: "/about" },
};

const values = [
  "Respect",
  "Integrity",
  "Excellence",
  "Sustainability",
  "Customer Focus",
];

const welfare = [
  { value: "Insurance", label: "Group cover for every employee" },
  { value: "Education", label: "Rewards for employees' children" },
  { value: "Training", label: "A yearly calendar, every discipline" },
  { value: "Reserves", label: "Paid standby staff for every site" },
];

export default function AboutPage() {
  return (
    <>
      {/* hero */}
      <section className="relative overflow-hidden">
        <MeshBlobs />
        <div className="container-site relative pb-20 pt-36">
          <Reveal>
            <p className="eyebrow flex items-center gap-2.5">
              <span className="h-px w-8 bg-(--accent-solid)/60" />
              Since 2001 — an ACTION GROUP company
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="text-display mt-5 max-w-3xl font-bold text-primary">
              Built on <Em>discipline</Em>. Run on care.
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-7 max-w-xl text-lg text-secondary">
              Amaze began with security services in Hyderabad and grew, one
              in-house discipline at a time, into a company where 15,000+ people
              care for 20 million square feet.
            </p>
          </Reveal>
        </div>
      </section>

      {/* timeline */}
      <section aria-labelledby="journey-heading" className="bg-raised section-pad">
        <div className="container-site">
          <SectionHeading
            align="center"
            eyebrow="The journey"
            title={
              <span id="journey-heading">
                Two decades, one <Em>standard</Em>.
              </span>
            }
            className="mb-16"
          />
          <MilestoneTimeline />
        </div>
      </section>

      {/* mission / vision / values */}
      <section aria-labelledby="mission-heading" className="section-pad">
        <div className="container-site">
          <h2 id="mission-heading" className="sr-only">
            Mission, vision, and values
          </h2>
          <div className="grid gap-5 lg:grid-cols-2">
            <Reveal>
              <GlassCard className="h-full p-8 sm:p-10">
                <p className="eyebrow">Mission</p>
                <p className="mt-4 font-display text-2xl font-medium leading-snug text-primary">
                  Set the standard for property care in India — one property, one
                  team, one measurable outcome at a time.
                </p>
              </GlassCard>
            </Reveal>
            <Reveal delay={0.1}>
              <GlassCard className="h-full p-8 sm:p-10">
                <p className="eyebrow">Vision</p>
                <p className="mt-4 font-display text-2xl font-medium leading-snug text-primary">
                  Reliability, sustainability, and self-reliance — services built
                  in India, for India&apos;s landmark spaces.
                </p>
              </GlassCard>
            </Reveal>
          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-3">
            {values.map((value, i) => (
              <Reveal key={value} delay={i * 0.07} y={16}>
                <span className="glass inline-block rounded-full px-5 py-2.5 font-mono text-xs tracking-[0.14em] text-secondary uppercase">
                  {value}
                </span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* founder + people-first */}
      <section aria-labelledby="people-heading" className="bg-raised section-pad">
        <div className="container-site grid items-center gap-14 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
          <Reveal>
            <TiltCard>
              <GlassCard className="p-8 sm:p-10">
                <span className="grid size-16 place-items-center rounded-full bg-gradient-to-br from-(--accent-a) to-(--accent-c) font-display text-lg font-bold text-(--bg-base)">
                  SA
                </span>
                <h3 className="mt-6 font-display text-2xl font-semibold text-primary">
                  Subhani Abdul
                </h3>
                <p className="mt-1 font-mono text-xs tracking-[0.16em] text-muted uppercase">
                  Founder · Indian Navy veteran
                </p>
                <p className="mt-5 font-serif text-lg italic leading-relaxed text-secondary">
                  &ldquo;Service discipline, learned at sea, applied to every
                  square foot.&rdquo;
                </p>
                <p className="mt-4 text-sm leading-relaxed text-secondary">
                  A certified security practitioner, he built Amaze on a naval
                  principle: the crew comes first, and the ship stays sound.
                </p>
              </GlassCard>
            </TiltCard>
          </Reveal>

          <div>
            <SectionHeading
              eyebrow="People first"
              title={
                <span id="people-heading">
                  Retained people deliver better <Em>care</Em>.
                </span>
              }
              description="Facility work is people work. Amaze invests in the 15,000+ professionals who carry its standard onto every site."
            />
            <div className="mt-10 grid gap-5 sm:grid-cols-2">
              {welfare.map((item, i) => (
                <Reveal key={item.value} delay={i * 0.08}>
                  <GlassCard interactive className="p-6">
                    <p className="flex items-center gap-2.5 font-display text-xl font-semibold text-primary">
                      <Icon name="check" className="size-5 text-(--accent-a)" />
                      {item.value}
                    </p>
                    <p className="mt-2 text-sm text-secondary">{item.label}</p>
                  </GlassCard>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
