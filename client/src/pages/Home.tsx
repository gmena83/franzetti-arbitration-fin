import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

/* Home Page - Franzetti Arbitration
 * Design: Professional Legal Minimalism with client's requested changes
 * - Bigger logo in hero section
 * - Grey card height matches picture height
 * - Bigger/bolder text in hero
 * - Symmetric testimonials (two side by side)
 * - Justified text in About
 * - LinkedIn-style logos for Professional Associations
 * - Academia: "Professor" without "Adjunct" prefix
 * - Languages ordered: English, Spanish, Portuguese
 */

const professionalBackground = [
  {
    title: "Franzetti Arbitration",
    location: "Washington, DC",
    role: "Founder and Principal",
    period: "Jan. 2026 – Present",
    logo: "/images/Franzetti-vertical-dark.png",
    url: "https://www.franzettiarbitration.com",
  },
  {
    title: "King & Spalding LLP",
    location: "Washington, DC and Miami",
    role: "Partner",
    period: "Sept. 2021 – Jan. 2026",
    logo: "/images/king-spalding-logo.png",
    url: "https://www.kslaw.com",
  },
  {
    title: "Dechert LLP",
    location: "Washington, DC",
    role: "Partner / Counsel",
    period: "Sept. 2015 – Sept. 2021",
    logo: "/images/dechert-logo-new.png",
    url: "https://www.dechert.com",
  },
  {
    title: "Weil, Gotshal & Manges LLP",
    location: "Washington, DC",
    role: "Associate",
    period: "Jul. 2012 – Sept. 2015",
    logo: "/images/weil-logo-new.png",
    url: "https://www.weil.com",
  },
  {
    title: "Crowell & Moring LLP",
    location: "Washington, DC",
    role: "Associate",
    period: "Sept. 2008 – Jul. 2012",
    logo: "/images/crowell-logo-new.png",
    url: "https://www.crowell.com",
  },
  {
    title: "Wald & Advogados Associados",
    location: "São Paulo, Brazil",
    role: "Associate",
    period: "Jul. 2001 – Sept. 2006",
    logo: "/images/wald-logo-new.png",
    url: "https://www.wald.com.br",
  },
  {
    title: "Dinamarco & Rossi Advocacia",
    location: "São Paulo, Brazil",
    role: "Associate / Intern",
    period: "Jul. 1997 – Jul. 2001",
    logo: "/images/dinamarco-logo-new.png",
    url: "https://www.dinamarco.com.br/",
  },
];

// Academia: "Professor" without "Adjunct" prefix as per client request
const academia = [
  {
    institution: "University of Miami Law School",
    role: "Adjunct Professor",
    course: "International Arbitration in the Energy Sector",
    period: "2024-2025",
    logo: "/images/miami-logo-new.png",
    url: "https://www.law.miami.edu",
  },
  {
    institution: "Georgetown University Law Center",
    role: "Adjunct Professor",
    course: "Investor-State Dispute Resolution",
    period: "2017-2022",
    logo: "/images/georgetown-logo-new.png",
    url: "https://www.law.georgetown.edu",
  },
];

const education = [
  {
    degree: "LL.M.",
    institution: "Georgetown University Law Center",
    note: "International Studies, Distinction and Dean’s List",
    location: "Washington D.C.",
    year: "2008",
    logo: "/images/georgetown-logo-new.png",
    url: "https://www.law.georgetown.edu",
  },
  {
    degree: "Postgraduate Specialization",
    institution: "Getúlio Vargas Foundation",
    note: "in Business and Economics Law",
    location: "São Paulo, Brazil",
    year: "2006",
    logo: "/images/fgv-logo.png",
    url: "https://portal.fgv.br",
  },
  {
    degree: "LL.B.",
    institution: "University of São Paulo Law School",
    note: "(J.D. Equivalent)",
    location: "São Paulo, Brazil",
    year: "2000",
    logo: "/images/usp-logo.png",
    url: "https://www.direito.usp.br",
  },
];

