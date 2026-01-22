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
  vcard?: string;
};

export default function Footer() {
  const { t, language } = useLanguage();

  const [cv, setCv] = useState<CvLinks | null>(null);

  useEffect(() => {
    // Load CV links from CMS-managed JSON in public
    fetch("/cv/cv.json", { cache: "no-cache" })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data && typeof data === "object") {
          setCv({
            english: data.english || undefined,
            englishMini: data.englishMini || undefined,
            vcard: data.vcard || undefined,
          });
        }
      })
      .catch(() => {
        // fail silently; footer will just not render CV links
        setCv(null);
      });
  }, []);

  const { contactInfo } = siteContent.content;

  const navLinks = [
    { label: t("nav.profile"), href: "/" },
    { label: t("nav.expertise"), href: "/cases" },
    { label: t("nav.thoughtLeadership"), href: "/thought-leadership" },
    { label: t("nav.contact"), href: "/contact" },
  ];

  const hasAnyCv =
    Boolean(cv?.english?.trim()) ||
    Boolean(cv?.englishMini?.trim());

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
          {/* Description */}
          <div className="lg:col-span-1">
            <p className="text-gray-200 text-sm leading-relaxed">
              {language === "ES"
                ? "Servicios de arbitraje internacional y asesoría enfocados en disputas comerciales e inversionista-Estado."
                : language === "PT"
                  ? "Serviços de arbitragem internacional e consultoria focados em disputas comerciais e investidor-Estado."
                  : "International arbitration and counsel services focused on commercial and investor-state disputes."}
            </p>

            {/* CV Downloads (from CMS) */}
            {hasAnyCv && (
              <div className="mt-4">
                <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-300 mb-2">
                  {t("footer.downloadCV")}
                </h4>
                <div className="flex flex-col gap-2">
                  {/* English CV */}
                  {cv?.english && (
                    <a
                      href={cv.english}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-200 hover:text-aquamarine transition-colors text-sm underline"
                    >
                      {t("footer.cvEnglish")}
                    </a>
                  )}

                  {/* English Mini CV */}
                  {cv?.englishMini && (
                    <a
                      href={cv.englishMini}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-200 hover:text-aquamarine transition-colors text-sm underline"
                    >
                      {t("footer.cvEnglishMini")}
                    </a>
                  )}
                </div>
              </div>
            )}

            {/* V-Card Download */}
            {hasVcard && (
              <div className="mt-4">
                <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-300 mb-2">
                  {t("footer.downloadVCard")}
                </h4>
                <a
                  href={cv.vcard}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-200 hover:text-aquamarine transition-colors text-sm underline"
                >
                  {t("footer.vcard")}
                </a>
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