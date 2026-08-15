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
import { FAQPageSchema } from "@/components/StructuredData";

const homeFaqs = [
  { question: "What types of projects do you specialize in?", answer: "Commercial, industrial, institutional, multi-family, and large residential construction projects." },
  { question: "Do you provide design-build services?", answer: "Yes. We manage planning, design coordination, and construction through one integrated team." },
  { question: "Can you manage the entire construction project?", answer: "Absolutely. We oversee planning, scheduling, coordination, construction, quality control, and project closeout." },
  { question: "Do you perform commercial renovations?", answer: "Yes. We complete office renovations, retail build-outs, tenant improvements, hospitality projects, and facility upgrades." },
  { question: "Do you offer emergency restoration services?", answer: "Yes. We provide restoration and reconstruction following fire, storm, water, and structural damage." },
  { question: "Can electrical services be included in my project?", answer: "Yes. Electrical contracting is available as part of our integrated construction services or as a standalone solution." },
  { question: "What areas do you serve?", answer: "We serve all 67 counties in Florida, with a primary base in Tampa Bay and surrounding regions." },
  { question: "How do you handle project budgeting?", answer: "We provide transparent estimates, track costs throughout the project, and work to keep your budget on target without compromising quality." },
  { question: "Do you offer warranties on your work?", answer: "Yes. We stand behind our work with comprehensive warranties and a commitment to client satisfaction." },
  { question: "How long does a typical project take?", answer: "Timelines vary based on scope and complexity. We'll provide a detailed schedule during the planning phase and keep you updated at every stage." },
];

export default function Home() {
  return (
    <>
      <FAQPageSchema faqs={homeFaqs} />
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
