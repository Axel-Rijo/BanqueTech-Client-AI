import { forwardRef } from "react"
import { type SelectTriggerProps, SelectTrigger as ShadcnSelectTrigger } from "@/components/ui/select"
import { cn } from "@/lib/utils"

export const CustomSelectTrigger = forwardRef<HTMLButtonElement, SelectTriggerProps>(
    ({ className, children, ...props }, ref) => {
        return (
            <ShadcnSelectTrigger ref={ref} className={cn("flex items-center justify-between", className)} {...props}>
                {children}
            </ShadcnSelectTrigger>
        )
    },
)
CustomSelectTrigger.displayName = "CustomSelectTrigger"
