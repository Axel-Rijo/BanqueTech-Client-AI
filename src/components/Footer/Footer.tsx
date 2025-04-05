"use client";
import { Mail, MapPin, Phone, Utensils } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Footer() {
  return (
    <footer className="bg-white py-16">
      <hr className="mx-4 mb-4" />
      <div className="container px-4 md:px-6 mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* About Us Column */}
          <div>
            <div className="flex items-center mb-6">
              <Link href="/" className="flex items-center space-x-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-amber-500">
                  <Utensils className="h-5 w-5 text-white" />
                </div>
                <span className="font-serif text-xl font-bold text-black">
                  Savoria
                </span>
              </Link>
            </div>
            <h3 className="text-lg font-bold text-black mb-4">About Us</h3>
            <p className="text-gray-600 mb-6">
              Bringing the authentic flavors of Italy to your table since 1995.
              Savoria is a family-owned restaurant dedicated to providing an
              unforgettable culinary experience.
            </p>
            <div className="flex space-x-4">
              <Link
                href="#"
                className="text-gray-600 hover:text-amber-500 transition-colors"
                aria-label="Facebook"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </Link>
              <Link
                href="#"
                className="text-gray-600 hover:text-amber-500 transition-colors"
                aria-label="Instagram"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </Link>
              <Link
                href="#"
                className="text-gray-600 hover:text-amber-500 transition-colors"
                aria-label="Twitter"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Opening Hours Column */}
          <div>
            <h3 className="text-lg font-bold text-black mb-4">Opening Hours</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Monday - Thursday</span>
                <span className="text-gray-600">11:00 AM - 10:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Friday - Saturday</span>
                <span className="text-gray-600">11:00 AM - 11:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Sunday</span>
                <span className="text-gray-600">12:00 PM - 9:00 PM</span>
              </div>
            </div>
          </div>

          {/* Contact Us Column */}
          <div>
            <h3 className="text-lg font-bold text-black mb-4">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="size-5 text-amber-500 shrink-0 mt-0.5" />
                <p className="text-gray-600">
                  123 Main Street
                  <br />
                  New York, NY 10001
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="size-5 text-amber-500" />
                <a
                  href="tel:+12123456789"
                  className="text-gray-600 hover:text-amber-500 transition-colors"
                >
                  (212) 345-6789
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="size-5 text-amber-500" />
                <a
                  href="mailto:info@savoria.com"
                  className="text-gray-600 hover:text-amber-500 transition-colors"
                >
                  info@savoria.com
                </a>
              </div>
            </div>
          </div>

          {/* Newsletter Column */}
          <div>
            <h3 className="text-lg font-bold text-black mb-4">Newsletter</h3>
            <p className="text-gray-600 mb-4">
              Subscribe to receive updates on special events, new menu items,
              and exclusive offers.
            </p>
            <form className="space-y-2" onSubmit={(e) => e.preventDefault()}>
              <Input
                type="email"
                placeholder="Your email address"
                required
                className="w-full border-gray-300 focus:border-amber-500 focus:ring-amber-500"
              />
              <Button
                type="submit"
                className="w-full bg-amber-500 hover:bg-amber-600 text-white border-none cursor-pointer"
              >
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="mt-16 flex flex-col md:flex-row justify-between items-center">
          <div className="flex space-x-4 mb-4 md:mb-0">
            <Link
              href="/"
              className="text-gray-600 hover:text-amber-500 transition-colors"
            >
              <h1>Home</h1>
            </Link>
            <Link
              href="/menu"
              className="text-gray-600 hover:text-amber-500 transition-colors"
            >
              Menu
            </Link>
            <Link
              href="/reservation"
              className="text-gray-600 hover:text-amber-500 transition-colors"
            >
              Reservations
            </Link>
            <Link
              href="/about"
              className="text-gray-600 hover:text-amber-500 transition-colors"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="text-gray-600 hover:text-amber-500 transition-colors"
            >
              Contact
            </Link>
          </div>
          <p className="text-sm text-gray-600">
            © {new Date().getFullYear()} Savoria. All rights reserved.
          </p>
        </div>

        {/* Legal and Sitemap Links */}
        <div className="mt-6 flex justify-end space-x-4 text-sm">
          <Link
            href="/privacy-policy"
            className="text-gray-600 hover:text-amber-500 transition-colors"
          >
            Privacy Policy
          </Link>
          <div className="text-gray-300">|</div>
          <Link
            href="/terms-conditions"
            className="text-gray-600 hover:text-amber-500 transition-colors"
          >
            Terms & Conditions
          </Link>
          <div className="text-gray-300">|</div>
          <Link
            href="/sitemap"
            className="text-gray-600 hover:text-amber-500 transition-colors"
          >
            Sitemap
          </Link>
        </div>
      </div>
    </footer>
  );
}
