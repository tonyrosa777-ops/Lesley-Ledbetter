"use client";

import { stats } from "@/data/site";
import CountUp from "@/components/animations/CountUp";
import FadeUp from "@/components/animations/FadeUp";

export default function StatsRow() {
  return (
    <section className="section-dark" style={{ padding: "var(--section-padding-mobile) 0" }}>
      <div className="container-page">
        <FadeUp>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto text-center">
            {stats.map((stat, i) => (
              <div key={i}>
                <span className="text-3xl block mb-2">{stat.emoji}</span>
                <p
                  className="font-display font-bold text-3xl md:text-4xl mb-1"
                  style={{ color: "var(--accent)" }}
                >
                  <CountUp end={stat.value} suffix={stat.suffix} />
                </p>
                <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
