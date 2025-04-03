import { useMenuStore } from "@/lib/store"

export const useCart = () => {
    const { cart } = useMenuStore()

    const items = cart

    return {
        items,
    }
}

