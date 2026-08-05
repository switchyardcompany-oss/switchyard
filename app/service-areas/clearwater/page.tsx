import CityServiceAreaPage, { type CityAreaConfig } from "@/components/CityServiceAreaPage";
import "../city-area.css";

const config: CityAreaConfig = {
  city: "Clearwater", county: "Pinellas County",
  title: "Clearwater construction projects",
  intro: <>Clearwater properties sit between a busy coastal visitor economy and established residential neighborhoods. Keentel helps owners protect schedules and investments with coordinated construction, remodeling, electrical, and emergency restoration services.</>,
  servicesSubtitle: "Whether the work is a hospitality refresh, a retail build-out, a home renovation, or storm recovery, we plan around Clearwater access, weather exposure, existing conditions, and the needs of the people using the property.",
  services: ["Commercial Remodeling", "General Construction", "Residential Remodeling", "Emergency Restoration", "Electrical Contracting", "Design-Build"],
  localHeading: "Construction planning that fits Clearwater conditions",
  localParagraphs: ["Clearwater projects can involve coastal weather, older building systems, high-traffic properties, and tight coordination with tenants or guests. We identify those factors before construction starts and keep the scope visible throughout delivery.", "Our Pinellas County experience helps owners coordinate permits, inspections, restoration documentation, and trade sequencing for both year-round properties and seasonal businesses."],
  communities: ["Clearwater", "Clearwater Beach", "Sand Key", "Safety Harbor", "Dunedin", "Largo", "Belleair", "Palm Harbor"],
  projects: [{ title: "Hospitality and vacation-property upgrades", text: "Renovations and repairs planned around guest experience, seasonal demand, access, and a dependable reopening date." }, { title: "Clearwater retail build-outs", text: "Lighting, electrical, finishes, tenant improvements, and construction coordination for active commercial corridors." }, { title: "Coastal home remodeling", text: "Residential improvements, additions, and repairs with attention to durability, moisture, and existing-property conditions." }],
  faqs: [{ question: "Do you remodel Clearwater Beach properties?", answer: "Yes. We review access, coastal exposure, building conditions, and the project schedule before planning renovations or repairs." }, { question: "Can you help with a hospitality renovation?", answer: "Yes. We can coordinate phased work, finishes, electrical upgrades, and turnover planning around guest and operating needs." }, { question: "Do you serve Safety Harbor and Dunedin?", answer: "Yes. We serve Clearwater and surrounding Pinellas County communities, including Safety Harbor, Dunedin, Largo, and Palm Harbor." }, { question: "What happens after storm or water damage?", answer: "We assess the affected areas, help document the scope, stabilize the property when needed, and coordinate a clear restoration and reconstruction plan." }],
};

export default function ClearwaterPage() { return <CityServiceAreaPage config={config} url="/service-areas/clearwater" />; }
