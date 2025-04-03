import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Utensils, CheckCircle } from "lucide-react";

export default function EmailVerifiedPage() {
  return (
    <main>
      <div className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-sm border">
          <div className="text-center">
            <div className="flex justify-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-amber-500">
                <Utensils className="h-6 w-6 text-white" />
              </div>
            </div>
            <h2 className="mt-4 text-3xl font-bold text-black">
              Email verified!
            </h2>
            <p className="mt-2 text-gray-600">
              Your email has been successfully verified
            </p>
          </div>

          <div className="mt-8 flex flex-col items-center">
            <div className="bg-green-100 rounded-full p-2 mb-4">
              <CheckCircle className="h-16 w-16 text-green-600" />
            </div>
            <p className="text-center text-gray-700 mb-6">
              Thank you for verifying your email address. Your account is now
              fully activated and you can access all features of Savoria.
            </p>

            <div className="w-full mt-4">
              <Link href="/account">
                <Button className="w-full bg-amber-500 hover:bg-amber-600 mb-4">
                  Go to my account
                </Button>
              </Link>

              <Link href="/" className="block text-center">
                <Button variant="outline" className="w-full">
                  <span className="mr-1">←</span> Back to home
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
