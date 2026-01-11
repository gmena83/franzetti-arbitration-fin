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
  { id: "deal-structure", label: "Deal-Structure, Post-Transaction, Governance and Accountability", labelES: "Estructura de Transacciones, Post-Transacción, Gobernanza y Responsabilidad", labelPT: "Estrutura de Transações, Pós-Transação, Governança e Responsabilidade" },
  { id: "energy", label: "Energy and Natural Resources", labelES: "Energía y Recursos Naturales", labelPT: "Energia e Recursos Naturais" },
  { id: "investor-state", label: "Investor-State Disputes", labelES: "Disputas Inversionista-Estado", labelPT: "Disputas Investidor-Estado" },
  { id: "recognition", label: "Recognition and Enforcement of Arbitral Awards", labelES: "Reconocimiento y Ejecución de Laudos Arbitrales", labelPT: "Reconhecimento e Execução de Sentenças Arbitrais" },
  { id: "risk", label: "Risk Analysis and Case Assessment", labelES: "Análisis de Riesgo y Evaluación de Casos", labelPT: "Análise de Risco e Avaliação de Casos" },
];

type CaseItem = {
  text: string;
  categories: string[];
  hasHtml?: boolean;
};

const arbitratorAppointments: CaseItem[] = [
  {
    text: "Co-arbitrator in an ICDR arbitration between two multinational companies concerning the purchase of electric vehicle charging equipment governed by the laws of Delaware",
    categories: ["commercial"],
  },
  {
    text: "Sole arbitrator in an ICDR arbitration between an American company and a Thai company involving a distribution agreement governed by the laws of the State of Maryland.",
    categories: ["commercial"],
  },
  {
    text: "Co-arbitrator in an ICDR arbitration between a food producer in the United States and a Peruvian company concerning a supply contract governed by Peruvian law.",
    categories: ["commercial"],
  },
  {
    text: "Co-arbitrator in an ICDR arbitration between a Mexican and an American company concerning the sale of an oilfield equipment governed by the laws of the State of Texas.",
    categories: ["commercial"],
  },
  {
    text: "President of an arbitral tribunal in a CAM arbitration between a Brazilian company and a North American company concerning the breach of a distribution agreement governed by the laws of the State of Florida (CAM).",
    categories: ["commercial"],
  },
  {
    text: "Co-arbitrator in an ICDR arbitration between a Swiss and an American company concerning the breach of a sales agreement governed by the laws of the State of Florida.",
    categories: ["commercial"],
  },
  {
    text: "Sole arbitrator in several arbitrations under the AAA Commercial Rules involving claims for breach of contract in the hospitality industry.",
    categories: ["commercial"],
  },
  {
    text: "Sole arbitrator in several arbitrations under the AAA Commercial Rules involving claims for breach of contract in the financial services industries",
    categories: ["commercial"],
  },
  {
    text: "Co-arbitrator in an ICDR construction dispute involving a concession agreement for the development of a highway project in a Latin American State",
    categories: ["construction"],
  },
  {
    text: "Co-arbitrator in an ICDR construction dispute involving a concession agreement for the development of an infrastructure project in Latin America.",
    categories: ["construction"],
  },
  {
    text: "Co-arbitrator in a CAM arbitration involving a corporate dispute related to a major oil company in Brazil.",
    categories: ["deal-structure"],
  },
];

