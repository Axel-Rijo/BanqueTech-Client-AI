"use client"

import { useState, useEffect } from "react"
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Twitter, ExternalLink, Utensils } from "lucide-react"
import Link from "next/link"
import { ContactForm } from "./contact-form"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"

export function ContactPageClient() {
    const [mapLoaded, setMapLoaded] = useState(false)

    useEffect(() => {
        // Lazy load the map when component is mounted
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setMapLoaded(true)
                        observer.disconnect()
                    }
                })
            },
            { threshold: 0.1 },
        )

        const mapContainer = document.getElementById("map-container")
        if (mapContainer) {
            observer.observe(mapContainer)
        }

        return () => observer.disconnect()
    }, [])

    return (
        <div className="container mx-auto px-4 py-16 max-w-7xl">
            <div className="text-center mb-12 max-w-3xl mx-auto">

                <h1 className="text-4xl font-bold mb-4 text-amber-500">Contact Us</h1>
                <p className="text-lg text-muted-foreground">
                    We'd love to hear from you. Reach out with any questions, provide feedback on your dining experience, or
                    inquire about our services.
                </p>
                <div className="flex justify-center space-x-4 mt-6">
                    <a
                        href="https://facebook.com/savoria"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Visit our Facebook page"
                        className="text-gray-600 hover:text-amber-500 transition-colors"
                    >
                        <Facebook className="h-6 w-6" />
                    </a>
                    <a
                        href="https://instagram.com/savoria"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Visit our Instagram page"
                        className="text-gray-600 hover:text-amber-500 transition-colors"
                    >
                        <Instagram className="h-6 w-6" />
                    </a>
                    <a
                        href="https://twitter.com/savoria"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Visit our Twitter page"
                        className="text-gray-600 hover:text-amber-500 transition-colors"
                    >
                        <Twitter className="h-6 w-6" />
                    </a>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
                {/* Contact Form */}
                <div className="space-y-6">
                    <h2 className="text-2xl font-bold mb-6 text-amber-500 flex items-center">
                        <span className="bg-amber-100 text-amber-500 rounded-full w-8 h-8 inline-flex items-center justify-center mr-2 text-sm">
                            1
                        </span>
                        Send Us a Message
                    </h2>
                    <ContactForm />
                </div>

                {/* Restaurant Information */}
                <div className="space-y-8">
                    <h2 className="text-2xl font-bold mb-6 text-amber-500 flex items-center">
                        <span className="bg-amber-100 text-amber-500 rounded-full w-8 h-8 inline-flex items-center justify-center mr-2 text-sm">
                            2
                        </span>
                        Restaurant Information
                    </h2>

                    <Tabs defaultValue="info" className="w-full">
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="info">Contact Info</TabsTrigger>
                            <TabsTrigger value="directions">Directions</TabsTrigger>
                        </TabsList>
                        <TabsContent value="info" className="pt-4">
                            <div className="space-y-6">
                                <div className="flex items-start gap-4 p-4 rounded-lg bg-amber-50 hover:bg-amber-100 transition-colors">
                                    <MapPin className="h-6 w-6 text-amber-500 flex-shrink-0 mt-1" />
                                    <div>
                                        <h3 className="font-semibold text-lg">Address</h3>
                                        <address className="not-italic text-muted-foreground">
                                            123 Gourmet Avenue
                                            <br />
                                            Culinary District
                                            <br />
                                            New York, NY 10001
                                        </address>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 p-4 rounded-lg bg-amber-50 hover:bg-amber-100 transition-colors">
                                    <Phone className="h-6 w-6 text-amber-500 flex-shrink-0" />
                                    <div>
                                        <h3 className="font-semibold text-lg">Phone</h3>
                                        <p className="text-muted-foreground">
                                            <a href="tel:+12125551234" className="hover:underline">
                                                (212) 555-1234
                                            </a>
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 p-4 rounded-lg bg-amber-50 hover:bg-amber-100 transition-colors">
                                    <Mail className="h-6 w-6 text-amber-500 flex-shrink-0" />
                                    <div>
                                        <h3 className="font-semibold text-lg">Email</h3>
                                        <p className="text-muted-foreground">
                                            <a href="mailto:info@savoria.com" className="hover:underline">
                                                info@savoria.com
                                            </a>
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4 p-4 rounded-lg bg-amber-50 hover:bg-amber-100 transition-colors">
                                    <Clock className="h-6 w-6 text-amber-500 flex-shrink-0 mt-1" />
                                    <div>
                                        <h3 className="font-semibold text-lg">Hours of Operation</h3>
                                        <div className="text-muted-foreground space-y-1">
                                            <p className="flex justify-between">
                                                <span>Monday - Thursday:</span>
                                                <span>11:00 AM - 10:00 PM</span>
                                            </p>
                                            <p className="flex justify-between">
                                                <span>Friday - Saturday:</span>
                                                <span>11:00 AM - 11:00 PM</span>
                                            </p>
                                            <p className="flex justify-between">
                                                <span>Sunday:</span>
                                                <span>12:00 PM - 9:00 PM</span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </TabsContent>
                        <TabsContent value="directions" className="pt-4">
                            <div className="space-y-4">
                                <h3 className="font-semibold text-lg">
                                    Getting to <span className="font-serif">Savoria</span>
                                </h3>
                                <div className="space-y-4">
                                    <div className="p-4 border rounded-lg">
                                        <h4 className="font-medium mb-2">By Subway</h4>
                                        <p className="text-muted-foreground">
                                            Take the A, C, E, N, Q, R, W, 1, 2, 3 trains to Times Square-42nd Street station. Walk 2 blocks
                                            east and 1 block north.
                                        </p>
                                    </div>
                                    <div className="p-4 border rounded-lg">
                                        <h4 className="font-medium mb-2">By Bus</h4>
                                        <p className="text-muted-foreground">
                                            M1, M2, M3, M4, M5, M7, M42, and M104 buses all stop within a 2-block radius.
                                        </p>
                                    </div>
                                    <div className="p-4 border rounded-lg">
                                        <h4 className="font-medium mb-2">Parking</h4>
                                        <p className="text-muted-foreground">
                                            Paid parking is available at several nearby garages. Street parking is limited.
                                        </p>
                                    </div>
                                </div>
                                <Button
                                    variant="outline"
                                    className="mt-2 w-full"
                                    onClick={() =>
                                        window.open("https://maps.google.com/?q=Savoria+123+Gourmet+Avenue+New+York+NY+10001", "_blank")
                                    }
                                >
                                    Get Directions <ExternalLink className="ml-2 h-4 w-4" />
                                </Button>
                            </div>
                        </TabsContent>
                    </Tabs>

                    {/* Map */}
                    <div id="map-container" className="mt-8 rounded-lg overflow-hidden border border-muted h-[300px] relative">
                        {!mapLoaded && (
                            <div className="absolute inset-0 bg-muted flex items-center justify-center">
                                <div className="animate-pulse flex flex-col items-center">
                                    <MapPin className="h-8 w-8 text-amber-500 mb-2" />
                                    <span>Loading map...</span>
                                </div>
                            </div>
                        )}
                        {mapLoaded && (
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3024.2219901290355!2d-74.00939!3d40.71239!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a18c0821af7%3A0x37f456a788da2b0!2sManhattan%2C%20New%20York%2C%20NY!5e0!3m2!1sen!2sus!4v1648482801994!5m2!1sen!2sus"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen={false}
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="Savoria Restaurant Location"
                                aria-label="Google Maps showing Savoria restaurant location"
                            ></iframe>
                        )}
                    </div>
                </div>
            </div>

            {/* FAQ Section */}
            <div className="mt-16 max-w-3xl mx-auto">
                <h2 className="text-2xl font-bold mb-6 text-amber-500 text-center">Frequently Asked Questions</h2>
                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>How do I make a reservation at Savoria?</AccordionTrigger>
                        <AccordionContent>
                            You can make a reservation by calling us at (212) 555-1234 or by visiting our website's reservation page.
                            We accept reservations up to 30 days in advance.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger>Do you offer catering services?</AccordionTrigger>
                        <AccordionContent>
                            Yes, Savoria offers full-service catering for events of all sizes, from intimate gatherings to large
                            corporate functions. Our catering menu includes many of our restaurant favorites as well as special items
                            designed for events. Please select "Catering" in our contact form for more details.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-5">
                        <AccordionTrigger>What dietary restrictions can Savoria accommodate?</AccordionTrigger>
                        <AccordionContent>
                            At Savoria, we can accommodate most dietary restrictions including vegetarian, vegan, gluten-free, and
                            various allergies. Please inform us of any dietary restrictions when making your reservation or when
                            placing your order.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-6">
                        <AccordionTrigger>How can I provide feedback about my dining experience?</AccordionTrigger>
                        <AccordionContent>
                            We value your feedback! Please select "Feedback" in our contact form to share your dining experience with
                            us. Your comments help us improve and provide better service to all our guests at Savoria.
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>

            {/* Newsletter Signup */}
            <div className="mt-16 bg-amber-50 p-8 rounded-lg max-w-3xl mx-auto">
                <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold text-amber-500">
                        Join <span className="font-serif">Savoria</span>'s Newsletter
                    </h2>
                    <p className="text-muted-foreground mt-2">
                        Stay updated with our latest menu items, special events, and exclusive offers.
                    </p>
                </div>
                <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                    <Input type="email" placeholder="Your email address" className="flex-grow" required />
                    <Button type="submit" className="bg-amber-500 hover:bg-amber-600 text-white whitespace-nowrap">
                        Subscribe
                    </Button>
                </form>
            </div>
        </div>
    )
}

