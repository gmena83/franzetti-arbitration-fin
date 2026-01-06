import { motion } from "framer-motion";
import { useState } from "react";

/* Expertise Page (formerly Cases) - Franzetti Arbitration
 * Design: Professional Legal Minimalism with client's requested changes
 * - Subject matter categories with nude separators
 * - Cases organized under subject matter headings
 * - Photo of Erica in white, sitting down
 */

const subjectMatters = [
  { id: "investor-state", label: "Investor-State Disputes" },
  { id: "energy", label: "Energy and Natural Resources" },
  { id: "infrastructure", label: "Infrastructure & Construction" },
  { id: "corporate", label: "Joint Venture & Shareholder Disputes" },
  { id: "post-ma", label: "Post-M&A" },
  { id: "distribution", label: "Sale & Distribution Agreements" },
  { id: "franchise", label: "Franchise Agreements" },
  { id: "hospitality", label: "Hospitality" },
];

const arbitratorAppointments = [
  {
    text: "Co-arbitrator in a construction dispute involving a concession agreement for the development of a highway project in a Latin American State (ICDR).",
    categories: ["infrastructure"],
  },
  {
    text: "Co-arbitrator in a commercial dispute between two multinational companies concerning the purchase of electric vehicle charging equipment governed by the laws of Delaware (ICDR).",
    categories: ["energy"],
  },
  {
    text: "Co-arbitrator in a construction dispute involving a concession agreement for the development of an infrastructure project in Latin America (ICDR).",
    categories: ["infrastructure"],
  },
  {
    text: "Arbitrator in a commercial arbitration between an American company and a Thai company involving a distribution agreement governed by the laws of the State of Maryland (ICDR).",
    categories: ["distribution"],
  },
  {
    text: "Co-arbitrator on a panel to resolve a challenge to an arbitrator in a commercial arbitration involving a corporate dispute related to a major oil company in Brazil (Câmara do Mercado B3).",
    categories: ["energy", "corporate"],
  },
  {
    text: "Co-arbitrator in a commercial arbitration involving a food producer in the United States and a Peruvian company involving a supply contract governed by Peruvian law (ICDR).",
    categories: ["distribution"],
  },
  {
    text: "Co-arbitrator in a dispute between a Mexican and an American company concerning the sale of an oilfield equipment governed by the laws of the State of Texas (ICDR).",
    categories: ["energy"],
  },
  {
    text: "President of an arbitral tribunal in a dispute between a Brazilian company and a North American company concerning the breach of a distribution agreement governed by the laws of the State of Florida (CAM).",
    categories: ["distribution"],
  },
  {
    text: "Co-arbitrator in a dispute between a Swiss and an American company concerning the breach of a sales agreement governed by the laws of the State of Florida (ICDR).",
    categories: ["distribution"],
  },
  {
    text: "Sole arbitrator in several arbitrations under the AAA Commercial Rules involving claims for breach of contract in the hospitality industry.",
    categories: ["hospitality"],
  },
  {
    text: "Sole arbitrator in several arbitrations under the AAA Commercial Rules involving claims for breach of contract in the financial services industries.",
    categories: ["corporate"],
  },
];

