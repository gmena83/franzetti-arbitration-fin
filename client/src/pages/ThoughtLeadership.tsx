import { motion } from "framer-motion";
import { useState, useEffect } from "react";

/* Thought Leadership Page - Franzetti Arbitration
 * Design: Professional Legal Minimalism with client's requested changes
 * - Speaking photo (blue clothing)
 * - Testimonials
 * - Recognition with aquamarine symbols
 * - Speaking engagements with aquamarine dots
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
  { title: "Corruption in Arbitration: Tackling Fraud and Bribery in Latin America's Commercial Landscape", event: "HardTalk Miami", date: "December 4, 2025" },
  { title: "Energy Infrastructure Disputes", event: "AIEN/ICC: Dispute Resolution in the Energy Business, Rio de Janeiro", date: "October 3, 2025" },
  { title: "Parallel Arbitration and Criminal Proceedings Involving Corruption Allegations", event: "Sovereign & States Litigation Summit USA, Washington D.C.", date: "September 24, 2025" },
  { title: "International Construction Arbitration: Infrastructure Projects with Sovereigns", event: "iLaw2025 The ILS Global Forum on International Law AAA-ICDR International Arbitration Track", date: "February 7, 2025" },
  { title: "Increase in Disputes in Oil & Gas Industry", event: "HardTalk, Miami", date: "December 4, 2024" },
  { title: "Arbitragem no Setor de Aviação comercial com Partes Brasileiras", event: "Arbitration Channel", date: "October 29, 2024" },
  { title: "The Future of International Arbitration", event: "Georgetown University Law Centre, Washington D.C.", date: "February 29, 2024" },
  { title: "So You're an International Arbitrator, How to Approach and Handle Some of the Issues That May Arise", event: "iLaw2024 The ILS Global Forum on International Law AAA-ICDR International Arbitration Track", date: "February 16, 2024" },
  { title: "Considerations About the Seat of Arbitration", event: "Georgetown Brazilian Arbitration Day, University Law Centre, Washington D.C.", date: "January 24, 2024" },
  { title: "Greener Grass or Scorched Earth: The Impact of Legislation and Court Reform on Arbitration Friendliness in the Americas", event: "Chartered Institute – North American Branch and JAMS, Miami", date: "November 8, 2023" },
  { title: "Roundtable on Enforcement Proceedings, Asset Tracing and Funding to Enforce and Collect", event: "Miami International Arbitration Society, Miami", date: "October 18, 2023" },
  { title: "Business Contracts and Arbitration in Regulated Sectors: Party Autonomy and Regulatory Heteronomy", event: "CBAR 22nd International Arbitration Conference, Rio de Janeiro", date: "September 14, 2023" },
  { title: "The Arbitration Proceedings", event: "Summer School on International Arbitration, NOVA School of Law, Lisbon", date: "July 2023" },
  { title: "Corruption in International Arbitration and Enforcement Proceedings", event: "Annual Conference of the Penn Carey Law International Arbitration Association", date: "March 24, 2023" },
  { title: "Discovery in International Arbitration", event: "Brazilian Arbitration Committee (CBAR) Study Group Roundtable", date: "March 16, 2023" },
  { title: "The Practical Impacts of the Supreme Court's Ruling on Section 1782 Discovery", event: "II Brazilian Arbitration Day organized by Georgetown University and Canal Arbitragem", date: "January 26, 2023" },
  { title: "Practical Issues on Producing Evidence in International Arbitration", event: "New York University, Columbia University, and the Brazilian-American Chamber of Commerce", date: "August 26, 2022" },
  { title: "Closing Remarks of I Brazilian Arbitration Day", event: "Georgetown University and Canal Arbitragem", date: "April 8, 2022" },
  { title: "Corruption in International Arbitration", event: "I Brazilian Arbitration Day Congress organized by Georgetown University and Canal Arbitragem", date: "April 8, 2022" },
  { title: "Supply Chain Disputes", event: "AAA-ICDR International Arbitration Track of the Florida Bar's International Law Sectional Annual Event", date: "April 1, 2022" },
  { title: "ICDR Rules on International Dispute Resolution Procedures", event: "The Chartered Institute of Arbitrators (CIArb) Brazil Branch", date: "December 8, 2021" },
  { title: "Hot Topics Related To Arbitration", event: "Brazilian-American Chamber of Commerce, New York City", date: "November 30, 2021" },
  { title: "Virtual Hearings in International Arbitration", event: "Vancouver International Arbitration Centre Webinar", date: "October 5, 2020" },
  { title: "Key Considerations for Legal Positions on Force Majeure: Practical Steps if Disputes are Inevitable", event: "Nairobi Centre For International Arbitration Webinar", date: "August 13, 2020" },
  { title: "Procedimentos Virtuais e Táticas de Guerrilha em Arbitragem", event: "INOVARB AmCham Brazil Webinar", date: "June 4, 2020" },
  { title: "Arbitrajes Virtuales: Ventajas e Inconvenientes", event: "IPA Instituto Peruano de Arbitraje", date: "May 14, 2020" },
  { title: "Tribunal's Power to Sanction Misconduct", event: "ILA American Branch Investment Law Committee and Georgetown International Arbitration Society, Washington, D.C.", date: "February 28, 2020" },
  { title: "Investor-State Disputes – A New Dawn in Treaty Reform?", event: "Who's Who Legal Future Leaders: Arbitration Conference USA, Washington, D.C.", date: "November 14, 2019" },
  { title: "Arbitration, Cybersecurity and Data Protection", event: "VI CAM-CCBC Arbitration Congress, São Paulo", date: "October 22, 2019" },
  { title: "Social Media, Internet and BIT Protections", event: "FDI Pre-Moot Opening Event, Mattos Filho, Veiga Filho, Marrey Jr e Quiroga Advogados, São Paulo", date: "October 18, 2019" },
  { title: "The GAR Live Debate: This House Believes that the Current Format of Investment Treaty Awards Undermines the Legitimacy of an Investor-State Arbitral Dispute Settlement", event: "Fifth Annual GAR Live BITs, Washington, D.C.", date: "May 16, 2019" },
  { title: "La Jurisprudencia Como Arma. ¿Es Urgente y Necesaria La Fijación de Criterios Jurisprudenciales Predecibles Por Las Cortes Nacionales Sobre Los Cuestionamientos a Los Laudos Arbitrales?", event: "XII Congreso Internacional de Arbitraje, IPA, Lima", date: "April 24, 2019" },
  { title: "Ongoing Challenges to International Investment Arbitration", event: "3rd Annual IAA Conference, Philadelphia, PA", date: "March 22, 2019" },
  { title: "¿Ha Llegado el Invierno al Arbitraje? ¿Crisis, Ética y Corrupción?", event: "Conferencia Internacional de Mujeres en Arbitraje, Instituto Peruano de Arbitraje, Lima", date: "January 31, 2019" },
  { title: "¿Cómo Afrontar un Arbitraje Nacional o Internacional de Asociación Público-Privada?", event: "Lima", date: "January 30, 2019" },
  { title: "HIALSA Arbitration Workshop: Evidence in International Arbitration", event: "Cambridge, Massachusetts", date: "October 2, 2018" },
  { title: "Introduction to International Commercial & Investment Arbitration", event: "American University, Washington College of Law, Washington, D.C.", date: "September 27, 2018" },
  { title: "Duty to Disclose and Brazilian Arbitration Culture", event: "CCMA CIESP/FIESP Congress Arbitration Day, New York, NY", date: "April 17, 2018" },
  { title: "Energy Across Borders: Geopolitics, Conflict and International Arbitration", event: "Energy Days Conference, Pennsylvania State University, Pennsylvania", date: "May 22, 2017" },
  { title: "Visión de los Arbitros y Abogados Sobre el Desarrollo del Arbitraje Internacional", event: "Congreso de Arbitraje Nacional e Internacional, Centro de Arbitraje y Conciliación, Bogotá, Colombia", date: "April 2, 2017" },
  { title: "Arbitration and Public Administration: A Reality in Latin American Countries? Case Law and Position of the Judiciary Branch", event: "III Congresso Pan-Americano de Arbitragem CAM-CCBC, São Paulo, Brazil", date: "October 24, 2016" },
  { title: "Aspectos Prácticos del Arbitraje Internacional", event: "International Centre of Dispute Resolution, International Arbitration Symposium, New York, NY", date: "May 27, 2016" },
  { title: "Strategies for Faster and Cheaper Cross-Border", event: "ACC GNY Signature CLE Program, New York, NY", date: "January 14, 2016" },
  { title: "Is International Arbitration Really Open to New Faces?", event: "27th Annual ITA Workshop: Subconscious Influences of International Arbitration, Dallas, TX", date: "June 17, 2015" },
  { title: "Dispute Resolution Current Trends Involving Arbitration and Compliance Issues in Brazil", event: "Georgetown University Law Center, Washington, DC", date: "September 15, 2014" },
  { title: "Specific Themes of Doing Business in Latin America", event: "ABA Section of International Law, New Perspectives for Infrastructure Projects in Latin America, São Paulo", date: "August 24, 2013" },
  { title: "Budgeting and Managing an International Arbitration: How to Keep Arbitration Cost-Efficient and Effective", event: "ABA Section of International Law 2013 Spring Meeting, Washington, DC", date: "April 24, 2013" },
  { title: "U.S. Judicial Discovery for Use in International Commercial Arbitration", event: "Guest Lecturer, International Commercial Arbitration Class at Georgetown University Law Center, Washington, D.C.", date: "November 19, 2012" },
  { title: "O Papel do Árbitro na Avaliação de Danos", event: "XI Congresso do Comitê Brasileiro de Arbitragem--CBAr: Aspectos Econômicos da Arbitragem, Porto Alegre", date: "September 2012" },
  { title: "How to Handle a BIT Arbitration", event: "Ninth Annual Seminar on International Commercial Arbitration at American University's Washington College of Law, Washington, DC", date: "October 3, 2012" },
  { title: "Documentary Evidence and the Use of Discovery, Evidence in International Arbitration", event: "ICDR Young & International e ICC Young Arbitrators Forum, Bogotá", date: "September 2010" },
  { title: "Jurisdictional Issues in ICSID Arbitration", event: "Seminário sobre questões jurídicas internacionais apresentado ao governo da República da Colômbia, Bogotá", date: "June 2009" },
];

const publications = [
  { title: "The Role of Counsel in International Arbitration: Set-Aside Steps", publication: "Chapter of book International Arbitration in Practice (co-author), edited by Courtney Lotfi, Alicja Zielinska-Eisen and Veronica Sandler Obregon, Kluwer International Law", year: "2024" },
  { title: "Lei de Arbitragem Comentada: Lei No. 9.307/1996", publication: "Co-author, comments to Article 12, Revista dos Tribunais", year: "2023" },
  { title: "Litigation Alternatives for COVID-19 Hospitality Disputes", publication: "Law360", year: "May 11, 2020" },
  { title: "Navigating Investors' Rights under the USMCA", publication: "Transnational Dispute Management, Vol. 17, Issue 3", year: "March 2020" },
  { title: "Mining Arbitration in Latin America: Social and Environmental Issues in Investment Arbitration Cases", publication: "Global Arbitration Review: The Guide to Mining Arbitrations", year: "July 2019" },
  { title: "Construction contracts in Brazil", publication: "Lexology Q&A", year: "March 2019" },
  { title: "A structured guide to arbitration law and practice in Brazil", publication: "Lexology Q&A", year: "September 2014, updated March 2019" },
  { title: "United States: Arbitration Q&A", publication: "The In-House Lawyer", year: "October 2018" },
  { title: "Arbitragem Comercial Envolvendo Administração Pública: uma Realidade na América Latina?", publication: "Revista Visão Jurídica", year: "April 2017" },
  { title: "Lições a Respeito de Decisões Vinculantes e Não Finais Proferidas por Dispute Adjudication Boards: o Caso CRW Joint Operation v. PT Perusahaan Gas Negara (PERSERO)", publication: "Revista de Arbitragem e Mediação – RArb, nº 48", year: "April 2016" },
  { title: "Directrices Prácticas Para la Redacción del Acuerdo Arbitral", publication: "Tratado de Derecho Arbitral, Vol. 2 (Co-author)", year: "March 2011" },
  { title: "US Judicial Discovery in Private International Arbitration: Outlook Remains Uncertain", publication: "Miami Arbitration Reports, Vol. 1, Issue 5", year: "October 2009" },
];

type TabType = "recognition" | "speaking" | "publications";

export default function ThoughtLeadership() {
  const [activeTab, setActiveTab] = useState<TabType>("recognition");

  // SEO Meta Tags
  useEffect(() => {
    document.title = "Thought Leadership | Franzetti Arbitration - Publications & Speaking";
    
    let metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Explore Erica Franzetti\'s thought leadership in international arbitration including publications, speaking engagements, and industry recognition.');
    }
    
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute('content', 'arbitration publications, speaking engagements, legal recognition, Chambers Partners, Legal 500, international arbitration thought leadership');
    }
    
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', 'Thought Leadership | Franzetti Arbitration');
    
    let ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) ogDescription.setAttribute('content', 'Publications, speaking engagements, and industry recognition in international arbitration.');
  }, []);

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
              <div className="space-y-4">
                {speakingEngagements.map((item, index) => (
                  <div key={index} className="pb-4 border-b border-gray-100">
                    <div className="flex items-start gap-3">
                      <span className="inline-block w-2 h-2 rounded-full bg-aquamarine mt-2 flex-shrink-0"></span>
                      <div className="flex-1">
                        <h3 className="text-base font-semibold text-charcoal mb-1">
                          {item.title}
                        </h3>
                        <p className="text-gray-600 text-sm">
                          {item.event}, <em className="text-gray-400">{item.date}</em>
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Publications Tab */}
            {activeTab === "publications" && (
              <div className="space-y-4">
                {publications.map((item, index) => (
                  <div key={index} className="pb-4 border-b border-gray-100">
                    <div className="flex items-start gap-3">
                      <span className="inline-block w-2 h-2 rounded-full bg-aquamarine mt-2 flex-shrink-0"></span>
                      <div className="flex-1">
                        <h3 className="text-base font-semibold text-charcoal mb-1">
                          {item.title}
                        </h3>
                        <p className="text-gray-600 text-sm">
                          {item.publication}, <em className="text-gray-400">{item.year}</em>
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
