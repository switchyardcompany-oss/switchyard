import Hero from "@/components/Hero";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import RecentWorkSection from "@/components/RecentWorkSection";
import WhyKeentel from "@/components/WhyKeentel";
import IndustriesCarousel from "@/components/IndustriesCarousel";
import ProcessSection from "@/components/ProcessSection";
import ReviewCarousel from "@/components/ReviewCarousel";
import ServiceAreaMap from "@/components/ServiceAreaMap";
import CTASection from "@/components/CTASection";
import FAQSection from "@/components/FAQSection";

export default function Home() {
  return (
    <>
      <Hero />
       <AboutSection />
      <ServicesSection />
      <RecentWorkSection />
      <IndustriesCarousel />
      <ProcessSection />
      <ReviewCarousel />
      <ServiceAreaMap />
      <CTASection />
      <WhyKeentel />
      <FAQSection />
    </>
  );
}
