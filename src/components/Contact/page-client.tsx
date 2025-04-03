"use client";

import { useState, useEffect } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Facebook,
  Instagram,
  Twitter,
  ExternalLink,
  Utensils,
} from "lucide-react";
import Link from "next/link";
import { ContactForm } from "./contact-form";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import {
  type BranchInfo,
  getAllBranches,
  getDefaultBranch,
} from "@/lib/branch-data";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

export function ContactPageClient() {
  const [mapLoaded, setMapLoaded] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState<BranchInfo>(
    getDefaultBranch()
  );
  const branches = getAllBranches();

  useEffect(() => {
    // Lazy load the map when component is mounted
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setMapLoaded(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 },
      { threshold: 0.1 }
    );

    const mapContainer = document.getElementById("map-container");
    if (mapContainer) {
      observer.observe(mapContainer);
    }

    return () => observer.disconnect();
  }, []);

  // Add this function to handle branch selection
  const handleBranchChange = (branchId: string) => {
    const branch = branches.find((b) => b.id === branchId);
    if (branch) {
      setSelectedBranch(branch);
      setMapLoaded(false);
      // Re-trigger map loading for the new branch
      setTimeout(() => setMapLoaded(true), 100);
    }
  };

  return (
    <div className="container mx-auto px-4 py-16 max-w-7xl">
      <div className="text-center mb-12 max-w-3xl mx-auto">
        <div className="flex justify-center mb-6">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3">
              {/* Custom Logo */}
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-amber-500">
                <Utensils className="h-5 w-5 text-white" />
              </div>
              <span className="font-serif text-xl md:text-2xl font-bold text-black">
                Savoria
              </span>
            </Link>
          </div>
        </div>
        <h1 className="text-4xl font-bold mb-4 text-amber-500">Contact Us</h1>
        <p className="text-lg text-muted-foreground">
          We'd love to hear from you. Reach out with any questions, provide
          feedback on your dining experience, or inquire about our services.
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
          <ContactForm selectedBranch={selectedBranch} />
        </div>

        {/* Restaurant Information */}
        <div className="space-y-8">
          <h2 className="text-2xl font-bold mb-6 text-amber-500 flex items-center">
            <span className="bg-amber-100 text-amber-500 rounded-full w-8 h-8 inline-flex items-center justify-center mr-2 text-sm">
              2
            </span>
            Restaurant Information
          </h2>

          {/* Branch Selector */}
          <div className="mb-6">
            <Label
              htmlFor="branch-select"
              className="text-base font-medium mb-2 block"
            >
              Select a Location
            </Label>
            <Select
              defaultValue={selectedBranch.id}
              onValueChange={handleBranchChange}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a branch" />
              </SelectTrigger>
              <SelectContent>
                {branches.map((branch) => (
                  <SelectItem key={branch.id} value={branch.id}>
                    {branch.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

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
                    <h3 className="font-semibold text-lg">
                      {selectedBranch.name}
                    </h3>
                    <address className="not-italic text-muted-foreground">
                      {selectedBranch.address}
                    </address>
                  </div>
                </div>

                {selectedBranch.phone && (
                  <div className="flex items-center gap-4 p-4 rounded-lg bg-amber-50 hover:bg-amber-100 transition-colors">
                    <Phone className="h-6 w-6 text-amber-500 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-lg">Phone</h3>
                      <p className="text-muted-foreground">
                        <a
                          href={`tel:${selectedBranch.phone.replace(
                            /\D/g,
                            ""
                          )}`}
                          className="hover:underline"
                        >
                          {selectedBranch.phone}
                        </a>
                      </p>
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-4 p-4 rounded-lg bg-amber-50 hover:bg-amber-100 transition-colors">
                  <Mail className="h-6 w-6 text-amber-500 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-lg">Email</h3>
                    <p className="text-muted-foreground">
                      <a
                        href={`mailto:${selectedBranch.id}@savoria.com`}
                        className="hover:underline"
                      >
                        {selectedBranch.id}@savoria.com
                      </a>
                    </p>
                  </div>
                </div>

                {selectedBranch.hours && (
                  <div className="flex items-start gap-4 p-4 rounded-lg bg-amber-50 hover:bg-amber-100 transition-colors">
                    <Clock className="h-6 w-6 text-amber-500 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-lg">
                        Hours of Operation
                      </h3>
                      <div className="text-muted-foreground space-y-1">
                        <p className="flex justify-between">
                          <span>Monday - Friday:</span>
                          <span>{selectedBranch.hours.weekdays}</span>
                        </p>
                        <p className="flex justify-between">
                          <span>Saturday - Sunday:</span>
                          <span>{selectedBranch.hours.weekends}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>
            <TabsContent value="directions" className="pt-4">
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">
                  Getting to <span className="font-serif">Savoria</span>{" "}
                  {selectedBranch.name}
                </h3>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">Address</h4>
                  <p className="text-muted-foreground">
                    {selectedBranch.address}
                  </p>
                </div>
                <Button
                  variant="outline"
                  className="mt-2 w-full"
                  onClick={() =>
                    window.open(
                      `https://maps.google.com/?q=${encodeURIComponent(
                        `Savoria ${selectedBranch.address}`
                      )}`,
                      "_blank"
                    )
                  }
                >
                  Get Directions <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </TabsContent>
          </Tabs>

          {/* Map */}
          <div
            id="map-container"
            className="mt-8 rounded-lg overflow-hidden border border-muted h-[300px] relative"
          >
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
                src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3024.2219901290355!2d${
                  selectedBranch.coordinates?.longitude || -74.00939
                }!3d${
                  selectedBranch.coordinates?.latitude || 40.71239
                }!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zM4YZasdf!5e0!3m2!1sen!2sus!4v1648482801994!5m2!1sen!2sus`}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`Savoria ${selectedBranch.name} Location`}
                aria-label={`Google Maps showing Savoria ${selectedBranch.name} location`}
              ></iframe>
            )}
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mt-16 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-amber-500 text-center">
          Frequently Asked Questions
        </h2>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>
              How do I find the closest Savoria location?
            </AccordionTrigger>
            <AccordionContent>
              Savoria has multiple locations across the New York metro area. You
              can use the location selector on this page to find details about
              each branch, including address, hours, and contact information.
              For directions, select the "Directions" tab after choosing your
              preferred location.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>
              Do you offer catering services at all locations?
            </AccordionTrigger>
            <AccordionContent>
              Yes, all Savoria locations offer full-service catering for events
              of all sizes, from intimate gatherings to large corporate
              functions. Our catering menu includes many of our restaurant
              favorites as well as special items designed for events. Please
              select "Catering" in our contact form for more details.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-5">
            <AccordionTrigger>
              What dietary restrictions can Savoria accommodate?
            </AccordionTrigger>
            <AccordionContent>
              At all Savoria locations, we can accommodate most dietary
              restrictions including vegetarian, vegan, gluten-free, and various
              allergies. Please inform us of any dietary restrictions when
              making your reservation or when placing your order.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-6">
            <AccordionTrigger>
              How can I provide feedback about my dining experience?
            </AccordionTrigger>
            <AccordionContent>
              We value your feedback! Please select "Feedback" in our contact
              form and specify which location you visited. Your comments help us
              improve and provide better service to all our guests at Savoria.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-7">
            <AccordionTrigger>
              Are the menus the same at all Savoria locations?
            </AccordionTrigger>
            <AccordionContent>
              While all Savoria locations share our signature dishes and
              commitment to quality, each location offers some unique specials
              that highlight local ingredients and culinary traditions. Visit
              each location for a slightly different but equally delightful
              dining experience.
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
            Stay updated with our latest menu items, special events, and
            exclusive offers.
          </p>
        </div>
        <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <Input
            type="email"
            placeholder="Your email address"
            className="flex-grow"
            required
          />
          <Button
            type="submit"
            className="bg-amber-500 hover:bg-amber-600 text-white whitespace-nowrap"
          >
            Subscribe
          </Button>
        </form>
      </div>
    </div>
  );
}
