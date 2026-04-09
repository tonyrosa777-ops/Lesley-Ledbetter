"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { siteConfig, hero } from "@/data/site";
import HeroParticles from "@/components/animations/HeroParticles";
import InsightsCanvas from "@/components/animations/InsightsCanvas";

const ease = [0, 0, 0.2, 1] as const;

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease },
});

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[var(--bg-base)]">
      {/* Particle background — z-0, behind everything */}
      <HeroParticles />

      <div className="container-page relative z-10">
        <div className="flex flex-col md:flex-row items-start pt-24 md:pt-40 pb-16 md:pb-24 gap-10 md:gap-16">
          {/* ── Left column: Copy ── */}
          <div className="flex-1 flex flex-col gap-6 max-w-2xl">
            {/* Eyebrow */}
            {hero.eyebrow && (
              <motion.span
                {...fadeUp(0)}
                className="text-sm font-medium tracking-widest uppercase"
                style={{
                  color: "var(--accent)",
                  fontFamily: "var(--font-body)",
                }}
              >
                {hero.eyebrow}
              </motion.span>
            )}

            {/* H1 with shimmer */}
            <motion.h1
              {...fadeUp(0)}
              className="hero-shimmer text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[1.08] tracking-tight"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {siteConfig.tagline || "Collaborative Insights"}
            </motion.h1>

            {/* Subheadline */}
            {hero.subheadline && (
              <motion.p
                {...fadeUp(0.15)}
                className="text-lg sm:text-xl md:text-2xl leading-relaxed max-w-xl"
                style={{
                  color: "var(--text-secondary)",
                  fontFamily: "var(--font-body)",
                  fontWeight: 300,
                }}
              >
                {hero.subheadline}
              </motion.p>
            )}

            {/* CTAs */}
            <motion.div
              {...fadeUp(0.3)}
              className="flex flex-wrap gap-4 mt-2"
            >
              {/* Primary CTA — booking */}
              <Link
                href="/booking"
                className="inline-flex items-center justify-center px-7 py-3.5 text-base font-medium rounded-[var(--button-radius)] transition-colors duration-200"
                style={{
                  backgroundColor: "var(--accent)",
                  color: "var(--primary)",
                  fontFamily: "var(--font-body)",
                }}
              >
                {hero.ctaPrimary}
              </Link>

              {/* Secondary ghost CTA — quiz */}
              <Link
                href="/quiz"
                className="inline-flex items-center justify-center px-7 py-3.5 text-base font-medium rounded-[var(--button-radius)] border transition-colors duration-200"
                style={{
                  borderColor: "var(--accent)",
                  color: "var(--accent)",
                  fontFamily: "var(--font-body)",
                  backgroundColor: "transparent",
                }}
              >
                {hero.ctaSecondary}
              </Link>
            </motion.div>

            {/* Trust micro-copy */}
            {hero.trustMicrocopy && (
              <motion.p
                {...fadeUp(0.45)}
                className="text-sm mt-2"
                style={{
                  color: "var(--text-muted)",
                  fontFamily: "var(--font-body)",
                }}
              >
                {hero.trustMicrocopy}
              </motion.p>
            )}
          </div>

          {/* ── Right column: InsightsCanvas ── */}
          <div className="flex-1 w-full md:w-auto">
            <InsightsCanvas />
          </div>
        </div>
      </div>
    </section>
  );
}
