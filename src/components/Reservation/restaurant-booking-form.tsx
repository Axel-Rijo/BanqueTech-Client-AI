"use client";

import { useState, useEffect } from "react";
import {
  CalendarIcon,
  Clock,
  UtensilsCrossed,
  Users,
  PartyPopper,
} from "lucide-react";
import { format } from "date-fns";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import * as z from "zod";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import "./form-styles.css";
import { toast, Toaster } from "sonner";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import RestaurantLogo from "./restaurant-logo";

// Schema for table reservations
const tableFormSchema = z.object({
  reservationType: z.literal("table"),
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phone: z.string().refine(
    (value) => {
      return value && isValidPhoneNumber(value);
    },
    {
      message: "Please enter a valid phone number",
    }
  ),
  date: z.date({
    required_error: "Please select a date.",
  }),
  time: z.string({
    required_error: "Please select a time.",
  }),
  guests: z.string({
    required_error: "Please select number of guests.",
  }),
  specialRequests: z.string().optional(),
});

// Schema for event reservations
const eventFormSchema = z.object({
  reservationType: z.literal("event"),
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phone: z.string().refine(
    (value) => {
      return value && isValidPhoneNumber(value);
    },
    {
      message: "Please enter a valid phone number",
    }
  ),
  date: z.date({
    required_error: "Please select a date.",
  }),
  startTime: z.string({
    required_error: "Please select a start time.",
  }),
  duration: z.string({
    required_error: "Please select event duration.",
  }),
  eventType: z.string({
    required_error: "Please select event type.",
  }),
  attendees: z.string({
    required_error: "Please enter number of attendees.",
  }),
  cateringOption: z.string({
    required_error: "Please select a catering option.",
  }),
  eventDetails: z.string().optional(),
});

// Combined schema using discriminated union
const formSchema = z.discriminatedUnion("reservationType", [
  tableFormSchema,
  eventFormSchema,
]);

type FormValues = z.infer<typeof formSchema>;

// Define the available reservation types
export type ReservationType = "table" | "event";

// Props for the RestaurantBookingForm component
interface RestaurantBookingFormProps {
  // Which reservation types to show: "table", "event", or "both"
  showReservationTypes?: "table" | "event" | "both";
  // Default selected reservation type (only used when showReservationTypes is "both")
  defaultReservationType?: ReservationType;
  // Optional title override
  title?: string;
  // Optional description override
  description?: string;
}

