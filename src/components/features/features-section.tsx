"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, Award, Utensils } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

// Mock data for featured items
const featuredItems = [
  {
    id: 1,
    type: "promotion",
    title: "Happy Hour Special",
    description: "50% off cocktails and appetizers, Mon-Fri, 4-6pm.",
    date: "Ongoing",
    image: "/images/happy-hour.jpg",
    badge: "Limited Time",
  },
  {
    id: 2,
    type: "event",
    title: "Wine Tasting Evening",
    description: "Premium Italian wines paired with chef-selected appetizers.",
    date: "June 15, 2025",
    time: "7:00 PM",
    image: "/images/wine-tasting.webp",
    badge: "Reservation Required",
  },
  {
    id: 3,
    type: "promotion",
    title: "Chef's Tasting Menu",
    description: "5-course menu with the finest local ingredients.",
    date: "Weekends Only",
    image: "/images/chef-experience.jpg",
    badge: "New",
  },
  {
    id: 4,
    type: "event",
    title: "Live Jazz Night",
    description: "Enjoy our resident jazz quartet with special evening menu.",
    date: "Every Thursday",
    time: "8:00 PM",
    image: "/images/jazz.jpg",
    badge: "Popular",
  },
];

export default function FeaturedSection() {
  const [activeTab, setActiveTab] = useState("all");
  const [visibleItems, setVisibleItems] = useState(featuredItems);

  useEffect(() => {
    if (activeTab === "all") {
      setVisibleItems(featuredItems);
    } else {
      setVisibleItems(featuredItems.filter((item) => item.type === activeTab));
    }
  }, [activeTab]);

  return (
    <section className="w-full py-8 bg-black text-white">
      <div className="container mx-auto px-3">
        <div className="flex flex-col items-center mb-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative mb-1"
          >
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
              Featured at <span className="text-amber-500">Savoria</span>
            </h2>
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-0.5 bg-amber-500"></div>
          </motion.div>
          <p className="text-zinc-400 text-center text-sm max-w-xl mt-4 mb-2">
            Discover our latest promotions and upcoming events
          </p>

          <div className="flex space-x-1 mt-3 p-0.5 bg-zinc-900 rounded-md text-xs">
            <Button
              variant={activeTab === "all" ? "default" : "ghost"}
              size="sm"
              className={
                activeTab === "all"
                  ? "bg-amber-500 hover:bg-amber-600 text-black h-7 text-xs px-3"
                  : "text-white hover:text-amber-500 h-7 text-xs px-3"
              }
              onClick={() => setActiveTab("all")}
            >
              All
            </Button>
            <Button
              variant={activeTab === "promotion" ? "default" : "ghost"}
              size="sm"
              className={
                activeTab === "promotion"
                  ? "bg-amber-500 hover:bg-amber-600 text-black h-7 text-xs px-3"
                  : "text-white hover:text-amber-500 h-7 text-xs px-3"
              }
              onClick={() => setActiveTab("promotion")}
            >
              Promotions
            </Button>
            <Button
              variant={activeTab === "event" ? "default" : "ghost"}
              size="sm"
              className={
                activeTab === "event"
                  ? "bg-amber-500 hover:bg-amber-600 text-black h-7 text-xs px-3"
                  : "text-white hover:text-amber-500 h-7 text-xs px-3"
              }
              onClick={() => setActiveTab("event")}
            >
              Events
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {visibleItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <Card className="overflow-hidden border-0 bg-zinc-900 group h-full">
                <div className="relative">
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    className="w-full h-28 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute top-0 right-0 m-1">
                    <Badge className="bg-amber-500 text-black hover:bg-amber-600 text-[10px] px-2 py-0">
                      {item.badge}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-3">
                  <div className="flex items-center mb-1">
                    {item.type === "promotion" ? (
                      <Award className="w-3 h-3 mr-1 text-amber-500" />
                    ) : (
                      <Calendar className="w-3 h-3 mr-1 text-amber-500" />
                    )}
                    <span className="text-zinc-400 text-[10px] uppercase tracking-wider">
                      {item.type === "promotion" ? "Offer" : "Event"}
                    </span>
                  </div>
                  <h3 className="text-sm font-medium mb-1 text-white group-hover:text-amber-500 transition-colors line-clamp-1">
                    {item.title}
                  </h3>
                  <p className="text-zinc-400 text-xs mb-2 line-clamp-2">
                    {item.description}
                  </p>
                  <div className="flex flex-wrap items-center mt-2 pt-2 border-t border-zinc-800 text-[10px]">
                    <div className="flex items-center text-amber-500 mr-2">
                      <Calendar className="w-3 h-3 mr-0.5" />
                      <span>{item.date}</span>
                    </div>
                    {item.time && (
                      <div className="flex items-center text-amber-500">
                        <Clock className="w-3 h-3 mr-0.5" />
                        <span>{item.time}</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="flex justify-center mt-4">
          <Button
            size="sm"
            className="bg-amber-500 hover:bg-amber-600 text-black group transition-all duration-300 text-xs h-8"
          >
            <Link href={"/features"}>
              <span>View All</span>
            </Link>
            <Utensils className="ml-1 h-3 w-3 transition-transform group-hover:rotate-45" />
          </Button>
        </div>
      </div>
    </section>
  );
}
