import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Mail, Phone, MapPin } from "lucide-react";

/* Contact Page - Franzetti Arbitration
 * Design: Professional Legal Minimalism with client's requested changes
 * - Photo of Erica in black, leaning against wall
 * - Updated contact info
 * - LinkedIn and WhatsApp symbols
 * - CV downloads
 */

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    role: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // SEO Meta Tags
  useEffect(() => {
    document.title = "Contact | Franzetti Arbitration - Get in Touch";
    
    let metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Contact Erica Franzetti for international arbitration services. Based in Washington, DC with global reach. Available for arbitrator appointments and counsel services.');
    }
    
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute('content', 'contact arbitrator, international arbitration services, Washington DC arbitrator, arbitrator appointment, legal counsel contact');
    }
    
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', 'Contact | Franzetti Arbitration');
    
    let ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) ogDescription.setAttribute('content', 'Contact Erica Franzetti for international arbitration services. Based in Washington, DC.');
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    toast.success("Message sent successfully! We will get back to you soon.");
    setFormData({ name: "", surname: "", email: "", role: "", message: "" });
    setIsSubmitting(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-gray-100 py-16">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl lg:text-5xl font-serif font-semibold text-charcoal mb-4">
                CONTACT
              </h1>
              <p className="text-lg text-gray-600">
                For inquiries, please use the contact form below or reach out directly.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex justify-center lg:justify-end"
            >
              <img
                src="/images/EricaFranzetti39134-RT.jpg"
                alt="Erica Franzetti"
                className="w-full max-w-xs object-cover rounded-sm shadow-lg"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-16 lg:py-24">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-2xl font-serif font-semibold text-charcoal mb-8">
                Send a Message
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name *</Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="border-gray-300 focus:border-aquamarine focus:ring-aquamarine"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="surname">Surname *</Label>
                    <Input
                      id="surname"
                      name="surname"
                      type="text"
                      required
                      value={formData.surname}
                      onChange={handleChange}
                      className="border-gray-300 focus:border-aquamarine focus:ring-aquamarine"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="border-gray-300 focus:border-aquamarine focus:ring-aquamarine"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="role">Role / Organization</Label>
                  <Input
                    id="role"
                    name="role"
                    type="text"
                    value={formData.role}
                    onChange={handleChange}
                    className="border-gray-300 focus:border-aquamarine focus:ring-aquamarine"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message *</Label>
                  <Textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    className="border-gray-300 focus:border-aquamarine focus:ring-aquamarine resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto bg-aquamarine hover:bg-aquamarine/90 text-white px-8 py-3"
                >
                  {isSubmitting ? "Sending..." : "SUBMIT"}
                </Button>
              </form>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-2xl font-serif font-semibold text-charcoal mb-8">
                  Erica Franzetti
                </h2>
                
                {/* Contact Details with Icons */}
                <div className="space-y-4">
                  <a
                    href="mailto:efranzetti@franzettiarb.com"
                    className="flex items-center gap-3 text-charcoal hover:text-aquamarine transition-colors"
                  >
                    <Mail className="w-5 h-5 text-aquamarine" />
                    <span>efranzetti@franzettiarb.com</span>
                  </a>
                  
                  <a
                    href="tel:+12027431132"
                    className="flex items-center gap-3 text-charcoal hover:text-aquamarine transition-colors"
                  >
                    <Phone className="w-5 h-5 text-aquamarine" />
                    <span>+1 202 743 1132</span>
                  </a>
                  
                  <a
                    href="https://maps.google.com/?q=1701+Pennsylvania+Ave+NW,+Suite+200,+Washington,+DC+20006"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-3 text-charcoal hover:text-aquamarine transition-colors"
                  >
                    <MapPin className="w-5 h-5 text-aquamarine flex-shrink-0 mt-0.5" />
                    <span>1701 Pennsylvania Ave NW, Suite 200<br />Washington, DC 20006</span>
                  </a>
                </div>
              </div>

              {/* Social Links */}
              <div className="pt-6 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-charcoal mb-4">Connect</h3>
                <div className="flex items-center gap-6">
                  <a
                    href="https://www.linkedin.com/in/erica-franzetti-48a7b1a/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-charcoal hover:text-aquamarine transition-colors"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                    <span>Personal Profile</span>
                  </a>
                  <a
                    href="http://linkedin.com/company/franzettiarbitration"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-charcoal hover:text-aquamarine transition-colors"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                    <span>Business Profile</span>
                  </a>
                </div>
              </div>



              {/* V-Card Download */}
              <div className="pt-4">
                <a
                  href="#"
                  className="inline-flex items-center text-charcoal hover:text-aquamarine transition-colors text-sm"
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                    />
                  </svg>
                  Download V-Card
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
