import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

export default function PrivacyPolicy() {
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
            <h1 className="text-3xl lg:text-4xl font-serif font-semibold text-charcoal mb-4">
              {language === "ES" ? "Política de Privacidad" : language === "PT" ? "Política de Privacidade" : "Privacy Policy"}
            </h1>
            
            <p className="text-sm text-gray-500 mb-8">
              {language === "ES" ? "Última actualización: Enero 2026" : language === "PT" ? "Última atualização: Janeiro 2026" : "Last Updated: January 2026"}
            </p>

            <div className="prose prose-lg max-w-none text-gray-700 space-y-8">
              <p className="text-justify">
                Franzetti Arbitration ("we," "us," or "our") is committed to protecting your privacy. This policy explains how we handle information collected through our website.
              </p>

              <div>
                <h2 className="text-xl font-semibold text-charcoal mb-4">1. Information We Collect</h2>
                <p className="text-justify mb-4">
                  We only collect personal information that you voluntarily provide to us via our contact form. This may include:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Name</li>
                  <li>Email address</li>
                  <li>Phone number</li>
                  <li>Any information included in your message</li>
                </ul>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-charcoal mb-4">2. How We Use Your Information</h2>
                <p className="text-justify mb-4">
                  We use the information provided solely to:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Respond to your inquiries</li>
                  <li>Facilitate client follow-ups</li>
                  <li>Provide information regarding our arbitration services</li>
                </ul>
                <p className="text-justify mt-4">
                  We do not use your data for automated marketing or share it with third parties for commercial purposes.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-charcoal mb-4">3. Legal Basis for Processing (GDPR/LGPD)</h2>
                <p className="text-justify">
                  If you are located in the EEA or Brazil, we process your data based on Legitimate Interest (responding to your direct request) or for the pre-contractual steps necessary to potentially enter into a professional engagement.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-charcoal mb-4">4. Data Retention</h2>
                <p className="text-justify">
                  We retain your contact information only as long as necessary to fulfill the purpose for which it was collected or to comply with legal and professional ethical obligations.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-charcoal mb-4">5. Your Rights</h2>
                <p className="text-justify">
                  Depending on your location, you may have the right to access, correct, or delete your personal data. To exercise these rights, please contact us at{" "}
                  <a href="mailto:admin@franzettiarb.com" className="text-aquamarine hover:underline">
                    admin@franzettiarb.com
                  </a>.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
