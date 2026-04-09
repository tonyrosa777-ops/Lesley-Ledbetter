import type { Metadata } from "next";
import ServicesClient from "./ServicesClient";

export const metadata: Metadata = {
  title: "Services | Collaborative Insights",
  description:
    "Explore spiritual consulting services — from guided sessions and energy work to animal alchemy. Find the right path for your healing journey.",
};

export default function ServicesPage() {
  return <ServicesClient />;
}
