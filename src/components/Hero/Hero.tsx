import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function RestaurantHero() {
    return (
        <section className="relative h-[90vh] min-h-[600px] w-full overflow-hidden">
            {/* Background Image with Overlay */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: "url('https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
                    backgroundPosition: "center 25%",
                }}
            >
                <div className="absolute inset-0 bg-black/60" />
            </div>

            {/* Content Container */}
            <div className="relative z-10 flex h-full w-full flex-col items-center justify-center px-4 text-center text-white">
                {/* Small decorative elements */}
                <div className="mb-4 flex items-center justify-center gap-4">
                    <div className="h-[1px] w-8 bg-amber-500" />
                    <span className="text-sm uppercase tracking-widest text-amber-500">Est. 2023</span>
                    <div className="h-[1px] w-8 bg-amber-500" />
                </div>

                {/* Restaurant Name */}
                <h1 className="font-serif text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl">Savoria</h1>

                {/* Tagline */}
                <p className="mt-4 max-w-md text-lg text-white/90 md:text-xl">
                    A culinary journey of exquisite flavors and unforgettable moments
                </p>

                {/* Buttons */}
                <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                    <Link href="/reservation">
                        <Button size="lg" className="min-w-[160px] bg-amber-500 text-black hover:bg-amber-600">
                            Reserve a Table
                        </Button>
                    </Link>
                    <Link href="/menu">
                        <Button
                            size="lg"
                            variant="outline"
                            className="min-w-[160px] border-white bg-transparent text-white hover:bg-white/10"
                        >
                            View Menu
                        </Button>
                    </Link>
                </div>

                {/* Hours */}
                <div className="mt-12 flex flex-col items-center">
                    <span className="text-sm uppercase tracking-wider text-amber-500">Open Hours</span>
                    <span className="text-white/90">Mon-Fri: 11am-10pm | Sat-Sun: 10am-11pm</span>
                </div>
            </div>

            {/* Scroll Down Indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
                <div className="flex flex-col items-center">
                    <span className="text-xs text-amber-500">Scroll Down</span>
                    <svg
                        className="mt-2 h-6 w-6 text-amber-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                    </svg>
                </div>
            </div>
        </section>
    )
}

