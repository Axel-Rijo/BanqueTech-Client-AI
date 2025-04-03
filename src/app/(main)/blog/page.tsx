import Link from "next/link";
import { ArrowRight, Calendar, Clock, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

export default function BlogPage() {
  return (
    <>
      <section className="container py-12 px-4 mx-auto">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-black md:text-4xl">
              Savoria Blog
            </h1>
            <p className="mt-2 text-muted-foreground">
              Culinary stories, recipes, and insights from our kitchen to yours
            </p>
          </div>
          <div className="flex w-full items-center gap-2 md:w-auto">
            <Input
              type="search"
              placeholder="Search articles..."
              className="w-full md:w-[200px] lg:w-[300px]"
            />
            <Button size="icon" variant="ghost">
              <Search className="h-4 w-4" />
              <span className="sr-only">Search</span>
            </Button>
          </div>
        </div>
      </section>
      <section className="container py-8 px-4 mx-auto">
        <div className="overflow-hidden rounded-xl bg-black">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="flex flex-col justify-center p-8 md:p-12">
              <div className="space-y-4">
                <div className="inline-block rounded-full bg-amber-500 px-3 py-1 text-xs font-medium text-black">
                  Featured
                </div>
                <h2 className="text-2xl font-bold text-white md:text-3xl">
                  The Art of Slow Cooking: Savoria's Signature Braised Short
                  Ribs
                </h2>
                <p className="text-gray-300">
                  Discover the secrets behind our most requested dish and learn
                  how to recreate this comfort food classic at home with Chef
                  Maria's step-by-step guide.
                </p>
                <div className="flex items-center gap-4 text-sm text-gray-300">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>June 12, 2023</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>8 min read</span>
                  </div>
                </div>
                <Button className="bg-amber-500 text-black hover:bg-amber-600">
                  Read Article
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
            <img
              src="/placeholder.svg?height=600&width=800"
              alt="Braised short ribs on a plate with vegetables"
              className="aspect-video object-cover md:aspect-auto"
              width={800}
              height={600}
            />
          </div>
        </div>
      </section>
      <section className="container py-12 px-4 mx-auto">
        <h2 className="mb-8 text-2xl font-bold text-black">Recent Articles</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post) => (
            <article
              key={post.id}
              className="group overflow-hidden rounded-lg border"
            >
              <Link href={`/blog/${post.slug}`}>
                <div className="aspect-video overflow-hidden">
                  <img
                    src={post.image || "/placeholder.svg"}
                    alt={post.title}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    width={600}
                    height={400}
                  />
                </div>
                <div className="p-6">
                  <div className="inline-block rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-800">
                    {post.category}
                  </div>
                  <h3 className="mt-3 text-xl font-bold text-black group-hover:text-amber-500">
                    {post.title}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-muted-foreground">
                    {post.excerpt}
                  </p>
                  <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
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
              </Link>
            </article>
          ))}
        </div>
        <div className="mt-12 flex justify-center">
          <Button
            variant="outline"
            className="border-amber-500 text-amber-500 hover:bg-amber-50"
          >
            Load More Articles
          </Button>
        </div>
      </section>
      <section className="bg-amber-50 py-16 px-4">
        <div className="container mx-auto">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-bold text-black md:text-3xl">
              Subscribe to Our Newsletter
            </h2>
            <p className="mt-4 text-muted-foreground">
              Get the latest recipes, cooking tips, and exclusive event
              invitations delivered to your inbox.
            </p>
            <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-center">
              <Input
                type="email"
                placeholder="Enter your email"
                className="w-full sm:max-w-xs"
              />
              <Button className="bg-amber-500 text-black hover:bg-amber-600">
                Subscribe
              </Button>
            </div>
            <p className="mt-3 text-xs text-muted-foreground">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

// Sample blog post data
const blogPosts = [
  {
    id: 1,
    title: "Seasonal Ingredients: Summer's Bounty at Savoria",
    slug: "seasonal-ingredients-summer-bounty",
    excerpt:
      "Explore how we incorporate the freshest summer produce into our seasonal menu, featuring heirloom tomatoes, sweet corn, and stone fruits.",
    image: "/placeholder.svg?height=400&width=600",
    category: "Seasonal",
    date: "July 5, 2023",
    readTime: 6,
  },
  {
    id: 2,
    title: "Behind the Scenes: A Day in Savoria's Kitchen",
    slug: "behind-the-scenes-kitchen",
    excerpt:
      "Take a peek into the organized chaos of our kitchen, from early morning prep to the dinner rush, and meet the talented team that makes it all happen.",
    image: "/placeholder.svg?height=400&width=600",
    category: "Kitchen Stories",
    date: "June 28, 2023",
    readTime: 10,
  },
  {
    id: 3,
    title: "Wine Pairing 101: Enhancing Your Dining Experience",
    slug: "wine-pairing-101",
    excerpt:
      "Our sommelier shares expert tips on pairing wines with food, focusing on complementary flavors and regional combinations.",
    image: "/placeholder.svg?height=400&width=600",
    category: "Beverages",
    date: "June 20, 2023",
    readTime: 7,
  },
  {
    id: 4,
    title: "The Art of Slow Cooking: Savoria's Signature Braised Short Ribs",
    slug: "slow-cooking-braised-short-ribs",
    excerpt:
      "Discover the secrets behind our most requested dish and learn how to recreate this comfort food classic at home with Chef Maria's step-by-step guide.",
    image: "/placeholder.svg?height=600&width=1200",
    category: "Cooking Techniques",
    date: "June 12, 2023",
    readTime: 8,
  },
  {
    id: 5,
    title: "Sustainable Dining: Our Commitment to Eco-Friendly Practices",
    slug: "sustainable-dining-practices",
    excerpt:
      "Learn about our initiatives to reduce food waste, support local farmers, and minimize our environmental footprint while maintaining culinary excellence.",
    image: "/placeholder.svg?height=400&width=600",
    category: "Sustainability",
    date: "June 8, 2023",
    readTime: 5,
  },
  {
    id: 6,
    title: "Chef's Special: The Story Behind Our Famous Chocolate Soufflé",
    slug: "chefs-special-chocolate-souffle",
    excerpt:
      "Our pastry chef reveals the secrets to creating the perfect chocolate soufflé and shares the inspiration behind this beloved dessert.",
    image: "/placeholder.svg?height=400&width=600",
    category: "Desserts",
    date: "June 1, 2023",
    readTime: 6,
  },
];
