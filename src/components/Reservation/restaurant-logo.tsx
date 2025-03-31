import { Utensils } from "lucide-react"

export default function RestaurantLogo() {
    return (
        <div className="flex flex-col items-center">
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-amber-500">
                <Utensils className="h-8 w-8 text-white" />
            </div>
            <div className="mt-2 text-center">
                <h2 className="text-xl font-bold tracking-tight font-serif">Savoria</h2>
                <p className="text-xs text-gray-500">FINE DINING EXPERIENCE</p>
            </div>
        </div>
    )
}

