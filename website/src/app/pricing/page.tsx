"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import FadeUp from "@/components/animations/FadeUp";
import StaggerContainer, {
  staggerItem,
} from "@/components/animations/StaggerContainer";

const EASE = [0, 0, 0.2, 1] as const;

/* ═══════════════════════════════════════════════════════
   TIER DATA
   ═══════════════════════════════════════════════════════ */

type Tier = {
  name: string;
  price: number;
  deposit: number;
  badge: string | null;
  features: string[];
};

const TIERS: Tier[] = [
  {
    name: "Starter",
    price: 1500,
    deposit: 750,
    badge: null,
    features: [
      "Custom animated hero section",
      "About page with your story",
      "Services pages with pricing",
      "Contact form with email delivery",
      "Mobile responsive design",
      "SEO foundation (meta, schema, sitemap)",
    ],
  },
  {
    name: "Pro",
    price: 3000,
    deposit: 1500,
    badge: "Most Popular",
    features: [
      "Everything in Starter",
      "Blog with 10 SEO articles",
      "Interactive spiritual quiz",
      "Branded booking calendar",
      "Testimonials page",
      "FAQ page",
    ],
  },
  {
    name: "Premium",
    price: 5500,
    deposit: 2750,
    badge: null,
    features: [
      "Everything in Pro",
      "Merch shop with Printful integration",
      "Stripe payment processing",
      "Email automation setup",
    ],
  },
];

/* ═══════════════════════════════════════════════════════
   COMPARISON CHART DATA
   ═══════════════════════════════════════════════════════ */

type FeatureRow = {
  name: string;
  starter: boolean;
  pro: boolean;
  premium: boolean;
};

type FeatureCategory = {
  category: string;
  features: FeatureRow[];
};

const COMPARISON: FeatureCategory[] = [
  {
    category: "Foundation",
    features: [
      { name: "Custom animated hero", starter: true, pro: true, premium: true },
      { name: "About page", starter: true, pro: true, premium: true },
      { name: "Services pages", starter: true, pro: true, premium: true },
      { name: "Contact form", starter: true, pro: true, premium: true },
      { name: "Mobile responsive", starter: true, pro: true, premium: true },
      {
        name: "SEO foundation (meta, schema, sitemap)",
        starter: true,
        pro: true,
        premium: true,
      },
    ],
  },
  {
    category: "Conversion",
    features: [
      { name: "Interactive spiritual quiz", starter: false, pro: true, premium: true },
      {
        name: "Branded booking calendar",
        starter: false,
        pro: true,
        premium: true,
      },
      { name: "Testimonials page", starter: false, pro: true, premium: true },
      { name: "FAQ page", starter: false, pro: true, premium: true },
    ],
  },
  {
    category: "Content & SEO",
    features: [
      {
        name: "Blog with 10 SEO articles",
        starter: false,
        pro: true,
        premium: true,
      },
      {
        name: "Email automation setup",
        starter: false,
        pro: false,
        premium: true,
      },
    ],
  },
  {
    category: "Commerce",
    features: [
      {
        name: "Merch shop (Printful)",
        starter: false,
        pro: false,
        premium: true,
      },
      {
        name: "Stripe payment processing",
        starter: false,
        pro: false,
        premium: true,
      },
    ],
  },
  {
    category: "Support",
    features: [
      { name: "Launch support", starter: true, pro: true, premium: true },
      {
        name: "Content strategy session",
        starter: false,
        pro: true,
        premium: true,
      },
      {
        name: "Priority support",
        starter: false,
        pro: false,
        premium: true,
      },
    ],
  },
];

/* ═══════════════════════════════════════════════════════
   COMPONENT
   ═══════════════════════════════════════════════════════ */

