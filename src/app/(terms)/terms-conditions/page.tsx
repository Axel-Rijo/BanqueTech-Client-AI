import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export default function TermsPage() {
  return (
    <main className="container max-w-4xl py-12 mx-auto px-4">
      <div className="container max-w-4xl py-12">
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center text-gray-500 hover:text-amber-500 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2 h-4 w-4"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
            Back to home
          </Link>
        </div>

        <div className="space-y-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Terms and Conditions
            </h1>
            <p className="mt-2 text-muted-foreground">
              Last updated: March 25, 2025
            </p>
          </div>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-amber-500">
              1. Introduction
            </h2>
            <p>
              Welcome to Savoria ("we," "our," or "us"). By accessing or using
              our website, mobile application, making a reservation, ordering
              food, or using any of our services, you agree to be bound by these
              Terms and Conditions. Please read these terms carefully before
              using our services.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-amber-500">
              2. Restaurant Services
            </h2>
            <p>
              We provide dining services, food preparation, delivery, and
              takeout options. All food items are prepared in accordance with
              applicable health and safety regulations. While we strive to
              accommodate dietary restrictions and allergies, we cannot
              guarantee that any item will be completely free of allergens.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-amber-500">
              3. Reservations
            </h2>
            <p>
              Reservations can be made through our website, by phone, or through
              third-party reservation services. We hold reservations for 15
              minutes past the reserved time, after which the reservation may be
              canceled. For parties of 6 or more, we may require a credit card
              to secure your reservation.
            </p>
            <p>
              For special events or during peak times, we may implement a
              cancellation fee for reservations canceled with less than 24
              hours' notice.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-amber-500">
              4. Online Ordering
            </h2>
            <p>
              When placing an order through our website or mobile application,
              you are responsible for providing accurate information. We reserve
              the right to refuse or cancel any order for any reason, including
              but not limited to product availability, errors in pricing or
              product information, or suspected fraudulent activity.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-amber-500">
              5. Payment Terms
            </h2>
            <p>
              We accept various payment methods as indicated on our website or
              at our restaurant. All prices are inclusive of applicable taxes
              unless otherwise stated. Gratuity is not included in the price and
              is at your discretion for dine-in services.
            </p>
            <p>
              For delivery orders, additional delivery fees may apply based on
              your location. These fees will be clearly displayed before you
              complete your order.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-amber-500">
              6. Cancellation Policy
            </h2>
            <p>
              For standard reservations, we appreciate at least 2 hours' notice
              for cancellations. For large parties (8 or more) or special
              events, cancellations must be made at least 24 hours in advance to
              avoid potential cancellation fees.
            </p>
            <p>
              For catering orders, cancellation policies will be specified in
              your catering agreement.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-amber-500">
              7. User Conduct
            </h2>
            <p>
              When visiting our restaurant or using our services, you agree to
              conduct yourself in a respectful manner. We reserve the right to
              refuse service to anyone for inappropriate behavior, including but
              not limited to: harassment of staff or other customers, excessive
              noise, or any behavior that disrupts other guests' dining
              experience.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-amber-500">
              8. Intellectual Property
            </h2>
            <p>
              All content on our website and mobile application, including but
              not limited to text, graphics, logos, images, and software, is the
              property of Savoria and is protected by copyright and trademark
              laws. You may not reproduce, distribute, or create derivative
              works from this content without our express written consent.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-amber-500">
              9. Limitation of Liability
            </h2>
            <p>
              To the maximum extent permitted by law, Savoria shall not be
              liable for any indirect, incidental, special, consequential, or
              punitive damages, or any loss of profits or revenues, whether
              incurred directly or indirectly, or any loss of data, use,
              goodwill, or other intangible losses resulting from your use of
              our services.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-amber-500">
              10. Privacy Policy
            </h2>
            <p>
              Your use of our services is also governed by our Privacy Policy,
              which can be found at [link to privacy policy]. By using our
              services, you consent to the practices described in the Privacy
              Policy.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-amber-500">
              11. Governing Law
            </h2>
            <p>
              These Terms and Conditions shall be governed by and construed in
              accordance with the laws of [Your State/Country], without regard
              to its conflict of law provisions. Any dispute arising from these
              terms will be resolved in the courts of [Your Jurisdiction].
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-amber-500">
              12. Changes to Terms
            </h2>
            <p>
              We reserve the right to modify these Terms and Conditions at any
              time. Changes will be effective immediately upon posting on our
              website. Your continued use of our services after any changes
              indicates your acceptance of the new terms.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-amber-500">
              13. Contact Information
            </h2>
            <p>
              If you have any questions about these Terms and Conditions, please
              contact us at:
            </p>
            <div className="pl-4">
              <p>Savoria</p>
              <p>[Address]</p>
              <p>[City, State, ZIP]</p>
              <p>Phone: [Phone Number]</p>
              <p>Email: [Email Address]</p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
