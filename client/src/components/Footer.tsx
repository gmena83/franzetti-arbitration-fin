import { Link } from "wouter";
import { Mail, Phone } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useEffect, useState } from "react";

/* Footer Component - Franzetti Arbitration
 * Design: Professional Legal Minimalism with client's requested changes
 * - Gray background (#888888)
 * - White logo version matching header logo size and position
 * - Links to other pages
 * - CV downloads (EN, EN-Mini) and V-Card
 * - Correct LinkedIn URL
 * - Email and phone icons
 * - Disclaimer, Privacy Policy, Cookies Policy
 */

import siteContent from "@/data/siteContent.json";

type CvLinks = {
  english?: string;
  englishMini?: string;
  spanish?: string;
  spanishMini?: string;
  portuguese?: string;
  portugueseMini?: string;
  vcard?: string;
};

/* Resume/CV download state - Franzetti Arbitration
 * Client decision (2026-09-18): the corrected ENGLISH CV ("Franzetti Curriculum
 * Vitae Sept. 2026 (EN)") is published and downloadable again.
 *
 * The other five variants are still the superseded versions and stay
 * visible-but-inert until corrected files are supplied. Specifically:
 *   - Franzetti-CV-Spanish.pdf / Franzetti-CV-Portuguese.pdf and their minis
 *     still carry the old King & Spalding end date ("Dic./Dez. 2025", corrected
 *     to "Jan. 2026") and the old "Washington, DC" spelling.
 *   - Franzetti-Mini-CV-English.pdf carries no firm dates, but it still spells
 *     Georgetown's location "Washington, DC" and still lists the University of
 *     Miami teaching period as "2025-2026" (corrected to "2024-2025").
 *
 * Each hidden variant also has a matching 404 redirect for its direct URL in
 * netlify.toml, because the files are still shipped in the build output.
 *
 * To restore a variant: set its flag to `true` AND delete its redirect block.
 */
const CV_DOWNLOAD_ENABLED: Record<string, boolean> = {
  english: true,
  englishMini: false,
  spanish: false,
  spanishMini: false,
  portuguese: false,
  portugueseMini: false,
};

