"use client"

import { Progress } from "@/components/ui/progress"
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Award, Calendar, ArrowRight } from "lucide-react"

export function LoyaltyRewards() {
    // Mock data for loyalty program
    const loyaltyInfo = {
        points: 450,
        nextReward: 500,
        tier: "Silver",
        tierProgress: 65,
        nextTier: "Gold",
        availableRewards: [
            { id: 1, name: "Free Dessert", points: 200, expires: "Aug 30, 2023" },
            { id: 2, name: "10% Off Next Visit", points: 250, expires: "Sep 15, 2023" },
        ],
        redeemableRewards: [
            {
                id: 3,
                name: "Free Appetizer",
                points: 300,
                description: "Enjoy a complimentary appetizer with your next meal",
            },
            { id: 4, name: "Free Drink", points: 150, description: "Enjoy a complimentary non-alcoholic beverage" },
            { id: 5, name: "Priority Seating", points: 400, description: "Skip the wait and get priority seating" },
            {
                id: 6,
                name: "Chef's Special Tasting",
                points: 800,
                description: "Experience a special tasting menu prepared by our chef",
            },
        ],
        recentActivity: [
            { id: 1, date: "Jul 15, 2023", description: "Dinner visit", points: 100 },
            { id: 2, date: "Jun 28, 2023", description: "Redeemed: Free Dessert", points: -200 },
            { id: 3, date: "Jun 10, 2023", description: "Lunch visit", points: 50 },
            { id: 4, date: "May 22, 2023", description: "Birthday bonus", points: 100 },
        ],
    }

    return (
        <div className="space-y-6">
            <Card className="p-0">
                <div className="bg-black text-white p-6 rounded-t-xl">
                    <CardTitle className="text-2xl">Savoria Rewards</CardTitle>
                    <CardDescription className="text-gray-300 mt-1">
                        Track your points and redeem exclusive rewards at Savoria
                    </CardDescription>
                </div>

                <CardContent className="pt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-lg font-medium">Current Points</h3>
                                    <Badge className="bg-black text-white hover:bg-gray-800">{loyaltyInfo.tier} Member</Badge>
                                </div>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-4xl font-bold text-[#ff9800]">{loyaltyInfo.points}</span>
                                    <span className="text-muted-foreground">points</span>
                                </div>
                                <div className="space-y-1">
                                    <div className="flex justify-between text-sm">
                                        <span>Next Reward: {loyaltyInfo.nextReward} points</span>
                                        <span>{loyaltyInfo.nextReward - loyaltyInfo.points} points to go</span>
                                    </div>
                                    <Progress value={(loyaltyInfo.points / loyaltyInfo.nextReward) * 100} className="h-2 bg-gray-200">
                                        <div
                                            className="h-full bg-[#ff9800]"
                                            style={{ width: `${(loyaltyInfo.points / loyaltyInfo.nextReward) * 100}%` }}
                                        />
                                    </Progress>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <h3 className="text-lg font-medium">Membership Tier</h3>
                                <div className="flex items-center gap-2">
                                    <Award className="h-5 w-5 text-[#ff9800]" />
                                    <span>{loyaltyInfo.tier}</span>
                                    <ArrowRight className="h-4 w-4 text-muted-foreground" />
                                    <span>{loyaltyInfo.nextTier}</span>
                                </div>
                                <div className="space-y-1">
                                    <div className="flex justify-between text-sm">
                                        <span>Tier Progress</span>
                                        <span>{loyaltyInfo.tierProgress}%</span>
                                    </div>
                                    <Progress value={loyaltyInfo.tierProgress} className="h-2 bg-gray-200">
                                        <div className="h-full bg-[#ff9800]" style={{ width: `${loyaltyInfo.tierProgress}%` }} />
                                    </Progress>
                                </div>
                                <p className="text-sm text-muted-foreground">
                                    Continue dining with us to reach {loyaltyInfo.nextTier} status and unlock exclusive Savoria benefits.
                                </p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-lg font-medium">Available Rewards</h3>
                            {loyaltyInfo.availableRewards.length > 0 ? (
                                <div className="space-y-3">
                                    {loyaltyInfo.availableRewards.map((reward) => (
                                        <div
                                            key={reward.id}
                                            className="flex items-center justify-between p-3 border rounded-lg border-amber-200 bg-amber-50"
                                        >
                                            <div>
                                                <div className="font-medium">{reward.name}</div>
                                                <div className="text-sm text-muted-foreground flex items-center gap-1">
                                                    <Calendar className="h-3 w-3" />
                                                    Expires: {reward.expires}
                                                </div>
                                            </div>
                                            <Button size="sm" className="bg-[#ff9800] text-white hover:bg-[#f57c00]">
                                                Use
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-muted-foreground">You don't have any available rewards yet.</p>
                            )}

                            <div className="flex justify-center mt-2">
                                <Button variant="outline" className="w-full border-[#ff9800] text-black hover:bg-[#fff8e1]">
                                    View All Rewards
                                </Button>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Tabs defaultValue="redeem">
                <TabsList className="w-full bg-black text-white h-12 p-1 rounded-full">
                    <TabsTrigger
                        value="redeem"
                        className="text-white h-10 rounded-full data-[state=active]:bg-[#ff9800] data-[state=active]:text-white data-[state=active]:shadow-none"
                    >
                        Redeem Rewards
                    </TabsTrigger>
                    <TabsTrigger
                        value="activity"
                        className="text-white h-10 rounded-full data-[state=active]:bg-[#ff9800] data-[state=active]:text-white data-[state=active]:shadow-none"
                    >
                        Points Activity
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="redeem" className="space-y-4 mt-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {loyaltyInfo.redeemableRewards.map((reward) => (
                            <Card key={reward.id} className="border-gray-300">
                                <CardContent className="p-4 space-y-3">
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <h4 className="font-medium">{reward.name}</h4>
                                            <p className="text-sm text-muted-foreground">{reward.description}</p>
                                        </div>
                                        <Badge className="bg-black text-white">{reward.points} pts</Badge>
                                    </div>
                                    <Button
                                        variant="outline"
                                        className={`w-full ${loyaltyInfo.points >= reward.points ? "border-[#ff9800] text-black hover:bg-[#fff8e1]" : "border-gray-300 text-gray-400"}`}
                                        disabled={loyaltyInfo.points < reward.points}
                                    >
                                        {loyaltyInfo.points >= reward.points ? "Redeem" : "Not Enough Points"}
                                    </Button>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </TabsContent>

                <TabsContent value="activity" className="mt-4">
                    <Card className="border-gray-300">
                        <CardContent className="p-4">
                            <div className="space-y-4">
                                {loyaltyInfo.recentActivity.map((activity) => (
                                    <div key={activity.id} className="flex items-center justify-between py-2 border-b last:border-0">
                                        <div>
                                            <div className="font-medium">{activity.description}</div>
                                            <div className="text-sm text-muted-foreground">{activity.date}</div>
                                        </div>
                                        <div className={`font-medium ${activity.points > 0 ? "text-[#ff9800]" : "text-red-600"}`}>
                                            {activity.points > 0 ? "+" : ""}
                                            {activity.points} pts
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}

