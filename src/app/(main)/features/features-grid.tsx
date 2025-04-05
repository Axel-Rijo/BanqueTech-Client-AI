"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, Clock, Award, Search } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { featuresData } from "@/lib/features-data";

// Mock data - in a real app, this would come from a database
const allFeatures = featuresData;

export default function FeaturesGrid() {
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");

  // Filter features based on search query and filters
  const filteredFeatures = allFeatures.filter((feature) => {
    const matchesSearch =
      feature.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      feature.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesType = typeFilter === "all" || feature.type === typeFilter;
    const matchesCategory =
      categoryFilter === "all" || feature.category === categoryFilter;

    return matchesSearch && matchesType && matchesCategory;
  });

  return (
    <div>
      <div className="bg-gray-100 p-4 rounded-lg mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search features..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 bg-white border-gray-200 text-gray-800"
            />
          </div>

          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="bg-white border-gray-200 text-gray-800">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent className="bg-white border-gray-200 text-gray-800">
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="promotion">Promotions</SelectItem>
              <SelectItem value="event">Events</SelectItem>
            </SelectContent>
          </Select>

          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="bg-white border-gray-200 text-gray-800">
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent className="bg-white border-gray-200 text-gray-800">
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="food">Food</SelectItem>
              <SelectItem value="drinks">Drinks</SelectItem>
              <SelectItem value="entertainment">Entertainment</SelectItem>
              <SelectItem value="workshop">Workshops</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {filteredFeatures.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">
            No features match your search criteria.
          </p>
          <Button
            variant="outline"
            className="mt-4 border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-white"
            onClick={() => {
              setSearchQuery("");
              setTypeFilter("all");
              setCategoryFilter("all");
            }}
          >
            Clear Filters
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFeatures.map((feature, index) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <Link href={`/features/${feature.id}`}>
                <Card className="overflow-hidden border border-gray-200 bg-white group h-full hover:shadow-md hover:shadow-amber-500/20 transition-all duration-300">
                  <div className="relative">
                    <img
                      src={feature.image || "/placeholder.svg"}
                      alt={feature.title}
                      className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-0 right-0 m-3">
                      <Badge className="bg-amber-500 text-white hover:bg-amber-600">
                        {feature.badge}
                      </Badge>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gray-800/70 to-transparent h-16"></div>
                  </div>
                  <CardContent className="p-5">
                    <div className="flex items-center mb-2">
                      {feature.type === "promotion" ? (
                        <Award className="w-4 h-4 mr-2 text-amber-500" />
                      ) : (
                        <Calendar className="w-4 h-4 mr-2 text-amber-500" />
                      )}
                      <span className="text-gray-500 text-xs uppercase tracking-wider">
                        {feature.type === "promotion"
                          ? "Special Offer"
                          : "Event"}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold mb-2 text-gray-800 group-hover:text-amber-500 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {feature.description}
                    </p>
                    <div className="flex flex-wrap items-center mt-4 pt-4 border-t border-gray-200">
                      <div className="flex items-center text-amber-500 mr-4">
                        <Calendar className="w-4 h-4 mr-1" />
                        <span className="text-sm">{feature.date}</span>
                      </div>
                      {feature.time && (
                        <div className="flex items-center text-amber-500">
                          <Clock className="w-4 h-4 mr-1" />
                          <span className="text-sm">{feature.time}</span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
