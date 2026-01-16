import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import SearchBar from "@/components/SearchBar";

export default function Header() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t } = useLanguage();

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
                className={`text-sm font-medium tracking-wide transition-colors hover:text-aquamarine ${
                  location === item.href
                    ? "text-aquamarine"
                    : "text-charcoal"
                }`}
              >
                {item.label}
              </Link>
            ))}
            
            {/* Search Bar */}
            <SearchBar />
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
                  className={`text-sm font-medium tracking-wide transition-colors hover:text-aquamarine ${
                    location === item.href
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
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
