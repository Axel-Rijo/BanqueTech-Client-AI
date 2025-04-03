"use client";

import type React from "react";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  CalendarIcon,
  CreditCard,
  MapPin,
  User,
  Clock,
  Store,
  Tag,
  Check,
  X,
  DollarSign,
  UserCheck,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Sample coupon codes
const VALID_COUPONS = [
  { code: "WELCOME10", discount: 0.1, description: "10% off your order" },
  {
    code: "FREESHIP",
    discount: 3.99,
    description: "Free delivery",
    type: "delivery",
  },
  { code: "SAVE15", discount: 0.15, description: "15% off your order" },
];

// Tip percentage options
const TIP_OPTIONS = [
  { value: 0, label: "No Tip" },
  { value: 0.1, label: "10%" },
  { value: 0.15, label: "15%" },
  { value: 0.18, label: "18%" },
  { value: 0.2, label: "20%" },
  { value: "custom", label: "Custom" },
];

// Function to detect credit card type
const detectCardType = (cardNumber: string): string => {
  // Remove spaces and non-numeric characters
  const cleanNumber = cardNumber.replace(/\D/g, "");

  if (!cleanNumber) return "";

  // Visa
  if (/^4/.test(cleanNumber)) return "Visa";

  // Mastercard
  if (/^(5[1-5]|2[2-7]\d{2})/.test(cleanNumber)) return "Mastercard";

  // American Express
  if (/^3[47]/.test(cleanNumber)) return "Amex";

  // Discover
  if (
    /^(6011|65|64[4-9]|622(1(2[6-9]|[3-9]\d)|[2-8]\d{2}|9([01]\d|2[0-5])))/.test(
      cleanNumber
    )
  )
    return "Discover";

  // JCB
  if (/^35/.test(cleanNumber)) return "JCB";

  // Diners Club
  if (/^3(0[0-5]|[68])/.test(cleanNumber)) return "Diners";

  return "Unknown";
};

// Add a function to format credit card numbers with spaces
const formatCreditCardNumber = (value: string): string => {
  // Remove all non-digit characters
  const digits = value.replace(/\D/g, "");

  // Add a space after every 4 digits
  const formatted = digits.replace(/(\d{4})(?=\d)/g, "$1 ");

  return formatted;
};

// Form schema
const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().min(10, { message: "Please enter a valid phone number." }),
  orderType: z.enum(["delivery", "pickup"], {
    required_error: "Please select order type",
  }),
  deliveryTiming: z.enum(["asap", "scheduled"], {
    required_error: "Please select when you want your order",
  }),
  address: z
    .string()
    .min(5, { message: "Address must be at least 5 characters." })
    .optional(),
  deliveryDate: z.date().optional(),
  deliveryTime: z.string().optional(),
  specialInstructions: z.string().optional(),
  couponCode: z.string().optional(),
  paymentMethod: z.enum(["card", "cash"], {
    required_error: "Please select a payment method.",
  }),
  cardNumber: z.string().optional(),
  cardExpiry: z.string().optional(),
  cardCvc: z.string().optional(),
  createAccount: z.boolean().default(false),
  password: z.string().optional(),
  confirmPassword: z.string().optional(),
  emailMarketingConsent: z.boolean().default(false),
  smsMarketingConsent: z.boolean().default(false),
  customTipAmount: z.string().optional(),
});

// Sample order items
const orderItems = [
  { id: 1, name: "Margherita Pizza", price: 12.99, quantity: 1 },
  { id: 2, name: "Caesar Salad", price: 8.99, quantity: 1 },
  { id: 3, name: "Garlic Bread", price: 4.99, quantity: 2 },
];

// Sample user data for logged in user
const loggedInUser = {
  id: "user123",
  name: "Alex Johnson",
  email: "alex@example.com",
  phone: "(555) 123-4567",
  address: "456 Oak Avenue, Cityville",
  avatarUrl: "/placeholder.svg?height=40&width=40",
};

