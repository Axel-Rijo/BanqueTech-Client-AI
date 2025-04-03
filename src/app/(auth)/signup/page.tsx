import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Utensils } from "lucide-react";

export default function SignupPage() {
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
              Create account
            </h2>
            <p className="mt-2 text-gray-600">
              Join Savoria for exclusive benefits
            </p>
          </div>

          <form className="mt-8 space-y-6" action="#" method="POST">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="first-name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    First name
                  </label>
                  <Input
                    id="first-name"
                    name="first-name"
                    type="text"
                    required
                    className="mt-1"
                  />
                </div>
                <div>
                  <label
                    htmlFor="last-name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Last name
                  </label>
                  <Input
                    id="last-name"
                    name="last-name"
                    type="text"
                    required
                    className="mt-1"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email address
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="mt-1"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
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
                  Confirm password
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

              <div className="flex items-center">
                <Checkbox id="terms" required />
                <label
                  htmlFor="terms"
                  className="ml-2 block text-sm text-gray-700"
                >
                  I agree to the{" "}
                  <Link
                    href="/terms-conditions"
                    className="text-amber-600 hover:text-amber-500"
                  >
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="/privacy-policy"
                    className="text-amber-600 hover:text-amber-500"
                  >
                    Privacy Policy
                  </Link>
                </label>
              </div>
            </div>

            <div>
              <Button
                type="submit"
                className="w-full bg-amber-500 hover:bg-amber-600"
              >
                Create account
              </Button>
            </div>
          </form>

          <div className="text-center mt-4">
            <p className="text-sm text-gray-600 mb-4">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-medium text-amber-600 hover:text-amber-500"
              >
                Sign in
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
