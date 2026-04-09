"use client";

import Link from "next/link";
import FadeUp from "@/components/animations/FadeUp";

export default function FinalCTA() {
  return (
    <section
      style={{
        background: "linear-gradient(135deg, var(--burgundy) 0%, var(--primary) 100%)",
        padding: "var(--section-padding-desktop) 0",
      }}
    >
      <div className="container-page text-center max-w-3xl mx-auto">
        <FadeUp>
          <h2
            className="font-display font-bold mb-4"
            style={{ color: "var(--text-primary)", fontSize: "clamp(1.75rem, 4vw, 2.5rem)" }}
          >
            You Are Not Alone in This
          </h2>
          <p
            className="text-base md:text-lg leading-relaxed mb-10"
            style={{ color: "var(--text-secondary)" }}
          >
            Whatever you are experiencing right now, it is real. And there is someone
            who understands. Take the first step.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/booking"
              className="inline-flex items-center justify-center gap-2 font-body font-medium px-8 py-4 rounded-lg text-lg transition-all hover:brightness-110"
              style={{
                backgroundColor: "var(--accent)",
                color: "#0F0F0F",
              }}
            >
              Book a Free Discovery Call
            </Link>
            <Link
              href="/quiz"
              className="inline-flex items-center justify-center gap-2 font-body font-medium px-8 py-4 rounded-lg text-lg border transition-colors hover:bg-[rgba(197,165,90,0.1)]"
              style={{
                color: "var(--accent)",
                borderColor: "var(--accent)",
              }}
            >
              Take the Quiz
            </Link>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
