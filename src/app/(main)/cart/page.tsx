"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, AlertTriangle, Trash2, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useMenuStore } from "@/lib/store";
import { getDishDetails } from "@/lib/dish-data";
import { getAllBranches, type Branch } from "@/lib/menu-data";

export default function CartPage() {
  const {
    cart,
    getCartTotal,
    removeFromCart,
    updateCartItemQuantity,
    getCartBranchConflicts,
    selectedBranch,
    setSelectedBranch,
    setEditingCartItemIndex,
  } = useMenuStore();

  const router = useRouter();
  const totalAmount = getCartTotal();

  const { branchConflicts, conflictItems, conflictBranches } =
    getCartBranchConflicts();
  const branches = getAllBranches();

  // Get the name of the current branch
  const currentBranchName =
    branches.find((b) => b.id === selectedBranch)?.name || selectedBranch;

  // Get unique branches in the cart
  const uniqueBranchesInCart = [...new Set(cart.map((item) => item.branchId))];

  const handleProceedToCheckout = () => {
    router.push("/cart/checkout");
  };

  const handleSwitchBranch = (branchId: Branch) => {
    setSelectedBranch(branchId);
  };

  const handleRemoveConflictItems = () => {
    // Remove all items that don't match the current branch
    // We need to iterate backwards to avoid index shifting issues when removing items
    for (let i = cart.length - 1; i >= 0; i--) {
      if (cart[i].branchId !== selectedBranch) {
        removeFromCart(i);
      }
    }
  };

  const handleEditItem = (index: number) => {
    const item = cart[index];
    setEditingCartItemIndex(index);
    router.push(`/menu/${item.dishId}`);
  };

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-2xl">
        <div className="mb-6">
          <Link
            href="/menu"
            className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Menu
          </Link>
        </div>

        <Card className="text-center">
          <CardHeader>
            <CardTitle className="text-2xl">Your Cart is Empty</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="py-8">
              <div className="mx-auto w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-muted-foreground"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
              </div>
              <p className="text-muted-foreground">
                Your cart is empty. Add some delicious items from our menu!
              </p>
            </div>
            <Button asChild className="w-full">
              <Link href="/menu">Browse Menu</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl pb-24">
      <div className="mb-6">
        <Link
          href="/menu"
          className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Menu
        </Link>
      </div>

      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>

      {branchConflicts && (
        <Card className="mb-8 border-amber-200 bg-amber-50">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-amber-800">
              <AlertTriangle className="h-5 w-5 text-amber-500" />
              Branch Conflict Detected
            </CardTitle>
          </CardHeader>
          <CardContent className="text-amber-700">
            <p className="mb-4">
              Your cart contains items from multiple branches. You are currently
              ordering from <strong>{currentBranchName}</strong>, but some items
              in your cart are from different branches and may not be available.
            </p>

            <div className="space-y-4">
              {Object.entries(conflictBranches).map(([branchId, items]) => {
                const branchName =
                  branches.find((b) => b.id === branchId)?.name || branchId;
                return (
                  <div
                    key={branchId}
                    className="bg-white p-3 rounded-md border border-amber-200"
                  >
                    <h3 className="font-medium mb-2">
                      Items from {branchName}:
                    </h3>
                    <ul className="list-disc pl-5 space-y-1 mb-3">
                      {items.map((item, index) => {
                        const dish = getDishDetails(item.dishId);
                        return (
                          <li key={index}>
                            {item.quantity}x {dish?.name || item.dishId}
                          </li>
                        );
                      })}
                    </ul>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleSwitchBranch(branchId as Branch)}
                    >
                      Switch to {branchName}
                    </Button>
                  </div>
                );
              })}
            </div>
          </CardContent>
          <CardFooter className="flex justify-end gap-3 border-t border-amber-200 pt-4">
            <Button
              variant="outline"
              className="text-amber-800 border-amber-300"
              onClick={handleRemoveConflictItems}
            >
              Remove Conflicting Items
            </Button>
          </CardFooter>
        </Card>
      )}

      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {cart.map((item, index) => {
                  const dish = getDishDetails(item.dishId);
                  if (!dish) return null;

                  // Check if this item is from a different branch
                  const isConflict = item.branchId !== selectedBranch;
                  const itemBranchName =
                    branches.find((b) => b.id === item.branchId)?.name ||
                    item.branchId;

                  return (
                    <div
                      key={index}
                      className={`flex flex-col sm:flex-row justify-between items-start py-4 border-b ${
                        isConflict
                          ? "bg-amber-50 p-2 rounded-md border border-amber-200"
                          : ""
                      }`}
                    >
                      <div className="flex-1 mb-3 sm:mb-0">
                        <div className="flex items-start">
                          <div className="mr-3 flex items-center space-x-2">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-7 w-7 rounded-full"
                              onClick={() =>
                                updateCartItemQuantity(index, item.quantity - 1)
                              }
                              disabled={item.quantity <= 1}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="w-5 text-center">
                              {item.quantity}
                            </span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-7 w-7 rounded-full"
                              onClick={() =>
                                updateCartItemQuantity(index, item.quantity + 1)
                              }
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                          <div>
                            <h4 className="font-medium">
                              {dish.name}
                              {isConflict && (
                                <span className="ml-2 text-xs text-amber-600 font-normal">
                                  (From {itemBranchName})
                                </span>
                              )}
                            </h4>
                            <div className="text-sm text-muted-foreground">
                              {item.cookingPreference && (
                                <span className="block">
                                  Cooking:{" "}
                                  {
                                    dish.cookingOptions?.find(
                                      (o) => o.id === item.cookingPreference
                                    )?.name
                                  }
                                </span>
                              )}
                              {item.sideDish && (
                                <span className="block">
                                  Side:{" "}
                                  {
                                    dish.sideOptions?.find(
                                      (o) => o.id === item.sideDish
                                    )?.name
                                  }
                                </span>
                              )}
                              {item.addOns.length > 0 && (
                                <span className="block">
                                  Add-ons:{" "}
                                  {item.addOns
                                    .map(
                                      (id) =>
                                        dish.addOns?.find((a) => a.id === id)
                                          ?.name
                                    )
                                    .filter(Boolean)
                                    .join(", ")}
                                </span>
                              )}
                              {item.specialInstructions && (
                                <span className="block italic">
                                  "{item.specialInstructions}"
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto">
                        <div className="font-medium">
                          ${item.totalPrice.toFixed(2)}
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 text-muted-foreground hover:text-foreground"
                            onClick={() => handleEditItem(index)}
                          >
                            Edit
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 text-red-500 hover:text-red-600 hover:bg-red-50"
                            onClick={() => removeFromCart(index)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Branch selection */}
          <Card>
            <CardHeader>
              <CardTitle>Branch Selection</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  You are currently ordering from:
                </p>
                <div className="font-medium text-lg">{currentBranchName}</div>

                {uniqueBranchesInCart.length > 1 && (
                  <div className="mt-4">
                    <p className="text-sm text-muted-foreground mb-2">
                      Your cart contains items from multiple branches:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {uniqueBranchesInCart.map((branchId) => {
                        const branchName =
                          branches.find((b) => b.id === branchId)?.name ||
                          branchId;
                        return (
                          <Button
                            key={branchId}
                            variant={
                              branchId === selectedBranch
                                ? "default"
                                : "outline"
                            }
                            size="sm"
                            onClick={() => handleSwitchBranch(branchId)}
                          >
                            {branchName}
                          </Button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="sticky top-4">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${totalAmount.toFixed(2)}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span>${totalAmount.toFixed(2)}</span>
              </div>

              <Button
                className="w-full mt-4 bg-primary hover:bg-primary/80 text-white"
                disabled={branchConflicts}
                onClick={handleProceedToCheckout}
              >
                Proceed to Checkout
              </Button>

              {branchConflicts && (
                <p className="text-xs text-amber-600 text-center mt-2">
                  Please resolve branch conflicts before proceeding.
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
