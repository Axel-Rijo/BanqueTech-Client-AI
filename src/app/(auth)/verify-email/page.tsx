import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Utensils, CheckCircle, RefreshCw } from "lucide-react";

export default function VerifyEmailPage() {
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
              Verify your email
            </h2>
            <p className="mt-2 text-gray-600">
              We've sent a verification link to your email address
            </p>
          </div>

          <div className="mt-8 flex flex-col items-center">
            <CheckCircle className="h-16 w-16 text-amber-500 mb-4" />
            <p className="text-center text-gray-700 mb-6">
              Please check your inbox and click on the verification link to
              complete your registration. If you don't see the email, check your
              spam folder.
            </p>

            <div className="w-full mt-4">
              <Button className="w-full bg-amber-500 hover:bg-amber-600 mb-4">
                <RefreshCw className="mr-2 h-4 w-4" />
                Resend verification email
              </Button>

              <Link href="/login" className="block text-center mb-4">
                <Button variant="outline" className="w-full">
                  Back to login
                </Button>
              </Link>

              <Link href="/" className="block text-center">
                <Button
                  variant="ghost"
                  className="w-full text-gray-600 hover:text-amber-500"
                >
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
