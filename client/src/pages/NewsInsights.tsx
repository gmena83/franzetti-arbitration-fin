import { motion } from "framer-motion";
import { useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

/* News and Insights Page - Franzetti Arbitration
 * Design: Professional Legal Minimalism
 * Currently empty placeholder page
 */

export default function NewsInsights() {
  const { language } = useLanguage();

  // SEO Meta Tags
  useEffect(() => {
    document.title = "News and Insights | Franzetti Arbitration";
    
    let metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Stay updated with the latest news and insights from Franzetti Arbitration on international arbitration developments.');
    }
    
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute('content', 'arbitration news, legal insights, international arbitration updates, Erica Franzetti');
    }
    
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', 'News and Insights | Franzetti Arbitration');
    
    let ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) ogDescription.setAttribute('content', 'Stay updated with the latest news and insights from Franzetti Arbitration.');
  }, []);

  const getTitle = () => {
    if (language === "ES") return "NOTICIAS Y PERSPECTIVAS";
    if (language === "PT") return "NOTÍCIAS E INSIGHTS";
    return "NEWS AND INSIGHTS";
  };

  const getSubtitle = () => {
    if (language === "ES") return "Próximamente";
    if (language === "PT") return "Em breve";
    return "Coming Soon";
  };

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-gray-100 py-16">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl lg:text-5xl font-serif font-semibold text-charcoal mb-4">
              {getTitle()}
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Empty Content Section */}
      <section className="py-24 lg:py-32">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center max-w-2xl mx-auto"
          >
            <p className="text-2xl text-gray-500 font-medium">
              {getSubtitle()}
            </p>
            <p className="mt-4 text-gray-400">
              {language === "ES" 
                ? "Esta sección se actualizará con noticias y perspectivas sobre arbitraje internacional."
                : language === "PT"
                ? "Esta seção será atualizada com notícias e insights sobre arbitragem internacional."
                : "This section will be updated with news and insights on international arbitration."}
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
