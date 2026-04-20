"use client";

import Link from "next/link";
import FadeUp from "@/components/animations/FadeUp";
import StaggerContainer, { staggerItem } from "@/components/animations/StaggerContainer";
import { motion } from "framer-motion";

// Placeholder blog posts for demo — replaced by Sanity CMS data in production
const demoPosts = [
  {
    title: "Am I Having a Spiritual Awakening or Going Crazy?",
    excerpt: "The symptoms feel identical. Here is how to tell the difference.",
    slug: "spiritual-awakening-or-going-crazy",
    category: "Awakening",
  },
  {
    title: "What Actually Happens in a Spiritual Consultation",
    excerpt: "A step by step walkthrough so you know exactly what to expect.",
    slug: "what-happens-spiritual-consultation",
    category: "Sessions",
  },
  {
    title: "7 Signs Your Spiritual Abilities Are Opening Up",
    excerpt: "These experiences are more common than you think. And they mean something.",
    slug: "signs-spiritual-abilities-opening",
    category: "Awakening",
  },
]; // [DEMO COPY — pending client review]

export default function BlogPreview() {
  return (
    <section className="section-light" style={{ padding: "var(--section-padding-mobile) 0" }}>
      <div className="container-page">
        <FadeUp>
          <p
            className="font-body text-xs uppercase tracking-widest text-center mb-3"
            style={{ color: "var(--accent)" }}
          >
            From the Blog
          </p>
          <h2
            className="font-display font-bold text-center mb-12"
            style={{ color: "var(--text-primary)", fontSize: "clamp(1.75rem, 4vw, 2.5rem)" }}
          >
            Guides for the Awakening Journey
          </h2>
        </FadeUp>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {demoPosts.map((post, i) => (
            <motion.div key={i} variants={staggerItem}>
              <Link
                href={`/blog/${post.slug}`}
                className="group block rounded-2xl border overflow-hidden transition-colors hover:border-[rgba(197,165,90,0.3)] h-full"
                style={{
                  backgroundColor: "var(--bg-card)",
                  borderColor: "var(--bg-card-border)",
                }}
              >
                <div
                  className="h-48 overflow-hidden"
                  style={{ backgroundColor: "var(--primary-muted)" }}
                >
                  <img
                    src={`/images/blog/${post.slug}.jpg`}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <span
                    className="text-xs font-body font-medium uppercase tracking-wider"
                    style={{ color: "var(--accent)" }}
                  >
                    {post.category}
                  </span>
                  <h3
                    className="font-display font-bold text-lg mt-2 mb-3"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {post.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                    {post.excerpt}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </StaggerContainer>

        <FadeUp delay={0.3}>
          <div className="text-center mt-10">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm font-body font-medium transition-colors hover:brightness-110"
              style={{ color: "var(--accent)" }}
            >
              Read All Articles &rarr;
            </Link>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
