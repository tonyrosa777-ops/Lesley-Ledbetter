"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { faq } from "@/data/site";
import FadeUp from "@/components/animations/FadeUp";
import FadeIn from "@/components/animations/FadeIn";

const ease = [0, 0, 0.2, 1] as const;

function AccordionItem({
  question,
  answer,
  isOpen,
  onToggle,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      className="border-b"
      style={{ borderColor: "var(--bg-card-border)" }}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-5 md:py-6 text-left gap-4 cursor-pointer group"
      >
        <span
          className="font-display font-bold text-base md:text-lg leading-snug transition-colors duration-200"
          style={{
            color: isOpen ? "var(--accent)" : "var(--text-primary)",
          }}
        >
          {question}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.3, ease }}
          className="shrink-0 text-xl font-light select-none"
          style={{ color: "var(--accent)" }}
        >
          +
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease }}
            style={{ overflow: "hidden" }}
          >
            <p
              className="pb-6 text-sm md:text-base leading-relaxed max-w-3xl"
              style={{
                color: "var(--text-secondary)",
                fontFamily: "var(--font-body)",
                fontWeight: 300,
              }}
            >
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQClient() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <main>
      {/* Header */}
      <section
        className="bg-[var(--bg-base)]"
        style={{ padding: "var(--section-padding-mobile) 0" }}
      >
        <div className="container-page text-center">
          <FadeUp>
            <p
              className="font-body text-xs uppercase tracking-widest mb-3"
              style={{ color: "var(--accent)" }}
            >
              Get Answers
            </p>
            <h1
              className="hero-shimmer font-display font-black mb-4"
              style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
            >
              Frequently Asked Questions
            </h1>
            <p
              className="text-base md:text-lg leading-relaxed max-w-2xl mx-auto"
              style={{
                color: "var(--text-secondary)",
                fontFamily: "var(--font-body)",
                fontWeight: 300,
              }}
            >
              Everything you need to know about spiritual consulting, sessions,
              and how to get started.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section
        className="section-light"
        style={{ padding: "var(--section-padding-mobile) 0" }}
      >
        <div className="container-page max-w-3xl mx-auto">
          <FadeIn>
            <div>
              {faq.map((item, i) => (
                <AccordionItem
                  key={i}
                  question={item.question}
                  answer={item.answer}
                  isOpen={openIndex === i}
                  onToggle={() => handleToggle(i)}
                />
              ))}
            </div>
          </FadeIn>

          {faq.length === 0 && (
            <FadeIn>
              <p
                className="text-center py-12 text-base"
                style={{ color: "var(--text-muted)" }}
              >
                Questions coming soon. In the meantime, feel free to reach out
                directly.
              </p>
            </FadeIn>
          )}
        </div>
      </section>

      {/* Still have questions CTA */}
      <section
        style={{
          background:
            "linear-gradient(135deg, var(--burgundy) 0%, var(--primary) 100%)",
          padding: "var(--section-padding-mobile) 0",
        }}
      >
        <div className="container-page text-center max-w-2xl mx-auto">
          <FadeUp>
            <h2
              className="font-display font-bold mb-4"
              style={{
                color: "var(--text-primary)",
                fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
              }}
            >
              Still Have Questions?
            </h2>
            <p
              className="text-base md:text-lg leading-relaxed mb-8"
              style={{
                color: "var(--text-secondary)",
                fontFamily: "var(--font-body)",
                fontWeight: 300,
              }}
            >
              Every journey is unique. Reach out and let&apos;s talk about
              what&apos;s on your mind — no pressure, no obligation.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 font-body font-medium text-lg rounded-[var(--button-radius)] transition-all hover:brightness-110"
              style={{
                backgroundColor: "var(--accent)",
                color: "#0F0F0F",
              }}
            >
              Get in Touch
            </Link>
          </FadeUp>
        </div>
      </section>
    </main>
  );
}
