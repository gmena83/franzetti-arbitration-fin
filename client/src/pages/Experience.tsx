import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import siteContent from "@/data/siteContent.json";

/* Experience Page - Franzetti Arbitration
 * Design: Professional Legal Minimalism
 * Sections: Professional Background, Teaching, Education, Admissions, Languages, Professional Associations
 */

export default function Experience() {
  const { t, getLocalized } = useLanguage();
  const {
    professionalBackground,
    teachingExperience,
    education,
    barAdmissions,
    professionalAssociations,
    languages
  } = siteContent.content;

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
          {t("nav.expertise")}
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
                {t("section.professionalBackground")}
              </h2>
              <div className="space-y-4">
                {professionalBackground.map((item: any, index: number) => (
                  <div key={index} className="flex flex-col sm:flex-row sm:justify-between">
                    <div>
                      <span className="font-semibold text-charcoal">{item.title}</span>
                      <span className="text-gray-600">, {getLocalized(item, 'location')}</span>
                      <span className="text-gray-600">, {getLocalized(item, 'role')}</span>
                    </div>
                    <span className="text-gray-500 text-sm sm:text-base">{item.period}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Teaching Experience */}
            <section>
              <h2 className="text-2xl font-serif font-semibold text-charcoal mb-6 pb-2 border-b border-gray-200">
                {t("section.teachingExperience")}
              </h2>
              <div className="space-y-4">
                {teachingExperience.map((item: any, index: number) => (
                  <div key={index} className="flex flex-col sm:flex-row sm:justify-between">
                    <div>
                      <span className="font-semibold text-charcoal">{getLocalized(item, 'institution')}</span>
                      <span className="text-gray-600">, {getLocalized(item, 'role')}</span>
                      <span className="text-gray-600">, {getLocalized(item, 'course')}</span>
                    </div>
                    <span className="text-gray-500 text-sm sm:text-base">{item.period}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Education */}
            <section>
              <h2 className="text-2xl font-serif font-semibold text-charcoal mb-6 pb-2 border-b border-gray-200">
                {t("section.education")}
              </h2>
              <div className="space-y-3">
                {education.map((item: any, index: number) => (
                  <div key={index} className="flex flex-col sm:flex-row sm:justify-between">
                    <div>
                      <span className="font-semibold text-charcoal">{getLocalized(item, 'institution')}</span>
                      <span className="text-gray-600">, {getLocalized(item, 'degree')}</span>
                      {getLocalized(item, 'note') && <span className="text-gray-600"> {getLocalized(item, 'note')}</span>}
                      {getLocalized(item, 'location') && <span className="text-gray-600">, {getLocalized(item, 'location')}</span>}
                    </div>
                    <span className="text-gray-500 text-sm sm:text-base">{item.year}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Bar Admissions */}
            <section>
              <h2 className="text-2xl font-serif font-semibold text-charcoal mb-6 pb-2 border-b border-gray-200">
                {t("section.barAdmissions")}
              </h2>
              <ul className="bullet-aquamarine list-disc list-inside space-y-1">
                {barAdmissions.map((item: any, index: number) => (
                  <li key={index} className="text-gray-700">{getLocalized(item, 'name')}</li>
                ))}
              </ul>
            </section>

            {/* Languages */}
            <section>
              <h2 className="text-2xl font-serif font-semibold text-charcoal mb-6 pb-2 border-b border-gray-200">
                {t("section.languages")}
              </h2>
              <ul className="bullet-aquamarine list-disc list-inside space-y-1">
                {(languages || ["English", "Spanish", "Portuguese"]).map((item: any, index: number) => (
                  <li key={index} className="text-gray-700">{t(`lang.${item.toLowerCase()}`)}</li>
                ))}
              </ul>
            </section>

            {/* Professional Associations */}
            <section>
              <h2 className="text-2xl font-serif font-semibold text-charcoal mb-6 pb-2 border-b border-gray-200">
                {t("section.professionalAssociations")}
              </h2>
              <ul className="bullet-aquamarine list-disc list-inside space-y-2">
                {professionalAssociations.map((item: any, index: number) => (
                  <li key={index} className="text-gray-700">{getLocalized(item, 'name')}</li>
                ))}
              </ul>
            </section>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
