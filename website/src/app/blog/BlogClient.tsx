"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { blogPosts, blogCategories } from "@/data/blog";
import type { BlogPost } from "@/data/blog";
import FadeUp from "@/components/animations/FadeUp";
import FadeIn from "@/components/animations/FadeIn";
import StaggerContainer, {
  staggerItem,
} from "@/components/animations/StaggerContainer";

const ease = [0, 0, 0.2, 1] as const;

/* ── Category badge component ── */
function CategoryBadge({
  category,
  active = false,
  onClick,
}: {
  category: string;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="px-4 py-2 rounded-full text-xs font-medium uppercase tracking-wider transition-all duration-200 cursor-pointer border"
      style={{
        fontFamily: "var(--font-body)",
        backgroundColor: active ? "var(--accent)" : "var(--bg-card)",
        color: active ? "var(--primary)" : "var(--text-secondary)",
        borderColor: active
          ? "var(--accent)"
          : "var(--bg-card-border)",
      }}
    >
      {category}
    </button>
  );
}

/* ── Placeholder image area ── */
function PostImagePlaceholder({ category }: { category: string }) {
  const icons: Record<string, string> = {
    Awakening: "\u2728",
    Healing: "\u{1FA77}",
    Guidance: "\u{1F9ED}",
    Ancestors: "\u{1F333}",
  };

  return (
    <div
      className="h-48 flex items-center justify-center"
      style={{ backgroundColor: "var(--primary-muted)" }}
    >
      <span className="text-4xl">{icons[category] || "\u{1F4D6}"}</span>
    </div>
  );
}

/* ── Blog card ── */
function BlogCard({ post }: { post: BlogPost }) {
  return (
    <motion.div
      variants={staggerItem}
      className="rounded-2xl border overflow-hidden transition-colors hover:border-[rgba(197,165,90,0.3)] group"
      style={{
        backgroundColor: "var(--bg-card)",
        borderColor: "var(--bg-card-border)",
      }}
    >
      <Link href={`/blog/${post.slug}`} className="block">
        <PostImagePlaceholder category={post.category} />
        <div className="p-6">
          <div className="flex items-center gap-3 mb-3">
            <span
              className="text-xs font-medium uppercase tracking-wider"
              style={{
                color: "var(--accent)",
                fontFamily: "var(--font-body)",
              }}
            >
              {post.category}
            </span>
            <span
              className="text-xs"
              style={{
                color: "var(--text-muted)",
                fontFamily: "var(--font-body)",
              }}
            >
              {post.readTime}
            </span>
          </div>
          <h3
            className="font-bold text-lg mb-3 group-hover:text-[var(--accent)] transition-colors duration-200"
            style={{
              fontFamily: "var(--font-display)",
              color: "var(--text-primary)",
            }}
          >
            {post.title}
          </h3>
          <p
            className="text-sm leading-relaxed mb-4"
            style={{
              color: "var(--text-secondary)",
              fontFamily: "var(--font-body)",
              fontWeight: 300,
            }}
          >
            {post.excerpt}
          </p>
          <span
            className="text-sm font-medium transition-colors group-hover:brightness-110"
            style={{
              color: "var(--accent)",
              fontFamily: "var(--font-body)",
            }}
          >
            Read More &rarr;
          </span>
        </div>
      </Link>
    </motion.div>
  );
}

