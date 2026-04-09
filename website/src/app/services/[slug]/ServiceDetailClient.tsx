"use client";

import Link from "next/link";
import { testimonials, faq } from "@/data/site";
import FadeUp from "@/components/animations/FadeUp";
import StaggerContainer, { staggerItem } from "@/components/animations/StaggerContainer";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface Service {
  title: string;
  slug: string;
  emoji: string;
  shortDescription: string;
  price: string;
  features: string[];
}

export default function ServiceDetailClient({ service }: { service: Service }) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const relatedTestimonials = testimonials
    .filter((t) => t.service.toLowerCase().includes(service.title.toLowerCase().split(" ")[0]) || t.featured)
    .slice(0, 3);
  const relatedFaq = faq.slice(0, 5);

  return (
    <main>
      {/* Hero */}
      <section
        className="section-dark"
        style={{ padding: "8rem 0 var(--section-padding-mobile)" }}
      >
        <div className="container-page max-w-4xl">
          <FadeUp>
            <Link
              href="/services"
              className="text-sm font-body mb-6 inline-block transition-colors hover:text-[var(--text-primary)]"
              style={{ color: "var(--text-muted)" }}
            >
              &larr; All Services
            </Link>
            <span className="text-5xl block mb-4">{service.emoji}</span>
            <h1
              className="hero-shimmer font-display font-bold mb-4"
              style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
            >
              {service.title}
            </h1>
            <p
              className="text-lg leading-relaxed max-w-2xl mb-4"
              style={{ color: "var(--text-secondary)" }}
            >
              {service.shortDescription}
            </p>
            <p className="font-display font-bold text-2xl" style={{ color: "var(--accent)" }}>
              {service.price}
            </p>
          </FadeUp>
        </div>
      </section>

      {/* What You Get */}
      <section className="section-light" style={{ padding: "var(--section-padding-mobile) 0" }}>
        <div className="container-page max-w-4xl">
          <FadeUp>
            <h2
              className="font-display font-bold text-2xl mb-8"
              style={{ color: "var(--text-primary)" }}
            >
              What You Get
            </h2>
          </FadeUp>
          <StaggerContainer className="space-y-4">
            {service.features.map((feature, i) => (
              <motion.div
                key={i}
                variants={staggerItem}
                className="flex items-start gap-3 p-4 rounded-xl border"
                style={{
                  backgroundColor: "var(--bg-card)",
                  borderColor: "var(--bg-card-border)",
                }}
              >
                <span className="text-lg" style={{ color: "var(--accent)" }}>
                  ✓
                </span>
                <p style={{ color: "var(--text-primary)" }}>{feature}</p>
              </motion.div>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Testimonials */}
      {relatedTestimonials.length > 0 && (
        <section className="section-dark" style={{ padding: "var(--section-padding-mobile) 0" }}>
          <div className="container-page max-w-4xl">
            <FadeUp>
              <h2
                className="font-display font-bold text-2xl mb-8"
                style={{ color: "var(--text-primary)" }}
              >
                What People Are Saying
              </h2>
            </FadeUp>
            <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedTestimonials.map((t, i) => (
                <motion.div
                  key={i}
                  variants={staggerItem}
                  className="p-6 rounded-2xl border"
                  style={{
                    backgroundColor: "var(--bg-card)",
                    borderColor: "var(--bg-card-border)",
                  }}
                >
                  <p
                    className="text-sm leading-relaxed italic mb-4"
                    style={{ color: "var(--text-primary)" }}
                  >
                    &ldquo;{t.text}&rdquo;
                  </p>
                  <p className="text-xs font-medium" style={{ color: "var(--text-secondary)" }}>
                    {t.name}, {t.location}
                  </p>
                </motion.div>
              ))}
            </StaggerContainer>
          </div>
        </section>
      )}

      {/* FAQ */}
      <section className="section-light" style={{ padding: "var(--section-padding-mobile) 0" }}>
        <div className="container-page max-w-4xl">
          <FadeUp>
            <h2
              className="font-display font-bold text-2xl mb-8"
              style={{ color: "var(--text-primary)" }}
            >
              Common Questions
            </h2>
          </FadeUp>
          <div className="space-y-3">
            {relatedFaq.map((item, i) => (
              <div
                key={i}
                className="rounded-xl border overflow-hidden"
                style={{
                  backgroundColor: "var(--bg-card)",
                  borderColor: "var(--bg-card-border)",
                }}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full text-left p-5 flex justify-between items-center"
                >
                  <span
                    className="font-body font-medium pr-4"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {item.question}
                  </span>
                  <span
                    className="text-xl transition-transform flex-shrink-0"
                    style={{
                      color: "var(--accent)",
                      transform: openFaq === i ? "rotate(45deg)" : "none",
                    }}
                  >
                    +
                  </span>
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0, 0, 0.2, 1] as const }}
                    >
                      <p
                        className="px-5 pb-5 text-sm leading-relaxed"
                        style={{ color: "var(--text-secondary)" }}
                      >
                        {item.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        style={{
          background: "linear-gradient(135deg, var(--burgundy) 0%, var(--primary) 100%)",
          padding: "var(--section-padding-desktop) 0",
        }}
      >
        <div className="container-page text-center max-w-3xl mx-auto">
          <FadeUp>
            <h2
              className="font-display font-bold text-2xl mb-4"
              style={{ color: "var(--text-primary)" }}
            >
              Ready to Begin?
            </h2>
            <p className="text-base mb-8" style={{ color: "var(--text-secondary)" }}>
              Your first call is free. No pressure, no pitch. Just a conversation.
            </p>
            <Link
              href="/booking"
              className="inline-flex items-center gap-2 font-body font-medium px-8 py-4 rounded-lg text-lg transition-all hover:brightness-110"
              style={{ backgroundColor: "var(--accent)", color: "#0F0F0F" }}
            >
              Book a Free Discovery Call
            </Link>
          </FadeUp>
        </div>
      </section>
    </main>
  );
}