// Professional Associations with LinkedIn-style logos and URLs
const professionalAssociations = [
  {
    name: "Panel of Arbitrators of the International Centre of Dispute Resolution (ICDR)",
    logo: "/images/logos/aaa-icdr.jpg",
    url: "https://www.icdr.org"
  },
  {
    name: "Panel of Arbitrators of the American Arbitration Association (AAA)",
    logo: "/images/logos/aaa-icdr.jpg",
    url: "https://www.adr.org"
  },
  {
    name: "Panel of Arbitrators of the Hong Kong International Arbitration Centre (HKIAC)",
    logo: "/images/cam-b3-logo.png",
    url: "https://www.hkiac.org"
  },
  {
    name: "Panel of Arbitrators of the Brazil-Canada Chamber of Commerce (CAM-CCBC)",
    logo: "/images/logos/cam-ccbc.png",
    url: "https://ccbc.org.br/cam-ccbc-centro-arbitragem-mediacao"
  },
  {
    name: "Panel of Arbitrators of the Capital Market Chamber of B3 S.A – Brasil, Bolsa, Balcão (CAM)",
    logo: "/images/hkiac-logo.png",
    url: "https://www.b3.com.br"
  },
  {
    name: "Arbitration & Mediation Committee of the International Court of Commerce (ICC) Brazil",
    logo: "/images/logos/icc.png",
    url: "https://www.iccbrasil.org/en/dispute-resolution/"
  },
  {
    name: "International Bar Association – Dispute Resolution Section",
    logo: "/images/logos/iba.png",
    url: "https://www.ibanet.org"
  },

  {
    name: "Arbitral Women",
    logo: "/images/logos/arbitralwomen.jpg",
    url: "https://www.arbitralwomen.org"
  },
  {
    name: "Brazilian Arbitration Committee (CBAR)",
    logo: "/images/logos/cbar.jpg",
    url: "https://cbar.org.br"
  },
  {
    name: "Miami International Arbitration Society (MIAS)",
    logo: "/images/logos/mias.jpg",
    url: "https://www.mias.org/arbitration-in-miami"
  },
];

const barAdmissions = [
  { name: "District of Columbia", logo: "/images/logos/dcbar.jpg", url: "https://www.dcbar.org" },
  { name: "New York", logo: "/images/logos/nysba.jpg", url: "https://nysba.org" },
  { name: "Brazil", logo: "/images/logos/oab.jpg", url: "https://www.oab.org.br" },
];

// Languages reordered: English, Spanish, Portuguese as per client request
const languages = ["English", "Spanish", "Portuguese"];

// Testimonials - three quote cards with institution logos
// Carousel quotes - now includes ALL quotes (original carousel + embedded quotes from About section)
const carouselQuotes = [
  // Original carousel quotes
  {
    quote: "Erica is a superb cross-examiner and a fantastic lawyer. She's also very detail-oriented and thorough.",
    source: "Chambers USA",
  },
  {
    quote: "Érica was very impressive in handling a complex case.",
    source: "Chambers USA",
  },
  {
    quote: "Brazilian lawyer Érica Franzetti is much admired by the market for her sound record and expertise advising international clients in Brazil on complex demands, including sophisticated M&A-related arbitration cases, counsel on claiming damages and the chairing of arbitral tribunals.",
    source: "Chambers Brazil",
  },
  // Previously embedded quotes from About section
  {
    quote: "Erica is a superstar who stands out for her extremely well-versed approach in high-stakes international disputes.",
    source: "The Legal 500",
  },
  {
    quote: "I think really highly of her, she's fabulous. She comes across as very intelligent and capable, and she's always really professional and personable.",
    source: "Chambers USA",
  },
  {
    quote: "Her technical skills, experience in the field, relentless dedication to client service and commercial mindset are really impressive.",
    source: "Lexology",
  },
];

