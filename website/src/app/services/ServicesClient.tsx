"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { services, faq } from "@/data/site";
import FadeUp from "@/components/animations/FadeUp";
import ScaleIn from "@/components/animations/ScaleIn";
import StaggerContainer, { staggerItem } from "@/components/animations/StaggerContainer";

const ease = [0, 0, 0.2, 1] as const;

/* ── Breathing orb behind hero ── */
function BreathingOrb() {
  return (
    <motion.div
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full pointer-events-none"
      style={{
        background:
          "radial-gradient(circle, rgba(197,165,90,0.12) 0%, rgba(197,165,90,0.04) 40%, transparent 70%)",
      }}
      animate={{
        scale: [1, 1.15, 1],
        opacity: [0.6, 1, 0.6],
      }}
      transition={{
        duration: 5,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}

/* ── Fallback data when content-writer hasn't filled site.ts yet ── */
const fallbackServices: typeof services = [
  {
    title: "Spiritual Guidance Session",
    slug: "spiritual-guidance",
    emoji: "\u{1F52E}",
    shortDescription: "One-on-one sessions to explore your spiritual path, gain clarity on life decisions, and connect with your higher purpose.",
    price: "$125",
    features: ["60-minute session", "Personalized guidance", "Follow-up notes"],
  },
  {
    title: "Animal Alchemy Technique",
    slug: "animal-alchemy",
    emoji: "\u{1F43E}",
    shortDescription: "Energy-based healing for your animal companions. Address behavioral issues, emotional distress, and deepen your bond.",
    price: "$95",
    features: ["45-minute session", "Remote or in-person", "Written summary"],
  },
  {
    title: "Frequency Healing",
    slug: "frequency-healing",
    emoji: "\u{1F3B6}",
    shortDescription: "Vibrational healing sessions that use targeted frequencies to restore balance, reduce stress, and promote deep wellness.",
    price: "$150",
    features: ["75-minute session", "Custom frequency plan", "Integration guide"],
  },
  {
    title: "Angelic Communication",
    slug: "angelic-communication",
    emoji: "\u{1F47C}",
    shortDescription: "Connect with angelic guidance to receive messages, direction, and comfort from the spiritual realm.",
    price: "$125",
    features: ["60-minute session", "Recorded messages", "Interpretation guide"],
  },
];

const fallbackFaq: typeof faq = [
  {
    question: "What can I expect during a session?",
    answer: "Each session is unique to you. We begin with a brief conversation about your intentions, then move into the modality best suited to your needs. You'll leave with clear takeaways and next steps.",
  },
  {
    question: "Do I need any experience with spiritual work?",
    answer: "Not at all. Many clients come to me with zero experience. I meet you exactly where you are — whether you're curious, skeptical, or already on your path.",
  },
  {
    question: "Are sessions available remotely?",
    answer: "Yes. All services are available both in-person (Texas) and remotely via video call. Energy work is equally effective at a distance.",
  },
  {
    question: "How do I know which service is right for me?",
    answer: "Take our quick quiz to get a personalized recommendation, or book a free discovery call and we'll figure it out together.",
  },
  {
    question: "What is your cancellation policy?",
    answer: "I ask for at least 24 hours' notice for cancellations or rescheduling. Life happens — I'm flexible when I can be.",
  },
];

/* ── FAQ Accordion Item ── */
function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="border-b"
      style={{ borderColor: "var(--bg-card-border)" }}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-5 text-left cursor-pointer"
        aria-expanded={isOpen}
      >
        <span
          className="font-medium text-base pr-4"
          style={{
            fontFamily: "var(--font-body)",
            color: "var(--text-primary)",
          }}
        >
          {question}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-xl shrink-0"
          style={{ color: "var(--accent)" }}
        >
          +
        </motion.span>
      </button>
      <motion.div
        initial={false}
        animate={{
          height: isOpen ? "auto" : 0,
          opacity: isOpen ? 1 : 0,
        }}
        transition={{ duration: 0.3, ease }}
        className="overflow-hidden"
      >
        <p
          className="pb-5 text-sm leading-relaxed"
          style={{
            color: "var(--text-secondary)",
            fontFamily: "var(--font-body)",
            fontWeight: 300,
          }}
        >
          {answer}
        </p>
      </motion.div>
    </div>
  );
}

export default function ServicesClient() {
  const displayServices = services.length > 0 ? services : fallbackServices;
  const displayFaq = faq.length > 0 ? faq : fallbackFaq;

  return (
    <main>
      {/* ════════════════════════════════════════════
          SECTION 1: Hero Header
      ════════════════════════════════════════════ */}
      <section
        className="relative overflow-hidden bg-[var(--bg-base)]"
        style={{ padding: "var(--section-padding-mobile) 0" }}
      >
        <BreathingOrb />

        <div className="container-page relative z-10 text-center">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            className="text-sm font-medium tracking-widest uppercase mb-4"
            style={{ color: "var(--accent)", fontFamily: "var(--font-body)" }}
          >
            Services
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease }}
            className="hero-shimmer text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[1.08] tracking-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Ways We Can Work Together
          </motion.h1>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          SECTION 2: Service Cards Grid
      ════════════════════════════════════════════ */}
      <section
        className="section-light"
        style={{ padding: "var(--section-padding-mobile) 0" }}
      >
        <div className="container-page">
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {displayServices.map((service, i) => (
              <motion.div
                key={i}
                variants={staggerItem}
                className="p-8 rounded-2xl border transition-colors hover:border-[rgba(197,165,90,0.3)] flex flex-col"
                style={{
                  backgroundColor: "var(--bg-card)",
                  borderColor: "var(--bg-card-border)",
                }}
              >
                <span className="text-4xl mb-4 block">{service.emoji}</span>
                <h3
                  className="font-bold text-xl mb-2"
                  style={{
                    fontFamily: "var(--font-display)",
                    color: "var(--text-primary)",
                  }}
                >
                  {service.title}
                </h3>
                <p
                  className="text-sm leading-relaxed mb-4 flex-1"
                  style={{
                    color: "var(--text-secondary)",
                    fontFamily: "var(--font-body)",
                    fontWeight: 300,
                  }}
                >
                  {service.shortDescription}
                </p>
                <p
                  className="font-medium text-lg mb-4"
                  style={{
                    color: "var(--accent)",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  {service.price}
                </p>
                <Link
                  href={`/services/${service.slug}`}
                  className="text-sm font-medium transition-colors hover:brightness-110"
                  style={{
                    color: "var(--accent)",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  Learn More &rarr;
                </Link>
              </motion.div>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          SECTION 3: "Not Sure?" CTA → Quiz
      ════════════════════════════════════════════ */}
      <section
        className="section-dark"
        style={{ padding: "var(--section-padding-mobile) 0" }}
      >
        <div className="container-page text-center">
          <ScaleIn>
            <span className="text-5xl block mb-4">{"\u{1F9ED}"}</span>
            <h2
              className="font-bold mb-4"
              style={{
                fontFamily: "var(--font-display)",
                color: "var(--text-primary)",
                fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
              }}
            >
              Not Sure Which Is Right for You?
            </h2>
            <p
              className="text-lg max-w-xl mx-auto mb-8"
              style={{
                color: "var(--text-secondary)",
                fontFamily: "var(--font-body)",
                fontWeight: 300,
              }}
            >
              Take our short quiz and get a personalized recommendation based on
              where you are in your journey.
            </p>
            <Link
              href="/quiz"
              className="inline-flex items-center justify-center px-8 py-4 text-base font-medium rounded-[var(--button-radius)] transition-colors duration-200"
              style={{
                backgroundColor: "var(--accent)",
                color: "var(--primary)",
                fontFamily: "var(--font-body)",
              }}
            >
              Take the Quiz
            </Link>
          </ScaleIn>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          SECTION 4: FAQ Accordion
      ════════════════════════════════════════════ */}
      <section
        className="section-light"
        style={{ padding: "var(--section-padding-mobile) 0" }}
      >
        <div className="container-page max-w-3xl mx-auto">
          <FadeUp>
            <p
              className="text-xs uppercase tracking-widest text-center mb-3"
              style={{ color: "var(--accent)", fontFamily: "var(--font-body)" }}
            >
              Common Questions
            </p>
            <h2
              className="font-bold text-center mb-10"
              style={{
                fontFamily: "var(--font-display)",
                color: "var(--text-primary)",
                fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
              }}
            >
              Frequently Asked Questions
            </h2>
          </FadeUp>

          <FadeUp delay={0.15}>
            <div>
              {displayFaq.map((item, i) => (
                <FAQItem
                  key={i}
                  question={item.question}
                  answer={item.answer}
                />
              ))}
            </div>
          </FadeUp>
        </div>
      </section>
    </main>
  );
}
