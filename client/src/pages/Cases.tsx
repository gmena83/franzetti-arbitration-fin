import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

/* Expertise Page - Franzetti Arbitration
 * Design: Professional Legal Minimalism
 * Updated with new content structure from client
 */

const subjectMatters = [
  { id: "commercial-contracts", label: "Commercial Contracts", labelES: "Contratos Comerciales", labelPT: "Contratos Comerciais" },
  { id: "construction-infrastructure", label: "Construction & Infrastructure", labelES: "Construcción e Infraestructura", labelPT: "Construção e Infraestrutura" },
  { id: "deal-structure", label: "Deal-Structure, Post-Transaction, Governance and Accountability", labelES: "Estructura de Transacciones, Post-Transacción, Gobernanza y Responsabilidad", labelPT: "Estrutura de Transações, Pós-Transação, Governança e Responsabilidade" },
  { id: "energy-natural-resources", label: "Energy and Natural Resources", labelES: "Energía y Recursos Naturales", labelPT: "Energia e Recursos Naturais" },
  { id: "investor-state", label: "Investor-State Disputes", labelES: "Disputas Inversionista-Estado", labelPT: "Disputas Investidor-Estado" },
  { id: "recognition-enforcement", label: "Recognition and Enforcement of Arbitral Awards", labelES: "Reconocimiento y Ejecución de Laudos Arbitrales", labelPT: "Reconhecimento e Execução de Sentenças Arbitrais" },
  { id: "risk-analysis", label: "Risk Analysis and Case Assessment", labelES: "Análisis de Riesgo y Evaluación de Casos", labelPT: "Análise de Risco e Avaliação de Casos" },
];

const commercialContractsArbitrator = [
  "Co-arbitrator in an ICDR arbitration between two multinational companies concerning the purchase of electric vehicle charging equipment governed by the laws of Delaware",
  "Sole arbitrator in an ICDR arbitration between an American company and a Thai company involving a distribution agreement governed by the laws of the State of Maryland.",
  "Co-arbitrator in an ICDR arbitration between a food producer in the United States and a Peruvian company concerning a supply contract governed by Peruvian law.",
  "Co-arbitrator in an ICDR arbitration between a Mexican and an American company concerning the sale of an oilfield equipment governed by the laws of the State of Texas.",
  "President of an arbitral tribunal in a CAM arbitration between a Brazilian company and a North American company concerning the breach of a distribution agreement governed by the laws of the State of Florida (CAM).",
  "Co-arbitrator in an ICDR arbitration between a Swiss and an American company concerning the breach of a sales agreement governed by the laws of the State of Florida.",
  "Sole arbitrator in several arbitrations under the AAA Commercial Rules involving claims for breach of contract in the hospitality industry.",
  "Sole arbitrator in several arbitrations under the AAA Commercial Rules involving claims for breach of contract in the financial services industries",
];

const commercialContractsCounsel = [
  "Represented a Brazilian company in an ICDR arbitration against an American company in connection with a distribution agreement governed by New York Law.",
  "Advised a multinational chemical company in pre-dispute negotiations involving a steam supply agreement governed by the laws of Brazil.",
  "Represented an American company in an ICDR dispute involving a services agreement governed by the laws of California.",
  "Represented a logistics multinational company in an ICC arbitration against a Colombian company in connection with a commercial representation agreement governed by the laws of the State of Texas.",
  "Represented an Argentinean firm in an ICDR arbitration against a Chilean gas company in connection with a services agreement governed by Argentine law.",
];

const constructionInfrastructureArbitrator = [
  "Co-arbitrator in an ICDR construction dispute involving a concession agreement for the development of a highway project in a Latin American State",
  "Co-arbitrator in an ICDR construction dispute involving a concession agreement for the development of an infrastructure project in Latin America.",
];

const constructionInfrastructureCounsel = [
  "Advising a Brazilian construction company and its American subsidiary regarding a Joint Operating Agreement for the construction of an oil platform in Nigeria.",
  "Represented an American company against a construction Brazilian conglomerate in an ICC arbitration concerning an indemnity agreement governed by the laws of Brazil.",
];

