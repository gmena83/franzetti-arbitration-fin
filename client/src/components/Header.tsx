import { useState } from "react";
import { Link, useLocation } from "wouter";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

const languages = [
  { code: "EN" as const, label: "English" },
  { code: "ES" as const, label: "Español" },
  { code: "PT" as const, label: "Português" },
];

export default function Header() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  const navItems = [
    { label: t("nav.profile"), href: "/" },
    { label: t("nav.expertise"), href: "/cases" },
    { label: t("nav.thoughtLeadership"), href: "/thought-leadership" },
    { label: t("nav.contact"), href: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
      <div className="container">
        {/* Increased header height from h-20 to h-24 for bigger logo */}
        <div className="flex items-center justify-between h-24">
          {/* Logo - Bigger as per client request (h-14 to h-18) */}
          <Link href="/" className="flex-shrink-0">
            <img
              src="/images/Franzetti-principal-dark.png"
              alt="Franzetti Arbitration"
              className="h-20 w-auto"
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

            {/* Language Selector - Now functional */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-sm font-medium tracking-wide text-charcoal hover:text-aquamarine"
                >
                  {language}
                  <ChevronDown className="ml-1 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-white">
                {languages.map((lang) => (
                  <DropdownMenuItem
                    key={lang.code}
                    onClick={() => setLanguage(lang.code)}
                    className={language === lang.code ? "text-aquamarine" : ""}
                  >
                    {lang.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
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
              
              {/* Mobile Language Selector */}
              <div className="flex items-center space-x-4 pt-4 border-t border-gray-100">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => setLanguage(lang.code)}
                    className={`text-sm font-medium ${
                      language === lang.code
                        ? "text-aquamarine"
                        : "text-charcoal"
                    }`}
                  >
                    {lang.code}
                  </button>
                ))}
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
