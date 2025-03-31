import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function MenuSection() {
    return (
        <section className="w-full py-12 md:py-24 lg:py-32 bg-black text-white">
            <div className="container px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                    <div className="space-y-2">
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Our Menu</h2>
                        <p className="max-w-[700px] text-gray-300 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                            Discover our carefully crafted dishes made with the finest ingredients
                        </p>
                    </div>
                </div>

                <Tabs defaultValue="starters" className="mt-12">
                    <div className="flex justify-center mb-8">
                        <TabsList className="bg-black border border-[#f59e0b]">
                            <TabsTrigger
                                value="starters"
                                className="text-white data-[state=active]:bg-[#f59e0b] data-[state=active]:text-black"
                            >
                                Starters
                            </TabsTrigger>
                            <TabsTrigger
                                value="mains"
                                className="text-white data-[state=active]:bg-[#f59e0b] data-[state=active]:text-black"
                            >
                                Main Courses
                            </TabsTrigger>
                            <TabsTrigger
                                value="desserts"
                                className="text-white data-[state=active]:bg-[#f59e0b] data-[state=active]:text-black"
                            >
                                Desserts
                            </TabsTrigger>
                            <TabsTrigger
                                value="drinks"
                                className="text-white data-[state=active]:bg-[#f59e0b] data-[state=active]:text-black"
                            >
                                Drinks
                            </TabsTrigger>
                        </TabsList>
                    </div>

                    <TabsContent value="starters" className="space-y-8">
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {starters.map((item) => (
                                <MenuCard key={item.name} item={item} />
                            ))}
                        </div>
                    </TabsContent>

                    <TabsContent value="mains" className="space-y-8">
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {mains.map((item) => (
                                <MenuCard key={item.name} item={item} />
                            ))}
                        </div>
                    </TabsContent>

                    <TabsContent value="desserts" className="space-y-8">
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {desserts.map((item) => (
                                <MenuCard key={item.name} item={item} />
                            ))}
                        </div>
                    </TabsContent>

                    <TabsContent value="drinks" className="space-y-8">
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {drinks.map((item) => (
                                <MenuCard key={item.name} item={item} />
                            ))}
                        </div>
                    </TabsContent>
                </Tabs>

                <div className="flex justify-center mt-12">
                    <Button className="bg-[#f59e0b] text-black hover:bg-[#f59e0b]/90">View Full Menu</Button>
                </div>
            </div>
        </section>
    )
}

interface MenuItem {
    name: string
    description: string
    price: string
    image: string
    dietary?: string[]
}

function MenuCard({ item }: { item: MenuItem }) {
    return (
        <Card className="overflow-hidden border border-[#f59e0b]/20 bg-black">
            <div className="aspect-video w-full overflow-hidden">
                <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    className="object-cover w-full h-full transition-all hover:scale-105"
                />
            </div>
            <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-white">{item.name}</h3>
                    <span className="font-bold text-[#f59e0b]">{item.price}</span>
                </div>
                <p className="text-sm text-gray-300 mb-3">{item.description}</p>
                {item.dietary && (
                    <div className="flex gap-2">
                        {item.dietary.map((tag) => (
                            <span
                                key={tag}
                                className="inline-flex items-center rounded-full border border-[#f59e0b]/50 px-2.5 py-0.5 text-xs font-semibold text-[#f59e0b]"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                )}
            </CardContent>
        </Card>
    )
}

// Sample menu data
const starters = [
    {
        name: "Truffle Arancini",
        description: "Crispy risotto balls with wild mushrooms, truffle oil, and parmesan cheese",
        price: "$14",
        image: "/placeholder.svg?height=200&width=400",
        dietary: ["Vegetarian"],
    },
    {
        name: "Seared Scallops",
        description: "Pan-seared scallops with cauliflower purée, pancetta, and herb oil",
        price: "$18",
        image: "/placeholder.svg?height=200&width=400",
    },
    {
        name: "Burrata Salad",
        description: "Creamy burrata with heirloom tomatoes, basil, and aged balsamic",
        price: "$16",
        image: "/placeholder.svg?height=200&width=400",
        dietary: ["Vegetarian", "Gluten-Free"],
    },
]

const mains = [
    {
        name: "Filet Mignon",
        description: "8oz grass-fed beef with truffle mashed potatoes and seasonal vegetables",
        price: "$42",
        image: "/placeholder.svg?height=200&width=400",
        dietary: ["Gluten-Free"],
    },
    {
        name: "Herb Crusted Salmon",
        description: "Wild-caught salmon with lemon risotto, asparagus, and dill cream sauce",
        price: "$34",
        image: "/placeholder.svg?height=200&width=400",
    },
    {
        name: "Wild Mushroom Risotto",
        description: "Arborio rice with wild mushrooms, white wine, and parmesan",
        price: "$26",
        image: "/placeholder.svg?height=200&width=400",
        dietary: ["Vegetarian", "Gluten-Free"],
    },
]

const desserts = [
    {
        name: "Chocolate Fondant",
        description: "Warm chocolate cake with a molten center, served with vanilla ice cream",
        price: "$12",
        image: "/placeholder.svg?height=200&width=400",
        dietary: ["Vegetarian"],
    },
    {
        name: "Crème Brûlée",
        description: "Classic vanilla custard with a caramelized sugar crust",
        price: "$10",
        image: "/placeholder.svg?height=200&width=400",
        dietary: ["Vegetarian", "Gluten-Free"],
    },
    {
        name: "Seasonal Fruit Tart",
        description: "Buttery pastry with vanilla custard and fresh seasonal fruits",
        price: "$11",
        image: "/placeholder.svg?height=200&width=400",
        dietary: ["Vegetarian"],
    },
]

const drinks = [
    {
        name: "Signature Martini",
        description: "House-infused gin with dry vermouth and a twist of lemon",
        price: "$16",
        image: "/placeholder.svg?height=200&width=400",
    },
    {
        name: "Barrel Aged Negroni",
        description: "Aged in oak barrels for 30 days with premium gin, Campari, and vermouth",
        price: "$18",
        image: "/placeholder.svg?height=200&width=400",
    },
    {
        name: "Savoria Wine Selection",
        description: "Ask your server about our curated wine list featuring local and international selections",
        price: "From $12",
        image: "/placeholder.svg?height=200&width=400",
    },
]