const dealStructureArbitrator = [
  "Co-arbitrator in a CAM arbitration involving a corporate dispute related to a major oil company in Brazil.",
];

const dealStructureCounsel = [
  "Represented a multinational company in three ICC arbitrations concerning a multibillion-dollar shareholder dispute over the control of a Brazilian company arising out of a share purchase agreement governed by the laws of Brazil.",
  "Advising a Brazilian company and its American subsidiary regarding a Joint Operating Agreement for the construction of an oil platform in Nigeria.",
  "Advising a Dutch investor on financing and corporate governance issues connected to a joint venture agreement for the development of a startup energy project in a Latin American country.",
  "Represented the Respondent in Croatia v. MOL Hungarian Oil and Gas PLC (PCA Case No. 2014-15), a contractual dispute under the UNCITRAL rules regarding shareholder's rights and the corporate governance of a Croatian oil and gas company, the validity of a gas master agreement, and corruption allegations.",
  "Represented a multinational company against a Greek company in a JAMS arbitration arising out of a share purchase agreement governed by the laws of the State of New York.",
  "Represented Claimant in Afilias plc. v. ICANN (ICDR) in dispute concerning ICANN's internal governance and accountability mechanisms with respect to the assignment of a top-level domain.",
  "Represented Dotgay LLC in a dispute concerning ICANN's internal governance and accountability mechanisms with respect to the assignment of a top-level domain.",
  "Represented Dotmusic LLC in a dispute concerning ICANN's internal governance and accountability mechanisms with respect to the assignment of a top-level domain.",
  "Represented Claimant in Amazon.com, Inc. v. ICANN (ICDR) concerning ICANN's internal governance and accountability mechanisms with respect to the assignment of a top-level domain.",
  "Represented Claimant in DotConnectAfrica Trust v. ICANN (ICDR) concerning ICANN's internal governance and accountability mechanisms with respect to the assignment of a top-level domain.",
  "Represented Claimant in ICM Registry v. ICANN (ICDR) concerning ICANN's internal governance and accountability mechanisms with respect to the assignment of a top-level domain.",
];

const energyNaturalResourcesCounsel = [
  "Advising a Brazilian company and its American subsidiary regarding a Joint Operating Agreement for the construction of an oil platform in Nigeria.",
  "Advising a Dutch investor on financing and corporate governance issues connected to the development of a startup energy project in a Latin American country.",
  "Represented a Guinean company in an ICC arbitration arising out of a mining services contract governed by the laws of the United Kingdom.",
  "Represented a state-owned Dominican Republic fund in an ICC arbitration involving the operations of a power company.",
  "Advised Shell's subsidiary BG Overseas Limited with respect to an investment dispute against the Republic of Bolivia under the UK-Bolivia BIT involving regulatory measures affecting operation contracts for the extraction of hydrocarbons in Bolivia.",
  "Represented the Claimant in Gasoducto Sur Peruano S.A. En Liquidación v. Republic of Peru (ICSID Case No. ARB/24/29), a contractual dispute over a gas pipeline project that collapsed in the wake of the Odebrecht corruption scandal.",
  "Represented the Claimant in MOL Hungarian Oil and Gas Company v. Republic of Croatia (ICSID Case No. ARB /13/32), a dispute under the Energy Charter Treaty for measures related to the privatization of a Croatian oil and gas company, the supply of gas, and the criminal prosecution of Claimant's CEO for bribery accusations.",
  "Represented the Respondent in Croatia v. MOL Hungarian Oil and Gas PLC (PCA Case No. 2014-15), a contractual dispute under the UNCITRAL rules regarding shareholder's rights and the corporate governance of a Croatian oil and gas company, the validity of a gas master agreement, and corruption allegations.",
  "Represented the Claimants in Pluspetrol Perú et al v Perúpetro (ICSID Case No. ARB/12/28), a dispute arising out of a gas supply contract regarding royalty payments and the sale of liquified natural gas (LNG).",
  "Represented the Claimant in Pac Rim Cayman LLC v. Republic of El Salvador (ICSID Case No. ARB/09/12), a dispute under the Central America-Dominican Republic-Unites States Free Trade Agreement regarding the government's refusal to issue mining exploitation licenses.",
  "Represented the Respondent in Chevron Overseas Finance GmbH v. The Republic of the Philippines (PCA Case No. 2019-25), a dispute under the Philippines-Switzerland BIT and the UNCITRAL rules involving the Malampaya gas field.",
  "Advised a Canadian investor in the energy sector in Colombia regarding investment treaty protections.",
];

