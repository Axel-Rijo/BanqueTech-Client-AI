import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChefHat, Clock, MapPin, Phone } from "lucide-react"

export default function AboutPage() {
    return (
        <div className="container mx-auto px-4 py-12 bg-white text-black">
            {/* Hero Section */}
            <div className="relative w-full h-[300px] md:h-[400px] mb-12 rounded-lg overflow-hidden">
                <Image
                    src="/images/branch1.jpg"
                    alt="Savoria restaurant interior"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                    <div className="text-center">
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">About Savoria</h1>
                        <p className="text-amber-500 text-xl">A Culinary Journey</p>
                    </div>
                </div>
            </div>

            {/* History Section */}
            <section className="mb-16">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div>
                        <h2 className="text-3xl font-bold mb-4">Our Beginning</h2>
                        <p className="text-gray-700 mb-4">
                            Founded in 2010 by Chef Maria Rodriguez, Savoria was born from a passion for bringing authentic flavors to
                            the heart of the city. What started as a small family-owned bistro has grown into a beloved culinary
                            destination while maintaining the warm, intimate atmosphere that our guests have come to love.
                        </p>
                        <p className="text-gray-700">
                            Every dish at Savoria tells a story of tradition, innovation, and the finest seasonal ingredients. Our
                            journey has been shaped by our commitment to excellence and the wonderful community that has supported us
                            through the years.
                        </p>
                    </div>
                    <div className="relative h-[300px] rounded-lg overflow-hidden">
                        <Image
                            src="/images/founders.png"
                            alt="Savoria restaurant founding"
                            fill
                            className="object-cover"
                        />
                    </div>
                </div>
            </section>

            {/* Meet the Chef Section */}
            <section className="mb-16 bg-black text-white rounded-lg p-8">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div className="order-2 md:order-1 relative h-[350px] rounded-lg overflow-hidden">
                        <Image
                            src="/images/chef.jpg"
                            alt="Chef Maria Rodriguez of Savoria"
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div className="order-1 md:order-2">
                        <div className="flex items-center gap-2 mb-4">
                            <ChefHat className="h-6 w-6 text-amber-500" />
                            <h2 className="text-3xl font-bold">Meet Chef Maria</h2>
                        </div>
                        <p className="text-gray-300 mb-4">
                            With over 20 years of culinary experience across Europe and the Americas, Chef Maria brings a unique
                            fusion of techniques and flavors to every dish at Savoria. Her philosophy is simple: respect the
                            ingredients, honor tradition, and don't be afraid to innovate.
                        </p>
                        <p className="text-gray-300">
                            "Cooking is not just about food—it's about creating memories, bringing people together, and sharing a part
                            of yourself on every plate."
                        </p>
                        <p className="italic mt-2 text-amber-500">— Chef Maria Rodriguez</p>
                    </div>
                </div>
            </section>

            {/* Our Philosophy */}
            <section className="mb-16">
                <h2 className="text-3xl font-bold text-center mb-8">The Savoria Philosophy</h2>
                <div className="grid md:grid-cols-3 gap-8">
                    <div className="bg-white border border-gray-200 p-6 rounded-lg shadow-sm">
                        <h3 className="text-xl font-semibold mb-3 text-amber-500">Farm to Table</h3>
                        <p className="text-gray-700">
                            At Savoria, we partner with local farmers and producers to source the freshest, most sustainable
                            ingredients. Every season brings new inspiration to our menu.
                        </p>
                    </div>
                    <div className="bg-white border border-gray-200 p-6 rounded-lg shadow-sm">
                        <h3 className="text-xl font-semibold mb-3 text-amber-500">Craftsmanship</h3>
                        <p className="text-gray-700">
                            From our house-made pastas to our slow-roasted meats, we take no shortcuts. Every dish at Savoria is
                            prepared with care, attention, and respect for culinary tradition.
                        </p>
                    </div>
                    <div className="bg-white border border-gray-200 p-6 rounded-lg shadow-sm">
                        <h3 className="text-xl font-semibold mb-3 text-amber-500">Community</h3>
                        <p className="text-gray-700">
                            We believe in giving back to the community that has supported Savoria. We regularly host charity events
                            and partner with local organizations for various initiatives.
                        </p>
                    </div>
                </div>
            </section>

            {/* Our Space */}
            <section className="mb-16">
                <h2 className="text-3xl font-bold mb-8">Our Space</h2>
                <div className="grid md:grid-cols-2 gap-8">
                    <div>
                        <p className="text-gray-700 mb-4">
                            Nestled in the heart of downtown, Savoria offers a warm, inviting atmosphere that balances rustic charm
                            with modern elegance. The exposed brick walls, black accents, and amber lighting create the perfect
                            backdrop for a memorable dining experience.
                        </p>
                        <p className="text-gray-700 mb-4">
                            Our dining room seats 80 guests comfortably, while our private dining area can accommodate parties of up
                            to 20 people for special occasions. The outdoor patio, open during summer months, offers al fresco dining
                            under the stars.
                        </p>
                        <div className="grid grid-cols-2 gap-4 mt-6">
                            <div className="flex items-center gap-2">
                                <Clock className="h-5 w-5 text-amber-500" />
                                <div>
                                    <p className="font-medium">Hours</p>
                                    <p className="text-sm text-gray-600">Tue-Sun: 5pm-10pm</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <Phone className="h-5 w-5 text-amber-500" />
                                <div>
                                    <p className="font-medium">Reservations</p>
                                    <p className="text-sm text-gray-600">(555) 123-4567</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <MapPin className="h-5 w-5 text-amber-500" />
                                <div>
                                    <p className="font-medium">Location</p>
                                    <p className="text-sm text-gray-600">123 Main St, City</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="relative h-[200px] rounded-lg overflow-hidden">
                            <Image
                                src="/images/branch1.jpg"
                                alt="Savoria restaurant interior"
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className="relative h-[200px] rounded-lg overflow-hidden">
                            <Image
                                src="/images/branch2.jpg"
                                alt="Savoria restaurant patio"
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className="relative h-[200px] rounded-lg overflow-hidden">
                            <Image
                                src="/images/branch3.webp"
                                alt="Savoria private dining"
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className="relative h-[200px] rounded-lg overflow-hidden">
                            <Image src="/images/branch4.jpg" alt="Savoria bar area" fill className="object-cover" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="mb-16 bg-black text-white p-8 rounded-lg">
                <h2 className="text-3xl font-bold text-center mb-8">What People Say About Savoria</h2>
                <div className="grid md:grid-cols-3 gap-6">
                    <blockquote className="bg-white text-black p-6 rounded-lg shadow-sm border-l-4 border-amber-500">
                        <p className="italic text-gray-700 mb-4">
                            "The food at Savoria was absolutely spectacular, and the service was just as impressive. A truly memorable
                            dining experience."
                        </p>
                        <footer className="font-medium">— Food & Wine Magazine</footer>
                    </blockquote>
                    <blockquote className="bg-white text-black p-6 rounded-lg shadow-sm border-l-4 border-amber-500">
                        <p className="italic text-gray-700 mb-4">
                            "Chef Maria's pasta is the closest thing to my grandmother's I've ever tasted. Savoria feels like home."
                        </p>
                        <footer className="font-medium">— Michael D., Regular Customer</footer>
                    </blockquote>
                    <blockquote className="bg-white text-black p-6 rounded-lg shadow-sm border-l-4 border-amber-500">
                        <p className="italic text-gray-700 mb-4">
                            "An exceptional culinary journey that respects tradition while embracing innovation. Savoria is a
                            must-visit restaurant."
                        </p>
                        <footer className="font-medium">— City Food Guide</footer>
                    </blockquote>
                </div>
            </section>

            {/* CTA */}
            <section className="text-center py-8">
                <h2 className="text-3xl font-bold mb-4">Join Us at Savoria</h2>
                <p className="text-gray-700 max-w-2xl mx-auto mb-6">
                    Whether you're celebrating a special occasion or simply craving an exceptional meal, we look forward to
                    welcoming you to our table.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button asChild size="lg" className="bg-amber-500 hover:bg-amber-600 text-black">
                        <Link href="/reservation">Make a Reservation</Link>
                    </Button>
                    <Button variant="outline" asChild size="lg" className="border-amber-500 text-black hover:bg-amber-50">
                        <Link href="/menu">View Our Menu</Link>
                    </Button>
                </div>
            </section>
        </div>
    )
}

