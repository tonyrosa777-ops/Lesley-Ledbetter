import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM = "Collaborative Insights <hello@send.lesleycollaborativeinsights.com>";
const TO = process.env.CONTACT_TO_EMAIL || "leslie@lesleycollaborativeinsights.com";

const contactSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email().max(200),
  phone: z.string().optional(),
  message: z.string().min(10).max(5000),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = contactSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid form data", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { name, email, phone, message } = parsed.data;

    // Send notification to Leslie
    const notification = await resend.emails.send({
      from: FROM,
      to: TO,
      replyTo: email,
      subject: `New contact from ${name}`,
      html: `
<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; background: #1A1A1A; color: #F5F0EB; padding: 32px; border-radius: 16px;">
  <h2 style="color: #C5A55A; font-size: 22px; margin: 0 0 24px 0;">New Message from the Website</h2>
  <table style="width: 100%; border-collapse: collapse;">
    <tr><td style="padding: 10px 0; color: #B8B0A8; width: 100px;">Name</td><td style="padding: 10px 0;">${escape(name)}</td></tr>
    <tr><td style="padding: 10px 0; color: #B8B0A8;">Email</td><td style="padding: 10px 0;"><a href="mailto:${escape(email)}" style="color: #C5A55A;">${escape(email)}</a></td></tr>
    ${phone ? `<tr><td style="padding: 10px 0; color: #B8B0A8;">Phone</td><td style="padding: 10px 0;">${escape(phone)}</td></tr>` : ""}
  </table>
  <div style="margin-top: 24px; padding-top: 24px; border-top: 1px solid rgba(255,255,255,0.1);">
    <p style="color: #B8B0A8; font-size: 13px; text-transform: uppercase; letter-spacing: 0.1em; margin: 0 0 12px 0;">Message</p>
    <p style="line-height: 1.7; margin: 0; white-space: pre-wrap;">${escape(message)}</p>
  </div>
  <p style="margin-top: 32px; padding-top: 24px; border-top: 1px solid rgba(255,255,255,0.1); color: #7A7470; font-size: 12px;">
    Sent from lesleycollaborativeinsights.com · Reply directly to respond.
  </p>
</div>`,
    });

    if (notification.error) {
      console.error("Resend notification error:", notification.error);
      return NextResponse.json({ error: "Failed to send" }, { status: 500 });
    }

    // Send confirmation to the visitor
    await resend.emails.send({
      from: FROM,
      to: email,
      subject: "I got your message — Collaborative Insights",
      html: `
<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; background: #1A1A1A; color: #F5F0EB; padding: 40px 32px; border-radius: 16px;">
  <h1 style="color: #C5A55A; font-family: Georgia, serif; font-size: 28px; margin: 0 0 24px 0;">Thank you for reaching out, ${escape(name)}.</h1>
  <p style="line-height: 1.7; margin: 0 0 16px 0;">I received your message and I&rsquo;ll get back to you personally within 24 to 48 hours.</p>
  <p style="line-height: 1.7; margin: 0 0 16px 0;">Every message gets read. Every message gets a real reply from me, not an assistant.</p>
  <p style="line-height: 1.7; margin: 0 0 32px 0;">If what you&rsquo;re experiencing feels urgent, feel free to book a free 15-minute discovery call directly:</p>
  <a href="https://lesleycollaborativeinsights.com/booking" style="display: inline-block; background: #C5A55A; color: #0F0F0F; padding: 14px 28px; border-radius: 8px; text-decoration: none; font-weight: 500;">Book a Free Discovery Call</a>
  <p style="margin-top: 40px; line-height: 1.7;">In the meantime, take care of yourself.</p>
  <p style="margin: 8px 0 0 0; font-family: Georgia, serif; color: #C5A55A;">&mdash; Leslie</p>
  <p style="margin-top: 32px; padding-top: 24px; border-top: 1px solid rgba(255,255,255,0.1); color: #7A7470; font-size: 12px;">
    Collaborative Insights · Texas · lesleycollaborativeinsights.com
  </p>
</div>`,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

function escape(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
