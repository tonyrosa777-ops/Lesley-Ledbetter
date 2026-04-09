"use client";

import Link from "next/link";
import { testimonials } from "@/data/site";
import FadeUp from "@/components/animations/FadeUp";
import StaggerContainer, { staggerItem } from "@/components/animations/StaggerContainer";
import { motion } from "framer-motion";

export default function Testimonials() {
  const featured = testimonials.filter((t) => t.featured).slice(0, 4);

  return (
    <section className="section-light" style={{ padding: "var(--section-padding-mobile) 0" }}>
      <div className="container-page">
        <FadeUp>
          <p
            className="font-body text-xs uppercase tracking-widest text-center mb-3"
            style={{ color: "var(--accent)" }}
          >
            What People Are Saying
          </p>
          <h2
            className="font-display font-bold text-center mb-12"
            style={{ color: "var(--text-primary)", fontSize: "clamp(1.75rem, 4vw, 2.5rem)" }}
          >
            Real Experiences, Real Transformations
          </h2>
        </FadeUp>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {featured.map((testimonial, i) => (
            <motion.div
              key={i}
              variants={staggerItem}
              className="p-8 rounded-2xl border"
              style={{
                backgroundColor: "var(--bg-card)",
                borderColor: "var(--bg-card-border)",
              }}
            >
              <p
                className="text-base leading-relaxed mb-6 italic"
                style={{ color: "var(--text-primary)" }}
              >
                &ldquo;{testimonial.text}&rdquo;
              </p>
              <div>
                <p className="font-body font-medium text-sm" style={{ color: "var(--text-primary)" }}>
                  {testimonial.name}
                </p>
                <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                  {testimonial.location} &middot; {testimonial.service}
                </p>
              </div>
            </motion.div>
          ))}
        </StaggerContainer>

        <FadeUp delay={0.3}>
          <div className="text-center mt-10">
            <Link
              href="/testimonials"
              className="inline-flex items-center gap-2 text-sm font-body font-medium transition-colors hover:brightness-110"
              style={{ color: "var(--accent)" }}
            >
              See All Testimonials &rarr;
            </Link>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
