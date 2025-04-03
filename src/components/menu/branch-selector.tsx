"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { MapPin, ChevronDown, Check, ShoppingBag } from "lucide-react";
import { getAllBranches, type Branch } from "@/lib/menu-data";
import { Button } from "@/components/ui/button";
import { useMenuStore } from "@/lib/store";

interface BranchSelectorProps {
  selectedBranch: Branch;
  onBranchChange: (branch: Branch) => void;
}

export function BranchSelector({
  selectedBranch,
  onBranchChange,
}: BranchSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const branches = getAllBranches();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { getCartItemsCount } = useMenuStore();
  const cartItemsCount = getCartItemsCount();
  const router = useRouter();

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Get the selected branch name
  const selectedBranchName =
    branches.find((branch) => branch.id === selectedBranch)?.name ||
    "Select branch";

  return (
    <div className="bg-muted p-4 rounded-lg mb-6">
      <div className="flex flex-row items-center justify-between">
        <div className="flex items-center gap-2">
          <MapPin className="h-5 w-5 text-primary" />
          <span className="font-medium">Select Local</span>
        </div>

        {/* Cart button - now redirects to cart page */}
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-2"
          onClick={() => router.push("/cart")}
        >
          <ShoppingBag className="h-4 w-4" />
          <span className="hidden sm:inline">Cart</span>
          {cartItemsCount > 0 && (
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-black">
              {cartItemsCount}
            </span>
          )}
        </Button>
      </div>

      {/* Custom dropdown implementation */}
      <div className="relative w-full mt-2" ref={dropdownRef}>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-primary focus:ring-offset-2"
          aria-haspopup="listbox"
          aria-expanded={isOpen}
        >
          <span className="block truncate">{selectedBranchName}</span>
          <ChevronDown className="h-4 w-4 opacity-50" />
        </button>

        {isOpen && (
          <div
            className="absolute mt-1 w-full z-[9999] rounded-md border border-border bg-background shadow-lg"
            style={{ position: "absolute", top: "100%", left: 0 }}
          >
            <ul
              className="max-h-60 overflow-auto py-1 text-base"
              role="listbox"
            >
              {branches.map((branch) => (
                <li
                  key={branch.id}
                  className={`relative cursor-pointer select-none py-2 pl-10 pr-4 ${
                    branch.id === selectedBranch
                      ? "bg-muted"
                      : "hover:bg-muted/50"
                  }`}
                  role="option"
                  aria-selected={branch.id === selectedBranch}
                  onClick={() => {
                    onBranchChange(branch.id as Branch);
                    setIsOpen(false);
                  }}
                >
                  <span className="block truncate">{branch.name}</span>
                  {branch.id === selectedBranch && (
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-primary">
                      <Check className="h-5 w-5" aria-hidden="true" />
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