/* ── Featured post (hero card) ── */
function FeaturedPost({ post }: { post: BlogPost }) {
  return (
    <FadeUp>
      <Link href={`/blog/${post.slug}`} className="block group">
        <div
          className="rounded-2xl border overflow-hidden transition-colors hover:border-[rgba(197,165,90,0.3)]"
          style={{
            backgroundColor: "var(--bg-card)",
            borderColor: "var(--bg-card-border)",
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Image area */}
            <div
              className="h-64 md:h-full min-h-[280px] flex items-center justify-center"
              style={{ backgroundColor: "var(--primary-muted)" }}
            >
              <span className="text-6xl">{"\u2728"}</span>
            </div>

            {/* Content */}
            <div className="p-8 md:p-10 flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-4">
                <span
                  className="px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wider"
                  style={{
                    backgroundColor: "rgba(197,165,90,0.15)",
                    color: "var(--accent)",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  {post.category}
                </span>
                <span
                  className="text-xs"
                  style={{
                    color: "var(--text-muted)",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  Featured
                </span>
              </div>
              <h2
                className="font-bold text-2xl md:text-3xl mb-4 group-hover:text-[var(--accent)] transition-colors duration-200"
                style={{
                  fontFamily: "var(--font-display)",
                  color: "var(--text-primary)",
                  lineHeight: 1.2,
                }}
              >
                {post.title}
              </h2>
              <p
                className="text-base leading-relaxed mb-6"
                style={{
                  color: "var(--text-secondary)",
                  fontFamily: "var(--font-body)",
                  fontWeight: 300,
                }}
              >
                {post.excerpt}
              </p>
              <div className="flex items-center gap-4">
                <span
                  className="text-sm font-medium"
                  style={{
                    color: "var(--accent)",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  Read Article &rarr;
                </span>
                <span
                  className="text-xs"
                  style={{
                    color: "var(--text-muted)",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  {post.readTime}
                </span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </FadeUp>
  );
}

/* ── Newsletter CTA ── */
function NewsletterCTA() {
  return (
    <FadeUp>
      <div
        className="rounded-2xl border p-8 md:p-12 text-center"
        style={{
          backgroundColor: "var(--bg-card)",
          borderColor: "var(--bg-card-border)",
        }}
      >
        <span className="text-4xl block mb-4">{"\u{1F4E8}"}</span>
        <h3
          className="font-bold text-2xl mb-3"
          style={{
            fontFamily: "var(--font-display)",
            color: "var(--text-primary)",
          }}
        >
          Get Grounded Guidance in Your Inbox
        </h3>
        <p
          className="text-base max-w-lg mx-auto mb-8"
          style={{
            color: "var(--text-secondary)",
            fontFamily: "var(--font-body)",
            fontWeight: 300,
          }}
        >
          Short, honest reflections on awakening, healing, and finding your
          footing when everything shifts. No spam, no fluff. Just real talk from
          someone who has been there.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <input
            type="email"
            placeholder="Your email address"
            className="flex-1 px-4 py-3 rounded-[var(--button-radius)] text-sm border outline-none focus:border-[var(--accent)] transition-colors"
            style={{
              backgroundColor: "var(--bg-elevated)",
              borderColor: "var(--bg-card-border)",
              color: "var(--text-primary)",
              fontFamily: "var(--font-body)",
            }}
          />
          <button
            className="px-6 py-3 rounded-[var(--button-radius)] text-sm font-medium transition-colors duration-200 hover:brightness-110 cursor-pointer"
            style={{
              backgroundColor: "var(--accent)",
              color: "var(--primary)",
              fontFamily: "var(--font-body)",
            }}
          >
            Subscribe
          </button>
        </div>
        <p
          className="text-xs mt-4"
          style={{
            color: "var(--text-muted)",
            fontFamily: "var(--font-body)",
          }}
        >
          Unsubscribe anytime. Your inbox is sacred.
        </p>
      </div>
    </FadeUp>
  );
}

/* ══════════════════════════════════════════════════════
   MAIN BLOG CLIENT COMPONENT
   ══════════════════════════════════════════════════════ */
export default function BlogClient() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const featuredPost = blogPosts[0];
  const remainingPosts = blogPosts.slice(1);

  const filteredPosts = activeCategory
    ? remainingPosts.filter((post) => post.category === activeCategory)
    : remainingPosts;

  return (
    <main>
      {/* ════════════════════════════════════════════
          SECTION 1: Hero Header
      ════════════════════════════════════════════ */}
      <section
        className="relative overflow-hidden bg-[var(--bg-base)]"
        style={{ padding: "var(--section-padding-mobile) 0" }}
      >
        <div className="container-page relative z-10 text-center">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            className="text-sm font-medium tracking-widest uppercase mb-4"
            style={{
              color: "var(--accent)",
              fontFamily: "var(--font-body)",
            }}
          >
            Blog
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease }}
            className="hero-shimmer text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[1.08] tracking-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Guides for the Awakening Journey
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease }}
            className="mt-6 text-lg max-w-2xl mx-auto"
            style={{
              color: "var(--text-secondary)",
              fontFamily: "var(--font-body)",
              fontWeight: 300,
            }}
          >
            Grounded articles on spiritual awakening, energy healing, and
            navigating the path when everything shifts.
          </motion.p>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          SECTION 2: Featured Post
      ════════════════════════════════════════════ */}
      <section
        className="section-light"
        style={{ padding: "var(--section-padding-mobile) 0" }}
      >
        <div className="container-page">
          <FeaturedPost post={featuredPost} />
        </div>
      </section>

      {/* ════════════════════════════════════════════
          SECTION 3: Category Filter + Grid
      ════════════════════════════════════════════ */}
      <section
        className="section-dark"
        style={{ padding: "var(--section-padding-mobile) 0" }}
      >
        <div className="container-page">
          {/* Category filter tabs */}
          <FadeIn>
            <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
              <CategoryBadge
                category="All"
                active={activeCategory === null}
                onClick={() => setActiveCategory(null)}
              />
              {blogCategories.map((cat) => (
                <CategoryBadge
                  key={cat}
                  category={cat}
                  active={activeCategory === cat}
                  onClick={() =>
                    setActiveCategory(activeCategory === cat ? null : cat)
                  }
                />
              ))}
            </div>
          </FadeIn>

          {/* Posts grid */}
          <StaggerContainer
            key={activeCategory || "all"}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredPosts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </StaggerContainer>

          {/* Empty state */}
          {filteredPosts.length === 0 && (
            <FadeIn>
              <p
                className="text-center py-12 text-base"
                style={{
                  color: "var(--text-muted)",
                  fontFamily: "var(--font-body)",
                }}
              >
                No articles in this category yet. Check back soon.
              </p>
            </FadeIn>
          )}
        </div>
      </section>

      {/* ════════════════════════════════════════════
          SECTION 4: Newsletter CTA
      ════════════════════════════════════════════ */}
      <section
        className="section-light"
        style={{ padding: "var(--section-padding-mobile) 0" }}
      >
        <div className="container-page max-w-3xl mx-auto">
          <NewsletterCTA />
        </div>
      </section>
    </main>
  );
}
