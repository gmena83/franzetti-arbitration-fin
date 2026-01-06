import { motion } from "framer-motion";
import { useState } from "react";

/* Thought Leadership Page - Franzetti Arbitration
 * Design: Professional Legal Minimalism with client's requested changes
 * - Speaking photo (blue clothing)
 * - Testimonials
 * - Recognition with nude symbols
 * - Speaking engagements with nude dots
 * - Publications in same format
 */

const recognitions = [
  {
    source: "Chambers and Partners",
    details: [
      "USA, International Arbitration: Counsel, Band 6, Four years ranked",
      "Brazil, International Arbitration, Band 3, Three years ranked",
    ],
  },
  {
    source: "Legal 500",
    details: ["USA, Latin America, International Arbitration"],
  },
  {
    source: "Lexology (formerly Who's Who Legal)",
    details: ["International Arbitration"],
  },
  {
    source: "Latinvex",
    details: ["Latin America's Top 100 Female Lawyers (2024)"],
  },
  {
    source: "Best Lawyers",
    details: ["The Best Lawyers in America: International Arbitration – Commercial (2026)"],
  },
  {
    source: "Lawdragon 500",
    details: ["Leading Global Litigators (2024)"],
  },
];

const testimonials = [
  {
    quote: "Erica is a superstar who stands out for her extremely well-versed approach in high-stakes international disputes.",
    source: "Legal 500",
  },
  {
    quote: "I think really highly of her, she's fabulous. She comes across as very intelligent and capable, and she's always really professional and personable.",
    source: "Chambers USA",
  },
  {
    quote: "Erica is a superb cross-examiner and a fantastic lawyer. She's also very detail-oriented and thorough.",
    source: "Chambers USA",
  },
  {
    quote: "Érica was very impressive in handling a complex case.",
    source: "Chambers USA",
  },
  {
    quote: "Brazilian lawyer Érica Franzetti is much admired by the market for her track record and expertise advising international clients in Brazil on complex demands.",
    source: "Chambers Brazil",
  },
];

const speakingEngagements = [
  {
    title: "Corruption in Arbitration: Tackling Fraud and Bribery in Latin America's Commercial Landscape",
    event: "HardTalk Miami",
    date: "December 4, 2025",
  },
  {
    title: "Energy Infrastructure Disputes",
    event: "AIEN/ICC: Dispute Resolution in the Energy Business, Rio de Janeiro",
    date: "October 3, 2025",
  },
  {
    title: "Parallel Arbitration and Criminal Proceedings Involving Corruption Allegations",
    event: "Sovereign & States Litigation Summit USA, Washington D.C.",
    date: "September 24, 2025",
  },
  {
    title: "International Construction Arbitration: Infrastructure Projects with Sovereigns",
    event: "iLaw2025 The ILS Global Forum on International Law AAA-ICDR International Arbitration Track",
    date: "February 7, 2025",
  },
  {
    title: "Increase in Disputes in Oil & Gas Industry",
    event: "HardTalk, Miami",
    date: "December 4, 2024",
  },
  {
    title: "Arbitragem no Setor de Aviação comercial com Partes Brasileiras",
    event: "Arbitration Channel",
    date: "October 29, 2024",
  },
  {
    title: "The Future of International Arbitration",
    event: "Georgetown University Law Centre, Washington D.C.",
    date: "February 29, 2024",
  },
  {
    title: "So You're an International Arbitrator, How to Approach and Handle Some of the Issues That May Arise",
    event: "iLaw2024 The ILS Global Forum on International Law AAA-ICDR International Arbitration Track",
    date: "February 16, 2024",
  },
  {
    title: "Considerations About the Seat of Arbitration",
    event: "Georgetown Brazilian Arbitration Day, University Law Centre, Washington D.C.",
    date: "January 24, 2024",
  },
  {
    title: "Greener Grass or Scorched Earth: The Impact of Legislation and Court Reform on Arbitration Friendliness in the Americas",
    event: "Chartered Institute – North American Branch and JAMS, Miami",
    date: "November 8, 2023",
  },
];

const publications = [
  {
    title: "The Role of Counsel in International Arbitration: Set-Aside Steps",
    publication: "Chapter of book International Arbitration in Practice (co-author), Kluwer International Law",
    year: "2024",
  },
  {
    title: "Lei de Arbitragem Comentada: Lei No. 9.307/1996",
    publication: "Co-author, comments to Article 12, Revista dos Tribunais",
    year: "2023",
  },
  {
    title: "Litigation Alternatives for COVID-19 Hospitality Disputes",
    publication: "Law360",
    year: "2020",
  },
  {
    title: "Navigating Investors' Rights under the USMCA",
    publication: "Transnational Dispute Management, Vol. 17, Issue 3",
    year: "2020",
  },
  {
    title: "Mining Arbitration in Latin America: Social and Environmental Issues in Investment Arbitration Cases",
    publication: "Global Arbitration Review: The Guide to Mining Arbitrations",
    year: "2019",
  },
  {
    title: "Construction contracts in Brazil",
    publication: "Lexology Q&A",
    year: "2019",
  },
  {
    title: "A structured guide to arbitration law and practice in Brazil",
    publication: "Lexology Q&A",
    year: "2014, updated 2019",
  },
  {
    title: "United States: Arbitration Q&A",
    publication: "The In-House Lawyer",
    year: "2018",
  },
];

