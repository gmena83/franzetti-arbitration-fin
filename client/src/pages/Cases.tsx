import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

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

type CaseItem = {
  text: string;
  categories: string[];
};

const arbitratorAppointments: CaseItem[] = [
  {
    text: "Co-arbitrator in an ICDR arbitration between two multinational companies concerning the purchase of electric vehicle charging equipment governed by the laws of the State of Delaware.",
    categories: ["commercial"],
  },
  {
    text: "Sole arbitrator in an ICDR arbitration between an American company and a Thai company involving a distribution agreement governed by the laws of the State of Maryland.",
    categories: ["commercial"],
  },
  {
    text: "Co-arbitrator in an ICDR arbitration between a food producer in the United States and a Peruvian company concerning a supply contract governed by Peruvian law; seated in Lima.",
    categories: ["commercial"],
  },
  {
    text: "Co-arbitrator in an ICDR arbitration between a Mexican and an American company concerning the sale of an oilfield equipment governed by the laws of the State of Texas.",
    categories: ["commercial"],
  },
  {
    text: "President of an arbitral tribunal in a CAM arbitration between a Brazilian company and a North American company concerning the breach of a distribution agreement governed by the laws of the State of Florida; seated in São Paulo.",
    categories: ["commercial"],
  },
  {
    text: "Co-arbitrator in an ICDR arbitration between a Swiss and an American company concerning the breach of a sales agreement governed by the laws of the State of Florida.",
    categories: ["commercial"],
  },
  {
    text: "Sole arbitrator in an arbitration under the AAA Commercial Rules concerning a claim for breach of a hotel management agreement in the hospitality industry.",
    categories: ["commercial"],
  },
  {
    text: "Sole arbitrator in an arbitration under the AAA Commercial Rules concerning a claim for breach of a franchise agreement in the hospitality industry.",
    categories: ["commercial"],
  },
  {
    text: "Sole arbitrator in an arbitration under the AAA Commercial Rules concerning a claim for breach of a services agreement in the financial services industry.",
    categories: ["commercial"],
  },
  {
    text: "Sole arbitrator in an arbitration under the AAA Commercial Rules concerning a claim for breach of a loan agreement in the financial services industry.",
    categories: ["commercial"],
  },
  {
    text: "Co-arbitrator in an ICDR construction dispute concerning a concession agreement for the development of a highway project in Latin America; seated in Bogotá, proceedings in Spanish.",
    categories: ["construction"],
  },
  {
    text: "Co-arbitrator in an ICDR construction dispute concerning a concession agreement for a large-scale infrastructure project in Latin America; seated in Bogotá, proceedings in Spanish.",
    categories: ["construction"],
  },
  {
    text: "Co-arbitrator in a CAM arbitration concerning the challenge of an arbitrator in a shareholder dispute involving a major oil and gas corporation; proceedings in Portuguese.",
    categories: ["deal-structure"],
  },
];

