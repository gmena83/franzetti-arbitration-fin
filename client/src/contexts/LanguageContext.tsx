import { createContext, useContext, useState, ReactNode } from "react";

type Language = "EN" | "ES" | "PT";

interface Translations {
  [key: string]: {
    EN: string;
    ES: string;
    PT: string;
  };
}

// All website translations
export const translations: Translations = {
  // Navigation
  "nav.profile": { EN: "PROFILE", ES: "PERFIL", PT: "PERFIL" },
  "nav.expertise": { EN: "EXPERIENCE", ES: "EXPERIENCIA", PT: "EXPERIÊNCIA" },
  "nav.thoughtLeadership": { EN: "THOUGHT LEADERSHIP", ES: "LIDERAZGO INTELECTUAL", PT: "LIDERANÇA INTELECTUAL" },
  "nav.contact": { EN: "CONTACT", ES: "CONTACTO", PT: "CONTATO" },
  
  // Hero Section
  "hero.title": { 
    EN: "Independent Arbitrator & Counsel", 
    ES: "Árbitro Internacional y Abogada.", 
    PT: "Árbitro Internacional e Advogada." 
  },
  "hero.subtitle": { 
    EN: "Resolving and preventing disputes with integrity, efficiency, and rigor.", 
    ES: "Resolviendo y previniendo disputas con integridad, eficiencia y rigor.", 
    PT: "Resolvendo e prevenindo disputas com integridade, eficiência e rigor." 
  },
  
  // About Section
  "about.title": { EN: "About", ES: "Sobre", PT: "Sobre" },
  "about.description": {
    EN: "Erica Franzetti is an international arbitrator and counsel with extensive experience in international commercial and investor-state arbitration. She has been involved in more than 100 international arbitrations under various rules (ICC, ICSID, UNCITRAL, AAA/ICDR, SCC, LCIA) and has served as counsel, co-arbitrator, and sole arbitrator in disputes involving parties from Latin America, Europe, Africa, and Asia.",
    ES: "Erica Franzetti es árbitro internacional y abogada con amplia experiencia en arbitraje comercial internacional y arbitraje inversionista-Estado. Ha participado en más de 100 arbitrajes internacionales bajo diversas reglas (ICC, ICSID, UNCITRAL, AAA/ICDR, SCC, LCIA) y ha actuado como abogada, co-árbitro y árbitro único en disputas que involucran partes de América Latina, Europa, África y Asia.",
    PT: "Erica Franzetti é árbitro internacional e advogada com vasta experiência em arbitragem comercial internacional e arbitragem investidor-Estado. Ela participou de mais de 100 arbitragens internacionais sob várias regras (ICC, ICSID, UNCITRAL, AAA/ICDR, SCC, LCIA) e atuou como advogada, co-árbitro e árbitro único em disputas envolvendo partes da América Latina, Europa, África e Ásia."
  },
  
  // Section Titles
  "section.professionalBackground": { EN: "Professional Background", ES: "Trayectoria Profesional", PT: "Trajetória Profissional" },
  "section.academia": { EN: "Academia", ES: "Academia", PT: "Academia" },
  "section.education": { EN: "Education", ES: "Educación", PT: "Educação" },
  "section.professionalAssociations": { EN: "Professional Associations", ES: "Asociaciones Profesionales", PT: "Associações Profissionais" },
  "section.barAdmissions": { EN: "Bar Admissions", ES: "Colegiaturas", PT: "Inscrições na Ordem" },
  "section.languages": { EN: "Languages", ES: "Idiomas", PT: "Idiomas" },
  "section.whatOthersSay": { EN: "What Others Say", ES: "Lo Que Dicen Otros", PT: "O Que Outros Dizem" },
  
  // Expertise Page
  "expertise.title": { EN: "Experience", ES: "Experiencia", PT: "Experiência" },
  "expertise.subtitle": { 
    EN: "Proven track record across diverse sectors and dispute types", 
    ES: "Trayectoria comprobada en diversos sectores y tipos de disputas", 
    PT: "Trajetória comprovada em diversos setores e tipos de disputas" 
  },
  
  // Thought Leadership Page
  "thoughtLeadership.title": { EN: "Thought Leadership", ES: "Liderazgo Intelectual", PT: "Liderança Intelectual" },
  "thoughtLeadership.recognition": { EN: "Recognition", ES: "Reconocimientos", PT: "Reconhecimentos" },
  "thoughtLeadership.speaking": { EN: "Speaking Engagements", ES: "Conferencias", PT: "Palestras" },
  "thoughtLeadership.publications": { EN: "Publications", ES: "Publicaciones", PT: "Publicações" },
  
  // Contact Page
  "contact.title": { EN: "Contact", ES: "Contacto", PT: "Contato" },
  "contact.subtitle": { 
    EN: "Get in touch to discuss how I can assist with your arbitration needs.", 
    ES: "Póngase en contacto para discutir cómo puedo ayudarle con sus necesidades de arbitraje.", 
    PT: "Entre em contato para discutir como posso ajudá-lo com suas necessidades de arbitragem." 
  },
  "contact.name": { EN: "Name", ES: "Nombre", PT: "Nome" },
  "contact.email": { EN: "Email", ES: "Correo Electrónico", PT: "E-mail" },
  "contact.role": { EN: "Role / Organization", ES: "Cargo / Organización", PT: "Cargo / Organização" },
  "contact.message": { EN: "Message", ES: "Mensaje", PT: "Mensagem" },
  "contact.send": { EN: "Send Message", ES: "Enviar Mensaje", PT: "Enviar Mensagem" },
  "contact.sending": { EN: "Sending...", ES: "Enviando...", PT: "Enviando..." },
  
  // Footer
  "footer.downloadCV": { EN: "Download CV", ES: "Descargar CV", PT: "Baixar CV" },
  "footer.downloadVCard": { EN: "Download V-Card", ES: "Descargar V-Card", PT: "Baixar V-Card" },
  "footer.disclaimer": { EN: "Disclaimer", ES: "Aviso Legal", PT: "Aviso Legal" },
  "footer.privacy": { EN: "Privacy Policy", ES: "Política de Privacidad", PT: "Política de Privacidade" },
  "footer.cookies": { EN: "Cookies Policy", ES: "Política de Cookies", PT: "Política de Cookies" },
  "footer.rights": { EN: "All rights reserved.", ES: "Todos los derechos reservados.", PT: "Todos os direitos reservados." },
  
  // Languages
  "lang.english": { EN: "English", ES: "Inglés", PT: "Inglês" },
  "lang.spanish": { EN: "Spanish", ES: "Español", PT: "Espanhol" },
  "lang.portuguese": { EN: "Portuguese", ES: "Portugués", PT: "Português" },
  
  // CV Links
  "footer.cvEnglish": { EN: "CV-English", ES: "CV-Inglés", PT: "CV-Inglês" },
  "footer.cvEnglishMini": { EN: "CV-English-Mini", ES: "CV-Inglés-Mini", PT: "CV-Inglês-Mini" },
  "footer.vcard": { EN: "V-Card", ES: "V-Card", PT: "V-Card" },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("EN");

  const t = (key: string): string => {
    const translation = translations[key];
    if (!translation) {
      console.warn(`Translation missing for key: ${key}`);
      return key;
    }
    return translation[language];
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}