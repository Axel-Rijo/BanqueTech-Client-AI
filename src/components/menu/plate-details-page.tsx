"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import {
  ArrowLeft,
  Minus,
  Plus,
  AlertTriangle,
  Info,
  Fish,
  Milk,
  Wheat,
  Egg,
  Nut,
  BeanIcon as Soy,
  ShoppingBag,
} from "lucide-react"
import { toast } from "sonner"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import type { DishDetails } from "@/lib/dish-data"
import { useMenuStore } from "@/lib/store"
import { fadeIn, fadeInUp } from "@/lib/motion-utils"

interface PlateDetailsPageProps {
  dish: DishDetails
}

// Helper function to get the appropriate allergen icon
const getAllergenIcon = (allergen: string) => {
  const lowerAllergen = allergen.toLowerCase()

  if (lowerAllergen.includes("fish")) return <Fish className="h-8 w-8 text-blue-500" />
  if (lowerAllergen.includes("dairy") || lowerAllergen.includes("milk"))
    return <Milk className="h-8 w-8 text-blue-300" />
  if (lowerAllergen.includes("gluten") || lowerAllergen.includes("wheat"))
    return <Wheat className="h-8 w-8 text-amber-500" />
  if (lowerAllergen.includes("egg")) return <Egg className="h-8 w-8 text-yellow-400" />
  if (lowerAllergen.includes("nut")) return <Nut className="h-8 w-8 text-amber-700" />
  if (lowerAllergen.includes("soy")) return <Soy className="h-8 w-8 text-green-500" />

  // Default icon for other allergens
  return (
    <div className="h-8 w-8 rounded-full border-2 border-gray-300 flex items-center justify-center text-xs font-bold">
      A
    </div>
  )
}

