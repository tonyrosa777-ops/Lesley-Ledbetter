"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { siteConfig, contact } from "@/data/site";
import FadeUp from "@/components/animations/FadeUp";
import SlideIn from "@/components/animations/SlideIn";
import ScaleIn from "@/components/animations/ScaleIn";

const ease = [0, 0, 0.2, 1] as const;

/* ── Zod schema ── */
const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  phone: z
    .string()
    .optional()
    .refine(
      (val) => !val || /^[\d\s()+\-\.]{7,20}$/.test(val),
      "Please enter a valid phone number."
    ),
  message: z.string().min(10, "Please share a bit more (at least 10 characters)."),
});

type ContactFormData = z.infer<typeof contactSchema>;

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

/* ── Form field styles ── */
const inputBaseStyles: React.CSSProperties = {
  backgroundColor: "var(--bg-card)",
  borderColor: "var(--bg-card-border)",
  color: "var(--text-primary)",
  fontFamily: "var(--font-body)",
};

export default function ContactClient() {
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setServerError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const payload = await res.json().catch(() => ({}));
        throw new Error(payload.error || "Something went wrong. Please try again.");
      }
      setSubmitted(true);
    } catch (err) {
      setServerError(err instanceof Error ? err.message : "Something went wrong.");
    }
  };

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
            Contact
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease }}
            className="hero-shimmer text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[1.08] tracking-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {contact.headline || "Get in Touch"}
          </motion.h1>
          {contact.subheadline && (
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease }}
              className="text-lg mt-4 max-w-xl mx-auto"
              style={{
                color: "var(--text-secondary)",
                fontFamily: "var(--font-body)",
                fontWeight: 300,
              }}
            >
              {contact.subheadline}
            </motion.p>
          )}
        </div>
      </section>

      {/* ════════════════════════════════════════════
          SECTION 2: Form + Info (Two-Column)
      ════════════════════════════════════════════ */}
      <section
        className="section-light"
        style={{ padding: "var(--section-padding-mobile) 0" }}
      >
        <div className="container-page">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-12 md:gap-16 max-w-5xl mx-auto">
            {/* ── Left: Contact Form (3/5 width) ── */}
            <SlideIn direction="left" className="md:col-span-3">
              {submitted ? (
                <ScaleIn>
                  <div
                    className="p-10 rounded-2xl border text-center"
                    style={{
                      backgroundColor: "var(--bg-card)",
                      borderColor: "var(--bg-card-border)",
                    }}
                  >
                    <span className="text-5xl block mb-4">{"\u{2728}"}</span>
                    <h3
                      className="font-bold text-2xl mb-3"
                      style={{
                        fontFamily: "var(--font-display)",
                        color: "var(--text-primary)",
                      }}
                    >
                      Message Received
                    </h3>
                    <p
                      className="text-base leading-relaxed"
                      style={{
                        color: "var(--text-secondary)",
                        fontFamily: "var(--font-body)",
                        fontWeight: 300,
                      }}
                    >
                      Thank you for reaching out. I&apos;ll get back to you within
                      24&ndash;48 hours. Looking forward to connecting.
                    </p>
                  </div>
                </ScaleIn>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
                  {/* Name */}
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium mb-1.5"
                      style={{
                        color: "var(--text-primary)",
                        fontFamily: "var(--font-body)",
                      }}
                    >
                      Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      placeholder="Your full name"
                      {...register("name")}
                      className="w-full px-4 py-3 rounded-[var(--button-radius)] border text-base outline-none transition-colors focus:border-[var(--accent)]"
                      style={inputBaseStyles}
                    />
                    {errors.name && (
                      <p
                        className="text-sm mt-1"
                        style={{ color: "#E5534B", fontFamily: "var(--font-body)" }}
                      >
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium mb-1.5"
                      style={{
                        color: "var(--text-primary)",
                        fontFamily: "var(--font-body)",
                      }}
                    >
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      {...register("email")}
                      className="w-full px-4 py-3 rounded-[var(--button-radius)] border text-base outline-none transition-colors focus:border-[var(--accent)]"
                      style={inputBaseStyles}
                    />
                    {errors.email && (
                      <p
                        className="text-sm mt-1"
                        style={{ color: "#E5534B", fontFamily: "var(--font-body)" }}
                      >
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  {/* Phone (optional) */}
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium mb-1.5"
                      style={{
                        color: "var(--text-primary)",
                        fontFamily: "var(--font-body)",
                      }}
                    >
                      Phone{" "}
                      <span style={{ color: "var(--text-muted)" }}>(optional)</span>
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      placeholder="(555) 123-4567"
                      {...register("phone")}
                      className="w-full px-4 py-3 rounded-[var(--button-radius)] border text-base outline-none transition-colors focus:border-[var(--accent)]"
                      style={inputBaseStyles}
                    />
                    {errors.phone && (
                      <p
                        className="text-sm mt-1"
                        style={{ color: "#E5534B", fontFamily: "var(--font-body)" }}
                      >
                        {errors.phone.message}
                      </p>
                    )}
                  </div>

                  {/* Message */}
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium mb-1.5"
                      style={{
                        color: "var(--text-primary)",
                        fontFamily: "var(--font-body)",
                      }}
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      placeholder="Tell me a little about what you're looking for..."
                      {...register("message")}
                      className="w-full px-4 py-3 rounded-[var(--button-radius)] border text-base outline-none transition-colors focus:border-[var(--accent)] resize-y"
                      style={inputBaseStyles}
                    />
                    {errors.message && (
                      <p
                        className="text-sm mt-1"
                        style={{ color: "#E5534B", fontFamily: "var(--font-body)" }}
                      >
                        {errors.message.message}
                      </p>
                    )}
                  </div>

                  {serverError && (
                    <p
                      className="text-sm"
                      style={{ color: "#E5534B", fontFamily: "var(--font-body)" }}
                    >
                      {serverError}
                    </p>
                  )}

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full inline-flex items-center justify-center px-8 py-4 text-base font-medium rounded-[var(--button-radius)] transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
                    style={{
                      backgroundColor: "var(--accent)",
                      color: "var(--primary)",
                      fontFamily: "var(--font-body)",
                    }}
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </button>
                </form>
              )}
            </SlideIn>

            {/* ── Right: Contact Info (2/5 width) ── */}
            <SlideIn direction="right" delay={0.2} className="md:col-span-2">
              <div className="space-y-8">
                {/* Email */}
                <div>
                  <h3
                    className="font-bold text-lg mb-2"
                    style={{
                      fontFamily: "var(--font-display)",
                      color: "var(--text-primary)",
                    }}
                  >
                    Email
                  </h3>
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="text-base transition-colors hover:brightness-110"
                    style={{
                      color: "var(--accent)",
                      fontFamily: "var(--font-body)",
                    }}
                  >
                    {siteConfig.email}
                  </a>
                </div>

                {/* Phone (if available) */}
                {siteConfig.phone && (
                  <div>
                    <h3
                      className="font-bold text-lg mb-2"
                      style={{
                        fontFamily: "var(--font-display)",
                        color: "var(--text-primary)",
                      }}
                    >
                      Phone
                    </h3>
                    <a
                      href={`tel:${siteConfig.phone}`}
                      className="text-base transition-colors hover:brightness-110"
                      style={{
                        color: "var(--accent)",
                        fontFamily: "var(--font-body)",
                      }}
                    >
                      {siteConfig.phone}
                    </a>
                  </div>
                )}

                {/* Response time */}
                <div
                  className="p-6 rounded-2xl border"
                  style={{
                    backgroundColor: "var(--bg-card)",
                    borderColor: "var(--bg-card-border)",
                  }}
                >
                  <span className="text-3xl block mb-3">{"\u{23F0}"}</span>
                  <h3
                    className="font-bold text-lg mb-2"
                    style={{
                      fontFamily: "var(--font-display)",
                      color: "var(--text-primary)",
                    }}
                  >
                    Response Time
                  </h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{
                      color: "var(--text-secondary)",
                      fontFamily: "var(--font-body)",
                      fontWeight: 300,
                    }}
                  >
                    I personally read and respond to every message.
                    Expect a reply within 24&ndash;48 hours.
                  </p>
                </div>

                {/* Location note */}
                <div
                  className="p-6 rounded-2xl border"
                  style={{
                    backgroundColor: "var(--bg-card)",
                    borderColor: "var(--bg-card-border)",
                  }}
                >
                  <span className="text-3xl block mb-3">{"\u{1F4CD}"}</span>
                  <h3
                    className="font-bold text-lg mb-2"
                    style={{
                      fontFamily: "var(--font-display)",
                      color: "var(--text-primary)",
                    }}
                  >
                    Based in {siteConfig.location}
                  </h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{
                      color: "var(--text-secondary)",
                      fontFamily: "var(--font-body)",
                      fontWeight: 300,
                    }}
                  >
                    Sessions available both in-person and remotely.
                    I work with clients worldwide.
                  </p>
                </div>
              </div>
            </SlideIn>
          </div>
        </div>
      </section>
    </main>
  );
}
