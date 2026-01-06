import { motion } from "framer-motion";

/* Home Page - Franzetti Arbitration
 * Design: Professional Legal Minimalism with client's requested changes
 * - Whiter base color
 * - Profile instead of Home
 * - Hero with photo (looking at camera, holding hands)
 * - Testimonials section
 * - Full About section with Experience details
 * - Institution logos with URLs
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
    degree: "Specialization",
    institution: "Getúlio Vargas Foundation",
    note: "Business and Economics Law",
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

const professionalAssociations = [
  { name: "Panel of Arbitrators of the International Centre of Dispute Resolution (ICDR)", logo: "/images/logos/aaa-icdr.jpg", url: "https://www.icdr.org" },
  { name: "Panel of Arbitrators of the American Arbitration Association (AAA)", logo: "/images/logos/aaa-icdr.jpg", url: "https://www.adr.org" },
  { name: "Panel of Arbitrators of the Hong Kong International Arbitration Centre (HKIAC)", url: "https://www.hkiac.org" },
  { name: "Panel of Arbitrators of the Brazil-Canada Chamber of Commerce (CAM-CCBC)", logo: "/images/logos/cam-ccbc.png", url: "https://ccbc.org.br/cam-ccbc-centro-arbitragem-mediacao" },
  { name: "Panel of Arbitrators of the Capital Market Chamber of B3 S.A – Brasil, Bolsa, Balcão (CAM)", url: "https://www.b3.com.br" },
  { name: "Arbitration and Mediation Committee of the International Court of Commerce (ICC) Brazil", logo: "/images/logos/icc.png", url: "https://iccwbo.org/dispute-resolution/dispute-resolution-services/arbitration" },
  { name: "International Bar Association – Dispute Resolution Section", logo: "/images/logos/iba.png", url: "https://www.ibanet.org" },
  { name: "Rising Arbitrators Initiative (RAI)", url: "https://www.risingarbitrators.org" },
  { name: "Arbitral Women", logo: "/images/logos/arbitralwomen.jpg", url: "https://www.arbitralwomen.org" },
  { name: "Miami International Arbitration Society (MIAS)", logo: "/images/logos/mias.jpg", url: "https://miamiarbitration.com" },
  { name: "Brazilian Arbitration Committee (CBAR)", logo: "/images/logos/cbar.jpg", url: "https://cbar.org.br" },
];

const barAdmissions = [
  { name: "District of Columbia", logo: "/images/logos/dcbar.jpg", url: "https://www.dcbar.org" },
  { name: "New York", logo: "/images/logos/nysba.jpg", url: "https://nysba.org" },
  { name: "Brazil", logo: "/images/logos/oab.jpg", url: "https://www.oab.org.br" },
];

const languages = ["English", "Portuguese", "Spanish"];

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
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-gray-100">
        <div className="container py-16 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-4"
            >
              <h1 className="text-3xl lg:text-4xl font-serif font-bold text-charcoal">
                International Arbitrator and Counsel.
              </h1>
              <p className="text-lg lg:text-xl text-gray-600 leading-relaxed">
                Resolving and preventing disputes with integrity, efficiency, and rigor.
              </p>
            </motion.div>

            {/* Hero Image - Looking at camera, holding hands */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <img
                src="/images/EricaFranzetti39057-RT.jpg"
                alt="Erica Franzetti"
                className="w-full max-w-lg mx-auto lg:ml-auto object-cover rounded-sm shadow-xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Section with Testimonials */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* About Text */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-2"
            >
              <h2 className="text-3xl lg:text-4xl font-serif font-semibold text-charcoal mb-8">
                ABOUT
              </h2>

              <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
                <p>
                  Erica Franzetti is a leading international arbitrator and counsel
                  with extensive experience in international commercial and
                  investor–state arbitration across a wide range of industry
                  sectors, including energy, natural resources, infrastructure,
                  manufacturing, financial services, and technology.
                </p>

                <p>
                  Drawing on decades of experience as counsel in complex, high‑value
                  disputes, Erica brings a deep understanding of arbitral strategy,
                  procedure, and advocacy to her work as an arbitrator.
                </p>

                <p>
                  Erica has served as an arbitrator in both domestic and
                  international commercial disputes, including as chair of arbitral
                  tribunals constituted under various institutional and ad hoc
                  rules. Her experience on all sides of arbitration enables her to
                  manage proceedings efficiently and fairly, with a practical
                  appreciation of the challenges faced by parties and counsel.
                </p>

                <p>
                  While her primary focus is on her work as an arbitrator, Erica
                  continues to provide select counsel services, offering legal
                  assessments and strategic advice at every stage of a dispute—from
                  its inception through award enforcement—drawing on deep
                  familiarity with diverse procedural frameworks and jurisdictions.
                </p>

                <p>
                  In addition to her arbitral practice, Erica is actively engaged in
                  the academic and professional development of international
                  arbitration. She frequently teaches, publishes, and speaks on
                  arbitration‑related topics, sharing insights drawn from her
                  practical experience and scholarly interests to help advance
                  dialogue and best practices in the field.
                </p>

                <p>
                  Before establishing her own practice, Erica practiced for 25 years
                  at leading global law firms. She began her career as a litigator
                  in Brazil, relocated to the United States nearly two decades ago,
                  and spent almost 20 years in Big Law, including nearly a decade as
                  a partner. She is admitted to practice in Washington, D.C., New
                  York, and Brazil, and she works in English, Spanish, and
                  Portuguese.
                </p>
              </div>
            </motion.div>

            {/* Testimonials Sidebar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-8"
            >
              {testimonials.map((testimonial, index) => (
                <div key={index} className="bg-gray-50 p-6 rounded-sm border-l-4 border-aquamarine">
                  <blockquote className="text-gray-700 italic mb-3">
                    "{testimonial.quote}"
                  </blockquote>
                  <p className="text-sm text-gray-500 font-medium">
                    — {testimonial.source}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>
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
            <h3 className="text-2xl font-serif font-semibold text-charcoal mb-8 pb-2 border-b border-gray-200">
              Professional Background
            </h3>
            <div className="space-y-4">
              {professionalBackground.map((item, index) => (
                <div key={index} className="flex flex-col sm:flex-row sm:justify-between py-3 items-start sm:items-center">
                  <div className="flex items-center gap-4">
                    {item.logo && (
                      <img src={item.logo} alt={item.title} className="h-8 w-auto object-contain hidden sm:block" />
                    )}
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
                  <span className="text-gray-400 text-sm sm:text-base mt-1 sm:mt-0">{item.period}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Academia (formerly Teaching Experience) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <h3 className="text-2xl font-serif font-semibold text-charcoal mb-8 pb-2 border-b border-gray-200">
              Academia
            </h3>
            <div className="space-y-4">
              {academia.map((item, index) => (
                <div key={index} className="flex flex-col sm:flex-row sm:justify-between py-3 items-start sm:items-center">
                  <div className="flex items-center gap-4">
                    {item.logo && (
                      <img src={item.logo} alt={item.institution} className="h-8 w-auto object-contain hidden sm:block" />
                    )}
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
            <h3 className="text-2xl font-serif font-semibold text-charcoal mb-8 pb-2 border-b border-gray-200">
              Education
            </h3>
            <div className="space-y-4">
              {education.map((item, index) => (
                <div key={index} className="flex flex-col sm:flex-row sm:justify-between py-3 items-start sm:items-center">
                  <div className="flex items-center gap-4">
                    {item.logo && (
                      <img src={item.logo} alt={item.institution} className="h-10 w-auto object-contain hidden sm:block" />
                    )}
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

          {/* Professional Associations */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <h3 className="text-2xl font-serif font-semibold text-charcoal mb-8 pb-2 border-b border-gray-200">
              Professional Associations
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {professionalAssociations.map((item, index) => (
                <div key={index} className="flex items-center gap-3 py-2">
                  <span className="inline-block w-2 h-2 rounded-full bg-aquamarine flex-shrink-0"></span>
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
              <h3 className="text-2xl font-serif font-semibold text-charcoal mb-8 pb-2 border-b border-gray-200">
                Bar Admissions
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

            {/* Languages */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-2xl font-serif font-semibold text-charcoal mb-8 pb-2 border-b border-gray-200">
                Languages
              </h3>
              <ul className="space-y-3">
                {languages.map((item, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <span className="inline-block w-2 h-2 rounded-full bg-aquamarine flex-shrink-0"></span>
                    <span className="text-gray-700">{item}</span>
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
