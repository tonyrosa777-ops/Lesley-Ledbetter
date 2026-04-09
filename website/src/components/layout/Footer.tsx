"use client";

import Link from "next/link";
import { siteConfig, footer } from "@/data/site";

export default function Footer() {
  return (
    <footer
      className="border-t"
      style={{
        backgroundColor: "var(--bg-base)",
        borderColor: "rgba(255,255,255,0.05)",
      }}
    >
      <div className="max-w-[var(--container-max)] mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <h3
              className="font-display font-bold text-xl mb-3"
              style={{ color: "var(--text-primary)" }}
            >
              {siteConfig.name}
            </h3>
            <p
              className="text-sm max-w-sm leading-relaxed"
              style={{ color: "var(--text-secondary)" }}
            >
              {footer.tagline || "Grounded spiritual guidance for people navigating awakening."}
            </p>
          </div>

          {/* Company Links */}
          <div>
            <h4
              className="font-body font-medium text-xs uppercase tracking-widest mb-4"
              style={{ color: "var(--text-muted)" }}
            >
              Company
            </h4>
            <ul className="space-y-3">
              {footer.links.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm font-body transition-colors hover:text-[var(--text-primary)]"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resource Links */}
          <div>
            <h4
              className="font-body font-medium text-xs uppercase tracking-widest mb-4"
              style={{ color: "var(--text-muted)" }}
            >
              Resources
            </h4>
            <ul className="space-y-3">
              {footer.links.resources.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm font-body transition-colors hover:text-[var(--text-primary)]"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="mt-12 pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4"
          style={{ borderColor: "rgba(255,255,255,0.05)" }}
        >
          <p className="text-xs" style={{ color: "var(--text-muted)" }}>
            {footer.copyright}
          </p>
          <p className="text-xs" style={{ color: "var(--text-muted)" }}>
            Built by{" "}
            <a
              href="https://optimusbusinesssolutions.com"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-[var(--accent)]"
              style={{ color: "var(--text-secondary)" }}
            >
              Optimus Business Solutions
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
