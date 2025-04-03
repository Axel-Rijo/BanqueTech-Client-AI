import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { Branch } from "./menu-data"
import { getDishDetails } from "./dish-data"
import { getBranchMenu } from "./dish-data"

// Define the cart item type
export interface CartItem {
    dishId: string
    quantity: number
    cookingPreference?: string
    sideDish?: string
    addOns: string[]
    specialInstructions?: string
    price: number // Base price of the dish
    totalPrice: number // Price including quantity and add-ons
    branchId: Branch // Track which branch this item was added from
}

// Define the store state
interface MenuState {
    // Branch selection
    selectedBranch: Branch
    hasBranchBeenSelected: boolean
    setSelectedBranch: (branch: Branch) => void

    // Cart management
    cart: CartItem[]
    addToCart: (item: Omit<CartItem, "totalPrice" | "branchId">) => void
    removeFromCart: (index: number) => void
    updateCartItemQuantity: (index: number, quantity: number) => void
    clearCart: () => void

    // Edit functionality
    editingCartItemIndex: number | null
    setEditingCartItemIndex: (index: number | null) => void
    updateCartItem: (index: number, item: Omit<CartItem, "totalPrice">) => void

    // Cart calculations
    getCartTotal: () => number
    getCartItemsCount: () => number
    getDishQuantityInCart: (dishId: string) => number

    // Add this to the MenuState interface
    getCartBranchConflicts: () => {
        branchConflicts: boolean
        conflictItems: CartItem[]
        conflictBranches: Record<Branch, CartItem[]>
    }
}

// Create the store
export const useMenuStore = create<MenuState>()(
    persist(
        (set, get) => ({
            // Initial branch selection
            selectedBranch: "downtown",
            hasBranchBeenSelected: false,
            setSelectedBranch: (branch) => set({ selectedBranch: branch, hasBranchBeenSelected: true }),

            // Cart state and operations
            cart: [],

            // Edit functionality
            editingCartItemIndex: null,
            setEditingCartItemIndex: (index) => set({ editingCartItemIndex: index }),

            addToCart: (item) => {
                set((state) => {
                    // Add the current branch to the item
                    const itemWithBranch = {
                        ...item,
                        branchId: state.selectedBranch,
                    }

                    // Check if the item is already in the cart with the same preferences
                    const existingItemIndex = state.cart.findIndex(
                        (cartItem) =>
                            cartItem.dishId === item.dishId &&
                            cartItem.cookingPreference === item.cookingPreference &&
                            cartItem.sideDish === item.sideDish &&
                            JSON.stringify(cartItem.addOns.sort()) === JSON.stringify(item.addOns.sort()) &&
                            cartItem.specialInstructions === item.specialInstructions &&
                            cartItem.branchId === state.selectedBranch, // Also check if it's from the same branch
                    )

                    if (existingItemIndex !== -1) {
                        // If the item exists with the same preferences, update the quantity
                        const updatedCart = [...state.cart]
                        updatedCart[existingItemIndex].quantity += item.quantity
                        updatedCart[existingItemIndex].totalPrice = calculateItemTotalPrice(updatedCart[existingItemIndex])
                        return { cart: updatedCart }
                    } else {
                        // Otherwise, add as a new item
                        const totalPrice = calculateItemTotalPrice(itemWithBranch)
                        return { cart: [...state.cart, { ...itemWithBranch, totalPrice }] }
                    }
                })
            },

            removeFromCart: (index) => {
                set((state) => ({
                    cart: state.cart.filter((_, i) => i !== index),
                }))
            },

            updateCartItemQuantity: (index, quantity) => {
                set((state) => {
                    const updatedCart = [...state.cart]
                    if (updatedCart[index]) {
                        updatedCart[index].quantity = quantity
                        updatedCart[index].totalPrice = calculateItemTotalPrice(updatedCart[index])
                    }
                    return { cart: updatedCart }
                })
            },

            updateCartItem: (index, item) => {
                set((state) => {
                    const updatedCart = [...state.cart]
                    if (updatedCart[index]) {
                        // Preserve the original branch when updating
                        const branchId = updatedCart[index].branchId
                        updatedCart[index] = {
                            ...item,
                            branchId,
                            totalPrice: calculateItemTotalPrice(item),
                        }
                    }
                    return { cart: updatedCart, editingCartItemIndex: null }
                })
            },

            clearCart: () => set({ cart: [] }),

            // Cart calculations
            getCartTotal: () => {
                const { cart } = get()
                return cart.reduce((total, item) => total + item.totalPrice, 0)
            },

            getCartItemsCount: () => {
                const { cart } = get()
                return cart.reduce((count, item) => count + item.quantity, 0)
            },

            // Get quantity of a specific dish in cart
            getDishQuantityInCart: (dishId) => {
                const { cart } = get()
                return cart.filter((item) => item.dishId === dishId).reduce((total, item) => total + item.quantity, 0)
            },

            // Updated implementation to check if dishes are actually available in the current branch
            getCartBranchConflicts: () => {
                const { cart, selectedBranch } = get()

                // Get the menu for the current branch
                const currentBranchMenu = getBranchMenu(selectedBranch)
                const availableDishIds = currentBranchMenu.map((item) => item.id)

                // Find items that are not available in the current branch
                const conflictItems = cart.filter((item) => {
                    // Only consider it a conflict if the dish is NOT available in the current branch
                    return !availableDishIds.includes(item.dishId)
                })

                // Group conflict items by branch
                const conflictBranches: Record<Branch, CartItem[]> = {}

                conflictItems.forEach((item) => {
                    if (!conflictBranches[item.branchId]) {
                        conflictBranches[item.branchId] = []
                    }
                    conflictBranches[item.branchId].push(item)
                })

                return {
                    branchConflicts: conflictItems.length > 0,
                    conflictItems,
                    conflictBranches,
                }
            },
        }),
        {
            name: "savoria-menu-storage",
            partialize: (state) => ({
                selectedBranch: state.selectedBranch,
                hasBranchBeenSelected: state.hasBranchBeenSelected,
                cart: state.cart,
            }),
        },
    ),
)

// Helper function to calculate the total price of a cart item
function calculateItemTotalPrice(item: Omit<CartItem, "totalPrice"> & { totalPrice?: number }): number {
    // Get the dish details to access add-on prices
    const dishDetails = getDishDetails(item.dishId)

    if (!dishDetails) {
        return item.price * item.quantity // Fallback if dish details not found
    }

    // Start with the base price
    let itemPrice = item.price

    // Add the price of selected add-ons
    if (item.addOns && item.addOns.length > 0 && dishDetails.addOns) {
        item.addOns.forEach((addOnId) => {
            const addOn = dishDetails.addOns?.find((a) => a.id === addOnId)
            if (addOn) {
                itemPrice += addOn.price
            }
        })
    }

    // Multiply by quantity to get the total price
    return itemPrice * item.quantity
}

