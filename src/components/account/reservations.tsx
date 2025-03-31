"use client"

import { useState } from "react"
import { format } from "date-fns"
import { CalendarIcon, Clock, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { toast } from "sonner"

// Mock data for reservations
const upcomingReservations = [
    {
        id: "RES-1234",
        date: new Date(2023, 7, 25, 19, 30),
        guests: 4,
        specialRequests: "Window table if possible",
        status: "Confirmed",
    },
]

const pastReservations = [
    {
        id: "RES-1233",
        date: new Date(2023, 6, 15, 20, 0),
        guests: 2,
        specialRequests: "Anniversary celebration",
        status: "Completed",
    },
    {
        id: "RES-1232",
        date: new Date(2023, 5, 10, 18, 30),
        guests: 6,
        specialRequests: "Birthday celebration, need high chair for child",
        status: "Completed",
    },
]

export function Reservations() {
    const [cancelDialogOpen, setCancelDialogOpen] = useState(false)
    const [selectedReservation, setSelectedReservation] = useState<any>(null)

    const handleCancelReservation = () => {
        toast({
            title: "Reservation Cancelled",
            description: `Your Savoria reservation ${selectedReservation?.id} has been cancelled.`,
        })
        setCancelDialogOpen(false)
    }

    const openCancelDialog = (reservation: any) => {
        setSelectedReservation(reservation)
        setCancelDialogOpen(true)
    }

    return (
        <>
            <Card className="p-0">
                <div className="bg-black text-white p-6 rounded-t-xl">
                    <CardTitle className="text-2xl">Savoria Reservations</CardTitle>
                    <CardDescription className="text-gray-300 mt-1">
                        Manage your upcoming and past dining reservations at Savoria
                    </CardDescription>
                </div>

                <CardContent className="pt-6">
                    <Tabs defaultValue="upcoming" className="space-y-4">
                        <TabsList className="w-full bg-black text-white h-12 p-1 rounded-full">
                            <TabsTrigger
                                value="upcoming"
                                className="text-white h-10 rounded-full data-[state=active]:bg-[#ff9800] data-[state=active]:text-white data-[state=active]:shadow-none"
                            >
                                Upcoming
                            </TabsTrigger>
                            <TabsTrigger
                                value="past"
                                className="text-white h-10 rounded-full data-[state=active]:bg-[#ff9800] data-[state=active]:text-white data-[state=active]:shadow-none"
                            >
                                Past
                            </TabsTrigger>
                        </TabsList>

                        <TabsContent value="upcoming" className="space-y-4">
                            {upcomingReservations.length > 0 ? (
                                <>
                                    {upcomingReservations.map((reservation) => (
                                        <div key={reservation.id} className="border rounded-lg p-4 border-gray-300">
                                            <div className="flex flex-col md:flex-row justify-between gap-4">
                                                <div className="space-y-2">
                                                    <div className="flex items-center gap-2">
                                                        <Badge className="bg-[#ff9800] hover:bg-[#f57c00]">{reservation.status}</Badge>
                                                        <span className="font-medium">{reservation.id}</span>
                                                    </div>

                                                    <div className="flex items-center gap-2 text-muted-foreground">
                                                        <CalendarIcon className="h-4 w-4" />
                                                        <span>{format(reservation.date, "EEEE, MMMM d, yyyy")}</span>
                                                    </div>

                                                    <div className="flex items-center gap-2 text-muted-foreground">
                                                        <Clock className="h-4 w-4" />
                                                        <span>{format(reservation.date, "h:mm a")}</span>
                                                    </div>

                                                    <div className="flex items-center gap-2 text-muted-foreground">
                                                        <Users className="h-4 w-4" />
                                                        <span>
                                                            {reservation.guests} {reservation.guests === 1 ? "Guest" : "Guests"}
                                                        </span>
                                                    </div>

                                                    {reservation.specialRequests && (
                                                        <div className="mt-2">
                                                            <p className="text-sm font-medium">Special Requests:</p>
                                                            <p className="text-sm text-muted-foreground">{reservation.specialRequests}</p>
                                                        </div>
                                                    )}
                                                </div>

                                                <div className="flex flex-row md:flex-col gap-2 self-end md:self-center">
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        className="border-[#ff9800] text-black hover:bg-[#fff8e1]"
                                                    >
                                                        Modify
                                                    </Button>
                                                    <Button
                                                        variant="destructive"
                                                        size="sm"
                                                        onClick={() => openCancelDialog(reservation)}
                                                        className="bg-red-600 hover:bg-red-700"
                                                    >
                                                        Cancel
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}

                                    <div className="flex justify-center mt-6">
                                        <Button className="bg-[#ff9800] text-white hover:bg-[#f57c00]">Make a New Reservation</Button>
                                    </div>
                                </>
                            ) : (
                                <div className="text-center py-10">
                                    <p className="text-muted-foreground mb-4">You don't have any upcoming reservations at Savoria.</p>
                                    <Button className="bg-[#ff9800] text-white hover:bg-[#f57c00]">Make a Reservation</Button>
                                </div>
                            )}
                        </TabsContent>

                        <TabsContent value="past" className="space-y-4">
                            {pastReservations.length > 0 ? (
                                <>
                                    {pastReservations.map((reservation) => (
                                        <div key={reservation.id} className="border rounded-lg p-4 border-gray-300">
                                            <div className="flex flex-col md:flex-row justify-between gap-4">
                                                <div className="space-y-2">
                                                    <div className="flex items-center gap-2">
                                                        <Badge variant="outline" className="border-[#ff9800] text-black">
                                                            {reservation.status}
                                                        </Badge>
                                                        <span className="font-medium">{reservation.id}</span>
                                                    </div>

                                                    <div className="flex items-center gap-2 text-muted-foreground">
                                                        <CalendarIcon className="h-4 w-4" />
                                                        <span>{format(reservation.date, "EEEE, MMMM d, yyyy")}</span>
                                                    </div>

                                                    <div className="flex items-center gap-2 text-muted-foreground">
                                                        <Clock className="h-4 w-4" />
                                                        <span>{format(reservation.date, "h:mm a")}</span>
                                                    </div>

                                                    <div className="flex items-center gap-2 text-muted-foreground">
                                                        <Users className="h-4 w-4" />
                                                        <span>
                                                            {reservation.guests} {reservation.guests === 1 ? "Guest" : "Guests"}
                                                        </span>
                                                    </div>

                                                    {reservation.specialRequests && (
                                                        <div className="mt-2">
                                                            <p className="text-sm font-medium">Special Requests:</p>
                                                            <p className="text-sm text-muted-foreground">{reservation.specialRequests}</p>
                                                        </div>
                                                    )}
                                                </div>

                                                <div className="flex flex-row md:flex-col gap-2 self-end md:self-center">
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        className="border-[#ff9800] text-black hover:bg-[#fff8e1]"
                                                    >
                                                        Book Again
                                                    </Button>
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        className="border-[#ff9800] text-black hover:bg-[#fff8e1]"
                                                    >
                                                        Leave Review
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </>
                            ) : (
                                <div className="text-center py-10">
                                    <p className="text-muted-foreground">You don't have any past reservations at Savoria.</p>
                                </div>
                            )}
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>

            <Dialog open={cancelDialogOpen} onOpenChange={setCancelDialogOpen}>
                <DialogContent className="max-w-md">
                    <DialogHeader>
                        <DialogTitle>Cancel Savoria Reservation</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to cancel your reservation for{" "}
                            {selectedReservation && format(selectedReservation.date, "MMMM d, yyyy")} at{" "}
                            {selectedReservation && format(selectedReservation.date, "h:mm a")}?
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => setCancelDialogOpen(false)}
                            className="border-[#ff9800] text-black hover:bg-[#fff8e1]"
                        >
                            Keep Reservation
                        </Button>
                        <Button variant="destructive" onClick={handleCancelReservation} className="bg-red-600 hover:bg-red-700">
                            Cancel Reservation
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}

