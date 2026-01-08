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
    logo: "/images/Franzetti-principal-dark.svg",
    url: "https://www.franzettiarb.com",
  },
  {
    title: "King & Spalding LLP",
    location: "Washington, DC and Miami",
    role: "Partner",
    period: "Sept. 2021 – Dec. 2025",
    logo: "/images/logos/king-spalding.jpg",
    url: "https://www.kslaw.com",
  },
  {
    title: "Dechert LLP",
    location: "Washington, DC",
    role: "Partner",
    period: "Sept. 2015 – Sept. 2021",
    logo: "/images/dechert-logo.jpg",
    url: "https://www.dechert.com",
  },
  {
    title: "Weil, Gotshal & Manges LLP",
    location: "Washington, DC",
    role: "Associate",
    period: "Jul. 2012 – Sept. 2015",
    logo: "/images/weil-logo.jpg",
    url: "https://www.weil.com",
  },
  {
    title: "Crowell & Moring LLP",
    location: "Washington, DC",
    role: "Associate",
    period: "Sept. 2008 – Jul. 2012",
    logo: "/images/crowell-logo.jpg",
    url: "https://www.crowell.com",
  },
  {
    title: "Wald & Advogados Associados",
    location: "São Paulo, Brazil",
    role: "Associate",
    period: "Jul. 2001 – Sept. 2006",
    logo: "/images/wald-logo.png",
    url: "https://www.wald.com.br",
  },
  {
    title: "Dinamarco & Rossi Advocacia",
    location: "São Paulo",
    role: "Associate / Intern",
    period: "Jul. 1997 – Jul. 2001",
    logo: "/images/dinamarco-logo.jpg",
    url: "https://www.dinamarcoadvocacia.com.br",
  },
];

// Academia: "Professor" without "Adjunct" prefix as per client request
const academia = [
  {
    institution: "University of Miami",
    role: "Adjunct Professor",
    course: "International Arbitration in the Energy Sector",
    period: "2024-2025",
    logo: "/images/miami-law-logo.jpg",
    url: "https://www.law.miami.edu",
  },
  {
    institution: "Georgetown University Law Center",
    role: "Adjunct Professor",
    course: "Investor-State Dispute Resolution",
    period: "2017-2022",
    logo: "/images/logos/georgetown-law.png",
    url: "https://www.law.georgetown.edu",
  },
];

const education = [
  {
    degree: "LL.M.",
    institution: "Georgetown University Law Center",
    note: "High Honor, Dean's List",
    year: "2008",
    logo: "/images/logos/georgetown-law.png",
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
    logo: "/images/usp-law-logo.jpg",
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
    logo: "/images/logos/hkiac.png", 
    url: "https://www.hkiac.org" 
  },
  { 
    name: "Panel of Arbitrators of the Brazil-Canada Chamber of Commerce (CAM-CCBC)", 
    logo: "/images/logos/cam-ccbc.png", 
    url: "https://ccbc.org.br/cam-ccbc-centro-arbitragem-mediacao" 
  },
  { 
    name: "Panel of Arbitrators of the Capital Market Chamber of B3 S.A – Brasil, Bolsa, Balcão (CAM)", 
    logo: "/images/logos/b3.png", 
    url: "https://www.b3.com.br" 
  },
  { 
    name: "Arbitration and Mediation Committee of the International Court of Commerce (ICC) Brazil", 
    logo: "/images/logos/icc.png", 
    url: "https://iccwbo.org/dispute-resolution/dispute-resolution-services/arbitration" 
  },
  { 
    name: "International Bar Association – Dispute Resolution Section", 
    logo: "/images/logos/iba.png", 
    url: "https://www.ibanet.org" 
  },
  { 
    name: "Rising Arbitrators Initiative (RAI)", 
    logo: "/images/logos/rai.png", 
    url: "https://www.risingarbitrators.org" 
  },
  { 
    name: "Arbitral Women", 
    logo: "/images/logos/arbitralwomen.jpg", 
    url: "https://www.arbitralwomen.org" 
  },
  { 
    name: "Miami International Arbitration Society (MIAS)", 
    logo: "/images/logos/mias.jpg", 
    url: "https://miamiarbitration.com" 
  },
  { 
    name: "Brazilian Arbitration Committee (CBAR)", 
    logo: "/images/logos/cbar.jpg", 
    url: "https://cbar.org.br" 
  },
];

