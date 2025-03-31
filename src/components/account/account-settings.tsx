"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { toast } from "sonner"
import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

const passwordFormSchema = z
    .object({
        currentPassword: z.string().min(8, {
            message: "Password must be at least 8 characters.",
        }),
        newPassword: z.string().min(8, {
            message: "Password must be at least 8 characters.",
        }),
        confirmPassword: z.string().min(8, {
            message: "Password must be at least 8 characters.",
        }),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    })

const notificationsFormSchema = z.object({
    marketingEmails: z.boolean().default(false),
    socialEmails: z.boolean().default(false),
    securityEmails: z.boolean().default(true),
    promotionalSMS: z.boolean().default(false),
    reservationReminders: z.boolean().default(true),
})

type PasswordFormValues = z.infer<typeof passwordFormSchema>
type NotificationsFormValues = z.infer<typeof notificationsFormSchema>

export function AccountSettings() {
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

    const passwordForm = useForm<PasswordFormValues>({
        resolver: zodResolver(passwordFormSchema),
        defaultValues: {
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
        },
    })

    const notificationsForm = useForm<NotificationsFormValues>({
        resolver: zodResolver(notificationsFormSchema),
        defaultValues: {
            marketingEmails: true,
            socialEmails: false,
            securityEmails: true,
            promotionalSMS: true,
            reservationReminders: true,
        },
    })

    function onPasswordSubmit(data: PasswordFormValues) {
        toast.success("Password updated successfully!")
        passwordForm.reset({
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
        })
    }

    function onNotificationsSubmit(data: NotificationsFormValues) {
        toast.success("Notification preferences updated successfully!")
    }

    function onDeleteAccount() {
        toast.success("Account deleted successfully!")
        setShowDeleteConfirm(false)
    }

    return (
        <div className="space-y-6">
            <Card className="p-0">
                <div className="bg-black text-white p-6 rounded-t-xl">
                    <CardTitle className="text-2xl">Change Password</CardTitle>
                    <CardDescription className="text-gray-300 mt-1">
                        Update your password to keep your Savoria account secure
                    </CardDescription>
                </div>

                <CardContent className="pt-6">
                    <Form {...passwordForm}>
                        <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)} className="space-y-4">
                            <FormField
                                control={passwordForm.control}
                                name="currentPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Current Password</FormLabel>
                                        <FormControl>
                                            <Input type="password" {...field} className="border-gray-300 focus-visible:ring-[#ff9800]" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={passwordForm.control}
                                name="newPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>New Password</FormLabel>
                                        <FormControl>
                                            <Input type="password" {...field} className="border-gray-300 focus-visible:ring-[#ff9800]" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={passwordForm.control}
                                name="confirmPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Confirm New Password</FormLabel>
                                        <FormControl>
                                            <Input type="password" {...field} className="border-gray-300 focus-visible:ring-[#ff9800]" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <Button type="submit" className="bg-[#ff9800] text-white hover:bg-[#f57c00]">
                                Update Password
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>

            <Card className="p-0">
                <div className="bg-black text-white p-6 rounded-t-xl">
                    <CardTitle className="text-2xl">Notification Preferences</CardTitle>
                    <CardDescription className="text-gray-300 mt-1">
                        Manage how you receive notifications and updates from Savoria
                    </CardDescription>
                </div>

                <CardContent className="pt-6">
                    <Form {...notificationsForm}>
                        <form onSubmit={notificationsForm.handleSubmit(onNotificationsSubmit)} className="space-y-4">
                            <div className="space-y-4">
                                <h3 className="text-lg font-medium">Email Notifications</h3>

                                <FormField
                                    control={notificationsForm.control}
                                    name="marketingEmails"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 border-gray-300">
                                            <div className="space-y-0.5">
                                                <FormLabel className="text-base">Marketing Emails</FormLabel>
                                                <FormDescription>
                                                    Receive emails about new menu items, special events, and promotions from Savoria
                                                </FormDescription>
                                            </div>
                                            <FormControl>
                                                <Switch
                                                    checked={field.value}
                                                    onCheckedChange={field.onChange}
                                                    className="data-[state=checked]:bg-[#ff9800]"
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={notificationsForm.control}
                                    name="socialEmails"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 border-gray-300">
                                            <div className="space-y-0.5">
                                                <FormLabel className="text-base">Social Updates</FormLabel>
                                                <FormDescription>
                                                    Receive emails about Savoria restaurant news and social events
                                                </FormDescription>
                                            </div>
                                            <FormControl>
                                                <Switch
                                                    checked={field.value}
                                                    onCheckedChange={field.onChange}
                                                    className="data-[state=checked]:bg-[#ff9800]"
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={notificationsForm.control}
                                    name="securityEmails"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 border-gray-300">
                                            <div className="space-y-0.5">
                                                <FormLabel className="text-base">Security Updates</FormLabel>
                                                <FormDescription>Receive emails about your account activity and security</FormDescription>
                                            </div>
                                            <FormControl>
                                                <Switch
                                                    checked={field.value}
                                                    onCheckedChange={field.onChange}
                                                    disabled
                                                    className="data-[state=checked]:bg-[#ff9800]"
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />

                                <Separator className="my-4" />

                                <h3 className="text-lg font-medium">SMS Notifications</h3>

                                <FormField
                                    control={notificationsForm.control}
                                    name="promotionalSMS"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 border-gray-300">
                                            <div className="space-y-0.5">
                                                <FormLabel className="text-base">Promotional Messages</FormLabel>
                                                <FormDescription>Receive SMS about special offers and promotions from Savoria</FormDescription>
                                            </div>
                                            <FormControl>
                                                <Switch
                                                    checked={field.value}
                                                    onCheckedChange={field.onChange}
                                                    className="data-[state=checked]:bg-[#ff9800]"
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={notificationsForm.control}
                                    name="reservationReminders"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 border-gray-300">
                                            <div className="space-y-0.5">
                                                <FormLabel className="text-base">Reservation Reminders</FormLabel>
                                                <FormDescription>
                                                    Receive SMS reminders about your upcoming Savoria reservations
                                                </FormDescription>
                                            </div>
                                            <FormControl>
                                                <Switch
                                                    checked={field.value}
                                                    onCheckedChange={field.onChange}
                                                    className="data-[state=checked]:bg-[#ff9800]"
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <Button type="submit" className="bg-[#ff9800] text-white hover:bg-[#f57c00]">
                                Save Preferences
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>

            <Card className="p-0">
                <div className="bg-black text-white p-6 rounded-t-xl">
                    <CardTitle className="text-2xl">Delete Account</CardTitle>
                    <CardDescription className="text-gray-300 mt-1">
                        Permanently delete your Savoria account and all associated data
                    </CardDescription>
                </div>

                <CardContent className="pt-6 space-y-4">
                    {showDeleteConfirm ? (
                        <>
                            <Alert variant="destructive" className="border-red-600 bg-red-50">
                                <AlertCircle className="h-4 w-4" />
                                <AlertTitle>Warning</AlertTitle>
                                <AlertDescription>
                                    This action cannot be undone. All your Savoria data, including profile information, order history,
                                    reservations, and loyalty points will be permanently deleted.
                                </AlertDescription>
                            </Alert>

                            <div className="flex gap-2">
                                <Button
                                    variant="outline"
                                    onClick={() => setShowDeleteConfirm(false)}
                                    className="border-[#ff9800] text-black hover:bg-[#fff8e1]"
                                >
                                    Cancel
                                </Button>
                                <Button variant="destructive" onClick={onDeleteAccount} className="bg-red-600 hover:bg-red-700">
                                    Yes, Delete My Account
                                </Button>
                            </div>
                        </>
                    ) : (
                        <Button
                            variant="destructive"
                            onClick={() => setShowDeleteConfirm(true)}
                            className="bg-red-600 hover:bg-red-700"
                        >
                            Delete Account
                        </Button>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}

