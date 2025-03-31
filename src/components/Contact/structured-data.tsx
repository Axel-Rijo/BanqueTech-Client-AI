export function RestaurantStructuredData() {
    const structuredData = {
        "@type": "Restaurant",
        "@context": "https://schema.org",
        name: "Savoria",
        image: "https://example.com/savoria-restaurant.jpg",
        address: {
            "@type": "PostalAddress",
            streetAddress: "123 Gourmet Avenue",
            addressLocality: "New York",
            addressRegion: "NY",
            postalCode: "10001",
            addressCountry: "US",
        },
        geo: {
            "@type": "GeoCoordinates",
            latitude: 40.71239,
            longitude: -74.00939,
        },
        url: "https://savoria.com",
        telephone: "+12125551234",
        servesCuisine: "Contemporary, Fine Dining, International",
        priceRange: "$$$",
        openingHoursSpecification: [
            {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday"],
                opens: "11:00",
                closes: "22:00",
            },
            {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: ["Friday", "Saturday"],
                opens: "11:00",
                closes: "23:00",
            },
            {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: "Sunday",
                opens: "12:00",
                closes: "21:00",
            },
        ],
        menu: "https://savoria.com/menu",
        acceptsReservations: "True",
    }

    return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
}

