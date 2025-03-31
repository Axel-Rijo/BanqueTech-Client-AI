"use client"

import { useState } from "react"
import { format } from "date-fns"
import { CalendarIcon, ChevronDownIcon, SearchIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"

// Mock data for order history
const orders = [
    {
        id: "ORD-1234",
        date: new Date(2023, 6, 15),
        total: 42.5,
        status: "Delivered",
        items: [
            { name: "Margherita Pizza", quantity: 1, price: 14.99 },
            { name: "Garlic Bread", quantity: 1, price: 5.99 },
            { name: "Tiramisu", quantity: 1, price: 7.99 },
            { name: "Sparkling Water", quantity: 2, price: 6.98 },
        ],
    },
    {
        id: "ORD-1235",
        date: new Date(2023, 6, 10),
        total: 35.97,
        status: "Delivered",
        items: [
            { name: "Pasta Carbonara", quantity: 1, price: 16.99 },
            { name: "Caesar Salad", quantity: 1, price: 8.99 },
            { name: "Cheesecake", quantity: 1, price: 9.99 },
        ],
    },
    {
        id: "ORD-1236",
        date: new Date(2023, 5, 28),
        total: 52.45,
        status: "Delivered",
        items: [
            { name: "Seafood Risotto", quantity: 1, price: 22.99 },
            { name: "Bruschetta", quantity: 1, price: 7.99 },
            { name: "Chocolate Mousse", quantity: 1, price: 8.99 },
            { name: "Red Wine (Glass)", quantity: 1, price: 12.48 },
        ],
    },
]

export function OrderHistory() {
    const [searchTerm, setSearchTerm] = useState("")
    const [expandedOrder, setExpandedOrder] = useState<string | null>(null)
    const [date, setDate] = useState<Date | undefined>(undefined)
    const [status, setStatus] = useState<string>("all")

    const toggleOrderDetails = (orderId: string) => {
        if (expandedOrder === orderId) {
            setExpandedOrder(null)
        } else {
            setExpandedOrder(orderId)
        }
    }

    // Filter orders based on search, date, and status
    const filteredOrders = orders.filter((order) => {
        const matchesSearch =
            order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.items.some((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()))

        const matchesDate = !date || format(order.date, "yyyy-MM-dd") === format(date, "yyyy-MM-dd")

        const matchesStatus = status === "all" || order.status.toLowerCase() === status.toLowerCase()

        return matchesSearch && matchesDate && matchesStatus
    })

    return (
        <Card className="p-0">
            <div className="bg-black text-white p-6 rounded-t-xl">
                <CardTitle className="text-2xl">Savoria Order History</CardTitle>
                <CardDescription className="text-gray-300 mt-1">View and track your past orders from Savoria</CardDescription>
            </div>

            <CardContent className="pt-6 px-3 sm:px-6">
                <div className="flex flex-col gap-4 mb-6">
                    <div className="relative w-full">
                        <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search orders..."
                            className="pl-8 border-gray-300 focus-visible:ring-[#ff9800]"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    className="justify-start text-left font-normal w-full sm:w-[200px] border-gray-300 hover:bg-[#fff8e1]"
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {date ? format(date, "MMM d, yyyy") : "Filter by date"}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                                <Calendar
                                    mode="single"
                                    selected={date}
                                    onSelect={setDate}
                                    initialFocus
                                    className="[&_.selected]:bg-[#ff9800]"
                                />
                            </PopoverContent>
                        </Popover>

                        <Select value={status} onValueChange={setStatus}>
                            <SelectTrigger className="w-full sm:w-[200px] border-gray-300">
                                <SelectValue placeholder="Filter by status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Statuses</SelectItem>
                                <SelectItem value="delivered">Delivered</SelectItem>
                                <SelectItem value="processing">Processing</SelectItem>
                                <SelectItem value="cancelled">Cancelled</SelectItem>
                            </SelectContent>
                        </Select>

                        {(date || status !== "all" || searchTerm) && (
                            <Button
                                variant="ghost"
                                onClick={() => {
                                    setDate(undefined)
                                    setStatus("all")
                                    setSearchTerm("")
                                }}
                                className="hover:bg-[#fff8e1] hover:text-[#ff9800] w-full sm:w-auto"
                            >
                                Clear Filters
                            </Button>
                        )}
                    </div>
                </div>

                {filteredOrders.length > 0 ? (
                    <div className="space-y-4">
                        {filteredOrders.map((order) => (
                            <div key={order.id} className="border rounded-lg overflow-hidden border-gray-300">
                                <div
                                    className="flex items-center justify-between p-3 sm:p-4 cursor-pointer hover:bg-[#fff8e1]"
                                    onClick={() => toggleOrderDetails(order.id)}
                                >
                                    <div className="flex flex-col gap-1">
                                        <div className="font-medium">{order.id}</div>
                                        <div className="text-sm text-muted-foreground">{format(order.date, "MMM d, yyyy")}</div>
                                    </div>

                                    <div className="flex items-center gap-2 sm:gap-4">
                                        <div className="text-right">
                                            <div className="font-medium">${order.total.toFixed(2)}</div>
                                            <Badge className="bg-[#ff9800] hover:bg-[#f57c00] text-[0.7rem] sm:text-xs">{order.status}</Badge>
                                        </div>
                                        <ChevronDownIcon
                                            className={cn(
                                                "h-5 w-5 transition-transform",
                                                expandedOrder === order.id && "transform rotate-180",
                                            )}
                                        />
                                    </div>
                                </div>

                                {expandedOrder === order.id && (
                                    <div className="p-3 sm:p-4 border-t bg-gray-50 overflow-x-auto">
                                        <div className="min-w-[400px]">
                                            <Table>
                                                <TableHeader>
                                                    <TableRow className="bg-gray-100">
                                                        <TableHead>Item</TableHead>
                                                        <TableHead className="text-right">Qty</TableHead>
                                                        <TableHead className="text-right">Price</TableHead>
                                                    </TableRow>
                                                </TableHeader>
                                                <TableBody>
                                                    {order.items.map((item, index) => (
                                                        <TableRow key={index}>
                                                            <TableCell>{item.name}</TableCell>
                                                            <TableCell className="text-right">{item.quantity}</TableCell>
                                                            <TableCell className="text-right">${item.price.toFixed(2)}</TableCell>
                                                        </TableRow>
                                                    ))}
                                                    <TableRow>
                                                        <TableCell colSpan={2} className="text-right font-medium">
                                                            Total
                                                        </TableCell>
                                                        <TableCell className="text-right font-medium">${order.total.toFixed(2)}</TableCell>
                                                    </TableRow>
                                                </TableBody>
                                            </Table>
                                        </div>

                                        <div className="mt-4 flex flex-col sm:flex-row gap-2 sm:justify-end">
                                            <Button variant="outline" size="sm" className="border-[#ff9800] text-black hover:bg-[#fff8e1]">
                                                Reorder
                                            </Button>
                                            <Button size="sm" className="bg-[#ff9800] text-white hover:bg-[#f57c00]">
                                                Leave Review
                                            </Button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-10">
                        <p className="text-muted-foreground">No orders found matching your filters.</p>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}

