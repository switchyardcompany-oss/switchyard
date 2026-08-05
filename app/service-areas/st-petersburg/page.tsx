import CityServiceAreaPage, { type CityAreaConfig } from "@/components/CityServiceAreaPage";
import "../city-area.css";

const config: CityAreaConfig = {
  city: "St. Petersburg", county: "Pinellas County",
  title: "St. Petersburg construction projects",
  intro: <>St. Petersburg projects require a contractor who understands coastal exposure, older neighborhoods, and the pace of Pinellas County development. Keentel helps property owners plan and deliver work from beach-area repairs to commercial improvements near downtown.</>,
  servicesSubtitle: "From waterfront resilience and storm restoration to tenant improvements and residential renovations, our team coordinates the scope around St. Petersburg conditions, access, permitting, and schedule.",
  services: ["General Construction", "Commercial Remodeling", "Residential Remodeling", "Emergency Restoration", "Electrical Contracting", "Pre-Construction"],
  localHeading: "Local construction knowledge for St. Petersburg properties",
  localParagraphs: ["St. Petersburg combines coastal wind and flood considerations with established neighborhoods where access, staging, and existing conditions matter. We review those constraints before pricing the work.", "Our team coordinates Pinellas County permit requirements, storm-related documentation, and phased construction when a business or household must remain operational during the project."],
  communities: ["Downtown St. Petersburg", "Old Northeast", "Kenwood", "Clearwater-Largo Road", "Tyrone", "Gulfport", "South Pasadena", "St. Pete Beach"],
  projects: [{ title: "Waterfront property restoration", text: "Repair and rebuild scopes following wind or water damage, with clear documentation for owners and insurers." }, { title: "Downtown tenant improvements", text: "Office, retail, and hospitality upgrades planned around active buildings, limited access, and opening dates." }, { title: "Neighborhood home renovations", text: "Kitchen, bath, addition, and whole-home remodeling with careful coordination in established St. Petersburg communities." }],
  faqs: [{ question: "Do you handle coastal restoration in St. Petersburg?", answer: "Yes. We coordinate storm, water, and structural restoration scopes for coastal and inland properties, including documentation and reconstruction planning." }, { question: "Can you remodel an older St. Petersburg home?", answer: "Yes. We review existing conditions, access, structural needs, and permit requirements before developing a remodeling scope." }, { question: "Do you work near St. Pete Beach and Gulfport?", answer: "Yes. We serve St. Petersburg and nearby Pinellas County communities, subject to project scope and site access." }, { question: "Can commercial work be phased around operations?", answer: "Often. We build a sequence around access, safety, tenants, and the operating schedule established during pre-construction." }],
};

export default function StPetersburgPage() { return <CityServiceAreaPage config={config} url="/service-areas/st-petersburg" />; }
