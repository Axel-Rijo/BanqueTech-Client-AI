"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Utensils, User, LogIn, UserPlus, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function RestaurantHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // For demo purposes - in a real app, this would come from your auth system
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Toggle login status (for demo only)
  const toggleLoginStatus = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMenuOpen]);

  return (
    <>
      <header className="w-full bg-white border-b border-black/10 z-10 relative">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo and Brand */}
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

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link
                href="/"
                className="text-black/80 hover:text-amber-500 transition-colors"
              >
                Home
              </Link>
              <Link
                href="/menu"
                className="text-black/80 hover:text-amber-500 transition-colors"
              >
                Menu
              </Link>
              <Link
                href="/about"
                className="text-black/80 hover:text-amber-500 transition-colors"
              >
                About
              </Link>
              <Link
                href="/blog"
                className="text-black/80 hover:text-amber-500 transition-colors"
              >
                Blog
              </Link>
              <Link
                href="/contact"
                className="text-black/80 hover:text-amber-500 transition-colors"
              >
                Contact
              </Link>
            </nav>

            {/* Desktop: Call to Action & User Account */}
            <div className="hidden md:flex items-center space-x-4">
              <Link href={"/reservation"}>
                <Button className="bg-amber-500 hover:bg-amber-600 text-white border-none">
                  Make a Reservation
                </Button>
              </Link>

              {/* User Account Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full border-black/10 hover:bg-amber-50 hover:text-amber-500"
                  >
                    <User className="h-5 w-5" />
                    <span className="sr-only">User account</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  {isLoggedIn ? (
                    <>
                      <div className="px-2 py-1.5 text-sm font-medium">
                        <div className="flex items-center">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-100">
                            <User className="h-4 w-4 text-amber-700" />
                          </div>
                          <div className="ml-2">
                            <p className="text-sm font-medium">John Doe</p>
                            <p className="text-xs text-muted-foreground">
                              john@example.com
                            </p>
                          </div>
                        </div>
                      </div>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link
                          href="/account"
                          className="flex items-center cursor-pointer"
                        >
                          <User className="mr-2 h-4 w-4" />
                          <span>My Account</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link
                          href="/account?tab=reservations"
                          className="flex items-center cursor-pointer"
                        >
                          <Utensils className="mr-2 h-4 w-4" />
                          <span>My Reservations</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        className="flex items-center text-red-500 cursor-pointer"
                        onClick={toggleLoginStatus} // For demo only
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Log out</span>
                      </DropdownMenuItem>
                    </>
                  ) : (
                    <>
                      <DropdownMenuItem asChild>
                        <Link
                          href="/login"
                          className="flex items-center cursor-pointer"
                        >
                          <LogIn className="mr-2 h-4 w-4" />
                          <span>Log in</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link
                          href="/signup"
                          className="flex items-center cursor-pointer"
                        >
                          <UserPlus className="mr-2 h-4 w-4" />
                          <span>Register</span>
                        </Link>
                      </DropdownMenuItem>
                    </>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-black"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu - Rendered at the root level with smooth transitions */}
      <div
        className={`fixed inset-0 bg-white z-50 md:hidden overflow-auto transition-all duration-300 ease-in-out ${
          isMenuOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-[-100%] pointer-events-none"
        }`}
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            {/* Logo in mobile menu */}
            <div className="flex items-center">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-amber-500">
                <Utensils className="h-5 w-5 text-white" />
              </div>
              <span className="font-serif text-xl font-bold text-black ml-3">
                Savoria
              </span>
            </div>

            <button
              className="p-2 text-black"
              onClick={() => setIsMenuOpen(false)}
              aria-label="Close menu"
            >
              <X size={24} />
            </button>
          </div>

          <nav className="flex flex-col space-y-4 mt-8">
            {/* Menu links with subtle entrance animations */}
            <Link
              href="/"
              className="py-3 border-b border-gray-200 text-lg text-black transform transition-transform duration-300 ease-out hover:translate-x-2 hover:text-amber-500"
              style={{ transitionDelay: "150ms" }}
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/menu"
              className="py-3 border-b border-gray-200 text-lg text-black transform transition-transform duration-300 ease-out hover:translate-x-2 hover:text-amber-500"
              style={{ transitionDelay: "200ms" }}
              onClick={() => setIsMenuOpen(false)}
            >
              Menu
            </Link>
            <Link
              href="/about"
              className="py-3 border-b border-gray-200 text-lg text-black transform transition-transform duration-300 ease-out hover:translate-x-2 hover:text-amber-500"
              style={{ transitionDelay: "250ms" }}
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="/blog"
              className="py-3 border-b border-gray-200 text-lg text-black transform transition-transform duration-300 ease-out hover:translate-x-2 hover:text-amber-500"
              style={{ transitionDelay: "300ms" }}
              onClick={() => setIsMenuOpen(false)}
            >
              Blog
            </Link>
            <Link
              href="/contact"
              className="py-3 border-b border-gray-200 text-lg text-black transform transition-transform duration-300 ease-out hover:translate-x-2 hover:text-amber-500"
              style={{ transitionDelay: "350ms" }}
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>

            {/* User Account Section in Mobile Menu */}
            <div className="pt-4 border-t border-gray-200">
              <h3 className="font-medium text-black mb-2">Account</h3>

              {isLoggedIn ? (
                <>
                  <div className="flex items-center py-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100">
                      <User className="h-5 w-5 text-amber-700" />
                    </div>
                    <div className="ml-3">
                      <p className="font-medium">John Doe</p>
                      <p className="text-sm text-gray-500">john@example.com</p>
                    </div>
                  </div>

                  <Link
                    href="/account"
                    className="flex items-center py-3 text-black hover:text-amber-500"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <User className="mr-3 h-5 w-5" />
                    <span>My Account</span>
                  </Link>

                  <Link
                    href="/account?tab=reservations"
                    className="flex items-center py-3 text-black hover:text-amber-500"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Utensils className="mr-3 h-5 w-5" />
                    <span>My Reservations</span>
                  </Link>

                  <button
                    className="flex items-center py-3 w-full text-left text-red-500"
                    onClick={() => {
                      toggleLoginStatus();
                      setIsMenuOpen(false);
                    }}
                  >
                    <LogOut className="mr-3 h-5 w-5" />
                    <span>Log out</span>
                  </button>
                </>
              ) : (
                <div className="flex flex-col space-y-2 mt-3">
                  <Link
                    href="/login"
                    className="flex items-center justify-start py-2 px-4 border border-black/10 rounded-md hover:bg-amber-50 hover:text-amber-500 hover:border-amber-500"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <LogIn className="mr-2 h-5 w-5" />
                    <span>Log in</span>
                  </Link>

                  <Link
                    href="/signup"
                    className="flex items-center justify-start py-2 px-4 border border-black/10 rounded-md hover:bg-amber-50 hover:text-amber-500 hover:border-amber-500"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <UserPlus className="mr-2 h-5 w-5" />
                    <span>Register</span>
                  </Link>
                </div>
              )}
            </div>

            <Link href={"/reservation"}>
              <Button
                className="w-full mt-6 bg-amber-500 hover:bg-amber-600 text-white border-none transition-all duration-300 ease-in-out"
                style={{ transitionDelay: "400ms" }}
                onClick={() => setIsMenuOpen(false)}
              >
                Make a Reservation
              </Button>
            </Link>
          </nav>
        </div>
      </div>
    </>
  );
}
