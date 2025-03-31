import BranchSection from "@/components/Branches/BranchSection";
import CTA from "@/components/CTA/CTA";
import FeaturedSection from "@/components/featured/featured-section";
import Hero from "@/components/Hero/Hero";
import MenuSection from "@/components/menu/Menu-Section";
import RestaurantBookingForm from "@/components/Reservation/restaurant-booking-form";
import OurStory from "@/components/Story/StorySection";
import TestimonialSection from "@/components/Testimonials/TestimonialSection";

export default function Home() {
  return (
    <main>
      <Hero />
      <FeaturedSection />
      <OurStory />
      <MenuSection />
      <RestaurantBookingForm />
      <BranchSection />
      <TestimonialSection />
      <CTA />
    </main>
  );
}
