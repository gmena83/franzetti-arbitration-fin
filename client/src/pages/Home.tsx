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

import siteContent from "@/data/siteContent.json";

const {
  professionalBackground,
  teachingExperience,
  education,
  professionalAssociations,
  barAdmissions,
  carouselQuotes,
  about
} = siteContent.content;

/* Home Page - Franzetti Arbitration
 * Uses content from siteContent.json
 */

const languages = ["English", "Spanish", "Portuguese"];

// Hero Quotes Carousel Component - Compact with fixed height for hero section
function HeroQuotesCarousel({ quotes }: { quotes: any[] }) {
  const { getLocalized } = useLanguage();
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
                "{getLocalized(quotes[currentIndex].quote)}"
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
  const { t, getLocalized } = useLanguage();
  const content = siteContent.content;

  // SEO Meta Tags - Reset to default on home page
  useEffect(() => {
    document.title = "Home | Franzetti Arbitration - International Arbitrator & Counsel";

    let metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', t("about.description"));
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
                {t("hero.title")}
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
                className="w-full h-full object-cover rounded-sm shadow-xl min-h-[400px]"
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
              {t("about.title").toUpperCase()}
            </h2>

            <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
              <p>{getLocalized(about.p1)}</p>
              {/* Embedded Quote 1 - The Legal 500 */}
              <div className="my-8 ml-[12.5%] mr-[12.5%] pl-6 border-l-4 border-aquamarine">
                <p className="text-gray-700 italic text-lg">"{getLocalized(about.quote1)}"</p>
                <p className="text-sm text-gray-500 font-medium mt-2">– <em>{getLocalized(about.quoteSource1)}</em></p>
              </div>

              <p>{getLocalized(about.p2)}</p>
              <ul className="list-disc pl-6 space-y-2">
                {getLocalized(about.serviceList1).map((item: string, i: number) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>

              <p className="mt-6">{getLocalized(about.p3)}</p>
              <ul className="list-disc pl-6 space-y-2">
                {getLocalized(about.serviceList2).map((item: string, i: number) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>

              {/* Embedded Quote 2 - Chambers USA */}
              <div className="my-8 ml-[12.5%] mr-[12.5%] pl-6 border-l-4 border-aquamarine">
                <p className="text-gray-700 italic text-lg">"{getLocalized(about.quote2)}"</p>
                <p className="text-sm text-gray-500 font-medium mt-2">– <em>{getLocalized(about.quoteSource2)}</em></p>
              </div>

              <h3 className="text-2xl font-serif font-semibold text-charcoal mt-10 mb-6">
                {t("section.multijurisdictional")}
              </h3>

              <p>{getLocalized(about.p4)}</p>
              <ul className="list-disc pl-6 space-y-2">
                {getLocalized(about.sectorList).map((item: string, i: number) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>

              {/* Embedded Quote 3 - Lexology */}
              <div className="my-8 ml-[12.5%] mr-[12.5%] pl-6 border-l-4 border-aquamarine">
                <p className="text-gray-700 italic text-lg">"{getLocalized(about.quote3)}"</p>
                <p className="text-sm text-gray-500 font-medium mt-2">– <em>{getLocalized(about.quoteSource3)}</em></p>
              </div>

              <h3 className="text-2xl font-serif font-semibold text-charcoal mt-10 mb-6">
                {t("section.thoughtLeadershipTrajectory")}
              </h3>

              <p>{getLocalized(about.p5)}</p>

              <p>{getLocalized(about.p6)}</p>

              <p>{getLocalized(about.p7)}</p>
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
              {t("section.professionalBackground")}
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
                        <span className="text-gray-600">, {getLocalized(item, 'location')}</span>
                        <span className="text-gray-600">, {getLocalized(item, 'role')}</span>
                      </div>
                      <span className="text-gray-400 text-sm block sm:hidden mt-1">{item.period}</span>
                    </div>
                  </div>
                  <span className="text-gray-400 text-sm sm:text-base whitespace-nowrap hidden sm:block">{item.period}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Teaching Experience - "Professor" without "Adjunct" prefix */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <h3 id="teaching-experience" className="text-2xl font-serif font-semibold text-charcoal mb-8 pb-2 border-b border-gray-300">
              {t("section.teachingExperience")}
            </h3>
            <div className="space-y-4">
              {teachingExperience.map((item, index) => (
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
                        <span className="text-gray-600">, {getLocalized(item, 'role')}</span>
                        <span className="text-gray-600">, {getLocalized(item, 'course')}</span>
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
              {t("section.education")}
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
                        <span className="text-charcoal">{getLocalized(item, 'degree')}</span>
                        {getLocalized(item, 'note') && <span className="text-gray-600"> {getLocalized(item, 'note')}</span>}
                        {getLocalized(item, 'location') && <span className="text-gray-600">, {getLocalized(item, 'location')}</span>}
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
              {t("section.professionalAssociations")}
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
                      {getLocalized(item, 'name')}
                    </a>
                  ) : (
                    <span className="text-gray-700">{getLocalized(item, 'name')}</span>
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
                {t("section.barAdmissions")}
              </h3>
              <ul className="space-y-3">
                {barAdmissions.map((item, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <span className="inline-block w-2 h-2 rounded-full bg-aquamarine flex-shrink-0"></span>
                    {item.url ? (
                      <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-aquamarine transition-colors">
                        {getLocalized(item, 'name')}
                      </a>
                    ) : (
                      <span className="text-gray-700">{getLocalized(item, 'name')}</span>
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
                {t("section.languages")}
              </h3>
              <ul className="space-y-3">
                {languages.map((item, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <span className="inline-block w-2 h-2 rounded-full bg-aquamarine flex-shrink-0"></span>
                    <span className="text-gray-700">
                      {t(`lang.${item.toLowerCase()}`)}
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

