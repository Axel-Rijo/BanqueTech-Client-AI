"use client"

import { MapPin, Phone, Clock, ChevronLeft, ChevronRight, Utensils, Wifi, Music, Car, Users, Gift } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import useEmblaCarousel from "embla-carousel-react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

// Sample data - replace with your actual restaurant branches
const branches = [
    {
        id: "downtown",
        name: "Downtown",
        address: "123 Main Street, Downtown, City",
        phone: "(555) 123-4567",
        hours: "Mon-Fri: 11am-10pm, Sat-Sun: 10am-11pm",
        mapUrl: "https://maps.google.com/?q=123+Main+Street",
        image: "/images/branch1.jpg",
        description:
            "Our flagship location in the heart of downtown, featuring a rooftop dining area with stunning city views and an exclusive chef's table experience.",
        amenities: [
            { name: "Rooftop Dining", icon: Utensils },
            { name: "Full Bar", icon: Gift },
            { name: "Private Events", icon: Users },
            { name: "Valet Parking", icon: Car },
        ],
        specialFeatures: "Chef's Table Experience, Wine Cellar Tours",
    },
    {
        id: "uptown",
        name: "Uptown",
        address: "456 Park Avenue, Uptown, City",
        phone: "(555) 987-6543",
        hours: "Mon-Sun: 11am-10pm",
        mapUrl: "https://maps.google.com/?q=456+Park+Avenue",
        image: "/images/branch2.jpg",
        description:
            "A sophisticated venue in the uptown district, known for its elegant atmosphere and seasonal tasting menus crafted with locally-sourced ingredients.",
        amenities: [
            { name: "Outdoor Seating", icon: Utensils },
            { name: "Full Bar", icon: Gift },
            { name: "Live Piano", icon: Music },
            { name: "Complimentary Wifi", icon: Wifi },
        ],
        specialFeatures: "Seasonal Tasting Menus, Sommelier Service",
    },
    {
        id: "westside",
        name: "Westside",
        address: "789 Ocean Drive, Westside, City",
        phone: "(555) 456-7890",
        hours: "Mon-Thu: 11am-9pm, Fri-Sun: 11am-11pm",
        mapUrl: "https://maps.google.com/?q=789+Ocean+Drive",
        image: "/images/branch3.webp",
        description:
            "Our beachside location with panoramic ocean views and a specialized seafood menu featuring the freshest daily catch from local fishermen.",
        amenities: [
            { name: "Ocean View", icon: Utensils },
            { name: "Seafood Bar", icon: Gift },
            { name: "Weekend Brunch", icon: Clock },
            { name: "Live Music", icon: Music },
        ],
        specialFeatures: "Sunset Dinner Packages, Fresh Seafood Market",
    },
    {
        id: "eastside",
        name: "Eastside",
        address: "321 River Road, Eastside, City",
        phone: "(555) 789-0123",
        hours: "Mon-Sun: 10am-10pm",
        mapUrl: "https://maps.google.com/?q=321+River+Road",
        image: "/images/branch4.jpg",
        description:
            "A family-friendly location with a dedicated kids' play area and special children's menu, perfect for celebrations and gatherings of all sizes.",
        amenities: [
            { name: "Kids Play Area", icon: Users },
            { name: "Family Specials", icon: Gift },
            { name: "Birthday Packages", icon: Gift },
            { name: "Ample Parking", icon: Car },
        ],
        specialFeatures: "Private Dining Rooms, Cooking Classes",
    },
]

export default function BranchSection() {
    const [isMounted, setIsMounted] = useState(false)

    // Prevent hydration issues with animations
    useEffect(() => {
        setIsMounted(true)
    }, [])

    return (
        <section className="w-full py-12 md:py-24 bg-black text-white overflow-hidden">
            <div className="container px-4 md:px-6 max-w-7xl mx-auto">
                <div className="relative mb-8 md:mb-16">
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 h-[1px] w-full bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />

                    <div className="flex flex-col items-center justify-center space-y-2 md:space-y-4 text-center relative">
                        <h2 className="text-2xl md:text-3xl font-light tracking-tight lg:text-5xl">
                            Our <span className="font-medium italic text-amber-500 font-serif">Distinguished</span> Locations
                        </h2>
                        <p className="max-w-[600px] text-gray-400 text-sm md:text-lg font-light">
                            Each venue carefully curated to deliver an unparalleled dining experience
                        </p>
                    </div>
                </div>

                <div className="mt-6 md:mt-12">{isMounted && <SingleCardCarousel branches={branches} />}</div>
            </div>
        </section>
    )
}

