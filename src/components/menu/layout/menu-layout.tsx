"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { CartFooter } from "../cart-footer";

interface MenuLayoutProps {
  children: ReactNode;
}

export function MenuLayout({ children }: MenuLayoutProps) {
  const pathname = usePathname();
  // Update the showFooter condition to check for both cart and checkout paths
  const showFooter =
    !pathname.includes("/cart") && !pathname.includes("/checkout");

  return (
    <div className={showFooter ? "pb-20" : ""}>
      {" "}
      {/* Add padding at the bottom to account for the footer */}
      {children}
      {showFooter && <CartFooter />}
    </div>
  );
}
