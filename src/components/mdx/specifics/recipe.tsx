"use client";

import type React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, Users } from "lucide-react";

interface RecipeProps {
  title: string;
  prepTime: string;
  cookTime: string;
  servings: number;
  difficulty?: "Easy" | "Medium" | "Hard";
  children: React.ReactNode;
}

export function Recipe({
  title,
  prepTime,
  cookTime,
  servings,
  difficulty = "Medium",
  children,
}: RecipeProps) {
  return (
    <Card className="my-8 overflow-hidden border-amber-200">
      <CardHeader className="bg-amber-50 pb-4">
        <CardTitle className="text-2xl">{title}</CardTitle>
        <div className="mt-2 flex flex-wrap gap-4 text-sm">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4 text-amber-500" />
            <span>Prep: {prepTime}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4 text-amber-500" />
            <span>Cook: {cookTime}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4 text-amber-500" />
            <span>Serves: {servings}</span>
          </div>
          <div className="flex items-center gap-1">
            <span
              className={`inline-block h-3 w-3 rounded-full ${
                difficulty === "Easy"
                  ? "bg-green-500"
                  : difficulty === "Medium"
                  ? "bg-amber-500"
                  : "bg-red-500"
              }`}
            />
            <span>Difficulty: {difficulty}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-6">{children}</CardContent>
    </Card>
  );
}
