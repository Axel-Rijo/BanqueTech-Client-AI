import Image from "next/image"
import { Star } from "lucide-react"

interface Testimonial {
    id: number
    name: string
    image: string
    rating: number
    date: string
    comment: string
}

export default function TestimonialSection() {
    const testimonials: Testimonial[] = [
        {
            id: 1,
            name: "Sarah Johnson",
            image: "/images/avatar1.jpg",
            rating: 5,
            date: "June 12, 2023",
            comment:
                "The food was absolutely incredible! The flavors were so authentic and the service was impeccable. I especially loved the chef's special pasta dish. Will definitely be coming back soon!",
        },
        {
            id: 2,
            name: "Michael Chen",
            image: "/images/avatar2.jpg",
            rating: 5,
            date: "May 28, 2023",
            comment:
                "What a hidden gem! The ambiance was perfect for our anniversary dinner. The wine selection was excellent and paired perfectly with our meals. The staff went above and beyond to make our night special.",
        },
        {
            id: 3,
            name: "Emily Rodriguez",
            image: "/images/avatar3.jpg",
            rating: 4,
            date: "July 3, 2023",
            comment:
                "Great atmosphere and delicious food. The seafood platter was fresh and beautifully presented. My only suggestion would be to expand the dessert menu, but otherwise a fantastic dining experience!",
        },
    ]

    return (
        <section className="py-16 bg-[#f8f5f0]">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#2c2c2c]">What Our Guests Say</h2>
                    <div className="w-20 h-1 bg-[#e67e22] mx-auto mb-6"></div>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Don't just take our word for it. Here's what our valued customers have to say about their dining experience
                        with us.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {testimonials.map((testimonial) => (
                        <div
                            key={testimonial.id}
                            className="bg-white rounded-lg shadow-md p-6 transition-transform duration-300 hover:-translate-y-2"
                        >
                            <div className="flex items-center mb-4">
                                <div className="relative w-16 h-16 mr-4 rounded-full overflow-hidden">
                                    <Image
                                        src={testimonial.image || "/placeholder.svg"}
                                        alt={testimonial.name}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg">{testimonial.name}</h3>
                                    <p className="text-gray-500 text-sm">{testimonial.date}</p>
                                    <div className="flex mt-1">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                className={`w-4 h-4 ${i < testimonial.rating ? "fill-[#e67e22] text-[#e67e22]" : "text-gray-300"}`}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <p className="text-gray-600 italic">"{testimonial.comment}"</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

