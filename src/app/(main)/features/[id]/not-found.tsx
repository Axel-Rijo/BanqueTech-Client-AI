import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function FeatureNotFound() {
  return (
    <div className="min-h-screen bg-white text-gray-800 flex flex-col items-center justify-center px-4">
      <div className="text-center max-w-md">
        <h1 className="text-4xl font-bold mb-4 text-gray-900">
          Feature Not Found
        </h1>
        <div className="w-16 h-1 bg-amber-500 mx-auto mb-6"></div>
        <p className="text-gray-600 mb-8">
          The feature you're looking for doesn't exist or may have been removed.
        </p>
        <Link href="/features">
          <Button className="bg-amber-500 hover:bg-amber-600 text-white">
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back to All Features
          </Button>
        </Link>
      </div>
    </div>
  );
}
