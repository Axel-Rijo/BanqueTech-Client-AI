"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { MapPin, Navigation, Clock, Phone, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BranchMap } from "@/components/menu/branch/branch-map";
import { getAllBranches, type Branch } from "@/lib/branch-data";
import { useMenuStore } from "@/lib/store";

export default function SelectBranchPage() {
  const router = useRouter();
  const { setSelectedBranch, selectedBranch: currentSelectedBranch } =
    useMenuStore();
  const [selectedBranchId, setSelectedBranchId] = useState<Branch | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  const branches = getAllBranches();

  // Handle hydration issues and set initial selected branch
  useEffect(() => {
    setIsMounted(true);

    // Set the initial selected branch from the store if available
    if (currentSelectedBranch && !selectedBranchId) {
      setSelectedBranchId(currentSelectedBranch);
    }
  }, [currentSelectedBranch, selectedBranchId]);

  useEffect(() => {
    if (isMounted && currentSelectedBranch) {
      // Check if the current selected branch exists in our branches list
      const branchExists = branches.some(
        (branch) => branch.id === currentSelectedBranch
      );
      if (!branchExists) {
        // If the branch doesn't exist, reset the selected branch to null
        setSelectedBranchId(null);
      }
    }
  }, [isMounted, currentSelectedBranch, branches]);

  const selectedBranch = branches.find(
    (branch) => branch.id === selectedBranchId
  );

  const handleBranchSelect = (branchId: Branch) => {
    setSelectedBranchId(branchId);
  };

  const handleContinue = () => {
    if (selectedBranchId) {
      setSelectedBranch(selectedBranchId);
      router.push("/menu");
    }
  };

  if (!isMounted) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2">Savoria</h1>
        <p className="text-xl text-muted-foreground">
          Select a location to continue
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Our Locations</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="h-[500px] w-full relative">
                <BranchMap
                  branches={branches}
                  selectedBranchId={selectedBranchId}
                  onBranchSelect={handleBranchSelect}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Branch Details</CardTitle>
            </CardHeader>
            <CardContent>
              {selectedBranch ? (
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <h3 className="font-bold text-lg">
                        {selectedBranch.name}
                      </h3>
                      <p className="text-muted-foreground">
                        {selectedBranch.address}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Opening Hours</p>
                      <p className="text-sm text-muted-foreground">
                        Mon-Fri:{" "}
                        {selectedBranch.hours?.weekdays ||
                          "11:00 AM - 10:00 PM"}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Sat-Sun:{" "}
                        {selectedBranch.hours?.weekends ||
                          "10:00 AM - 11:00 PM"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Contact</p>
                      <p className="text-sm text-muted-foreground">
                        {selectedBranch.phone || "(123) 456-7890"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Navigation className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Distance</p>
                      <p className="text-sm text-muted-foreground">
                        Calculating...
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full py-8 text-center">
                  <MapPin className="h-12 w-12 text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">
                    Select a location on the map to see details
                  </p>
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button
                className="w-full bg-black hover:bg-black/80 text-white"
                disabled={!selectedBranchId}
                onClick={handleContinue}
              >
                Continue to Menu
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {branches.map((branch) => (
          <Card
            key={branch.id}
            className={`cursor-pointer transition-all ${
              selectedBranchId === branch.id
                ? "border-primary ring-1 ring-primary"
                : "hover:border-primary/50"
            }`}
            onClick={() => handleBranchSelect(branch.id)}
          >
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <MapPin
                  className={`h-5 w-5 mt-0.5 ${
                    selectedBranchId === branch.id
                      ? "text-primary"
                      : "text-muted-foreground"
                  }`}
                />
                <div>
                  <h3 className="font-bold">{branch.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {branch.address}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
