import type { Metadata } from "next";
import { siteConfig } from "@/data/site";
import TestimonialsClient from "./TestimonialsClient";

export const metadata: Metadata = {
  title: `Testimonials — ${siteConfig.name}`,
  description:
    "Read real stories from people who have experienced spiritual consulting with Collaborative Insights. Discover how guided insight has transformed lives.",
};

export default function TestimonialsPage() {
  return <TestimonialsClient />;
}