const mattersAsCounsel = [
  {
    text: "Advising a Brazilian company on structuring of a Joint Operating Agreement for the construction of an oil platform in Nigeria.",
    categories: ["energy", "corporate"],
  },
  {
    text: "Advising an American company on general corporate matters and governance issues connected to the development of an energy project in Argentina.",
    categories: ["energy", "corporate"],
  },
  {
    text: "Representing an American company in proceedings to recognize and enforce two arbitral awards against Peru in multiple jurisdictions.",
    categories: ["investor-state"],
  },
  {
    text: "Representing a global infrastructure developer in an investor-state dispute against Peru arising from measures related to concessions to build and operate fiber-optic networks in remote areas of the country (ICSID).",
    categories: ["investor-state", "infrastructure"],
  },
  {
    text: "Represented a major oil and gas company in an investment dispute involving the Republic of Bolivia.",
    categories: ["investor-state", "energy"],
  },
  {
    text: "Represented Claimant in Gasoducto Sur Peruano S.A. En Liquidación v. Republic of Peru (ICSID Case No. ARB/24/29).",
    categories: ["investor-state", "energy", "infrastructure"],
  },
  {
    text: "Advised a major oil and gas company regarding multiple disputes arising out of its projects in a Latin American country.",
    categories: ["energy"],
  },
  {
    text: "Represented a multinational company in three corporate disputes arising out of a share purchase agreement governed by the laws of Brazil (ICC).",
    categories: ["corporate", "post-ma"],
  },
  {
    text: "Represented an American company in a commercial dispute involving a services agreement governed by the laws of California (ICDR).",
    categories: ["distribution"],
  },
  {
    text: "Advised Canadian investors regarding their rights under investment treaties involving two Latin American countries.",
    categories: ["investor-state"],
  },
  {
    text: "Advised a multinational chemical company in pre-dispute negotiations involving a steam supply agreement governed by the laws of Brazil.",
    categories: ["energy"],
  },
  {
    text: "Advised Turkish investors regarding their rights under investment treaties involving Turkmenistan.",
    categories: ["investor-state"],
  },
  {
    text: "Represented a Guinean company in commercial arbitration arising out of a mining services contract governed by the laws of the United Kingdom (ICC).",
    categories: ["energy"],
  },
  {
    text: "Represented an American company against a Brazilian company in a dispute in connection with an indemnity agreement governed by the laws of Brazil (ICC).",
    categories: ["post-ma"],
  },
  {
    text: "Represented a Swiss company against a Greek company in a dispute arising out of a share purchase agreement governed by the laws of the State of New York (JAMS).",
    categories: ["corporate", "post-ma"],
  },
  {
    text: "Represented the investor in MOL Hungarian Oil and Gas Company v. Republic of Croatia (ICSID Case No. ARB/13/32) in a dispute under the Energy Charter Treaty.",
    categories: ["investor-state", "energy", "corporate"],
  },
  {
    text: "Represented the Respondent in Croatia v. MOL Hungarian Oil and Gas PLC in a dispute regarding Croatia's rights to terminate a shareholders agreement and a gas master agreement (UNCITRAL).",
    categories: ["investor-state", "energy", "corporate"],
  },
  {
    text: "Represented an Asian State in an investor-state arbitration under the UNCITRAL rules involving an oil and gas project (PCA).",
    categories: ["investor-state", "energy"],
  },
  {
    text: "Represented Afilias plc. in a dispute with ICANN over rights to its top-level domain.",
    categories: ["infrastructure"],
  },
  {
    text: "Represented an American company in an arbitration against a Colombian company in connection with a commercial representation agreement governed by the laws of the State of Texas (ICC).",
    categories: ["distribution"],
  },
  {
    text: "Represented a state-owned Dominican Republic fund in a commercial arbitration involving a power company (ICC).",
    categories: ["energy"],
  },
  {
    text: "Represented Amazon.com, Inc. in a dispute with ICANN over rights to its top-level domain.",
    categories: ["infrastructure"],
  },
  {
    text: "Represented Claimants in Pluspetrol Perú et al v Perúpetro in a dispute arising out of a gas supply contract regarding royalty payments (ICSID Case No. ARB/12/28).",
    categories: ["investor-state", "energy"],
  },
  {
    text: "Represented DotConnectAfrica Trust in a dispute with ICANN over rights to its top-level domain (ICDR).",
    categories: ["infrastructure"],
  },
  {
    text: "Represented Claimant in Pac Rim Cayman LLC v. Republic of El Salvador (ICSID Case No. ARB/09/12) in a dispute under CAFTA-DR.",
    categories: ["investor-state", "energy"],
  },
  {
    text: "Represented Claimant in ICM Registry v. ICANN in a dispute with ICANN concerning the rights to its top-level domain (ICDR).",
    categories: ["infrastructure"],
  },
  {
    text: "Represented a Brazilian company in arbitration against an American company in connection with a distribution agreement governed by New York Law (ICDR).",
    categories: ["distribution"],
  },
];

export default function Cases() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

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

  return (
    <div className="bg-white">
      {/* Hero Section with Photo */}
      <section className="bg-gray-100 py-16">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl lg:text-5xl font-serif font-semibold text-charcoal mb-8">
                EXPERTISE
              </h1>

              {/* Subject Matter Navigation */}
              <div className="flex flex-wrap items-center gap-2 text-sm">
                {subjectMatters.map((matter, index) => (
                  <span key={matter.id} className="flex items-center">
                    <button
                      onClick={() => scrollToSection(matter.id)}
                      className={`hover:text-aquamarine transition-colors ${
                        activeCategory === matter.id
                          ? "text-aquamarine font-medium"
                          : "text-charcoal"
                      }`}
                    >
                      {matter.label}
                    </button>
                    {index < subjectMatters.length - 1 && (
                      <span className="mx-2 text-nude">|</span>
                    )}
                  </span>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex justify-center lg:justify-end"
            >
              <img
                src="/images/EricaFranzetti39394-RT-RT.jpg"
                alt="Erica Franzetti"
                className="w-full max-w-sm object-cover rounded-sm shadow-lg"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Cases by Category */}
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
                <h2 className="text-2xl lg:text-3xl font-serif font-semibold text-charcoal mb-8 pb-2 border-b border-gray-200">
                  {matter.label}
                </h2>

                {arbitratorCases.length > 0 && (
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold text-charcoal mb-4">
                      As Arbitrator
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
                    <h3 className="text-lg font-semibold text-charcoal mb-4">
                      As Counsel
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
              </motion.div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
