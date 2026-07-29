import ElectricalPreConstructionTemplate from "./ElectricalPreConstructionTemplate";
import { electricalHubPage } from "./electrical-service-data";
import "../pre-construction/pre-construction.css";
import "../service-hero.css";
import "./electrical-pre-construction-overrides.css";
import "../project-capabilities.css";

export default function ElectricalContractingPage() {
  return <ElectricalPreConstructionTemplate page={electricalHubPage} isHub />;
}
