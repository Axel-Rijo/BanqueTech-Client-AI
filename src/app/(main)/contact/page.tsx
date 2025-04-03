import { ContactPageClient } from "@/components/Contact/page-client";
import { RestaurantStructuredData } from "@/components/Contact/structured-data";

export const metadata = {
  title: "Contact Us | Savoria",
  description:
    "Contact Savoria restaurant for questions, feedback, or to inquire about our services. We're here to help you plan your perfect dining experience!",
  keywords:
    "Savoria restaurant, contact Savoria, restaurant inquiry, fine dining contact",
};

export default function ContactPage() {
  return (
    <>
      <RestaurantStructuredData />
      <ContactPageClient />
    </>
  );
}
