import Image from "next/image"
import { ChefHat, Coffee, UtensilsCrossed } from "lucide-react"

export default function OurStory() {
    return (
        <section id="our-story" className="py-16 px-4 bg-white">
            <div className="container mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-black mb-2">Our Story</h2>
                    <div className="flex justify-center items-center gap-2 mb-4">
                        <span className="h-px w-10 bg-amber-500"></span>
                        <UtensilsCrossed className="text-amber-500 h-5 w-5" />
                        <span className="h-px w-10 bg-amber-500"></span>
                    </div>
                    <p className="text-gray-700 max-w-2xl mx-auto">The journey of Savoria - where passion meets tradition</p>
                </div>

                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="relative h-[400px] md:h-[600px] rounded-lg overflow-hidden shadow-lg">
                        <Image
                            src="/images/founders.png"
                            alt="Founders of Savoria"
                            fill
                            className="object-cover"
                        />
                    </div>

                    <div className="space-y-6">
                        <h3 className="text-2xl font-semibold text-black">From Family Recipes to Culinary Excellence</h3>
                        <p className="text-gray-700 leading-relaxed">
                            Savoria was born in 2005 when Chef Maria and her husband Antonio decided to share their culinary heritage
                            with the world. What began as a tribute to Maria's grandmother's treasured recipes has evolved into a
                            celebrated dining destination.
                        </p>

                        <p className="text-gray-700 leading-relaxed">
                            The name "Savoria" comes from our dedication to savoring every moment, every flavor, and every dining
                            experience. Our journey from a small five-table café to one of the city's most beloved restaurants
                            reflects our unwavering commitment to authenticity and excellence.
                        </p>

                        <div className="flex items-start gap-4 pt-4">
                            <div className="bg-amber-500/10 p-3 rounded-full">
                                <ChefHat className="h-6 w-6 text-amber-500" />
                            </div>
                            <div>
                                <h4 className="font-medium text-black">Artisanal Approach</h4>
                                <p className="text-gray-700 mt-1">
                                    At Savoria, every dish is crafted with locally-sourced ingredients and prepared with techniques passed
                                    down through generations.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="bg-amber-500/10 p-3 rounded-full">
                                <Coffee className="h-6 w-6 text-amber-500" />
                            </div>
                            <div>
                                <h4 className="font-medium text-black">Our Philosophy</h4>
                                <p className="text-gray-700 mt-1">
                                    At Savoria, we believe dining is about connection. When you eat here, you're not just a customer —
                                    you're part of our extended family.
                                </p>
                            </div>
                        </div>

                        <blockquote className="border-l-4 border-amber-500 pl-4 italic text-gray-700 my-6">
                            "Food is our common ground, a universal experience that brings people together in a way nothing else can."
                            — Chef Maria, Founder of Savoria
                        </blockquote>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
                    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                        <h4 className="text-xl font-semibold text-black mb-3">Our Mission</h4>
                        <p className="text-gray-700">
                            Savoria exists to create memorable dining experiences that celebrate the rich tapestry of our culinary
                            heritage while embracing innovation.
                        </p>
                    </div>

                    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                        <h4 className="text-xl font-semibold text-black mb-3">Our Ingredients</h4>
                        <p className="text-gray-700">
                            Savoria partners with local farmers and producers to ensure the freshest, most sustainable ingredients
                            make their way to your plate.
                        </p>
                    </div>

                    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                        <h4 className="text-xl font-semibold text-black mb-3">Our Team</h4>
                        <p className="text-gray-700">
                            The Savoria team brings together diverse talents with a shared passion for hospitality and extraordinary
                            food that honors our traditions.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}

