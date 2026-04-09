"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/lib/cart";
import Link from "next/link";

const EASE = [0, 0, 0.2, 1] as const;

export default function CartDrawer() {
  const {
    items,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartTotal,
    cartCount,
    isDrawerOpen,
    closeDrawer,
  } = useCart();

  const drawerRef = useRef<HTMLDivElement>(null);
  const [checkoutMessage, setCheckoutMessage] = useState(false);

  // Close on click outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        drawerRef.current &&
        !drawerRef.current.contains(e.target as Node)
      ) {
        closeDrawer();
      }
    }
    if (isDrawerOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "";
    };
  }, [isDrawerOpen, closeDrawer]);

  // Close on Escape
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") closeDrawer();
    }
    if (isDrawerOpen) {
      document.addEventListener("keydown", handleKey);
    }
    return () => document.removeEventListener("keydown", handleKey);
  }, [isDrawerOpen, closeDrawer]);

  return (
    <AnimatePresence>
      {isDrawerOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div
            ref={drawerRef}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.4, ease: EASE }}
            className="fixed top-0 right-0 bottom-0 z-[70] w-full max-w-md flex flex-col"
            style={{ backgroundColor: "var(--bg-elevated)" }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-6 py-5 border-b"
              style={{ borderColor: "var(--bg-card-border)" }}
            >
              <h2
                className="font-display text-xl font-bold"
                style={{ color: "var(--text-primary)" }}
              >
                Your Cart
                {cartCount > 0 && (
                  <span
                    className="ml-2 text-sm font-body font-normal"
                    style={{ color: "var(--text-muted)" }}
                  >
                    ({cartCount} {cartCount === 1 ? "item" : "items"})
                  </span>
                )}
              </h2>
              <button
                onClick={closeDrawer}
                className="p-2 rounded-lg transition-colors hover:bg-white/5"
                aria-label="Close cart"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                >
                  <line x1="4" y1="4" x2="16" y2="16" />
                  <line x1="16" y1="4" x2="4" y2="16" />
                </svg>
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-4">
                  <svg
                    width="48"
                    height="48"
                    viewBox="0 0 48 48"
                    fill="none"
                    stroke="var(--text-muted)"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M6 12h4l4 24h20l4-16H16" />
                    <circle cx="20" cy="40" r="2" />
                    <circle cx="32" cy="40" r="2" />
                  </svg>
                  <p
                    className="text-center font-body"
                    style={{ color: "var(--text-muted)" }}
                  >
                    Your cart is empty
                  </p>
                  <Link
                    href="/shop"
                    onClick={closeDrawer}
                    className="text-sm font-body font-medium px-5 py-2 rounded-lg transition-colors"
                    style={{ color: "var(--accent)", border: "1px solid var(--accent)" }}
                  >
                    Browse the Shop
                  </Link>
                </div>
              ) : (
                <ul className="space-y-4">
                  {items.map((item) => (
                    <li
                      key={`${item.id}-${item.variant}`}
                      className="flex gap-4 p-3 rounded-xl"
                      style={{
                        backgroundColor: "var(--bg-card)",
                        border: "1px solid var(--bg-card-border)",
                      }}
                    >
                      {/* Thumbnail */}
                      <div
                        className="w-16 h-16 rounded-lg flex-shrink-0 overflow-hidden"
                        style={{ backgroundColor: "var(--primary)" }}
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Details */}
                      <div className="flex-1 min-w-0">
                        <h3
                          className="font-body font-medium text-sm truncate"
                          style={{ color: "var(--text-primary)" }}
                        >
                          {item.name}
                        </h3>
                        <p
                          className="text-xs font-body mt-0.5"
                          style={{ color: "var(--text-muted)" }}
                        >
                          {item.variant}
                        </p>
                        <div className="flex items-center justify-between mt-2">
                          {/* Quantity controls */}
                          <div
                            className="flex items-center rounded-lg overflow-hidden"
                            style={{ border: "1px solid var(--bg-card-border)" }}
                          >
                            <button
                              onClick={() =>
                                updateQuantity(
                                  item.id,
                                  item.variant,
                                  item.quantity - 1
                                )
                              }
                              className="px-2 py-1 text-xs transition-colors hover:bg-white/5"
                              style={{ color: "var(--text-secondary)" }}
                              aria-label="Decrease quantity"
                            >
                              -
                            </button>
                            <span
                              className="px-3 py-1 text-xs font-medium"
                              style={{ color: "var(--text-primary)" }}
                            >
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(
                                  item.id,
                                  item.variant,
                                  item.quantity + 1
                                )
                              }
                              className="px-2 py-1 text-xs transition-colors hover:bg-white/5"
                              style={{ color: "var(--text-secondary)" }}
                              aria-label="Increase quantity"
                            >
                              +
                            </button>
                          </div>

                          {/* Price */}
                          <span
                            className="text-sm font-body font-medium"
                            style={{ color: "var(--accent)" }}
                          >
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      </div>

                      {/* Remove */}
                      <button
                        onClick={() => removeFromCart(item.id, item.variant)}
                        className="self-start p-1 rounded transition-colors hover:bg-white/5"
                        aria-label={`Remove ${item.name}`}
                      >
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 14 14"
                          fill="none"
                          stroke="var(--text-muted)"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        >
                          <line x1="3" y1="3" x2="11" y2="11" />
                          <line x1="11" y1="3" x2="3" y2="11" />
                        </svg>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div
                className="px-6 py-5 border-t space-y-4"
                style={{ borderColor: "var(--bg-card-border)" }}
              >
                {/* Subtotal */}
                <div className="flex items-center justify-between">
                  <span
                    className="font-body text-sm"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    Subtotal
                  </span>
                  <span
                    className="font-display text-lg font-bold"
                    style={{ color: "var(--text-primary)" }}
                  >
                    ${cartTotal.toFixed(2)}
                  </span>
                </div>

                {/* Checkout message */}
                <AnimatePresence>
                  {checkoutMessage && (
                    <motion.p
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.2 }}
                      className="text-center text-xs font-body py-2 px-3 rounded-lg"
                      style={{
                        color: "var(--accent)",
                        backgroundColor: "rgba(197,165,90,0.1)",
                        border: "1px solid rgba(197,165,90,0.2)",
                      }}
                    >
                      Checkout coming soon -- stay tuned!
                    </motion.p>
                  )}
                </AnimatePresence>

                {/* Checkout CTA */}
                <button
                  onClick={() => {
                    setCheckoutMessage(true);
                    setTimeout(() => setCheckoutMessage(false), 3000);
                  }}
                  className="w-full py-3 rounded-lg font-body font-medium text-sm transition-all hover:brightness-110"
                  style={{
                    backgroundColor: "var(--accent)",
                    color: "#0F0F0F",
                  }}
                >
                  Checkout
                </button>

                {/* Continue Shopping + Clear */}
                <div className="flex items-center justify-between">
                  <Link
                    href="/shop"
                    onClick={closeDrawer}
                    className="text-xs font-body transition-colors hover:underline"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    Continue Shopping
                  </Link>
                  <button
                    onClick={clearCart}
                    className="text-xs font-body transition-colors hover:underline"
                    style={{ color: "var(--text-muted)" }}
                  >
                    Clear Cart
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
