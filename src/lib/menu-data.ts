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

export function getMenuCategories(): MenuCategory[] {
    return [
        { id: "starters", name: "Starters" },
        { id: "mains", name: "Main Courses" },
        { id: "sides", name: "Side Dishes" },
        { id: "desserts", name: "Desserts" },
        { id: "drinks", name: "Drinks" },
    ]
}

const allMenuItems: MenuItem[] = [
    {
        id: "1",
        name: "Classic Bruschetta",
        description: "Toasted bread rubbed with garlic and topped with diced tomatoes, fresh basil, and olive oil",
        price: 8.99,
        image: "/placeholder.svg?height=200&width=300",
        category: "starters",
        branches: ["downtown", "uptown", "riverside", "beachside"],
        dietary: ["Vegetarian"],
    },
    {
        id: "2",
        name: "Spicy Buffalo Wings",
        description: "Crispy chicken wings tossed in our signature spicy buffalo sauce, served with blue cheese dip",
        price: 12.99,
        image: "/placeholder.svg?height=200&width=300",
        category: "starters",
        branches: ["downtown", "uptown"],
        isSpicy: true,
    },
    {
        id: "3",
        name: "Truffle Fries",
        description: "Hand-cut fries tossed with truffle oil, parmesan cheese, and fresh herbs",
        price: 7.99,
        image: "/placeholder.svg?height=200&width=300",
        category: "sides",
        branches: ["downtown", "riverside"],
        dietary: ["Vegetarian"],
    },
    {
        id: "4",
        name: "Grilled Salmon",
        description: "Fresh Atlantic salmon grilled to perfection, served with seasonal vegetables and lemon butter sauce",
        price: 24.99,
        image: "/placeholder.svg?height=200&width=300",
        category: "mains",
        branches: ["riverside", "beachside"],
        dietary: ["Gluten-Free"],
    },
    {
        id: "5",
        name: "Filet Mignon",
        description: "8oz prime beef tenderloin, cooked to your liking, served with garlic mashed potatoes and asparagus",
        price: 34.99,
        image: "/placeholder.svg?height=200&width=300",
        category: "mains",
        branches: ["downtown", "uptown"],
    },
    {
        id: "6",
        name: "Vegetable Stir Fry",
        description: "Seasonal vegetables stir-fried with aromatic spices and served over steamed rice",
        price: 16.99,
        image: "/placeholder.svg?height=200&width=300",
        category: "mains",
        branches: ["downtown", "uptown", "riverside"],
        dietary: ["Vegetarian", "Vegan"],
    },
    {
        id: "7",
        name: "Tiramisu",
        description: "Traditional Italian dessert with layers of coffee-soaked ladyfingers and mascarpone cream",
        price: 8.99,
        image: "/placeholder.svg?height=200&width=300",
        category: "desserts",
        branches: ["downtown", "uptown", "riverside", "beachside"],
        dietary: ["Vegetarian"],
    },
    {
        id: "8",
        name: "Chocolate Lava Cake",
        description: "Warm chocolate cake with a molten center, served with vanilla ice cream",
        price: 9.99,
        image: "/placeholder.svg?height=200&width=300",
        category: "desserts",
        branches: ["downtown", "riverside"],
        dietary: ["Vegetarian"],
    },
    {
        id: "9",
        name: "Craft Beer Flight",
        description: "Sample four of our rotating local craft beers",
        price: 12.99,
        image: "/placeholder.svg?height=200&width=300",
        category: "drinks",
        branches: ["downtown", "uptown"],
    },
    {
        id: "10",
        name: "Signature Mojito",
        description: "Fresh mint, lime, sugar, rum, and soda water, garnished with lime wedge",
        price: 10.99,
        image: "/placeholder.svg?height=200&width=300",
        category: "drinks",
        branches: ["riverside", "beachside"],
    },
    {
        id: "11",
        name: "Seafood Paella",
        description: "Traditional Spanish rice dish with shrimp, mussels, clams, and chorizo",
        price: 28.99,
        image: "/placeholder.svg?height=200&width=300",
        category: "mains",
        branches: ["beachside"],
        isNew: true,
    },
    {
        id: "12",
        name: "Nashville Hot Chicken Sandwich",
        description:
            "Crispy fried chicken breast coated in Nashville hot sauce, served on a brioche bun with pickles and slaw",
        price: 16.99,
        image: "/placeholder.svg?height=200&width=300",
        category: "mains",
        branches: ["downtown", "uptown"],
        isSpicy: true,
        isNew: true,
    },
]

export function getBranchMenu(branch: Branch): MenuItem[] {
    return allMenuItems.filter((item) => item.branches.includes(branch))
}

