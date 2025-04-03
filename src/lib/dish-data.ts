import type { MenuItem } from "./menu-data"

export interface DishOption {
    id: string
    name: string
}

export interface DishAddOn {
    id: string
    name: string
    price: number
}

export interface DishDetails extends MenuItem {
    cookingOptions?: DishOption[]
    sideOptions?: DishOption[]
    addOns?: DishAddOn[]
    ingredients?: string[]
    allergens?: {
        contains: string[]
        mayContain?: string[]
        freeFrom?: string[]
    }
    nutritionFacts?: {
        calories: number
        protein: number
        carbs: number
        fat: number
    }
    preparationTime?: number // in minutes
}

// This would typically come from an API or database
export function getDishDetails(id: string): DishDetails | null {
    const dish = dishDetails.find((item) => item.id === id)
    return dish || null
}

const dishDetails: DishDetails[] = [
    {
        id: "1",
        name: "Classic Bruschetta",
        description: "Toasted bread rubbed with garlic and topped with diced tomatoes, fresh basil, and olive oil",
        price: 8.99,
        image: "/placeholder.svg?height=400&width=400",
        category: "starters",
        branches: ["downtown", "uptown", "riverside", "beachside"],
        dietary: ["Vegetarian"],
        ingredients: [
            "Toasted bread",
            "Fresh garlic",
            "Ripe tomatoes",
            "Fresh basil",
            "Extra virgin olive oil",
            "Sea salt",
            "Black pepper",
        ],
        allergens: {
            contains: ["Wheat (bread)", "Garlic"],
            mayContain: [],
            freeFrom: [],
        },
        nutritionFacts: {
            calories: 180,
            protein: 4,
            carbs: 22,
            fat: 8,
        },
        preparationTime: 15,
        addOns: [
            { id: "balsamic", name: "Balsamic Glaze", price: 0.99 },
            { id: "cheese", name: "Parmesan Cheese", price: 1.49 },
        ],
    },
    {
        id: "2",
        name: "Spicy Buffalo Wings",
        description: "Crispy chicken wings tossed in our signature spicy buffalo sauce, served with blue cheese dip",
        price: 12.99,
        image: "/placeholder.svg?height=400&width=400",
        category: "starters",
        branches: ["downtown", "uptown"],
        isSpicy: true,
        cookingOptions: [
            { id: "extra-crispy", name: "Extra Crispy" },
            { id: "regular", name: "Regular" },
        ],
        sideOptions: [
            { id: "celery", name: "Celery Sticks" },
            { id: "carrot", name: "Carrot Sticks" },
            { id: "both", name: "Both Celery & Carrot" },
        ],
        addOns: [
            { id: "extra-sauce", name: "Extra Buffalo Sauce", price: 1.49 },
            { id: "ranch", name: "Ranch Dressing", price: 0.99 },
        ],
        ingredients: [
            "Chicken wings",
            "Buffalo sauce (hot sauce, butter, vinegar, spices)",
            "Blue cheese dip",
            "Celery",
            "Carrot",
        ],
        allergens: {
            contains: ["Dairy", "Egg"],
            mayContain: [],
            freeFrom: [],
        },
        nutritionFacts: {
            calories: 450,
            protein: 28,
            carbs: 6,
            fat: 35,
        },
        preparationTime: 20,
    },
    {
        id: "3",
        name: "Truffle Fries",
        description: "Hand-cut fries tossed with truffle oil, parmesan cheese, and fresh herbs",
        price: 7.99,
        image: "/placeholder.svg?height=400&width=400",
        category: "sides",
        branches: ["downtown", "riverside"],
        dietary: ["Vegetarian"],
        sideOptions: [
            { id: "regular", name: "Regular Cut" },
            { id: "thin", name: "Thin Cut" },
        ],
        addOns: [
            { id: "extra-cheese", name: "Extra Parmesan", price: 1.49 },
            { id: "aioli", name: "Garlic Aioli", price: 0.99 },
        ],
        ingredients: ["Potatoes", "Truffle oil", "Parmesan cheese", "Fresh herbs (parsley, thyme)", "Sea salt"],
        allergens: {
            contains: ["Dairy"],
            mayContain: [],
            freeFrom: [],
        },
        nutritionFacts: {
            calories: 320,
            protein: 6,
            carbs: 38,
            fat: 16,
        },
        preparationTime: 15,
    },
    {
        id: "4",
        name: "Grilled Salmon with Lemon Butter",
        description: "Fresh Atlantic salmon fillet grilled to perfection and served with our signature lemon butter sauce.",
        price: 24.99,
        image: "/placeholder.svg?height=400&width=400",
        category: "mains",
        branches: ["riverside", "beachside"],
        dietary: ["Gluten-Free", "High Protein", "Pescatarian"],
        cookingOptions: [
            { id: "rare", name: "Rare" },
            { id: "medium-rare", name: "Medium Rare" },
            { id: "medium", name: "Medium" },
            { id: "well-done", name: "Well Done" },
        ],
        sideOptions: [
            { id: "roasted-potatoes", name: "Roasted Potatoes" },
            { id: "wild-rice", name: "Wild Rice" },
            { id: "steamed-vegetables", name: "Steamed Vegetables" },
        ],
        addOns: [
            { id: "extra-sauce", name: "Extra Lemon Butter Sauce", price: 1.99 },
            { id: "avocado", name: "Add Avocado", price: 2.99 },
            { id: "garlic-bread", name: "Garlic Bread (2 pieces)", price: 3.99 },
        ],
        ingredients: [
            "Atlantic salmon fillet",
            "Lemon butter sauce (butter, lemon juice, garlic, herbs)",
            "Olive oil",
            "Sea salt",
            "Black pepper",
            "Fresh herbs",
        ],
        allergens: {
            contains: ["Fish", "Dairy"],
            mayContain: ["Shellfish"],
            freeFrom: ["Gluten", "Nuts", "Eggs", "Soy"],
        },
        nutritionFacts: {
            calories: 420,
            protein: 38,
            carbs: 2,
            fat: 28,
        },
        preparationTime: 25,
    },
    {
        id: "5",
        name: "Filet Mignon",
        description: "8oz prime beef tenderloin, cooked to your liking, served with garlic mashed potatoes and asparagus",
        price: 34.99,
        image: "/placeholder.svg?height=400&width=400",
        category: "mains",
        branches: ["downtown", "uptown"],
        dietary: ["High Protein"],
        cookingOptions: [
            { id: "rare", name: "Rare" },
            { id: "medium-rare", name: "Medium Rare" },
            { id: "medium", name: "Medium" },
            { id: "medium-well", name: "Medium Well" },
            { id: "well-done", name: "Well Done" },
        ],
        sideOptions: [
            { id: "mashed-potatoes", name: "Garlic Mashed Potatoes" },
            { id: "baked-potato", name: "Baked Potato" },
            { id: "fries", name: "Truffle Fries" },
        ],
        addOns: [
            { id: "blue-cheese", name: "Blue Cheese Crust", price: 3.99 },
            { id: "mushroom-sauce", name: "Mushroom Sauce", price: 2.99 },
            { id: "lobster-tail", name: "Lobster Tail", price: 15.99 },
        ],
        ingredients: [
            "8oz Prime beef tenderloin",
            "Garlic",
            "Butter",
            "Fresh herbs (rosemary, thyme)",
            "Sea salt",
            "Black pepper",
            "Asparagus",
            "Potatoes",
        ],
        allergens: {
            contains: ["Dairy"],
            mayContain: [],
            freeFrom: [],
        },
        nutritionFacts: {
            calories: 580,
            protein: 42,
            carbs: 18,
            fat: 38,
        },
        preparationTime: 30,
    },
    {
        id: "6",
        name: "Vegetable Stir Fry",
        description: "Seasonal vegetables stir-fried with aromatic spices and served over steamed rice",
        price: 16.99,
        image: "/placeholder.svg?height=400&width=400",
        category: "mains",
        branches: ["downtown", "uptown", "riverside"],
        dietary: ["Vegetarian", "Vegan"],
        sideOptions: [
            { id: "white-rice", name: "White Rice" },
            { id: "brown-rice", name: "Brown Rice" },
            { id: "quinoa", name: "Quinoa" },
        ],
        addOns: [
            { id: "tofu", name: "Add Tofu", price: 2.99 },
            { id: "tempeh", name: "Add Tempeh", price: 3.49 },
            { id: "extra-spicy", name: "Extra Spicy", price: 0.99 },
        ],
        ingredients: [
            "Bell peppers",
            "Broccoli",
            "Carrots",
            "Snow peas",
            "Mushrooms",
            "Onions",
            "Garlic",
            "Ginger",
            "Soy sauce",
            "Sesame oil",
            "Rice or quinoa",
        ],
        allergens: {
            contains: ["Soy", "Sesame"],
            mayContain: [],
            freeFrom: [],
        },
        nutritionFacts: {
            calories: 320,
            protein: 10,
            carbs: 45,
            fat: 12,
        },
        preparationTime: 20,
    },
    {
        id: "7",
        name: "Tiramisu",
        description: "Traditional Italian dessert with layers of coffee-soaked ladyfingers and mascarpone cream",
        price: 8.99,
        image: "/placeholder.svg?height=400&width=400",
        category: "desserts",
        branches: ["downtown", "uptown", "riverside", "beachside"],
        dietary: ["Vegetarian"],
        addOns: [
            { id: "chocolate-sauce", name: "Chocolate Sauce", price: 0.99 },
            { id: "whipped-cream", name: "Extra Whipped Cream", price: 0.99 },
        ],
        ingredients: [
            "Ladyfinger cookies",
            "Espresso coffee",
            "Mascarpone cheese",
            "Eggs",
            "Sugar",
            "Cocoa powder",
            "Marsala wine (optional)",
        ],
        allergens: {
            contains: ["Dairy", "Eggs", "Wheat"],
            mayContain: ["Alcohol"],
            freeFrom: [],
        },
        nutritionFacts: {
            calories: 350,
            protein: 6,
            carbs: 32,
            fat: 22,
        },
        preparationTime: 15,
    },
    {
        id: "8",
        name: "Chocolate Lava Cake",
        description: "Warm chocolate cake with a molten center, served with vanilla ice cream",
        price: 9.99,
        image: "/placeholder.svg?height=400&width=400",
        category: "desserts",
        branches: ["downtown", "riverside"],
        dietary: ["Vegetarian"],
        addOns: [
            { id: "extra-ice-cream", name: "Extra Scoop of Ice Cream", price: 1.99 },
            { id: "berries", name: "Fresh Berries", price: 2.49 },
            { id: "caramel", name: "Caramel Sauce", price: 0.99 },
        ],
        ingredients: ["Dark chocolate", "Butter", "Eggs", "Sugar", "Flour", "Vanilla ice cream"],
        allergens: {
            contains: ["Dairy", "Eggs", "Wheat"],
            mayContain: [],
            freeFrom: [],
        },
        nutritionFacts: {
            calories: 420,
            protein: 7,
            carbs: 48,
            fat: 24,
        },
        preparationTime: 18,
    },
    {
        id: "9",
        name: "Craft Beer Flight",
        description: "Sample four of our rotating local craft beers",
        price: 12.99,
        image: "/placeholder.svg?height=400&width=400",
        category: "drinks",
        branches: ["downtown", "uptown"],
        sideOptions: [
            { id: "pretzel", name: "Soft Pretzel" },
            { id: "nuts", name: "Mixed Nuts" },
            { id: "none", name: "No Side" },
        ],
        ingredients: [
            "Selection of four 4oz local craft beers",
            "May include: IPA, Stout, Lager, Wheat Beer, Pale Ale, or Seasonal Selection",
        ],
        allergens: {
            contains: ["Gluten", "Barley", "Wheat"],
            mayContain: [],
            freeFrom: [],
        },
        nutritionFacts: {
            calories: 380,
            protein: 3,
            carbs: 32,
            fat: 0,
        },
        preparationTime: 5,
    },
    {
        id: "10",
        name: "Signature Mojito",
        description: "Fresh mint, lime, sugar, rum, and soda water, garnished with lime wedge",
        price: 10.99,
        image: "/placeholder.svg?height=400&width=400",
        category: "drinks",
        branches: ["riverside", "beachside"],
        addOns: [
            { id: "extra-rum", name: "Extra Rum Shot", price: 3.99 },
            { id: "fruit", name: "Fresh Fruit (Strawberry/Raspberry)", price: 1.99 },
        ],
        ingredients: [
            "White rum",
            "Fresh mint leaves",
            "Fresh lime juice",
            "Simple syrup",
            "Soda water",
            "Crushed ice",
            "Lime wedge garnish",
        ],
        nutritionFacts: {
            calories: 180,
            protein: 0,
            carbs: 18,
            fat: 0,
        },
        preparationTime: 5,
    },
    {
        id: "11",
        name: "Seafood Paella",
        description: "Traditional Spanish rice dish with shrimp, mussels, clams, and chorizo",
        price: 28.99,
        image: "/placeholder.svg?height=400&width=400",
        category: "mains",
        branches: ["beachside"],
        isNew: true,
        cookingOptions: [
            { id: "traditional", name: "Traditional (Slightly Wet)" },
            { id: "dry", name: "Dry (Crispy Bottom)" },
        ],
        addOns: [
            { id: "extra-seafood", name: "Extra Seafood", price: 6.99 },
            { id: "lobster", name: "Add Lobster Tail", price: 15.99 },
            { id: "saffron-aioli", name: "Saffron Aioli", price: 1.99 },
        ],
        ingredients: [
            "Arborio rice",
            "Saffron",
            "Shrimp",
            "Mussels",
            "Clams",
            "Chorizo",
            "Bell peppers",
            "Onions",
            "Garlic",
            "Tomatoes",
            "Chicken stock",
            "White wine",
            "Olive oil",
            "Paprika",
            "Fresh herbs",
        ],
        allergens: {
            contains: ["Shellfish", "Mollusks", "Gluten"],
            mayContain: [],
            freeFrom: [],
        },
        nutritionFacts: {
            calories: 620,
            protein: 38,
            carbs: 65,
            fat: 22,
        },
        preparationTime: 35,
    },
    {
        id: "12",
        name: "Nashville Hot Chicken Sandwich",
        description:
            "Crispy fried chicken breast coated in Nashville hot sauce, served on a brioche bun with pickles and slaw",
        price: 16.99,
        image: "/placeholder.svg?height=400&width=400",
        category: "mains",
        branches: ["downtown", "uptown"],
        isSpicy: true,
        isNew: true,
        cookingOptions: [
            { id: "mild", name: "Mild" },
            { id: "medium", name: "Medium" },
            { id: "hot", name: "Hot" },
            { id: "extra-hot", name: "Extra Hot" },
        ],
        sideOptions: [
            { id: "fries", name: "French Fries" },
            { id: "slaw", name: "Coleslaw" },
            { id: "mac", name: "Mac & Cheese" },
        ],
        addOns: [
            { id: "cheese", name: "Add Cheese", price: 1.49 },
            { id: "bacon", name: "Add Bacon", price: 2.49 },
            { id: "extra-sauce", name: "Extra Hot Sauce", price: 0.99 },
        ],
        ingredients: [
            "Chicken breast",
            "Brioche bun",
            "Nashville hot sauce (cayenne pepper, brown sugar, spices)",
            "Pickles",
            "Coleslaw",
            "Buttermilk",
            "Flour",
            "Spices",
        ],
        allergens: {
            contains: ["Gluten", "Dairy", "Eggs"],
            mayContain: [],
            freeFrom: [],
        },
        nutritionFacts: {
            calories: 780,
            protein: 42,
            carbs: 68,
            fat: 38,
        },
        preparationTime: 20,
    },
]

