import type { Metadata } from "next";
import { faq, siteConfig } from "@/data/site";
import FAQClient from "./FAQClient";

export const metadata: Metadata = {
  title: `FAQ — ${siteConfig.name}`,
  description:
    "Find answers to common questions about spiritual consulting, session preparation, pricing, and what to expect working with Collaborative Insights.",
  other: {
    "script:ld+json": JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faq.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    }),
  },
};

export default function FAQPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faq.map((item) => ({
              "@type": "Question",
              name: item.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: item.answer,
              },
            })),
          }),
        }}
      />
      <FAQClient />
    </>
  );
}
