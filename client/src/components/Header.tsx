import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, ChevronDown } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import SearchBar from "@/components/SearchBar";

export default function Header() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const { t, language, setLanguage } = useLanguage();

  // Scroll to top when location changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location]);

  const navItems = [
    { label: t("nav.profile"), href: "/" },
    { label: t("nav.expertise"), href: "/cases" },
    { label: t("nav.thoughtLeadership"), href: "/thought-leadership" },
    { label: t("nav.contact"), href: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
      <div className="container">
        {/* Increased header height for bigger logo - logo should occupy ~70% of header height */}
        <div className="flex items-center justify-between h-36">
          {/* Logo - Bigger as per client request - ~70% of header height */}
          <Link href="/" className="flex-shrink-0">
            <img
              src="/images/Franzetti-principal-dark.png"
              alt="Franzetti Arbitration"
              className="h-[6.75rem] w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium tracking-wide transition-colors hover:text-aquamarine ${location === item.href
                  ? "text-aquamarine"
                  : "text-charcoal"
                  }`}
              >
                {item.label}
              </Link>
            ))}

            {/* Search Bar */}
            <SearchBar />

            {/* Language Dropdown */}
            <div className="relative">
              <button
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center gap-1 text-sm font-medium text-charcoal hover:text-aquamarine transition-colors"
              >
                {language}
                <ChevronDown className={`h-4 w-4 transition-transform ${langDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              {langDropdownOpen && (
                <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                  <button
                    onClick={() => { setLanguage("EN"); setLangDropdownOpen(false); }}
                    className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-50 ${language === "EN" ? "text-aquamarine font-medium" : "text-charcoal"}`}
                  >
                    English
                  </button>
                  <button
                    onClick={() => { setLanguage("ES"); setLangDropdownOpen(false); }}
                    className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-50 ${language === "ES" ? "text-aquamarine font-medium" : "text-charcoal"}`}
                  >
                    Español
                  </button>
                  <button
                    onClick={() => { setLanguage("PT"); setLangDropdownOpen(false); }}
                    className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-50 ${language === "PT" ? "text-aquamarine font-medium" : "text-charcoal"}`}
                  >
                    Português
                  </button>
                </div>
              )}
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-charcoal"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="lg:hidden py-4 border-t border-gray-100">
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-sm font-medium tracking-wide transition-colors hover:text-aquamarine ${location === item.href
                    ? "text-aquamarine"
                    : "text-charcoal"
                    }`}
                >
                  {item.label}
                </Link>
              ))}

              {/* Mobile Search Bar */}
              <div className="pt-2 border-t border-gray-100 mt-2">
                <SearchBar />
              </div>

              {/* Mobile Language Selector */}
              <div className="pt-2 border-t border-gray-100 mt-2 flex gap-4">
                <button
                  onClick={() => { setLanguage("EN"); setMobileMenuOpen(false); }}
                  className={`text-sm font-medium ${language === "EN" ? "text-aquamarine" : "text-charcoal"}`}
                >
                  EN
                </button>
                <button
                  onClick={() => { setLanguage("ES"); setMobileMenuOpen(false); }}
                  className={`text-sm font-medium ${language === "ES" ? "text-aquamarine" : "text-charcoal"}`}
                >
                  ES
                </button>
                <button
                  onClick={() => { setLanguage("PT"); setMobileMenuOpen(false); }}
                  className={`text-sm font-medium ${language === "PT" ? "text-aquamarine" : "text-charcoal"}`}
                >
                  PT
                </button>
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