const investorStateCounsel = [
  "Advising an American landowner in Albania regarding investment protection rights.",
  "Representing the Claimant in Quanta Services Netherlands B.V. v. Republic of Peru (ICSID CASE No. ARB/21/1), a dispute under the Netherlands-Peru Bilateral Investment Treaty (BIT) arising from measures related to concessions to build and operate fiber-optic networks.",
  "Advised Shell's subsidiary BG Overseas Limited with respect to an investment dispute against the Republic of Bolivia under the UK-Bolivia BIT involving regulatory measures affecting operation contracts for the extraction of hydrocarbons in Bolivia.",
  "Represented the Claimant in Gasoducto Sur Peruano S.A. En Liquidación v. Republic of Peru (ICSID Case No. ARB/24/29), a contractual dispute over a gas pipeline project that collapsed in the wake of the Odebrecht corruption scandal.",
  "Represented the Claimant in MOL Hungarian Oil and Gas Company v. Republic of Croatia (ICSID Case No. ARB /13/32), a dispute under the Energy Charter Treaty for measures related to the privatization of a Croatian oil and gas company, the supply of gas, and the criminal prosecution of Claimant's CEO for bribery accusations.",
  "Represented the Respondent in Croatia v. MOL Hungarian Oil and Gas PLC (PCA Case No. 2014-15), a contractual dispute under the UNCITRAL rules regarding shareholder's rights and the corporate governance of a Croatian oil and gas company, the validity of a gas master agreement, and corruption allegations.",
  "Represented the Claimants in Pluspetrol Perú et al v Perúpetro (ICSID Case No. ARB/12/28), a dispute arising out of a gas supply contract regarding royalty payments and the sale of liquified natural gas (LNG).",
  "Represented the Claimant in Pac Rim Cayman LLC v. Republic of El Salvador (ICSID Case No. ARB/09/12), a dispute under the Central America-Dominican Republic-Unites States Free Trade Agreement regarding the government's refusal to issue mining exploitation licenses.",
  "Represented the Respondent in Chevron Overseas Finance GmbH v. The Republic of the Philippines (PCA Case No. 2019-25), a dispute under the Philippines-Switzerland BIT and the UNCITRAL rules involving the Malampaya gas field.",
  "Advised a Turkish investor in Turkmenistan regarding investment treaties protections.",
  "Advised a Canadian investor in the infrastructure sector in Peru regarding investment treaty protections.",
  "Advised a Canadian investor in the energy sector in Colombia regarding investment treaty protections",
];

const recognitionEnforcement = [
  "Representing Petitioner Redes Andinas de Comunicaciones S.R.L. v. Republic of Peru, et al (US District Court for the District of Columbia Civil Action No. 11-3631), a proceeding to recognize and enforce two ICC arbitral awards.",
];

const riskAnalysis = [
  "Assisted third party funders and investment funds on the assessment, valuation, and strategy of investment and commercial disputes.",
];

