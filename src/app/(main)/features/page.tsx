import type { Metadata } from "next";
import FeaturesGrid from "./features-grid";
import { getAllFeatures } from "@/lib/features-data";

export const metadata: Metadata = {
  title: "All Features | Savoria Restaurant",
  description:
    "Discover all our special promotions and upcoming events at Savoria Restaurant.",
};

export default async function FeaturesPage() {
  const features = await getAllFeatures();

  return (
    <main className="min-h-screen bg-white text-gray-800">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            Featured at <span className="text-amber-500">Savoria</span>
          </h1>
          <div className="w-24 h-1 bg-amber-500 mx-auto mb-6"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our complete collection of special promotions, seasonal
            offers, and upcoming events designed to enhance your dining
            experience.
          </p>
        </div>

        <FeaturesGrid />
      </div>
    </main>
  );
}
