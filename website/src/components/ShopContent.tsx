"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useCart } from "@/lib/cart";
import StaggerContainer, {
  staggerItem,
} from "@/components/animations/StaggerContainer";
import FadeUp from "@/components/animations/FadeUp";
import products from "@/lib/printful-seeded-products.json";

const EASE = [0, 0, 0.2, 1] as const;

const categories = ["All", "Apparel", "Drinkware", "Accessories", "Digital"] as const;
type Category = (typeof categories)[number];

const categoryColors: Record<string, string> = {
  Apparel: "rgba(197,165,90,0.15)",
  Drinkware: "rgba(128,0,32,0.15)",
  Accessories: "rgba(45,27,78,0.2)",
  Digital: "rgba(197,165,90,0.1)",
};

const categoryTextColors: Record<string, string> = {
  Apparel: "var(--accent)",
  Drinkware: "#d4627a",
  Accessories: "#a78bfa",
  Digital: "#B8B0A8",
};

export default function ShopContent() {
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [addedId, setAddedId] = useState<string | null>(null);
  const { addToCart } = useCart();

  const filtered =
    activeCategory === "All"
      ? products
      : products.filter((p) => p.category === activeCategory);

  function handleAddToCart(product: (typeof products)[number]) {
    const defaultVariant = product.variants[0];
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.preview_image_url,
      variant: defaultVariant.name,
    });
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1200);
  }

  return (
    <section
      className="py-16 md:py-24"
      style={{ backgroundColor: "var(--bg-base)" }}
    >
      <div className="container-page">
        {/* Category Filters */}
        <FadeUp>
          <div className="flex flex-wrap gap-2 mb-10 md:mb-14">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="px-4 py-2 rounded-lg text-sm font-body font-medium transition-all"
                style={{
                  backgroundColor:
                    activeCategory === cat
                      ? "var(--accent)"
                      : "var(--bg-card)",
                  color:
                    activeCategory === cat
                      ? "#0F0F0F"
                      : "var(--text-secondary)",
                  border:
                    activeCategory === cat
                      ? "1px solid var(--accent)"
                      : "1px solid var(--bg-card-border)",
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </FadeUp>

        {/* Product Grid */}
        <StaggerContainer
          className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6"
          staggerDelay={0.07}
        >
          {filtered.map((product) => (
            <motion.div
              key={product.id}
              variants={staggerItem}
              className="group rounded-2xl overflow-hidden flex flex-col transition-all"
              style={{
                backgroundColor: "var(--bg-card)",
                border: "1px solid var(--bg-card-border)",
              }}
            >
              {/* Image */}
              <div className="relative aspect-square overflow-hidden bg-[var(--primary)]">
                <img
                  src={product.preview_image_url}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Category badge */}
                <span
                  className="absolute top-3 left-3 px-2.5 py-1 rounded-md text-[10px] md:text-xs font-body font-medium uppercase tracking-wider"
                  style={{
                    backgroundColor:
                      categoryColors[product.category] ??
                      "var(--bg-card)",
                    color:
                      categoryTextColors[product.category] ??
                      "var(--text-secondary)",
                    backdropFilter: "blur(8px)",
                  }}
                >
                  {product.category}
                </span>
              </div>

              {/* Details */}
              <div className="flex flex-col flex-1 p-4 md:p-5">
                <h3
                  className="font-display text-sm md:text-base font-bold leading-snug"
                  style={{ color: "var(--text-primary)" }}
                >
                  {product.name}
                </h3>
                <p
                  className="font-body text-xs mt-1.5 line-clamp-2 flex-1"
                  style={{ color: "var(--text-muted)" }}
                >
                  {product.description}
                </p>

                {/* Price + Add to Cart */}
                <div className="flex items-center justify-between mt-4 gap-2">
                  <span
                    className="font-display text-base md:text-lg font-bold"
                    style={{ color: "var(--accent)" }}
                  >
                    ${product.price.toFixed(2)}
                  </span>
                  <motion.button
                    onClick={() => handleAddToCart(product)}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.15, ease: EASE }}
                    className="px-3 md:px-4 py-2 rounded-lg text-xs md:text-sm font-body font-medium transition-all hover:brightness-110"
                    style={{
                      backgroundColor:
                        addedId === product.id
                          ? "rgba(197,165,90,0.15)"
                          : "var(--accent)",
                      color:
                        addedId === product.id
                          ? "var(--accent)"
                          : "#0F0F0F",
                      border:
                        addedId === product.id
                          ? "1px solid var(--accent)"
                          : "1px solid transparent",
                    }}
                  >
                    {addedId === product.id ? "Added!" : "Add to Cart"}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </StaggerContainer>

        {/* Empty state */}
        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p
              className="font-body text-lg"
              style={{ color: "var(--text-muted)" }}
            >
              No products in this category yet.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
