import type { Metadata } from "next"
import AccountDashboard from "@/components/account/account-dashboard"

export const metadata: Metadata = {
    title: "My Account | Savoria",
    description: "Manage your Savoria account, view order history, and track your rewards",
}

export default function AccountPage() {
    return (
        <div className="container py-10 px-4">
            <AccountDashboard />
        </div>
    )
}


