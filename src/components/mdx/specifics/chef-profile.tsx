"use client";

import type React from "react";
import { Card, CardContent } from "@/components/ui/card";

interface ChefProfileProps {
  name: string;
  title: string;
  image: string;
  children: React.ReactNode;
}

export function ChefProfile({
  name,
  title,
  image,
  children,
}: ChefProfileProps) {
  return (
    <Card className="my-8 overflow-hidden">
      <CardContent className="p-0">
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/3">
            <img
              src={image || "/placeholder.svg"}
              alt={`Chef ${name}`}
              className="aspect-square h-full w-full object-cover"
            />
          </div>
          <div className="flex flex-1 flex-col p-6">
            <h3 className="text-xl font-bold text-black">{name}</h3>
            <p className="mb-4 text-amber-500">{title}</p>
            <div className="prose prose-sm">{children}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
