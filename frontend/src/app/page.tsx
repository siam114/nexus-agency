import { Hero } from "@/components/sections/Hero";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { Services } from "@/components/sections/Services";
import { Projects } from "@/components/sections/Projects";
import { Process } from "@/components/sections/Process";
import { Team } from "@/components/sections/Team";
import { Testimonials } from "@/components/sections/Testimonials";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { CtaBanner } from "@/components/sections/CtaBanner";

export default function Home() {
  return (
    <>
      {/* Section 2: Hero — High-Impact First Impression */}
      <Hero />

      {/* Section 3: Trust and Capability Strip */}
      <TrustStrip />

      {/* Section 4: Services */}
      <Services />

      {/* Section 5: Featured Portfolio */}
      <Projects />

      {/* Section 6: How We Work */}
      <Process />

      {/* Section 7: Team Showcase */}
      <Team />

      {/* Section 8: Client Testimonials */}
      <Testimonials />

      {/* Section 9: Why Choose Us */}
      <WhyChooseUs />

      {/* Section 10: Final CTA Banner */}
      <CtaBanner />
    </>
  );
}
