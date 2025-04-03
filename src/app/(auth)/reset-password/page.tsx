import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Utensils } from "lucide-react";

export default function ResetPasswordPage() {
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
              Reset password
            </h2>
            <p className="mt-2 text-gray-600">
              Create a new password for your account
            </p>
          </div>

          <form className="mt-8 space-y-6" action="#" method="POST">
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  New password
                </label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  className="mt-1"
                  placeholder="••••••••"
                />
                <p className="mt-1 text-xs text-gray-500">
                  Must be at least 8 characters with 1 uppercase, 1 number, and
                  1 special character
                </p>
              </div>

              <div>
                <label
                  htmlFor="confirm-password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Confirm new password
                </label>
                <Input
                  id="confirm-password"
                  name="confirm-password"
                  type="password"
                  autoComplete="new-password"
                  required
                  className="mt-1"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div>
              <Button
                type="submit"
                className="w-full bg-amber-500 hover:bg-amber-600"
              >
                Reset password
              </Button>
            </div>
          </form>

          <div className="text-center mt-4">
            <p className="text-sm text-gray-600 mb-4">
              Remember your password?{" "}
              <Link
                href="/login"
                className="font-medium text-amber-600 hover:text-amber-500"
              >
                Back to login
              </Link>
            </p>
            <Link
              href="/"
              className="inline-flex items-center text-sm text-gray-600 hover:text-amber-500"
            >
              <span className="mr-1">←</span> Back to home
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