export default function Footer() {
  const { t, language } = useLanguage();

  // Load CV links directly from bundled JSON
  // This avoids runtime fetch issues and 404s
  const cv = siteContent.cv;

  const { contactInfo } = siteContent.content;

  const navLinks = [
    { label: t("nav.profile"), href: "/" },
    { label: t("nav.expertise"), href: "/cases" },
    { label: t("nav.thoughtLeadership"), href: "/thought-leadership" },
    { label: t("nav.contact"), href: "/contact" },
  ];

  const cvDownloads = [
    { key: "english", href: cv?.english, label: "Full CV (EN)" },
    { key: "englishMini", href: cv?.englishMini, label: "One-page CV (EN)" },
    { key: "spanish", href: cv?.spanish, label: "CV Completo (ES)" },
    { key: "spanishMini", href: cv?.spanishMini, label: "One-page CV (ES)" },
    { key: "portuguese", href: cv?.portuguese, label: "CV Completo (PT)" },
    { key: "portugueseMini", href: cv?.portugueseMini, label: "One-page CV (PT)" },
  ].filter((item) => Boolean(item.href?.trim()));

  const hasAnyCv = cvDownloads.length > 0;
  const hasHiddenCv = cvDownloads.some((item) => !CV_DOWNLOAD_ENABLED[item.key]);

  const hasVcard = Boolean(cv?.vcard?.trim());

  return (
    <footer className="bg-black text-white">
      {/* Logo section matching header height and positioning */}
      <div className="container">
        <div className="flex items-center h-36 border-b border-gray-600">
          {/* Logo - Same size as header (h-[6.75rem]) and same position (left-aligned) */}
          <Link href="/" className="flex-shrink-0">
            <img
              src="/images/Franzetti-principal-white.png"
              alt="Franzetti Arbitration"
              className="h-[6.75rem] w-auto"
            />
          </Link>
        </div>
      </div>

      <div className="container py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          <div className="lg:col-span-1">

            {/* CV Downloads (from CMS) */}
            {hasAnyCv && (
              <div>
                <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-300 mb-4">
                  {t("footer.downloadCV")}
                </h4>
                <div className="flex flex-col gap-3">
                  {/* CV Links - Vertical Stack */}
                  <div className="flex flex-col gap-2 text-sm">
                    {cvDownloads.map((item) =>
                      CV_DOWNLOAD_ENABLED[item.key] ? (
                        <a key={item.label} href={item.href} download className="text-gray-200 hover:text-aquamarine transition-colors underline">
                          {item.label}
                        </a>
                      ) : (
                        <span
                          key={item.label}
                          aria-disabled="true"
                          title={t("footer.cvUnavailable")}
                          className="text-gray-500 cursor-not-allowed select-none"
                        >
                          {item.label}
                        </span>
                      )
                    )}
                  </div>
                  {hasHiddenCv && (
                    <p className="text-xs text-gray-400 max-w-xs">
                      {t("footer.cvUnavailable")}
                    </p>
                  )}
                </div>
              </div>
            )}

          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-300 mb-4">
              {language === "ES" ? "Navegación" : language === "PT" ? "Navegação" : "Navigation"}
            </h4>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-200 hover:text-aquamarine transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Social - with icons */}
          <div className="lg:col-span-2">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-300 mb-4">
              {language === "ES" ? "Conectar" : language === "PT" ? "Conectar" : "Connect"}
            </h4>
            <div className="space-y-3">
              {/* LinkedIn Personal Profile */}
              <a
                href={contactInfo.linkedinPersonal}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-200 hover:text-aquamarine transition-colors text-sm"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                LinkedIn (Personal Profile)
              </a>
              {/* LinkedIn Business Profile */}
              <a
                href={contactInfo.linkedinCompany}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-200 hover:text-aquamarine transition-colors text-sm"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                LinkedIn (Business Profile)
              </a>
              {/* Email with icon */}
              <a
                href={`mailto:${contactInfo.email}`}
                className="flex items-center gap-2 text-gray-200 hover:text-aquamarine transition-colors text-sm"
              >
                <Mail className="w-5 h-5" />
                {contactInfo.email}
              </a>
              {/* Phone with icon */}
              <a
                href={`tel:${contactInfo.phone.replace(/\s+/g, '')}`}
                className="flex items-center gap-2 text-gray-200 hover:text-aquamarine transition-colors text-sm"
              >
                <Phone className="w-5 h-5" />
                {contactInfo.phone}
              </a>
              {/* V-Card Download - Moved to Connect section */}
              {hasVcard && (
                <a
                  href={cv?.vcard}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-200 hover:text-aquamarine transition-colors text-sm"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 3c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm7 13H5v-.23c0-.62.28-1.2.76-1.58C7.47 15.82 9.64 15 12 15s4.53.82 6.24 2.19c.48.38.76.97.76 1.58V19z" />
                  </svg>
                  {t("footer.vcard")}
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-600">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-300 text-sm">
              © {new Date().getFullYear()} Franzetti Arbitration. {t("footer.rights")}
            </p>
            <div className="flex flex-wrap items-center gap-4 text-sm">
              <Link
                href="/disclaimer"
                className="text-gray-300 hover:text-aquamarine transition-colors"
              >
                {t("footer.disclaimer")}
              </Link>
              <span className="text-gray-500">|</span>
              <Link
                href="/privacy-policy"
                className="text-gray-300 hover:text-aquamarine transition-colors"
              >
                {t("footer.privacy")}
              </Link>
              <span className="text-gray-500">|</span>
              <Link
                href="/cookies-policy"
                className="text-gray-300 hover:text-aquamarine transition-colors"
              >
                {t("footer.cookies")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}