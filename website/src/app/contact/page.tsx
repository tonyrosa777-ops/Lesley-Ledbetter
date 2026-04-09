import type { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact | Collaborative Insights",
  description:
    "Get in touch with Collaborative Insights. Reach out for questions about spiritual consulting services or to start your healing journey.",
};

export default function ContactPage() {
  return <ContactClient />;
}
