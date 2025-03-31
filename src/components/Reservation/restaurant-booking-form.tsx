"use client"

import { useState } from "react"
import { CalendarIcon, Clock, UtensilsCrossed } from "lucide-react"
import { format } from "date-fns"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, Controller } from "react-hook-form"
import * as z from "zod"
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input"
import "react-phone-number-input/style.css"
import "../Reservation/form-style.css"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Textarea } from "@/components/ui/textarea"
import RestaurantLogo from "../Reservation/restaurant-logo"
import { toast } from "sonner"

const formSchema = z.object({
    name: z.string().min(2, {
        message: "Name must be at least 2 characters.",
    }),
    email: z.string().email({
        message: "Please enter a valid email address.",
    }),
    phone: z.string().refine(
        (value) => {
            return value && isValidPhoneNumber(value)
        },
        {
            message: "Please enter a valid phone number",
        },
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
})

export default function RestaurantBookingForm() {
    const [isSubmitting, setIsSubmitting] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            specialRequests: "",
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsSubmitting(true)

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500))

        setIsSubmitting(false)

        toast({
            title: "Reservation Submitted",
            description: `Your reservation for ${values.guests} on ${format(values.date, "PPP")} at ${values.time} has been received.`,
        })

        form.reset()
    }

    // Generate time slots from 11:00 AM to 10:00 PM in 30-minute intervals
    const generateTimeSlots = () => {
        const slots = []
        for (let hour = 11; hour <= 22; hour++) {
            const hourFormatted = hour <= 12 ? hour : hour - 12
            const period = hour < 12 ? "AM" : "PM"

            slots.push(`${hourFormatted}:00 ${period}`)
            slots.push(`${hourFormatted}:30 ${period}`)
        }
        return slots
    }

    const timeSlots = generateTimeSlots()

    return (
        <div className="mx-auto w-full max-w-6xl px-4">
            <div className="flex flex-col lg:flex-row lg:min-h-[600px] shadow-lg rounded-lg overflow-hidden">
                {/* Left side - decorative for desktop and tablet */}
                <div className="hidden lg:flex lg:w-5/12 bg-black p-8 flex-col justify-center items-center">
                    <div className="text-center space-y-6">
                        <div className="mx-auto w-24 h-24 rounded-full bg-amber-500/20 flex items-center justify-center">
                            <UtensilsCrossed className="w-12 h-12 text-amber-500" />
                        </div>
                        <h2 className="text-3xl font-bold text-white">Savoria</h2>
                        <p className="text-gray-400 max-w-xs mx-auto">
                            Experience exquisite dining at our award-winning restaurant. Reserve your table now for an unforgettable
                            culinary journey.
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
                            <h1 className="text-3xl font-bold">Reserve Your Table</h1>
                            <p className="text-gray-500 mt-2">Fill out the form below to book your dining experience</p>
                        </div>

                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <FormField
                                        control={form.control}
                                        name="name"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Name</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="John Doe" {...field} className="h-11 md:h-12" />
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
                                                    <Input placeholder="john@example.com" type="email" {...field} className="h-11 md:h-12" />
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

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                                                                    {field.value ? format(field.value, "PPP") : "Pick a date"}
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
                                                                day_selected: "bg-amber-500 text-white hover:bg-amber-600",
                                                                day_today: "bg-gray-100 text-black",
                                                            }}
                                                        />
                                                    </PopoverContent>
                                                </Popover>
                                                <FormMessage className="text-red-500" />
                                            </FormItem>
                                        )}
                                    />

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
                                </div>

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
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormDescription className="text-gray-500">
                                                We'll do our best to accommodate your requests.
                                            </FormDescription>
                                            <FormMessage className="text-red-500" />
                                        </FormItem>
                                    )}
                                />

                                <Button
                                    type="submit"
                                    className="w-full h-11 md:h-12 mt-6 text-base bg-amber-500 hover:bg-amber-600 text-white"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? "Submitting..." : "Reserve Table"}
                                </Button>
                            </form>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    )
}
