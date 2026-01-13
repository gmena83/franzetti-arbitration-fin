import { motion } from "framer-motion";
import { useEffect } from "react";
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
    period: "Dec. 2025 – Present",
    logo: "/images/Franzetti-vertical-dark.png",
    url: "https://www.franzettiarb.com",
  },
  {
    title: "King & Spalding LLP",
    location: "Washington, DC and Miami",
    role: "Partner",
    period: "Sept. 2021 – Dec. 2025",
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
    location: "São Paulo",
    role: "Associate / Intern",
    period: "Jul. 1997 – Jul. 2001",
    logo: "/images/dinamarco-logo-new.png",
    url: "https://www.dinamarco.com.br/",
  },
];

// Academia: "Professor" without "Adjunct" prefix as per client request
const academia = [
  {
    institution: "University of Miami",
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
    note: "High Honor, Dean's List",
    year: "2008",
    logo: "/images/georgetown-logo-new.png",
    url: "https://www.law.georgetown.edu",
  },
  {
    degree: "Postgraduate Specialization in Business and Economic Law",
    institution: "Getúlio Vargas Foundation",
    note: "",
    year: "2006",
    logo: "/images/fgv-logo.png",
    url: "https://portal.fgv.br",
  },
  {
    degree: "LL.B.",
    institution: "University of São Paulo, Law School",
    note: "",
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
    name: "Rising Arbitrators Initiative (RAI)", 
    logo: "/images/rai-logo.png", 
    url: "https://risingarbitrators.com/" 
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
const testimonials = [
  {
    quote: "Erica is a superstar who stands out for her extremely well-versed approach in high-stakes international disputes.",
    source: "Legal 500",
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

export default function Home() {
  const { t, language } = useLanguage();
  
  // SEO Meta Tags - Reset to default on home page
  useEffect(() => {
    document.title = "Franzetti Arbitration | International Arbitrator & Counsel";
    
    let metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Erica Franzetti is a leading international arbitrator and counsel with extensive experience in international commercial and investor-state arbitration.');
    }
    
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute('content', 'international arbitration, arbitrator, investor-state disputes, commercial arbitration, ICSID, ICC, energy arbitration, construction arbitration, Erica Franzetti, Washington DC arbitrator, Latin America arbitration');
    }
    
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', 'Franzetti Arbitration | International Arbitrator & Counsel');
    
    let ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) ogDescription.setAttribute('content', 'Erica Franzetti is a leading international arbitrator and counsel with extensive experience in international commercial and investor-state arbitration.');
  }, []);

  // Get translated content
  const heroTitle = language === "ES" 
    ? "Árbitro Internacional y Abogada." 
    : language === "PT" 
    ? "Árbitro Internacional e Advogada." 
    : "International Arbitrator & Counsel.";
    
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
              <p className="text-xl lg:text-2xl text-gray-600 leading-relaxed font-medium">
                {heroSubtitle}
              </p>
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
      <section className="py-16 lg:py-24 bg-white">
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
                Erica Franzetti is a leading international arbitrator with extensive experience in international commercial and investor–state arbitration across a wide range of industry sectors, including energy, natural resources, infrastructure, manufacturing, financial services, and technology. Drawing on decades of experience as counsel in complex, high value disputes, Erica brings a deep understanding of arbitral strategy, procedure, and advocacy to her work as an arbitrator. With training in both civil and common law, she often counsels clients on resolving cross-border disputes and protecting their investments under international treaties. She has been involved in proceedings spanning numerous jurisdictions, including Argentina, Brazil, Canada, Chile, Colombia, Croatia, the Dominican Republic, England, Ghana, Mexico, Hungary, Peru, the Philippines, and the United States.
              </p>

              <p>
                Erica has served as an arbitrator in both domestic and international disputes, including as chair of arbitral tribunals constituted under various institutional rules. She has served as counsel in international arbitration proceedings administered by leading institutions such as the International Chamber of Commerce (ICC), the American Arbitration Association (AAA), the International Centre for Dispute Resolution (ICDR), the London Court of International Arbitration (LCIA), and the International Centre for Settlement of Investment Disputes (ICSID), among others, as well as ad hoc arbitrations (including UNCITRAL). Her experience on all sides of arbitration enables her to manage proceedings efficiently and fairly, with a practical appreciation of the challenges faced by parties and counsel.
              </p>

              <p>
                While her primary focus is on her work as an arbitrator, Erica provides select counsel services, offering legal assessments and strategic advice at every stage of a dispute—from its inception through award enforcement—drawing on deep familiarity with diverse procedural frameworks and jurisdictions. Her practice spans a broad range of industries and dispute types, including corporate governance, mergers and acquisitions (M&A), joint ventures, intellectual property, disputes under the United Nations Convention on Contracts for the International Sale of Goods (CISG), privatization, telecommunications, power generation, mineral concessions, gas pricing and LNG, hotel management, project finance, venture capital investments, and construction.
              </p>

              <p>
                Erica has received top-tier recognition from leading legal directories, including Chambers & Partners, The Legal 500, Lexology (formerly known as Who's Who Legal), Latin Lawyer, and Best Lawyers, and has been named one of Latin America's Top 100 Female Lawyers by Latinvex.
              </p>

              <p>
                In addition to her practice, Erica regularly publishes and speaks at international arbitration conferences and has lectured at leading academic institutions, including Georgetown University Law Center, where she has taught a course on investor–state arbitration, and the University of Miami, where she teaches a course on arbitration in the energy sector.
              </p>

              <p>
                Before founding her own practice, Erica built a 25-year career at market-leading law firms. She began her career as a litigator in Brazil, relocated to the United States in 2006, and spent nearly 20 years in Big Law, including almost a decade as a partner. For more than four years, she practiced at King & Spalding as part of its globally recognized, top-ranked international arbitration group, after several years in the international arbitration practice at Dechert. She is admitted to practice in Washington, D.C., New York, and Brazil, and works fluently in English, Spanish, and Portuguese.
              </p>
            </div>
          </motion.div>

          {/* Testimonials - Three quote cards with institution logos */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-sm border-l-4 border-aquamarine">
                <div className="flex items-start gap-3 mb-4">
                  {/* Institution logo */}
                  <div className="w-16 h-10 flex items-center justify-center flex-shrink-0">
                    <img 
                      src={testimonial.logo} 
                      alt={testimonial.source} 
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                  <div>
                    <blockquote className="text-gray-700 italic">
                      "{testimonial.quote}"
                    </blockquote>
                    <p className="text-sm text-gray-500 font-medium mt-3">
                      — {testimonial.source}
                    </p>
                  </div>
                </div>
              </div>
            ))}
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
            <h3 className="text-2xl font-serif font-semibold text-charcoal mb-8 pb-2 border-b border-gray-300">
              {language === "ES" ? "Trayectoria Profesional" : language === "PT" ? "Trajetória Profissional" : "Professional Background"}
            </h3>
            <div className="space-y-4">
              {professionalBackground.map((item, index) => (
                <div key={index} className="flex flex-col sm:flex-row sm:justify-between py-3 items-start sm:items-center">
                  <div className="flex items-center gap-4">
                    <div className="w-16 sm:w-32 flex-shrink-0 flex items-center justify-start">
                      {item.logo && (
                        <img src={item.logo} alt={item.title} className="h-6 sm:h-8 w-auto max-w-full object-contain" />
                      )}
                    </div>
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
                  </div>
                  <span className="text-gray-400 text-sm sm:text-base mt-1 sm:mt-0 whitespace-nowrap">{item.period}</span>
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
            <h3 className="text-2xl font-serif font-semibold text-charcoal mb-8 pb-2 border-b border-gray-300">
              {language === "ES" ? "Academia" : language === "PT" ? "Academia" : "Academia"}
            </h3>
            <div className="space-y-4">
              {academia.map((item, index) => (
                <div key={index} className="flex flex-col sm:flex-row sm:justify-between py-3 items-start sm:items-center">
                  <div className="flex items-center gap-4">
                    <div className="w-16 sm:w-32 flex-shrink-0 flex items-center justify-start">
                      {item.logo && (
                        <img src={item.logo} alt={item.institution} className="h-6 sm:h-8 w-auto max-w-full object-contain" />
                      )}
                    </div>
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
                  </div>
                  <span className="text-gray-400 text-sm sm:text-base mt-1 sm:mt-0">{item.period}</span>
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
            <h3 className="text-2xl font-serif font-semibold text-charcoal mb-8 pb-2 border-b border-gray-300">
              {language === "ES" ? "Educación" : language === "PT" ? "Educação" : "Education"}
            </h3>
            <div className="space-y-4">
              {education.map((item, index) => (
                <div key={index} className="flex flex-col sm:flex-row sm:justify-between py-3 items-start sm:items-center">
                  <div className="flex items-center gap-4">
                    <div className="w-16 sm:w-32 flex-shrink-0 flex items-center justify-start">
                      {item.logo && (
                        <img src={item.logo} alt={item.institution} className="h-8 sm:h-10 w-auto max-w-full object-contain" />
                      )}
                    </div>
                    <div>
                      <span className="font-semibold text-charcoal">{item.degree}</span>
                      <span className="text-gray-600">, </span>
                      {item.url ? (
                        <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-aquamarine transition-colors">
                          {item.institution}
                        </a>
                      ) : (
                        <span className="text-gray-600">{item.institution}</span>
                      )}
                      {item.note && <span className="text-gray-500"> ({item.note})</span>}
                    </div>
                  </div>
                  <span className="text-gray-400 text-sm sm:text-base mt-1 sm:mt-0">{item.year}</span>
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
            <h3 className="text-2xl font-serif font-semibold text-charcoal mb-8 pb-2 border-b border-gray-300">
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
                    <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-aquamarine transition-colors text-sm">
                      {item.name}
                    </a>
                  ) : (
                    <span className="text-gray-700 text-sm">{item.name}</span>
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
              <h3 className="text-2xl font-serif font-semibold text-charcoal mb-8 pb-2 border-b border-gray-300">
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
              <h3 className="text-2xl font-serif font-semibold text-charcoal mb-8 pb-2 border-b border-gray-300">
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