const mattersAsCounsel: CaseItem[] = [
  {
    text: "Counsel to a Brazilian company in an ICDR arbitration against an American company in connection with a distribution agreement governed by the laws of the State of New York.",
    categories: ["commercial"],
  },
  {
    text: "Advisor to a multinational chemical company in pre-dispute negotiations involving a steam supply agreement governed by the laws of Brazil.",
    categories: ["commercial"],
  },
  {
    text: "Counsel to an American company in an ICDR dispute involving a services agreement governed by the laws of the State of California.",
    categories: ["commercial"],
  },
  {
    text: "Counsel to a logistics multinational company in an ICC arbitration against a Colombian company in connection with a commercial representation agreement governed by the laws of the State of Texas.",
    categories: ["commercial"],
  },
  {
    text: "Counsel to an Argentine firm in an ICDR arbitration against a Chilean gas company in connection with a services agreement governed by Argentine law; seated in Santiago, proceedings in Spanish and English.",
    categories: ["commercial"],
  },
  {
    text: "Advisor to a Brazilian construction company and its American subsidiary regarding a Joint Operating Agreement for the construction of an oil platform in Nigeria.",
    categories: ["construction"],
  },
  {
    text: "Counsel to an American company against a construction Brazilian conglomerate in an ICC arbitration concerning an indemnity agreement governed by the laws of Brazil.",
    categories: ["construction"],
  },
  {
    text: "Counsel to a multinational company in three ICC arbitrations concerning a multibillion-dollar shareholder dispute over the control of a Brazilian company arising out of a share purchase agreement governed by the laws of Brazil; proceedings in Portuguese and English.",
    categories: ["deal-structure"],
  },
  {
    text: "Advisor to a Brazilian company and its American subsidiary regarding a Joint Operating Agreement for the construction of an oil platform in Nigeria.",
    categories: ["deal-structure"],
  },
  {
    text: "Advisor to a Dutch investor on financing and corporate governance issues connected to a joint venture agreement for the development of a startup energy project in a Latin American country.",
    categories: ["deal-structure"],
  },
  {
    text: "Counsel to the Respondent in Croatia v. MOL Hungarian Oil and Gas PLC (PCA Case No. 2014-15), a contractual dispute under the UNCITRAL rules regarding shareholders' rights and the corporate governance of a Croatian oil and gas company, the validity of a gas master agreement, and corruption allegations.",
    categories: ["deal-structure"],
  },
  {
    text: "Counsel to a multinational company against a Greek company in a JAMS arbitration arising out of a share purchase agreement governed by the laws of the State of New York.",
    categories: ["deal-structure"],
  },
  {
    text: "Counsel to Dotgay LLC in a dispute concerning ICANN's internal governance and accountability mechanisms with respect to the assignment of a top-level domain.",
    categories: ["deal-structure"],
  },
  {
    text: "Counsel to Dotmusic LLC in a dispute concerning ICANN's internal governance and accountability mechanisms with respect to the assignment of a top-level domain.",
    categories: ["deal-structure"],
  },
  {
    text: "Counsel to Claimant in Amazon.com, Inc. v. ICANN (ICDR Case No. 01-16-0000-7056) concerning ICANN's internal governance and accountability mechanisms with respect to the assignment of a top-level domain.",
    categories: ["deal-structure"],
  },
  {
    text: "Counsel to Claimant in DotConnectAfrica Trust v. ICANN (ICDR Case No. 50-117-T-1083-13) concerning ICANN's internal governance and accountability mechanisms with respect to the assignment of a top-level domain.",
    categories: ["deal-structure"],
  },
  {
    text: "Counsel to Claimant in ICM Registry v. ICANN (ICDR Case No. 50-117-T-00224-08) concerning ICANN's internal governance and accountability mechanisms with respect to the assignment of a top-level domain.",
    categories: ["deal-structure"],
  },
  {
    text: "Advisor to a Brazilian company and its American subsidiary regarding a Joint Operating Agreement for the construction of an oil platform in Nigeria.",
    categories: ["energy"],
  },
  {
    text: "Advisor to a Dutch investor on financing and corporate governance issues connected to the development of a startup energy project in a Latin American country.",
    categories: ["energy"],
  },
  {
    text: "Advisor to a major oil and gas company regarding an LCIA dispute arising out of a services agreement governed by the laws of the United Kingdom.",
    categories: ["energy"],
  },
  {
    text: "Counsel to a Guinean company in an ICC arbitration arising out of a mining services contract governed by the laws of the United Kingdom.",
    categories: ["energy"],
  },
  {
    text: "Counsel to a state-owned Dominican Republic fund in an ICC arbitration involving the operations of a power company.",
    categories: ["energy"],
  },
  {
    text: "Advisor to Shell's subsidiary BG Overseas Limited with respect to an investment dispute against the Republic of Bolivia under the UK-Bolivia BIT involving regulatory measures affecting operation contracts for the extraction of hydrocarbons in Bolivia.",
    categories: ["energy"],
  },
  {
    text: "Counsel to the Claimant in Gasoducto Sur Peruano S.A. En Liquidación v. Republic of Peru (ICSID Case No. ARB/24/29), a contractual dispute over a gas pipeline project that collapsed in the wake of the Odebrecht corruption scandal.",
    categories: ["energy"],
  },
  {
    text: "Counsel to the Claimant in MOL Hungarian Oil and Gas Company v. Republic of Croatia (ICSID Case No. ARB/13/32), a dispute under the Energy Charter Treaty for measures related to the privatization of a Croatian oil and gas company, the supply of gas, and the criminal prosecution of Claimant's CEO for bribery accusations.",
    categories: ["energy"],
  },
  {
    text: "Counsel to the Respondent in Croatia v. MOL Hungarian Oil and Gas PLC (PCA Case No. 2014-15), a contractual dispute under the UNCITRAL rules regarding shareholders' rights and the corporate governance of a Croatian oil and gas company, the validity of a gas master agreement, and corruption allegations.",
    categories: ["energy"],
  },
  {
    text: "Counsel to the Claimants in Pluspetrol Perú et al. v. Perupetro (ICSID Case No. ARB/12/28), a dispute arising out of a gas supply contract regarding royalty payments and the sale of liquified natural gas (LNG); proceedings in Spanish.",
    categories: ["energy"],
  },
  {
    text: "Counsel to the Claimant in Pac Rim Cayman LLC v. Republic of El Salvador (ICSID Case No. ARB/09/12), a dispute under the Central America-Dominican Republic-United States Free Trade Agreement regarding the government's refusal to issue mining exploitation licenses.",
    categories: ["energy"],
  },
  {
    text: "Counsel to the Respondent in Chevron Overseas Finance GmbH v. The Republic of the Philippines (PCA Case No. 2019-25), a dispute under the Philippines-Switzerland BIT and the UNCITRAL rules involving the Malampaya gas field.",
    categories: ["energy"],
  },
  {
    text: "Advisor to a Canadian investor in the energy sector in Colombia regarding investment treaty protections.",
    categories: ["energy"],
  },
  {
    text: "Advisor to an American landowner in Albania regarding investment protection rights.",
    categories: ["investor-state"],
  },
  {
    text: "Counsel to the Claimant in Quanta Services Netherlands B.V. v. Republic of Peru (ICSID Case No. ARB/21/1), a dispute under the Netherlands-Peru Bilateral Investment Treaty (BIT) arising from measures related to concessions to build and operate fiber-optic networks.",
    categories: ["investor-state"],
  },
  {
    text: "Advisor to Shell's subsidiary BG Overseas Limited with respect to an investment dispute against the Republic of Bolivia under the UK-Bolivia BIT involving regulatory measures affecting operation contracts for the extraction of hydrocarbons in Bolivia.",
    categories: ["investor-state"],
  },
  {
    text: "Counsel to the Claimant in Gasoducto Sur Peruano S.A. En Liquidación v. Republic of Peru (ICSID Case No. ARB/24/29), a contractual dispute over a gas pipeline project that collapsed in the wake of the Odebrecht corruption scandal.",
    categories: ["investor-state"],
  },
  {
    text: "Counsel to the Claimant in MOL Hungarian Oil and Gas Company v. Republic of Croatia (ICSID Case No. ARB/13/32), a dispute under the Energy Charter Treaty for measures related to the privatization of a Croatian oil and gas company, the supply of gas, and the criminal prosecution of Claimant's CEO for bribery accusations.",
    categories: ["investor-state"],
  },
  {
    text: "Counsel to the Respondent in Croatia v. MOL Hungarian Oil and Gas PLC (PCA Case No. 2014-15), a contractual dispute under the UNCITRAL rules regarding shareholders' rights and the corporate governance of a Croatian oil and gas company, the validity of a gas master agreement, and corruption allegations.",
    categories: ["investor-state"],
  },
  {
    text: "Counsel to the Claimants in Pluspetrol Perú et al. v. Perupetro (ICSID Case No. ARB/12/28), a dispute arising out of a gas supply contract regarding royalty payments and the sale of liquified natural gas (LNG); proceedings in Spanish.",
    categories: ["investor-state"],
  },
  {
    text: "Counsel to the Claimant in Pac Rim Cayman LLC v. Republic of El Salvador (ICSID Case No. ARB/09/12), a dispute under the Central America-Dominican Republic-United States Free Trade Agreement regarding the government's refusal to issue mining exploitation licenses.",
    categories: ["investor-state"],
  },
  {
    text: "Counsel to the Respondent in Chevron Overseas Finance GmbH v. The Republic of the Philippines (PCA Case No. 2019-25), a dispute under the Philippines-Switzerland BIT and the UNCITRAL rules involving the Malampaya gas field.",
    categories: ["investor-state"],
  },
  {
    text: "Advisor to a Turkish investor in Turkmenistan regarding investment treaty protections.",
    categories: ["investor-state"],
  },
  {
    text: "Advisor to a Canadian investor in the infrastructure sector in Peru regarding investment treaty protections.",
    categories: ["investor-state"],
  },
  {
    text: "Advisor to a Canadian investor in the energy sector in Colombia regarding investment treaty protections.",
    categories: ["investor-state"],
  },
  {
    text: "Counsel to Petitioner Redes Andinas de Comunicaciones S.R.L. v. Republic of Peru, et al (US District Court for the District of Columbia Civil Action No. 22-3631), a proceeding to recognize and enforce two ICC arbitral awards.",
    categories: ["recognition"],
  },
  {
    text: "Assisted third‑party funders and investment funds on the assessment, valuation, and strategy of investor-State and commercial disputes.",
    categories: ["risk"],
  },
];

