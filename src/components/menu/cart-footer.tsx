"use client";

import { useRouter } from "next/navigation";
import { ShoppingBag, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMenuStore } from "@/lib/store";
import { getAllBranches } from "@/lib/branch-data";

export function CartFooter() {
  const {
    cart,
    getCartTotal,
    getCartItemsCount,
    getCartBranchConflicts,
    selectedBranch,
  } = useMenuStore();
  const router = useRouter();
  const totalAmount = getCartTotal();
  const itemCount = getCartItemsCount();
  const { branchConflicts } = getCartBranchConflicts();
  const branches = getAllBranches();

  // Don't show the footer if the cart is empty
  if (itemCount === 0) {
    return null;
  }

  // Get the name of the current branch
  const currentBranchName =
    branches.find((b) => b.id === selectedBranch)?.name || selectedBranch;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50 px-4 py-3">
      <div className="container mx-auto max-w-6xl">
        {branchConflicts && (
          <div className="mb-3 p-2 bg-primary/10 border border-primary/30 rounded-md flex items-start gap-2">
            <AlertTriangle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
            <div className="text-sm">
              <p className="font-medium text-primary-foreground">
                Branch Conflict
              </p>
              <p className="text-muted-foreground">
                Some items in your cart are from different branches and may not
                be available at {currentBranchName}.
              </p>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-sm text-muted-foreground">
              Total ({itemCount} items)
            </span>
            <span className="text-xl font-bold">${totalAmount.toFixed(2)}</span>
          </div>

          <Button
            className="bg-black hover:bg-black/80 text-white flex items-center gap-2"
            onClick={() => router.push("/cart")}
          >
            <ShoppingBag className="h-4 w-4" />
            <span className="hidden sm:inline">View Cart</span>
            <span className="sm:hidden">Cart</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
