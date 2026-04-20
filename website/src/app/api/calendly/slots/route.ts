import { NextResponse } from "next/server";
import { getAvailability, type SessionType } from "@/lib/calendly";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const date = searchParams.get("date");
  const type = searchParams.get("type") as SessionType | null;

  if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return NextResponse.json(
      { error: "Invalid or missing `date` (expected YYYY-MM-DD)" },
      { status: 400 },
    );
  }
  if (type !== "discovery" && type !== "consult") {
    return NextResponse.json(
      { error: "Invalid or missing `type` (expected 'discovery' or 'consult')" },
      { status: 400 },
    );
  }

  const slots = await getAvailability(date, type);
  return NextResponse.json({ date, type, slots });
}
