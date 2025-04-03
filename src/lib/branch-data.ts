export interface BranchInfo {
    id: string
    name: string
    address: string
    phone?: string
    hours?: {
        weekdays: string
        weekends: string
    }
}

export type Branch = "downtown" | "uptown" | "riverside" | "beachside"

// This would typically come from an API or database
export function getAllBranches(): BranchInfo[] {
    return [
        {
            id: "downtown",
            name: "Downtown Location",
            address: "123 Main St, Downtown, New York, NY 10001",
            phone: "(212) 555-1234",
            hours: {
                weekdays: "11:00 AM - 10:00 PM",
                weekends: "10:00 AM - 11:00 PM",
            },
        },
        {
            id: "uptown",
            name: "Uptown Location",
            address: "456 Park Ave, Upper Manhattan, New York, NY 10028",
            phone: "(212) 555-5678",
            hours: {
                weekdays: "11:00 AM - 9:30 PM",
                weekends: "10:30 AM - 10:30 PM",
            },
        },
        {
            id: "riverside",
            name: "Riverside Location",
            address: "789 River Rd, Jersey City, NJ 07310",
            phone: "(201) 555-9012",
            hours: {
                weekdays: "11:30 AM - 9:00 PM",
                weekends: "11:00 AM - 10:00 PM",
            },
        },
        {
            id: "beachside",
            name: "Beachside Location",
            address: "101 Ocean Dr, Rockaway Beach, NY 11693",
            phone: "(718) 555-3456",
            hours: {
                weekdays: "12:00 PM - 9:00 PM",
                weekends: "10:00 AM - 11:00 PM",
            },
        },
    ]
}

