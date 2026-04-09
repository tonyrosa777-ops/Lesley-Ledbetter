"use client";

import { useState, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FadeUp from "@/components/animations/FadeUp";
import FadeIn from "@/components/animations/FadeIn";

const EASE = [0, 0, 0.2, 1] as const;

const ALL_TIMES = [
  "9:00 AM",
  "10:30 AM",
  "12:00 PM",
  "1:30 PM",
  "3:00 PM",
  "4:30 PM",
];

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function getSeededSlots(year: number, month: number, day: number): string[] {
  const hash = (year * 400 + month * 31 + day) % 10;
  // Map hash to deterministic slot selection
  return ALL_TIMES.filter((_, i) => {
    const slotHash = (hash + i * 3) % 7;
    return slotHash < 4; // ~57% of slots available on average
  });
}

function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfWeek(year: number, month: number): number {
  return new Date(year, month, 1).getDay();
}

type BookingStep = "calendar" | "time" | "form" | "success";

export default function BookingClient() {
  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [step, setStep] = useState<BookingStep>("calendar");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const daysInMonth = useMemo(
    () => getDaysInMonth(viewYear, viewMonth),
    [viewYear, viewMonth]
  );
  const firstDay = useMemo(
    () => getFirstDayOfWeek(viewYear, viewMonth),
    [viewYear, viewMonth]
  );

  const availableSlots = useMemo(() => {
    if (selectedDate === null) return [];
    return getSeededSlots(viewYear, viewMonth, selectedDate);
  }, [viewYear, viewMonth, selectedDate]);

  const handlePrevMonth = useCallback(() => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear((y) => y - 1);
    } else {
      setViewMonth((m) => m - 1);
    }
    setSelectedDate(null);
    setSelectedTime(null);
    setStep("calendar");
  }, [viewMonth]);

  const handleNextMonth = useCallback(() => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear((y) => y + 1);
    } else {
      setViewMonth((m) => m + 1);
    }
    setSelectedDate(null);
    setSelectedTime(null);
    setStep("calendar");
  }, [viewMonth]);

  const handleDateClick = useCallback((day: number) => {
    setSelectedDate(day);
    setSelectedTime(null);
    setStep("time");
  }, []);

  const handleTimeClick = useCallback((time: string) => {
    setSelectedTime(time);
    setStep("form");
  }, []);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (formData.name && formData.email && formData.phone) {
        setStep("success");
      }
    },
    [formData]
  );

  const handleReset = useCallback(() => {
    setSelectedDate(null);
    setSelectedTime(null);
    setStep("calendar");
    setFormData({ name: "", email: "", phone: "" });
  }, []);

  const isPast = (day: number) => {
    const d = new Date(viewYear, viewMonth, day);
    const t = new Date();
    t.setHours(0, 0, 0, 0);
    return d < t;
  };

  const isToday = (day: number) => {
    return (
      viewYear === today.getFullYear() &&
      viewMonth === today.getMonth() &&
      day === today.getDate()
    );
  };

  // Weekend check — no Saturday/Sunday bookings
  const isWeekend = (day: number) => {
    const d = new Date(viewYear, viewMonth, day).getDay();
    return d === 0 || d === 6;
  };

  const formattedDate = selectedDate
    ? `${MONTHS[viewMonth]} ${selectedDate}, ${viewYear}`
    : "";

  return (
    <main className="min-h-screen" style={{ background: "var(--bg-base)" }}>
      <div className="container-page py-16 md:py-24">
        <FadeUp>
          <div className="text-center mb-12">
            <h1
              className="hero-shimmer font-[family-name:var(--font-display)] text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
            >
              Book Your Session
            </h1>
            <p
              className="text-lg max-w-xl mx-auto"
              style={{ color: "var(--text-secondary)" }}
            >
              Choose a date and time that works for you. All sessions are
              conducted via Zoom.
            </p>
          </div>
        </FadeUp>

        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-[1fr_320px] gap-8">
            {/* ─── CALENDAR ─── */}
            <FadeUp delay={0.1}>
              <div
                className="rounded-2xl border p-6"
                style={{
                  background: "var(--bg-card)",
                  borderColor: "var(--bg-card-border)",
                }}
              >
                {/* Month nav */}
                <div className="flex items-center justify-between mb-6">
                  <button
                    onClick={handlePrevMonth}
                    className="p-2 rounded-lg transition-colors duration-200 cursor-pointer"
                    style={{ color: "var(--text-secondary)" }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = "var(--accent)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = "var(--text-secondary)")
                    }
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M12 15l-5-5 5-5" />
                    </svg>
                  </button>
                  <h2
                    className="font-[family-name:var(--font-display)] text-xl font-bold"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {MONTHS[viewMonth]} {viewYear}
                  </h2>
                  <button
                    onClick={handleNextMonth}
                    className="p-2 rounded-lg transition-colors duration-200 cursor-pointer"
                    style={{ color: "var(--text-secondary)" }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = "var(--accent)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = "var(--text-secondary)")
                    }
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M8 5l5 5-5 5" />
                    </svg>
                  </button>
                </div>

                {/* Day headers */}
                <div className="grid grid-cols-7 gap-1 mb-2">
                  {DAYS.map((d) => (
                    <div
                      key={d}
                      className="text-center text-xs font-medium py-2"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {d}
                    </div>
                  ))}
                </div>

                {/* Day grid */}
                <div className="grid grid-cols-7 gap-1">
                  {/* Empty cells for offset */}
                  {Array.from({ length: firstDay }).map((_, i) => (
                    <div key={`empty-${i}`} />
                  ))}

                  {Array.from({ length: daysInMonth }).map((_, i) => {
                    const day = i + 1;
                    const past = isPast(day);
                    const weekend = isWeekend(day);
                    const disabled = past || weekend;
                    const isSelected = selectedDate === day;
                    const todayMark = isToday(day);

                    return (
                      <button
                        key={day}
                        onClick={() => !disabled && handleDateClick(day)}
                        disabled={disabled}
                        className="relative aspect-square flex items-center justify-center rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer disabled:cursor-not-allowed"
                        style={{
                          background: isSelected
                            ? "var(--accent)"
                            : "transparent",
                          color: isSelected
                            ? "var(--bg-base)"
                            : disabled
                              ? "var(--text-muted)"
                              : "var(--text-primary)",
                          opacity: disabled ? 0.35 : 1,
                          border: todayMark && !isSelected
                            ? "1px solid var(--accent)"
                            : "1px solid transparent",
                        }}
                        onMouseEnter={(e) => {
                          if (!disabled && !isSelected) {
                            e.currentTarget.style.background =
                              "rgba(197, 165, 90, 0.15)";
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (!disabled && !isSelected) {
                            e.currentTarget.style.background = "transparent";
                          }
                        }}
                      >
                        {day}
                      </button>
                    );
                  })}
                </div>

                <div
                  className="mt-4 flex items-center gap-4 text-xs"
                  style={{ color: "var(--text-muted)" }}
                >
                  <span className="flex items-center gap-1.5">
                    <span
                      className="w-3 h-3 rounded-sm border"
                      style={{ borderColor: "var(--accent)" }}
                    />
                    Today
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span
                      className="w-3 h-3 rounded-sm"
                      style={{ background: "var(--accent)" }}
                    />
                    Selected
                  </span>
                </div>
              </div>
            </FadeUp>

            {/* ─── SIDE PANEL ─── */}
            <div>
              <AnimatePresence mode="wait">
                {/* Time slots */}
                {step === "time" && selectedDate !== null && (
                  <motion.div
                    key="time-panel"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3, ease: EASE }}
                    className="rounded-2xl border p-6"
                    style={{
                      background: "var(--bg-card)",
                      borderColor: "var(--bg-card-border)",
                    }}
                  >
                    <h3
                      className="font-[family-name:var(--font-display)] text-lg font-bold mb-1"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {formattedDate}
                    </h3>
                    <p
                      className="text-sm mb-5"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {availableSlots.length} time{availableSlots.length !== 1 ? "s" : ""} available
                    </p>

                    {availableSlots.length > 0 ? (
                      <div className="grid gap-2">
                        {availableSlots.map((time) => (
                          <button
                            key={time}
                            onClick={() => handleTimeClick(time)}
                            className="w-full py-3 px-4 rounded-lg border text-sm font-medium transition-all duration-200 cursor-pointer"
                            style={{
                              background: "transparent",
                              borderColor: "var(--bg-card-border)",
                              color: "var(--text-primary)",
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.borderColor = "var(--accent)";
                              e.currentTarget.style.background =
                                "rgba(197, 165, 90, 0.08)";
                              e.currentTarget.style.color = "var(--accent)";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.borderColor =
                                "var(--bg-card-border)";
                              e.currentTarget.style.background = "transparent";
                              e.currentTarget.style.color = "var(--text-primary)";
                            }}
                          >
                            {time}
                          </button>
                        ))}
                      </div>
                    ) : (
                      <p
                        className="text-sm"
                        style={{ color: "var(--text-muted)" }}
                      >
                        No availability on this date. Please select another day.
                      </p>
                    )}
                  </motion.div>
                )}

                {/* Confirm form */}
                {step === "form" && (
                  <motion.div
                    key="form-panel"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3, ease: EASE }}
                    className="rounded-2xl border p-6"
                    style={{
                      background: "var(--bg-card)",
                      borderColor: "var(--bg-card-border)",
                    }}
                  >
                    <h3
                      className="font-[family-name:var(--font-display)] text-lg font-bold mb-1"
                      style={{ color: "var(--text-primary)" }}
                    >
                      Confirm Your Booking
                    </h3>
                    <p
                      className="text-sm mb-5"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {formattedDate} at {selectedTime}
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <label
                          className="block text-xs font-medium mb-1.5"
                          style={{ color: "var(--text-secondary)" }}
                        >
                          Full Name
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) =>
                            setFormData((f) => ({ ...f, name: e.target.value }))
                          }
                          className="w-full px-4 py-2.5 rounded-lg border text-sm outline-none transition-colors duration-200"
                          style={{
                            background: "var(--bg-base)",
                            borderColor: "var(--bg-card-border)",
                            color: "var(--text-primary)",
                          }}
                          onFocus={(e) =>
                            (e.currentTarget.style.borderColor = "var(--accent)")
                          }
                          onBlur={(e) =>
                            (e.currentTarget.style.borderColor =
                              "var(--bg-card-border)")
                          }
                        />
                      </div>
                      <div>
                        <label
                          className="block text-xs font-medium mb-1.5"
                          style={{ color: "var(--text-secondary)" }}
                        >
                          Email
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) =>
                            setFormData((f) => ({
                              ...f,
                              email: e.target.value,
                            }))
                          }
                          className="w-full px-4 py-2.5 rounded-lg border text-sm outline-none transition-colors duration-200"
                          style={{
                            background: "var(--bg-base)",
                            borderColor: "var(--bg-card-border)",
                            color: "var(--text-primary)",
                          }}
                          onFocus={(e) =>
                            (e.currentTarget.style.borderColor = "var(--accent)")
                          }
                          onBlur={(e) =>
                            (e.currentTarget.style.borderColor =
                              "var(--bg-card-border)")
                          }
                        />
                      </div>
                      <div>
                        <label
                          className="block text-xs font-medium mb-1.5"
                          style={{ color: "var(--text-secondary)" }}
                        >
                          Phone
                        </label>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) =>
                            setFormData((f) => ({
                              ...f,
                              phone: e.target.value,
                            }))
                          }
                          className="w-full px-4 py-2.5 rounded-lg border text-sm outline-none transition-colors duration-200"
                          style={{
                            background: "var(--bg-base)",
                            borderColor: "var(--bg-card-border)",
                            color: "var(--text-primary)",
                          }}
                          onFocus={(e) =>
                            (e.currentTarget.style.borderColor = "var(--accent)")
                          }
                          onBlur={(e) =>
                            (e.currentTarget.style.borderColor =
                              "var(--bg-card-border)")
                          }
                        />
                      </div>

                      <div className="flex gap-3 pt-2">
                        <button
                          type="button"
                          onClick={() => setStep("time")}
                          className="flex-1 py-2.5 rounded-lg border text-sm font-medium transition-colors duration-200 cursor-pointer"
                          style={{
                            borderColor: "var(--bg-card-border)",
                            color: "var(--text-secondary)",
                            background: "transparent",
                          }}
                          onMouseEnter={(e) =>
                            (e.currentTarget.style.borderColor = "var(--accent)")
                          }
                          onMouseLeave={(e) =>
                            (e.currentTarget.style.borderColor =
                              "var(--bg-card-border)")
                          }
                        >
                          Back
                        </button>
                        <button
                          type="submit"
                          className="flex-1 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-[1.02] cursor-pointer"
                          style={{
                            background: "var(--accent)",
                            color: "var(--bg-base)",
                          }}
                        >
                          Confirm Booking
                        </button>
                      </div>
                    </form>
                  </motion.div>
                )}

                {/* Success */}
                {step === "success" && (
                  <motion.div
                    key="success-panel"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, ease: EASE }}
                    className="rounded-2xl border p-6 text-center"
                    style={{
                      background: "var(--bg-card)",
                      borderColor: "var(--accent)",
                    }}
                  >
                    <div
                      className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                      style={{ background: "rgba(197, 165, 90, 0.15)" }}
                    >
                      <svg
                        width="32"
                        height="32"
                        viewBox="0 0 32 32"
                        fill="none"
                        stroke="var(--accent)"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M8 16l5 5 11-11" />
                      </svg>
                    </div>
                    <h3
                      className="font-[family-name:var(--font-display)] text-xl font-bold mb-2"
                      style={{ color: "var(--text-primary)" }}
                    >
                      Your session is booked!
                    </h3>
                    <p
                      className="text-sm mb-1"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {formattedDate} at {selectedTime}
                    </p>
                    <p
                      className="text-sm mb-6"
                      style={{ color: "var(--text-muted)" }}
                    >
                      A confirmation email will be sent to {formData.email}
                    </p>
                    <button
                      onClick={handleReset}
                      className="text-sm transition-colors duration-200 cursor-pointer"
                      style={{ color: "var(--accent)" }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.opacity = "0.7")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.opacity = "1")
                      }
                    >
                      Book another session
                    </button>
                  </motion.div>
                )}

                {/* Placeholder when no date selected */}
                {step === "calendar" && (
                  <motion.div
                    key="placeholder-panel"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="rounded-2xl border p-6 flex items-center justify-center min-h-[200px]"
                    style={{
                      background: "var(--bg-card)",
                      borderColor: "var(--bg-card-border)",
                    }}
                  >
                    <p
                      className="text-sm text-center"
                      style={{ color: "var(--text-muted)" }}
                    >
                      Select a date to see available times
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
