import { Metadata } from "next";
import BookingClient from "./BookingClient";

export const metadata: Metadata = {
  title: "Book Your Session — Collaborative Insights",
  description:
    "Schedule a spiritual consulting session with Collaborative Insights. Choose a date and time that works for you.",
};

export default function BookingPage() {
  return <BookingClient />;
}
