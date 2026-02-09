import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import siteContent from "@/data/siteContent.json";

/* Thought Leadership Page - Franzetti Arbitration
 * Design: Professional Legal Minimalism with client's requested changes
 * - Speaking photo (blue clothing)
 * - 11 Testimonials (from siteContent)
 * - Recognition with aquamarine symbols
 * - Speaking engagements without bullet points in sub-menus
 * - Publications in same format without bullet points
 */

type TabType = "recognition" | "speaking" | "publications" | "academia";

export default function ThoughtLeadership() {
  const [activeTab, setActiveTab] = useState<TabType>("recognition");
  const { t, getLocalized } = useLanguage();
  const content = siteContent.content;
  const tlContent = content.thoughtLeadership;

  // SEO Meta Tags
  useEffect(() => {
    document.title = "Thought Leadership | Franzetti Arbitration - Publications & Speaking";

    let metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Explore Erica Franzetti\'s thought leadership in international arbitration including publications, speaking engagements, and industry recognition.');
    }

    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute('content', 'arbitration publications, speaking engagements, legal recognition, Chambers Partners, The Legal 500, international arbitration thought leadership');
    }

    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', 'Thought Leadership | Franzetti Arbitration');

    let ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) ogDescription.setAttribute('content', 'Publications, speaking engagements, and industry recognition in international arbitration.');
  }, []);

  const getTabLabel = (tab: TabType) => {
    return t(`thoughtLeadership.${tab}`);
  };

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
              <h1 className="text-4xl lg:text-5xl font-serif font-semibold text-charcoal mb-6">
                {t("nav.thoughtLeadership")}
              </h1>
              <div className="bg-white p-6 rounded-sm border-l-4 border-aquamarine shadow-sm">
                <p className="text-lg text-gray-700 italic">
                  "{getLocalized(content.carouselQuotes[5].quote)}"
                </p>
                <p className="text-sm text-gray-500 font-medium mt-2">— {content.carouselQuotes[5].source} about Erica Franzetti</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex justify-center lg:justify-end"
            >
              <div className="grid grid-cols-2 gap-3 max-w-md">
                <img
                  src="/images/speaking-brazil-sitting.jpeg"
                  alt="Erica Franzetti sitting with Brazil background"
                  className="w-full h-40 object-cover rounded-sm shadow-lg"
                />
                <img
                  src="/images/speaking-podium-closeup.jpeg"
                  alt="Erica Franzetti smiling on podium"
                  className="w-full h-40 object-cover rounded-sm shadow-lg"
                />
                <img
                  src="/images/speaking-cbar-podium.jpeg"
                  alt="Erica Franzetti at CBAR Congress podium"
                  className="w-full h-40 object-cover rounded-sm shadow-lg"
                />
                <img
                  src="/images/speaking-white-suit.jpeg"
                  alt="Erica Franzetti in white suit with microphone"
                  className="w-full h-40 object-cover rounded-sm shadow-lg"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Tab Navigation - WITHOUT bullet points in sub-menus */}
      <section className="py-16 lg:py-24">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row md:flex-wrap gap-2 md:gap-6 mb-12 border-b border-gray-200"
          >
            {(["recognition", "speaking", "publications", "academia"] as TabType[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-4 px-2 text-lg font-medium transition-colors border-b-2 ${activeTab === tab
                  ? "text-aquamarine border-aquamarine"
                  : "text-gray-500 border-transparent hover:text-charcoal"
                  }`}
              >
                {getTabLabel(tab)}
              </button>
            ))}
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
              <div id="recognition" className="space-y-12">
                {/* Recognition List - WITHOUT bullet points */}
                <div className="space-y-8">
                  {tlContent.recognitions.map((item, index) => (
                    <div key={index} className="border-b border-gray-100 pb-6">
                      <h3 className="text-xl font-semibold text-charcoal mb-3">
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-aquamarine transition-colors"
                        >
                          {item.source}
                        </a>
                      </h3>
                      <div className="space-y-1 ml-0">
                        {item.details.map((detailObj: any, idx: number) => (
                          <p key={idx} className="text-gray-700">{getLocalized(detailObj)}</p>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Testimonials Grid - Using carouselQuotes for localized testimonials */}
                <div className="mt-16">
                  <h3 className="text-2xl font-serif font-semibold text-charcoal mb-8">
                    {t("section.whatOthersSay")}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {content.carouselQuotes.map((testimonial: any, index: number) => (
                      <div key={index} className="bg-gray-50 p-6 rounded-sm border-l-4 border-aquamarine">
                        <p className="text-gray-700 italic mb-3 whitespace-pre-line">
                          "{getLocalized(testimonial.quote)}"
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

            {/* Speaking Engagements Tab - WITHOUT bullet points */}
            {activeTab === "speaking" && (
              <div id="speaking" className="space-y-8">
                {tlContent.speakingEngagements.map((item: any, index: number) => (
                  <div key={index} className="pb-6 border-b border-gray-100">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-charcoal mb-3">
                        {getLocalized(item.title)}
                      </h3>
                      <p className="text-gray-700">
                        {getLocalized(item.event)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Publications Tab - WITHOUT bullet points */}
            {activeTab === "publications" && (
              <div id="publications" className="space-y-8">
                {tlContent.publications.map((item: any, index: number) => (
                  <div key={index} className="pb-6 border-b border-gray-100">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-charcoal mb-3">
                        {getLocalized(item.title)}
                      </h3>
                      <p className="text-gray-700">
                        {getLocalized(item.publication)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Teaching Experience Tab */}
            {activeTab === "academia" && (
              <div id="teaching-experience" className="space-y-6">
                {tlContent.teachingExperience.map((item, index) => (
                  <div key={index} className="flex items-start gap-6 pb-6 border-b border-gray-100">
                    <div className="w-20 h-20 flex-shrink-0 flex items-center justify-center">
                      <img src={item.logo} alt={item.institution} className="max-w-full max-h-full object-contain" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-charcoal mb-3">
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-aquamarine transition-colors"
                        >
                          {item.institution}
                        </a>
                      </h3>
                      <p className="text-gray-700">{getLocalized(item, 'role')}</p>
                      <p className="text-gray-600 text-sm">{getLocalized(item, 'course')}</p>
                      <p className="text-gray-400 text-sm mt-1">{item.period}</p>
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
