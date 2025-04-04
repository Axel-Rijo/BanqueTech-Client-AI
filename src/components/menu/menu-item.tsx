"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { ShoppingBag } from "lucide-react"
import type { MenuItem as MenuItemType } from "@/lib/menu-data"
import { useMenuStore } from "@/lib/store"
import { DishVariationsDialog } from "./dish-variations-dialog"
import { useMobile } from "@/hooks/use-mobile"
import { fadeInUp } from "@/lib/motion-utils"

interface MenuItemProps {
  item: MenuItemType
  index: number
}

export function MenuItem({ item, index }: MenuItemProps) {
  const { getDishQuantityInCart } = useMenuStore()
  const quantityInCart = getDishQuantityInCart(item.id)
  const isMobile = useMobile()

  // Mobile-specific card design
  if (isMobile) {
    return (
      <motion.div
        variants={fadeInUp()}
        initial="hidden"
        animate="show"
        exit="hidden"
        transition={{ delay: index * 0.05 }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="border border-gray-100 rounded-lg overflow-hidden bg-white mb-4 shadow-sm relative"
      >
        {/* Cart quantity badge - Positioned absolutely and OUTSIDE the Link */}
        {quantityInCart > 0 && (
          <DishVariationsDialog dishId={item.id}>
            <motion.button
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="absolute bottom-2 right-2 bg-black text-white rounded-full px-2 py-1 text-xs font-bold flex items-center gap-1 cursor-pointer hover:bg-gray-800 transition-colors z-10"
            >
              <ShoppingBag className="h-3 w-3" />
              <span>{quantityInCart}</span>
            </motion.button>
          </DishVariationsDialog>
        )}

        <Link href={`/menu/${item.id}`} className="block">
          <div className="aspect-[2/1] relative bg-gray-50">
            <Image
              src={item.image || "/placeholder.svg?height=200&width=300"}
              alt={item.name}
              fill
              className="object-cover"
            />
          </div>

          <div className="p-3">
            <div className="flex justify-between items-start mb-1">
              <h3 className="font-bold text-base">{item.name}</h3>
              <span className="font-bold text-primary">${item.price.toFixed(2)}</span>
            </div>

            <p className="text-muted-foreground text-sm line-clamp-2">{item.description}</p>
          </div>
        </Link>
      </motion.div>
    )
  }

  // Desktop card design with animations
  return (
    <motion.div
      variants={fadeInUp()}
      initial="hidden"
      animate="show"
      exit="hidden"
      transition={{ delay: index * 0.05 }}
      whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
      whileTap={{ scale: 0.98 }}
      className="relative"
    >
      {/* Cart quantity badge - Positioned absolutely and OUTSIDE the Card/Link structure */}
      {quantityInCart > 0 && (
        <DishVariationsDialog dishId={item.id}>
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="absolute bottom-2 right-2 bg-black text-white rounded-full px-2 py-1 text-xs font-bold flex items-center gap-1 cursor-pointer hover:bg-gray-800 transition-colors z-10"
          >
            <ShoppingBag className="h-3 w-3" />
            <span>{quantityInCart}</span>
          </motion.button>
        </DishVariationsDialog>
      )}

      <Card className="overflow-hidden border-black/10 relative h-full">
        <Link href={`/menu/${item.id}`} className="block h-full">
          <div className="aspect-video relative overflow-hidden">
            <Image
              src={item.image || "/placeholder.svg?height=200&width=300"}
              alt={item.name}
              fill
              className="object-cover transition-transform duration-500 hover:scale-105"
            />
            {item.isNew && (
              <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
                <Badge className="absolute top-2 right-2 bg-primary text-white">New</Badge>
              </motion.div>
            )}
            {item.isSpicy && (
              <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
                <Badge className="absolute top-2 left-2 bg-red-500">Spicy</Badge>
              </motion.div>
            )}
          </div>

          <div className="p-4">
            <div className="flex justify-between items-start gap-2 mb-2">
              <h3 className="font-bold text-lg">{item.name}</h3>
              <span className="font-bold text-primary whitespace-nowrap">${item.price.toFixed(2)}</span>
            </div>
            <p className="text-muted-foreground text-sm mb-3">{item.description}</p>
            {item.dietary && item.dietary.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="flex flex-wrap gap-1 mt-2"
              >
                {item.dietary.map((diet) => (
                  <Badge key={diet} variant="outline" className="text-xs border-primary/50">
                    {diet}
                  </Badge>
                ))}
              </motion.div>
            )}
          </div>
        </Link>
      </Card>
    </motion.div>
  )
}

