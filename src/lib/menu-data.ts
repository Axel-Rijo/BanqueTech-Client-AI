export type Branch = "downtown" | "uptown" | "riverside" | "beachside"

export interface BranchInfo {
    id: Branch
    name: string
    address: string
    phone?: string
    hours?: {
        weekdays: string
        weekends: string
    }
}

export interface MenuCategory {
    id: string
    name: string
}

export interface MenuItem {
    id: string
    name: string
    description: string
    price: number
    image?: string
    category: string
    branches: Branch[]
    isNew?: boolean
    isSpicy?: boolean
    dietary?: string[]
}

export function getMenuCategories(): MenuCategory[] {
    return [
        { id: "starters", name: "Starters" },
        { id: "mains", name: "Main Courses" },
        { id: "sides", name: "Side Dishes" },
        { id: "desserts", name: "Desserts" },
        { id: "drinks", name: "Drinks" },
    ]
}



