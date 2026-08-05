import CityServiceAreaPage, { type CityAreaConfig } from "@/components/CityServiceAreaPage";
import "../city-area.css";

const config: CityAreaConfig = {
  city: "Brandon", county: "Hillsborough County",
  title: "Brandon construction projects",
  intro: <>Brandon is a fast-growing community where homes, retail corridors, medical offices, and commercial facilities often evolve at the same time. Keentel brings one accountable team to additions, renovations, new construction, and urgent property recovery.</>,
  servicesSubtitle: "We help Brandon owners move from a clear scope to a buildable plan, coordinating inspections, trades, budgets, and schedules for occupied homes and active commercial properties.",
  services: ["General Construction", "Design-Build", "Commercial Remodeling", "Residential Remodeling", "Electrical Contracting", "Emergency Restoration"],
  localHeading: "A practical construction partner for Brandon growth",
  localParagraphs: ["Brandon projects frequently involve occupied properties, expanding families, active retail centers, and facilities that cannot afford extended downtime. Our planning focuses on phasing, access, and communication from the first visit.", "We coordinate Hillsborough County requirements and help owners make decisions early about drainage, utilities, structural changes, finishes, and electrical capacity so the project can move forward with fewer surprises."],
  communities: ["Brandon", "Seffner", "Valrico", "Bloomingdale", "Riverview", "FishHawk", "Lithia", "East Tampa"],
  projects: [{ title: "Family home additions", text: "New living areas, kitchen expansions, and structural improvements designed around the way Brandon families use their homes." }, { title: "Retail and medical improvements", text: "Build-outs, renovations, and electrical upgrades coordinated around tenants, patients, customers, and opening schedules." }, { title: "Storm and water recovery", text: "Fast assessment, stabilization, and reconstruction planning for homes and businesses after property damage." }],
  faqs: [{ question: "Do you build additions in Brandon?", answer: "Yes. We manage planning, structural work, permitting, and construction for home additions and larger residential improvements." }, { question: "Can you work in occupied commercial buildings?", answer: "Yes. We can phase work around tenants, customers, and operating requirements when site conditions allow." }, { question: "Do you serve Valrico and Riverview from Brandon?", answer: "Yes. Brandon is part of our Hillsborough County service coverage, including nearby communities such as Valrico and Riverview." }, { question: "Do you provide electrical work with remodeling?", answer: "Yes. Our licensed electrical capabilities can be coordinated with remodeling, additions, equipment, lighting, and service upgrades." }],
};

export default function BrandonPage() { return <CityServiceAreaPage config={config} url="/service-areas/brandon" />; }
