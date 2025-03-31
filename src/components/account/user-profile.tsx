"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { toast } from "sonner"

const profileFormSchema = z.object({
    firstName: z.string().min(2, { message: "First name must be at least 2 characters." }),
    lastName: z.string().min(2, { message: "Last name must be at least 2 characters." }),
    email: z.string().email({ message: "Please enter a valid email address." }),
    phone: z.string().min(10, { message: "Please enter a valid phone number." }),
    address: z.string().optional(),
    dietaryPreferences: z.string().optional(),
})

type ProfileFormValues = z.infer<typeof profileFormSchema>

const defaultValues: Partial<ProfileFormValues> = {
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "555-123-4567",
    address: "123 Main St, Anytown, USA",
    dietaryPreferences: "No nuts, vegetarian options preferred",
}

export function UserProfile() {
    const [isEditing, setIsEditing] = useState(false)

    const form = useForm<ProfileFormValues>({
        resolver: zodResolver(profileFormSchema),
        defaultValues,
    })

    function onSubmit(data: ProfileFormValues) {
        toast({
            title: "Profile updated",
            description: "Your Savoria profile has been updated successfully.",
        })
        setIsEditing(false)
    }

    return (
        <Card className="p-0">
            <div className="bg-black text-white p-6 rounded-t-xl">
                <CardTitle className="text-2xl">Your Savoria Profile</CardTitle>
                <CardDescription className="text-gray-300 mt-1">
                    Manage your personal information and dining preferences
                </CardDescription>

                {!isEditing && (
                    <Button onClick={() => setIsEditing(true)} className="w-full mt-4 bg-[#ff9800] text-white hover:bg-[#f57c00]">
                        Edit Profile
                    </Button>
                )}
            </div>

            <CardContent className="pt-6">
                {isEditing ? (
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <div className="flex justify-center mb-6">
                                <Avatar className="h-24 w-24 bg-[#ff9800] text-white">
                                    <AvatarImage src="/placeholder.svg?height=96&width=96" alt="Profile picture" />
                                    <AvatarFallback>JD</AvatarFallback>
                                </Avatar>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <FormField
                                    control={form.control}
                                    name="firstName"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>First Name</FormLabel>
                                            <FormControl>
                                                <Input {...field} className="border-gray-300 focus-visible:ring-[#ff9800]" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="lastName"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Last Name</FormLabel>
                                            <FormControl>
                                                <Input {...field} className="border-gray-300 focus-visible:ring-[#ff9800]" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input type="email" {...field} className="border-gray-300 focus-visible:ring-[#ff9800]" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="phone"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Phone Number</FormLabel>
                                        <FormControl>
                                            <Input {...field} className="border-gray-300 focus-visible:ring-[#ff9800]" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="address"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Address</FormLabel>
                                        <FormControl>
                                            <Input {...field} className="border-gray-300 focus-visible:ring-[#ff9800]" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="dietaryPreferences"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Dietary Preferences</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                {...field}
                                                placeholder="Let us know about any allergies or dietary preferences"
                                                className="border-gray-300 focus-visible:ring-[#ff9800]"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className="flex gap-2 justify-end">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => setIsEditing(false)}
                                    className="border-[#ff9800] text-black hover:bg-[#fff8e1]"
                                >
                                    Cancel
                                </Button>
                                <Button type="submit" className="bg-[#ff9800] text-white hover:bg-[#f57c00]">
                                    Save Changes
                                </Button>
                            </div>
                        </form>
                    </Form>
                ) : (
                    <div className="space-y-6">
                        <div className="flex justify-center">
                            <Avatar className="h-24 w-24 bg-[#ff9800] text-white">
                                <AvatarImage src="/placeholder.svg?height=96&width=96" alt="Profile picture" />
                                <AvatarFallback>JD</AvatarFallback>
                            </Avatar>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="text-sm font-medium">First Name</label>
                                <Input value="John" readOnly className="border-gray-300 mt-1.5" />
                            </div>

                            <div>
                                <label className="text-sm font-medium">Last Name</label>
                                <Input value="Doe" readOnly className="border-gray-300 mt-1.5" />
                            </div>

                            <div>
                                <label className="text-sm font-medium">Email</label>
                                <Input value="john.doe@example.com" readOnly className="border-gray-300 mt-1.5" />
                            </div>

                            <div>
                                <label className="text-sm font-medium">Phone Number</label>
                                <Input value="555-123-4567" readOnly className="border-gray-300 mt-1.5" />
                            </div>

                            <div>
                                <label className="text-sm font-medium">Address</label>
                                <Input value="123 Main St, Anytown, USA" readOnly className="border-gray-300 mt-1.5" />
                            </div>

                            <div>
                                <label className="text-sm font-medium">Dietary Preferences</label>
                                <Textarea value="No nuts, vegetarian options preferred" readOnly className="border-gray-300 mt-1.5" />
                            </div>
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}

