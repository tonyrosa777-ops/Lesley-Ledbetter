# Optimus Pricing Packages — Collaborative Insights

**Client:** Lesley Ledbetter / Collaborative Insights
**Sale closed:** Pro plan selected ($3,000)
**Status:** Pricing page removed from site on 2026-04-20 (sale complete)

This document archives the three Optimus website packages that were presented to
Lesley during the sales process. The `/pricing` page was deleted from the live
site once she committed to the Pro tier. This file exists so the pricing history
is preserved for reference — it is never linked from the site and never shipped
to the client.

All packages include a 50% deposit to start; balance due at launch.

---

## Starter — $1,500

- $750 deposit to start
- Badge: none

**Included features:**
- Custom animated hero section
- About page with your story
- Services pages with pricing
- Contact form with email delivery
- Mobile responsive design
- SEO foundation (meta, schema, sitemap)

---

## Pro — $3,000  *(Most Popular — selected by client)*

- $1,500 deposit to start
- Badge: Most Popular

**Included features:**
- Everything in Starter
- Blog with 10 SEO articles
- Interactive spiritual quiz
- Branded booking calendar
- Testimonials page
- FAQ page

---

## Premium — $5,500

- $2,750 deposit to start
- Badge: none (anchor tier — makes Pro feel reasonable)

**Included features:**
- Everything in Pro
- Merch shop with Printful integration
- Stripe payment processing
- Email automation setup

---

## ROI Calculator Inputs (as presented)

The pricing page included a live ROI calculator with two sliders and a tier
selector. The defaults and ranges were:

| Input | Default | Min | Max | Step |
|---|---|---|---|---|
| Average session value | $100 | $50 | $500 | $25 |
| New clients/month from website | 3 | 1 | 20 | 1 |
| Selected tier | Pro | — | — | — |

Outputs: monthly revenue, annual revenue, break-even months, 12-month ROI %.

---

## Full Comparison Chart

### Foundation
| Feature | Starter | Pro | Premium |
|---|:-:|:-:|:-:|
| Custom animated hero | ✅ | ✅ | ✅ |
| About page | ✅ | ✅ | ✅ |
| Services pages | ✅ | ✅ | ✅ |
| Contact form | ✅ | ✅ | ✅ |
| Mobile responsive | ✅ | ✅ | ✅ |
| SEO foundation (meta, schema, sitemap) | ✅ | ✅ | ✅ |

### Conversion
| Feature | Starter | Pro | Premium |
|---|:-:|:-:|:-:|
| Interactive spiritual quiz | — | ✅ | ✅ |
| Branded booking calendar | — | ✅ | ✅ |
| Testimonials page | — | ✅ | ✅ |
| FAQ page | — | ✅ | ✅ |

### Content & SEO
| Feature | Starter | Pro | Premium |
|---|:-:|:-:|:-:|
| Blog with 10 SEO articles | — | ✅ | ✅ |
| Email automation setup | — | — | ✅ |

### Commerce
| Feature | Starter | Pro | Premium |
|---|:-:|:-:|:-:|
| Merch shop (Printful) | — | — | ✅ |
| Stripe payment processing | — | — | ✅ |

### Support
| Feature | Starter | Pro | Premium |
|---|:-:|:-:|:-:|
| Launch support | ✅ | ✅ | ✅ |
| Content strategy session | — | ✅ | ✅ |
| Priority support | — | — | ✅ |

---

## Notes for Future Reference

- The pricing page source previously lived at `website/src/app/pricing/page.tsx`
  and was deleted once the sale closed.
- The Pricing link in the site header (gold `⬥ Pricing` marker) was removed in
  the same commit.
- `/pricing` was also removed from the `robots.ts` disallow list since the
  route no longer exists.
- Shop scaffolding remains in the codebase per CLAUDE.md's always-scaffold rule;
  since Lesley selected Pro (not Premium), the shop route and nav entry should
  be removed before launch per the CLAUDE.md decision gate.
