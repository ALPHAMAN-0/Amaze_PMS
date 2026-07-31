import { GridBeams } from "@/components/graphics/GridBeams";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Reveal } from "@/components/ui/Reveal";
import { Em } from "@/components/ui/SectionHeading";
import { siteConfig } from "@/lib/data";

export function CtaBanner() {
  return (
    <section aria-labelledby="cta-heading" className="section-pad">
      <div className="container-site">
        <Reveal>
          <div className="conic-ring glass relative overflow-hidden rounded-3xl p-10 text-center sm:p-16 lg:p-20">
            <GridBeams className="opacity-50" />
            <div className="relative">
              <p className="eyebrow flex justify-center">Free site assessment</p>
              <h2
                id="cta-heading"
                className="text-h2 mx-auto mt-4 max-w-2xl font-semibold"
              >
                Let&apos;s walk your property <Em>together</Em>.
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-lg text-secondary">
                A senior operations lead will visit, assess, and hand you a
                costed service plan — free, within 48 hours.
              </p>
              <div className="mt-9 flex flex-col items-center justify-center gap-5 sm:flex-row">
                <MagneticButton href="/contact">
                  Book a Site Assessment
                </MagneticButton>
                <a
                  href={siteConfig.contact.phoneHref}
                  className="font-mono text-sm text-secondary transition-colors hover:text-primary"
                >
                  {siteConfig.contact.phone}
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
