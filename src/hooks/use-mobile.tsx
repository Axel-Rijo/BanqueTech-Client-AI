"use client"

import { useState, useEffect } from "react"

export function useMobile(breakpoint = 768): boolean {
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        // Function to check if screen width is less than breakpoint
        const checkScreenSize = () => {
            setIsMobile(window.innerWidth < breakpoint)
        }

        // Check on initial load
        checkScreenSize()

        // Add event listener for resize
        window.addEventListener("resize", checkScreenSize)

        // Cleanup
        return () => window.removeEventListener("resize", checkScreenSize)
    }, [breakpoint])

    return isMobile
}

