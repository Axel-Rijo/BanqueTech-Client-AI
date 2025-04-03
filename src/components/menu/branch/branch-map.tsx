"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import type { Branch, BranchInfo } from "@/lib/menu-data";

// Define branch coordinates (these would normally come from your database)
const branchCoordinates: Record<Branch, [number, number]> = {
  downtown: [40.7128, -74.006], // New York City
  uptown: [40.7831, -73.9712], // Upper Manhattan
  riverside: [40.6892, -74.0445], // Jersey City
  beachside: [40.5795, -73.874], // Rockaway Beach
};

interface BranchMapProps {
  branches: BranchInfo[];
  selectedBranchId: Branch | null;
  onBranchSelect: (branchId: Branch) => void;
}

// Create a client-side only component that will load Leaflet
const BranchMapClient = ({
  branches,
  selectedBranchId,
  onBranchSelect,
}: BranchMapProps) => {
  const mapRef = useRef<any>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const markersRef = useRef<Record<string, any>>({});
  const [L, setL] = useState<any>(null);
  const [mapInitialized, setMapInitialized] = useState(false);
  const [markersAdded, setMarkersAdded] = useState(false);

  // Load Leaflet library
  useEffect(() => {
    let isMounted = true;

    const loadLeaflet = async () => {
      try {
        // Add Leaflet CSS
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
        document.head.appendChild(link);

        // Import Leaflet
        const leaflet = await import("leaflet");
        if (isMounted) {
          setL(leaflet);
        }
      } catch (error) {
        console.error("Failed to load Leaflet:", error);
      }
    };

    if (!L) {
      loadLeaflet();
    }

    return () => {
      isMounted = false;
    };
  }, []); // Empty dependency array - only run once

  // Initialize map
  useEffect(() => {
    // Only run this effect if Leaflet is loaded and the map container exists
    if (
      !L ||
      !mapContainerRef.current ||
      mapInitialized ||
      !mapContainerRef.current.offsetWidth
    )
      return;

    try {
      // Initialize map
      mapRef.current = L.map(mapContainerRef.current).setView(
        [40.7128, -74.006],
        12
      );

      // Add tile layer (OpenStreetMap)
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
      }).addTo(mapRef.current);

      setMapInitialized(true);
    } catch (error) {
      console.error("Error initializing map:", error);
    }
  }, [L, mapInitialized]); // Only depend on L and mapInitialized

  // Add markers
  useEffect(() => {
    if (!L || !mapRef.current || !mapInitialized) return;

    try {
      // Clear existing markers
      Object.values(markersRef.current).forEach((marker) => {
        if (marker) marker.remove();
      });
      markersRef.current = {};

      // Create custom icon
      const customIcon = (isSelected: boolean) =>
        L.divIcon({
          html: `<div class="flex items-center justify-center w-8 h-8 bg-white rounded-full shadow-md border-2 ${
            isSelected ? "border-primary" : "border-gray-300"
          }">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="${
                    isSelected ? "currentColor" : "#71717a"
                  }" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                </div>`,
          className: "",
          iconSize: [32, 32],
          iconAnchor: [16, 32],
        });

      // Add markers for each branch
      branches.forEach((branch) => {
        const coordinates = branchCoordinates[branch.id];
        if (coordinates) {
          const marker = L.marker(coordinates, {
            icon: customIcon(branch.id === selectedBranchId),
            title: branch.name,
          }).addTo(mapRef.current!);

          // Add click event
          marker.on("click", () => {
            onBranchSelect(branch.id);
          });

          // Add popup
          marker.bindPopup(`
            <div class="p-2">
              <h3 class="font-bold">${branch.name}</h3>
              <p class="text-sm">${branch.address}</p>
            </div>
          `);

          // Store marker reference
          markersRef.current[branch.id] = marker;
        }
      });

      // Set markers as added
      setMarkersAdded(true);
    } catch (error) {
      console.error("Error adding markers:", error);
    }
  }, [L, branches, mapInitialized]); // Don't include selectedBranchId here

  // Update selected marker and center map
  useEffect(() => {
    if (!L || !mapRef.current || !mapInitialized || !markersAdded) return;

    try {
      branches.forEach((branch) => {
        const marker = markersRef.current[branch.id];
        if (marker) {
          const isSelected = branch.id === selectedBranchId;

          // Update icon
          marker.setIcon(
            L.divIcon({
              html: `<div class="flex items-center justify-center w-8 h-8 bg-white rounded-full shadow-md border-2 ${
                isSelected ? "border-primary" : "border-gray-300"
              }">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="${
                      isSelected ? "currentColor" : "#71717a"
                    }" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                  </div>`,
              className: "",
              iconSize: [32, 32],
              iconAnchor: [16, 32],
            })
          );

          // Open popup for selected branch
          if (isSelected) {
            marker.openPopup();

            // Center map on selected branch
            const coordinates = branchCoordinates[branch.id];
            if (coordinates) {
              mapRef.current.setView(coordinates, 13);
            }
          }
        }
      });
    } catch (error) {
      console.error("Error updating markers:", error);
    }
  }, [L, selectedBranchId, mapInitialized, markersAdded, branches]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (mapRef.current) {
        try {
          mapRef.current.remove();
          mapRef.current = null;
        } catch (error) {
          console.error("Error cleaning up map:", error);
        }
      }
    };
  }, []);

  return (
    <div id="branch-map" ref={mapContainerRef} className="h-full w-full z-0" />
  );
};

// Create a dynamic import of the client component with SSR disabled
const DynamicBranchMap = dynamic(() => Promise.resolve(BranchMapClient), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full flex items-center justify-center bg-gray-100">
      <div className="flex flex-col items-center">
        <div className="h-8 w-8 border-4 border-primary border-t-transparent rounded-full animate-spin mb-2"></div>
        <p className="text-muted-foreground">Loading map...</p>
      </div>
    </div>
  ),
});

// Export a wrapper component that renders the dynamic component
export function BranchMap(props: BranchMapProps) {
  return <DynamicBranchMap {...props} />;
}
