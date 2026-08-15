import ElectricalPreConstructionTemplate from "./ElectricalPreConstructionTemplate";
import { electricalHubPage } from "./electrical-service-data";
import { ServiceSchema } from "@/components/StructuredData";
import { seoMetadata } from "@/lib/phase3-metadata";

export const metadata = seoMetadata("services/electrical-contracting");
import "../pre-construction/pre-construction.css";
import "../service-hero.css";
import "./electrical-pre-construction-overrides.css";
import "../project-capabilities.css";

export default function ElectricalContractingPage() {
  return <><ServiceSchema name="Electrical Contracting" description={electricalHubPage.intro} url="/services/electrical-contracting" /><ElectricalPreConstructionTemplate page={electricalHubPage} isHub /></>;
}
