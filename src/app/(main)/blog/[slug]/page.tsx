import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Facebook,
  Instagram,
  Twitter,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

// Dynamic imports for MDX files
// import SeasonalIngredients from "@/mdx-posts/seasonal-ingredients-summer-bounty.mdx";
// import BehindTheScenes from "@/mdx-posts/behind-the-scenes-kitchen.mdx";
// import SlowCooking from "@/mdx-posts/slow-cooking-braised-short-ribs.mdx";
// import WinePairing from "@/mdx-posts/wine-pairing-101.mdx";
// import SustainableDining from "@/mdx-posts/sustainable-dining-practices.mdx";

// Map of slugs to MDX components
const mdxComponents = {
  "seasonal-ingredients-summer-bounty": {
    component: SeasonalIngredients,
    metadata: {
      title: "Seasonal Ingredients: Summer's Bounty at Savoria",
      category: "Seasonal",
      author: "Chef Maria Rodriguez",
      authorImage: "/placeholder.svg?height=100&width=100",
      date: "July 5, 2023",
      readTime: 6,
      image: "/placeholder.svg?height=400&width=600",
      tags: ["Seasonal", "Ingredients", "Summer"],
    },
  },
  "behind-the-scenes-kitchen": {
    component: BehindTheScenes,
    metadata: {
      title: "Behind the Scenes: A Day in Savoria's Kitchen",
      category: "Kitchen Stories",
      author: "Chef James Wilson",
      authorImage: "/placeholder.svg?height=100&width=100",
      date: "June 28, 2023",
      readTime: 10,
      image: "/placeholder.svg?height=400&width=600",
      tags: ["Kitchen", "Behind the Scenes", "Restaurant Life"],
    },
  },
  "slow-cooking-braised-short-ribs": {
    component: SlowCooking,
    metadata: {
      title: "The Art of Slow Cooking: Savoria's Signature Braised Short Ribs",
      category: "Cooking Techniques",
      author: "Chef Maria Rodriguez",
      authorImage: "/placeholder.svg?height=100&width=100",
      date: "June 12, 2023",
      readTime: 8,
      image: "/placeholder.svg?height=600&width=1200",
      tags: ["Cooking", "Recipes", "Beef"],
    },
  },
  "wine-pairing-101": {
    component: WinePairing,
    metadata: {
      title: "Wine Pairing 101: Enhancing Your Dining Experience",
      category: "Beverages",
      author: "James Wilson",
      authorImage: "/placeholder.svg?height=100&width=100",
      date: "June 20, 2023",
      readTime: 7,
      image: "/placeholder.svg?height=400&width=600",
      tags: ["Wine", "Pairing", "Beverages"],
    },
  },
  "sustainable-dining-practices": {
    component: SustainableDining,
    metadata: {
      title: "Sustainable Dining: Our Commitment to Eco-Friendly Practices",
      category: "Sustainability",
      author: "Elena Morales",
      authorImage: "/placeholder.svg?height=100&width=100",
      date: "June 8, 2023",
      readTime: 5,
      image: "/placeholder.svg?height=400&width=600",
      tags: ["Sustainability", "Eco-Friendly", "Local"],
    },
  },
};

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  // Check if the slug exists in our MDX components map
  if (!mdxComponents[params.slug]) {
    notFound();
  }

  const { component: MDXContent, metadata: post } = mdxComponents[params.slug];

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <header className="sticky top-0 z-50 w-full border-b bg-white">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-bold text-black">Savoria</span>
          </Link>
          <nav className="hidden md:flex md:gap-6">
            <Link
              href="/"
              className="text-sm font-medium text-black hover:text-amber-500"
            >
              Home
            </Link>
            <Link
              href="/menu"
              className="text-sm font-medium text-black hover:text-amber-500"
            >
              Menu
            </Link>
            <Link
              href="/about"
              className="text-sm font-medium text-black hover:text-amber-500"
            >
              About
            </Link>
            <Link href="/blog" className="text-sm font-medium text-amber-500">
              Blog
            </Link>
            <Link
              href="/contact"
              className="text-sm font-medium text-black hover:text-amber-500"
            >
              Contact
            </Link>
          </nav>
          <Button variant="outline" size="sm" className="hidden md:flex">
            Reserve a Table
          </Button>
          <Button variant="ghost" size="icon" className="md:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6"
            >
              <line x1="4" x2="20" y1="12" y2="12" />
              <line x1="4" x2="20" y1="6" y2="6" />
              <line x1="4" x2="20" y1="18" y2="18" />
            </svg>
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </header>
      <main className="flex-1">
        <article className="container max-w-4xl py-12">
          <Link
            href="/blog"
            className="mb-6 inline-flex items-center text-sm font-medium text-amber-500 hover:underline"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blog
          </Link>
          <div className="space-y-4">
            <div className="inline-block rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-800">
              {post.category}
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-black md:text-4xl lg:text-5xl">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <img
                  src={post.authorImage || "/placeholder.svg"}
                  alt={post.author}
                  className="h-8 w-8 rounded-full object-cover"
                  width={32}
                  height={32}
                />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>{post.date}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{post.readTime} min read</span>
              </div>
            </div>
          </div>
          <div className="my-8 overflow-hidden rounded-xl">
            <img
              src={post.image || "/placeholder.svg"}
              alt={post.title}
              className="h-auto w-full object-cover"
              width={1200}
              height={600}
            />
          </div>

          <div className="prose prose-lg max-w-none dark:prose-invert">
            <MDXContent />
          </div>

          <Separator className="my-12" />
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Share this article:</span>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Facebook className="h-4 w-4" />
                <span className="sr-only">Share on Facebook</span>
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Twitter className="h-4 w-4" />
                <span className="sr-only">Share on Twitter</span>
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Instagram className="h-4 w-4" />
                <span className="sr-only">Share on Instagram</span>
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Tags:</span>
              <div className="flex flex-wrap gap-2">
                {post.tags?.map((tag: string) => (
                  <Link
                    key={tag}
                    href={`/blog/tag/${tag.toLowerCase()}`}
                    className="rounded-full bg-muted px-3 py-1 text-xs font-medium hover:bg-amber-100 hover:text-amber-800"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </article>
        <section className="bg-muted py-12">
          <div className="container">
            <h2 className="mb-8 text-2xl font-bold text-black">
              You Might Also Like
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedPosts.map((post) => (
                <article
                  key={post.id}
                  className="group overflow-hidden rounded-lg border bg-white"
                >
                  <Link href={`/blog/${post.slug}`}>
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={post.image || "/placeholder.svg"}
                        alt={post.title}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        width={400}
                        height={300}
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-lg font-bold text-black group-hover:text-amber-500">
                        {post.title}
                      </h3>
                      <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                        {post.excerpt}
                      </p>
                      <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        <span>{post.date}</span>
                      </div>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t bg-white">
        {/* Footer content remains the same */}
        <div className="container py-8 md:py-12">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <Link href="/" className="flex items-center gap-2">
                <span className="text-xl font-bold text-black">Savoria</span>
              </Link>
              <p className="mt-4 text-sm text-muted-foreground">
                A culinary journey through flavors, traditions, and innovation.
                Savoria brings you the finest dining experience in the heart of
                the city.
              </p>
            </div>
            <div>
              <h3 className="mb-4 text-sm font-semibold uppercase text-black">
                Explore
              </h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="/"
                    className="text-muted-foreground hover:text-amber-500"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="/menu"
                    className="text-muted-foreground hover:text-amber-500"
                  >
                    Menu
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="text-muted-foreground hover:text-amber-500"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blog"
                    className="text-muted-foreground hover:text-amber-500"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-muted-foreground hover:text-amber-500"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-sm font-semibold uppercase text-black">
                Contact
              </h3>
              <address className="not-italic">
                <p className="text-sm text-muted-foreground">
                  123 Culinary Street
                </p>
                <p className="text-sm text-muted-foreground">
                  Foodie District, FC 12345
                </p>
                <p className="mt-4 text-sm text-muted-foreground">
                  Phone: (123) 456-7890
                </p>
                <p className="text-sm text-muted-foreground">
                  Email: info@savoria.com
                </p>
              </address>
            </div>
            <div>
              <h3 className="mb-4 text-sm font-semibold uppercase text-black">
                Hours
              </h3>
              <ul className="space-y-2 text-sm">
                <li className="text-muted-foreground">
                  Monday - Friday: 11am - 10pm
                </li>
                <li className="text-muted-foreground">Saturday: 10am - 11pm</li>
                <li className="text-muted-foreground">Sunday: 10am - 9pm</li>
              </ul>
              <div className="mt-4 flex gap-4">
                <Link href="#" className="text-black hover:text-amber-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                  </svg>
                  <span className="sr-only">Facebook</span>
                </Link>
                <Link href="#" className="text-black hover:text-amber-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                  </svg>
                  <span className="sr-only">Instagram</span>
                </Link>
                <Link href="#" className="text-black hover:text-amber-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                  </svg>
                  <span className="sr-only">Twitter</span>
                </Link>
              </div>
            </div>
          </div>
          <Separator className="my-8" />
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Savoria Restaurant. All rights
              reserved.
            </p>
            <div className="flex gap-4 text-sm text-muted-foreground">
              <Link href="#" className="hover:text-amber-500">
                Privacy Policy
              </Link>
              <Link href="#" className="hover:text-amber-500">
                Terms of Service
              </Link>
              <Link href="#" className="hover:text-amber-500">
                Accessibility
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Sample related posts data
const relatedPosts = [
  {
    id: 1,
    title: "5 Essential Cooking Techniques Every Home Chef Should Master",
    slug: "essential-cooking-techniques",
    excerpt:
      "From perfecting the art of sautéing to mastering the grill, these fundamental techniques will elevate your home cooking.",
    image: "/placeholder.svg?height=300&width=400",
    date: "May 28, 2023",
  },
  {
    id: 2,
    title: "The Perfect Wine Pairings for Beef Dishes",
    slug: "wine-pairings-beef-dishes",
    excerpt:
      "Our sommelier shares expert advice on selecting the ideal wines to complement different cuts and preparations of beef.",
    image: "/placeholder.svg?height=300&width=400",
    date: "June 5, 2023",
  },
  {
    id: 3,
    title: "From Farm to Table: Our Journey with Local Producers",
    slug: "farm-to-table-journey",
    excerpt:
      "Discover how our relationships with local farmers and producers influence our menu and philosophy at Savoria.",
    image: "/placeholder.svg?height=300&width=400",
    date: "June 18, 2023",
  },
];