export default function RestaurantBookingForm({
  showReservationTypes = "both",
  defaultReservationType = "table",
  title = "Make a Reservation",
  description = "Book a table or an event at Savoria",
}: RestaurantBookingFormProps) {
  // Determine the initial reservation type based on props
  const initialReservationType: ReservationType =
    showReservationTypes === "both"
      ? defaultReservationType
      : (showReservationTypes as ReservationType);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [reservationType, setReservationType] = useState<ReservationType>(
    initialReservationType
  );

  // Initialize form with complete default values for all fields
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      reservationType: initialReservationType,
      name: "",
      email: "",
      phone: "",
      // Table reservation fields
      time: "",
      guests: "",
      specialRequests: "",
      // Event booking fields
      startTime: "",
      duration: "",
      eventType: "",
      attendees: "",
      cateringOption: "",
      eventDetails: "",
      // Date needs special handling
      date: undefined,
    },
  });

  // Update form when reservation type changes
  useEffect(() => {
    // Reset the form with the correct reservation type when it changes externally
    form.setValue("reservationType", reservationType);
  }, [reservationType, form]);

  // Handle tab change
  const handleTabChange = (value: string) => {
    if (value === "table" || value === "event") {
      setReservationType(value as ReservationType);

      // Preserve common fields and reset type-specific fields
      const commonFields = {
        name: form.getValues("name"),
        email: form.getValues("email"),
        phone: form.getValues("phone"),
        date: form.getValues("date"),
      };

      if (value === "table") {
        form.reset({
          ...commonFields,
          reservationType: "table",
          time: "",
          guests: "",
          specialRequests: "",
        });
      } else {
        form.reset({
          ...commonFields,
          reservationType: "event",
          startTime: "",
          duration: "",
          eventType: "",
          attendees: "",
          cateringOption: "",
          eventDetails: "",
        });
      }
    }
  };

  async function onSubmit(values: FormValues) {
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);

    if (values.reservationType === "table") {
      toast.success("Table Reservation Submitted", {
        description: `Your reservation for ${values.guests} on ${format(
          values.date,
          "PPP"
        )} at ${values.time} has been received.`,
      });
    } else {
      toast.success("Event Reservation Submitted", {
        description: `Your ${values.eventType} event for ${
          values.attendees
        } attendees on ${format(values.date, "PPP")} has been received.`,
      });
    }

    // Reset the form but keep the reservation type
    if (values.reservationType === "table") {
      form.reset({
        reservationType: "table",
        name: "",
        email: "",
        phone: "",
        time: "",
        guests: "",
        specialRequests: "",
      });
    } else {
      form.reset({
        reservationType: "event",
        name: "",
        email: "",
        phone: "",
        startTime: "",
        duration: "",
        eventType: "",
        attendees: "",
        cateringOption: "",
        eventDetails: "",
      });
    }
  }

  // Generate time slots from 11:00 AM to 10:00 PM in 30-minute intervals
  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 11; hour <= 22; hour++) {
      const hourFormatted = hour <= 12 ? hour : hour - 12;
      const period = hour < 12 ? "AM" : "PM";

      slots.push(`${hourFormatted}:00 ${period}`);
      slots.push(`${hourFormatted}:30 ${period}`);
    }
    return slots;
  };

  const timeSlots = generateTimeSlots();

  // Event duration options
  const durationOptions = [
    "2 hours",
    "3 hours",
    "4 hours",
    "5 hours",
    "6+ hours (Full day)",
  ];

  // Event types
  const eventTypes = [
    "Birthday Party",
    "Anniversary Celebration",
    "Corporate Event",
    "Wedding Reception",
    "Graduation Party",
    "Private Dinner",
    "Other",
  ];

  // Catering options
  const cateringOptions = [
    "Standard Menu",
    "Premium Menu",
    "Custom Menu",
    "Buffet Style",
    "Cocktail & Appetizers",
    "Not Sure (Discuss options)",
  ];

  // Determine if we should show tabs or just a single form
  const showTabs = showReservationTypes === "both";

  // Helper function to render the form content
  const renderFormContent = () => (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {/* Common fields for both reservation types */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="John Doe"
                    {...field}
                    className="h-11 md:h-12"
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="john@example.com"
                    type="email"
                    {...field}
                    className="h-11 md:h-12"
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone</FormLabel>
              <FormControl>
                <div className="rounded-md border border-input bg-background h-11 md:h-12 transition-colors focus-within:border-amber-500 focus-within:ring-2 focus-within:ring-amber-500/20 focus-within:ring-offset-2">
                  <Controller
                    name="phone"
                    control={form.control}
                    render={({ field }) => (
                      <PhoneInput
                        international
                        defaultCountry="US"
                        placeholder="Enter phone number"
                        value={field.value}
                        onChange={field.onChange}
                      />
                    )}
                  />
                </div>
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className="h-11 md:h-12 w-full px-4 flex justify-between items-center border-input hover:bg-gray-50 hover:text-black focus:ring-amber-500 focus:ring-offset-2"
                    >
                      <span className="text-left">
                        {field.value
                          ? format(field.value, "PPP")
                          : "Pick a date"}
                      </span>
                      <CalendarIcon className="h-4 w-4 opacity-50 flex-shrink-0" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) => date < new Date()}
                    initialFocus
                    className="md:p-2"
                    classNames={{
                      day_selected:
                        "bg-amber-500 text-white hover:bg-amber-600",
                      day_today: "bg-gray-100 text-black",
                    }}
                  />
                </PopoverContent>
              </Popover>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />

        {/* Table reservation specific fields */}
        {(reservationType === "table" || showTabs) && (
          <div
            className={showTabs ? "hidden data-[state=active]:block" : ""}
            data-state={reservationType === "table" ? "active" : "inactive"}
          >
            <input
              type="hidden"
              {...form.register("reservationType")}
              value="table"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="time"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Time</FormLabel>
                    <FormControl>
                      <div className="relative h-11 md:h-12 rounded-md border border-input bg-background flex items-center focus-within:border-amber-500 focus-within:ring-2 focus-within:ring-amber-500/20 focus-within:ring-offset-2">
                        <select
                          className="h-full w-full bg-transparent px-4 focus:outline-none rounded-md"
                          value={field.value}
                          onChange={(e) => field.onChange(e.target.value)}
                        >
                          <option value="" disabled>
                            Select a time
                          </option>
                          {timeSlots.map((time) => (
                            <option key={time} value={time}>
                              {time}
                            </option>
                          ))}
                        </select>
                        <div className="pointer-events-none absolute right-4">
                          <Clock className="h-4 w-4 opacity-50" />
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="guests"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Number of Guests</FormLabel>
                    <FormControl>
                      <div className="relative h-11 md:h-12 rounded-md border border-input bg-background flex items-center focus-within:border-amber-500 focus-within:ring-2 focus-within:ring-amber-500/20 focus-within:ring-offset-2">
                        <select
                          className="h-full w-full bg-transparent px-4 focus:outline-none rounded-md"
                          value={field.value}
                          onChange={(e) => field.onChange(e.target.value)}
                        >
                          <option value="" disabled>
                            Select number of guests
                          </option>
                          {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                            <option key={num} value={num.toString()}>
                              {num} {num === 1 ? "Guest" : "Guests"}
                            </option>
                          ))}
                          <option value="9+">9+ Guests (Large Party)</option>
                        </select>
                        <div className="pointer-events-none absolute right-4">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-chevron-down opacity-50"
                          >
                            <polyline points="6 9 12 15 18 9"></polyline>
                          </svg>
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="specialRequests"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Special Requests</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Allergies, dietary restrictions, special occasions, etc."
                      className="resize-none min-h-[100px] md:min-h-[120px] focus-visible:ring-amber-500 focus-visible:ring-offset-2"
                      value={field.value || ""}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      name={field.name}
                      ref={field.ref}
                    />
                  </FormControl>
                  <FormDescription className="text-gray-500">
                    We'll do our best to accommodate your requests.
                  </FormDescription>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
          </div>
        )}

        {/* Event booking specific fields */}
        {(reservationType === "event" || showTabs) && (
          <div
            className={showTabs ? "hidden data-[state=active]:block" : ""}
            data-state={reservationType === "event" ? "active" : "inactive"}
          >
            <input
              type="hidden"
              {...form.register("reservationType")}
              value="event"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="startTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Start Time</FormLabel>
                    <FormControl>
                      <div className="relative h-11 md:h-12 rounded-md border border-input bg-background flex items-center focus-within:border-amber-500 focus-within:ring-2 focus-within:ring-amber-500/20 focus-within:ring-offset-2">
                        <select
                          className="h-full w-full bg-transparent px-4 focus:outline-none rounded-md"
                          value={field.value}
                          onChange={(e) => field.onChange(e.target.value)}
                        >
                          <option value="" disabled>
                            Select start time
                          </option>
                          {timeSlots.map((time) => (
                            <option key={time} value={time}>
                              {time}
                            </option>
                          ))}
                        </select>
                        <div className="pointer-events-none absolute right-4">
                          <Clock className="h-4 w-4 opacity-50" />
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="duration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Duration</FormLabel>
                    <FormControl>
                      <div className="relative h-11 md:h-12 rounded-md border border-input bg-background flex items-center focus-within:border-amber-500 focus-within:ring-2 focus-within:ring-amber-500/20 focus-within:ring-offset-2">
                        <select
                          className="h-full w-full bg-transparent px-4 focus:outline-none rounded-md"
                          value={field.value}
                          onChange={(e) => field.onChange(e.target.value)}
                        >
                          <option value="" disabled>
                            Select duration
                          </option>
                          {durationOptions.map((duration) => (
                            <option key={duration} value={duration}>
                              {duration}
                            </option>
                          ))}
                        </select>
                        <div className="pointer-events-none absolute right-4">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-clock opacity-50"
                          >
                            <circle cx="12" cy="12" r="10"></circle>
                            <polyline points="12 6 12 12 16 14"></polyline>
                          </svg>
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="eventType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Event Type</FormLabel>
                  <FormControl>
                    <div className="relative h-11 md:h-12 rounded-md border border-input bg-background flex items-center focus-within:border-amber-500 focus-within:ring-2 focus-within:ring-amber-500/20 focus-within:ring-offset-2">
                      <select
                        className="h-full w-full bg-transparent px-4 focus:outline-none rounded-md"
                        value={field.value}
                        onChange={(e) => field.onChange(e.target.value)}
                      >
                        <option value="" disabled>
                          Select event type
                        </option>
                        {eventTypes.map((type) => (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute right-4">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="lucide lucide-chevron-down opacity-50"
                        >
                          <polyline points="6 9 12 15 18 9"></polyline>
                        </svg>
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="attendees"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Number of Attendees</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min="10"
                      placeholder="Enter number of attendees"
                      className="h-11 md:h-12"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className="text-gray-500">
                    Minimum 10 attendees for events
                  </FormDescription>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="cateringOption"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Catering Options</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      value={field.value}
                      className="grid grid-cols-1 md:grid-cols-2 gap-2"
                    >
                      {cateringOptions.map((option) => (
                        <FormItem
                          key={option}
                          className="flex items-center space-x-3 space-y-0"
                        >
                          <FormControl>
                            <RadioGroupItem value={option} />
                          </FormControl>
                          <FormLabel className="font-normal cursor-pointer">
                            {option}
                          </FormLabel>
                        </FormItem>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="eventDetails"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Event Details</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Please provide any additional details about your event, including special arrangements, themes, or requirements."
                      className="resize-none min-h-[100px] md:min-h-[120px] focus-visible:ring-amber-500 focus-visible:ring-offset-2"
                      value={field.value || ""}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      name={field.name}
                      ref={field.ref}
                    />
                  </FormControl>
                  <FormDescription className="text-gray-500">
                    Help us make your event special by providing as much detail
                    as possible.
                  </FormDescription>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
          </div>
        )}

        <Button
          type="submit"
          className="w-full h-11 md:h-12 mt-6 text-base bg-amber-500 hover:bg-amber-600 text-white"
          disabled={isSubmitting}
        >
          {isSubmitting
            ? "Submitting..."
            : reservationType === "table"
            ? "Reserve Table"
            : "Book Event"}
        </Button>
      </form>
    </Form>
  );

  // Update the page title and description based on the reservation type
  const getPageTitle = () => {
    if (showReservationTypes === "table") {
      return title || "Reserve a Table";
    } else if (showReservationTypes === "event") {
      return title || "Book an Event";
    }
    return title;
  };

  const getPageDescription = () => {
    if (showReservationTypes === "table") {
      return description || "Book a table at Savoria";
    } else if (showReservationTypes === "event") {
      return description || "Book an event at Savoria";
    }
    return description;
  };

  return (
    <>
      <div className="mx-auto w-full max-w-6xl">
        <div className="flex flex-col lg:flex-row lg:min-h-[600px] shadow-lg rounded-lg overflow-hidden">
          {/* Left side - decorative for desktop and tablet */}
          <div className="hidden lg:flex lg:w-5/12 bg-black p-8 flex-col justify-center items-center">
            <div className="text-center space-y-6">
              <div className="mx-auto w-24 h-24 rounded-full bg-amber-500/20 flex items-center justify-center">
                <UtensilsCrossed className="w-12 h-12 text-amber-500" />
              </div>
              <h2 className="text-3xl font-bold text-white">Savoria</h2>
              <p className="text-gray-400 max-w-xs mx-auto">
                Experience exquisite dining at our award-winning restaurant.
                {showReservationTypes === "both" &&
                  " Reserve your table or book an event for an unforgettable culinary journey."}
                {showReservationTypes === "table" &&
                  " Reserve your table for an unforgettable culinary journey."}
                {showReservationTypes === "event" &&
                  " Book an event for an unforgettable culinary experience."}
              </p>
              <div className="pt-6">
                <div className="border-t border-amber-500/20 pt-6 flex justify-center space-x-4">
                  <div className="text-center">
                    <div className="font-bold text-xl text-white">Mon-Thu</div>
                    <div className="text-sm text-gray-400">11AM - 10PM</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-xl text-white">Fri-Sun</div>
                    <div className="text-sm text-gray-400">11AM - 12AM</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right side - form */}
          <div className="bg-white p-6 md:p-8 lg:p-10 w-full lg:w-7/12">
            <div className="space-y-6">
              {/* Mobile logo - only visible on mobile */}
              <div className="flex justify-center lg:hidden">
                <RestaurantLogo />
              </div>

              <div className="text-center lg:text-left">
                <h1 className="text-3xl font-bold">{getPageTitle()}</h1>
                <p className="text-gray-500 mt-2">{getPageDescription()}</p>
              </div>

              {showTabs ? (
                <Tabs
                  defaultValue={defaultReservationType}
                  onValueChange={handleTabChange}
                  className="w-full"
                >
                  <TabsList className="grid w-full grid-cols-2 mb-6">
                    <TabsTrigger
                      value="table"
                      className="flex items-center gap-2"
                    >
                      <Users className="h-4 w-4" />
                      <span>Table Reservation</span>
                    </TabsTrigger>
                    <TabsTrigger
                      value="event"
                      className="flex items-center gap-2"
                    >
                      <PartyPopper className="h-4 w-4" />
                      <span>Event Booking</span>
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="table" className="mt-0 space-y-4">
                    {renderFormContent()}
                  </TabsContent>

                  <TabsContent value="event" className="mt-0 space-y-4">
                    {renderFormContent()}
                  </TabsContent>
                </Tabs>
              ) : (
                renderFormContent()
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Add the Toaster component */}
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#FFFFFF",
            border: "1px solid #E2E8F0",
            color: "#000000",
          },
          className: "toast-container",
        }}
      />
    </>
  );
}