// 4 images for the symmetric grid layout
const expertiseImages = [
  "/images/EricaFranzettiWhatsAppImage2025-12-26at14.55.54(1)-2.png",
  "/images/EricaFranzettiWhatsAppImage2025-12-18at19.20.56.png",
  "/images/EricaFranzettiWhatsAppImage2025-12-26at14.55.54(1).png",
  "/images/Erica1WhatsAppImage2025-12-26at14.55.53-topaz-3.png",
];

export default function Cases() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const { language } = useLanguage();

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
    const arbitratorCases = arbitratorAppointments.filter((c) =>
      c.categories.includes(categoryId)
    );
    const counselCases = mattersAsCounsel.filter((c) =>
      c.categories.includes(categoryId)
    );
    return { arbitratorCases, counselCases };
  };

  const getLabel = (matter: typeof subjectMatters[0]) => {
    if (language === "ES") return matter.labelES;
    if (language === "PT") return matter.labelPT;
    return matter.label;
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
              {language === "ES" ? "EXPERIENCIA" : language === "PT" ? "EXPERIÊNCIA" : "EXPERIENCE"}
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {language === "ES" 
                ? "Trayectoria comprobada en diversos sectores y tipos de disputas"
                : language === "PT"
                ? "Trajetória comprovada em diversos setores e tipos de disputas"
                : "Proven track record across diverse sectors and dispute types"}
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
                  className={`hover:text-aquamarine transition-colors font-medium ${
                    activeCategory === matter.id
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
          <p className="text-gray-600 text-center mb-12 max-w-4xl mx-auto">
            {language === "ES"
              ? "Los asuntos descritos a continuación reflejan la experiencia adquirida en firmas de abogados internacionales líderes. A menos que se indique lo contrario, se llevaron a cabo en inglés. Los asuntos seleccionados pueden referenciarse en más de una sección."
              : language === "PT"
              ? "Os assuntos descritos abaixo refletem a experiência adquirida em escritórios de advocacia internacionais líderes. A menos que indicado de outra forma, foram conduzidos em inglês. Os assuntos selecionados podem ser referenciados em mais de uma seção."
              : "The matters below reflect experience gained at leading international law firms. Unless otherwise indicated, they were conducted in English. Selected matters may be referenced in more than one section."}
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
                        <h3 className="text-xl font-semibold text-charcoal mb-4">
                          {language === "ES" ? "Como Árbitro" : language === "PT" ? "Como Árbitro" : "As Arbitrator"}
                        </h3>
                        <ul className="space-y-3">
                          {arbitratorCases.map((item, index) => (
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
                        <h3 className="text-xl font-semibold text-charcoal mb-4">
                          {language === "ES" ? "Como Abogada" : language === "PT" ? "Como Advogada" : "As Counsel"}
                        </h3>
                        <ul className="space-y-3">
                          {counselCases.map((item, index) => (
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
                    {[...arbitratorCases, ...counselCases].map((item, index) => (
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
