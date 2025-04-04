"use client"

import type { Variants } from "framer-motion"

// Staggered children animation
export const staggerContainer = (staggerChildren?: number, delayChildren?: number): Variants => ({
    hidden: {},
    show: {
        transition: {
            staggerChildren: staggerChildren || 0.1,
            delayChildren: delayChildren || 0,
        },
    },
})

// Fade up animation for items
export const fadeInUp = (duration = 0.3): Variants => ({
    hidden: {
        y: 20,
        opacity: 0,
    },
    show: {
        y: 0,
        opacity: 1,
        transition: {
            type: "tween",
            duration,
            ease: "easeOut",
        },
    },
})

// Fade in animation
export const fadeIn = (direction: "left" | "right" | "up" | "down" = "up", duration = 0.3): Variants => {
    const directions = {
        up: { y: 20 },
        down: { y: -20 },
        left: { x: 20 },
        right: { x: -20 },
    }

    return {
        hidden: {
            ...directions[direction],
            opacity: 0,
        },
        show: {
            x: 0,
            y: 0,
            opacity: 1,
            transition: {
                type: "tween",
                duration,
                ease: "easeOut",
            },
        },
    }
}

// Scale animation
export const scaleIn = (duration = 0.3): Variants => ({
    hidden: {
        scale: 0.9,
        opacity: 0,
    },
    show: {
        scale: 1,
        opacity: 1,
        transition: {
            type: "spring",
            duration,
            bounce: 0.3,
        },
    },
})

// Page transition
export const pageTransition: Variants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            duration: 0.3,
            when: "beforeChildren",
            staggerChildren: 0.1,
        },
    },
    exit: {
        opacity: 0,
        transition: {
            duration: 0.2,
            ease: "easeOut",
        },
    },
}

