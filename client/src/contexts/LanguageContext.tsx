const LanguageContext = React.createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('EN');

  const translations = {
    EN: {
      about: {
        description: "Erica Franzetti is an international arbitrator and counsel with extensive experience in international commercial and investor-state arbitration. She has been involved in more than 100 international arbitrations under various rules (ICC, ICSID, UNCITRAL, AAA/ICDR, SCC, LCIA) and has served as counsel, co-arbitrator, and sole arbitrator in disputes involving parties from Latin America, Europe, Africa, and Asia."
      }
    },
    ES: {
      about: {
        description: "Erica Franzetti es árbitro internacional y abogada con amplia experiencia en arbitraje comercial internacional y arbitraje inversionista-Estado. Ha participado en más de 100 arbitrajes internacionales bajo diversas reglas (ICC, ICSID, UNCITRAL, AAA/ICDR, SCC, LCIA) y ha actuado como abogada, co-árbitro y árbitro único en disputas que involucran partes de América Latina, Europa, África y Asia."
      }
    },
    PT: {
      about: {
        description: "Erica Franzetti é árbitro internacional e advogada com vasta experiência em arbitragem comercial internacional e arbitragem investidor-Estado. Ela participou de mais de 100 arbitragens internacionais sob várias regras (ICC, ICSID, UNCITRAL, AAA/ICDR, SCC, LCIA) e atuou como advogada, co-árbitro e árbitro único em disputas envolvendo partes da América Latina, Europa, África e Ásia."
      }
    }
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, translations }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  return useContext(LanguageContext);
};