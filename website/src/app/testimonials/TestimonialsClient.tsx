"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { testimonials } from "@/data/site";
import FadeUp from "@/components/animations/FadeUp";
import FadeIn from "@/components/animations/FadeIn";
import ScaleIn from "@/components/animations/ScaleIn";
import StaggerContainer, {
  staggerItem,
} from "@/components/animations/StaggerContainer";

const ITEMS_PER_PAGE = 9;
const ease = [0, 0, 0.2, 1] as const;

export default function TestimonialsClient() {
  const [currentPage, setCurrentPage] = useState(1);
  const [activeFilter, setActiveFilter] = useState<string>("All");

  // Derive unique service types for filter
  const serviceTypes = useMemo(() => {
    const types = Array.from(new Set(testimonials.map((t) => t.service))).filter(
      Boolean
    );
    return ["All", ...types.sort()];
  }, []);

  // Featured testimonial — first one marked featured
  const featuredTestimonial = useMemo(
    () => testimonials.find((t) => t.featured) ?? testimonials[0],
    []
  );

  // Filtered testimonials (exclude the featured one from the grid)
  const filteredTestimonials = useMemo(() => {
    const pool = testimonials.filter((t) => t !== featuredTestimonial);
    if (activeFilter === "All") return pool;
    return pool.filter((t) => t.service === activeFilter);
  }, [activeFilter, featuredTestimonial]);

  // Pagination
  const totalPages = Math.max(
    1,
    Math.ceil(filteredTestimonials.length / ITEMS_PER_PAGE)
  );
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const paginatedTestimonials = filteredTestimonials.slice(
    (safeCurrentPage - 1) * ITEMS_PER_PAGE,
    safeCurrentPage * ITEMS_PER_PAGE
  );

  const goToPage = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 400, behavior: "smooth" });
  };

  // Reset to page 1 when filter changes
  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
    setCurrentPage(1);
  };

  return (
    <main>
      {/* Header */}
      <section
        className="bg-[var(--bg-base)]"
        style={{ padding: "var(--section-padding-mobile) 0" }}
      >
        <div className="container-page text-center">
          <FadeUp>
            <p
              className="font-body text-xs uppercase tracking-widest mb-3"
              style={{ color: "var(--accent)" }}
            >
              Testimonials
            </p>
            <h1
              className="hero-shimmer font-display font-black mb-4"
              style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
            >
              What People Are Saying
            </h1>
            <p
              className="text-base md:text-lg leading-relaxed max-w-2xl mx-auto"
              style={{
                color: "var(--text-secondary)",
                fontFamily: "var(--font-body)",
                fontWeight: 300,
              }}
            >
              Real stories from real people who chose to trust the process.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* Featured Quote */}
      {featuredTestimonial && (
        <section
          className="section-light"
          style={{ padding: "var(--section-padding-mobile) 0" }}
        >
          <div className="container-page max-w-4xl mx-auto text-center">
            <ScaleIn>
              <div
                className="p-8 md:p-12 rounded-2xl border relative"
                style={{
                  backgroundColor: "var(--bg-card)",
                  borderColor: "var(--bg-card-border)",
                }}
              >
                {/* Decorative quote mark */}
                <span
                  className="block font-display text-6xl md:text-8xl leading-none mb-4 select-none"
                  style={{ color: "var(--accent)", opacity: 0.3 }}
                  aria-hidden="true"
                >
                  &ldquo;
                </span>
                <p
                  className="text-lg md:text-xl lg:text-2xl leading-relaxed italic mb-8"
                  style={{
                    color: "var(--text-primary)",
                    fontFamily: "var(--font-body)",
                    fontWeight: 300,
                  }}
                >
                  {featuredTestimonial.text}
                </p>
                <div>
                  <p
                    className="font-body font-medium text-base"
                    style={{ color: "var(--accent)" }}
                  >
                    {featuredTestimonial.name}
                  </p>
                  <p
                    className="text-sm mt-1"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {featuredTestimonial.location} &middot;{" "}
                    {featuredTestimonial.service}
                  </p>
                </div>
              </div>
            </ScaleIn>
          </div>
        </section>
      )}

      {/* Filters + Grid */}
      <section
        className="bg-[var(--bg-base)]"
        style={{ padding: "var(--section-padding-mobile) 0" }}
      >
        <div className="container-page">
          {/* Service Type Filter */}
          {serviceTypes.length > 2 && (
            <FadeIn>
              <div className="flex flex-wrap justify-center gap-2 mb-10">
                {serviceTypes.map((type) => (
                  <button
                    key={type}
                    onClick={() => handleFilterChange(type)}
                    className="px-4 py-2 text-sm font-body font-medium rounded-full border transition-all duration-200 cursor-pointer"
                    style={{
                      backgroundColor:
                        activeFilter === type
                          ? "var(--accent)"
                          : "transparent",
                      color:
                        activeFilter === type
                          ? "#0F0F0F"
                          : "var(--text-secondary)",
                      borderColor:
                        activeFilter === type
                          ? "var(--accent)"
                          : "var(--bg-card-border)",
                    }}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </FadeIn>
          )}

          {/* Testimonials Grid — 3x3 = 9 per page */}
          {paginatedTestimonials.length > 0 ? (
            <StaggerContainer
              key={`${activeFilter}-${safeCurrentPage}`}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {paginatedTestimonials.map((testimonial, i) => (
                <motion.div
                  key={`${testimonial.name}-${i}`}
                  variants={staggerItem}
                  className="p-6 md:p-8 rounded-2xl border flex flex-col justify-between"
                  style={{
                    backgroundColor: "var(--bg-card)",
                    borderColor: "var(--bg-card-border)",
                  }}
                >
                  <p
                    className="text-sm md:text-base leading-relaxed italic mb-6"
                    style={{
                      color: "var(--text-primary)",
                      fontFamily: "var(--font-body)",
                      fontWeight: 300,
                    }}
                  >
                    &ldquo;{testimonial.text}&rdquo;
                  </p>
                  <div
                    className="pt-4 border-t"
                    style={{ borderColor: "var(--bg-card-border)" }}
                  >
                    <p
                      className="font-body font-medium text-sm"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {testimonial.name}
                    </p>
                    <p
                      className="text-xs mt-1"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {testimonial.location}
                    </p>
                    <p
                      className="text-xs mt-0.5"
                      style={{ color: "var(--accent)", opacity: 0.8 }}
                    >
                      {testimonial.service}
                    </p>
                  </div>
                </motion.div>
              ))}
            </StaggerContainer>
          ) : (
            <FadeIn>
              <p
                className="text-center py-16 text-base"
                style={{ color: "var(--text-muted)" }}
              >
                {testimonials.length === 0
                  ? "Testimonials coming soon."
                  : "No testimonials match this filter."}
              </p>
            </FadeIn>
          )}

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <FadeIn>
              <nav
                className="flex items-center justify-center gap-2 mt-12"
                aria-label="Testimonials pagination"
              >
                {/* Previous */}
                <button
                  onClick={() => goToPage(safeCurrentPage - 1)}
                  disabled={safeCurrentPage === 1}
                  className="px-3 py-2 text-sm font-body font-medium rounded-[var(--button-radius)] border transition-all duration-200 cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
                  style={{
                    color: "var(--text-secondary)",
                    borderColor: "var(--bg-card-border)",
                  }}
                  aria-label="Previous page"
                >
                  &larr; Prev
                </button>

                {/* Page Numbers */}
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      onClick={() => goToPage(page)}
                      className="w-10 h-10 text-sm font-body font-medium rounded-[var(--button-radius)] border transition-all duration-200 cursor-pointer"
                      style={{
                        backgroundColor:
                          safeCurrentPage === page
                            ? "var(--accent)"
                            : "transparent",
                        color:
                          safeCurrentPage === page
                            ? "#0F0F0F"
                            : "var(--text-secondary)",
                        borderColor:
                          safeCurrentPage === page
                            ? "var(--accent)"
                            : "var(--bg-card-border)",
                      }}
                      aria-label={`Page ${page}`}
                      aria-current={
                        safeCurrentPage === page ? "page" : undefined
                      }
                    >
                      {page}
                    </button>
                  )
                )}

                {/* Next */}
                <button
                  onClick={() => goToPage(safeCurrentPage + 1)}
                  disabled={safeCurrentPage === totalPages}
                  className="px-3 py-2 text-sm font-body font-medium rounded-[var(--button-radius)] border transition-all duration-200 cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
                  style={{
                    color: "var(--text-secondary)",
                    borderColor: "var(--bg-card-border)",
                  }}
                  aria-label="Next page"
                >
                  Next &rarr;
                </button>
              </nav>
            </FadeIn>
          )}
        </div>
      </section>

      {/* Booking CTA */}
      <section
        style={{
          background:
            "linear-gradient(135deg, var(--burgundy) 0%, var(--primary) 100%)",
          padding: "var(--section-padding-mobile) 0",
        }}
      >
        <div className="container-page text-center max-w-2xl mx-auto">
          <FadeUp>
            <h2
              className="font-display font-bold mb-4"
              style={{
                color: "var(--text-primary)",
                fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
              }}
            >
              Ready to Experience This?
            </h2>
            <p
              className="text-base md:text-lg leading-relaxed mb-8"
              style={{
                color: "var(--text-secondary)",
                fontFamily: "var(--font-body)",
                fontWeight: 300,
              }}
            >
              Your transformation story starts with a single conversation.
              Book your session today and discover what&apos;s possible.
            </p>
            <Link
              href="/booking"
              className="inline-flex items-center justify-center px-8 py-4 font-body font-medium text-lg rounded-[var(--button-radius)] transition-all hover:brightness-110"
              style={{
                backgroundColor: "var(--accent)",
                color: "#0F0F0F",
              }}
            >
              Book a Session
            </Link>
          </FadeUp>
        </div>
      </section>
    </main>
  );
}
