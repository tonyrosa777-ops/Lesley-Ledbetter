"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { InlineWidget } from "react-calendly";
import {
  buildCalendlyDeepLink,
  isDateSelectable,
  toDateString,
  type SessionType,
  type TimeSlot,
} from "@/lib/calendly";

type Phase = "picker" | "booking";

const WEEKDAYS = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
const MONTH_NAMES = [
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

function buildMonthGrid(year: number, month: number): (Date | null)[] {
  const firstOfMonth = new Date(year, month, 1);
  const firstDayOfWeek = firstOfMonth.getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: (Date | null)[] = [];
  for (let i = 0; i < firstDayOfWeek; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(year, month, d));
  while (cells.length % 7 !== 0) cells.push(null);
  return cells;
}

interface Props {
  sessionType: SessionType;
  bookingUrl: string;
}

export default function BookingCalendar({ sessionType, bookingUrl }: Props) {
  const today = useMemo(() => new Date(), []);
  const [phase, setPhase] = useState<Phase>("picker");
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [slots, setSlots] = useState<TimeSlot[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);

  // Reset state when the user switches session types
  useEffect(() => {
    setPhase("picker");
    setSelectedDate(null);
    setSelectedSlot(null);
    setSlots([]);
  }, [sessionType]);

  // Fetch slots when a date is picked
  useEffect(() => {
    if (!selectedDate) return;
    const dateStr = toDateString(selectedDate);
    setLoadingSlots(true);
    setSelectedSlot(null);
    fetch(`/api/calendly/slots?date=${dateStr}&type=${sessionType}`)
      .then((r) => r.json())
      .then((data: { slots: TimeSlot[] }) => {
        setSlots(data.slots || []);
      })
      .catch(() => setSlots([]))
      .finally(() => setLoadingSlots(false));
  }, [selectedDate, sessionType]);

  const gridCells = useMemo(
    () => buildMonthGrid(viewYear, viewMonth),
    [viewYear, viewMonth],
  );

  const canGoPrev = useMemo(() => {
    const firstOfThisView = new Date(viewYear, viewMonth, 1);
    const firstOfThisMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    return firstOfThisView > firstOfThisMonth;
  }, [viewYear, viewMonth, today]);

  const canGoNext = useMemo(() => {
    const firstOfThisView = new Date(viewYear, viewMonth, 1);
    const maxFuture = new Date(today.getFullYear(), today.getMonth() + 3, 1);
    return firstOfThisView < maxFuture;
  }, [viewYear, viewMonth, today]);

  const goPrev = () => {
    if (!canGoPrev) return;
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear(viewYear - 1);
    } else {
      setViewMonth(viewMonth - 1);
    }
  };
  const goNext = () => {
    if (!canGoNext) return;
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear(viewYear + 1);
    } else {
      setViewMonth(viewMonth + 1);
    }
  };

  const handleConfirm = () => {
    if (!selectedDate || !selectedSlot) return;
    setPhase("booking");
  };

  const deepLinkUrl = useMemo(() => {
    if (!selectedDate) return bookingUrl;
    return buildCalendlyDeepLink(bookingUrl, toDateString(selectedDate));
  }, [bookingUrl, selectedDate]);

  if (phase === "booking" && selectedDate && selectedSlot) {
    return (
      <div
        className="rounded-2xl border overflow-hidden"
        style={{
          backgroundColor: "#1A1A1A",
          borderColor: "var(--bg-card-border)",
        }}
      >
        <div
          className="flex items-center justify-between px-6 py-4 border-b"
          style={{
            borderColor: "var(--bg-card-border)",
            backgroundColor: "var(--bg-card)",
          }}
        >
          <button
            onClick={() => setPhase("picker")}
            className="flex items-center gap-2 text-sm font-body font-medium transition-colors hover:brightness-110"
            style={{ color: "var(--accent)" }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M9 2L4 7l5 5"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Change date
          </button>
          <p
            className="text-xs font-body"
            style={{ color: "var(--text-secondary)" }}
          >
            You picked{" "}
            <span style={{ color: "var(--text-primary)" }}>
              {selectedDate.toLocaleDateString("en-US", {
                weekday: "short",
                month: "short",
                day: "numeric",
              })}
            </span>{" "}
            at{" "}
            <span style={{ color: "var(--text-primary)" }}>
              {selectedSlot.displayTime}
            </span>{" "}
            — finish the booking below.
          </p>
        </div>
        <InlineWidget
          key={deepLinkUrl}
          url={deepLinkUrl}
          styles={{ height: "760px", width: "100%" }}
          pageSettings={{
            backgroundColor: "1A1A1A",
            primaryColor: "C5A55A",
            textColor: "C5A55A",
            hideGdprBanner: true,
          }}
        />
      </div>
    );
  }

  return (
    <div
      className="rounded-2xl border overflow-hidden"
      style={{
        backgroundColor: "var(--bg-card)",
        borderColor: "var(--bg-card-border)",
      }}
    >
      <div className="grid grid-cols-1 md:grid-cols-[1fr_1.2fr] gap-0">
        {/* Left pane: month grid */}
        <div
          className="p-6 md:p-8 border-b md:border-b-0 md:border-r"
          style={{ borderColor: "var(--bg-card-border)" }}
        >
          <div className="flex items-center justify-between mb-5">
            <button
              onClick={goPrev}
              disabled={!canGoPrev}
              aria-label="Previous month"
              className="w-9 h-9 rounded-full flex items-center justify-center transition-all disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[rgba(197,165,90,0.12)]"
              style={{ color: "var(--accent)" }}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <h3
              className="font-display text-lg font-semibold"
              style={{ color: "var(--text-primary)" }}
            >
              {MONTH_NAMES[viewMonth]} {viewYear}
            </h3>
            <button
              onClick={goNext}
              disabled={!canGoNext}
              aria-label="Next month"
              className="w-9 h-9 rounded-full flex items-center justify-center transition-all disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[rgba(197,165,90,0.12)]"
              style={{ color: "var(--accent)" }}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M5 2l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          <div className="grid grid-cols-7 gap-1 mb-2">
            {WEEKDAYS.map((wd) => (
              <div
                key={wd}
                className="text-center text-[10px] font-body font-semibold tracking-wider"
                style={{ color: "var(--text-muted)" }}
              >
                {wd}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {gridCells.map((cell, i) => {
              if (!cell) return <div key={i} className="aspect-square" />;
              const selectable = isDateSelectable(cell, today);
              const isSelected =
                selectedDate != null &&
                selectedDate.toDateString() === cell.toDateString();
              const isToday = cell.toDateString() === today.toDateString();

              return (
                <button
                  key={i}
                  disabled={!selectable}
                  onClick={() => setSelectedDate(cell)}
                  className="aspect-square rounded-full text-sm font-body font-medium transition-all relative"
                  style={{
                    backgroundColor: isSelected
                      ? "var(--accent)"
                      : selectable
                        ? "rgba(197,165,90,0.08)"
                        : "transparent",
                    color: isSelected
                      ? "#0F0F0F"
                      : selectable
                        ? "var(--accent)"
                        : "var(--text-muted)",
                    cursor: selectable ? "pointer" : "not-allowed",
                    opacity: selectable ? 1 : 0.35,
                  }}
                >
                  {cell.getDate()}
                  {isToday && !isSelected && (
                    <span
                      className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                      style={{ backgroundColor: "var(--accent)" }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          <p
            className="mt-5 text-xs font-body"
            style={{ color: "var(--text-muted)" }}
          >
            All times shown in Eastern Time. Sundays unavailable.
          </p>
        </div>

        {/* Right pane: slots / confirm */}
        <div className="p-6 md:p-8">
          {!selectedDate ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12">
              <span className="text-4xl mb-4" aria-hidden>🗓️</span>
              <p
                className="font-display text-lg font-semibold mb-2"
                style={{ color: "var(--text-primary)" }}
              >
                Pick a date
              </p>
              <p
                className="text-sm font-body max-w-xs"
                style={{ color: "var(--text-secondary)" }}
              >
                Select an available day on the left to see open time slots.
              </p>
            </div>
          ) : (
            <>
              <p
                className="text-xs uppercase tracking-widest font-body font-semibold mb-2"
                style={{ color: "var(--accent)" }}
              >
                {selectedDate.toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              <h4
                className="font-display text-lg font-semibold mb-5"
                style={{ color: "var(--text-primary)" }}
              >
                Choose a time
              </h4>

              {loadingSlots ? (
                <div
                  className="text-sm font-body"
                  style={{ color: "var(--text-muted)" }}
                >
                  Loading availability…
                </div>
              ) : slots.length === 0 ? (
                <div
                  className="text-sm font-body"
                  style={{ color: "var(--text-muted)" }}
                >
                  No times available on this day. Try another date.
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  {slots.map((slot) => {
                    const active = selectedSlot?.startTime === slot.startTime;
                    return (
                      <button
                        key={slot.startTime}
                        onClick={() => setSelectedSlot(slot)}
                        className="py-3 rounded-lg text-sm font-body font-medium transition-all border"
                        style={{
                          backgroundColor: active
                            ? "var(--accent)"
                            : "transparent",
                          color: active ? "#0F0F0F" : "var(--accent)",
                          borderColor: active
                            ? "var(--accent)"
                            : "rgba(197,165,90,0.35)",
                        }}
                      >
                        {slot.displayTime}
                      </button>
                    );
                  })}
                </div>
              )}

              <AnimatePresence>
                {selectedSlot && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 4 }}
                    transition={{ duration: 0.25, ease: [0, 0, 0.2, 1] }}
                    className="mt-6 pt-6 border-t"
                    style={{ borderColor: "var(--bg-card-border)" }}
                  >
                    <p
                      className="text-sm font-body mb-4"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      Confirm{" "}
                      <span style={{ color: "var(--text-primary)" }}>
                        {selectedSlot.displayTime}
                      </span>{" "}
                      on{" "}
                      <span style={{ color: "var(--text-primary)" }}>
                        {selectedDate.toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                      . Continue below to enter your details and finish the
                      booking.
                    </p>
                    <button
                      onClick={handleConfirm}
                      className="w-full py-3 rounded-lg font-body font-semibold text-sm transition-all hover:brightness-110"
                      style={{
                        backgroundColor: "var(--accent)",
                        color: "#0F0F0F",
                      }}
                    >
                      Continue to booking →
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
