"use client"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { MapPin, ChevronDown, Check, ShoppingBag } from "lucide-react"
import { getAllBranches, type Branch } from "@/lib/branch-data"
import { Button } from "@/components/ui/button"
import { BottomSheet } from "@/components/ui/bottom-sheet"
import { useMenuStore } from "@/lib/store"
import { useMobile } from "@/hooks/use-mobile"

interface BranchSelectorProps {
  selectedBranch: Branch
  onBranchChange: (branch: Branch) => void
}

export function BranchSelector({ selectedBranch, onBranchChange }: BranchSelectorProps) {
  const [isOpen, setIsOpen] = useState(false)
  const branches = getAllBranches()
  const dropdownRef = useRef<HTMLDivElement>(null)
  const { getCartItemsCount } = useMenuStore()
  const cartItemsCount = getCartItemsCount()
  const router = useRouter()
  const isMobile = useMobile()

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (!isMobile && dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isMobile])

  // Get the selected branch name
  const selectedBranchName = branches.find((branch) => branch.id === selectedBranch)?.name || "Select branch"

  // Handle branch selection
  const handleBranchSelect = (branch: Branch) => {
    onBranchChange(branch)
    setIsOpen(false)
  }

  return (
    <div className="bg-muted p-4 rounded-lg mb-6 relative">
      <div className="flex flex-row items-center justify-between">
        <div className="flex items-center gap-2">
          <MapPin className="h-5 w-5 text-primary" />
          <span className="font-medium">Select Local</span>
        </div>

        {/* Cart button - now redirects to cart page */}
        <Button variant="outline" size="sm" className="flex items-center gap-2" onClick={() => router.push("/cart")}>
          <ShoppingBag className="h-4 w-4" />
          <span className="hidden sm:inline">Cart</span>
          {cartItemsCount > 0 && (
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-black">
              {cartItemsCount}
            </span>
          )}
        </Button>
      </div>

      {/* Branch selector button - optimized for touch */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="mt-2 flex h-12 w-full items-center justify-between rounded-md border border-input bg-background px-4 py-3 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        aria-haspopup="dialog"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-primary" />
          <span className="block truncate font-medium">{selectedBranchName}</span>
        </div>
        <ChevronDown className="h-4 w-4 opacity-50" />
      </button>

      {/* Mobile bottom sheet */}
      {isMobile && (
        <BottomSheet isOpen={isOpen} onClose={() => setIsOpen(false)} title="Select Location">
          <div className="space-y-2">
            {branches.map((branch) => (
              <button
                key={branch.id}
                className={`flex w-full items-center justify-between rounded-lg p-4 text-left transition-colors ${branch.id === selectedBranch
                    ? "bg-primary/10 border border-primary"
                    : "hover:bg-muted border border-transparent"
                  }`}
                onClick={() => handleBranchSelect(branch.id as Branch)}
              >
                <div className="flex items-start gap-3">
                  <div className={`mt-0.5 ${branch.id === selectedBranch ? "text-primary" : "text-muted-foreground"}`}>
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-medium">{branch.name}</div>
                    <div className="text-xs text-muted-foreground mt-1">{branch.address}</div>
                  </div>
                </div>
                {branch.id === selectedBranch && <Check className="h-5 w-5 text-primary" />}
              </button>
            ))}
          </div>
        </BottomSheet>
      )}

      {/* Desktop dropdown */}
      {!isMobile && isOpen && (
        <div
          className="absolute mt-1 w-full z-[9999] rounded-md border border-border bg-background shadow-lg"
          ref={dropdownRef}
          style={{ position: "absolute", top: "100%", left: 0 }}
        >
          <ul className="max-h-60 overflow-auto py-1 text-base" role="listbox">
            {branches.map((branch) => (
              <li
                key={branch.id}
                className={`relative cursor-pointer select-none py-3 pl-10 pr-4 ${branch.id === selectedBranch ? "bg-muted" : "hover:bg-muted/50"
                  }`}
                role="option"
                aria-selected={branch.id === selectedBranch}
                onClick={() => handleBranchSelect(branch.id as Branch)}
              >
                <span className="block truncate font-medium">{branch.name}</span>
                <span className="block truncate text-xs text-muted-foreground">{branch.address}</span>
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
  )
}
