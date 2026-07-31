import type { Metadata } from "next";
import { ContactForm } from "@/components/sections/contact/ContactForm";
import { ContactInfo } from "@/components/sections/contact/ContactInfo";
import { MeshBlobs } from "@/components/graphics/MeshBlobs";
import { Reveal } from "@/components/ui/Reveal";
import { Em } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Book a free site assessment — a senior Amaze operations lead will visit, assess, and hand you a costed service plan within 48 hours.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <div className="relative overflow-hidden">
      <MeshBlobs />
      <div className="container-site relative pb-24 pt-36 md:pb-32">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
          <div>
            <Reveal>
              <p className="eyebrow flex items-center gap-2.5">
                <span className="h-px w-8 bg-(--accent-solid)/60" />
                Contact
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <h1 className="text-h2 mt-4 font-semibold">
                Start with a <Em>conversation</Em>.
              </h1>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-5 max-w-md text-lg text-secondary">
                Tell us about your property and we&apos;ll come see it. The
                assessment is free, the plan is costed, and there&apos;s no
                obligation.
              </p>
            </Reveal>
            <Reveal delay={0.24} className="mt-10">
              <ContactInfo />
            </Reveal>
          </div>

          <Reveal delay={0.15}>
            <div className="glass rounded-3xl p-6 sm:p-10">
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
