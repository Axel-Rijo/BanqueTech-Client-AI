import { ContactPageClient } from "@/components/Contact/page-client";
import { RestaurantStructuredData } from "@/components/Contact/structured-data";

export default function NamePage() {
    return (
        <>
            <RestaurantStructuredData />
            <ContactPageClient />
        </>
    );
}