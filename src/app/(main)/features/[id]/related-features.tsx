"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, Clock, Award } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function RelatedFeatures({ features }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {features.map((feature, index) => (
        <motion.div
          key={feature.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <Link href={`/features/${feature.id}`}>
            <Card className="overflow-hidden border border-gray-200 bg-white group h-full hover:shadow-md hover:shadow-amber-500/20 transition-all duration-300">
              <div className="relative">
                <img
                  src={feature.image || "/placeholder.svg"}
                  alt={feature.title}
                  className="w-full h-40 object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-0 right-0 m-2">
                  <Badge className="bg-amber-500 text-white hover:bg-amber-600 text-xs">
                    {feature.badge}
                  </Badge>
                </div>
              </div>
              <CardContent className="p-4">
                <div className="flex items-center mb-1">
                  {feature.type === "promotion" ? (
                    <Award className="w-4 h-4 mr-1 text-amber-500" />
                  ) : (
                    <Calendar className="w-4 h-4 mr-1 text-amber-500" />
                  )}
                  <span className="text-gray-500 text-xs uppercase tracking-wider">
                    {feature.type === "promotion" ? "Offer" : "Event"}
                  </span>
                </div>
                <h3 className="text-base font-semibold mb-1 text-gray-800 group-hover:text-amber-500 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-xs mb-2 line-clamp-2">
                  {feature.description}
                </p>
                <div className="flex flex-wrap items-center mt-2 pt-2 border-t border-gray-200">
                  <div className="flex items-center text-amber-500 mr-3 text-xs">
                    <Calendar className="w-3 h-3 mr-1" />
                    <span>{feature.date}</span>
                  </div>
                  {feature.time && (
                    <div className="flex items-center text-amber-500 text-xs">
                      <Clock className="w-3 h-3 mr-1" />
                      <span>{feature.time}</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
