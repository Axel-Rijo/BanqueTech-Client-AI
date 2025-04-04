"use client"

import * as React from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface BottomSheetProps {
    isOpen: boolean
    onClose: () => void
    title?: string
    children: React.ReactNode
    className?: string
}

export function BottomSheet({ isOpen, onClose, title, children, className }: BottomSheetProps) {
    // Prevent scrolling on the background when the sheet is open
    React.useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = ""
        }

        return () => {
            document.body.style.overflow = ""
        }
    }, [isOpen])

    if (!isOpen) return null

    return (
        <div
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm transition-opacity"
            aria-hidden="true"
            onClick={(e) => {
                // Close when clicking the backdrop
                if (e.target === e.currentTarget) onClose()
            }}
        >
            <div
                className={cn(
                    "fixed inset-x-0 bottom-0 z-50 rounded-t-xl bg-background shadow-lg animate-in slide-in-from-bottom duration-300",
                    className,
                )}
                style={{ maxHeight: "75vh" }}
            >
                <div className="flex items-center justify-between border-b p-4">
                    {title && <h3 className="text-lg font-semibold">{title}</h3>}
                    <Button size="icon" variant="ghost" onClick={onClose} className="ml-auto">
                        <X className="h-4 w-4" />
                        <span className="sr-only">Close</span>
                    </Button>
                </div>

                <div className="overflow-y-auto p-4 pb-8" style={{ maxHeight: "calc(75vh - 60px)" }}>
                    {children}
                </div>
            </div>
        </div>
    )
}
