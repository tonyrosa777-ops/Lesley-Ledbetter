"use client";

import { painPoints } from "@/data/site";
import FadeUp from "@/components/animations/FadeUp";
import StaggerContainer, { staggerItem } from "@/components/animations/StaggerContainer";
import { motion } from "framer-motion";

export default function PainPoints() {
  return (
    <section className="section-light" style={{ padding: "var(--section-padding-mobile) 0" }}>
      <div className="container-page">
        <FadeUp>
          <h2
            className="font-display font-bold text-center mb-4"
            style={{ color: "var(--text-primary)", fontSize: "clamp(1.75rem, 4vw, 2.5rem)" }}
          >
            Sound Familiar?
          </h2>
          <p
            className="text-center max-w-2xl mx-auto mb-12 text-base md:text-lg"
            style={{ color: "var(--text-secondary)" }}
          >
            If any of these resonate, you are not alone. And you are not losing your mind.
          </p>
        </FadeUp>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {painPoints.map((point, i) => (
            <motion.div
              key={i}
              variants={staggerItem}
              className="p-6 rounded-2xl border"
              style={{
                backgroundColor: "var(--bg-card)",
                borderColor: "var(--bg-card-border)",
              }}
            >
              <span className="text-3xl mb-3 block">{point.emoji}</span>
              <h3
                className="font-display font-bold text-lg mb-2"
                style={{ color: "var(--text-primary)" }}
              >
                {point.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                {point.description}
              </p>
            </motion.div>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
