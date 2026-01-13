import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Disclaimer() {
  const { language } = useLanguage();

  return (
    <div className="bg-white min-h-screen">
      <section className="py-16 lg:py-24">
        <div className="container max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl lg:text-4xl font-serif font-semibold text-charcoal mb-8">
              {language === "ES" ? "Aviso Legal" : language === "PT" ? "Aviso Legal" : "Disclaimer"}
            </h1>

            <div className="prose prose-lg max-w-none text-gray-700 space-y-8">
              <div>
                <h2 className="text-xl font-semibold text-charcoal mb-4">1. Arbitrator Disclosure</h2>
                <p className="text-justify">
                  The materials on this website are for general informational purposes only and do not constitute a complete or up-to-date disclosure of the professional activities of Erica Franzetti. They should not be relied upon to identify or assess any potential conflicts of interest, and some of the matters described have been closed for many years. Any party wishing to appoint Erica Franzetti as arbitrator or counsel should request a specific conflicts check for the relevant matter. As of January 14, 2026, Erica Franzetti no longer has access to the databases of her prior law firm, King & Spalding, and is unable to request that firm to conduct conflicts checks.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-charcoal mb-4">2. External Links</h2>
                <p className="text-justify">
                  This website may contain links to external resources. Franzetti Arbitration is not responsible for the content or accuracy of any third-party sites.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
