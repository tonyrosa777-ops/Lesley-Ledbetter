import type { Metadata } from "next";
import { Bodoni_Moda, Jost } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ClientProviders from "@/components/ClientProviders";
import "./globals.css";

const bodoniModa = Bodoni_Moda({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["700", "900"],
  display: "swap",
});

const jost = Jost({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Collaborative Insights — Spiritual Consulting",
  description:
    "Spiritual consulting services by Lesley Ledbetter. Discover clarity, healing, and personal transformation through guided spiritual insight.",
  other: {
    "theme-color": "#0F0F0F",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${bodoniModa.variable} ${jost.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[var(--bg-base)] text-[var(--text-primary)]">
        <ClientProviders>
          <Header />
          <div className="flex-1">{children}</div>
          <Footer />
        </ClientProviders>
      </body>
    </html>
  );
}