type TabType = "recognition" | "speaking" | "publications";

export default function ThoughtLeadership() {
  const [activeTab, setActiveTab] = useState<TabType>("recognition");

  return (
    <div className="bg-white">
      {/* Hero Section with Speaking Photo */}
      <section className="bg-gray-100 py-16">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl lg:text-5xl font-serif font-semibold text-charcoal mb-8">
                THOUGHT LEADERSHIP
              </h1>

              {/* Featured Testimonial */}
              <div className="bg-white p-6 rounded-sm shadow-sm border-l-4 border-aquamarine">
                <blockquote className="text-lg text-gray-700 italic mb-3">
                  "Erica is a superstar who stands out for her extremely well-versed approach in high-stakes international disputes."
                </blockquote>
                <p className="text-sm text-gray-500 font-medium">— Legal 500</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex justify-center lg:justify-end"
            >
              <img
                src="/images/Gemini_Generated_Image_bpk3s8bpk3s8bpk3-RT.jpg"
                alt="Erica Franzetti speaking"
                className="w-full max-w-md object-cover rounded-sm shadow-lg"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Tab Navigation */}
      <section className="py-16 lg:py-24">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-wrap gap-6 mb-12 border-b border-gray-200"
          >
            <button
              onClick={() => setActiveTab("recognition")}
              className={`pb-4 px-2 text-lg font-medium transition-colors border-b-2 flex items-center gap-2 ${
                activeTab === "recognition"
                  ? "text-aquamarine border-aquamarine"
                  : "text-gray-500 border-transparent hover:text-charcoal"
              }`}
            >
              <span className="inline-block w-2 h-2 rounded-full bg-aquamarine"></span>
              Recognition
            </button>
            <button
              onClick={() => setActiveTab("speaking")}
              className={`pb-4 px-2 text-lg font-medium transition-colors border-b-2 flex items-center gap-2 ${
                activeTab === "speaking"
                  ? "text-aquamarine border-aquamarine"
                  : "text-gray-500 border-transparent hover:text-charcoal"
              }`}
            >
              <span className="inline-block w-2 h-2 rounded-full bg-aquamarine"></span>
              Speaking Engagements
            </button>
            <button
              onClick={() => setActiveTab("publications")}
              className={`pb-4 px-2 text-lg font-medium transition-colors border-b-2 flex items-center gap-2 ${
                activeTab === "publications"
                  ? "text-aquamarine border-aquamarine"
                  : "text-gray-500 border-transparent hover:text-charcoal"
              }`}
            >
              <span className="inline-block w-2 h-2 rounded-full bg-aquamarine"></span>
              Publications
            </button>
          </motion.div>

          {/* Tab Content */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Recognition Tab */}
            {activeTab === "recognition" && (
              <div className="space-y-12">
                {/* Recognition List */}
                <div className="space-y-8">
                  {recognitions.map((item, index) => (
                    <div key={index} className="border-b border-gray-100 pb-6">
                      <h3 className="text-xl font-semibold text-charcoal mb-3 flex items-center gap-2">
                        <span className="inline-block w-2 h-2 rounded-full bg-aquamarine"></span>
                        {item.source}
                      </h3>
                      <ul className="space-y-1 ml-4">
                        {item.details.map((detail, idx) => (
                          <li key={idx} className="text-gray-700">{detail}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                {/* Testimonials Grid */}
                <div className="mt-16">
                  <h3 className="text-2xl font-serif font-semibold text-charcoal mb-8">
                    What Others Say
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {testimonials.map((testimonial, index) => (
                      <div key={index} className="bg-gray-50 p-6 rounded-sm border-l-4 border-aquamarine">
                        <p className="text-gray-700 italic mb-3">
                          "{testimonial.quote}"
                        </p>
                        <p className="text-sm text-gray-500 font-medium">
                          — {testimonial.source}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Speaking Engagements Tab */}
            {activeTab === "speaking" && (
              <div className="space-y-6">
                {speakingEngagements.map((item, index) => (
                  <div key={index} className="pb-6 border-b border-gray-100">
                    <div className="flex items-start gap-3">
                      <span className="inline-block w-2 h-2 rounded-full bg-aquamarine mt-2 flex-shrink-0"></span>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-charcoal mb-1">
                          {item.title}
                        </h3>
                        <p className="text-gray-600">
                          {item.event}, <em className="text-gray-500">{item.date}</em>
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Publications Tab */}
            {activeTab === "publications" && (
              <div className="space-y-6">
                {publications.map((item, index) => (
                  <div key={index} className="pb-6 border-b border-gray-100">
                    <div className="flex items-start gap-3">
                      <span className="inline-block w-2 h-2 rounded-full bg-aquamarine mt-2 flex-shrink-0"></span>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-charcoal mb-1">
                          {item.title}
                        </h3>
                        <p className="text-gray-600">
                          {item.publication}, <em className="text-gray-500">{item.year}</em>
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