function SingleCardCarousel({ branches }) {
    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: true,
        align: "center",
        skipSnaps: false,
    })

    const [selectedIndex, setSelectedIndex] = useState(0)

    const scrollPrev = () => emblaApi && emblaApi.scrollPrev()
    const scrollNext = () => emblaApi && emblaApi.scrollNext()

    useEffect(() => {
        if (!emblaApi) return

        emblaApi.on("select", () => {
            setSelectedIndex(emblaApi.selectedScrollSnap())
        })

        // Cleanup
        return () => {
            emblaApi.off("select")
        }
    }, [emblaApi])

    return (
        <div className="relative">
            <div className="absolute -left-4 -right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-amber-500/10 to-transparent"></div>
            </div>

            <div className="overflow-hidden" ref={emblaRef}>
                <div className="flex">
                    {branches.map((branch, index) => (
                        <div
                            key={branch.id}
                            className="flex-[0_0_100%] min-w-0 relative px-2 md:px-16 lg:px-24 pt-2 pb-0 md:pt-8 md:pb-2"
                        >
                            <DetailedBranchCard branch={branch} isSelected={index === selectedIndex} />
                        </div>
                    ))}
                </div>
            </div>

            <div className="mt-3 md:mt-8 flex justify-center gap-4">
                <button
                    onClick={scrollPrev}
                    className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full border border-zinc-800 bg-black/30 backdrop-blur-sm text-white hover:bg-zinc-900 hover:border-amber-500/20 transition-colors duration-300"
                    aria-label="Previous location"
                >
                    <ChevronLeft className="h-4 w-4 md:h-5 md:w-5" />
                </button>

                <div className="flex items-center gap-2">
                    {branches.map((_, index) => (
                        <div
                            key={index}
                            className={cn(
                                "w-2 h-2 rounded-full transition-all duration-500",
                                index === selectedIndex ? "bg-amber-500 w-6" : "bg-zinc-700 hover:bg-zinc-600",
                            )}
                        />
                    ))}
                </div>

                <button
                    onClick={scrollNext}
                    className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full border border-zinc-800 bg-black/30 backdrop-blur-sm text-white hover:bg-zinc-900 hover:border-amber-500/20 transition-colors duration-300"
                    aria-label="Next location"
                >
                    <ChevronRight className="h-4 w-4 md:h-5 md:w-5" />
                </button>
            </div>
        </div>
    )
}

