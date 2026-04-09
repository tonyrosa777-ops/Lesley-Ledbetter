import { Metadata } from "next";
import QuizClient from "./QuizClient";

export const metadata: Metadata = {
  title: "Spiritual Awakening Quiz — Collaborative Insights",
  description:
    "Discover which type of spiritual awakening you're experiencing. Take the free quiz and get a personalized recommendation from Collaborative Insights.",
};

export default function QuizPage() {
  return <QuizClient />;
}
