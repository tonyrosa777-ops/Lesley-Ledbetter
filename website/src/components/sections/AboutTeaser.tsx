"use client";

import Link from "next/link";
import { about, siteConfig } from "@/data/site";
import FadeUp from "@/components/animations/FadeUp";
import SlideIn from "@/components/animations/SlideIn";

export default function AboutTeaser() {
  return (
    <section className="section-dark" style={{ padding: "var(--section-padding-mobile) 0" }}>
      <div className="container-page">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
          {/* Photo */}
          <SlideIn direction="left">
            <div
              className="aspect-[3/4] rounded-2xl overflow-hidden"
              style={{ backgroundColor: "var(--primary-muted)" }}
            >
              <img
                src={about.photo}
                alt={`Lesley Ledbetter — ${siteConfig.name}`}
                className="w-full h-full object-cover"
              />
            </div>
          </SlideIn>

          {/* Text */}
          <SlideIn direction="right">
            <p
              className="font-body text-xs uppercase tracking-widest mb-3"
              style={{ color: "var(--accent)" }}
            >
              Meet Your Guide
            </p>
            <h2
              className="font-display font-bold mb-6"
              style={{ color: "var(--text-primary)", fontSize: "clamp(1.75rem, 4vw, 2.5rem)" }}
            >
              {about.headline || "From Military Intelligence to Spiritual Intelligence"}
            </h2>
            <p
              className="text-base leading-relaxed mb-6"
              style={{ color: "var(--text-secondary)" }}
            >
              {about.story ||
                "Vietnam veteran. 8.5 years in military intelligence. 30 years fixing what was broken in people's homes. Then life broke something in me that no wrench could fix. My wife was dying, and I couldn't save her. But in searching for a way to help her, I found something that changed everything."}
            </p>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-sm font-body font-medium transition-colors hover:brightness-110"
              style={{ color: "var(--accent)" }}
            >
              Read the Full Story
              <span aria-hidden="true">&rarr;</span>
            </Link>
          </SlideIn>
        </div>
      </div>
    </section>
  );
}
