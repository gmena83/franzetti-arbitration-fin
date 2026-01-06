import { motion } from "framer-motion";

/* Experience Page - Franzetti Arbitration
 * Design: Professional Legal Minimalism
 * Sections: Professional Background, Teaching, Education, Admissions, Languages, Professional Associations
 */

const professionalBackground = [
  {
    title: "Franzetti Arbitration",
    location: "Washington, DC",
    role: "Founder and Principal",
    period: "Dec. 2025 – Present",
  },
  {
    title: "King & Spalding LLP",
    location: "Washington, DC and Miami",
    role: "Partner",
    period: "Sept. 2021 – Dec. 2025",
  },
  {
    title: "Dechert LLP",
    location: "Washington, DC",
    role: "Partner",
    period: "Sept. 2015 – Sept. 2021",
  },
  {
    title: "Weil, Gotshal & Manges LLP",
    location: "Washington, DC",
    role: "Associate",
    period: "Jul. 2012 – Sept. 2015",
  },
  {
    title: "Crowell & Moring LLP",
    location: "Washington, DC",
    role: "Associate",
    period: "Sept. 2008 – Jul. 2012",
  },
  {
    title: "Wald & Advogados Associados",
    location: "São Paulo, Brazil",
    role: "Associate",
    period: "Jul. 2001 – Sept. 2006",
  },
  {
    title: "Dinamarco & Rossi Advocacia",
    location: "São Paulo",
    role: "Associate / Intern",
    period: "Jul. 1997 – Jul. 2001",
  },
];

const teachingExperience = [
  {
    institution: "University of Miami",
    role: "Adjunct Professor",
    course: "International Arbitration in the Energy Sector",
    period: "2024-2025",
  },
  {
    institution: "Georgetown University Law Center",
    role: "Adjunct Professor",
    course: "Investor-State Dispute Resolution",
    period: "2017-2022",
  },
];

const education = [
  {
    degree: "LL.M.",
    institution: "Georgetown University Law Center",
    note: "Dean's List",
    year: "2008",
  },
  {
    degree: "Specialization",
    institution: "Getúlio Vargas Foundation",
    note: "Business and Economics Law",
    year: "2006",
  },
  {
    degree: "LL.B.",
    institution: "University of São Paulo, Law School",
    note: "",
    year: "2000",
  },
];

const admissions = ["District of Columbia", "New York", "Brazil"];

const languages = ["English", "Portuguese", "Spanish"];

const professionalAssociations = [
  "Panel of Arbitrators of the International Centre of Dispute Resolution (ICDR)",
  "Panel of Arbitrators of the American Arbitration Association (AAA)",
  "Panel of Arbitrators of the Hong Kong International Arbitration Centre (HKIAC)",
  "Panel of Arbitrators of the Brazil-Canada Chamber of Commerce (CAM-CCBC)",
  "Panel of Arbitrators of the Capital Market Chamber of B3 S.A – Brasil, Bolsa, Balcão (CAM)",
  "Arbitration and Mediation Committee of the International Court of Commerce (ICC) Brazil",
  "International Bar Association – Dispute Resolution Section",
  "Rising Arbitrators Initiative (RAI)",
  "Arbitral Women",
  "Miami International Arbitration Society (MIAS)",
  "Brazilian Arbitration Committee (CBAR)",
];

