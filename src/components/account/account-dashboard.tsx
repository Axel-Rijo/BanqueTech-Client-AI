"use client"

import { useState, useEffect, useRef } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UserProfile } from "@/components/account/user-profile"
import { OrderHistory } from "@/components/account/order-history"
import { Reservations } from "@/components/account/reservations"
import { AccountSettings } from "@/components/account/account-settings"
import { LoyaltyRewards } from "@/components/account/loyalty-rewards"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useMobile } from "@/hooks/use-mobile"

export default function AccountDashboard() {
    const [activeTab, setActiveTab] = useState("profile")
    const tabsListRef = useRef<HTMLDivElement>(null)
    const [showLeftArrow, setShowLeftArrow] = useState(false)
    const [showRightArrow, setShowRightArrow] = useState(false)
    const isMobile = useMobile()

    // Check if scrolling is needed and update arrow visibility
    const checkScrollPosition = () => {
        if (!tabsListRef.current || !isMobile) return

        const { scrollLeft, scrollWidth, clientWidth } = tabsListRef.current
        setShowLeftArrow(scrollLeft > 0)
        setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 5) // 5px buffer
    }

    // Scroll to active tab when it changes
    useEffect(() => {
        if (!tabsListRef.current || !isMobile) return

        const tabsList = tabsListRef.current
        const activeTabElement = tabsList.querySelector(`[data-state="active"]`)

        if (activeTabElement) {
            const tabsRect = tabsList.getBoundingClientRect()
            const activeTabRect = activeTabElement.getBoundingClientRect()

            // Calculate the scroll position to center the active tab
            const scrollLeft = activeTabRect.left + activeTabRect.width / 2 - (tabsRect.left + tabsRect.width / 2)

            tabsList.scrollBy({ left: scrollLeft, behavior: "smooth" })

            // Update arrow visibility after scrolling
            setTimeout(checkScrollPosition, 300)
        }
    }, [activeTab, isMobile])

    // Initialize scroll checking
    useEffect(() => {
        const tabsList = tabsListRef.current
        if (!tabsList) return

        checkScrollPosition()

        // Add scroll event listener
        tabsList.addEventListener("scroll", checkScrollPosition)
        window.addEventListener("resize", checkScrollPosition)

        return () => {
            tabsList.removeEventListener("scroll", checkScrollPosition)
            window.removeEventListener("resize", checkScrollPosition)
        }
    }, [isMobile])

    const scrollTabs = (direction: "left" | "right") => {
        if (!tabsListRef.current) return

        const scrollAmount = direction === "left" ? -120 : 120
        tabsListRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" })

        // Update arrow visibility after scrolling
        setTimeout(checkScrollPosition, 300)
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">My Savoria Account</h1>
                <p className="text-muted-foreground">Manage your account settings and dining preferences</p>
            </div>

            <Tabs defaultValue="profile" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
                <div className="relative">
                    {isMobile && showLeftArrow && (
                        <Button
                            variant="ghost"
                            size="icon"
                            className="absolute -left-2 top-1/2 z-10 -translate-y-1/2 h-8 w-8 rounded-full bg-black text-white opacity-80 hover:opacity-100 shadow-md"
                            onClick={() => scrollTabs("left")}
                        >
                            <ChevronLeft className="h-4 w-4" />
                            <span className="sr-only">Scroll left</span>
                        </Button>
                    )}

                    <div
                        ref={tabsListRef}
                        className={`overflow-x-auto scrollbar-hide pb-1 ${isMobile ? "" : "w-full"}`}
                        style={{
                            scrollbarWidth: "none",
                            msOverflowStyle: "none",
                        }}
                    >
                        <TabsList
                            className={`
              ${isMobile ? "w-max min-w-full" : "w-full"}
              rounded-full bg-black h-12 p-1
            `}
                        >
                            {["profile", "orders", "reservations", "rewards", "settings"].map((tab) => (
                                <TabsTrigger
                                    key={tab}
                                    value={tab}
                                    className="h-10 rounded-full data-[state=active]:bg-[#ff9800] data-[state=active]:text-white data-[state=active]:shadow-none text-white"
                                    onClick={() => setActiveTab(tab)}
                                >
                                    {tab}
                                </TabsTrigger>
                            ))}
                        </TabsList>
                    </div>

                    {isMobile && showRightArrow && (
                        <Button
                            variant="ghost"
                            size="icon"
                            className="absolute -right-2 top-1/2 z-10 -translate-y-1/2 h-8 w-8 rounded-full bg-black text-white opacity-80 hover:opacity-100 shadow-md"
                            onClick={() => scrollTabs("right")}
                        >
                            <ChevronRight className="h-4 w-4" />
                            <span className="sr-only">Scroll right</span>
                        </Button>
                    )}
                </div>

                <TabsContent value="profile" className="space-y-4">
                    <UserProfile />
                </TabsContent>

                <TabsContent value="orders" className="space-y-4">
                    <OrderHistory />
                </TabsContent>

                <TabsContent value="reservations" className="space-y-4">
                    <Reservations />
                </TabsContent>

                <TabsContent value="rewards" className="space-y-4">
                    <LoyaltyRewards />
                </TabsContent>

                <TabsContent value="settings" className="space-y-4">
                    <AccountSettings />
                </TabsContent>
            </Tabs>
        </div>
    )
}

