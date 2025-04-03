"use client";

import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ShoppingBag } from "lucide-react";
import type { MenuItem as MenuItemType } from "@/lib/menu-data";
import { useMenuStore } from "@/lib/store";
import { DishVariationsDialog } from "./dish-variations-dialog";
import { useMobile } from "@/hooks/use-mobile";

interface MenuItemProps {
  item: MenuItemType;
}

export function MenuItem({ item }: MenuItemProps) {
  const { getDishQuantityInCart } = useMenuStore();
  const quantityInCart = getDishQuantityInCart(item.id);
  const isMobile = useMobile();

  // Mobile-specific card design
  if (isMobile) {
    return (
      <div className="border border-gray-100 rounded-lg overflow-hidden bg-white mb-4 shadow-sm">
        <Link href={`/menu/${item.id}`} className="block">
          <div className="aspect-[2/1] relative bg-gray-50">
            <Image
              src={item.image || "/placeholder.svg?height=200&width=300"}
              alt={item.name}
              fill
              className="object-cover"
            />

            {/* Cart quantity badge - moved inside the image area */}
            {quantityInCart > 0 && (
              <DishVariationsDialog dishId={item.id}>
                <button
                  className="absolute bottom-2 right-2 bg-black text-white rounded-full px-2 py-1 text-xs font-bold flex items-center gap-1 cursor-pointer hover:bg-gray-800 transition-colors z-10"
                  onClick={(e) => e.stopPropagation()} // Prevent navigation when clicking badge
                >
                  <ShoppingBag className="h-3 w-3" />
                  <span>{quantityInCart}</span>
                </button>
              </DishVariationsDialog>
            )}
          </div>

          <div className="p-3">
            <div className="flex justify-between items-start mb-1">
              <h3 className="font-bold text-base">{item.name}</h3>
              <span className="font-bold text-primary">
                ${item.price.toFixed(2)}
              </span>
            </div>

            <p className="text-muted-foreground text-sm line-clamp-2">
              {item.description}
            </p>
          </div>
        </Link>
      </div>
    );
  }

  // Desktop card design (unchanged)
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow border-black/10 relative">
      <Link href={`/menu/${item.id}`} className="block">
        <div className="aspect-video relative">
          <Image
            src={item.image || "/placeholder.svg?height=200&width=300"}
            alt={item.name}
            fill
            className="object-cover"
          />
          {item.isNew && (
            <Badge className="absolute top-2 right-2 bg-primary text-white">
              New
            </Badge>
          )}
          {item.isSpicy && (
            <Badge className="absolute top-2 left-2 bg-red-500">Spicy</Badge>
          )}
        </div>
      </Link>

      {/* Cart quantity badge */}
      {quantityInCart > 0 && (
        <DishVariationsDialog dishId={item.id}>
          <button
            className="absolute bottom-2 right-2 bg-black text-white rounded-full px-2 py-1 text-xs font-bold flex items-center gap-1 cursor-pointer hover:bg-gray-800 transition-colors z-10"
            onClick={(e) => e.stopPropagation()} // Prevent navigation when clicking badge
          >
            <ShoppingBag className="h-3 w-3" />
            <span>{quantityInCart}</span>
          </button>
        </DishVariationsDialog>
      )}

      <Link href={`/menu/${item.id}`} className="block">
        <div className="p-4">
          <div className="flex justify-between items-start gap-2 mb-2">
            <h3 className="font-bold text-lg">{item.name}</h3>
            <span className="font-bold text-primary whitespace-nowrap">
              ${item.price.toFixed(2)}
            </span>
          </div>
          <p className="text-muted-foreground text-sm mb-3">
            {item.description}
          </p>
          {item.dietary && item.dietary.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {item.dietary.map((diet) => (
                <Badge
                  key={diet}
                  variant="outline"
                  className="text-xs border-primary/50"
                >
                  {diet}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </Link>
    </Card>
  );
}
