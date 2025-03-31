"use server"

import { z } from "zod"

// Define validation schema
const contactFormSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email address"),
    phone: z.string().optional(),
    subject: z.string().min(3, "Subject must be at least 3 characters"),
    message: z.string().min(10, "Message must be at least 10 characters"),
    "inquiry-type": z.enum(["general", "catering", "feedback", "press"]),
    organization: z.string().optional(),
    deadline: z.string().optional(),
    newsletter: z.literal("on").optional(),
})

export async function submitContactForm(formData: FormData) {
    // Convert FormData to object
    const rawData: Record<string, any> = {}
    formData.forEach((value, key) => {
        rawData[key] = value
    })

    try {
        // Validate form data
        const validatedData = contactFormSchema.parse(rawData)

        // This is where you would process the form submission
        // For example, sending an email or saving to a database
        console.log("Form data:", validatedData)

        // Simulate a delay as if processing the submission
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // For demonstration purposes, just return a success message
        return {
            success: true,
            message: "Thank you for contacting Savoria. We'll get back to you soon!",
        }
    } catch (error) {
        console.error("Validation error:", error)
        return {
            success: false,
            message: "There was an error with your submission. Please check your information and try again.",
        }
    }
}
