"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import FadeUp from "@/components/animations/FadeUp";
import BookingCalendar from "@/components/BookingCalendar";
import type { SessionType } from "@/lib/calendly";

const ease = [0, 0, 0.2, 1] as const;

const SESSIONS: Record<
  SessionType,
  { label: string; duration: string; price: string; url: string; emoji: string; description: string }
> = {
  discovery: {
    label: "Free Discovery Call",
    duration: "15 min",
    price: "Free",
    emoji: "🕊️",
    description:
      "A short, no-pressure conversation to see if working together feels right. No pitch. Just a real talk.",
    url:
      process.env.NEXT_PUBLIC_CALENDLY_DISCOVERY_URL ||
      "https://calendly.com/lrledbetter50/15-min-free-discovery-call",
  },
  consult: {
    label: "60-Minute Spiritual Consult",
    duration: "60 min",
    price: "$100",
    emoji: "🔮",
    description:
      "A full session to explore what you are experiencing, identify opening abilities, and receive personalized guidance.",
    url:
      process.env.NEXT_PUBLIC_CALENDLY_CONSULT_URL ||
      "https://calendly.com/lrledbetter50/30min",
  },
};

export default function BookingClient() {
  const [selected, setSelected] = useState<SessionType>("discovery");
  const session = SESSIONS[selected];

  return (
    <main>
      {/* Hero */}
      <section
        className="relative overflow-hidden bg-[var(--bg-base)]"
        style={{ padding: "8rem 0 2rem" }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at 50% 30%, rgba(197,165,90,0.12) 0%, transparent 55%)",
          }}
        />
        <div className="container-page relative z-10 text-center max-w-3xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            className="text-xs font-body font-medium uppercase tracking-widest mb-4"
            style={{ color: "var(--accent)" }}
          >
            Book a Session
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease }}
            className="hero-shimmer font-display font-black leading-[1.08] tracking-tight"
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
          >
            Let&rsquo;s Find a Time to Talk
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease }}
            className="mt-6 text-base md:text-lg leading-relaxed"
            style={{ color: "var(--text-secondary)", fontWeight: 300 }}
          >
            Choose the session that fits where you are right now. The 15-minute
            discovery call is free, and it is always the right first step if
            you have never done this before.
          </motion.p>
        </div>
      </section>

      {/* Session selector + Calendly */}
      <section
        className="section-dark"
        style={{ padding: "2rem 0 var(--section-padding-mobile)" }}
      >
        <div className="container-page max-w-5xl mx-auto">
          <FadeUp>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
              {(Object.keys(SESSIONS) as SessionType[]).map((key) => {
                const s = SESSIONS[key];
                const active = selected === key;
                return (
                  <button
                    key={key}
                    onClick={() => setSelected(key)}
                    className="text-left p-6 rounded-2xl transition-all cursor-pointer"
                    style={{
                      backgroundColor: active
                        ? "rgba(197,165,90,0.08)"
                        : "var(--bg-card)",
                      border: active
                        ? "2px solid var(--accent)"
                        : "1px solid var(--bg-card-border)",
                    }}
                  >
                    <div className="flex items-start gap-4">
                      <span className="text-3xl flex-shrink-0">{s.emoji}</span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-baseline justify-between gap-3 mb-1 flex-wrap">
                          <h3
                            className="font-display font-bold text-lg"
                            style={{ color: "var(--text-primary)" }}
                          >
                            {s.label}
                          </h3>
                          <span
                            className="font-body font-bold text-lg"
                            style={{ color: "var(--accent)" }}
                          >
                            {s.price}
                          </span>
                        </div>
                        <p
                          className="text-xs font-body mb-2"
                          style={{ color: "var(--text-muted)" }}
                        >
                          {s.duration}
                        </p>
                        <p
                          className="text-sm leading-relaxed"
                          style={{
                            color: "var(--text-secondary)",
                            fontWeight: 300,
                          }}
                        >
                          {s.description}
                        </p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </FadeUp>

          <FadeUp delay={0.1}>
            <BookingCalendar
              key={selected}
              sessionType={selected}
              bookingUrl={session.url}
            />
          </FadeUp>
        </div>
      </section>
    </main>
  );
}
