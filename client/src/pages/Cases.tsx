import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import siteContent from "@/data/siteContent.json";

/* Expertise Page (formerly Cases) - Franzetti Arbitration
 * Design: Professional Legal Minimalism with client's requested changes
 * - Symmetric grid layout with 4 attached images
 * - Subject matter categories with darker grey separators
 * - Cases organized under subject matter headings
 */

const subjectMatters = [
  { id: "commercial", label: "Commercial Contracts", labelES: "Contratos Comerciales", labelPT: "Contratos Comerciais" },
  { id: "construction", label: "Construction & Infrastructure", labelES: "Construcción e Infraestructura", labelPT: "Construção e Infraestrutura" },
  { id: "deal-structure", label: "Deal Structure, Post-Transaction, Governance & Accountability", labelES: "Estructura de Transacciones, Post-Transacción, Gobernanza y Responsabilidad", labelPT: "Estrutura de Transações, Pós-Transação, Governança e Responsabilidade" },
  { id: "energy", label: "Energy & Natural Resources", labelES: "Energía y Recursos Naturales", labelPT: "Energia e Recursos Naturais" },
  { id: "investor-state", label: "Investor-State Disputes", labelES: "Disputas Inversionista-Estado", labelPT: "Disputas Investidor-Estado" },
  { id: "recognition", label: "Recognition & Enforcement of Arbitral Awards", labelES: "Reconocimiento y Ejecución de Laudos Arbitrales", labelPT: "Reconhecimento e Execução de Sentenças Arbitrais" },
  { id: "risk", label: "Risk Analysis & Case Assessment", labelES: "Análisis de Riesgo y Evaluación de Casos", labelPT: "Análise de Risco e Avaliação de Casos" },
];

export default function Cases() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const { t, getLocalized } = useLanguage();
  const { cases } = siteContent.content;

  // Helper to get localized text for a case item
  const getCaseText = (item: any) => {
    return getLocalized(item.text);
  };

  // SEO Meta Tags
  useEffect(() => {
    document.title = "Experience | Franzetti Arbitration - International Arbitration Cases";

    let metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Explore Erica Franzetti\'s experience in international arbitration including investor-state disputes, energy, infrastructure, construction, and commercial arbitration cases.');
    }

    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute('content', 'arbitration experience, investor-state disputes, energy arbitration, infrastructure disputes, construction arbitration, commercial arbitration, ICSID cases, ICC arbitration');
    }

    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', 'Experience | Franzetti Arbitration');

    let ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) ogDescription.setAttribute('content', 'Explore Erica Franzetti\'s experience in international arbitration including investor-state disputes, energy, infrastructure, and commercial cases.');
  }, []);

  const scrollToSection = (id: string) => {
    setActiveCategory(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const getFilteredCases = (categoryId: string) => {
    const arbitratorCases = cases.arbitratorAppointments
      .filter((c: any) => c.categories.includes(categoryId))
      .map((c: any) => ({ ...c, text: getCaseText(c) }));

    const counselCases = cases.mattersAsCounsel
      .filter((c: any) => c.categories.includes(categoryId))
      .map((c: any) => ({ ...c, text: getCaseText(c) }));

    return { arbitratorCases, counselCases };
  };

  const getLabel = (matter: typeof subjectMatters[0]) => {
    return getLocalized(matter, 'label');
  };

  // Check if section should show role headings (only for commercial, construction, deal-structure)
  const shouldShowRoleHeadings = (categoryId: string) => {
    return ["commercial", "construction", "deal-structure"].includes(categoryId);
  };

  return (
    <div className="bg-white">
      {/* Hero Section with Symmetric Grid of 4 Images */}
      <section className="bg-gray-100 py-16">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl lg:text-5xl font-serif font-semibold text-charcoal mb-4">
              {t("expertise.title").toUpperCase()}
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t("expertise.subtitle")}
            </p>
          </motion.div>

          {/* Subject Matter Navigation - Bigger text, no images */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap justify-center items-center gap-3 text-lg lg:text-xl"
          >
            {subjectMatters.map((matter, index) => (
              <span key={matter.id} className="flex items-center">
                <button
                  onClick={() => scrollToSection(matter.id)}
                  className={`hover:text-aquamarine transition-colors font-medium ${activeCategory === matter.id
                    ? "text-aquamarine"
                    : "text-charcoal"
                    }`}
                >
                  {getLabel(matter)}
                </button>
                {index < subjectMatters.length - 1 && (
                  <span className="mx-3 text-gray-400">|</span>
                )}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Cases by Category - Darker grey separator lines */}
      <section className="py-16 lg:py-24">
        <div className="container">
          {/* Context sentence */}
          <p className="text-gray-600 text-left mb-12 w-full">
            {t("cases.intro")}
          </p>
          {subjectMatters.map((matter) => {
            const { arbitratorCases, counselCases } = getFilteredCases(matter.id);
            if (arbitratorCases.length === 0 && counselCases.length === 0) return null;

            const showRoleHeadings = shouldShowRoleHeadings(matter.id);

            return (
              <motion.div
                key={matter.id}
                id={matter.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="mb-16 scroll-mt-24"
              >
                {/* Darker grey border (border-gray-400 instead of border-gray-200) */}
                <h2 className="text-2xl lg:text-3xl font-serif font-semibold text-charcoal mb-8 pb-2 border-b border-gray-400">
                  {getLabel(matter)}
                </h2>

                {showRoleHeadings ? (
                  <>
                    {arbitratorCases.length > 0 && (
                      <div className="mb-8">
                        <h3 className="text-2xl font-semibold text-charcoal mb-4">
                          {t("section.asArbitrator")}
                        </h3>
                        <ul className="space-y-3">
                          {arbitratorCases.map((item: any, index: number) => (
                            <li key={index} className="flex items-start">
                              <span className="inline-block w-2 h-2 rounded-full bg-aquamarine mt-2 mr-3 flex-shrink-0"></span>
                              <span className="text-gray-700 leading-relaxed">
                                {item.text}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {counselCases.length > 0 && (
                      <div>
                        <h3 className="text-2xl font-semibold text-charcoal mb-4">
                          {t("section.asCounsel")}
                        </h3>
                        <ul className="space-y-3">
                          {counselCases.map((item: any, index: number) => (
                            <li key={index} className="flex items-start">
                              <span className="inline-block w-2 h-2 rounded-full bg-aquamarine mt-2 mr-3 flex-shrink-0"></span>
                              <span className="text-gray-700 leading-relaxed">
                                {item.text}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </>
                ) : (
                  <ul className="space-y-3">
                    {[...arbitratorCases, ...counselCases].map((item: any, index: number) => (
                      <li key={index} className="flex items-start">
                        <span className="inline-block w-2 h-2 rounded-full bg-aquamarine mt-2 mr-3 flex-shrink-0"></span>
                        <span className="text-gray-700 leading-relaxed">
                          {item.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </motion.div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