export default function CheckoutPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState<
    (typeof VALID_COUPONS)[0] | null
  >(null);
  const [couponError, setCouponError] = useState<string | null>(null);
  const [cardType, setCardType] = useState<string>("");
  const [selectedTip, setSelectedTip] = useState<number | string>(0.15); // Default 15% tip
  const [customTipAmount, setCustomTipAmount] = useState<string>("");
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Set to true for demo purposes

  // Calculate order totals
  const subtotal = orderItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const tax = subtotal * 0.08; // 8% tax
  const deliveryFee = 3.99;

  // Calculate tip amount
  const getTipAmount = () => {
    if (selectedTip === "custom") {
      const customAmount = Number.parseFloat(customTipAmount);
      return isNaN(customAmount) ? 0 : customAmount;
    }
    return subtotal * (selectedTip as number);
  };

  const tipAmount = getTipAmount();

  // Initialize form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: isLoggedIn ? loggedInUser.name : "",
      email: isLoggedIn ? loggedInUser.email : "",
      phone: isLoggedIn ? loggedInUser.phone : "",
      address: isLoggedIn ? loggedInUser.address : "",
      orderType: "delivery",
      deliveryTiming: "asap",
      specialInstructions: "",
      couponCode: "",
      paymentMethod: "card",
      cardNumber: "",
      cardExpiry: "",
      cardCvc: "",
      createAccount: false,
      password: "",
      confirmPassword: "",
      emailMarketingConsent: false,
      smsMarketingConsent: false,
      customTipAmount: "",
    },
  });

  // Watch values for conditional rendering
  const paymentMethod = form.watch("paymentMethod");
  const orderType = form.watch("orderType");
  const deliveryTiming = form.watch("deliveryTiming");
  const couponCode = form.watch("couponCode");
  const createAccount = form.watch("createAccount");

  // Calculate discount and total
  const getDiscount = () => {
    if (!appliedCoupon) return 0;

    if (appliedCoupon.type === "delivery") {
      return orderType === "delivery" ? appliedCoupon.discount : 0;
    }

    return subtotal * appliedCoupon.discount;
  };

  const discount = getDiscount();

  const getTotal = () => {
    let total = subtotal + tax;

    // Add delivery fee if applicable
    if (orderType === "delivery") {
      // Check if we have a free delivery coupon
      if (!(appliedCoupon?.type === "delivery")) {
        total += deliveryFee;
      }
    }

    // Apply discount
    total -= discount;

    // Add tip
    total += tipAmount;

    return total;
  };

  const total = getTotal();

  // Apply coupon handler
  const handleApplyCoupon = () => {
    if (!couponCode) {
      setCouponError("Please enter a coupon code");
      setAppliedCoupon(null);
      return;
    }

    const coupon = VALID_COUPONS.find(
      (c) => c.code.toLowerCase() === couponCode.toLowerCase()
    );

    if (!coupon) {
      setCouponError("Invalid coupon code");
      setAppliedCoupon(null);
      return;
    }

    // If it's a delivery coupon but order type is pickup
    if (coupon.type === "delivery" && orderType === "pickup") {
      setCouponError("This coupon is only valid for delivery orders");
      setAppliedCoupon(null);
      return;
    }

    setAppliedCoupon(coupon);
    setCouponError(null);
  };

  // Remove coupon handler
  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponError(null);
    form.setValue("couponCode", "");
  };

  // Handle tip selection
  const handleTipSelection = (value: number | string) => {
    setSelectedTip(value);
    if (value !== "custom") {
      setCustomTipAmount("");
      form.setValue("customTipAmount", "");
    }
  };

  // Handle custom tip input
  const handleCustomTipChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Only allow numbers and decimal point
    if (/^(\d*\.?\d{0,2})?$/.test(value)) {
      setCustomTipAmount(value);
      form.setValue("customTipAmount", value);
    }
  };

  // Handle user logout
  const handleLogout = () => {
    setIsLoggedIn(false);
    form.reset({
      name: "",
      email: "",
      phone: "",
      address: "",
      orderType: form.getValues("orderType"),
      deliveryTiming: form.getValues("deliveryTiming"),
      specialInstructions: form.getValues("specialInstructions"),
      couponCode: form.getValues("couponCode"),
      paymentMethod: form.getValues("paymentMethod"),
      cardNumber: form.getValues("cardNumber"),
      cardExpiry: form.getValues("cardExpiry"),
      cardCvc: form.getValues("cardCvc"),
      createAccount: false,
      password: "",
      confirmPassword: "",
      emailMarketingConsent: false,
      smsMarketingConsent: false,
      customTipAmount: form.getValues("customTipAmount"),
    });
  };

  // Form submission handler
  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);

    // Add applied coupon to form data
    const formData = {
      ...values,
      appliedCoupon: appliedCoupon ? appliedCoupon.code : null,
      discount: discount,
      tipAmount: tipAmount,
      total: total,
    };

    // Simulate API call
    setTimeout(() => {
      console.log(formData);
      setIsSubmitting(false);

      if (isLoggedIn) {
        alert(
          `Order placed successfully! Thank you for your order, ${loggedInUser.name}!`
        );
      } else if (values.createAccount) {
        alert(
          `Order placed successfully! Account created with email: ${values.email}`
        );
      } else {
        alert("Order placed successfully!");
      }
    }, 1500);
  }

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <h1 className="text-3xl font-bold mb-8 text-center">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Order Summary */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
            <CardDescription>Review your order details</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {orderItems.map((item) => (
                <div key={item.id} className="flex justify-between">
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-muted-foreground">
                      Qty: {item.quantity}
                    </p>
                  </div>
                  <p className="font-medium">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}

              <Separator className="my-4" />

              <div className="space-y-2">
                <div className="flex justify-between">
                  <p className="text-muted-foreground">Subtotal</p>
                  <p>${subtotal.toFixed(2)}</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-muted-foreground">Tax</p>
                  <p>${tax.toFixed(2)}</p>
                </div>
                {orderType === "delivery" && (
                  <div className="flex justify-between">
                    <p className="text-muted-foreground">Delivery Fee</p>
                    {appliedCoupon?.type === "delivery" ? (
                      <p className="line-through text-muted-foreground">
                        ${deliveryFee.toFixed(2)}
                      </p>
                    ) : (
                      <p>${deliveryFee.toFixed(2)}</p>
                    )}
                  </div>
                )}

                {appliedCoupon && discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <p className="flex items-center">
                      <Tag className="h-4 w-4 mr-1" />
                      Discount
                      <Badge variant="outline" className="ml-2 text-xs">
                        {appliedCoupon.code}
                      </Badge>
                    </p>
                    <p>-${discount.toFixed(2)}</p>
                  </div>
                )}

                {tipAmount > 0 && (
                  <div className="flex justify-between">
                    <p className="flex items-center">
                      <DollarSign className="h-4 w-4 mr-1" />
                      Tip
                    </p>
                    <p>${tipAmount.toFixed(2)}</p>
                  </div>
                )}

                <Separator className="my-2" />
                <div className="flex justify-between font-bold">
                  <p>Total</p>
                  <p>${total.toFixed(2)}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Checkout Form */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Order Information</CardTitle>
            <CardDescription>Please fill in your order details</CardDescription>
            {isLoggedIn && (
              <div className="mt-4 p-4 bg-slate-50 rounded-lg border">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage
                        src={loggedInUser.avatarUrl}
                        alt={loggedInUser.name}
                      />
                      <AvatarFallback>
                        {loggedInUser.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium flex items-center">
                        {loggedInUser.name}
                        <UserCheck className="h-4 w-4 ml-2 text-green-600" />
                        <Badge variant="outline" className="ml-2">
                          Logged In
                        </Badge>
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {loggedInUser.email}
                      </p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" onClick={handleLogout}>
                    Sign Out
                  </Button>
                </div>
              </div>
            )}
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                {/* Order Type Selection */}
                <FormField
                  control={form.control}
                  name="orderType"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>Order Type</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={(value) => {
                            field.onChange(value);
                            // Reset coupon if it's a delivery coupon and switching to pickup
                            if (
                              value === "pickup" &&
                              appliedCoupon?.type === "delivery"
                            ) {
                              handleRemoveCoupon();
                            }
                          }}
                          defaultValue={field.value}
                          className="flex flex-wrap gap-4"
                        >
                          <FormItem className="flex items-center space-x-3 space-y-0 rounded-md border p-4 w-full sm:w-[calc(50%-0.5rem)]">
                            <FormControl>
                              <RadioGroupItem value="delivery" />
                            </FormControl>
                            <FormLabel className="font-normal flex items-center">
                              <MapPin className="mr-2 h-4 w-4" />
                              Delivery
                            </FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0 rounded-md border p-4 w-full sm:w-[calc(50%-0.5rem)]">
                            <FormControl>
                              <RadioGroupItem value="pickup" />
                            </FormControl>
                            <FormLabel className="font-normal flex items-center">
                              <Store className="mr-2 h-4 w-4" />
                              Pickup
                            </FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Delivery/Pickup Timing */}
                <FormField
                  control={form.control}
                  name="deliveryTiming"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>
                        {orderType === "delivery" ? "Delivery" : "Pickup"} Time
                      </FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-wrap gap-4"
                        >
                          <FormItem className="flex items-center space-x-3 space-y-0 rounded-md border p-4 w-full sm:w-[calc(50%-0.5rem)]">
                            <FormControl>
                              <RadioGroupItem value="asap" />
                            </FormControl>
                            <FormLabel className="font-normal flex items-center">
                              <Clock className="mr-2 h-4 w-4" />
                              As soon as possible
                            </FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0 rounded-md border p-4 w-full sm:w-[calc(50%-0.5rem)]">
                            <FormControl>
                              <RadioGroupItem value="scheduled" />
                            </FormControl>
                            <FormLabel className="font-normal">
                              Schedule for later
                            </FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Scheduled Time Options (conditional) */}
                {deliveryTiming === "scheduled" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="deliveryDate"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Date</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant={"outline"}
                                  className={cn(
                                    "pl-3 text-left font-normal",
                                    !field.value && "text-muted-foreground"
                                  )}
                                >
                                  {field.value ? (
                                    format(field.value, "PPP")
                                  ) : (
                                    <span>Pick a date</span>
                                  )}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent
                              className="w-auto p-0"
                              align="start"
                            >
                              <Calendar
                                mode="single"
                                selected={field.value || undefined}
                                onSelect={field.onChange}
                                disabled={(date) => date < new Date()}
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="deliveryTime"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Time</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a time" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="11:00 AM">11:00 AM</SelectItem>
                              <SelectItem value="12:00 PM">12:00 PM</SelectItem>
                              <SelectItem value="1:00 PM">1:00 PM</SelectItem>
                              <SelectItem value="2:00 PM">2:00 PM</SelectItem>
                              <SelectItem value="5:00 PM">5:00 PM</SelectItem>
                              <SelectItem value="6:00 PM">6:00 PM</SelectItem>
                              <SelectItem value="7:00 PM">7:00 PM</SelectItem>
                              <SelectItem value="8:00 PM">8:00 PM</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                )}

                {/* Tip Selection */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Add a Tip</h3>
                  <p className="text-sm text-muted-foreground">
                    Show your appreciation for our staff
                  </p>

                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                    {TIP_OPTIONS.map((option) => (
                      <Button
                        key={option.value.toString()}
                        type="button"
                        variant={
                          selectedTip === option.value ? "default" : "outline"
                        }
                        className={cn(
                          "h-12",
                          selectedTip === option.value
                            ? "bg-primary text-primary-foreground"
                            : ""
                        )}
                        onClick={() => handleTipSelection(option.value)}
                      >
                        {option.label}
                      </Button>
                    ))}
                  </div>

                  {selectedTip === "custom" && (
                    <div className="mt-2">
                      <FormField
                        control={form.control}
                        name="customTipAmount"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Custom Tip Amount</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input
                                  className="pl-10"
                                  placeholder="Enter amount"
                                  value={customTipAmount}
                                  onChange={handleCustomTipChange}
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  )}

                  {tipAmount > 0 && (
                    <div className="text-sm">
                      <span className="font-medium">Tip amount: </span>
                      <span>${tipAmount.toFixed(2)}</span>
                      {selectedTip !== "custom" && selectedTip !== 0 && (
                        <span className="text-muted-foreground ml-2">
                          ({(selectedTip as number) * 100}% of subtotal)
                        </span>
                      )}
                    </div>
                  )}
                </div>

                {/* Coupon Code Section */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Discount Code</h3>

                  <div className="flex space-x-2">
                    <FormField
                      control={form.control}
                      name="couponCode"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <div className="relative">
                            <Tag className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input
                              className="pl-10"
                              placeholder="Enter coupon code"
                              {...field}
                              disabled={!!appliedCoupon}
                            />
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {appliedCoupon ? (
                      <Button
                        type="button"
                        variant="outline"
                        onClick={handleRemoveCoupon}
                        className="shrink-0"
                      >
                        Remove
                      </Button>
                    ) : (
                      <Button
                        type="button"
                        variant="outline"
                        onClick={handleApplyCoupon}
                        className="shrink-0"
                      >
                        Apply
                      </Button>
                    )}
                  </div>

                  {couponError && (
                    <Alert variant="destructive" className="py-2">
                      <AlertDescription className="flex items-center">
                        <X className="h-4 w-4 mr-2" />
                        {couponError}
                      </AlertDescription>
                    </Alert>
                  )}

                  {appliedCoupon && (
                    <Alert
                      variant="success"
                      className="py-2 bg-green-50 text-green-800 border-green-200"
                    >
                      <AlertDescription className="flex items-center">
                        <Check className="h-4 w-4 mr-2 text-green-600" />
                        {appliedCoupon.description} applied!
                      </AlertDescription>
                    </Alert>
                  )}

                  <div className="text-sm text-muted-foreground">
                    <p>Available coupons for testing:</p>
                    <ul className="list-disc pl-5 mt-1 space-y-1">
                      <li>WELCOME10: 10% off your order</li>
                      <li>FREESHIP: Free delivery (delivery orders only)</li>
                      <li>SAVE15: 15% off your order</li>
                    </ul>
                  </div>
                </div>

                {/* Personal Information */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium">
                      Personal Information
                    </h3>
                    {isLoggedIn && (
                      <p className="text-sm text-muted-foreground">
                        Using your account information
                      </p>
                    )}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                              <Input
                                className="pl-10"
                                placeholder="John Doe"
                                {...field}
                                disabled={isLoggedIn}
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
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
                              placeholder="your@email.com"
                              {...field}
                              disabled={isLoggedIn}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="(123) 456-7890"
                            {...field}
                            disabled={isLoggedIn}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Address (only for delivery) */}
                  {orderType === "delivery" && (
                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Delivery Address</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                              <Input
                                className="pl-10"
                                placeholder="123 Main St, City"
                                {...field}
                                disabled={isLoggedIn}
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                </div>

                {/* Account Creation Option - Only show if not logged in */}
                {!isLoggedIn && (
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="createAccount"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                          <FormControl>
                            <div className="flex items-center space-x-2">
                              <input
                                type="checkbox"
                                checked={field.value}
                                onChange={field.onChange}
                                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                              />
                              <label
                                htmlFor="createAccount"
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                              >
                                Create an account for faster checkout next time
                              </label>
                            </div>
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    {createAccount && (
                      <div className="space-y-4 p-4 border rounded-md">
                        <h4 className="font-medium">Account Details</h4>
                        <p className="text-sm text-muted-foreground">
                          Create a password to set up your account
                        </p>

                        <FormField
                          control={form.control}
                          name="password"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Password</FormLabel>
                              <FormControl>
                                <Input
                                  type="password"
                                  placeholder="Create a password"
                                  {...field}
                                />
                              </FormControl>
                              <FormDescription>
                                Must be at least 8 characters
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="confirmPassword"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Confirm Password</FormLabel>
                              <FormControl>
                                <Input
                                  type="password"
                                  placeholder="Confirm your password"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    )}
                  </div>
                )}

                {/* Communication Preferences - Only show for guest users */}
                {!isLoggedIn && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">
                      Communication Preferences
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Choose how you'd like to hear from us
                    </p>

                    <div className="space-y-4 mt-4">
                      <FormField
                        control={form.control}
                        name="emailMarketingConsent"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                            <FormControl>
                              <div className="flex items-center space-x-2">
                                <input
                                  type="checkbox"
                                  checked={field.value}
                                  onChange={field.onChange}
                                  className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                                />
                                <label className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                  Receive email notifications about special
                                  offers, discounts and promotions
                                </label>
                              </div>
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="smsMarketingConsent"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                            <FormControl>
                              <div className="flex items-center space-x-2">
                                <input
                                  type="checkbox"
                                  checked={field.value}
                                  onChange={field.onChange}
                                  className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                                />
                                <label className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                  Receive SMS promotional messages about deals
                                  and special events
                                </label>
                              </div>
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>

                    <p className="text-xs text-muted-foreground mt-2">
                      You can change your communication preferences at any time
                      from your account settings.
                    </p>
                  </div>
                )}

                <FormField
                  control={form.control}
                  name="specialInstructions"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Special Instructions (Optional)</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder={
                            orderType === "delivery"
                              ? "Delivery instructions, allergies, etc..."
                              : "Pickup instructions, allergies, etc..."
                          }
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        {orderType === "delivery"
                          ? "Any special delivery requests, dietary needs, or allergies."
                          : "Any special pickup requests, dietary needs, or allergies."}
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="paymentMethod"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>Payment Method</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col space-y-1"
                        >
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="card" />
                            </FormControl>
                            <FormLabel className="font-normal flex items-center">
                              <CreditCard className="mr-2 h-4 w-4" />
                              Credit/Debit Card
                            </FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="cash" />
                            </FormControl>
                            <FormLabel className="font-normal">
                              Cash on{" "}
                              {orderType === "delivery" ? "Delivery" : "Pickup"}
                            </FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {paymentMethod === "card" && (
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="cardNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Card Number</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <CreditCard className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                              <Input
                                className="pl-10"
                                placeholder="1234 5678 9012 3456"
                                value={field.value}
                                onChange={(e) => {
                                  // Format the input value
                                  const formattedValue = formatCreditCardNumber(
                                    e.target.value
                                  );
                                  // Update the field with the formatted value
                                  field.onChange(formattedValue);
                                  // Detect card type
                                  setCardType(detectCardType(formattedValue));
                                }}
                              />
                              {cardType && (
                                <div className="absolute right-3 top-2.5 text-sm font-medium">
                                  <Badge variant="outline">{cardType}</Badge>
                                </div>
                              )}
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="cardExpiry"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Expiry Date</FormLabel>
                            <FormControl>
                              <Input placeholder="MM/YY" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="cardCvc"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>CVC</FormLabel>
                            <FormControl>
                              <Input placeholder="123" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                )}

                <Button
                  type="submit"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting
                    ? "Processing..."
                    : `Place ${
                        orderType === "delivery" ? "Delivery" : "Pickup"
                      } Order`}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
