"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronDown, ChevronUp, Minus, Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import type { DishDetails } from "@/lib/dish-data";

interface DishDetailPageProps {
  dish: DishDetails;
}

export function DishDetailPage({ dish }: DishDetailPageProps) {
  const [quantity, setQuantity] = useState(1);
  const [cookingPreference, setCookingPreference] = useState(
    dish.cookingOptions?.[2]?.id || ""
  );
  const [sideDish, setSideDish] = useState(dish.sideOptions?.[0]?.id || "");
  const [addOns, setAddOns] = useState<string[]>([]);
  const [expandedSections, setExpandedSections] = useState<
    Record<string, boolean>
  >({
    ingredients: false,
    allergens: false,
    nutrition: false,
    preparation: false,
  });

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleAddOnToggle = (id: string) => {
    setAddOns((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const calculateTotal = () => {
    let total = dish.price * quantity;

    // Add the price of selected add-ons
    addOns.forEach((addOnId) => {
      const addOn = dish.addOns?.find((item) => item.id === addOnId);
      if (addOn) {
        total += addOn.price * quantity;
      }
    });

    return total.toFixed(2);
  };

  return (
    <main className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-6">
        <Link
          href="/menu"
          className="inline-flex items-center text-sm font-medium text-primary hover:underline"
        >
          <ChevronLeft className="mr-1 h-4 w-4" />
          Back to Menu
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Dish Image */}
        <div className="bg-muted rounded-lg overflow-hidden">
          <div className="relative aspect-square">
            <Image
              src={dish.image || "/placeholder.svg?height=400&width=400"}
              alt={dish.name}
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Dish Details */}
        <div>
          <div className="flex justify-between items-start mb-2">
            <h1 className="text-3xl font-bold">{dish.name}</h1>
            <span className="text-2xl font-bold text-primary">
              ${dish.price.toFixed(2)}
            </span>
          </div>

          <p className="text-muted-foreground mb-4">{dish.description}</p>

          {/* Dietary Tags */}
          {dish.dietary && dish.dietary.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {dish.dietary.map((diet) => (
                <Badge key={diet} variant="outline" className="bg-background">
                  {diet}
                </Badge>
              ))}
            </div>
          )}

          <Separator className="my-6" />

          {/* Customization Options */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Choose your preferences</h2>

            {/* Cooking Preference */}
            {dish.cookingOptions && dish.cookingOptions.length > 0 && (
              <div className="space-y-3">
                <label className="block font-medium">
                  Cooking Preference <span className="text-primary">*</span>
                </label>
                {dish.cookingOptions.map((option) => (
                  <label
                    key={option.id}
                    className="flex items-center p-3 border rounded-md cursor-pointer hover:bg-muted/50"
                  >
                    <input
                      type="radio"
                      name="cookingPreference"
                      value={option.id}
                      checked={cookingPreference === option.id}
                      onChange={() => setCookingPreference(option.id)}
                      className="mr-3 text-primary focus:ring-primary"
                    />
                    <span>{option.name}</span>
                  </label>
                ))}
              </div>
            )}

            {/* Side Dish */}
            {dish.sideOptions && dish.sideOptions.length > 0 && (
              <div className="space-y-3">
                <label className="block font-medium">
                  Side Dish <span className="text-primary">*</span>
                </label>
                {dish.sideOptions.map((option) => (
                  <label
                    key={option.id}
                    className="flex items-center p-3 border rounded-md cursor-pointer hover:bg-muted/50"
                  >
                    <input
                      type="radio"
                      name="sideDish"
                      value={option.id}
                      checked={sideDish === option.id}
                      onChange={() => setSideDish(option.id)}
                      className="mr-3 text-primary focus:ring-primary"
                    />
                    <span>{option.name}</span>
                  </label>
                ))}
              </div>
            )}

            {/* Optional Add-ons */}
            {dish.addOns && dish.addOns.length > 0 && (
              <div className="space-y-3">
                <h3 className="font-medium">Optional Add-ons</h3>
                {dish.addOns.map((addOn) => (
                  <label
                    key={addOn.id}
                    className="flex items-center justify-between p-3 border rounded-md cursor-pointer hover:bg-muted/50"
                  >
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={addOns.includes(addOn.id)}
                        onChange={() => handleAddOnToggle(addOn.id)}
                        className="mr-3 text-primary focus:ring-primary"
                      />
                      <span>{addOn.name}</span>
                    </div>
                    <span className="font-medium">
                      +${addOn.price.toFixed(2)}
                    </span>
                  </label>
                ))}
              </div>
            )}
          </div>

          <Separator className="my-6" />

          {/* Collapsible Sections */}
          <div className="space-y-2">
            {/* Ingredients */}
            <div className="border rounded-md overflow-hidden">
              <button
                className="flex items-center justify-between w-full p-4 text-left font-medium"
                onClick={() => toggleSection("ingredients")}
              >
                <span>Ingredients</span>
                {expandedSections.ingredients ? (
                  <ChevronUp className="h-5 w-5 text-muted-foreground" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-muted-foreground" />
                )}
              </button>

              {expandedSections.ingredients && dish.ingredients && (
                <div className="p-4 pt-0 bg-muted/20">
                  <ul className="list-disc pl-5 space-y-1">
                    {dish.ingredients.map((ingredient, index) => (
                      <li key={index}>{ingredient}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Allergen Information */}
            <div className="border rounded-md overflow-hidden">
              <button
                className="flex items-center justify-between w-full p-4 text-left font-medium"
                onClick={() => toggleSection("allergens")}
              >
                <span>Allergen Information</span>
                {expandedSections.allergens ? (
                  <ChevronUp className="h-5 w-5 text-muted-foreground" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-muted-foreground" />
                )}
              </button>

              {expandedSections.allergens && dish.allergens && (
                <div className="p-4 pt-0 bg-muted/20">
                  <p className="mb-2">
                    This dish contains the following allergens:
                  </p>
                  <ul className="list-disc pl-5 space-y-1">
                    {dish.allergens.map((allergen, index) => (
                      <li key={index}>{allergen}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Nutrition Facts */}
            <div className="border rounded-md overflow-hidden">
              <button
                className="flex items-center justify-between w-full p-4 text-left font-medium"
                onClick={() => toggleSection("nutrition")}
              >
                <span>Nutrition Facts</span>
                {expandedSections.nutrition ? (
                  <ChevronUp className="h-5 w-5 text-muted-foreground" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-muted-foreground" />
                )}
              </button>

              {expandedSections.nutrition && dish.nutritionFacts && (
                <div className="p-4 pt-0 bg-muted/20">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="p-2 bg-muted/30 rounded">
                      <p className="text-sm text-muted-foreground">Calories</p>
                      <p className="font-medium">
                        {dish.nutritionFacts.calories} kcal
                      </p>
                    </div>
                    <div className="p-2 bg-muted/30 rounded">
                      <p className="text-sm text-muted-foreground">Protein</p>
                      <p className="font-medium">
                        {dish.nutritionFacts.protein}g
                      </p>
                    </div>
                    <div className="p-2 bg-muted/30 rounded">
                      <p className="text-sm text-muted-foreground">Carbs</p>
                      <p className="font-medium">
                        {dish.nutritionFacts.carbs}g
                      </p>
                    </div>
                    <div className="p-2 bg-muted/30 rounded">
                      <p className="text-sm text-muted-foreground">Fat</p>
                      <p className="font-medium">{dish.nutritionFacts.fat}g</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Preparation Time */}
            <div className="border rounded-md overflow-hidden">
              <button
                className="flex items-center justify-between w-full p-4 text-left font-medium"
                onClick={() => toggleSection("preparation")}
              >
                <span>Preparation Time</span>
                {expandedSections.preparation ? (
                  <ChevronUp className="h-5 w-5 text-muted-foreground" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-muted-foreground" />
                )}
              </button>

              {expandedSections.preparation && dish.preparationTime && (
                <div className="p-4 pt-0 bg-muted/20">
                  <p>Approximately {dish.preparationTime} minutes</p>
                </div>
              )}
            </div>
          </div>

          <Separator className="my-6" />

          {/* Quantity and Add to Order */}
          <div className="space-y-6">
            <div className="flex items-center">
              <span className="mr-4 font-medium">Quantity:</span>
              <div className="flex items-center">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={decreaseQuantity}
                  disabled={quantity <= 1}
                  className="h-8 w-8 rounded-full"
                >
                  <Minus className="h-4 w-4" />
                  <span className="sr-only">Decrease quantity</span>
                </Button>
                <span className="mx-3 w-8 text-center">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={increaseQuantity}
                  className="h-8 w-8 rounded-full"
                >
                  <Plus className="h-4 w-4" />
                  <span className="sr-only">Increase quantity</span>
                </Button>
              </div>
            </div>

            <Button
              className="w-full bg-black hover:bg-black/80 text-white"
              size="lg"
            >
              Add to Order • ${calculateTotal()}
            </Button>

            <div className="space-y-2">
              <label className="block font-medium">
                Special Instructions (Optional)
              </label>
              <Textarea
                placeholder="Any special requests or dietary concerns?"
                className="resize-none"
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
