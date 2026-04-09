"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import type { BlogPost } from "@/data/blog";
import FadeUp from "@/components/animations/FadeUp";
import FadeIn from "@/components/animations/FadeIn";

const ease = [0, 0, 0.2, 1] as const;

/* ── Format date for display ── */
function formatDate(dateStr: string): string {
  const date = new Date(dateStr + "T00:00:00");
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/* ── Category badge colors ── */
function categoryColor(category: string): string {
  const colors: Record<string, string> = {
    Awakening: "rgba(197,165,90,0.15)",
    Healing: "rgba(120,180,120,0.15)",
    Guidance: "rgba(100,150,200,0.15)",
    Ancestors: "rgba(180,130,100,0.15)",
  };
  return colors[category] || "rgba(197,165,90,0.15)";
}

/* ── Author card (sidebar) ── */
function AuthorCard() {
  return (
    <div
      className="rounded-2xl border p-6"
      style={{
        backgroundColor: "var(--bg-card)",
        borderColor: "var(--bg-card-border)",
      }}
    >
      <div className="flex items-center gap-4 mb-4">
        <div
          className="w-14 h-14 rounded-full flex items-center justify-center text-2xl"
          style={{ backgroundColor: "var(--primary-muted)" }}
        >
          {"\u{1F9D1}\u200D\u{1F52C}"}
        </div>
        <div>
          <p
            className="font-bold text-base"
            style={{
              fontFamily: "var(--font-display)",
              color: "var(--text-primary)",
            }}
          >
            Leslie Ledbetter
          </p>
          <p
            className="text-xs"
            style={{
              color: "var(--text-muted)",
              fontFamily: "var(--font-body)",
            }}
          >
            Spiritual Consultant
          </p>
        </div>
      </div>
      <p
        className="text-sm leading-relaxed mb-4"
        style={{
          color: "var(--text-secondary)",
          fontFamily: "var(--font-body)",
          fontWeight: 300,
        }}
      >
        Vietnam veteran, former military intelligence professional, and
        certified spiritual guide with 6+ years of dedicated study. I help
        people make sense of awakening experiences they cannot explain through
        conventional frameworks.
      </p>
      <Link
        href="/about"
        className="text-sm font-medium transition-colors hover:brightness-110"
        style={{
          color: "var(--accent)",
          fontFamily: "var(--font-body)",
        }}
      >
        Learn More &rarr;
      </Link>
    </div>
  );
}

/* ── Table of contents placeholder (sidebar) ── */
function TableOfContents({ post }: { post: BlogPost }) {
  return (
    <div
      className="rounded-2xl border p-6"
      style={{
        backgroundColor: "var(--bg-card)",
        borderColor: "var(--bg-card-border)",
      }}
    >
      <h4
        className="font-bold text-sm uppercase tracking-wider mb-4"
        style={{
          fontFamily: "var(--font-body)",
          color: "var(--accent)",
        }}
      >
        In This Article
      </h4>
      <ul className="space-y-2">
        {post.content.slice(0, 5).map((paragraph, i) => {
          const preview =
            paragraph.length > 60
              ? paragraph.slice(0, 60).trim() + "..."
              : paragraph;
          return (
            <li key={i}>
              <span
                className="text-xs leading-relaxed block"
                style={{
                  color: "var(--text-muted)",
                  fontFamily: "var(--font-body)",
                }}
              >
                {preview}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/* ── Bottom CTA ── */
function BottomCTA() {
  return (
    <FadeUp>
      <div
        className="rounded-2xl border p-8 md:p-12 text-center"
        style={{
          backgroundColor: "var(--bg-card)",
          borderColor: "var(--bg-card-border)",
        }}
      >
        <span className="text-4xl block mb-4">{"\u{1F52E}"}</span>
        <h3
          className="font-bold text-2xl mb-3"
          style={{
            fontFamily: "var(--font-display)",
            color: "var(--text-primary)",
          }}
        >
          Ready to Talk About What You Are Experiencing?
        </h3>
        <p
          className="text-base max-w-lg mx-auto mb-8"
          style={{
            color: "var(--text-secondary)",
            fontFamily: "var(--font-body)",
            fontWeight: 300,
          }}
        >
          Book a free discovery call. No pressure, no pitch. Just a real
          conversation with someone who has been through it.
        </p>
        <Link
          href="/booking"
          className="inline-flex items-center justify-center px-8 py-4 text-base font-medium rounded-[var(--button-radius)] transition-colors duration-200 hover:brightness-110"
          style={{
            backgroundColor: "var(--accent)",
            color: "var(--primary)",
            fontFamily: "var(--font-body)",
          }}
        >
          Book a Free Discovery Call
        </Link>
      </div>
    </FadeUp>
  );
}

/* ══════════════════════════════════════════════════════
   MAIN BLOG POST CLIENT COMPONENT
   ══════════════════════════════════════════════════════ */
export default function BlogPostClient({ post }: { post: BlogPost }) {
  return (
    <main>
      {/* ════════════════════════════════════════════
          SECTION 1: Article Hero Header
      ════════════════════════════════════════════ */}
      <section
        className="relative overflow-hidden bg-[var(--bg-base)]"
        style={{ padding: "var(--section-padding-mobile) 0" }}
      >
        <div className="container-page relative z-10 max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <motion.nav
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, ease }}
            className="mb-8"
          >
            <ol
              className="flex items-center gap-2 text-xs"
              style={{
                fontFamily: "var(--font-body)",
                color: "var(--text-muted)",
              }}
            >
              <li>
                <Link
                  href="/blog"
                  className="hover:text-[var(--accent)] transition-colors"
                >
                  Blog
                </Link>
              </li>
              <li>/</li>
              <li style={{ color: "var(--text-secondary)" }}>
                {post.category}
              </li>
            </ol>
          </motion.nav>

          {/* Category + Meta */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            className="flex flex-wrap items-center gap-3 mb-6"
          >
            <span
              className="px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wider"
              style={{
                backgroundColor: categoryColor(post.category),
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
              {formatDate(post.publishedAt)}
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
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease }}
            className="text-3xl sm:text-4xl md:text-5xl font-black leading-[1.12] tracking-tight"
            style={{
              fontFamily: "var(--font-display)",
              color: "var(--text-primary)",
            }}
          >
            {post.title}
          </motion.h1>

          {/* Author line */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease }}
            className="flex items-center gap-3 mt-6"
          >
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center text-sm"
              style={{ backgroundColor: "var(--primary-muted)" }}
            >
              {"\u{1F9D1}\u200D\u{1F52C}"}
            </div>
            <div>
              <p
                className="text-sm font-medium"
                style={{
                  fontFamily: "var(--font-body)",
                  color: "var(--text-primary)",
                }}
              >
                Leslie Ledbetter
              </p>
              <p
                className="text-xs"
                style={{
                  fontFamily: "var(--font-body)",
                  color: "var(--text-muted)",
                }}
              >
                Spiritual Consultant
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          SECTION 2: Article Body + Sidebar
      ════════════════════════════════════════════ */}
      <section
        className="section-light"
        style={{ padding: "var(--section-padding-mobile) 0" }}
      >
        <div className="container-page">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-12 max-w-6xl mx-auto">
            {/* Article body */}
            <article>
              {post.content.map((paragraph, i) => (
                <FadeUp key={i} delay={i * 0.05}>
                  <p
                    className={`text-base leading-[1.85] ${i === 0 ? "text-lg font-medium" : ""}`}
                    style={{
                      color:
                        i === 0
                          ? "var(--text-primary)"
                          : "var(--text-secondary)",
                      fontFamily: "var(--font-body)",
                      fontWeight: i === 0 ? 400 : 300,
                      marginBottom: "1.75rem",
                    }}
                  >
                    {paragraph}
                  </p>
                </FadeUp>
              ))}
            </article>

            {/* Sidebar */}
            <aside className="space-y-6 lg:sticky lg:top-8 lg:self-start">
              <FadeIn delay={0.2}>
                <TableOfContents post={post} />
              </FadeIn>
              <FadeIn delay={0.3}>
                <AuthorCard />
              </FadeIn>
            </aside>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          SECTION 3: Bottom CTA → /booking
      ════════════════════════════════════════════ */}
      <section
        className="section-dark"
        style={{ padding: "var(--section-padding-mobile) 0" }}
      >
        <div className="container-page max-w-3xl mx-auto">
          <BottomCTA />
        </div>
      </section>

      {/* ════════════════════════════════════════════
          SECTION 4: Back to Blog
      ════════════════════════════════════════════ */}
      <section
        className="section-light"
        style={{ padding: "2rem 0" }}
      >
        <div className="container-page text-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-medium transition-colors hover:brightness-110"
            style={{
              color: "var(--accent)",
              fontFamily: "var(--font-body)",
            }}
          >
            &larr; Back to All Articles
          </Link>
        </div>
      </section>
    </main>
  );
}
