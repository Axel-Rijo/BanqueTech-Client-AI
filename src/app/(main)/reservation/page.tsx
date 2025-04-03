import ReservationFAQ from "@/components/Reservation/reservation-faq";
import RestaurantBookingForm from "@/components/Reservation/restaurant-booking-form";
import Image from "next/image";

export default function ReservationsPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[40vh] min-h-[300px] bg-black">
        <div className="absolute inset-0 z-0 opacity-60">
          <Image
            src="/images/reservation.jpg"
            alt="Restaurant interior"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-white text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Reservations</h1>
          <p className="text-lg max-w-2xl">
            Reserve your table or book a private event at Savoria for an
            unforgettable culinary experience
          </p>
        </div>
      </section>

      {/* Reservation Options */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Book Your Experience</h2>
            <p className="text-gray-600">
              Whether you're planning a romantic dinner, a family celebration,
              or a corporate event, we offer the perfect setting for any
              occasion. Make your reservation below.
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-8 justify-center items-center mb-12">
            <div className="bg-white p-6 rounded-lg shadow-md flex-1 max-w-xs text-center">
              <div className="w-16 h-16 bg-amber-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
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
                  className="text-amber-500"
                >
                  <path d="M17 11H7a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2Z"></path>
                  <path d="M11 7H7a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h4"></path>
                  <path d="M17 7h-4"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Table Reservation</h3>
              <p className="text-gray-600 mb-4">
                Reserve a table for your next meal with us. Perfect for couples,
                families, and small groups.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md flex-1 max-w-xs text-center">
              <div className="w-16 h-16 bg-amber-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
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
                  className="text-amber-500"
                >
                  <path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z"></path>
                  <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"></path>
                  <path d="M12 17.5v-11"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Private Events</h3>
              <p className="text-gray-600 mb-4">
                Host your special occasion with us. We offer customized menus
                and dedicated service for your event.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md flex-1 max-w-xs text-center">
              <div className="w-16 h-16 bg-amber-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
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
                  className="text-amber-500"
                >
                  <rect width="20" height="14" x="2" y="5" rx="2"></rect>
                  <line x1="2" x2="22" y1="10" y2="10"></line>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Gift Cards</h3>
              <p className="text-gray-600 mb-4">
                Give the gift of an exceptional dining experience. Our gift
                cards are perfect for any occasion.
              </p>
            </div>
          </div>

          {/* Booking Form */}
          <RestaurantBookingForm
            showReservationTypes="both"
            defaultReservationType="table"
            title="Make Your Reservation"
            description="Book a table or an event at Savoria"
          />
        </div>
      </section>

      {/* Policies & FAQ Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-center mb-8">
              Reservation Policies
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3">Arrival Time</h3>
                <p className="text-gray-600">
                  We hold reservations for 15 minutes past the reserved time. If
                  you're running late, please call us to hold your table. For
                  parties that arrive incomplete, we may seat you once the
                  majority of your party has arrived.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3">Large Parties</h3>
                <p className="text-gray-600">
                  For parties of 8 or more, we require a credit card to secure
                  your reservation. A cancellation fee may apply for no-shows or
                  cancellations within 24 hours of the reservation time.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3">
                  Special Occasions
                </h3>
                <p className="text-gray-600">
                  Celebrating something special? Let us know when you make your
                  reservation, and our team will help make your celebration
                  memorable with special touches.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3">Children</h3>
                <p className="text-gray-600">
                  Children are welcome at Savoria. We offer a special menu for
                  young diners under 12. High chairs and booster seats are
                  available upon request.
                </p>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <ReservationFAQ />
        </div>
      </section>
    </main>
  );
}
