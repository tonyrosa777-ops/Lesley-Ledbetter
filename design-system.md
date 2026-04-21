# design-system.md — Collaborative Insights

**Synthesized from:** initial-business-data.md + market-intelligence.md
**Date:** 2026-04-09
**Status:** DRAFT — pending human review of palette and personality axes

---

## Section 1 — Brand Identity Statement

Collaborative Insights is a spiritual consulting practice led by a Vietnam veteran who found healing through grief and loss. The brand is not soft, ethereal, or performatively mystical. It is grounded, authoritative, and deeply human. In five seconds, a visitor should feel: "This person is real. This person has been through something. I can trust this person." The visual language communicates gravitas through darkness, warmth through gold, and depth through burgundy — a palette that looks nothing like the white-and-pastel wellness sites that dominate this market. Every design decision serves one objective: make a frightened, isolated person feel safe enough to book a session.

*Source: initial-business-data.md Section 4 (brand personality) + market-intelligence.md Section 8 (design landscape) + Section 9 (strategic recommendations)*

---

## Section 2 — Color Palette

Theme: **Dark mode** — dark backgrounds are category-breaking in a market where 80%+ of competitors use white/cream.

| Token | Hex | Usage Rule |
|-------|-----|------------|
| `--primary` | `#1A1A1A` | Dominant background. All dark sections. Hero. Footer. |
| `--primary-muted` | `#242424` | Subtle elevation on dark backgrounds. Card hover states. |
| `--accent` | `#C5A55A` | CTAs, borders, icons, interactive highlights. Muted metallic gold — NOT bright #FFD700 which reads cheap. |
| `--bg-base` | `#0F0F0F` | Deepest background. Body base. |
| `--bg-elevated` | `#1E1E1E` | Light-rhythm sections (the "lighter" alternating tone in dark-mode alternation). |
| `--bg-card` | `rgba(255,255,255,0.04)` | Card backgrounds on dark sections. Border: `rgba(255,255,255,0.08)`. |
| `--text-primary` | `#F5F0EB` | Warm ivory. All headings and body text on dark backgrounds. Never pure white. |
| `--text-secondary` | `#B8B0A8` | Subheadings, meta text, secondary labels. |
| `--text-muted` | `#7A7470` | Timestamps, captions, tertiary information. |

**Extended palette (non-token, used sparingly):**
| Color | Hex | Usage |
|-------|-----|-------|
| Burgundy | `#800020` | Section accent blocks, gradient overlays, decorative borders. |
| Deep Purple | `#2D1B4E` | Gradient backgrounds, overlay tints, hover states. |
| Burgundy-muted | `#5C1A1A` | Dark section dividers, subtle accent backgrounds. |

*Source: initial-business-data.md Section 4 ("purple, burgundy, black, gold" — client stated preference) + market-intelligence.md Section 8 (recommended palette with specific hex values)*

---

## Section 3 — Typography System

| Role | Font | Source | Weights | Reasoning |
|------|------|--------|---------|-----------|
| `font-display` | Bodoni Moda | Google Fonts | 700, 900 | Editorial, authoritative serif. Signals intelligence and groundedness. Not delicate or wispy — the opposite of the Playfair/Cormorant lightweight serifs every competitor uses. |
| `font-body` | Jost | Google Fonts | 300, 400, 500 | Clean geometric sans-serif. Modern and readable at small sizes. Pairs well with Bodoni's high contrast. |
| `font-accent` | — | — | — | No script/accent font. The brand is authoritative, not decorative. Script fonts in the Canva prototype created visual inconsistency — do not reproduce. |

**Type scale (desktop / mobile):**

| Element | Desktop | Mobile | Weight | Font |
|---------|---------|--------|--------|------|
| H1 | 56px / 3.5rem | 36px / 2.25rem | 900 | font-display |
| H2 | 40px / 2.5rem | 28px / 1.75rem | 700 | font-display |
| H3 | 28px / 1.75rem | 22px / 1.375rem | 700 | font-display |
| H4 | 22px / 1.375rem | 18px / 1.125rem | 700 | font-display |
| Body | 18px / 1.125rem | 16px / 1rem | 400 | font-body |
| Small | 14px / 0.875rem | 13px / 0.8125rem | 400 | font-body |
| Label/caps | 13px / 0.8125rem | 12px / 0.75rem | 500 | font-body (uppercase, letter-spacing: 0.1em) |

*Source: market-intelligence.md Section 8 ("Strong, weighted serif headings... clean geometric sans-serif body... editorial and authoritative, like a luxury magazine")*

