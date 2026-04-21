import type { Metadata } from "next";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
  title: "About Lesley Ledbetter | Collaborative Insights",
  description:
    "From Vietnam veteran to spiritual guide — discover how Lesley Ledbetter's journey through military service, loss, and healing led to Collaborative Insights.",
};

export default function AboutPage() {
  return <AboutClient />;
}