export default function Cases() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const { language } = useLanguage();

  // SEO Meta Tags
  useEffect(() => {
    document.title = "Expertise | Franzetti Arbitration - International Arbitration Cases";
    
    let metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Explore Erica Franzetti\'s expertise in international arbitration including investor-state disputes, energy, infrastructure, construction, and commercial arbitration cases.');
    }
    
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute('content', 'arbitration expertise, investor-state disputes, energy arbitration, infrastructure disputes, construction arbitration, commercial arbitration, ICSID cases, ICC arbitration');
    }
    
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', 'Expertise | Franzetti Arbitration');
    
    let ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) ogDescription.setAttribute('content', 'Explore Erica Franzetti\'s expertise in international arbitration including investor-state disputes, energy, infrastructure, and commercial cases.');
  }, []);

  const scrollToSection = (id: string) => {
    setActiveCategory(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const getLabel = (matter: typeof subjectMatters[0]) => {
    if (language === "ES") return matter.labelES;
    if (language === "PT") return matter.labelPT;
    return matter.label;
  };

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-gray-100 py-16">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl lg:text-5xl font-serif font-semibold text-charcoal mb-4">
              {language === "ES" ? "EXPERIENCIA" : language === "PT" ? "EXPERIÊNCIA" : "EXPERTISE"}
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {language === "ES" 
                ? "Experiencia especializada en diversas industrias y tipos de disputas"
                : language === "PT"
                ? "Experiência especializada em diversas indústrias e tipos de disputas"
                : "Specialized experience across industries and dispute types"}
            </p>
          </motion.div>

          {/* Subject Matter Navigation */}
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

      {/* Cases by Category */}
      <section className="py-16 lg:py-24">
        <div className="container">
          {/* Commercial Contracts */}
          <motion.div
            id="commercial-contracts"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16 scroll-mt-24"
          >
            <h2 className="text-2xl lg:text-3xl font-serif font-semibold text-charcoal mb-8 pb-2 border-b border-gray-400">
              {language === "ES" ? "Contratos Comerciales" : language === "PT" ? "Contratos Comerciais" : "Commercial Contracts"}
            </h2>

            <div className="mb-8">
              <h3 className="text-lg font-semibold text-charcoal mb-4">
                {language === "ES" ? "Como Árbitro" : language === "PT" ? "Como Árbitro" : "As Arbitrator"}
              </h3>
              <ul className="space-y-3">
                {commercialContractsArbitrator.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="inline-block w-2 h-2 rounded-full bg-aquamarine mt-2 mr-3 flex-shrink-0"></span>
                    <span className="text-gray-700 leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-charcoal mb-4">
                {language === "ES" ? "Como Abogada" : language === "PT" ? "Como Advogada" : "As Counsel"}
              </h3>
              <ul className="space-y-3">
                {commercialContractsCounsel.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="inline-block w-2 h-2 rounded-full bg-aquamarine mt-2 mr-3 flex-shrink-0"></span>
                    <span className="text-gray-700 leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Construction & Infrastructure */}
          <motion.div
            id="construction-infrastructure"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16 scroll-mt-24"
          >
            <h2 className="text-2xl lg:text-3xl font-serif font-semibold text-charcoal mb-8 pb-2 border-b border-gray-400">
              {language === "ES" ? "Construcción e Infraestructura" : language === "PT" ? "Construção e Infraestrutura" : "Construction & Infrastructure"}
            </h2>

            <div className="mb-8">
              <h3 className="text-lg font-semibold text-charcoal mb-4">
                {language === "ES" ? "Como Árbitro" : language === "PT" ? "Como Árbitro" : "As Arbitrator"}
              </h3>
              <ul className="space-y-3">
                {constructionInfrastructureArbitrator.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="inline-block w-2 h-2 rounded-full bg-aquamarine mt-2 mr-3 flex-shrink-0"></span>
                    <span className="text-gray-700 leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-charcoal mb-4">
                {language === "ES" ? "Como Abogada" : language === "PT" ? "Como Advogada" : "As Counsel"}
              </h3>
              <ul className="space-y-3">
                {constructionInfrastructureCounsel.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="inline-block w-2 h-2 rounded-full bg-aquamarine mt-2 mr-3 flex-shrink-0"></span>
                    <span className="text-gray-700 leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Deal-Structure, Post-Transaction, Governance and Accountability */}
          <motion.div
            id="deal-structure"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16 scroll-mt-24"
          >
            <h2 className="text-2xl lg:text-3xl font-serif font-semibold text-charcoal mb-8 pb-2 border-b border-gray-400">
              {language === "ES" ? "Estructura de Transacciones, Post-Transacción, Gobernanza y Responsabilidad" : language === "PT" ? "Estrutura de Transações, Pós-Transação, Governança e Responsabilidade" : "Deal-Structure, Post-Transaction, Governance and Accountability"}
            </h2>

            <div className="mb-8">
              <h3 className="text-lg font-semibold text-charcoal mb-4">
                {language === "ES" ? "Como Árbitro" : language === "PT" ? "Como Árbitro" : "As Arbitrator"}
              </h3>
              <ul className="space-y-3">
                {dealStructureArbitrator.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="inline-block w-2 h-2 rounded-full bg-aquamarine mt-2 mr-3 flex-shrink-0"></span>
                    <span className="text-gray-700 leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-charcoal mb-4">
                {language === "ES" ? "Como Abogada" : language === "PT" ? "Como Advogada" : "As Counsel"}
              </h3>
              <ul className="space-y-3">
                {dealStructureCounsel.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="inline-block w-2 h-2 rounded-full bg-aquamarine mt-2 mr-3 flex-shrink-0"></span>
                    <span className="text-gray-700 leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Energy and Natural Resources */}
          <motion.div
            id="energy-natural-resources"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16 scroll-mt-24"
          >
            <h2 className="text-2xl lg:text-3xl font-serif font-semibold text-charcoal mb-8 pb-2 border-b border-gray-400">
              {language === "ES" ? "Energía y Recursos Naturales" : language === "PT" ? "Energia e Recursos Naturais" : "Energy and Natural Resources"}
            </h2>

            <div>
              <h3 className="text-lg font-semibold text-charcoal mb-4">
                {language === "ES" ? "Como Abogada" : language === "PT" ? "Como Advogada" : "As Counsel"}
              </h3>
              <ul className="space-y-3">
                {energyNaturalResourcesCounsel.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="inline-block w-2 h-2 rounded-full bg-aquamarine mt-2 mr-3 flex-shrink-0"></span>
                    <span className="text-gray-700 leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Investor-State Disputes */}
          <motion.div
            id="investor-state"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16 scroll-mt-24"
          >
            <h2 className="text-2xl lg:text-3xl font-serif font-semibold text-charcoal mb-8 pb-2 border-b border-gray-400">
              {language === "ES" ? "Disputas Inversionista-Estado" : language === "PT" ? "Disputas Investidor-Estado" : "Investor-State Disputes"}
            </h2>

            <div>
              <h3 className="text-lg font-semibold text-charcoal mb-4">
                {language === "ES" ? "Como Abogada" : language === "PT" ? "Como Advogada" : "As Counsel"}
              </h3>
              <ul className="space-y-3">
                {investorStateCounsel.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="inline-block w-2 h-2 rounded-full bg-aquamarine mt-2 mr-3 flex-shrink-0"></span>
                    <span className="text-gray-700 leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Recognition and Enforcement of Arbitral Awards */}
          <motion.div
            id="recognition-enforcement"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16 scroll-mt-24"
          >
            <h2 className="text-2xl lg:text-3xl font-serif font-semibold text-charcoal mb-8 pb-2 border-b border-gray-400">
              {language === "ES" ? "Reconocimiento y Ejecución de Laudos Arbitrales" : language === "PT" ? "Reconhecimento e Execução de Sentenças Arbitrais" : "Recognition and Enforcement of Arbitral Awards"}
            </h2>

            <ul className="space-y-3">
              {recognitionEnforcement.map((item, index) => (
                <li key={index} className="flex items-start">
                  <span className="inline-block w-2 h-2 rounded-full bg-aquamarine mt-2 mr-3 flex-shrink-0"></span>
                  <span className="text-gray-700 leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Risk Analysis and Case Assessment */}
          <motion.div
            id="risk-analysis"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16 scroll-mt-24"
          >
            <h2 className="text-2xl lg:text-3xl font-serif font-semibold text-charcoal mb-8 pb-2 border-b border-gray-400">
              {language === "ES" ? "Análisis de Riesgo y Evaluación de Casos" : language === "PT" ? "Análise de Risco e Avaliação de Casos" : "Risk Analysis and Case Assessment"}
            </h2>

            <ul className="space-y-3">
              {riskAnalysis.map((item, index) => (
                <li key={index} className="flex items-start">
                  <span className="inline-block w-2 h-2 rounded-full bg-aquamarine mt-2 mr-3 flex-shrink-0"></span>
                  <span className="text-gray-700 leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
