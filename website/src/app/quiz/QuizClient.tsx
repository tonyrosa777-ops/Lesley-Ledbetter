"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { quiz } from "@/data/site";
import FadeUp from "@/components/animations/FadeUp";
import FadeIn from "@/components/animations/FadeIn";

const EASE = [0, 0, 0.2, 1] as const;

type Phase = "intro" | "question" | "results";

function scoreQuiz(answers: string[]): string {
  const counts: Record<string, number> = {};
  for (const type of answers) {
    counts[type] = (counts[type] || 0) + 1;
  }
  let maxType = "";
  let maxCount = 0;
  for (const [type, count] of Object.entries(counts)) {
    if (count > maxCount) {
      maxCount = count;
      maxType = type;
    }
  }
  return maxType;
}

export default function QuizClient() {
  const [phase, setPhase] = useState<Phase>("intro");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = back

  const resultType = phase === "results" ? scoreQuiz(answers) : null;
  const result = resultType ? quiz.results[resultType as keyof typeof quiz.results] : null;

  const handleStart = useCallback(() => {
    setPhase("question");
    setQuestionIndex(0);
    setAnswers([]);
    setDirection(1);
  }, []);

  const handleAnswer = useCallback(
    (optionIdx: number, type: string) => {
      if (selectedIndex !== null) return; // prevent double-tap
      setSelectedIndex(optionIdx);

      setTimeout(() => {
        const newAnswers = [...answers];
        newAnswers[questionIndex] = type;
        setAnswers(newAnswers);
        setSelectedIndex(null);
        setDirection(1);

        if (questionIndex < quiz.steps.length - 1) {
          setQuestionIndex((prev) => prev + 1);
        } else {
          setPhase("results");
        }
      }, 400);
    },
    [selectedIndex, answers, questionIndex]
  );

  const handleBack = useCallback(() => {
    if (questionIndex === 0) {
      setPhase("intro");
    } else {
      setDirection(-1);
      setQuestionIndex((prev) => prev - 1);
    }
  }, [questionIndex]);

  const slideVariants = {
    enter: (d: number) => ({
      x: d > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (d: number) => ({
      x: d > 0 ? -300 : 300,
      opacity: 0,
    }),
  };

  return (
    <main className="min-h-screen" style={{ background: "var(--bg-base)" }}>
      <div className="container-page py-16 md:py-24">
        {/* ─── INTRO ─── */}
        {phase === "intro" && (
          <FadeUp>
            <div className="max-w-2xl mx-auto text-center">
              <h1
                className="font-[family-name:var(--font-display)] text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
                style={{ color: "var(--text-primary)" }}
              >
                {quiz.headline}
              </h1>
              <p
                className="text-lg md:text-xl mb-10 leading-relaxed"
                style={{ color: "var(--text-secondary)" }}
              >
                {quiz.subheadline}
              </p>
              <button
                onClick={handleStart}
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium rounded-lg transition-all duration-300 hover:scale-105 cursor-pointer"
                style={{
                  background: "var(--accent)",
                  color: "var(--bg-base)",
                  borderRadius: "var(--button-radius)",
                }}
              >
                Start the Quiz
              </button>
              <p
                className="mt-6 text-sm"
                style={{ color: "var(--text-muted)" }}
              >
                {quiz.steps.length} questions &middot; Takes about 2 minutes
                &middot; No email required
              </p>
            </div>
          </FadeUp>
        )}

        {/* ─── QUESTION ─── */}
        {phase === "question" && (
          <div className="max-w-2xl mx-auto">
            {/* Progress dots */}
            <div className="flex items-center justify-center gap-2 mb-10">
              {quiz.steps.map((_, i) => (
                <div
                  key={i}
                  className="w-2.5 h-2.5 rounded-full transition-all duration-300"
                  style={{
                    background:
                      i <= questionIndex
                        ? "var(--accent)"
                        : "rgba(255,255,255,0.12)",
                    transform: i === questionIndex ? "scale(1.3)" : "scale(1)",
                  }}
                />
              ))}
            </div>

            {/* Back button */}
            <button
              onClick={handleBack}
              className="flex items-center gap-2 mb-6 text-sm transition-colors duration-200 cursor-pointer"
              style={{ color: "var(--text-muted)" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "var(--accent)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "var(--text-muted)")
              }
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M10 12L6 8l4-4" />
              </svg>
              {questionIndex === 0 ? "Back to intro" : "Previous question"}
            </button>

            {/* Question + answers with AnimatePresence */}
            <div className="relative overflow-hidden min-h-[400px]">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={questionIndex}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.35, ease: EASE }}
                >
                  <h2
                    className="font-[family-name:var(--font-display)] text-2xl md:text-3xl font-bold mb-8 text-center"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {quiz.steps[questionIndex].question}
                  </h2>

                  <div className="grid gap-3">
                    {quiz.steps[questionIndex].options.map((option, optIdx) => {
                      const isSelected = selectedIndex === optIdx;
                      const isDimmed =
                        selectedIndex !== null && selectedIndex !== optIdx;

                      return (
                        <motion.button
                          key={optIdx}
                          onClick={() => handleAnswer(optIdx, option.type)}
                          className="w-full text-left p-4 md:p-5 rounded-xl border transition-all duration-200 cursor-pointer"
                          style={{
                            background: isSelected
                              ? "rgba(197, 165, 90, 0.12)"
                              : "var(--bg-card)",
                            borderColor: isSelected
                              ? "var(--accent)"
                              : "var(--bg-card-border)",
                            opacity: isDimmed ? 0.3 : 1,
                            boxShadow: isSelected
                              ? "0 0 20px rgba(197, 165, 90, 0.2)"
                              : "none",
                          }}
                          whileHover={
                            selectedIndex === null
                              ? {
                                  borderColor: "rgba(197, 165, 90, 0.4)",
                                  background: "rgba(255,255,255,0.06)",
                                }
                              : {}
                          }
                          whileTap={
                            selectedIndex === null ? { scale: 0.98 } : {}
                          }
                        >
                          <div className="flex items-center gap-4">
                            <span className="text-2xl flex-shrink-0">
                              {option.emoji}
                            </span>
                            <span
                              className="text-base md:text-lg"
                              style={{
                                color: isSelected
                                  ? "var(--accent)"
                                  : "var(--text-primary)",
                              }}
                            >
                              {option.label}
                            </span>
                          </div>
                        </motion.button>
                      );
                    })}
                  </div>

                  <p
                    className="text-center mt-6 text-sm"
                    style={{ color: "var(--text-muted)" }}
                  >
                    Question {questionIndex + 1} of {quiz.steps.length}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        )}

        {/* ─── RESULTS ─── */}
        {phase === "results" && result && (
          <div className="max-w-3xl mx-auto">
            <FadeUp>
              <div className="text-center mb-12">
                <p
                  className="text-sm uppercase tracking-widest mb-4"
                  style={{ color: "var(--accent)" }}
                >
                  Your Result
                </p>
                <h1
                  className="font-[family-name:var(--font-display)] text-3xl md:text-5xl font-bold mb-4"
                  style={{ color: "var(--text-primary)" }}
                >
                  {result.name}
                </h1>
                <p
                  className="text-lg md:text-xl italic"
                  style={{ color: "var(--accent)" }}
                >
                  {result.tagline}
                </p>
              </div>
            </FadeUp>

            <FadeUp delay={0.15}>
              <div className="space-y-5 mb-12">
                {result.body.map((paragraph, i) => (
                  <p
                    key={i}
                    className="text-base md:text-lg leading-relaxed"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </FadeUp>

            {/* Recommended program card */}
            <FadeUp delay={0.3}>
              <div
                className="rounded-2xl p-6 md:p-8 border mb-12"
                style={{
                  background: "var(--bg-card)",
                  borderColor: "var(--bg-card-border)",
                }}
              >
                <p
                  className="text-sm uppercase tracking-widest mb-3"
                  style={{ color: "var(--accent)" }}
                >
                  Recommended for You
                </p>
                <h3
                  className="font-[family-name:var(--font-display)] text-2xl font-bold mb-3"
                  style={{ color: "var(--text-primary)" }}
                >
                  {result.recommendedProgram.name}
                </h3>
                <p
                  className="mb-6 leading-relaxed"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {result.recommendedProgram.reason}
                </p>
                <Link
                  href={result.recommendedProgram.href}
                  className="inline-flex items-center gap-2 text-base font-medium transition-opacity duration-200 hover:opacity-80"
                  style={{ color: "var(--accent)" }}
                >
                  Learn more about this program
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M7 4l5 5-5 5" />
                  </svg>
                </Link>
              </div>
            </FadeUp>

            {/* Booking CTA section */}
            <FadeUp delay={0.45}>
              <div
                className="rounded-2xl p-8 md:p-12 text-center"
                style={{ background: "var(--bg-elevated)" }}
              >
                <h3
                  className="font-[family-name:var(--font-display)] text-2xl md:text-3xl font-bold mb-4"
                  style={{ color: "var(--text-primary)" }}
                >
                  Ready to Take the Next Step?
                </h3>
                <p
                  className="mb-8 text-base md:text-lg max-w-lg mx-auto"
                  style={{ color: "var(--text-secondary)" }}
                >
                  Book a session and let&rsquo;s explore your spiritual path
                  together. No pressure, no judgment &mdash; just honest
                  guidance from someone who&rsquo;s walked this road.
                </p>
                <Link
                  href="/booking"
                  className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium rounded-lg transition-all duration-300 hover:scale-105"
                  style={{
                    background: "var(--accent)",
                    color: "var(--bg-base)",
                    borderRadius: "var(--button-radius)",
                  }}
                >
                  Book Your Session
                </Link>
              </div>
            </FadeUp>

            {/* Retake */}
            <FadeIn delay={0.6}>
              <div className="text-center mt-8">
                <button
                  onClick={handleStart}
                  className="text-sm transition-colors duration-200 cursor-pointer"
                  style={{ color: "var(--text-muted)" }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "var(--accent)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "var(--text-muted)")
                  }
                >
                  Retake the quiz
                </button>
              </div>
            </FadeIn>
          </div>
        )}
      </div>
    </main>
  );
}