export default function PlateDetailsPage({ dish }: PlateDetailsPageProps) {
  const { addToCart, getCartItemsCount, editingCartItemIndex, cart, updateCartItem, setEditingCartItemIndex } =
    useMenuStore()

  const [quantity, setQuantity] = useState(1)
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([])
  // Initialize with empty strings - no default selection
  const [cookingPreference, setCookingPreference] = useState("")
  const [sideDish, setSideDish] = useState("")
  const [specialInstructions, setSpecialInstructions] = useState("")
  const [isEditing, setIsEditing] = useState(false)

  // Validation states
  const [errors, setErrors] = useState<{
    cookingPreference?: string
    sideDish?: string
  }>({})
  const [showValidation, setShowValidation] = useState(false)

  const cartItemsCount = getCartItemsCount()
  const router = useRouter()

  // Check if we're editing an existing cart item
  useEffect(() => {
    if (editingCartItemIndex !== null && cart[editingCartItemIndex]) {
      const cartItem = cart[editingCartItemIndex]

      // Only load the item if it matches the current dish
      if (cartItem.dishId === dish.id) {
        setIsEditing(true)
        setQuantity(cartItem.quantity)
        setSelectedAddOns(cartItem.addOns || [])
        setCookingPreference(cartItem.cookingPreference || "")
        setSideDish(cartItem.sideDish || "")
        setSpecialInstructions(cartItem.specialInstructions || "")
      } else {
        // If the dish ID doesn't match, reset the editing state
        setEditingCartItemIndex(null)
      }
    }
  }, [editingCartItemIndex, cart, dish.id, setEditingCartItemIndex])

  const handleAddOnToggle = (id: string) => {
    setSelectedAddOns((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
  }

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  const increaseQuantity = () => {
    setQuantity(quantity + 1)
  }

  const calculateTotal = () => {
    let total = dish.price * quantity

    // Add the price of selected add-ons
    selectedAddOns.forEach((addOnId) => {
      const addOn = dish.addOns?.find((item) => item.id === addOnId)
      if (addOn) {
        total += addOn.price * quantity
      }
    })

    return total.toFixed(2)
  }

  const validateForm = () => {
    const newErrors: {
      cookingPreference?: string
      sideDish?: string
    } = {}
    let isValid = true

    // Validate cooking preference if options exist
    if (dish.cookingOptions && dish.cookingOptions.length > 0 && !cookingPreference) {
      newErrors.cookingPreference = "Please select a cooking preference"
      isValid = false
    }

    // Validate side dish if options exist
    if (dish.sideOptions && dish.sideOptions.length > 0 && !sideDish) {
      newErrors.sideDish = "Please select a side dish"
      isValid = false
    }

    setErrors(newErrors)
    setShowValidation(true)
    return isValid
  }

  const handleSubmit = () => {
    // Validate the form
    if (!validateForm()) {
      toast({
        title: "Required options missing",
        description: "Please select all required options before adding to cart.",
        variant: "destructive",
      })
      return
    }

    // Calculate the base price of the dish
    const basePrice = dish.price

    // Calculate the total price including add-ons
    let totalAddOnPrice = 0
    selectedAddOns.forEach((addOnId) => {
      const addOn = dish.addOns?.find((item) => item.id === addOnId)
      if (addOn) {
        totalAddOnPrice += addOn.price
      }
    })

    const itemData = {
      dishId: dish.id,
      quantity,
      cookingPreference,
      sideDish,
      addOns: selectedAddOns,
      specialInstructions,
      price: basePrice,
      totalPrice: (basePrice + totalAddOnPrice) * quantity,
      // The branchId will be added automatically in the store
    }

    if (isEditing && editingCartItemIndex !== null) {
      // Update existing cart item
      updateCartItem(editingCartItemIndex, itemData)

      toast({
        title: "Item updated",
        description: `${quantity} x ${dish.name} updated in your order.`,
      })
    } else {
      // Add new item to cart
      addToCart(itemData)

      toast({
        title: "Added to cart",
        description: `${quantity} x ${dish.name} added to your order.`,
      })
    }

    // Navigate back to the menu page
    router.push("/menu")
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container mx-auto px-4 py-8"
    >
      <motion.div
        variants={fadeIn("up")}
        initial="hidden"
        animate="show"
        className="mb-6 flex justify-between items-center"
      >
        <Link
          href="/menu"
          className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Menu
        </Link>

        {/* Cart button */}
        <Button variant="outline" size="sm" className="flex items-center gap-2">
          <ShoppingBag className="h-4 w-4" />
          <span>Cart</span>
          {cartItemsCount > 0 && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="ml-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-black"
            >
              {cartItemsCount}
            </motion.span>
          )}
        </Button>
      </motion.div>

      <div className="grid gap-8 md:grid-cols-2">
        {/* Plate Image */}
        <motion.div
          variants={fadeInUp(0.4)}
          initial="hidden"
          animate="show"
          className="relative aspect-square overflow-hidden rounded-xl"
        >
          <Image
            src={dish.image || "/placeholder.svg?height=600&width=600"}
            alt={dish.name}
            fill
            className="object-cover"
            priority
          />
        </motion.div>

        {/* Plate Details */}
        <motion.div variants={fadeInUp(0.5)} initial="hidden" animate="show" className="space-y-6">
          <div>
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-3xl font-bold">{dish.name}</h1>
                {isEditing && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <Badge className="mt-2 bg-primary text-black">Editing Item</Badge>
                  </motion.div>
                )}
                <p className="mt-2 text-lg text-muted-foreground">{dish.description}</p>
              </div>
              <div className="text-2xl font-bold">${dish.price.toFixed(2)}</div>
            </div>

            {dish.dietary && dish.dietary.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mt-4 flex flex-wrap gap-2"
              >
                {dish.dietary.map((diet, index) => (
                  <motion.div
                    key={diet}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                  >
                    <Badge variant="outline">{diet}</Badge>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>

          <Separator />

          {/* Required Options */}
          <motion.div variants={fadeInUp(0.6)} initial="hidden" animate="show" className="space-y-4">
            <h2 className="text-xl font-semibold">Choose your preferences</h2>
            <div className="space-y-4">
              {dish.cookingOptions && dish.cookingOptions.length > 0 && (
                <div>
                  <div className="flex items-center mb-2">
                    <h3 className="font-medium">Cooking Preference</h3>
                    <span className="text-red-500 ml-1">*</span>
                  </div>
                  <RadioGroup
                    value={cookingPreference}
                    onValueChange={(value) => {
                      setCookingPreference(value)
                      if (errors.cookingPreference) {
                        setErrors({ ...errors, cookingPreference: undefined })
                      }
                    }}
                    className="space-y-2"
                  >
                    {dish.cookingOptions.map((option, index) => (
                      <motion.div
                        key={option.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 * index }}
                        className={`flex items-center justify-between rounded-md border p-3 ${showValidation && !cookingPreference && "border-red-500 bg-red-50"
                          }`}
                      >
                        <div className="flex items-center space-x-3">
                          <RadioGroupItem id={`cooking-${option.id}`} value={option.id} />
                          <Label htmlFor={`cooking-${option.id}`} className="cursor-pointer">
                            {option.name}
                          </Label>
                        </div>
                      </motion.div>
                    ))}
                  </RadioGroup>
                  {showValidation && errors.cookingPreference && (
                    <p className="text-sm text-red-500 mt-1">{errors.cookingPreference}</p>
                  )}
                </div>
              )}

              {dish.sideOptions && dish.sideOptions.length > 0 && (
                <div>
                  <div className="flex items-center mb-2">
                    <h3 className="font-medium">Side Dish</h3>
                    <span className="text-red-500 ml-1">*</span>
                  </div>
                  <RadioGroup
                    value={sideDish}
                    onValueChange={(value) => {
                      setSideDish(value)
                      if (errors.sideDish) {
                        setErrors({ ...errors, sideDish: undefined })
                      }
                    }}
                    className="space-y-2"
                  >
                    {dish.sideOptions.map((option, index) => (
                      <motion.div
                        key={option.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 * index }}
                        className={`flex items-center justify-between rounded-md border p-3 ${showValidation && !sideDish && "border-red-500 bg-red-50"
                          }`}
                      >
                        <div className="flex items-center space-x-3">
                          <RadioGroupItem id={`side-${option.id}`} value={option.id} />
                          <Label htmlFor={`side-${option.id}`} className="cursor-pointer">
                            {option.name}
                          </Label>
                        </div>
                      </motion.div>
                    ))}
                  </RadioGroup>
                  {showValidation && errors.sideDish && <p className="text-sm text-red-500 mt-1">{errors.sideDish}</p>}
                </div>
              )}
            </div>
          </motion.div>

          <Separator />

          {/* Optional Add-ons */}
          {dish.addOns && dish.addOns.length > 0 && (
            <>
              <motion.div variants={fadeInUp(0.7)} initial="hidden" animate="show" className="space-y-4">
                <h2 className="text-xl font-semibold">Optional Add-ons</h2>
                <div className="space-y-2">
                  {dish.addOns.map((addOn, index) => (
                    <motion.div
                      key={addOn.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * index }}
                      className="flex items-center justify-between rounded-md border p-3"
                      whileHover={{ backgroundColor: "rgba(0,0,0,0.02)" }}
                    >
                      <div className="flex items-center space-x-3">
                        <Checkbox
                          id={addOn.id}
                          checked={selectedAddOns.includes(addOn.id)}
                          onCheckedChange={() => handleAddOnToggle(addOn.id)}
                        />
                        <Label htmlFor={addOn.id} className="cursor-pointer">
                          {addOn.name}
                        </Label>
                      </div>
                      <div className="font-medium">+${addOn.price.toFixed(2)}</div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
              <Separator />
            </>
          )}

          {/* Accordion for Ingredients, Allergens, Nutrition */}
          <motion.div variants={fadeInUp(0.8)} initial="hidden" animate="show">
            <Accordion type="single" collapsible className="w-full">
              {dish.ingredients && dish.ingredients.length > 0 && (
                <AccordionItem value="ingredients">
                  <AccordionTrigger className="text-lg font-medium">Ingredients</AccordionTrigger>
                  <AccordionContent>
                    <motion.ul
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="ml-6 list-disc space-y-1 text-muted-foreground"
                    >
                      {dish.ingredients.map((ingredient, index) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                        >
                          {ingredient}
                        </motion.li>
                      ))}
                    </motion.ul>
                  </AccordionContent>
                </AccordionItem>
              )}

              {dish.allergens && (
                <AccordionItem value="allergens">
                  <AccordionTrigger className="text-lg font-medium">Allergen Information</AccordionTrigger>
                  <AccordionContent>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-6 bg-gray-50 p-4 rounded-md"
                    >
                      {/* Allergen Alert */}
                      <div className="flex gap-3 text-amber-600">
                        <AlertTriangle className="h-6 w-6 flex-shrink-0" />
                        <div>
                          <p className="font-semibold text-amber-600">Allergen Alert</p>
                          <p className="text-gray-600">
                            Our kitchen handles common allergens. While we take precautions to keep allergens separate,
                            cross-contamination is possible. Please inform your server of any allergies.
                          </p>
                        </div>
                      </div>

                      {/* Contains */}
                      {dish.allergens.contains && dish.allergens.contains.length > 0 && (
                        <div>
                          <h4 className="font-medium mb-3">Contains:</h4>
                          <div className="flex flex-wrap gap-4">
                            {dish.allergens.contains.map((allergen, index) => (
                              <motion.div
                                key={index}
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: index * 0.1 }}
                                className="flex flex-col items-center"
                              >
                                <div className="bg-white p-2 rounded-full border">{getAllergenIcon(allergen)}</div>
                                <span className="mt-1 text-sm">{allergen}</span>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* May contain traces of */}
                      {dish.allergens.mayContain && dish.allergens.mayContain.length > 0 && (
                        <div>
                          <h4 className="font-medium mb-3">May contain traces of:</h4>
                          <div className="flex flex-wrap gap-4">
                            {dish.allergens.mayContain.map((allergen, index) => (
                              <motion.div
                                key={index}
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.3 + index * 0.1 }}
                                className="flex flex-col items-center"
                              >
                                <div className="bg-white p-2 rounded-full border">{getAllergenIcon(allergen)}</div>
                                <span className="mt-1 text-sm">{allergen}</span>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Free from */}
                      {dish.allergens.freeFrom && dish.allergens.freeFrom.length > 0 && (
                        <div>
                          <h4 className="font-medium mb-3">Free from:</h4>
                          <div className="flex flex-wrap gap-4">
                            {dish.allergens.freeFrom.map((allergen, index) => (
                              <motion.div
                                key={index}
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.5 + index * 0.1 }}
                                className="flex flex-col items-center"
                              >
                                <div className="bg-white p-2 rounded-full border relative">
                                  {getAllergenIcon(allergen)}
                                  <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-full h-0.5 bg-red-500 rotate-45 transform origin-center"></div>
                                  </div>
                                </div>
                                <span className="mt-1 text-sm">{allergen}</span>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Information note */}
                      <div className="flex gap-3 text-blue-600 mt-4">
                        <Info className="h-6 w-6 flex-shrink-0" />
                        <p className="text-gray-600">
                          If you have severe allergies or specific dietary requirements, please speak with our staff for
                          detailed information.
                        </p>
                      </div>
                    </motion.div>
                  </AccordionContent>
                </AccordionItem>
              )}

              {dish.nutritionFacts && (
                <AccordionItem value="nutrition">
                  <AccordionTrigger className="text-lg font-medium">Nutrition Facts</AccordionTrigger>
                  <AccordionContent>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="grid grid-cols-2 gap-2 text-sm"
                    >
                      {Object.entries(dish.nutritionFacts).map(([key, value], index) => (
                        <motion.div
                          key={key}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex justify-between border-b py-1"
                        >
                          <span>{key.charAt(0).toUpperCase() + key.slice(1)}</span>
                          <span className="font-medium">
                            {value}
                            {key === "calories" ? " kcal" : "g"}
                          </span>
                        </motion.div>
                      ))}
                    </motion.div>
                  </AccordionContent>
                </AccordionItem>
              )}

              {dish.preparationTime && (
                <AccordionItem value="preparation">
                  <AccordionTrigger className="text-lg font-medium">Preparation Time</AccordionTrigger>
                  <AccordionContent>
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-muted-foreground">
                      Approximately {dish.preparationTime} minutes
                    </motion.p>
                  </AccordionContent>
                </AccordionItem>
              )}
            </Accordion>
          </motion.div>

          <Separator />

          {/* Quantity and Add to Cart */}
          <motion.div variants={fadeInUp(0.9)} initial="hidden" animate="show" className="space-y-6">
            <div className="flex items-center">
              <span className="mr-4 font-medium">Quantity:</span>
              <div className="flex items-center">
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 rounded-full"
                    onClick={decreaseQuantity}
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                    <span className="sr-only">Decrease quantity</span>
                  </Button>
                </motion.div>
                <span className="mx-4 w-6 text-center">{quantity}</span>
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <Button variant="outline" size="icon" className="h-8 w-8 rounded-full" onClick={increaseQuantity}>
                    <Plus className="h-4 w-4" />
                    <span className="sr-only">Increase quantity</span>
                  </Button>
                </motion.div>
              </div>
            </div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Button className="w-full bg-primary hover:bg-primary/80 text-white" onClick={handleSubmit}>
                {isEditing ? "Update Item" : "Add to Order"} • ${calculateTotal()}
              </Button>
            </motion.div>

            <AnimatePresence>
              {showValidation && Object.keys(errors).length > 0 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="p-3 bg-red-50 border border-red-200 rounded-md text-red-600 text-sm"
                >
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="h-5 w-5 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">Please select all required options</p>
                      <ul className="list-disc pl-5 mt-1">
                        {errors.cookingPreference && <li>Cooking Preference is required</li>}
                        {errors.sideDish && <li>Side Dish is required</li>}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Special Instructions */}
          <motion.div variants={fadeInUp(1.0)} initial="hidden" animate="show">
            <Card>
              <CardContent className="pt-6">
                <Label htmlFor="special-instructions" className="mb-2 block font-medium">
                  Special Instructions (Optional)
                </Label>
                <textarea
                  id="special-instructions"
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  placeholder="Any special requests or dietary concerns?"
                  rows={3}
                  value={specialInstructions}
                  onChange={(e) => setSpecialInstructions(e.target.value)}
                />
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  )
}

