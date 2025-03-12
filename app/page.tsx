import { HeroSection } from "@/components/hero-section";
import { FeaturedEquipment } from "@/components/featured-equipment";
import { HowItWorks } from "@/components/how-it-works";
import { Benefits } from "@/components/benefits";
import { Testimonials } from "@/components/testimonials";

export default function Home() {
  return (
    <div className="flex flex-col gap-16 pb-16">
      <HeroSection />
      <FeaturedEquipment />
      <HowItWorks />
      <Benefits />
      <Testimonials />
    </div>
  );
}
