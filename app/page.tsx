import Site from "@/components/Site";
import { contact, priceMenu } from "@/lib/data";

// Structured data so search engines can show the salon, hours and prices.
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "BeautySalon",
  name: "Dimera",
  description:
    "A ladies' beauty salon in Jumeirah Village Circle, Dubai — nails, lashes, brows, threading and hair.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Al Abeir, Shop No. 6, Jumeirah Village Circle",
    addressLocality: "Dubai",
    addressCountry: "AE",
  },
  hasMap: contact.mapsUrl,
  priceRange: "AED 15 – 300",
  currenciesAccepted: "AED",
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      opens: "10:00",
      closes: "10:00",
    },
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Price Menu",
    itemListElement: priceMenu.map((group) => ({
      "@type": "OfferCatalog",
      name: group.title,
      itemListElement: group.items.map((item) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: item.name },
        // Only exact prices; ranges and "from" prices stay descriptive.
        ...(/^\d+$/.test(item.price) && {
          price: item.price,
          priceCurrency: "AED",
        }),
      })),
    })),
  },
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <Site />
    </>
  );
}
