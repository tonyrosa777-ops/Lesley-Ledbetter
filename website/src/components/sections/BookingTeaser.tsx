"use client";

import Link from "next/link";
import FadeUp from "@/components/animations/FadeUp";

export default function BookingTeaser() {
  return (
    <section className="section-dark" style={{ padding: "var(--section-padding-mobile) 0" }}>
      <div className="container-page text-center max-w-3xl mx-auto">
        <FadeUp>
          <span className="text-5xl block mb-6">📅</span>
          <h2
            className="font-display font-bold mb-4"
            style={{ color: "var(--text-primary)", fontSize: "clamp(1.75rem, 4vw, 2.5rem)" }}
          >
            Ready to Talk?
          </h2>
          <p
            className="text-base md:text-lg leading-relaxed mb-8"
            style={{ color: "var(--text-secondary)" }}
          >
            Your first call is free. 15 minutes, no pressure, no pitch.
            Just a conversation to see if working together feels right.
          </p>
          <Link
            href="/booking"
            className="inline-flex items-center gap-2 font-body font-medium px-8 py-4 rounded-lg text-lg transition-all hover:brightness-110"
            style={{
              backgroundColor: "var(--accent)",
              color: "#0F0F0F",
            }}
          >
            Book a Free Discovery Call
          </Link>
        </FadeUp>
      </div>
    </section>
  );
}
