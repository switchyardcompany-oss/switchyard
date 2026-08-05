export const businessId = "https://keentelgeneralcontractors.com/#organization";
export const contractorId = "https://keentelgeneralcontractors.com/#contractor";

export type FAQSchemaItem = { question: string; answer: string };

const businessAddress = {
  "@type": "PostalAddress",
  streetAddress: "400 North Ashley Drive, Suite 2600",
  addressLocality: "Tampa",
  addressRegion: "FL",
  postalCode: "33602",
  addressCountry: "US",
};

export function OrganizationSchema() {
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "Organization",
            "@id": businessId,
            name: "KEENTEL LLC",
            legalName: "KEENTEL LLC",
            url: "https://keentelgeneralcontractors.com/",
            logo: "https://keentelgeneralcontractors.com/images/header-logo.webp",
            telephone: "+1-813-395-0000",
            address: businessAddress,
          },
          {
            "@type": ["LocalBusiness", "GeneralContractor"],
            "@id": contractorId,
            name: "Keentel General Contractors",
            url: "https://keentelgeneralcontractors.com/",
            parentOrganization: { "@id": businessId },
            telephone: "+1-813-395-0000",
            address: businessAddress,
            areaServed: { "@type": "State", name: "Florida" },
            knowsAbout: ["General contracting", "Design-build construction", "Electrical contracting", "Commercial remodeling", "Emergency restoration"],
            identifier: [
              { "@type": "PropertyValue", name: "Florida General Contractor License", value: "CGC1524228" },
              { "@type": "PropertyValue", name: "Florida Electrical Contractor License", value: "EC13014476" },
            ],
          },
        ],
      }) }} />
  );
}

export function FAQPageSchema({ faqs }: { faqs: FAQSchemaItem[] }) {
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
      }) }} />
  );
}

export function ServiceSchema({ name, description, url }: { name: string; description: string; url: string }) {
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Service",
        name,
        description,
        url: `https://keentelgeneralcontractors.com${url}`,
        provider: { "@id": contractorId },
        areaServed: { "@type": "State", name: "Florida" },
        serviceType: name,
      }) }} />
  );
}

export function LocalBusinessSchema({ city, description, url }: { city: string; description: string; url: string }) {
  const cityId = `https://keentelgeneralcontractors.com${url}#local-business`;
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": ["LocalBusiness", "GeneralContractor"],
      "@id": cityId,
      name: `Keentel General Contractors - ${city}`,
      description,
      url: `https://keentelgeneralcontractors.com${url}`,
      telephone: "+1-813-395-0000",
      parentOrganization: { "@id": contractorId },
      address: {
        "@type": "PostalAddress",
        streetAddress: "400 North Ashley Drive, Suite 2600",
        addressLocality: "Tampa",
        addressRegion: "FL",
        postalCode: "33602",
        addressCountry: "US",
      },
      areaServed: { "@type": "City", name: city, containedInPlace: { "@type": "State", name: "Florida" } },
      priceRange: "$$",
    }) }} />
  );
}