---

## Section 4 — Spacing & Layout System

| Token | Value | Usage |
|-------|-------|-------|
| Max content width | 1280px | All page content containers |
| Section padding (desktop) | 96px top/bottom (6rem) | Vertical rhythm between major sections |
| Section padding (mobile) | 64px top/bottom (4rem) | Compressed for mobile viewports |
| Card padding | 24px (1.5rem) | Internal card padding |
| Card border-radius | 16px (1rem) | All card components |
| Button border-radius | 8px (0.5rem) | All buttons |
| Grid columns (desktop) | 12-column | Standard layout grid |
| Grid gutter | 24px (1.5rem) desktop / 16px (1rem) mobile | Between grid items |
| Container padding | 24px (1.5rem) horizontal | Left/right page margin on mobile |

---

## Section 5 — Component Style Rules

### Buttons

| Variant | Background | Text | Border | Hover | Shape |
|---------|------------|------|--------|-------|-------|
| Primary | `var(--accent)` (#C5A55A) | `#0F0F0F` (dark text on gold) | none | brightness(1.1) + subtle scale(1.02) | rounded-lg, px-8 py-4, font-body weight-500 uppercase tracking-wide |
| Secondary | transparent | `var(--accent)` | 1px solid `var(--accent)` | bg `rgba(197,165,90,0.1)` | same shape as primary |
| Ghost | transparent | `var(--text-primary)` | none | text `var(--accent)` | same shape, no uppercase |

### Cards
- Background: `var(--bg-card)` — `rgba(255,255,255,0.04)`
- Border: 1px solid `rgba(255,255,255,0.08)`
- Border-radius: 16px
- Hover: border transitions to `rgba(197,165,90,0.3)` (gold hint)
- Shadow: none (dark mode — shadows don't read well on dark backgrounds)

### Form Inputs
- Background: `rgba(255,255,255,0.06)`
- Border: 1px solid `rgba(255,255,255,0.12)`
- Focus: border `var(--accent)`, ring `rgba(197,165,90,0.2)`
- Text: `var(--text-primary)`
- Placeholder: `var(--text-muted)`
- Border-radius: 8px
- Padding: 12px 16px

### Navigation
- Background: `var(--primary)` with backdrop-blur
- Links: `var(--text-secondary)`, hover `var(--text-primary)`
- Active: `var(--accent)`
- Mobile: full-screen overlay, dark background, centered links
- "Take the Quiz" button: always visible, gold accent, stands out from other nav items
- "Pricing" link: amber with diamond marker (internal sales tool)

---

## Section 6 — Photography & Media Direction

**Mood:** Dark, dramatic, Rembrandt-style lighting. Textured backgrounds (aged wood, stone, earth). The photography tone should communicate discipline, depth, and real-world hardship survived.

**Required shot types:**
- Professional headshot of Lesley: dramatic lighting, gravitas, approachability. NOT soft-lit wellness portrait. Think editorial portrait of a veteran.
- Atmospheric/environmental: candles, natural light through windows, meditation space, sacred geometry rendered in gold on dark backgrounds
- Nature: paths through dark forests, moonlit landscapes, sunrise over water — the journey metaphor

**Prohibited content:**
- No crystals, tarot cards, or stock spiritual imagery (these are table stakes that every competitor uses — they create no differentiation)
- No soft-lit women in flowing clothing
- No galaxy/celestial overlays
- No stock photos of diverse groups doing yoga
- No bright, cheerful, pastel imagery

**Aspect ratios:**
- Hero: 16:9 (animation, not photo)
- Cards: 4:3
- Gallery/about photos: 3:2
- Testimonial avatars: 1:1 (circle crop)

**Video rules:** Hero uses canvas animation, not video. Any future video content (testimonials, about page) should use the same dark/dramatic lighting direction.

*Source: initial-business-data.md Section 4 (visual references, existing stock imagery) + market-intelligence.md Section 8 (photography direction) + Section 9 Avoid #2*

---

## Section 7 — Tone of Voice

### Principle 1: Grounded, Not Ethereal
**Rule:** Use plain, direct language. Never float into vague spiritual abstractions.
- **BEFORE:** "Embark on a transformative journey of cosmic consciousness expansion and vibrational alignment."
- **AFTER:** "You're not crazy. You're waking up. I can help you understand what's happening."

### Principle 2: Guide, Not Guru
**Rule:** Position Lesley as a fellow traveler who is further down the path, not an authority dispensing truth from above.
- **BEFORE:** "I will unlock your dormant spiritual gifts and elevate your consciousness."
- **AFTER:** "My role isn't to tell you what to believe. It's to help you recognize what's already true in you."

### Principle 3: Specific, Not Vague
**Rule:** Name the actual experience. Use the audience's language from forums and reviews, not practitioner jargon.
- **BEFORE:** "Are you experiencing ascension symptoms and seeking higher vibrational alignment?"
- **AFTER:** "You keep seeing 11:11. Your anxiety has no medical cause. Your old friends feel like strangers. Sound familiar?"

### Principle 4: Safe Before Bold
**Rule:** The first emotion the copy produces must be safety. Never lead with claims of transformation — lead with validation of the reader's experience.
- **BEFORE:** "Book now and transform your life through powerful spiritual healing."
- **AFTER:** "A calm, non-judgmental space to share what you're experiencing. That's what this session is."

### Principle 5: Earned Authority
**Rule:** Credibility comes from specifics (8.5 years military service, 18+ courses, Vietnam veteran), not from claims of ability.
- **BEFORE:** "I am a gifted healer and powerful medium."
- **AFTER:** "Vietnam veteran. 8.5 years military intelligence. 6 years studying healing. 18 courses completed. I came to this work through loss — not by choice."

*Source: initial-business-data.md Section 4 (tone: warm, grounded, non-dogmatic, plain-spoken, humble, deeply sincere) + Appendix A (existing copy — already uses this voice well) + market-intelligence.md Section 2 (audience language bank) + Section 9 Do #1*

---

## Section 8 — Brand Personality Axes

**Axis 1: Mystical vs. Clinical**
```
[Mystical] ◄━━━━━━●━━━━━━━━━► [Clinical]
                 35%
```
Leans mystical but grounded. Uses spiritual language but never untethered from reality. The sweet spot: "a veteran who talks about energy healing the way he'd talk about fixing your furnace — practical, specific, and real."

**Axis 2: Feminine vs. Masculine**
```
[Feminine] ◄━━━━━━━━━━●━━━━━► [Masculine]
                      65%
```
Leans masculine. Dark palette, strong typography, editorial tone. NOT aggressive or cold — warm masculine. Think: a wise elder who has survived real darkness, not a drill sergeant. This is the primary visual differentiator in a 95% feminine-coded market.

**Axis 3: Exclusive vs. Accessible**
```
[Exclusive] ◄━━━━━━━━━━●━━━━► [Accessible]
                       70%
```
Leans accessible. The target audience is scared, confused, and often financially strained. The brand must feel like an open door, not a velvet rope. But the design quality must feel premium — accessible in tone, luxurious in execution.

*Source: initial-business-data.md Section 4 (brand personality, values) + Appendix B (brand descriptor bank: Mysterious, Grounded, Empathetic, Ancestral, Authentic) + market-intelligence.md Section 8 (visual differentiation opportunity) + Section 9 Exploit #1*

---

## Section 9 — Competitor Differentiation Statement

**vs. Julie Ryan (askjulieryan.com):** Julie leads with authority (8 books, 48K followers, trademarked methods) but overwhelms with options and hides pricing. Collaborative Insights differentiates through simplicity (one clear offer, visible pricing, one CTA) and emotional connection (origin story as trust anchor vs. credential stack). Visually: her navy/gold/white WordPress site is professional but cluttered. Ours is dark, minimal, and editorial — every element earns its space.

**vs. Lee Bladon (theawakening.coach):** Lee has the best-designed competitor site (clean, transparent, educational) but is UK-only, has small reach, and presents as gentle/cerebral. Collaborative Insights differentiates through rawness (veteran's grief-to-healing story vs. academic credentials), demographic positioning (male veteran vs. gentle British academic), and market (US-based, online-first). Visually: his white/minimalist design is the opposite of our dark/dramatic direction.

**vs. Brent Spirit (brentspirit.com):** Brent owns the Kundalini niche with free content, sliding-scale pricing, and strong testimonials. Collaborative Insights differentiates by serving the broader awakening audience (not Kundalini-specific), leading with a dramatically different origin story (veteran/grief vs. personal practice), and visual identity (his dark Squarespace sections are the closest competitor aesthetically, but lack the gold/burgundy palette and editorial typography).

*Source: market-intelligence.md Section 3 (competitor analysis) + Section 9 (strategic recommendations)*

---

## Section 10 — Design Anti-Patterns

1. **No white or cream backgrounds.** The entire site is dark-mode. Light sections use `--bg-elevated` (#1E1E1E), never white. This is the single biggest visual differentiator.

2. **No delicate/wispy serif fonts.** No Playfair Display Light, no Cormorant Garamond, no thin serif weights. Display headings are Bodoni Moda 700/900 — heavy and commanding.

3. **No crystal, tarot, or celestial stock photography.** These are visual cliches that every competitor uses. They create zero differentiation and signal "generic spiritual site."

4. **No pastel accents.** No lavender, no sage green, no dusty pink, no soft blush. The accent palette is gold, burgundy, and deep purple only.

5. **No script/handwriting fonts.** The Canva prototype used multiple script fonts inconsistently. The production site uses zero. Script fonts undermine the authoritative tone.

6. **No rounded/pill-shaped buttons.** Buttons use 8px border-radius (rounded-lg), not full-rounded. Pill buttons read as casual/playful — this brand is authoritative.

7. **No floating/ethereal animations.** No slow-drifting particles, no dreamy fades, no aurora effects. Animations should feel deliberate and substantial — forged, not floating.

8. **No "guru" language in copy.** Never "I will unlock your gifts" or "I am a powerful healer." Always "I help you recognize what's already true in you."

9. **No em dashes in testimonials or copy.** Humans use commas, periods, and ellipses. Em dashes are an AI/copywriter tell.

10. **No hiding pricing.** All pricing is visible on service pages, directly above the booking widget. Hidden pricing is the #1 competitor mistake in this market.

*Source: market-intelligence.md Section 8 (what the market looks like now — what to avoid) + Section 9 (Avoid #1, #2, #3) + CLAUDE.md Content Standards*

---

## Section 11 — Sections Matrix

### Standard Sections

| Section | Include? | Reason |
|---------|----------|--------|
| Shop | Yes (scaffold, decision gate post-sale) | Always scaffolded per CLAUDE.md. Demo shows seeded product grid. Decision gate after sale. Digital products (formatted PDFs from Lesley's notes) are a roadmap item. |
| Blog | Yes | Non-negotiable. 9-10 articles targeting "spiritual awakening" long-tail keywords. AEO-optimized first paragraphs. SEO foundation for organic discovery. |
| Quiz | Yes | Non-negotiable. "What type of spiritual awakening are you experiencing?" — routes to recommended service/resource. Lead qualification tool. |
| Booking | Yes | Non-negotiable. Custom-branded booking calendar using Calendly API. Embedded on /booking page + homepage teaser. Demo mode with seeded availability. |
| Maps | No | 100% online delivery via Zoom. No physical location. No service area pages. Google Maps has no relevance. |
| Instagram Feed | No | Client has no social media accounts. No feed to embed. Social strategy deferred post-launch. |
| Service Areas | No | Not a local service business. Sessions are online-only via Zoom. No geographic service area concept. |
| Pricing (Optimus) | Yes | Always built as sales tool. Deleted before client launch. Starter/Pro/Premium with ROI calculator. |
| Testimonials | Yes | Non-negotiable. 36 testimonials written in target audience voice. Paginated 9/page (3x3 grid). Homepage features 3-4 + "See All" link. |

### Custom Features

| Feature | Source | Complexity | Notes |
|---------|--------|------------|-------|
| "What to Expect in Your Session" page | market-intelligence.md Section 5 Gap #1 | Medium | Step-by-step visual walkthrough: booking → prep → session → integration → follow-up. Zero competitors have this. Highest-priority gap to close. |
| "Spiritual Awakening vs. Therapy vs. Coaching" explainer | market-intelligence.md Section 5 Gap #4 | Low | Comparison page/section. Owns a high-intent SEO keyword no practitioner ranks for. |
| Beginner's glossary | market-intelligence.md Section 5 Gap #7 | Low | Define insider jargon (chakras, Akashic Records, energy clearing) for confused first-timers. SEO + conversion value. |
| Subscription tier display | initial-business-data.md Section 2 | Medium | 3 tiers (monthly/biweekly/weekly). Pricing structure needs restructuring per market-intelligence.md Section 4 recommendation before publishing. |
| Credentials/training showcase | initial-business-data.md Section 7 | Low | AAT, Angels & Enlightenment, The Frequencies (18-20 courses). Display on /about page with visual hierarchy. |

---

*Design system synthesized by Optimus Business Solutions*
*Next step: Task 0E — Scaffold Next.js project*
