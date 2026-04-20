// Calendly integration with demo-mode fallback.
//
// In production, set CALENDLY_API_KEY + NEXT_PUBLIC_CALENDLY_DISCOVERY_EVENT_TYPE
// and NEXT_PUBLIC_CALENDLY_CONSULT_EVENT_TYPE to pull real availability from
// Calendly's v2 API. Without those, the native calendar renders seeded
// availability (deterministic per date) so the UI is fully interactive in demo.
//
// The final "Confirm" step always deep-links to Calendly's own scheduling page
// with the selected date pre-filled — Calendly handles the form, emails,
// Zoom/calendar invites, and Stripe payment for the $100 consult.

export type SessionType = "discovery" | "consult";

export interface TimeSlot {
  startTime: string; // ISO with offset, e.g. "2026-04-22T14:00:00-04:00"
  displayTime: string; // "2:00 PM"
  hour24: number;
  minute: number;
}

const POTENTIAL_HOURS = [9, 10, 11, 13, 14, 15, 16]; // 9am–4pm skipping noon

function hashString(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function formatDisplayTime(hour24: number, minute: number): string {
  const period = hour24 >= 12 ? "PM" : "AM";
  const hour12 = hour24 === 0 ? 12 : hour24 > 12 ? hour24 - 12 : hour24;
  const mm = minute.toString().padStart(2, "0");
  return `${hour12}:${mm} ${period}`;
}

function isoForDate(dateStr: string, hour24: number, minute: number): string {
  // Return ISO for the date + time in Eastern Time (-04:00 EDT approx).
  // Displayed time uses the client's local timezone via Date().
  const hh = hour24.toString().padStart(2, "0");
  const mm = minute.toString().padStart(2, "0");
  return `${dateStr}T${hh}:${mm}:00-04:00`;
}

export function toDateString(date: Date): string {
  const yyyy = date.getFullYear();
  const mm = (date.getMonth() + 1).toString().padStart(2, "0");
  const dd = date.getDate().toString().padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

export function isDateSelectable(date: Date, today: Date): boolean {
  const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  if (date < startOfToday) return false;
  if (date.getDay() === 0) return false; // Sundays off
  const maxFuture = new Date(startOfToday);
  maxFuture.setDate(maxFuture.getDate() + 90);
  if (date > maxFuture) return false;
  return true;
}

export function getSeededSlots(dateStr: string, sessionType: SessionType): TimeSlot[] {
  const seed = hashString(`${dateStr}-${sessionType}`);
  const slots: TimeSlot[] = [];
  POTENTIAL_HOURS.forEach((h, idx) => {
    const bit = (seed >> idx) & 1;
    if (bit === 1) {
      slots.push({
        startTime: isoForDate(dateStr, h, 0),
        displayTime: formatDisplayTime(h, 0),
        hour24: h,
        minute: 0,
      });
    }
  });
  // Guarantee at least 2 slots so selectable dates never feel broken.
  if (slots.length < 2) {
    [9, 14].forEach((h) => {
      if (!slots.find((s) => s.hour24 === h)) {
        slots.push({
          startTime: isoForDate(dateStr, h, 0),
          displayTime: formatDisplayTime(h, 0),
          hour24: h,
          minute: 0,
        });
      }
    });
    slots.sort((a, b) => a.hour24 - b.hour24);
  }
  return slots;
}

function getEventTypeUri(sessionType: SessionType): string | undefined {
  return sessionType === "discovery"
    ? process.env.NEXT_PUBLIC_CALENDLY_DISCOVERY_EVENT_TYPE
    : process.env.NEXT_PUBLIC_CALENDLY_CONSULT_EVENT_TYPE;
}

async function fetchCalendlyAvailability(
  dateStr: string,
  sessionType: SessionType,
): Promise<TimeSlot[] | null> {
  const apiKey = process.env.CALENDLY_API_KEY;
  const eventTypeUri = getEventTypeUri(sessionType);
  if (!apiKey || !eventTypeUri) return null;

  const startTime = `${dateStr}T00:00:00-04:00`;
  const endTime = `${dateStr}T23:59:59-04:00`;
  const url = `https://api.calendly.com/event_type_available_times?event_type=${encodeURIComponent(eventTypeUri)}&start_time=${encodeURIComponent(startTime)}&end_time=${encodeURIComponent(endTime)}`;

  try {
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${apiKey}` },
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    const data = (await res.json()) as {
      collection: Array<{ start_time: string; status: string }>;
    };
    return data.collection
      .filter((item) => item.status === "available")
      .map((item) => {
        const d = new Date(item.start_time);
        const hour24 = d.getHours();
        const minute = d.getMinutes();
        return {
          startTime: item.start_time,
          displayTime: formatDisplayTime(hour24, minute),
          hour24,
          minute,
        };
      });
  } catch {
    return null;
  }
}

export async function getAvailability(
  dateStr: string,
  sessionType: SessionType,
): Promise<TimeSlot[]> {
  const real = await fetchCalendlyAvailability(dateStr, sessionType);
  if (real && real.length > 0) return real;
  return getSeededSlots(dateStr, sessionType);
}

// Deep-link to Calendly's scheduling page with the selected date pre-filled.
// Calendly honors ?month=YYYY-MM and ?date=YYYY-MM-DD to jump the picker.
export function buildCalendlyDeepLink(
  baseUrl: string,
  dateStr: string,
): string {
  const [yyyy, mm] = dateStr.split("-");
  const params = new URLSearchParams({
    month: `${yyyy}-${mm}`,
    date: dateStr,
  });
  const sep = baseUrl.includes("?") ? "&" : "?";
  return `${baseUrl}${sep}${params.toString()}`;
}
