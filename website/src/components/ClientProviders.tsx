"use client";

import { CartProvider } from "@/lib/cart";
import CartDrawer from "@/components/CartDrawer";
import type { ReactNode } from "react";

export default function ClientProviders({ children }: { children: ReactNode }) {
  return (
    <CartProvider>
      {children}
      <CartDrawer />
    </CartProvider>
  );
}
