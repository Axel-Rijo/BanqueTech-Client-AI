// Mock data - in a real app, this would come from a database
export const featuresData = [
    {
        id: "happy-hour",
        type: "promotion",
        title: "Happy Hour Special",
        description:
            "50% off cocktails and appetizers, Mon-Fri, 4-6pm. Join us after work for the perfect way to unwind with colleagues and friends.",
        date: "Ongoing",
        image: "/images/happy-hour.jpg",
        badge: "Limited Time",
        category: "drinks",
    },
    {
        id: "wine-tasting",
        type: "event",
        title: "Wine Tasting Evening",
        description:
            "Premium Italian wines paired with chef-selected appetizers. Our sommelier will guide you through an exquisite selection of wines.",
        date: "June 15, 2025",
        time: "7:00 PM",
        image: "/images/wine-tasting.webp",
        badge: "Reservation Required",
        category: "drinks",
    },
    {
        id: "tasting-menu",
        type: "promotion",
        title: "Chef's Tasting Menu",
        description:
            "5-course menu with the finest local ingredients. Experience the culinary creativity of our executive chef with seasonal specialties.",
        date: "Weekends Only",
        image: "/images/chef-experience.jpg",
        badge: "New",
        category: "food",
    },
    {
        id: "jazz-night",
        type: "event",
        title: "Live Jazz Night",
        description:
            "Enjoy our resident jazz quartet with special evening menu. The perfect ambiance for a sophisticated night out.",
        date: "Every Thursday",
        time: "8:00 PM",
        image: "/images/jazz.jpg",
        badge: "Popular",
        category: "entertainment",
    },
    {
        id: "sunday-brunch",
        type: "promotion",
        title: "Sunday Brunch Buffet",
        description:
            "All-you-can-eat brunch with complimentary mimosa. Our extensive buffet features both breakfast classics and lunch favorites.",
        date: "Every Sunday",
        time: "10:00 AM - 2:00 PM",
        image: "/images/sunday-brunch-buffet.jpg",
        badge: "Family Friendly",
        category: "food",
    },
    {
        id: "cooking-class",
        type: "event",
        title: "Cooking Masterclass",
        description:
            "Learn to cook signature dishes with our head chef. Take home recipes and techniques to impress your friends and family.",
        date: "July 10, 2025",
        time: "6:00 PM",
        image: "/images/cooking-masterclass.jpg",
        badge: "Limited Spots",
        category: "workshop",
    },
    {
        id: "date-night",
        type: "promotion",
        title: "Date Night Package",
        description:
            "Special 3-course menu for two with wine pairing. The perfect romantic evening in an intimate setting.",
        date: "Friday & Saturday",
        image: "/images/date-night.jpg",
        badge: "Romantic",
        category: "food",
    },
    {
        id: "guest-chef",
        type: "event",
        title: "Guest Chef Weekend",
        description: "Renowned Chef Maria Santos brings her signature Mediterranean cuisine for a special weekend menu.",
        date: "August 5-7, 2025",
        image: "/images/chef.jpg",
        badge: "Special Guest",
        category: "food",
    },
]

export async function getAllFeatures() {
    // In a real app, this would fetch from an API or database
    return featuresData
}

export async function getFeatureById(id: string) {
    // In a real app, this would fetch from an API or database
    return featuresData.find((feature) => feature.id === id) || null
}

export async function getRelatedFeatures(currentId: string, category: string) {
    // In a real app, this would fetch from an API or database with more sophisticated logic
    return featuresData.filter((feature) => feature.id !== currentId && feature.category === category).slice(0, 3)
}

export function getSummaryFeatures() {
    const promotions = featuresData.filter((feature) => feature.type === 'promotion').slice(0, 2)
    const event = featuresData.filter((feature) => feature.type === 'event').slice(0, 2)

    return [...promotions, ...event]
}
