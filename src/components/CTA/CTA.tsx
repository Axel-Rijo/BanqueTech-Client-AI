import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { ArrowRight, CalendarDays, UtensilsCrossed } from "lucide-react";

export default function RestaurantCTA() {
  return (
    <section className="w-full py-12 md:py-24 bg-gray-50 flex justify-center items-center">
      <div className="container px-4 md:px-6 max-w-6xl mx-auto">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
          <div className="space-y-4 text-gray-900 mx-auto max-w-xl">
            <div className="inline-block rounded-lg bg-amber-500 px-3 py-1 text-sm text-black font-medium">
              Experience Culinary Excellence
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center sm:text-left">
              Savor the Moment at{" "}
              <span className="text-amber-500">Savoria</span>
            </h2>
            <p className="text-gray-600 md:text-xl text-center sm:text-left">
              Join us at Savoria for an unforgettable dining experience with our
              chef's special creations and warm, inviting atmosphere.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-6 w-full justify-center sm:justify-start">
              <Link href="/reservations" className="w-full sm:w-auto">
                <Button className="bg-amber-500 hover:bg-amber-600 text-black w-full py-6 text-base">
                  <CalendarDays className="mr-2 h-5 w-5" />
                  Reserve a Table
                </Button>
              </Link>
              <Link href="/menu" className="w-full sm:w-auto">
                <Button
                  variant="outline"
                  className="border-amber-500 text-amber-500 hover:bg-black hover:text-amber-400 w-full py-6 text-base"
                >
                  <UtensilsCrossed className="mr-2 h-5 w-5" />
                  View Our Menu
                </Button>
              </Link>
            </div>
          </div>
          <div className="rounded-xl overflow-hidden border border-gray-200 shadow-lg mx-auto max-w-xl w-full">
            <div className="aspect-video relative bg-white p-6 flex flex-col justify-center">
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-gray-900 text-center sm:text-left">
                  Join Savoria's Culinary Community
                </h3>
                <p className="text-sm text-gray-600 text-center sm:text-left">
                  Subscribe to receive exclusive offers, seasonal menu updates,
                  and invitations to special events at Savoria.
                </p>
                <div className="flex gap-2">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    className="max-w-lg flex-1 bg-white border-gray-200 text-gray-900"
                  />
                  <Button
                    type="submit"
                    className="bg-amber-500 hover:bg-amber-600 text-black"
                  >
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-xs text-gray-500 text-center sm:text-left">
                  By subscribing, you agree to our{" "}
                  <Link
                    href="/terms-conditions"
                    className="underline underline-offset-2 text-amber-500 hover:text-amber-400"
                  >
                    Terms & Conditions
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 text-center max-w-4xl mx-auto">
          <div className="p-4 rounded-lg bg-white border border-gray-200 shadow-sm">
            <p className="font-bold text-2xl text-amber-500">4.9★</p>
            <p className="text-sm text-gray-600">Customer Rating</p>
          </div>
          <div className="p-4 rounded-lg bg-white border border-gray-200 shadow-sm">
            <p className="font-bold text-2xl text-amber-500">15+</p>
            <p className="text-sm text-gray-600">Years of Excellence</p>
          </div>
          <div className="p-4 rounded-lg bg-white border border-gray-200 shadow-sm">
            <p className="font-bold text-2xl text-amber-500">30+</p>
            <p className="text-sm text-gray-600">Signature Dishes</p>
          </div>
          <div className="p-4 rounded-lg bg-white border border-gray-200 shadow-sm">
            <p className="font-bold text-2xl text-amber-500">100%</p>
            <p className="text-sm text-gray-600">Fresh Ingredients</p>
          </div>
        </div>
      </div>
    </section>
  );
}
