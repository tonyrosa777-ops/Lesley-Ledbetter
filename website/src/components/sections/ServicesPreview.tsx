"use client";

import Link from "next/link";
import { services } from "@/data/site";
import FadeUp from "@/components/animations/FadeUp";
import StaggerContainer, { staggerItem } from "@/components/animations/StaggerContainer";
import { motion } from "framer-motion";

export default function ServicesPreview() {
  const displayServices = services.slice(0, 3);

  return (
    <section className="section-light" style={{ padding: "var(--section-padding-mobile) 0" }}>
      <div className="container-page">
        <FadeUp>
          <p
            className="font-body text-xs uppercase tracking-widest text-center mb-3"
            style={{ color: "var(--accent)" }}
          >
            How We Work Together
          </p>
          <h2
            className="font-display font-bold text-center mb-12"
            style={{ color: "var(--text-primary)", fontSize: "clamp(1.75rem, 4vw, 2.5rem)" }}
          >
            Find the Right Path for You
          </h2>
        </FadeUp>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {displayServices.map((service, i) => (
            <motion.div
              key={i}
              variants={staggerItem}
              className="p-8 rounded-2xl border transition-colors hover:border-[rgba(197,165,90,0.3)]"
              style={{
                backgroundColor: "var(--bg-card)",
                borderColor: "var(--bg-card-border)",
              }}
            >
              <span className="text-4xl mb-4 block">{service.emoji}</span>
              <h3
                className="font-display font-bold text-xl mb-2"
                style={{ color: "var(--text-primary)" }}
              >
                {service.title}
              </h3>
              <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--text-secondary)" }}>
                {service.shortDescription}
              </p>
              <p className="font-body font-medium text-lg mb-4" style={{ color: "var(--accent)" }}>
                {service.price}
              </p>
              <Link
                href={`/services/${service.slug}`}
                className="text-sm font-body font-medium transition-colors hover:brightness-110"
                style={{ color: "var(--accent)" }}
              >
                Learn More &rarr;
              </Link>
            </motion.div>
          ))}
        </StaggerContainer>

        <FadeUp delay={0.3}>
          <div className="text-center mt-10">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-sm font-body font-medium transition-colors hover:brightness-110"
              style={{ color: "var(--accent)" }}
            >
              View All Services &rarr;
            </Link>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
