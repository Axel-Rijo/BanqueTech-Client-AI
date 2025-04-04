"use client"

import { motion } from "framer-motion"
import { pageTransition } from "@/lib/motion-utils"
import type { ReactNode } from "react"

interface PageTransitionProps {
    children: ReactNode
    className?: string
}

export function PageTransition({ children, className = "" }: PageTransitionProps) {
    return (
        <motion.div variants={pageTransition} initial="hidden" animate="show" exit="exit" className={className}>
            {children}
        </motion.div>
    )
}

