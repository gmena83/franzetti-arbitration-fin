import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

export default function CookiesPolicy() {
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
              {language === "ES" ? "Política de Cookies" : language === "PT" ? "Política de Cookies" : "Cookies Policy"}
            </h1>

            <div className="prose prose-lg max-w-none text-gray-700 space-y-8">
              <div>
                <h2 className="text-xl font-semibold text-charcoal mb-4">1. What are Cookies?</h2>
                <p className="text-justify">
                  Cookies are small text files placed on your device to help the website function properly.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-charcoal mb-4">2. How We Use Cookies</h2>
                <p className="text-justify">
                  The Franzetti Arbitration website is a custom build on the Manus platform. We use only strictly necessary cookies. These are essential for the technical operation of the site and do not track your personal behavior or identify you to third parties.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-charcoal mb-4">3. Third-Party Cookies</h2>
                <p className="text-justify">
                  We do not use third-party tracking, advertising, or analytics cookies (such as Google Analytics or Meta Pixels).
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-charcoal mb-4">4. Managing Cookies</h2>
                <p className="text-justify">
                  You can choose to block or delete cookies through your browser settings; however, certain parts of the site may not function correctly without them.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
