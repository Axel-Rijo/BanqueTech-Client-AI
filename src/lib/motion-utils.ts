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

// Menu Section Animations - Enhanced

// Section entrance animation
export const menuSection: Variants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            duration: 0.7,
            ease: [0.25, 0.1, 0.25, 1.0], // Custom cubic bezier for smooth entry
            when: "beforeChildren",
        },
    },
}

// Menu container with improved staggered children
export const menuContainer: Variants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.08, // Slightly faster stagger for more dynamic feel
            delayChildren: 0.1,
            staggerDirection: 1,
            ease: [0.25, 0.1, 0.25, 1.0], // Custom cubic bezier
            when: "beforeChildren",
        },
    },
}

// Enhanced menu item animation with better physics
export const menuItem: Variants = {
    hidden: {
        y: 30,
        opacity: 0,
        scale: 0.97,
    },
    show: {
        y: 0,
        opacity: 1,
        scale: 1,
        transition: {
            type: "spring",
            stiffness: 80, // More gentle spring
            damping: 13, // Adjusted damping for subtle bounce
            mass: 0.8, // Slightly lighter feel
        },
    },
}

// Enhanced tab content transition with sophisticated physics
export const menuTabContent: Variants = {
    hidden: {
        opacity: 0,
        y: 15,
        scale: 0.98,
    },
    show: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            type: "spring",
            stiffness: 70,
            damping: 15,
            mass: 1,
            when: "beforeChildren",
        },
    },
    exit: {
        opacity: 0,
        y: -10,
        transition: {
            duration: 0.25,
            ease: [0.4, 0, 0.2, 1], // Material ease out
        },
    },
}

// Improved menu header animation with slight rotation
export const menuHeader: Variants = {
    hidden: {
        y: -25,
        opacity: 0,
        rotateX: 10, // Subtle 3D effect
    },
    show: {
        y: 0,
        opacity: 1,
        rotateX: 0,
        transition: {
            type: "spring",
            stiffness: 50,
            damping: 15,
            when: "beforeChildren",
            staggerChildren: 0.1,
        },
    },
}

// Enhanced menu title animation
export const menuHeaderTitle: Variants = {
    hidden: {
        opacity: 0,
        y: -20,
        scale: 0.95,
    },
    show: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            type: "spring",
            stiffness: 60,
            damping: 13,
        },
    },
}

// Enhanced menu description animation
export const menuHeaderDescription: Variants = {
    hidden: {
        opacity: 0,
        y: 10,
    },
    show: {
        opacity: 1,
        y: 0,
        transition: {
            type: "spring",
            stiffness: 70,
            damping: 13,
            delay: 0.1,
        },
    },
}

// Improved menu tabs container animation
export const menuTabsContainer: Variants = {
    hidden: {
        opacity: 0,
        y: 20,
        scale: 0.97,
    },
    show: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            type: "spring",
            stiffness: 80,
            damping: 20,
        },
    },
}

// Enhanced menu button hover animation
export const menuButton: Variants = {
    initial: {
        backgroundColor: "#f59e0b",
        boxShadow: "0px 0px 0px rgba(245, 158, 11, 0)",
        y: 0,
        scale: 1,
    },
    hover: {
        scale: 1.03,
        y: -2,
        backgroundColor: "#f59e0b",
        boxShadow: "0px 5px 15px rgba(245, 158, 11, 0.4), 0px 0px 0px 1px rgba(245, 158, 11, 0.2)",
        transition: {
            type: "spring",
            stiffness: 300,
            damping: 15,
        },
    },
    tap: {
        scale: 0.97,
        y: 0,
        boxShadow: "0px 2px 5px rgba(245, 158, 11, 0.3), 0px 0px 0px 1px rgba(245, 158, 11, 0.2)",
        transition: {
            type: "spring",
            stiffness: 500,
            damping: 15,
        },
    },
}

// Enhanced menu card hover animation
export const menuCard: Variants = {
    initial: {
        y: 0,
        borderColor: "rgba(245, 158, 11, 0.2)",
        boxShadow: "0px 0px 0px rgba(0, 0, 0, 0), 0px 0px 0px rgba(245, 158, 11, 0)",
    },
    hover: {
        y: -5,
        boxShadow: "0px 10px 25px rgba(0, 0, 0, 0.15), 0px 0px 0px 1px rgba(245, 158, 11, 0.5)",
        borderColor: "rgba(245, 158, 11, 0.8)",
        transition: {
            type: "spring",
            stiffness: 200,
            damping: 15,
        },
    },
    tap: {
        y: -2,
        boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.1), 0px 0px 0px 1px rgba(245, 158, 11, 0.5)",
        transition: {
            type: "spring",
            stiffness: 300,
            damping: 15,
        },
    },
}

// Enhanced menu image hover animation
export const menuImage: Variants = {
    initial: {
        scale: 1,
        filter: "brightness(1)",
    },
    hover: {
        scale: 1.07,
        filter: "brightness(1.05)",
        transition: {
            type: "spring",
            stiffness: 150,
            damping: 15,
        },
    },
}

// Enhanced menu item title hover animation
export const menuTitle: Variants = {
    initial: {
        color: "#ffffff",
        x: 0,
    },
    hover: {
        color: "#f59e0b",
        x: 2,
        transition: {
            type: "spring",
            stiffness: 300,
            damping: 15,
        },
    },
}

// Enhanced menu price hover animation
export const menuPrice: Variants = {
    initial: {
        scale: 1,
        x: 0,
    },
    hover: {
        scale: 1.1,
        x: -2,
        transition: {
            type: "spring",
            stiffness: 300,
            damping: 10,
        },
    },
}

// Enhanced menu dietary tag hover animation
export const menuTag: Variants = {
    initial: {
        backgroundColor: "rgba(245, 158, 11, 0)",
        scale: 1,
        y: 0,
    },
    hover: {
        backgroundColor: "rgba(245, 158, 11, 0.15)",
        scale: 1.08,
        y: -1,
        transition: {
            type: "spring",
            stiffness: 350,
            damping: 10,
        },
    },
}

// Enhanced menu tab trigger hover animation
export const menuTabTrigger: Variants = {
    initial: {
        scale: 1,
        backgroundColor: "rgba(245, 158, 11, 0)",
    },
    hover: {
        scale: 1.05,
        backgroundColor: "rgba(245, 158, 11, 0.1)",
        transition: {
            type: "spring",
            stiffness: 300,
            damping: 15,
        },
    },
    tap: {
        scale: 0.95,
        transition: {
            type: "spring",
            stiffness: 500,
            damping: 10,
        },
    },
}

// Focus animation for accessibility
export const focusVisible: Variants = {
    initial: {
        outline: "0px solid rgba(245, 158, 11, 0)",
        boxShadow: "0px 0px 0px 0px rgba(245, 158, 11, 0)",
    },
    focus: {
        outline: "2px solid rgba(245, 158, 11, 0.5)",
        boxShadow: "0px 0px 0px 2px rgba(245, 158, 11, 0.2)",
        transition: {
            duration: 0.2,
        },
    },
}

