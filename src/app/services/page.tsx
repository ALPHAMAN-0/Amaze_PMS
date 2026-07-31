import type { Metadata } from "next";
import { ServicesNav } from "@/components/sections/services/ServicesNav";
import { ServiceDetailList } from "@/components/sections/services/ServiceDetailList";
import { CtaBanner } from "@/components/sections/home/CtaBanner";
import { ServiceOrbit } from "@/components/graphics/ServiceOrbit";
import { MeshBlobs } from "@/components/graphics/MeshBlobs";
import { Reveal } from "@/components/ui/Reveal";
import { Em } from "@/components/ui/SectionHeading";
import { services } from "@/lib/data";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Seven fully in-house disciplines — security, housekeeping, technical (MEP), landscaping, pest control, help desk, and parking management.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <section className="relative overflow-hidden">
        <MeshBlobs />
        <div className="container-site relative grid items-center gap-10 pb-16 pt-36 lg:grid-cols-[1.3fr_1fr]">
          <div>
            <Reveal>
              <p className="eyebrow flex items-center gap-2.5">
                <span className="h-px w-8 bg-(--accent-solid)/60" />
                Services
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <h1 className="text-h2 mt-4 font-semibold">
                Every discipline, under <Em>one</Em> roof.
              </h1>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-5 max-w-xl text-lg text-secondary">
                Seven in-house teams, one accountable standard. No
                subcontractors, no finger-pointing — just a property that works.
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.2}>
            <ServiceOrbit
              ambient
              items={services.map((s) => ({ icon: s.icon, title: s.title }))}
              className="mx-auto hidden w-full max-w-[300px] lg:block"
            />
          </Reveal>
        </div>
      </section>

      <ServicesNav />
      <ServiceDetailList />
      <CtaBanner />
    </>
  );
}
