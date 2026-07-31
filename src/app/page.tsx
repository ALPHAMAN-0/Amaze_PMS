import dynamic from "next/dynamic";
import { Hero } from "@/components/sections/home/Hero";
import { TrustMarquee } from "@/components/sections/home/TrustMarquee";
import { WhyAmaze } from "@/components/sections/home/WhyAmaze";
import { PresenceMap } from "@/components/sections/home/PresenceMap";
import { Testimonials } from "@/components/sections/home/Testimonials";
import { CtaBanner } from "@/components/sections/home/CtaBanner";

// The two GSAP scenes are the heaviest chunks — split them out (SSR stays on).
const StatsScene = dynamic(() =>
  import("@/components/sections/home/StatsScene").then((m) => m.StatsScene)
);
const ServicesRail = dynamic(() =>
  import("@/components/sections/home/ServicesRail").then((m) => m.ServicesRail)
);

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustMarquee />
      <StatsScene />
      <ServicesRail />
      <WhyAmaze />
      <PresenceMap />
      <Testimonials />
      <CtaBanner />
    </>
  );
}
