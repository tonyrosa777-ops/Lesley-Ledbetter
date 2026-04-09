"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { about, stats, siteConfig } from "@/data/site";
import FadeUp from "@/components/animations/FadeUp";
import FadeIn from "@/components/animations/FadeIn";
import SlideIn from "@/components/animations/SlideIn";
import ScaleIn from "@/components/animations/ScaleIn";
import StaggerContainer, { staggerItem } from "@/components/animations/StaggerContainer";
import CountUp from "@/components/animations/CountUp";

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

/* ── Credential card ── */
const credentials = [
  {
    emoji: "\u{1F52E}",
    title: "Animal Alchemy Technique (AAT)",
    description: "Certified practitioner in energy-based healing for animals and their companions.",
  },
  {
    emoji: "\u{1F47C}",
    title: "Angels & Enlightenment",
    description: "Advanced studies in angelic communication and spiritual enlightenment frameworks.",
  },
  {
    emoji: "\u{1F3B6}",
    title: "The Frequencies Courses",
    description: "Trained in vibrational healing and frequency-based wellness modalities.",
  },
  {
    emoji: "\u{1F396}\uFE0F",
    title: "Vietnam Veteran",
    description: "Served with honor in the United States military during the Vietnam era.",
  },
];

export default function AboutClient() {
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
            About
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease }}
            className="hero-shimmer text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[1.08] tracking-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {about.headline || "Meet Your Guide"}
          </motion.h1>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          SECTION 2: Origin Story
      ════════════════════════════════════════════ */}
      <section
        className="section-light"
        style={{ padding: "var(--section-padding-mobile) 0" }}
      >
        <div className="container-page">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
            {/* Text column */}
            <SlideIn direction="left">
              <div>
                <p
                  className="text-xs uppercase tracking-widest mb-3"
                  style={{
                    color: "var(--accent)",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  The Journey
                </p>
                <h2
                  className="font-bold text-2xl sm:text-3xl md:text-4xl mb-6"
                  style={{
                    fontFamily: "var(--font-display)",
                    color: "var(--text-primary)",
                  }}
                >
                  From Service to Spiritual Calling
                </h2>
                <div
                  className="space-y-4 text-base leading-relaxed"
                  style={{
                    color: "var(--text-secondary)",
                    fontFamily: "var(--font-body)",
                    fontWeight: 300,
                  }}
                >
                  {about.story ? (
                    about.story.split("\n\n").map((paragraph, i) => (
                      <p key={i}>{paragraph}</p>
                    ))
                  ) : (
                    <>
                      <p>
                        Leslie Ledbetter&apos;s path to spiritual consulting began in the
                        jungles of Vietnam, where service to country forged a resilience
                        that would later serve a far different purpose.
                      </p>
                      <p>
                        After decades in the HVAC industry, life delivered its hardest
                        lesson when his wife fell gravely ill. That season of loss and
                        uncertainty cracked open a door to healing modalities he never
                        knew existed.
                      </p>
                      <p>
                        What started as a desperate search for answers became a six-year
                        deep dive into spiritual study — from animal alchemy and angelic
                        communication to frequency-based healing. Today, Leslie channels
                        that journey into Collaborative Insights, helping others find the
                        clarity and peace that transformed his own life.
                      </p>
                    </>
                  )}
                </div>
              </div>
            </SlideIn>

            {/* Photo placeholder column */}
            <SlideIn direction="right" delay={0.2}>
              <div
                className="aspect-[3/4] rounded-2xl border flex items-center justify-center"
                style={{
                  backgroundColor: "var(--bg-card)",
                  borderColor: "var(--bg-card-border)",
                }}
              >
                {about.photo && about.photo !== "/images/leslie-headshot.jpg" ? (
                  <img
                    src={about.photo}
                    alt={`Leslie Ledbetter — ${siteConfig.name}`}
                    className="w-full h-full object-cover rounded-2xl"
                  />
                ) : (
                  <div className="text-center px-8">
                    <span className="text-5xl block mb-4">{"\u{1F4F7}"}</span>
                    <p
                      className="text-sm"
                      style={{
                        color: "var(--text-muted)",
                        fontFamily: "var(--font-body)",
                      }}
                    >
                      Photo coming soon
                    </p>
                  </div>
                )}
              </div>
            </SlideIn>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          SECTION 3: Credentials Grid
      ════════════════════════════════════════════ */}
      <section
        className="section-dark"
        style={{ padding: "var(--section-padding-mobile) 0" }}
      >
        <div className="container-page">
          <FadeUp>
            <p
              className="text-xs uppercase tracking-widest text-center mb-3"
              style={{ color: "var(--accent)", fontFamily: "var(--font-body)" }}
            >
              Training &amp; Background
            </p>
            <h2
              className="font-bold text-center mb-12"
              style={{
                fontFamily: "var(--font-display)",
                color: "var(--text-primary)",
                fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
              }}
            >
              Credentials &amp; Experience
            </h2>
          </FadeUp>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {credentials.map((cred, i) => (
              <motion.div
                key={i}
                variants={staggerItem}
                className="p-6 rounded-2xl border text-center"
                style={{
                  backgroundColor: "var(--bg-card)",
                  borderColor: "var(--bg-card-border)",
                }}
              >
                <span className="text-4xl block mb-3">{cred.emoji}</span>
                <h3
                  className="font-bold text-lg mb-2"
                  style={{
                    fontFamily: "var(--font-display)",
                    color: "var(--text-primary)",
                  }}
                >
                  {cred.title}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{
                    color: "var(--text-secondary)",
                    fontFamily: "var(--font-body)",
                    fontWeight: 300,
                  }}
                >
                  {cred.description}
                </p>
              </motion.div>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          SECTION 4: Beliefs & Values
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
              Guiding Principles
            </p>
            <h2
              className="font-bold text-center mb-10"
              style={{
                fontFamily: "var(--font-display)",
                color: "var(--text-primary)",
                fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
              }}
            >
              What I Believe
            </h2>
          </FadeUp>

          <StaggerContainer className="space-y-4">
            {(about.beliefs.length > 0
              ? about.beliefs
              : [
                  { emoji: "\u{1F331}", text: "Everyone has the capacity to heal, given the right guidance and support." },
                  { emoji: "\u{1F54A}\uFE0F", text: "Spiritual growth is not a destination but a continuous, collaborative journey." },
                  { emoji: "\u{1F91D}", text: "True transformation happens when we stop going it alone and invite insight in." },
                  { emoji: "\u{2728}", text: "The unseen world holds answers that the logical mind cannot always reach." },
                  { emoji: "\u{1F9ED}", text: "Service to others is the highest expression of purpose — forged in Vietnam, fulfilled here." },
                ]
            ).map((belief, i) => (
              <motion.div
                key={i}
                variants={staggerItem}
                className="flex items-start gap-4 p-5 rounded-xl border"
                style={{
                  backgroundColor: "var(--bg-card)",
                  borderColor: "var(--bg-card-border)",
                }}
              >
                <span className="text-2xl shrink-0">{belief.emoji}</span>
                <p
                  className="text-base leading-relaxed"
                  style={{
                    color: "var(--text-secondary)",
                    fontFamily: "var(--font-body)",
                    fontWeight: 300,
                  }}
                >
                  {belief.text}
                </p>
              </motion.div>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          SECTION 5: Stats Row
      ════════════════════════════════════════════ */}
      <section
        className="section-dark"
        style={{ padding: "var(--section-padding-mobile) 0" }}
      >
        <div className="container-page">
          <FadeUp>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto text-center">
              {(stats.length > 0
                ? stats
                : [
                    { emoji: "\u{1F4DA}", value: 6, suffix: "+", label: "Years of Spiritual Study" },
                    { emoji: "\u{1F393}", value: 18, suffix: "+", label: "Courses Completed" },
                    { emoji: "\u{1F396}\uFE0F", value: 4, suffix: "", label: "Years of Military Service" },
                    { emoji: "\u{1F496}", value: 100, suffix: "+", label: "Lives Touched" },
                  ]
              ).map((stat, i) => (
                <div key={i}>
                  <span className="text-3xl block mb-2">{stat.emoji}</span>
                  <p
                    className="font-bold text-3xl md:text-4xl mb-1"
                    style={{
                      fontFamily: "var(--font-display)",
                      color: "var(--accent)",
                    }}
                  >
                    <CountUp end={stat.value} suffix={stat.suffix} />
                  </p>
                  <p
                    className="text-sm"
                    style={{
                      color: "var(--text-secondary)",
                      fontFamily: "var(--font-body)",
                    }}
                  >
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          SECTION 6: CTA
      ════════════════════════════════════════════ */}
      <section
        className="relative overflow-hidden"
        style={{
          padding: "var(--section-padding-mobile) 0",
          background: "var(--burgundy)",
        }}
      >
        <div className="container-page relative z-10 text-center">
          <ScaleIn>
            <h2
              className="font-bold mb-4"
              style={{
                fontFamily: "var(--font-display)",
                color: "var(--text-primary)",
                fontSize: "clamp(2rem, 5vw, 3rem)",
              }}
            >
              Ready to Begin?
            </h2>
            <p
              className="text-lg max-w-xl mx-auto mb-8"
              style={{
                color: "var(--text-secondary)",
                fontFamily: "var(--font-body)",
                fontWeight: 300,
              }}
            >
              Take the first step toward clarity and healing. Book a free
              discovery call and let&apos;s explore what&apos;s possible together.
            </p>
            <Link
              href="/booking"
              className="inline-flex items-center justify-center px-8 py-4 text-base font-medium rounded-[var(--button-radius)] transition-colors duration-200"
              style={{
                backgroundColor: "var(--accent)",
                color: "var(--primary)",
                fontFamily: "var(--font-body)",
              }}
            >
              Book a Free Discovery Call
            </Link>
          </ScaleIn>
        </div>
      </section>
    </main>
  );
}