const testimonials = [
  {
    quote: "Erica is a superstar who stands out for her extremely well-versed approach in high-stakes international disputes.",
    source: "The Legal 500",
    logo: "/images/logos/legal500-logo.png",
  },
  {
    quote: "I think really highly of her, she's fabulous. She comes across as very intelligent and capable, and she's always really professional and personable.",
    source: "Chambers USA",
    logo: "/images/logos/chambers-usa.png",
  },
  {
    quote: "Her technical skills, experience in the field, relentless dedication to client service and commercial mindset are really impressive.",
    source: "Lexology",
    logo: "/images/logos/lexology-logo.png",
  },
];

// Hero Quotes Carousel Component - Compact with fixed height for hero section
function HeroQuotesCarousel({ quotes }: { quotes: { quote: string; source: string }[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % quotes.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [quotes.length]);

  return (
    <div className="mt-6">
      {/* Fixed height container to prevent layout shifts */}
      <div className="h-[120px] lg:h-[100px] relative overflow-hidden">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.4 }}
          className="absolute inset-0"
        >
          <div className="flex items-start gap-3">
            <div className="w-1 bg-aquamarine self-stretch flex-shrink-0 min-h-[60px]"></div>
            <div>
              <p className="text-base lg:text-lg text-gray-600 italic leading-relaxed line-clamp-3">
                "{quotes[currentIndex].quote}"
              </p>
              <p className="text-sm text-gray-500 font-medium mt-2">
                — {quotes[currentIndex].source}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
      {/* Navigation dots */}
      <div className="flex gap-2 mt-4">
        {quotes.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-colors ${index === currentIndex ? "bg-charcoal" : "bg-gray-400"
              }`}
            aria-label={`Go to quote ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  const { t, language } = useLanguage();

  // SEO Meta Tags - Reset to default on home page
  useEffect(() => {
    document.title = "Franzetti Arbitration | Independent Arbitrator & Counsel";

    let metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Erica Franzetti is a leading international arbitrator and counsel with extensive experience in international commercial and investor-state arbitration.');
    }

    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute('content', 'international arbitration, arbitrator, investor-state disputes, commercial arbitration, ICSID, ICC, energy arbitration, construction arbitration, Erica Franzetti, Washington DC arbitrator, Latin America arbitration');
    }

    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', 'Franzetti Arbitration | Independent Arbitrator & Counsel');

    let ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) ogDescription.setAttribute('content', 'Erica Franzetti is a leading international arbitrator and counsel with extensive experience in international commercial and investor-state arbitration.');
  }, []);

  // Get translated content
  const heroTitle = language === "ES"
    ? "Árbitro Internacional y Abogada."
    : language === "PT"
      ? "Árbitro Internacional e Advogada."
      : "Independent Arbitrator & Counsel";

  const heroSubtitle = language === "ES"
    ? "Resolución independiente de disputas con integridad, eficiencia y rigor."
    : language === "PT"
      ? "Resolução independente de disputas com integridade, eficiência e rigor."
      : "Independent dispute resolution with integrity, efficiency, and rigor.";

  return (
    <div className="bg-white">
      {/* Hero Section - Grey card height matches picture, bigger/bolder text */}
      <section className="bg-gray-100">
        <div className="container py-16 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
            {/* Text Content - Grey card with matching height */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col justify-center bg-gray-200/50 p-8 lg:p-12 rounded-sm"
            >

              {/* Bigger/bolder text as per client request */}
              <h1 className="text-4xl lg:text-5xl font-serif font-bold text-charcoal mb-4">
                {heroTitle}
              </h1>
              {/* Quote carousel replaces the static subtitle */}
              <HeroQuotesCarousel quotes={carouselQuotes} />
            </motion.div>

            {/* Hero Image - Looking at camera, holding hands */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative h-full"
            >
              <img
                src="/images/EricaFranzetti39057-RT.jpg"
                alt="Erica Franzetti"
                className="w-full h-full object-cover rounded-sm shadow-xl"
                style={{ minHeight: "400px" }}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Section with Symmetric Testimonials */}
      <section id="about" className="py-16 lg:py-24 bg-white">
        <div className="container">
          {/* About Text - Justified as per client request */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-serif font-semibold text-charcoal mb-8">
              {language === "ES" ? "SOBRE" : language === "PT" ? "SOBRE" : "ABOUT"}
            </h2>

            <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
              <p>
                Erica Franzetti is an independent arbitrator and international disputes counsel. With a 25-year career at market-leading law firms, she has a long standing track record in commercial and investor-state arbitration across a wide range of industries and jurisdictions. She focuses her practice on serving as an independent arbitrator in complex cross-border disputes and on advising clients on dispute strategy, enforcement, and investment protection. Her work has particular emphasis on energy and infrastructure matters connected to North America, Latin America, and Lusophone jurisdictions.
              </p>

              {/* Embedded Quote 1 - The Legal 500 */}
              <div className="my-8 ml-[12.5%] mr-[12.5%] pl-6 border-l-4 border-aquamarine">
                <p className="text-gray-700 italic text-lg">
                  "Erica is a superstar who stands out for her extremely well-versed approach in high-stakes international disputes."
                </p>
                <p className="text-sm text-gray-500 font-medium mt-2">– <em>The Legal 500</em></p>
              </div>

              <p>
                Erica serves as arbitrator in U.S. and international disputes, including as chair of arbitral tribunals. She draws on extensive experience across civil and common law traditions to manage proceedings efficiently, fairly, and with procedural rigor.
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Experience under ICC, AAA, ICDR, LCIA, ICSID, and UNCITRAL rules</li>
                <li>Extensive familiarity with arbitral procedure, tribunal management, and decision-writing</li>
                <li>Practical case management informed by decades as counsel in complex, high-value disputes</li>
                <li>Linguistic and cultural fluency required to manage cross-border proceedings</li>
              </ul>

              <p className="mt-6">
                Her counsel services include:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Early-stage dispute prevention and risk assessment</li>
                <li>Strategic guidance on dispute management and procedural positioning</li>
                <li>Investment treaty analysis and protection</li>
                <li>Post-award and enforcement strategy across jurisdictions</li>
              </ul>

              {/* Embedded Quote 2 - Chambers USA */}
              <div className="my-8 ml-[12.5%] mr-[12.5%] pl-6 border-l-4 border-aquamarine">
                <p className="text-gray-700 italic text-lg">
                  "I think really highly of her, she's fabulous. She comes across as very intelligent and capable, and she's always really professional and personable."
                </p>
                <p className="text-sm text-gray-500 font-medium mt-2">– <em>Chambers USA</em></p>
              </div>

              <p>
                Erica has been involved in arbitration proceedings spanning jurisdictions including Argentina, Brazil, Canada, Chile, Colombia, Croatia, the Dominican Republic, Ghana, Hungary, Mexico, Peru, the Philippines, and the United States. Her deep experience covers a wide range of disputes across sectors such as:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Commercial contracts, including hotel management, distribution, intellectual property and matters under the Convention on Contracts for the International Sale of Goods (CISG)</li>
                <li>Construction, concessions and infrastructure, including telecommunications, power generation and highways</li>
                <li>Corporate governance and accountability, mergers and acquisitions (M&A), shareholder and joint venture disputes, and venture capital investments</li>
                <li>Energy and natural resources, including mining, oil and gas, LNG pricing, electricity generation and nuclear energy</li>
              </ul>

              {/* Embedded Quote 3 - Lexology */}
              <div className="my-8 ml-[12.5%] mr-[12.5%] pl-6 border-l-4 border-aquamarine">
                <p className="text-gray-700 italic text-lg">
                  "Her technical skills, experience in the field, relentless dedication to client service and commercial mindset are really impressive."
                </p>
                <p className="text-sm text-gray-500 font-medium mt-2">– <em>Lexology</em></p>
              </div>

              <p>
                Erica has received top-tier recognition from leading legal directories, including <em>Chambers & Partners</em>, <em>The Legal 500</em>, <em>Lexology</em> (formerly known as Who's Who Legal), <em>Latin Lawyer</em>, and <em>Best Lawyers</em>, and has been named one of Latin America's Top 100 Female Lawyers by <em>Latinvex</em>.
              </p>

              <p>
                She regularly publishes and speaks on international commercial arbitration, investor-state arbitration, and dispute resolution strategy at international conferences and professional forums, and has teaching experience at leading academic institutions, such as the Georgetown University Law Center and the University of Miami Law School.
              </p>

              <p>
                Before founding her own practice, Erica spent 17 years in major U.S. law firms, eight as partner in globally recognized international arbitration teams. She is admitted to practice in Washington, D.C., New York, and Brazil, and works fluently in English, Spanish, and Portuguese.
              </p>
            </div>
          </motion.div>


        </div>
      </section>

      {/* Experience Section */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="container">
          {/* Professional Background */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <h3 id="professional-background" className="text-2xl font-serif font-semibold text-charcoal mb-8 pb-2 border-b border-gray-300">
              {language === "ES" ? "Trayectoria Profesional" : language === "PT" ? "Trajetória Profissional" : "Professional Background"}
            </h3>
            <div className="space-y-4">
              {professionalBackground.map((item, index) => (
                <div key={index} className="flex flex-col sm:flex-row sm:justify-between py-3 items-start sm:items-center">
                  <div className="flex items-start gap-4 w-full sm:w-auto">
                    <div className="w-12 sm:w-32 flex-shrink-0 flex items-center justify-start pt-1">
                      {item.logo && (
                        <img src={item.logo} alt={item.title} className="h-6 sm:h-8 w-auto max-w-full object-contain" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div>
                        {item.url ? (
                          <a href={item.url} target="_blank" rel="noopener noreferrer" className="font-semibold text-charcoal hover:text-aquamarine transition-colors">
                            {item.title}
                          </a>
                        ) : (
                          <span className="font-semibold text-charcoal">{item.title}</span>
                        )}
                        <span className="text-gray-600">, {item.location}</span>
                        <span className="text-gray-600">, {item.role}</span>
                      </div>
                      <span className="text-gray-400 text-sm block sm:hidden mt-1">{item.period}</span>
                    </div>
                  </div>
                  <span className="text-gray-400 text-sm sm:text-base whitespace-nowrap hidden sm:block">{item.period}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Academia - "Professor" without "Adjunct" prefix */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <h3 id="academia" className="text-2xl font-serif font-semibold text-charcoal mb-8 pb-2 border-b border-gray-300">
              {language === "ES" ? "Academia" : language === "PT" ? "Academia" : "Academia"}
            </h3>
            <div className="space-y-4">
              {academia.map((item, index) => (
                <div key={index} className="flex flex-col sm:flex-row sm:justify-between py-3 items-start sm:items-center">
                  <div className="flex items-start gap-4 w-full sm:w-auto">
                    <div className="w-12 sm:w-32 flex-shrink-0 flex items-center justify-start pt-1">
                      {item.logo && (
                        <img src={item.logo} alt={item.institution} className="h-6 sm:h-8 w-auto max-w-full object-contain" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div>
                        {item.url ? (
                          <a href={item.url} target="_blank" rel="noopener noreferrer" className="font-semibold text-charcoal hover:text-aquamarine transition-colors">
                            {item.institution}
                          </a>
                        ) : (
                          <span className="font-semibold text-charcoal">{item.institution}</span>
                        )}
                        <span className="text-gray-600">, {item.role}</span>
                        <span className="text-gray-600">, {item.course}</span>
                      </div>
                      <span className="text-gray-400 text-sm block sm:hidden mt-1">{item.period}</span>
                    </div>
                  </div>
                  <span className="text-gray-400 text-sm sm:text-base whitespace-nowrap hidden sm:block">{item.period}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Education */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <h3 id="education" className="text-2xl font-serif font-semibold text-charcoal mb-8 pb-2 border-b border-gray-300">
              {language === "ES" ? "Educación" : language === "PT" ? "Educação" : "Education"}
            </h3>
            <div className="space-y-4">
              {education.map((item, index) => (
                <div key={index} className="flex flex-col sm:flex-row sm:justify-between py-3 items-start sm:items-center">
                  <div className="flex items-start gap-4 w-full sm:w-auto">
                    <div className="w-12 sm:w-32 flex-shrink-0 flex items-center justify-start pt-1">
                      {item.logo && (
                        <img src={item.logo} alt={item.institution} className="h-8 sm:h-10 w-auto max-w-full object-contain" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div>
                        {item.url ? (
                          <a href={item.url} target="_blank" rel="noopener noreferrer" className="font-semibold text-charcoal hover:text-aquamarine transition-colors">
                            {item.institution}
                          </a>
                        ) : (
                          <span className="font-semibold text-charcoal">{item.institution}</span>
                        )}
                        <span className="text-gray-600">, </span>
                        <span className="text-charcoal">{item.degree}</span>
                        {item.note && <span className="text-gray-600"> {item.note}</span>}
                        {item.location && <span className="text-gray-600">, {item.location}</span>}
                      </div>
                      <span className="text-gray-400 text-sm block sm:hidden mt-1">{item.year}</span>
                    </div>
                  </div>
                  <span className="text-gray-400 text-sm sm:text-base whitespace-nowrap hidden sm:block">{item.year}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Professional Associations - LinkedIn-style logos with URLs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <h3 id="professional-associations" className="text-2xl font-serif font-semibold text-charcoal mb-8 pb-2 border-b border-gray-300">
              {language === "ES" ? "Asociaciones Profesionales" : language === "PT" ? "Associações Profissionais" : "Professional Associations"}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {professionalAssociations.map((item, index) => (
                <div key={index} className="flex items-center gap-3 py-2">
                  {/* Professional Association logo display - doubled size */}
                  <div className="w-20 h-20 flex-shrink-0 flex items-center justify-center bg-gray-100 rounded">
                    {item.logo ? (
                      <img src={item.logo} alt={item.name} className="h-12 w-12 object-contain" />
                    ) : (
                      <span className="inline-block w-2 h-2 rounded-full bg-aquamarine"></span>
                    )}
                  </div>
                  {item.url ? (
                    <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-aquamarine transition-colors">
                      {item.name}
                    </a>
                  ) : (
                    <span className="text-gray-700">{item.name}</span>
                  )}
                </div>
              ))}
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Bar Admissions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 id="bar-admissions" className="text-2xl font-serif font-semibold text-charcoal mb-8 pb-2 border-b border-gray-300">
                {language === "ES" ? "Colegiaturas" : language === "PT" ? "Inscrições na Ordem" : "Bar Admissions"}
              </h3>
              <ul className="space-y-3">
                {barAdmissions.map((item, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <span className="inline-block w-2 h-2 rounded-full bg-aquamarine flex-shrink-0"></span>
                    {item.url ? (
                      <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-aquamarine transition-colors">
                        {item.name}
                      </a>
                    ) : (
                      <span className="text-gray-700">{item.name}</span>
                    )}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Languages - Reordered: English, Spanish, Portuguese */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 id="languages" className="text-2xl font-serif font-semibold text-charcoal mb-8 pb-2 border-b border-gray-300">
                {language === "ES" ? "Idiomas" : language === "PT" ? "Idiomas" : "Languages"}
              </h3>
              <ul className="space-y-3">
                {languages.map((item, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <span className="inline-block w-2 h-2 rounded-full bg-aquamarine flex-shrink-0"></span>
                    <span className="text-gray-700">
                      {language === "ES"
                        ? (item === "English" ? "Inglés" : item === "Spanish" ? "Español" : "Portugués")
                        : language === "PT"
                          ? (item === "English" ? "Inglês" : item === "Spanish" ? "Espanhol" : "Português")
                          : item}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
 
