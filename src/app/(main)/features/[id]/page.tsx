import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Calendar,
  Clock,
  ChevronLeft,
  Award,
  Share2,
  CalendarPlus,
  Heart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { getFeatureById, getRelatedFeatures } from "@/lib/features-data";
import RelatedFeatures from "./related-features";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const feature = await getFeatureById(params.id);

  if (!feature) {
    return {
      title: "Feature Not Found | Savoria Restaurant",
    };
  }

  return {
    title: `${feature.title} | Savoria Restaurant`,
    description: feature.description,
  };
}

export default async function FeatureDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const feature = await getFeatureById(params.id);

  if (!feature) {
    notFound();
  }

  const relatedFeatures = await getRelatedFeatures(
    feature.id,
    feature.category
  );

  return (
    <main className="min-h-screen bg-white text-gray-800">
      <div className="container mx-auto px-4 py-12">
        <Link
          href="/features"
          className="inline-flex items-center text-amber-500 hover:text-amber-600 mb-6"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to all features
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="relative rounded-lg overflow-hidden mb-6 shadow-md">
              <img
                src={feature.image || "/placeholder.svg"}
                alt={feature.title}
                className="w-full h-[300px] md:h-[400px] object-cover"
              />
              <div className="absolute top-4 right-4">
                <Badge className="bg-amber-500 text-white text-sm px-3 py-1">
                  {feature.badge}
                </Badge>
              </div>
            </div>

            <div className="flex items-center mb-4">
              {feature.type === "promotion" ? (
                <Award className="w-5 h-5 mr-2 text-amber-500" />
              ) : (
                <Calendar className="w-5 h-5 mr-2 text-amber-500" />
              )}
              <span className="text-gray-500 text-sm uppercase tracking-wider">
                {feature.type === "promotion" ? "Special Offer" : "Event"}
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              {feature.title}
            </h1>

            <div className="flex flex-wrap items-center mb-6 text-sm">
              <div className="flex items-center text-amber-500 mr-6 mb-2">
                <Calendar className="w-4 h-4 mr-2" />
                <span>{feature.date}</span>
              </div>
              {feature.time && (
                <div className="flex items-center text-amber-500 mb-2">
                  <Clock className="w-4 h-4 mr-2" />
                  <span>{feature.time}</span>
                </div>
              )}
            </div>

            <div className="prose max-w-none mb-8">
              <p className="text-gray-700 leading-relaxed mb-4">
                {feature.description}
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                At Savoria, we pride ourselves on creating exceptional dining
                experiences. This {feature.type} is designed to showcase our
                commitment to culinary excellence and memorable moments.
              </p>
              <p className="text-gray-700 leading-relaxed">
                We recommend making reservations in advance to secure your spot,
                as our special events and promotions are often in high demand.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 mb-8">
              <Button className="bg-amber-500 hover:bg-amber-600 text-white">
                {feature.type === "event"
                  ? "Reserve Your Spot"
                  : "Claim This Offer"}
              </Button>
              <Button
                variant="outline"
                className="border-gray-300 text-gray-700 hover:bg-gray-100"
              >
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
              <Button
                variant="outline"
                className="border-gray-300 text-gray-700 hover:bg-gray-100"
              >
                <Heart className="h-4 w-4 mr-2" />
                Save
              </Button>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-gray-50 rounded-lg p-6 mb-6 border border-gray-200 shadow-sm">
              <h3 className="text-xl font-semibold mb-4 text-gray-900">
                Details
              </h3>
              <ul className="space-y-4">
                <li className="flex justify-between">
                  <span className="text-gray-500">Type:</span>
                  <span className="text-gray-900 font-medium capitalize">
                    {feature.type}
                  </span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-500">Category:</span>
                  <span className="text-gray-900 font-medium capitalize">
                    {feature.category}
                  </span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-500">Date:</span>
                  <span className="text-gray-900 font-medium">
                    {feature.date}
                  </span>
                </li>
                {feature.time && (
                  <li className="flex justify-between">
                    <span className="text-gray-500">Time:</span>
                    <span className="text-gray-900 font-medium">
                      {feature.time}
                    </span>
                  </li>
                )}
                <li className="flex justify-between">
                  <span className="text-gray-500">Location:</span>
                  <span className="text-gray-900 font-medium">
                    Savoria Restaurant
                  </span>
                </li>
              </ul>

              <Separator className="my-4 bg-gray-200" />

              <div className="flex flex-col space-y-3">
                <Button className="bg-amber-500 hover:bg-amber-600 text-white w-full">
                  {feature.type === "event"
                    ? "Reserve Your Spot"
                    : "Claim This Offer"}
                </Button>
                <Button
                  variant="outline"
                  className="border-gray-300 text-gray-700 hover:bg-gray-100 w-full"
                >
                  <CalendarPlus className="h-4 w-4 mr-2" />
                  Add to Calendar
                </Button>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200 shadow-sm">
              <h3 className="text-xl font-semibold mb-4 text-gray-900">
                Contact Us
              </h3>
              <p className="text-gray-600 mb-4">
                Have questions about this {feature.type}? Our team is here to
                help.
              </p>
              <ul className="space-y-3 text-gray-700">
                <li>Phone: (555) 123-4567</li>
                <li>Email: events@savoria.com</li>
                <li>Address: 123 Culinary Ave, Foodville</li>
              </ul>
            </div>
          </div>
        </div>

        {relatedFeatures.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">
              You Might Also Like
            </h2>
            <RelatedFeatures features={relatedFeatures} />
          </div>
        )}
      </div>
    </main>
  );
}
