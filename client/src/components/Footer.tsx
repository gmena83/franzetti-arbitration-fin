import { Link } from "wouter";
import { Mail, Phone } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

/* Footer Component - Franzetti Arbitration
 * Design: Professional Legal Minimalism with client's requested changes
 * - Black background (not navy blue)
 * - White logo version (larger)
 * - Links to other pages
 * - CV downloads (EN, ES, PT) - reordered
 * - Correct LinkedIn URL
 * - Email and phone icons
 * - Disclaimer, Privacy Policy, Cookies Policy
 */

export default function Footer() {
  const { t, language } = useLanguage();
  
  const navLinks = [
    { label: t("nav.profile"), href: "/" },
    { label: t("nav.expertise"), href: "/cases" },
    { label: t("nav.thoughtLeadership"), href: "/thought-leadership" },
    { label: t("nav.contact"), href: "/contact" },
  ];

  // CV links reordered: English, Spanish, Portuguese
  const cvLinks = [
    { label: "CV (English)", href: "/cv/Franzetti-CV-English.pdf" },
    { label: "CV (Español)", href: "/cv/Franzetti-CV-Spanish.pdf" },
    { label: "CV (Português)", href: "/cv/Franzetti-CV-Portuguese.pdf" },
  ];

  return (
    <footer className="bg-slate-800 text-white">
      <div className="container py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Logo and Description - Bigger logo (h-20 instead of h-16) */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-6">
              <img
                src="/images/Franzetti-principal-white.png"
                alt="Franzetti Arbitration"
                className="h-20 w-auto"
              />
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              {language === "ES" 
                ? "Servicios de arbitraje internacional y asesoría enfocados en disputas comerciales e inversionista-Estado."
                : language === "PT"
                ? "Serviços de arbitragem internacional e consultoria focados em disputas comerciais e investidor-Estado."
                : "International arbitration and counsel services focused on commercial and investor-state disputes."}
            </p>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-4">
              {language === "ES" ? "Navegación" : language === "PT" ? "Navegação" : "Navigation"}
            </h4>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-aquamarine transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CV Downloads - Reordered: EN, ES, PT */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-4">
              {t("footer.downloadCV")}
            </h4>
            <ul className="space-y-2">
              {cvLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    download
                    className="text-gray-300 hover:text-aquamarine transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Social - with icons */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-4">
              {language === "ES" ? "Conectar" : language === "PT" ? "Conectar" : "Connect"}
            </h4>
            <div className="space-y-3">
              {/* LinkedIn - Correct URL */}
              <a
                href="https://www.linkedin.com/in/erica-franzetti-48a7b1a/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-300 hover:text-aquamarine transition-colors text-sm"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                LinkedIn
              </a>
              {/* Email with icon */}
              <a
                href="mailto:efranzetti@franzettiarb.com"
                className="flex items-center gap-2 text-gray-300 hover:text-aquamarine transition-colors text-sm"
              >
                <Mail className="w-5 h-5" />
                efranzetti@franzettiarb.com
              </a>
              {/* Phone with icon */}
              <a
                href="tel:+12027448469"
                className="flex items-center gap-2 text-gray-300 hover:text-aquamarine transition-colors text-sm"
              >
                <Phone className="w-5 h-5" />
                +1 202 744 8469
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} Franzetti Arbitration. {t("footer.rights")}
            </p>
            <div className="flex flex-wrap items-center gap-4 text-sm">
              <Link
                href="/disclaimer"
                className="text-gray-400 hover:text-aquamarine transition-colors"
              >
                {t("footer.disclaimer")}
              </Link>
              <span className="text-gray-600">|</span>
              <Link
                href="/privacy-policy"
                className="text-gray-400 hover:text-aquamarine transition-colors"
              >
                {t("footer.privacy")}
              </Link>
              <span className="text-gray-600">|</span>
              <Link
                href="/cookies-policy"
                className="text-gray-400 hover:text-aquamarine transition-colors"
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