const barAdmissions = [
  { name: "District of Columbia", logo: "/images/logos/dcbar.jpg", url: "https://www.dcbar.org" },
  { name: "New York", logo: "/images/logos/nysba.jpg", url: "https://nysba.org" },
  { name: "Brazil", logo: "/images/logos/oab.jpg", url: "https://www.oab.org.br" },
];

// Languages reordered: English, Spanish, Portuguese as per client request
const languages = ["English", "Spanish", "Portuguese"];

// Symmetric testimonials - two side by side
const testimonials = [
  {
    quote: "Erica is a superstar who stands out for her extremely well-versed approach in high-stakes international disputes.",
    source: "Legal 500",
  },
  {
    quote: "I think really highly of her, she's fabulous. She comes across as very intelligent and capable, and she's always really professional and personable.",
    source: "Chambers USA",
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
    : "International Arbitrator and Counsel.";
    
  const heroSubtitle = language === "ES"
    ? "Resolviendo y previniendo disputas con integridad, eficiencia y rigor."
    : language === "PT"
    ? "Resolvendo e prevenindo disputas com integridade, eficiência e rigor."
    : "Resolving and preventing disputes with integrity, efficiency, and rigor.";

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
                {language === "ES" 
                  ? "Si bien su enfoque principal es su trabajo como árbitro, Erica continúa brindando servicios selectos de asesoría, ofreciendo evaluaciones legales y asesoramiento estratégico en cada etapa de una disputa—desde su inicio hasta la ejecución del laudo—aprovechando su profunda familiaridad con diversos marcos procesales y jurisdicciones."
                  : language === "PT"
                  ? "Embora seu foco principal seja seu trabalho como árbitro, Erica continua a fornecer serviços selecionados de consultoria, oferecendo avaliações legais e aconselhamento estratégico em cada estágio de uma disputa—desde seu início até a execução da sentença—aproveitando sua profunda familiaridade com diversos marcos processuais e jurisdições."
                  : "While her primary focus is on her work as an arbitrator, Erica continues to provide select counsel services, offering legal assessments and strategic advice at every stage of a dispute—from its inception through award enforcement—drawing on deep familiarity with diverse procedural frameworks and jurisdictions."}
              </p>

              <p>
                {language === "ES"
                  ? "Su práctica abarca una amplia gama de industrias y tipos de disputas, incluyendo gobierno corporativo, fusiones y adquisiciones (M&A), joint ventures, propiedad intelectual, disputas bajo la Convención de las Naciones Unidas sobre los Contratos de Compraventa Internacional de Mercaderías (CISG), privatización, telecomunicaciones, generación de energía, concesiones mineras, precios del gas y GNL, gestión hotelera, financiamiento de proyectos, inversiones de capital de riesgo y construcción. Su trayectoria incluye disputas corporativas de alto riesgo bajo las reglas de la CCI y CNUDMI, arbitrajes CIADI en los sectores de energía e infraestructura, y la ejecución de laudos arbitrales ante tribunales federales de EE.UU."
                  : language === "PT"
                  ? "Sua prática abrange uma ampla gama de indústrias e tipos de disputas, incluindo governança corporativa, fusões e aquisições (M&A), joint ventures, propriedade intelectual, disputas sob a Convenção das Nações Unidas sobre Contratos de Compra e Venda Internacional de Mercadorias (CISG), privatização, telecomunicações, geração de energia, concessões minerais, preços de gás e GNL, gestão hoteleira, financiamento de projetos, investimentos de capital de risco e construção. Seu histórico inclui disputas corporativas de alto risco sob as regras da ICC e UNCITRAL, arbitragens ICSID nos setores de energia e infraestrutura, e a execução de sentenças arbitrais perante tribunais federais dos EUA."
                  : "Her practice spans a broad range of industries and dispute types, including corporate governance, mergers and acquisitions (M&A), joint ventures, intellectual property, disputes under the United Nations Convention on Contracts for the International Sale of Goods (CISG), privatization, telecommunications, power generation, mineral concessions, gas pricing and LNG, hotel management, project finance, venture capital investments, and construction. Her track record includes high-stakes corporate disputes under ICC and UNCITRAL rules, ICSID arbitrations in the energy and infrastructure sectors, and the enforcement of arbitral awards before U.S. federal courts."}
              </p>

              <p>
                {language === "ES"
                  ? "Erica ha recibido reconocimiento de primer nivel de los principales directorios legales, incluyendo Chambers and Partners, The Legal 500, Lexology (anteriormente conocido como Who's Who Legal), Latin Lawyer y Best Lawyers, y ha sido nombrada una de las 100 Mejores Abogadas de América Latina por Latinvex."
                  : language === "PT"
                  ? "Erica recebeu reconhecimento de primeira linha dos principais diretórios jurídicos, incluindo Chambers and Partners, The Legal 500, Lexology (anteriormente conhecido como Who's Who Legal), Latin Lawyer e Best Lawyers, e foi nomeada uma das 100 Melhores Advogadas da América Latina pela Latinvex."
                  : "Erica has received top-tier recognition from leading legal directories, including Chambers and Partners, The Legal 500, Lexology (formerly known as Who's Who Legal), Latin Lawyer, and Best Lawyers, and has been named one of Latin America's Top 100 Female Lawyers by Latinvex."}
              </p>

              <p>
                {language === "ES"
                  ? "Además de su práctica, Erica publica regularmente y habla en conferencias de arbitraje internacional y ha dado clases en instituciones académicas líderes, incluyendo Georgetown University Law Center, donde ha enseñado un curso sobre arbitraje inversionista-Estado, y la Universidad de Miami, donde enseña un curso sobre arbitraje en el sector energético."
                  : language === "PT"
                  ? "Além de sua prática, Erica publica regularmente e fala em conferências de arbitragem internacional e lecionou em instituições acadêmicas líderes, incluindo Georgetown University Law Center, onde ensinou um curso sobre arbitragem investidor-Estado, e a Universidade de Miami, onde ensina um curso sobre arbitragem no setor de energia."
                  : "In addition to her practice, Erica regularly publishes and speaks at international arbitration conferences and has lectured at leading academic institutions, including Georgetown University Law Center, where she has taught a course on investor–state arbitration, and the University of Miami, where she teaches a course on arbitration in the energy sector."}
              </p>

              <p>
                {language === "ES"
                  ? "Antes de establecer su propia práctica, Erica ejerció durante 25 años en firmas de abogados globales líderes. Comenzó su carrera como litigante en Brasil, se trasladó a los Estados Unidos hace casi dos décadas y pasó casi 20 años en grandes firmas, incluyendo casi una década como socia. Está admitida para ejercer en Washington, D.C., Nueva York y Brasil, y trabaja en inglés, español y portugués."
                  : language === "PT"
                  ? "Antes de estabelecer sua própria prática, Erica exerceu durante 25 anos em escritórios de advocacia globais líderes. Ela começou sua carreira como litigante no Brasil, mudou-se para os Estados Unidos há quase duas décadas e passou quase 20 anos em grandes escritórios, incluindo quase uma década como sócia. Ela está admitida para exercer em Washington, D.C., Nova York e Brasil, e trabalha em inglês, espanhol e português."
                  : "Before establishing her own practice, Erica practiced for 25 years at leading global law firms. She began her career as a litigator in Brazil, relocated to the United States nearly two decades ago, and spent almost 20 years in Big Law, including nearly a decade as a partner. She is admitted to practice in Washington, D.C., New York, and Brazil, and she works in English, Spanish, and Portuguese."}
              </p>
            </div>
          </motion.div>

          {/* Symmetric Testimonials - Two side by side with LinkedIn-style logos */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-sm border-l-4 border-aquamarine">
                <div className="flex items-start gap-3 mb-4">
                  {/* LinkedIn-style logo placeholder */}
                  <div className="w-10 h-10 rounded-full bg-aquamarine/20 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-aquamarine" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
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
                    <div className="w-32 flex-shrink-0 hidden sm:flex items-center justify-start">
                      {item.logo && (
                        <img src={item.logo} alt={item.title} className="h-8 w-auto max-w-full object-contain" />
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
                    <div className="w-32 flex-shrink-0 hidden sm:flex items-center justify-start">
                      {item.logo && (
                        <img src={item.logo} alt={item.institution} className="h-8 w-auto max-w-full object-contain" />
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
                    <div className="w-32 flex-shrink-0 hidden sm:flex items-center justify-start">
                      {item.logo && (
                        <img src={item.logo} alt={item.institution} className="h-10 w-auto max-w-full object-contain" />
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
                  {/* LinkedIn-style logo display */}
                  <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center bg-gray-100 rounded">
                    {item.logo ? (
                      <img src={item.logo} alt={item.name} className="h-6 w-6 object-contain" />
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
