import type { Metadata } from "next";
import BlogClient from "./BlogClient";

export const metadata: Metadata = {
  title: "Blog — Guides for the Awakening Journey | Collaborative Insights",
  description:
    "Articles on spiritual awakening, energy healing, ancestral trauma, and guided spiritual consulting. Written by Lesley Ledbetter, Vietnam veteran and spiritual guide.",
};

export default function BlogPage() {
  return <BlogClient />;
}
