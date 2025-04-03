"use client";

import type React from "react";

import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2, Edit } from "lucide-react";
import { useMenuStore, type CartItem } from "@/lib/store";
import { getDishDetails } from "@/lib/dish-data";

interface DishVariationsDialogProps {
  dishId: string;
  children: React.ReactNode;
}

export function DishVariationsDialog({
  dishId,
  children,
}: DishVariationsDialogProps) {
  const {
    cart,
    removeFromCart,
    updateCartItemQuantity,
    setEditingCartItemIndex,
  } = useMenuStore();
  const router = useRouter();

  // Get all variations of this dish in the cart
  const dishVariations = cart.filter((item) => item.dishId === dishId);

  // Get the dish details
  const dishDetails = getDishDetails(dishId);

  if (!dishDetails || dishVariations.length === 0) {
    return children;
  }

  // Function to get the name of an option based on its ID
  const getOptionName = (
    optionType: "cooking" | "side",
    optionId: string | undefined
  ) => {
    if (!optionId) return "N/A";

    if (optionType === "cooking" && dishDetails.cookingOptions) {
      const option = dishDetails.cookingOptions.find(
        (opt) => opt.id === optionId
      );
      return option ? option.name : "N/A";
    }

    if (optionType === "side" && dishDetails.sideOptions) {
      const option = dishDetails.sideOptions.find((opt) => opt.id === optionId);
      return option ? option.name : "N/A";
    }

    return "N/A";
  };

  // Function to get the add-on names
  const getAddOnNames = (addOnIds: string[]) => {
    if (!dishDetails.addOns || addOnIds.length === 0) return "None";

    return addOnIds
      .map((id) => {
        const addOn = dishDetails.addOns?.find((a) => a.id === id);
        return addOn ? addOn.name : "";
      })
      .filter(Boolean)
      .join(", ");
  };

  // Function to get cart item index
  const getCartItemIndex = (item: CartItem) => {
    return cart.findIndex(
      (cartItem) =>
        cartItem.dishId === item.dishId &&
        cartItem.cookingPreference === item.cookingPreference &&
        cartItem.sideDish === item.sideDish &&
        JSON.stringify(cartItem.addOns.sort()) ===
          JSON.stringify(item.addOns.sort()) &&
        cartItem.specialInstructions === item.specialInstructions
    );
  };

  // Function to handle editing a dish
  const handleEditDish = (cartItemIndex: number) => {
    // Set the editing cart item index in the store
    setEditingCartItemIndex(cartItemIndex);

    // Navigate to the dish details page
    router.push(`/menu/${dishId}`);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{dishDetails.name} Variations</DialogTitle>
          <DialogDescription>
            You have {dishVariations.length} different variation(s) of this dish
            in your cart
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-4 max-h-[60vh] overflow-y-auto pr-2">
          {dishVariations.map((variation, index) => {
            const cartItemIndex = getCartItemIndex(variation);

            return (
              <div key={index} className="border rounded-lg p-4 space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-lg">{dishDetails.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      ${variation.price.toFixed(2)} each
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-7 w-7 rounded-full"
                      onClick={() =>
                        updateCartItemQuantity(
                          cartItemIndex,
                          variation.quantity - 1
                        )
                      }
                      disabled={variation.quantity <= 1}
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="w-5 text-center">
                      {variation.quantity}
                    </span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-7 w-7 rounded-full"
                      onClick={() =>
                        updateCartItemQuantity(
                          cartItemIndex,
                          variation.quantity + 1
                        )
                      }
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 text-red-500"
                      onClick={() => removeFromCart(cartItemIndex)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-2 text-sm">
                  {/* Options */}
                  {variation.cookingPreference && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Cooking:</span>
                      <span>
                        {getOptionName("cooking", variation.cookingPreference)}
                      </span>
                    </div>
                  )}

                  {variation.sideDish && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Side:</span>
                      <span>{getOptionName("side", variation.sideDish)}</span>
                    </div>
                  )}

                  {/* Add-ons */}
                  {variation.addOns.length > 0 && (
                    <div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Add-ons:</span>
                        <span>{getAddOnNames(variation.addOns)}</span>
                      </div>
                    </div>
                  )}

                  {/* Special Instructions */}
                  {variation.specialInstructions && (
                    <div>
                      <span className="text-muted-foreground">
                        Special Instructions:
                      </span>
                      <p className="mt-1 bg-muted/50 p-2 rounded text-xs italic">
                        "{variation.specialInstructions}"
                      </p>
                    </div>
                  )}
                </div>

                <div className="flex justify-between items-center pt-2">
                  <span className="font-medium">
                    Total: ${variation.totalPrice.toFixed(2)}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-1"
                    onClick={() => handleEditDish(cartItemIndex)}
                  >
                    <Edit className="h-3 w-3" />
                    <span>Edit</span>
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex justify-between items-center pt-4">
          <div>
            <div className="text-sm text-muted-foreground">Subtotal</div>
            <div className="font-medium">
              $
              {dishVariations
                .reduce((sum, item) => sum + item.totalPrice, 0)
                .toFixed(2)}
            </div>
          </div>
          <Button
            variant="default"
            className="bg-black hover:bg-black/80 text-white"
            onClick={() => window.open("/cart", "_self")}
          >
            View Full Cart
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