export default function Experience() {
  return (
    <div className="py-16 lg:py-24">
      <div className="container">
        {/* Page Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl lg:text-5xl font-serif font-semibold text-charcoal mb-16"
        >
          EXPERIENCE
        </motion.h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
          {/* Left Column - Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-1"
          >
            <img
              src="/images/EricaFranzetti39134-RT.jpg"
              alt="Erica Franzetti"
              className="w-full aspect-[3/4] object-cover rounded-sm shadow-lg"
            />
          </motion.div>

          {/* Right Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-2 space-y-12"
          >
            {/* Professional Background */}
            <section>
              <h2 className="text-2xl font-serif font-semibold text-charcoal mb-6 pb-2 border-b border-gray-200">
                Professional Background
              </h2>
              <div className="space-y-4">
                {professionalBackground.map((item, index) => (
                  <div key={index} className="flex flex-col sm:flex-row sm:justify-between">
                    <div>
                      <span className="font-semibold text-charcoal">{item.title}</span>
                      <span className="text-gray-600">, {item.location}</span>
                      <span className="text-gray-600">, {item.role}</span>
                    </div>
                    <span className="text-gray-500 text-sm sm:text-base">{item.period}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Teaching Experience */}
            <section>
              <h2 className="text-2xl font-serif font-semibold text-charcoal mb-6 pb-2 border-b border-gray-200">
                Teaching Experience
              </h2>
              <div className="space-y-4">
                {teachingExperience.map((item, index) => (
                  <div key={index} className="flex flex-col sm:flex-row sm:justify-between">
                    <div>
                      <span className="font-semibold text-charcoal">{item.institution}</span>
                      <span className="text-gray-600">, {item.role}</span>
                      <span className="text-gray-600">, {item.course}</span>
                    </div>
                    <span className="text-gray-500 text-sm sm:text-base">{item.period}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Education */}
            <section>
              <h2 className="text-2xl font-serif font-semibold text-charcoal mb-6 pb-2 border-b border-gray-200">
                Education
              </h2>
              <div className="space-y-3">
                {education.map((item, index) => (
                  <div key={index} className="flex flex-col sm:flex-row sm:justify-between">
                    <div>
                      <span className="font-semibold text-charcoal">{item.degree}</span>
                      <span className="text-gray-600">, {item.institution}</span>
                      {item.note && <span className="text-gray-500"> ({item.note})</span>}
                    </div>
                    <span className="text-gray-500 text-sm sm:text-base">{item.year}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Bar Admissions */}
            <section>
              <h2 className="text-2xl font-serif font-semibold text-charcoal mb-6 pb-2 border-b border-gray-200">
                Bar Admissions
              </h2>
              <ul className="bullet-aquamarine list-disc list-inside space-y-1">
                {admissions.map((item, index) => (
                  <li key={index} className="text-gray-700">{item}</li>
                ))}
              </ul>
            </section>

            {/* Languages */}
            <section>
              <h2 className="text-2xl font-serif font-semibold text-charcoal mb-6 pb-2 border-b border-gray-200">
                Languages
              </h2>
              <ul className="bullet-aquamarine list-disc list-inside space-y-1">
                {languages.map((item, index) => (
                  <li key={index} className="text-gray-700">{item}</li>
                ))}
              </ul>
            </section>

            {/* Professional Associations */}
            <section>
              <h2 className="text-2xl font-serif font-semibold text-charcoal mb-6 pb-2 border-b border-gray-200">
                Professional Associations
              </h2>
              <ul className="bullet-aquamarine list-disc list-inside space-y-2">
                {professionalAssociations.map((item, index) => (
                  <li key={index} className="text-gray-700">{item}</li>
                ))}
              </ul>
            </section>
          </motion.div>
        </div>

        {/* CV Download Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 pt-8 border-t border-gray-200"
        >
          <h3 className="text-xl font-serif font-semibold text-charcoal mb-4">
            Download CV
          </h3>
          <div className="flex flex-wrap gap-4">
            <a
              href="#"
              className="inline-flex items-center px-4 py-2 bg-aquamarine text-white rounded hover:bg-opacity-90 transition-colors text-sm font-medium"
            >
              English
            </a>
            <a
              href="#"
              className="inline-flex items-center px-4 py-2 bg-aquamarine text-white rounded hover:bg-opacity-90 transition-colors text-sm font-medium"
            >
              Español
            </a>
            <a
              href="#"
              className="inline-flex items-center px-4 py-2 bg-aquamarine text-white rounded hover:bg-opacity-90 transition-colors text-sm font-medium"
            >
              Português
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
