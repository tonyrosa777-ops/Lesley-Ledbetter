import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM = "Collaborative Insights <hello@send.lesleycollaborativeinsights.com>";
const TO = process.env.CONTACT_TO_EMAIL || "lrledbetter50@gmail.com";

const schema = z.object({
  email: z.string().email().max(200),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    const { email } = parsed.data;

    // Notify Leslie of new subscriber
    await resend.emails.send({
      from: FROM,
      to: TO,
      subject: `New newsletter subscriber: ${email}`,
      html: `<div style="font-family: sans-serif; padding: 24px;"><p>New subscriber to the Collaborative Insights newsletter:</p><p><strong>${escape(email)}</strong></p></div>`,
    });

    // Welcome email to subscriber
    await resend.emails.send({
      from: FROM,
      to: email,
      subject: "Welcome to Collaborative Insights",
      html: `
<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; background: #1A1A1A; color: #F5F0EB; padding: 40px 32px; border-radius: 16px;">
  <h1 style="color: #C5A55A; font-family: Georgia, serif; font-size: 28px; margin: 0 0 24px 0;">Welcome, friend.</h1>
  <p style="line-height: 1.7; margin: 0 0 16px 0;">You just subscribed to the Collaborative Insights newsletter. Thank you for trusting me with your inbox.</p>
  <p style="line-height: 1.7; margin: 0 0 16px 0;">Here&rsquo;s what to expect:</p>
  <ul style="line-height: 1.9; margin: 0 0 24px 0; padding-left: 20px;">
    <li>Short, honest reflections on awakening and the path</li>
    <li>New articles when I publish them</li>
    <li>No spam. No fluff. No pressure to buy anything.</li>
  </ul>
  <p style="line-height: 1.7; margin: 0 0 32px 0;">If you&rsquo;re ready to talk, the first call is always free:</p>
  <a href="https://lesleycollaborativeinsights.com/booking" style="display: inline-block; background: #C5A55A; color: #0F0F0F; padding: 14px 28px; border-radius: 8px; text-decoration: none; font-weight: 500;">Book a Free Discovery Call</a>
  <p style="margin-top: 40px; line-height: 1.7;">Take care of yourself.</p>
  <p style="margin: 8px 0 0 0; font-family: Georgia, serif; color: #C5A55A;">&mdash; Leslie</p>
  <p style="margin-top: 32px; padding-top: 24px; border-top: 1px solid rgba(255,255,255,0.1); color: #7A7470; font-size: 12px;">
    Collaborative Insights · Texas · lesleycollaborativeinsights.com
  </p>
</div>`,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Newsletter API error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

function escape(s: string): string {
  return s.replace(/[&<>"']/g, (c) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  }[c]!));
}