export default function PricingPage() {
  // ROI Calculator state
  const [sessionValue, setSessionValue] = useState(100);
  const [clientsPerMonth, setClientsPerMonth] = useState(3);
  const [selectedTierIdx, setSelectedTierIdx] = useState(1); // Pro default

  const roi = useMemo(() => {
    const tier = TIERS[selectedTierIdx];
    const monthlyRevenue = sessionValue * clientsPerMonth;
    const annualRevenue = monthlyRevenue * 12;
    const breakEvenMonths =
      monthlyRevenue > 0 ? Math.ceil(tier.price / monthlyRevenue) : 0;
    const roi12 =
      tier.price > 0
        ? Math.round(((annualRevenue - tier.price) / tier.price) * 100)
        : 0;

    return {
      monthlyRevenue,
      annualRevenue,
      breakEvenMonths,
      roi12,
    };
  }, [sessionValue, clientsPerMonth, selectedTierIdx]);

  const fmt = (n: number) =>
    n.toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0 });

  return (
    <main className="min-h-screen" style={{ background: "var(--bg-base)" }}>
      {/* ─── SECTION A: TIER CARDS ─── */}
      <section className="container-page py-16 md:py-24">
        <FadeUp>
          <div className="text-center mb-14">
            <p
              className="text-sm uppercase tracking-widest mb-3"
              style={{ color: "var(--accent)" }}
            >
              Website Packages
            </p>
            <h1
              className="font-[family-name:var(--font-display)] text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
              style={{ color: "var(--text-primary)" }}
            >
              Invest in Your Online Presence
            </h1>
            <p
              className="text-lg max-w-2xl mx-auto"
              style={{ color: "var(--text-secondary)" }}
            >
              Every package is built specifically for spiritual consulting
              businesses. No templates, no page builders &mdash; custom code
              that converts visitors into clients.
            </p>
          </div>
        </FadeUp>

        <StaggerContainer className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {TIERS.map((tier, i) => (
            <motion.div
              key={tier.name}
              variants={staggerItem}
              className="relative rounded-2xl border p-6 md:p-8 flex flex-col"
              style={{
                background:
                  tier.badge
                    ? "rgba(197, 165, 90, 0.06)"
                    : "var(--bg-card)",
                borderColor: tier.badge
                  ? "var(--accent)"
                  : "var(--bg-card-border)",
              }}
            >
              {tier.badge && (
                <div
                  className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-semibold uppercase tracking-wider"
                  style={{
                    background: "var(--accent)",
                    color: "var(--bg-base)",
                  }}
                >
                  {tier.badge}
                </div>
              )}

              <h3
                className="font-[family-name:var(--font-display)] text-2xl font-bold mb-2"
                style={{ color: "var(--text-primary)" }}
              >
                {tier.name}
              </h3>

              <div className="mb-1">
                <span
                  className="text-4xl font-bold"
                  style={{ color: "var(--accent)" }}
                >
                  {fmt(tier.price)}
                </span>
              </div>
              <p
                className="text-sm mb-6"
                style={{ color: "var(--text-muted)" }}
              >
                {fmt(tier.deposit)} deposit to start
              </p>

              <ul className="space-y-3 mb-8 flex-1">
                {tier.features.map((f, fi) => (
                  <li key={fi} className="flex items-start gap-3 text-sm">
                    <svg
                      className="flex-shrink-0 mt-0.5"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      stroke="var(--accent)"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M3 8l3.5 3.5L13 5" />
                    </svg>
                    <span style={{ color: "var(--text-secondary)" }}>{f}</span>
                  </li>
                ))}
              </ul>

              <Link
                href="/booking"
                className="block text-center py-3 rounded-lg font-medium text-sm transition-all duration-200 hover:scale-[1.02]"
                style={{
                  background: tier.badge
                    ? "var(--accent)"
                    : "transparent",
                  color: tier.badge
                    ? "var(--bg-base)"
                    : "var(--accent)",
                  border: tier.badge
                    ? "none"
                    : "1px solid var(--accent)",
                  borderRadius: "var(--button-radius)",
                }}
              >
                Get Started
              </Link>
            </motion.div>
          ))}
        </StaggerContainer>
      </section>

      {/* ─── SECTION B: ROI CALCULATOR ─── */}
      <section
        className="py-16 md:py-24"
        style={{ background: "var(--bg-elevated)" }}
      >
        <div className="container-page">
          <FadeUp>
            <div className="text-center mb-12">
              <p
                className="text-sm uppercase tracking-widest mb-3"
                style={{ color: "var(--accent)" }}
              >
                ROI Calculator
              </p>
              <h2
                className="font-[family-name:var(--font-display)] text-3xl md:text-4xl font-bold mb-4"
                style={{ color: "var(--text-primary)" }}
              >
                See What Your Website Could Generate
              </h2>
              <p
                className="text-base max-w-xl mx-auto"
                style={{ color: "var(--text-secondary)" }}
              >
                Adjust the sliders to match your business and see the projected
                return on your website investment.
              </p>
            </div>
          </FadeUp>

          <FadeUp delay={0.15}>
            <div
              className="max-w-3xl mx-auto rounded-2xl border p-6 md:p-10"
              style={{
                background: "var(--bg-card)",
                borderColor: "var(--bg-card-border)",
              }}
            >
              {/* Slider 1 */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-3">
                  <label
                    className="text-sm font-medium"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    Average session value
                  </label>
                  <span
                    className="text-lg font-bold"
                    style={{ color: "var(--accent)" }}
                  >
                    {fmt(sessionValue)}
                  </span>
                </div>
                <input
                  type="range"
                  min={50}
                  max={500}
                  step={25}
                  value={sessionValue}
                  onChange={(e) => setSessionValue(Number(e.target.value))}
                  className="w-full accent-[var(--accent)] cursor-pointer"
                  style={
                    {
                      "--range-progress": `${((sessionValue - 50) / (500 - 50)) * 100}%`,
                    } as React.CSSProperties
                  }
                />
                <div
                  className="flex justify-between text-xs mt-1"
                  style={{ color: "var(--text-muted)" }}
                >
                  <span>$50</span>
                  <span>$500</span>
                </div>
              </div>

              {/* Slider 2 */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-3">
                  <label
                    className="text-sm font-medium"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    New clients/month from website
                  </label>
                  <span
                    className="text-lg font-bold"
                    style={{ color: "var(--accent)" }}
                  >
                    {clientsPerMonth}
                  </span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={20}
                  step={1}
                  value={clientsPerMonth}
                  onChange={(e) => setClientsPerMonth(Number(e.target.value))}
                  className="w-full accent-[var(--accent)] cursor-pointer"
                />
                <div
                  className="flex justify-between text-xs mt-1"
                  style={{ color: "var(--text-muted)" }}
                >
                  <span>1</span>
                  <span>20</span>
                </div>
              </div>

              {/* Package selector */}
              <div className="mb-10">
                <label
                  className="block text-sm font-medium mb-3"
                  style={{ color: "var(--text-secondary)" }}
                >
                  Select package
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {TIERS.map((tier, i) => (
                    <button
                      key={tier.name}
                      onClick={() => setSelectedTierIdx(i)}
                      className="py-2.5 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer border"
                      style={{
                        background:
                          selectedTierIdx === i
                            ? "var(--accent)"
                            : "transparent",
                        color:
                          selectedTierIdx === i
                            ? "var(--bg-base)"
                            : "var(--text-secondary)",
                        borderColor:
                          selectedTierIdx === i
                            ? "var(--accent)"
                            : "var(--bg-card-border)",
                      }}
                    >
                      {tier.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Results grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <ResultCard
                  label="Monthly Revenue"
                  value={fmt(roi.monthlyRevenue)}
                />
                <ResultCard
                  label="Annual Revenue"
                  value={fmt(roi.annualRevenue)}
                />
                <ResultCard
                  label="Break-even"
                  value={
                    roi.breakEvenMonths === 0
                      ? "N/A"
                      : `${roi.breakEvenMonths} mo`
                  }
                />
                <ResultCard
                  label="12-Month ROI"
                  value={`${roi.roi12}%`}
                  highlight={roi.roi12 > 0}
                />
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ─── SECTION C: COMPARISON CHART ─── */}
      <section className="container-page py-16 md:py-24">
        <FadeUp>
          <div className="text-center mb-12">
            <p
              className="text-sm uppercase tracking-widest mb-3"
              style={{ color: "var(--accent)" }}
            >
              Feature Comparison
            </p>
            <h2
              className="font-[family-name:var(--font-display)] text-3xl md:text-4xl font-bold"
              style={{ color: "var(--text-primary)" }}
            >
              What&rsquo;s Included
            </h2>
          </div>
        </FadeUp>

        <FadeUp delay={0.1}>
          <div className="max-w-4xl mx-auto overflow-x-auto">
            <table className="w-full min-w-[600px]">
              {/* Header */}
              <thead>
                <tr>
                  <th
                    className="text-left py-4 pr-4 text-sm font-medium"
                    style={{ color: "var(--text-muted)" }}
                  >
                    Feature
                  </th>
                  {TIERS.map((tier) => (
                    <th
                      key={tier.name}
                      className="text-center py-4 px-4 text-sm font-bold"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {tier.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {COMPARISON.map((cat) => (
                  <>
                    {/* Category header */}
                    <tr key={`cat-${cat.category}`}>
                      <td
                        colSpan={4}
                        className="pt-6 pb-2 text-xs uppercase tracking-widest font-semibold"
                        style={{ color: "var(--accent)" }}
                      >
                        {cat.category}
                      </td>
                    </tr>
                    {/* Feature rows */}
                    {cat.features.map((feat) => (
                      <tr
                        key={feat.name}
                        className="border-t"
                        style={{
                          borderColor: "var(--bg-card-border)",
                        }}
                      >
                        <td
                          className="py-3 pr-4 text-sm"
                          style={{ color: "var(--text-secondary)" }}
                        >
                          {feat.name}
                        </td>
                        <td className="py-3 px-4 text-center">
                          <Check active={feat.starter} />
                        </td>
                        <td className="py-3 px-4 text-center">
                          <Check active={feat.pro} />
                        </td>
                        <td className="py-3 px-4 text-center">
                          <Check active={feat.premium} />
                        </td>
                      </tr>
                    ))}
                  </>
                ))}
              </tbody>
              {/* Price row */}
              <tfoot>
                <tr
                  className="border-t-2"
                  style={{ borderColor: "var(--bg-card-border)" }}
                >
                  <td
                    className="py-5 pr-4 text-sm font-bold"
                    style={{ color: "var(--text-primary)" }}
                  >
                    Price
                  </td>
                  {TIERS.map((tier) => (
                    <td
                      key={tier.name}
                      className="py-5 px-4 text-center text-lg font-bold"
                      style={{ color: "var(--accent)" }}
                    >
                      {fmt(tier.price)}
                    </td>
                  ))}
                </tr>
              </tfoot>
            </table>
          </div>
        </FadeUp>

        {/* Bottom CTA */}
        <FadeUp delay={0.2}>
          <div className="text-center mt-14">
            <p
              className="text-base mb-6 max-w-lg mx-auto"
              style={{ color: "var(--text-secondary)" }}
            >
              Not sure which package is right? Let&rsquo;s talk through it.
            </p>
            <Link
              href="/booking"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium rounded-lg transition-all duration-300 hover:scale-105"
              style={{
                background: "var(--accent)",
                color: "var(--bg-base)",
                borderRadius: "var(--button-radius)",
              }}
            >
              Book a Free Consultation
            </Link>
          </div>
        </FadeUp>
      </section>
    </main>
  );
}

/* ─── SUB-COMPONENTS ─── */

function ResultCard({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <motion.div
      className="rounded-xl p-4 text-center border"
      style={{
        background: "var(--bg-base)",
        borderColor: highlight
          ? "rgba(197, 165, 90, 0.3)"
          : "var(--bg-card-border)",
      }}
      layout
      transition={{ duration: 0.2, ease: EASE }}
    >
      <p
        className="text-xs mb-1"
        style={{ color: "var(--text-muted)" }}
      >
        {label}
      </p>
      <p
        className="text-xl md:text-2xl font-bold"
        style={{ color: highlight ? "var(--accent)" : "var(--text-primary)" }}
      >
        {value}
      </p>
    </motion.div>
  );
}

function Check({ active }: { active: boolean }) {
  if (!active) {
    return (
      <span
        className="inline-block w-4 h-0.5 rounded-full"
        style={{ background: "var(--bg-card-border)" }}
      />
    );
  }
  return (
    <svg
      className="inline-block"
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      stroke="var(--accent)"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 9l3.5 3.5L14 6" />
    </svg>
  );
}
