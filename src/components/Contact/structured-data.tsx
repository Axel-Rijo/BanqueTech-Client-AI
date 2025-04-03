import { getAllBranches } from "@/lib/branch-data";

export function RestaurantStructuredData() {
  const allBranches = getAllBranches();

  // Create the main restaurant entity
  const mainEntity = {
    "@type": "Restaurant",
    "@context": "https://schema.org",
    "@id": "https://savoria.com/#restaurant",
    name: "Savoria",
    url: "https://savoria.com",
    servesCuisine: "Contemporary, Fine Dining, International",
    priceRange: "$$$",
    menu: "https://savoria.com/menu",
    acceptsReservations: "True",
  };

  // Create branch-specific structured data
  const branchEntities = allBranches.map((branch) => ({
    "@type": "Restaurant",
    "@id": `https://savoria.com/locations/${branch.id}`,
    name: `Savoria - ${branch.name}`,
    parentOrganization: {
      "@id": "https://savoria.com/#restaurant",
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: branch.address.split(",")[0],
      addressLocality: branch.address.split(",")[1]?.trim() || "",
      addressRegion: branch.address.split(",")[2]?.trim() || "",
      postalCode: branch.address.split(",")[3]?.trim() || "",
      addressCountry: "US",
    },
    geo: branch.coordinates
      ? {
          "@type": "GeoCoordinates",
          latitude: branch.coordinates.latitude,
          longitude: branch.coordinates.longitude,
        }
      : undefined,
    url: `https://savoria.com/locations/${branch.id}`,
    telephone: branch.phone,
    ...(branch.hours && {
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          opens: branch.hours.weekdays.split(" - ")[0],
          closes: branch.hours.weekdays.split(" - ")[1],
        },
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Saturday", "Sunday"],
          opens: branch.hours.weekends.split(" - ")[0],
          closes: branch.hours.weekends.split(" - ")[1],
        },
      ],
    }),
  }));

  // Combine all structured data
  const structuredData = [mainEntity, ...branchEntities];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