const mattersAsCounsel: CaseItem[] = [
  {
    text: "Represented a Brazilian company in an ICDR arbitration against an American company in connection with a distribution agreement governed by New York Law.",
    categories: ["commercial"],
  },
  {
    text: "Advised a multinational chemical company in pre-dispute negotiations involving a steam supply agreement governed by the laws of Brazil.",
    categories: ["commercial"],
  },
  {
    text: "Represented an American company in an ICDR dispute involving a services agreement governed by the laws of California.",
    categories: ["commercial"],
  },
  {
    text: "Represented a logistics multinational company in an ICC arbitration against a Colombian company in connection with a commercial representation agreement governed by the laws of the State of Texas.",
    categories: ["commercial"],
  },
  {
    text: "Represented an Argentinean firm in an ICDR arbitration against a Chilean gas company in connection with a services agreement governed by Argentine law.",
    categories: ["commercial"],
  },
  {
    text: "Advising a Brazilian construction company and its American subsidiary regarding a Joint Operating Agreement for the construction of an oil platform in Nigeria.",
    categories: ["construction"],
  },
  {
    text: "Represented an American company against a construction Brazilian conglomerate in an ICC arbitration concerning an indemnity agreement governed by the laws of Brazil.",
    categories: ["construction"],
  },
  {
    text: "Represented a multinational company in three ICC arbitrations concerning a multibillion-dollar shareholder dispute over the control of a Brazilian company arising out of a share purchase agreement governed by the laws of Brazil.",
    categories: ["deal-structure"],
  },
  {
    text: "Advising a Brazilian company and its American subsidiary regarding a Joint Operating Agreement for the construction of an oil platform in Nigeria.",
    categories: ["deal-structure"],
  },
  {
    text: "Advising a Dutch investor on financing and corporate governance issues connected to a joint venture agreement for the development of a startup energy project in a Latin American country.",
    categories: ["deal-structure"],
  },
  {
    text: "Represented the Respondent in Croatia v. MOL Hungarian Oil and Gas PLC (<a href='https://pca-cpa.org/cn/cases/291/' target='_blank' class='text-aquamarine hover:underline'>PCA Case No. 2014-15</a>), a contractual dispute under the UNCITRAL rules regarding shareholder's rights and the corporate governance of a Croatian oil and gas company, the validity of a gas master agreement, and corruption allegations.",
    categories: ["deal-structure"],
    hasHtml: true,
  },
  {
    text: "Represented a multinational company against a Greek company in a JAMS arbitration arising out of a share purchase agreement governed by the laws of the State of New York.",
    categories: ["deal-structure"],
  },
  {
    text: "Represented Claimant in Afilias plc. v. ICANN (<a href='https://www.icann.org/resources/pages/irp-afilias-v-icann-2018-11-30-en' target='_blank' class='text-aquamarine hover:underline'>ICDR Case No. 01-18-0004-2702</a>) in dispute concerning ICANN's internal governance and accountability mechanisms with respect to the assignment of a top-level domain.",
    categories: ["deal-structure"],
    hasHtml: true,
  },
  {
    text: "Represented Dotgay LLC in a dispute concerning ICANN's internal governance and accountability mechanisms with respect to the assignment of a top-level domain. <a href='https://domainincite.com/17910-gay-is-gay-enough-after-all-icann-overturns-community-panel-decision' target='_blank' class='text-aquamarine hover:underline ml-1'>[Media: Domain Incite]</a>",
    hasHtml: true,
    categories: ["deal-structure"],
  },
  {
    text: "Represented Dotmusic LLC in a dispute concerning ICANN's internal governance and accountability mechanisms with respect to the assignment of a top-level domain.",
    categories: ["deal-structure"],
  },
  {
    text: "Represented Claimant in Amazon.com, Inc. v. ICANN (<a href='https://www.icann.org/en/system/files/files/irp-amazon-request-redacted-02mar16-en.pdf' target='_blank' class='text-aquamarine hover:underline'>ICDR Case No. 01-16-0000-7056</a>) concerning ICANN's internal governance and accountability mechanisms with respect to the assignment of a top-level domain. <a href='https://www.npr.org/2019/05/22/725610775/after-7-year-battle-amazon-nears-victory-in-domain-name-dispute' target='_blank' class='text-aquamarine hover:underline ml-1'>[Media: NPR]</a> <a href='https://www.cfr.org/blog/case-amazon-and-what-it-means-icann' target='_blank' class='text-aquamarine hover:underline ml-1'>[Media: CFR]</a>",
    categories: ["deal-structure"],
    hasHtml: true,
  },
  {
    text: "Represented Claimant in DotConnectAfrica Trust v. ICANN (<a href='https://www.icann.org/en/news/irp/dca-v-icann' target='_blank' class='text-aquamarine hover:underline'>ICDR Case No. 50-117-T-1083-13</a>) concerning ICANN's internal governance and accountability mechanisms with respect to the assignment of a top-level domain. <a href='https://law.justia.com/cases/california/court-of-appeal/2021/b302739.html' target='_blank' class='text-aquamarine hover:underline ml-1'>[Media: Justia]</a>",
    categories: ["deal-structure"],
    hasHtml: true,
  },
  {
    text: "Represented Claimant in ICM Registry v. ICANN (<a href='https://www.icann.org/en/news/irp/icm-v-icann' target='_blank' class='text-aquamarine hover:underline'>ICDR Case No. 50-117-T-00224-08</a>) concerning ICANN's internal governance and accountability mechanisms with respect to the assignment of a top-level domain. <a href='https://icannwiki.org/ICM_v._ICANN' target='_blank' class='text-aquamarine hover:underline ml-1'>[Media: ICANNWiki]</a>",
    categories: ["deal-structure"],
    hasHtml: true,
  },
  {
    text: "Advising a Brazilian company and its American subsidiary regarding a Joint Operating Agreement for the construction of an oil platform in Nigeria.",
    categories: ["energy"],
  },
  {
    text: "Advising a Dutch investor on financing and corporate governance issues connected to the development of a startup energy project in a Latin American country.",
    categories: ["energy"],
  },
  {
    text: "Represented a Guinean company in an ICC arbitration arising out of a mining services contract governed by the laws of the United Kingdom.",
    categories: ["energy"],
  },
  {
    text: "Represented a state-owned Dominican Republic fund in an ICC arbitration involving the operations of a power company.",
    categories: ["energy"],
  },
  {
    text: "Advised Shell's subsidiary BG Overseas Limited with respect to an investment dispute against the Republic of Bolivia under the UK-Bolivia BIT involving regulatory measures affecting operation contracts for the extraction of hydrocarbons in Bolivia. <a href='https://www.kslaw.com/news-and-insights/harry-burnett-rica-franzetti-and-fernando-rodriguez-cortina-represent-shell-in-an-investment-treaty-claim-against-bolivia' target='_blank' class='text-aquamarine hover:underline ml-1'>[Media: K&S]</a>",
    categories: ["energy"],
    hasHtml: true,
  },
  {
    text: "Represented the Claimant in Gasoducto Sur Peruano S.A. En Liquidación v. Republic of Peru (<a href='https://icsid.worldbank.org/cases/pending' target='_blank' class='text-aquamarine hover:underline'>ICSID Case No. ARB/24/29</a>), a contractual dispute over a gas pipeline project that collapsed in the wake of the Odebrecht corruption scandal. <a href='https://www.kslaw.com/news-and-insights/ks-advises-gasoducto-sur-peruano-in-an-icsid-claim-against-peru-over-a-natural-gas-pipeline-project-that-collapsed-in-the-wake-of-the-odebrecht-corruption-scandal' target='_blank' class='text-aquamarine hover:underline ml-1'>[Media: K&S]</a>",
    categories: ["energy"],
    hasHtml: true,
  },
  {
    text: "Represented the Claimant in MOL Hungarian Oil and Gas Company v. Republic of Croatia (<a href='https://www.italaw.com/cases/2516' target='_blank' class='text-aquamarine hover:underline'>ICSID Case No. ARB/13/32</a>), a dispute under the Energy Charter Treaty for measures related to the privatization of a Croatian oil and gas company, the supply of gas, and the criminal prosecution of Claimant's CEO for bribery accusations. <a href='https://www.acerislaw.com/investment-arbitration-and-the-never-ending-mol-v-croatia-saga/' target='_blank' class='text-aquamarine hover:underline ml-1'>[Media: Aceris Law]</a> <a href='https://legalblogs.wolterskluwer.com/arbitration-blog/mol-v-croatia-saga-a-two-faced-janus-in-the-isds-reform-debate/' target='_blank' class='text-aquamarine hover:underline ml-1'>[Media: Kluwer]</a>",
    categories: ["energy"],
    hasHtml: true,
  },
  {
    text: "Represented the Respondent in Croatia v. MOL Hungarian Oil and Gas PLC (<a href='https://pca-cpa.org/cn/cases/291/' target='_blank' class='text-aquamarine hover:underline'>PCA Case No. 2014-15</a>), a contractual dispute under the UNCITRAL rules regarding shareholder's rights and the corporate governance of a Croatian oil and gas company, the validity of a gas master agreement, and corruption allegations.",
    categories: ["energy"],
    hasHtml: true,
  },
  {
    text: "Represented the Claimants in Pluspetrol Perú et al v Perúpetro (<a href='https://www.italaw.com/cases/3111' target='_blank' class='text-aquamarine hover:underline'>ICSID Case No. ARB/12/28</a>), a dispute arising out of a gas supply contract regarding royalty payments and the sale of liquified natural gas (LNG).",
    categories: ["energy"],
    hasHtml: true,
  },
  {
    text: "Represented the Claimant in Pac Rim Cayman LLC v. Republic of El Salvador (<a href='https://www.italaw.com/cases/783' target='_blank' class='text-aquamarine hover:underline'>ICSID Case No. ARB/09/12</a>), a dispute under the Central America-Dominican Republic-Unites States Free Trade Agreement regarding the government's refusal to issue mining exploitation licenses. <a href='https://www.iisd.org/itn/2018/10/18/pac-rim-v-el-salvador/' target='_blank' class='text-aquamarine hover:underline ml-1'>[Media: IISD]</a>",
    categories: ["energy"],
    hasHtml: true,
  },
  {
    text: "Represented the Respondent in Chevron Overseas Finance GmbH v. The Republic of the Philippines (<a href='https://pca-cpa.org/en/cases/223/' target='_blank' class='text-aquamarine hover:underline'>PCA Case No. 2019-25</a>), a dispute under the Philippines-Switzerland BIT and the UNCITRAL rules involving the Malampaya gas field.",
    categories: ["energy"],
    hasHtml: true,
  },
  {
    text: "Advised a Canadian investor in the energy sector in Colombia regarding investment treaty protections.",
    categories: ["energy"],
  },
  {
    text: "Advising an American landowner in Albania regarding investment protection rights.",
    categories: ["investor-state"],
  },
  {
    text: "Representing the Claimant in Quanta Services Netherlands B.V. v. Republic of Peru (<a href='https://www.italaw.com/cases/9781' target='_blank' class='text-aquamarine hover:underline'>ICSID Case No. ARB/21/1</a>), a dispute under the Netherlands-Peru Bilateral Investment Treaty (BIT) arising from measures related to concessions to build and operate fiber-optic networks.",
    categories: ["investor-state"],
    hasHtml: true,
  },
  {
    text: "Advised Shell's subsidiary BG Overseas Limited with respect to an investment dispute against the Republic of Bolivia under the UK-Bolivia BIT involving regulatory measures affecting operation contracts for the extraction of hydrocarbons in Bolivia. <a href='https://www.kslaw.com/news-and-insights/harry-burnett-rica-franzetti-and-fernando-rodriguez-cortina-represent-shell-in-an-investment-treaty-claim-against-bolivia' target='_blank' class='text-aquamarine hover:underline ml-1'>[Media: K&S]</a>",
    categories: ["investor-state"],
    hasHtml: true,
  },
  {
    text: "Represented the Claimant in Gasoducto Sur Peruano S.A. En Liquidación v. Republic of Peru (<a href='https://icsid.worldbank.org/cases/pending' target='_blank' class='text-aquamarine hover:underline'>ICSID Case No. ARB/24/29</a>), a contractual dispute over a gas pipeline project that collapsed in the wake of the Odebrecht corruption scandal. <a href='https://www.kslaw.com/news-and-insights/ks-advises-gasoducto-sur-peruano-in-an-icsid-claim-against-peru-over-a-natural-gas-pipeline-project-that-collapsed-in-the-wake-of-the-odebrecht-corruption-scandal' target='_blank' class='text-aquamarine hover:underline ml-1'>[Media: K&S]</a>",
    categories: ["investor-state"],
    hasHtml: true,
  },
  {
    text: "Represented the Claimant in MOL Hungarian Oil and Gas Company v. Republic of Croatia (<a href='https://www.italaw.com/cases/2516' target='_blank' class='text-aquamarine hover:underline'>ICSID Case No. ARB/13/32</a>), a dispute under the Energy Charter Treaty for measures related to the privatization of a Croatian oil and gas company, the supply of gas, and the criminal prosecution of Claimant's CEO for bribery accusations. <a href='https://www.acerislaw.com/investment-arbitration-and-the-never-ending-mol-v-croatia-saga/' target='_blank' class='text-aquamarine hover:underline ml-1'>[Media: Aceris Law]</a> <a href='https://legalblogs.wolterskluwer.com/arbitration-blog/mol-v-croatia-saga-a-two-faced-janus-in-the-isds-reform-debate/' target='_blank' class='text-aquamarine hover:underline ml-1'>[Media: Kluwer]</a>",
    categories: ["investor-state"],
    hasHtml: true,
  },
  {
    text: "Represented the Respondent in Croatia v. MOL Hungarian Oil and Gas PLC (<a href='https://pca-cpa.org/cn/cases/291/' target='_blank' class='text-aquamarine hover:underline'>PCA Case No. 2014-15</a>), a contractual dispute under the UNCITRAL rules regarding shareholder's rights and the corporate governance of a Croatian oil and gas company, the validity of a gas master agreement, and corruption allegations.",
    categories: ["investor-state"],
    hasHtml: true,
  },
  {
    text: "Represented the Claimants in Pluspetrol Perú et al v Perúpetro (<a href='https://www.italaw.com/cases/3111' target='_blank' class='text-aquamarine hover:underline'>ICSID Case No. ARB/12/28</a>), a dispute arising out of a gas supply contract regarding royalty payments and the sale of liquified natural gas (LNG).",
    categories: ["investor-state"],
    hasHtml: true,
  },
  {
    text: "Represented the Claimant in Pac Rim Cayman LLC v. Republic of El Salvador (<a href='https://www.italaw.com/cases/783' target='_blank' class='text-aquamarine hover:underline'>ICSID Case No. ARB/09/12</a>), a dispute under the Central America-Dominican Republic-Unites States Free Trade Agreement regarding the government's refusal to issue mining exploitation licenses. <a href='https://www.iisd.org/itn/2018/10/18/pac-rim-v-el-salvador/' target='_blank' class='text-aquamarine hover:underline ml-1'>[Media: IISD]</a>",
    categories: ["investor-state"],
    hasHtml: true,
  },
  {
    text: "Represented the Respondent in Chevron Overseas Finance GmbH v. The Republic of the Philippines (<a href='https://pca-cpa.org/en/cases/223/' target='_blank' class='text-aquamarine hover:underline'>PCA Case No. 2019-25</a>), a dispute under the Philippines-Switzerland BIT and the UNCITRAL rules involving the Malampaya gas field.",
    categories: ["investor-state"],
    hasHtml: true,
  },
  {
    text: "Advised a Turkish investor in Turkmenistan regarding investment treaties protections.",
    categories: ["investor-state"],
  },
  {
    text: "Advised a Canadian investor in the infrastructure sector in Peru regarding investment treaty protections.",
    categories: ["investor-state"],
  },
  {
    text: "Advised a Canadian investor in the energy sector in Colombia regarding investment treaty protections",
    categories: ["investor-state"],
  },
  {
    text: "Representing Petitioner Redes Andinas de Comunicaciones S.R.L. v. Republic of Peru, et al (<a href='https://www.courtlistener.com/docket/66609467/redes-andinas-de-comunicaciones-srl-v-republic-of-peru/' target='_blank' class='text-aquamarine hover:underline'>US District Court for the District of Columbia Civil Action No. 22-3631</a>), a proceeding to recognize and enforce two ICC arbitral awards. <a href='https://www.kslaw.com/news-and-insights/ashley-parrish-and-rica-franzetti-represent-redes-andinas-de-comunicaciones-srl-before-a-dc-federal-court' target='_blank' class='text-aquamarine hover:underline ml-1'>[Media: K&S]</a>",
    categories: ["recognition"],
    hasHtml: true,
  },
  {
    text: "Assisted third‑party funders and investment funds on the assessment, valuation, and strategy of investment and commercial disputes.",
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
              {language === "ES" ? "EXPERIENCIA" : language === "PT" ? "EXPERIÊNCIA" : "EXPERTISE"}
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {language === "ES" 
                ? "Experiencia especializada en diversos sectores y tipos de disputas"
                : language === "PT"
                ? "Experiência especializada em diversos setores e tipos de disputas"
                : "Specialized experience across diverse sectors and dispute types"}
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
          {subjectMatters.map((matter) => {
            const { arbitratorCases, counselCases } = getFilteredCases(matter.id);
            if (arbitratorCases.length === 0 && counselCases.length === 0) return null;

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

                {arbitratorCases.length > 0 && (
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold text-charcoal mb-4">
                      {language === "ES" ? "Como Árbitro" : language === "PT" ? "Como Árbitro" : "As Arbitrator"}
                    </h3>
                    <ul className="space-y-3">
                      {arbitratorCases.map((item, index) => (
                        <li key={index} className="flex items-start">
                          <span className="inline-block w-2 h-2 rounded-full bg-aquamarine mt-2 mr-3 flex-shrink-0"></span>
                          {item.hasHtml ? (
                            <span className="text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: item.text }} />
                          ) : (
                            <span className="text-gray-700 leading-relaxed">
                              {item.text}
                            </span>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {counselCases.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-charcoal mb-4">
                      {language === "ES" ? "Como Abogada" : language === "PT" ? "Como Advogada" : "As Counsel"}
                    </h3>
                    <ul className="space-y-3">
                      {counselCases.map((item, index) => (
                        <li key={index} className="flex items-start">
                          <span className="inline-block w-2 h-2 rounded-full bg-aquamarine mt-2 mr-3 flex-shrink-0"></span>
                          {item.hasHtml ? (
                            <span className="text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: item.text }} />
                          ) : (
                            <span className="text-gray-700 leading-relaxed">
                              {item.text}
                            </span>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
