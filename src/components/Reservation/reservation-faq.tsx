import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function ReservationFAQ() {
  return (
    <div className="w-full max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Frequently Asked Questions
      </h2>

      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>What is your cancellation policy?</AccordionTrigger>
          <AccordionContent>
            We understand plans change. You can cancel your reservation up to 24
            hours in advance without any charge. For cancellations within 24
            hours of your reservation time, a $25 per person fee may apply.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2">
          <AccordionTrigger>
            How far in advance can I make a reservation?
          </AccordionTrigger>
          <AccordionContent>
            We accept reservations up to 60 days in advance for regular dining
            and up to 90 days for special events. For large parties or special
            occasions, we recommend booking as early as possible.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-3">
          <AccordionTrigger>Is there a dress code?</AccordionTrigger>
          <AccordionContent>
            We maintain a smart casual dress code. While we don't require formal
            attire, we do ask that guests refrain from wearing athletic wear,
            beachwear, or overly casual clothing. Gentlemen are encouraged to
            wear collared shirts or nice sweaters with dress pants or smart
            jeans.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-4">
          <AccordionTrigger>
            Do you accommodate dietary restrictions?
          </AccordionTrigger>
          <AccordionContent>
            Our chefs are happy to accommodate most dietary restrictions and
            allergies. Please note any special dietary needs in the "Special
            Requests" section when making your reservation, and our team will
            ensure your needs are met.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-5">
          <AccordionTrigger>Is there a time limit for dining?</AccordionTrigger>
          <AccordionContent>
            For standard reservations, we typically allocate 2 hours for parties
            of 2-4 and 2.5 hours for larger parties. If you anticipate needing
            more time, please let us know when making your reservation, and
            we'll do our best to accommodate you.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
