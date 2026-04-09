import Hero from "@/components/sections/Hero";
import PainPoints from "@/components/sections/PainPoints";
import AboutTeaser from "@/components/sections/AboutTeaser";
import ServicesPreview from "@/components/sections/ServicesPreview";
import StatsRow from "@/components/sections/StatsRow";
import Testimonials from "@/components/sections/Testimonials";
import QuizCTA from "@/components/sections/QuizCTA";
import BlogPreview from "@/components/sections/BlogPreview";
import BookingTeaser from "@/components/sections/BookingTeaser";
import FinalCTA from "@/components/sections/FinalCTA";

/*
  SECTION RHYTHM MAP — dark/light alternation (no two adjacent sections share background)
  ─────────────────────────────────────────────────────────────────────────────
  1. Hero              → DARK   (var(--bg-base))
  2. Pain Points       → LIGHT  (var(--bg-elevated))
  3. About Teaser      → DARK   (var(--primary))
  4. Services Preview  → LIGHT  (var(--bg-elevated))
  5. Stats Row         → DARK   (var(--primary))
  6. Testimonials      → LIGHT  (var(--bg-elevated))
  7. Quiz CTA          → DARK   (var(--primary))
  8. Blog Preview      → LIGHT  (var(--bg-elevated))
  9. Booking Teaser    → DARK   (var(--primary))
  10. Final CTA        → DARK   (var(--burgundy) accent — intentional break for emphasis)
  ─────────────────────────────────────────────────────────────────────────────
*/

export default function Home() {
  return (
    <main>
      <Hero />
      <PainPoints />
      <AboutTeaser />
      <ServicesPreview />
      <StatsRow />
      <Testimonials />
      <QuizCTA />
      <BlogPreview />
      <BookingTeaser />
      <FinalCTA />
    </main>
  );
}
