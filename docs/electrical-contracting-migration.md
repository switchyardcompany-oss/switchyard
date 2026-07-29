# Electrical Contracting Migration

## Route architecture

The hub and six child pages reuse the existing Pre-Construction page design system and are generated from one shared electrical template and one reviewed data source:

- Route: `app/services/electrical-contracting/[slug]/page.tsx`
- Shared page component: `app/services/electrical-contracting/ElectricalPreConstructionTemplate.tsx`
- Content and source mapping: `app/services/electrical-contracting/electrical-service-data.ts`
- Exact reference stylesheet: `app/services/pre-construction/pre-construction.css`
- Electrical media/FAQ overrides only: `app/services/electrical-contracting/electrical-pre-construction-overrides.css`

This keeps section order, dimensions, metadata, CTAs, trust badges, form block, cards, timeline, FAQs, and responsive behavior consistent with `/services/pre-construction`. Future electrical copy changes should be made in `electrical-service-data.ts`.

## Pages and old-site sources

| New page | Old source content |
| --- | --- |
| `/services/electrical-contracting/residential-services` | `/residential-services`, `/electrical-panel-upgrade-and-replacement`, `/standby-generators`, `/portable-power`, `/ev-chargers`, `/battery-storage` |
| `/services/electrical-contracting/commercial-services` | `/services/commercial-electrical-services` |
| `/services/electrical-contracting/industrial-services` | `/industrial-services` |
| `/services/electrical-contracting/electrical-engineering-services` | `/electrical-engineering-services` |
| `/services/electrical-contracting/troubleshooting-repairs` | `/24/7-troubleshooting-repairs` |
| `/services/electrical-contracting/projects-capabilities` | `/projects-and-capabilities` |

All source paths above are on `https://www.keentelelectricalcontractors.com`.

## Old-site images selected

| New page | Images used |
| --- | --- |
| Residential Services | `residential-inspections.jpg` |
| Commercial Services | `commercial-construction.jpg`, `commercial-maintenance.jpg` |
| Industrial Services | `project-industrial.jpg`, `industrial-equipment-wiring.jpg` |
| Electrical Engineering Services | No old-site hero selected; existing new-site `electrical-contracting.webp` plus old `emergency-power.jpg` |
| 24/7 Troubleshooting & Repairs | `electrical-maintenance.jpg`, `commercial-maintenance.jpg` |
| Projects & Capabilities | `project-office.jpg`, `project-hospitality.jpg` |

Additional reviewed assets are stored in `public/images/electrical-services/` for future approved use. Capability imagery is not presented as a verified Keentel project portfolio.

## Recommended replacement images

Obtain client-approved, high-resolution images for:

- electrical engineering drawings, calculations, or coordinated plans;
- an emergency electrical troubleshooting field response;
- EV charger installation;
- standby generator and automatic transfer switch installation;
- battery-storage installation;
- smart-home electrical controls;
- portable power and transfer-switch work.

## Content safeguards

- No financing offer was migrated.
- No project, customer, certification, response-time, equipment-brand, or technical-performance claim was added without verification.
- License presentation remains `Florida Licenses: CGC1524228 • EC13014476`.
- The old Electrical Contractors website was used read-only and was not edited.
