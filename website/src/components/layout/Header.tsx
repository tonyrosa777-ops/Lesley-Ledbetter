"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { siteConfig } from "@/data/site";
import { useCart } from "@/lib/cart";

const navLinks = [
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Shop", href: "/shop" },
  { label: "Blog", href: "/blog" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { cartCount, openDrawer } = useCart();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-[var(--primary)]/80 border-b border-white/5">
      <div className="max-w-[var(--container-max)] mx-auto px-6 flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <Link href="/" className="font-display font-bold text-lg md:text-xl tracking-tight" style={{ color: "var(--text-primary)" }}>
          {siteConfig.name}
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-body transition-colors hover:text-[var(--text-primary)]"
              style={{ color: "var(--text-secondary)" }}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/quiz"
            className="text-sm font-body font-medium px-4 py-2 rounded-lg border transition-colors hover:bg-[rgba(197,165,90,0.1)]"
            style={{
              color: "var(--accent)",
              borderColor: "var(--accent)",
            }}
          >
            Take the Quiz
          </Link>
          <Link
            href="/booking"
            className="text-sm font-body font-medium px-5 py-2 rounded-lg transition-all hover:brightness-110"
            style={{
              backgroundColor: "var(--accent)",
              color: "#0F0F0F",
            }}
          >
            Book a Call
          </Link>
          <Link
            href="/pricing"
            className="text-sm font-body font-medium transition-colors"
            style={{ color: "#d4a017" }}
          >
            &#x2B25; Pricing
          </Link>
          <button
            onClick={openDrawer}
            className="relative p-2 rounded-lg transition-colors hover:bg-white/5"
            aria-label="Open cart"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--text-secondary)"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 01-8 0" />
            </svg>
            {cartCount > 0 && (
              <span
                className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] flex items-center justify-center rounded-full text-[10px] font-body font-bold leading-none"
                style={{
                  backgroundColor: "var(--accent)",
                  color: "#0F0F0F",
                }}
              >
                {cartCount}
              </span>
            )}
          </button>
        </nav>

        {/* Mobile: Cart + Hamburger */}
        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={openDrawer}
            className="relative p-2 rounded-lg transition-colors hover:bg-white/5"
            aria-label="Open cart"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--text-secondary)"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 01-8 0" />
            </svg>
            {cartCount > 0 && (
              <span
                className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] flex items-center justify-center rounded-full text-[10px] font-body font-bold leading-none"
                style={{
                  backgroundColor: "var(--accent)",
                  color: "#0F0F0F",
                }}
              >
                {cartCount}
              </span>
            )}
          </button>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex flex-col gap-1.5 p-2"
            aria-label="Toggle menu"
          >
            <span
              className="block w-6 h-0.5 transition-transform origin-center"
              style={{
                backgroundColor: "var(--text-primary)",
                transform: mobileOpen ? "rotate(45deg) translate(2px, 5px)" : "none",
              }}
            />
            <span
              className="block w-6 h-0.5 transition-opacity"
              style={{
                backgroundColor: "var(--text-primary)",
                opacity: mobileOpen ? 0 : 1,
              }}
            />
            <span
              className="block w-6 h-0.5 transition-transform origin-center"
              style={{
                backgroundColor: "var(--text-primary)",
                transform: mobileOpen ? "rotate(-45deg) translate(2px, -5px)" : "none",
              }}
            />
          </button>
        </div>
      </div>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden fixed inset-0 top-16 z-40"
            style={{ backgroundColor: "var(--bg-base)" }}
          >
            <nav className="flex flex-col items-center justify-center gap-8 h-full">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-xl font-body transition-colors"
                  style={{ color: "var(--text-primary)" }}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/quiz"
                onClick={() => setMobileOpen(false)}
                className="text-xl font-body font-medium"
                style={{ color: "var(--accent)" }}
              >
                Take the Quiz
              </Link>
              <Link
                href="/booking"
                onClick={() => setMobileOpen(false)}
                className="text-lg font-body font-medium px-8 py-3 rounded-lg"
                style={{
                  backgroundColor: "var(--accent)",
                  color: "#0F0F0F",
                }}
              >
                Book a Call
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
