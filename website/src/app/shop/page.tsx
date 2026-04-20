import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ShopContent from "@/components/ShopContent";
import { isShopEnabled } from "@/lib/feature-flags";

export const metadata: Metadata = {
  title: "Shop | Collaborative Insights",
  description:
    "Shop spiritual apparel, drinkware, accessories, and digital guides from Collaborative Insights. Wear your journey, carry your truth.",
};

export default function ShopPage() {
  if (!isShopEnabled) {
    notFound();
  }

  return (
    <main className="pt-20 md:pt-24">
      <div className="container-page text-center py-12 md:py-16">
        <h1 className="hero-shimmer font-display text-4xl md:text-6xl font-bold">
          Shop
        </h1>
        <p
          className="font-body text-base md:text-lg mt-4 max-w-xl mx-auto"
          style={{ color: "var(--text-secondary)" }}
        >
          Spiritual tools, apparel, and resources to support your journey.
        </p>
      </div>
      <ShopContent />
    </main>
  );
}