function DetailedBranchCard({ branch, isSelected }) {
    const [activeTab, setActiveTab] = useState("info")

    return (
        <Card
            className={cn(
                "overflow-hidden border-0 bg-transparent transition-all duration-700",
                isSelected ? "opacity-100 scale-100" : "opacity-40 scale-95",
            )}
        >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-10">
                <div className="relative overflow-hidden rounded-xl aspect-[4/3] md:aspect-[4/5] lg:aspect-auto">
                    <div className="absolute inset-0 border border-zinc-800 rounded-xl z-10"></div>
                    <div className="absolute top-3 left-3 right-3 bottom-3 border border-amber-500/10 rounded-lg z-10"></div>

                    <Image
                        src={branch.image || "/placeholder.svg"}
                        alt={`${branch.name} Branch`}
                        fill
                        className="object-cover transition-transform duration-[1.5s] ease-out"
                        sizes="(max-width: 768px) 100vw, 50vw"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10 z-0"></div>

                    <div className="absolute left-6 bottom-6 z-10">
                        <div className="flex items-center space-x-2 mb-1 md:mb-2">
                            <div className="w-4 md:w-6 h-[1px] bg-amber-500/70"></div>
                            <span className="text-amber-500 uppercase tracking-widest text-xs font-light">Branch</span>
                        </div>
                        <h3 className="text-xl md:text-2xl font-light text-white tracking-wide">
                            <span className="font-medium">{branch.name}</span> Location
                        </h3>
                    </div>
                </div>

                <div className="flex flex-col justify-center p-4 md:p-6">
                    <div className="max-w-md space-y-3 md:space-y-8">
                        {/* Branch Tabs */}
                        <div className="border-b border-zinc-800">
                            <div className="flex space-x-4 md:space-x-6">
                                <button
                                    onClick={() => setActiveTab("info")}
                                    className={cn(
                                        "pb-2 text-xs md:text-sm font-medium tracking-wide transition-colors relative",
                                        activeTab === "info" ? "text-amber-500" : "text-gray-400 hover:text-gray-300",
                                    )}
                                >
                                    Information
                                    {activeTab === "info" && (
                                        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-amber-500"></div>
                                    )}
                                </button>
                                <button
                                    onClick={() => setActiveTab("amenities")}
                                    className={cn(
                                        "pb-2 text-xs md:text-sm font-medium tracking-wide transition-colors relative",
                                        activeTab === "amenities" ? "text-amber-500" : "text-gray-400 hover:text-gray-300",
                                    )}
                                >
                                    Amenities
                                    {activeTab === "amenities" && (
                                        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-amber-500"></div>
                                    )}
                                </button>
                                <button
                                    onClick={() => setActiveTab("features")}
                                    className={cn(
                                        "pb-2 text-xs md:text-sm font-medium tracking-wide transition-colors relative",
                                        activeTab === "features" ? "text-amber-500" : "text-gray-400 hover:text-gray-300",
                                    )}
                                >
                                    Features
                                    {activeTab === "features" && (
                                        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-amber-500"></div>
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Tab Content */}
                        <div className="min-h-[140px] md:min-h-[260px] pb-1 md:pb-3">
                            {/* Information Tab */}
                            {activeTab === "info" && (
                                <div className="space-y-3 md:space-y-6 animate-in fade-in duration-300">
                                    <div className="flex items-start space-x-3 md:space-x-4">
                                        <MapPin className="h-4 w-4 md:h-5 md:w-5 text-amber-500 shrink-0 mt-0.5" />
                                        <div>
                                            <h4 className="text-white text-xs md:text-sm font-medium uppercase tracking-wider mb-0.5 md:mb-1">
                                                ADDRESS
                                            </h4>
                                            <p className="text-gray-400 text-xs md:text-sm font-light">{branch.address}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start space-x-3 md:space-x-4">
                                        <Phone className="h-4 w-4 md:h-5 md:w-5 text-amber-500 shrink-0 mt-0.5" />
                                        <div>
                                            <h4 className="text-white text-xs md:text-sm font-medium uppercase tracking-wider mb-0.5 md:mb-1">
                                                RESERVATIONS
                                            </h4>
                                            <p className="text-gray-400 text-xs md:text-sm font-light">{branch.phone}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start space-x-3 md:space-x-4">
                                        <Clock className="h-4 w-4 md:h-5 md:w-5 text-amber-500 shrink-0 mt-0.5" />
                                        <div>
                                            <h4 className="text-white text-xs md:text-sm font-medium uppercase tracking-wider mb-0.5 md:mb-1">
                                                HOURS
                                            </h4>
                                            <p className="text-gray-400 text-xs md:text-sm font-light">{branch.hours}</p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Amenities Tab */}
                            {activeTab === "amenities" && (
                                <div className="animate-in fade-in duration-300">
                                    <div className="grid grid-cols-2 gap-2 md:gap-4 mb-3 md:mb-6">
                                        {branch.amenities.map((amenity, index) => (
                                            <div
                                                key={index}
                                                className="flex items-center space-x-2 md:space-x-3 p-2 md:p-3 border border-zinc-800 rounded-lg bg-zinc-900/30"
                                            >
                                                <amenity.icon className="h-4 w-4 md:h-5 md:w-5 text-amber-500" />
                                                <span className="text-gray-300 text-xs md:text-sm">{amenity.name}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <p className="text-gray-400 text-xs md:text-sm font-light italic">
                                        Our {branch.name} location offers these exclusive amenities to enhance your dining experience.
                                    </p>
                                </div>
                            )}

                            {/* Features Tab */}
                            {activeTab === "features" && (
                                <div className="space-y-3 md:space-y-6 animate-in fade-in duration-300">
                                    <p className="text-gray-300 text-xs md:text-sm leading-relaxed">{branch.description}</p>

                                    <div>
                                        <h4 className="text-white text-xs md:text-sm font-medium uppercase tracking-wider mb-2 md:mb-3">
                                            Special Offerings
                                        </h4>
                                        <div className="flex flex-wrap gap-2">
                                            {branch.specialFeatures.split(", ").map((feature, index) => (
                                                <span
                                                    key={index}
                                                    className="inline-block px-2 md:px-3 py-1 bg-zinc-900 border border-zinc-800 rounded-full text-xs text-amber-500"
                                                >
                                                    {feature}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="pt-2 md:pt-6 border-t border-zinc-800 mt-2 md:mt-0">
                            <Button
                                asChild
                                className="w-full bg-black border border-amber-500/30 text-amber-500 hover:bg-amber-500/10 transition-colors rounded-none py-3 md:py-6 text-sm md:text-base"
                            >
                                <Link href={branch.mapUrl} target="_blank" rel="noopener noreferrer">
                                    <MapPin className="mr-2 h-3 w-3 md:h-4 md:w-4" />
                                    Find This Location
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    )
}