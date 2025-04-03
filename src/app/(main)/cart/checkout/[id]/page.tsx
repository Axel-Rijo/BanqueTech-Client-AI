"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  CardAction,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Check,
  Printer,
  ClipboardCheck,
  ChefHat,
  ShoppingBag,
  Package,
  Info,
} from "lucide-react";
import Image from "next/image";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Order item type with detailed information
type OrderItem = {
  id: string;
  name: string;
  quantity: number;
  price: number;
  image: string;
  options?: { name: string; value: string }[];
  specialInstructions?: string;
  allergens?: string[];
  calories?: number;
  size?: string;
};

function OrderStatus({ status }: { status: string }) {
  const statuses = [
    { key: "received", label: "Order Received", icon: ClipboardCheck },
    { key: "preparing", label: "Preparing", icon: ChefHat },
    { key: "ready", label: "Ready for Pickup", icon: ShoppingBag },
    { key: "completed", label: "Completed", icon: Package },
  ];

  const currentIndex = statuses.findIndex((s) => s.key === status);

  return (
    <div className="mb-6 print:mb-4">
      <h3 className="font-semibold text-lg mb-4">Order Status</h3>
      <div className="flex flex-col sm:flex-row justify-between relative">
        {/* Progress bar */}
        <div className="hidden sm:block absolute top-5 left-0 right-0 h-1 bg-gray-200">
          <div
            className="absolute h-1 bg-amber-500 transition-all duration-500 ease-in-out"
            style={{
              width: `${Math.min(
                100,
                (currentIndex / (statuses.length - 1)) * 100
              )}%`,
            }}
          ></div>
        </div>

        {statuses.map((s, index) => {
          const Icon = s.icon;
          const isActive = index <= currentIndex;
          const isCurrentStep = index === currentIndex;

          return (
            <div
              key={s.key}
              className="flex flex-row sm:flex-col items-center mb-4 sm:mb-0 relative z-10"
            >
              <div
                className={`
                flex items-center justify-center w-10 h-10 rounded-full 
                ${
                  isActive
                    ? "bg-amber-500 text-white"
                    : "bg-gray-200 text-gray-500"
                }
                ${isCurrentStep ? "ring-4 ring-amber-200" : ""}
              `}
              >
                <Icon className="h-5 w-5" />
              </div>
              <div className="ml-3 sm:ml-0 sm:mt-2 sm:text-center">
                <p
                  className={`text-sm font-medium ${
                    isActive ? "text-amber-500" : "text-gray-500"
                  }`}
                >
                  {s.label}
                </p>
                {isCurrentStep && (
                  <p className="text-xs text-gray-500 hidden sm:block">
                    Current status
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function OrderItemCard({ item }: { item: OrderItem }) {
  return (
    <div className="flex gap-4 p-3 rounded-lg border bg-white text-black">
      <div className="flex-shrink-0 w-20 h-20 relative rounded-md overflow-hidden">
        <Image
          src={item.image || "/placeholder.svg"}
          alt={item.name}
          fill
          className="object-cover"
        />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start">
          <div>
            <h4 className="font-medium text-base">{item.name}</h4>
            {item.size && (
              <p className="text-sm text-gray-600">Size: {item.size}</p>
            )}
          </div>
          <div className="text-right">
            <p className="font-medium">
              ${(item.price * item.quantity).toFixed(2)}
            </p>
            <p className="text-sm text-gray-600">
              {item.quantity} × ${item.price.toFixed(2)}
            </p>
          </div>
        </div>

        {item.options && item.options.length > 0 && (
          <div className="mt-1">
            <p className="text-sm font-medium">Options:</p>
            <div className="flex flex-wrap gap-1 mt-1">
              {item.options.map((option, idx) => (
                <Badge
                  key={idx}
                  variant="outline"
                  className="text-xs bg-white text-black border-amber-500"
                >
                  {option.name}: {option.value}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {item.specialInstructions && (
          <div className="mt-1">
            <p className="text-sm text-gray-600 italic">
              "{item.specialInstructions}"
            </p>
          </div>
        )}

        {item.allergens && item.allergens.length > 0 && (
          <div className="mt-1 flex items-center">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center text-amber-600 text-xs">
                    <Info className="h-3 w-3 mr-1" />
                    <span>Contains allergens</span>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Contains: {item.allergens.join(", ")}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        )}

        {item.calories && (
          <div className="mt-1">
            <p className="text-xs text-gray-500">{item.calories} cal</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function OrderConfirmation() {
  // In a real app, you would fetch this data from your backend
  const orderData = {
    orderNumber: "ORD-12345",
    date: "March 24, 2025",
    time: "8:45 PM",
    estimatedPickup: "9:15 PM",
    status: "preparing", // possible values: "received", "preparing", "ready", "completed"
    specialInstructions: "Please include extra napkins and utensils.",
    items: [
      {
        id: "item1",
        name: "Truffle Mushroom Risotto",
        quantity: 1,
        price: 18.99,
        image: "/placeholder.svg?height=160&width=160",
        size: "Regular",
        options: [
          { name: "Parmesan", value: "Extra" },
          { name: "Garnish", value: "Fresh Herbs" },
        ],
        allergens: ["Dairy"],
        calories: 720,
      },
      {
        id: "item2",
        name: "Artisan Sourdough Bread",
        quantity: 1,
        price: 6.99,
        image: "/placeholder.svg?height=160&width=160",
        options: [{ name: "Dipping Oil", value: "Herb Infused" }],
        allergens: ["Wheat", "Gluten"],
        calories: 280,
      },
      {
        id: "item3",
        name: "Seasonal Greens Salad",
        quantity: 1,
        price: 12.99,
        image: "/placeholder.svg?height=160&width=160",
        size: "Sharing",
        options: [
          { name: "Dressing", value: "Balsamic Vinaigrette" },
          { name: "Toppings", value: "Candied Walnuts" },
        ],
        specialInstructions: "Dressing on the side please",
        allergens: ["Nuts"],
        calories: 320,
      },
      {
        id: "item4",
        name: "Sparkling Mineral Water",
        quantity: 2,
        price: 3.99,
        image: "/placeholder.svg?height=160&width=160",
        size: "750ml",
        calories: 0,
      },
    ],
    subtotal: 46.95,
    tax: 3.76,
    total: 50.71,
    paymentMethod: "Credit Card (****1234)",
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="container mx-auto py-8 px-4 max-w-3xl print:py-2 bg-white text-black">
      <div className="flex items-center justify-center mb-8 print:mb-4">
        <div className="bg-amber-100 rounded-full p-3 mr-3">
          <Check className="h-8 w-8 text-amber-600" />
        </div>
        <h1 className="text-3xl font-bold">Order Confirmed!</h1>
      </div>

      <Card className="mb-8 print:shadow-none">
        <CardHeader className="border-b">
          <CardTitle>Order #{orderData.orderNumber}</CardTitle>
          <CardDescription>
            Placed on {orderData.date} at {orderData.time}
          </CardDescription>
          <CardAction>
            <Button
              variant="outline"
              size="sm"
              className="print:hidden border-amber-500 text-amber-600 hover:bg-amber-50"
              onClick={handlePrint}
            >
              <Printer className="h-4 w-4 mr-2" />
              Print
            </Button>
          </CardAction>
        </CardHeader>

        <CardContent>
          <OrderStatus status={orderData.status} />
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-lg mb-3">Order Summary</h3>
              <div className="space-y-3">
                {orderData.items.map((item) => (
                  <OrderItemCard key={item.id} item={item} />
                ))}
              </div>

              {orderData.specialInstructions && (
                <div className="mt-4 p-3 bg-amber-50 rounded-lg border border-amber-200">
                  <p className="text-sm font-medium">Order Instructions:</p>
                  <p className="text-sm">{orderData.specialInstructions}</p>
                </div>
              )}
            </div>

            <Separator className="bg-gray-200" />

            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${orderData.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span>${orderData.tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span>${orderData.total.toFixed(2)}</span>
              </div>
            </div>

            <Separator className="bg-gray-200" />

            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="font-medium">Payment Method</span>
                <span>{orderData.paymentMethod}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Estimated Pickup Time</span>
                <span>{orderData.estimatedPickup}</span>
              </div>
            </div>
          </div>
        </CardContent>

        <CardFooter className="border-t flex-col items-start gap-2">
          <div className="flex items-center">
            <h3 className="font-bold text-lg">Savoria</h3>
          </div>
          <p className="text-sm text-gray-600">
            123 Main Street, Anytown, CA 12345
          </p>
          <p className="text-sm text-gray-600">(555) 123-4567</p>
        </CardFooter>
      </Card>

      <div className="text-center space-y-4 print:hidden">
        <p className="text-gray-600">
          Thank you for your order! Please show this confirmation when you
          arrive.
        </p>
        <Button
          className="w-full sm:w-auto bg-amber-500 hover:bg-amber-600 text-white"
          onClick={() => (window.location.href = "/")}
        >
          Return to Home
        </Button>
      </div>
    </div>
  );
}
