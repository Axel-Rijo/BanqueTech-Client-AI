"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { UtensilsCrossed, MapPin, Clock, Phone, ArrowLeft } from "lucide-react";
import Link from "next/link";

import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { MenuItem } from "./menu-item";
import { getBranchMenu } from "@/lib/dish-data";
import { getMenuCategories } from "@/lib/menu-data";
import { getAllBranches } from "@/lib/branch-data";
import { useMenuStore } from "@/lib/store";

export function MenuPage() {
  const { selectedBranch, hasBranchBeenSelected } = useMenuStore();
  const [activeCategory, setActiveCategory] = useState("");
  const [showBranchDetails, setShowBranchDetails] = useState(false);
  const router = useRouter();
  const menuCategories = getMenuCategories();
  const branches = getAllBranches();
  const branchMenu = getBranchMenu(selectedBranch);
  const tabsListRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const [searchTerm, setSearchTerm] = useState("");

  // Check if the branch is valid and redirect if needed
  useEffect(() => {
    // Check if the branch exists and has been explicitly selected
    const branchExists = branches.some(
      (branch) => branch.id === selectedBranch
    );
    if (!selectedBranch || !branchExists || !hasBranchBeenSelected) {
      // Redirect to branch selector
      router.push("/select-branch");
    }
  }, [selectedBranch, branches, router, hasBranchBeenSelected]);

  // Initialize with the first category
  useEffect(() => {
    if (menuCategories.length > 0 && !activeCategory) {
      setActiveCategory(menuCategories[0].id);
    }
  }, [menuCategories, activeCategory]);

  // Center the active tab when it changes
  useEffect(() => {
    if (
      activeCategory &&
      tabRefs.current[activeCategory] &&
      tabsListRef.current
    ) {
      const tabElement = tabRefs.current[activeCategory];
      const tabsList = tabsListRef.current;

      if (tabElement) {
        const tabRect = tabElement.getBoundingClientRect();
        const tabsListRect = tabsList.getBoundingClientRect();

        const scrollLeft =
          tabElement.offsetLeft - tabsListRect.width / 2 + tabRect.width / 2;

        tabsList.scrollTo({
          left: scrollLeft,
          behavior: "smooth",
        });
      }
    }
  }, [activeCategory]);

  const handleTabChange = (value: string) => {
    setActiveCategory(value);
  };

  // Get the branch details
  const currentBranch = branches.find((branch) => branch.id === selectedBranch);

  const toggleBranchDetails = () => {
    setShowBranchDetails(!showBranchDetails);
  };

  const filterMenuItems = (items) => {
    if (!searchTerm.trim()) return items;

    const lowerCaseSearch = searchTerm.toLowerCase().trim();

    return items.filter(
      (item) =>
        item.name.toLowerCase().includes(lowerCaseSearch) ||
        item.description.toLowerCase().includes(lowerCaseSearch) ||
        (item.dietary &&
          item.dietary.some((tag) =>
            tag.toLowerCase().includes(lowerCaseSearch)
          ))
    );
  };

  return (
    <main className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8 text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <UtensilsCrossed className="h-8 w-8 text-primary" />
          <h1 className="text-4xl font-bold tracking-tight">Savoria</h1>
        </div>
        <h2 className="text-2xl font-semibold mb-2">Our Menu</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Discover our delicious offerings crafted with the finest ingredients.
        </p>
      </div>

      {/* Branch Information Card */}
      <Card className="mb-8">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <MapPin className="h-5 w-5 text-primary" />
              <h3 className="font-bold text-lg">
                {currentBranch?.name || "Selected Branch"}
              </h3>
              <Button
                variant="ghost"
                size="sm"
                className="ml-2 text-xs"
                onClick={toggleBranchDetails}
              >
                {showBranchDetails ? "Hide Details" : "Show Details"}
              </Button>
            </div>
            <Button
              asChild
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
            >
              <Link href="/select-branch">
                <ArrowLeft className="h-4 w-4" />
                Change Branch
              </Link>
            </Button>
          </div>

          {showBranchDetails && currentBranch && (
            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">Address</p>
                  <p className="text-sm text-muted-foreground">
                    {currentBranch.address}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">Opening Hours</p>
                  <p className="text-sm text-muted-foreground">
                    Mon-Fri:{" "}
                    {currentBranch.hours?.weekdays || "11:00 AM - 10:00 PM"}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Sat-Sun:{" "}
                    {currentBranch.hours?.weekends || "10:00 AM - 11:00 PM"}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">Contact</p>
                  <p className="text-sm text-muted-foreground">
                    {currentBranch.phone || "(123) 456-7890"}
                  </p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="relative mb-6">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-500"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <input
          type="search"
          className="block w-full p-4 pl-10 text-sm border rounded-lg bg-background"
          placeholder="Search for dishes, ingredients, or dietary options..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {searchTerm && (
          <button
            type="button"
            className="absolute right-2.5 bottom-2.5 text-gray-400 hover:text-gray-600"
            onClick={() => setSearchTerm("")}
          >
            <svg
              className="w-4 h-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span className="sr-only">Clear search</span>
          </button>
        )}
      </div>

      <div className="mt-8">
        <Tabs
          defaultValue={menuCategories[0].id}
          onValueChange={handleTabChange}
        >
          <div className="sticky top-0 z-10 -mx-4 px-4 py-2 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
            <TabsList
              ref={tabsListRef}
              className="w-full flex justify-start overflow-x-auto pb-1 scrollbar-hide bg-secondary"
            >
              {menuCategories.map((category) => (
                <TabsTrigger
                  key={category.id}
                  value={category.id}
                  className="min-w-fit data-[state=active]:bg-primary data-[state=active]:text-black"
                  ref={(el) => {
                    tabRefs.current[category.id] = el;
                  }}
                >
                  {category.name}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {menuCategories.map((category) => {
            const categoryItems = filterMenuItems(
              branchMenu.filter((item) => item.category === category.id)
            );

            return (
              <TabsContent
                key={category.id}
                value={category.id}
                className="mt-4"
              >
                <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                  {categoryItems.length > 0 ? (
                    categoryItems.map((item) => (
                      <MenuItem key={item.id} item={item} />
                    ))
                  ) : (
                    <Card className="col-span-full">
                      <CardContent className="p-6 text-center">
                        {searchTerm ? (
                          <>
                            <div className="flex items-center justify-center mb-4">
                              <svg
                                className="h-8 w-8 text-muted-foreground"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                />
                              </svg>
                            </div>
                            <h3 className="text-xl font-medium mb-2">
                              No matching items found
                            </h3>
                            <p className="text-muted-foreground">
                              No items match your search "{searchTerm}" in this
                              category. Try a different search term or category.
                            </p>
                          </>
                        ) : (
                          <>
                            <div className="flex items-center justify-center mb-4">
                              <MapPin className="h-8 w-8 text-muted-foreground" />
                            </div>
                            <h3 className="text-xl font-medium mb-2">
                              Not available at this location
                            </h3>
                            <p className="text-muted-foreground">
                              This menu category is not available at the
                              selected branch. Please select another category.
                            </p>
                          </>
                        )}
                      </CardContent>
                    </Card>
                  )}
                </div>
              </TabsContent>
            );
          })}
        </Tabs>
      </div>
    </main>
  );
}
