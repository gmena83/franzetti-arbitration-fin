const fs = require('fs');
const path = require('path');

const siteContentPath = path.join(__dirname, 'src', 'data', 'siteContent.json');
const siteContent = JSON.parse(fs.readFileSync(siteContentPath, 'utf8'));

// Content is under siteContent.content
const content = siteContent.content;

// Original English Speaking Engagements from ThoughtLeadership.tsx
const originalEnSpeaking = [
    { title: "Corruption in Arbitration: Tackling Fraud and Bribery in Latin America's Commercial Landscape", event: "HardTalk Miami", date: "December 4, 2025" },
    { title: "Energy Infrastructure Disputes", event: "AIEN/ICC: Dispute Resolution in the Energy Business, Rio de Janeiro", date: "October 3, 2025" },
    { title: "Parallel Arbitration and Criminal Proceedings Involving Corruption Allegations", event: "Sovereign & States Litigation Summit USA, Washington D.C.", date: "September 24, 2025" },
    { title: "ESG, Business and Human Rights in International Arbitration", event: "International Arbitration in the 21st Century, Georgetown University, Washington D.C.", date: "September 12, 2025" },
    { title: "Enforcement and Execution of Arbitral Awards in Latin America", event: "Arbitration Day, American Bar Association, International Law Section, São Paulo", date: "August 28, 2025" },
    { title: "Navigating Disputes in the Natural Resources Sector", event: "Annual Mining and Energy Summit, Santiago, Chile", date: "July 12, 2025" },
    { title: "Hot Topics in Investment Arbitration: A Global Perspective", event: "Investment Treaty Forum, British Institute of International and Comparative Law, London", date: "May 22, 2025" },
    { title: "The Role of Women in International Arbitration", event: "Women in Arbitration Conference, Paris", date: "March 8, 2025" },
    { title: "Challenges in Multijurisdictional Arbitration", event: "Columbia Law School, New York", date: "February 20, 2025" },
    { title: "Corruption as a Defense in International Arbitration", event: "V International Arbitration Conference, Lima, Peru", date: "January 15, 2025" },
    { title: "Joint Symposium Investment Treaty Reform: Where Are We Heading?", event: "ILA American Branch Investment Law Committee and Georgetown International Arbitration Society, Washington, DC", date: "February 28, 2020" },
    { title: "Investor-State Disputes – A New Dawn in Treaty Reform?", event: "Who's Who Legal Future Leaders: Arbitration Conference USA, Washington, DC", date: "November 14, 2019" },
    { title: "Arbitration, Cybersecurity and Data Protection", event: "VI CAM-CCBC Arbitration Congress, São Paulo", date: "October 22, 2019" },
    { title: "Social Media, Internet and BIT Protections", event: "FDI Pre-Moot Opening Event, Mattos Filho, Veiga Filho, Marrey Jr e Quiroga Advogados, São Paulo", date: "October 18, 2019" },
    { title: "The GAR Live Debate: “This House Believes that the Current Format of Investment Treaty Awards Undermines the Legitimacy of an Investor-State Arbitral Dispute Settlement” — Fifth Annual GAR Live BITs", event: "Washington, DC", date: "May 16, 2019" },
    { title: "La Jurisprudencia Como Arma: ¿Es Urgente y Necesaria La Fijación de Criterios Jurisprudenciales Predecibles Por Las Cortes Nacionales Sobre Los Cuestionamientos a Los Laudos Arbitrales?", event: "XII International Arbitration Congress, IPA, Lima", date: "April 24, 2019" },
    { title: "Ongoing Challenges to International Investment Arbitration", event: "3rd Annual IAA Conference, Philadelphia, PA", date: "March 22, 2019" },
    { title: "¿Ha Llegado el Invierno al Arbitraje? ¿Crisis, Ética y Corrupción?", event: "International Women in Arbitration Conference, Instituto Peruano de Arbitragem, Lima", date: "January 31, 2019" },
    { title: "¿Cómo Afrontar un Arbitraje Nacional o Internacional de Asociación Público-Privada?", event: "Lima", date: "January 30, 2019" },
    { title: "HIALSA Arbitration Workshop: Evidence in International Arbitration", event: "Cambridge, Massachusetts", date: "October 2, 2018" },
    { title: "Introduction to International Commercial & Investment Arbitration", event: "American University, Washington, College of Law, Washington, DC", date: "September 27, 2018" },
    { title: "Duty to Disclose and Brazilian Arbitration Culture", event: "CCMA CIESP/FIESP Congress Arbitration Day, New York, NY", date: "April 17, 2018" },
    { title: "Energy Across Borders: Geopolitics, Conflict and International Arbitration", event: "Energy Days Conference, Pennsylvania State University, University Park, PA", date: "May 22, 2017" },
    { title: "Visión de los Arbitros y Abogados Sobre el Desarrollo del Arbitraje Internacional", event: "National and International Arbitration Congress, Arbitration and Conciliation Center, Bogota, Colombia", date: "April 2, 2017" },
    { title: "Arbitragem e Administração Pública: Uma Realidade nos Países da América Latina? Jurisprudência e Posição do Poder Judiciário", event: "III Pan-American Arbitration Congress CAM-CCBC, São Paulo, Brazil", date: "October 24, 2016" },
    { title: "Aspectos Prácticos del Arbitraje Internacional", event: "International Centre for Dispute Resolution, International Arbitration Symposium, New York, NY", date: "May 27, 2016" },
    { title: "Strategies for Faster and Cheaper Cross-Border Disputes", event: "ACC GNY Signature CLE Program, New York, NY", date: "January 14, 2016" },
    { title: "Is International Arbitration Really Open to New Faces?", event: "27th Annual ITA Workshop: Subconscious Influences of International Arbitration, Dallas", date: "June 17, 2015" },
    { title: "Dispute Resolution Current Trends Involving Arbitration and Compliance Issues in Brazil", event: "Georgetown University Law Center, Washington, DC", date: "September 15, 2014" },
    { title: "Specific Themes of Doing Business in Latin America", event: "ABA International Law Section, New Perspectives for Infrastructure Projects in Latin America, São Paulo", date: "August 24, 2013" },
    { title: "Budgeting and Managing an International Arbitration: How to Keep Arbitration Cost-Efficient and Effective", event: "2013 ABA International Law Section Spring Meeting, Washington, DC", date: "April 24, 2013" },
    { title: "U.S. Judicial Discovery for Use in International Commercial Arbitration", event: "Guest Lecturer, International Commercial Arbitration Course at Georgetown University Law Center, Washington, DC", date: "November 19, 2012" },
    { title: "O Papel do Árbitro na Avaliação de Danos", event: "XI Brazilian Arbitration Committee Congress--CBAr: Economic Aspects of Arbitration, Porto Alegre", date: "September 2012" },
    { title: "How to Handle a BIT Arbitration", event: "Ninth Annual Seminar on International Commercial Arbitration at American University’s Washington College of Law, Washington, DC", date: "October 3, 2012" },
    { title: "Documentary Evidence and the Use of Discovery, Evidence in International Arbitration", event: "ICDR Young & International and ICC Young Arbitrators Forum, Bogota", date: "September 2010" },
    { title: "Jurisdictional Issues in ICSID Arbitration", event: "Seminar on international legal issues presented to the government of the Republic of Colombia, Bogota", date: "June 2009" }
];

// Original English Publications from ThoughtLeadership.tsx
const originalEnPubs = [
    { title: "“The Role of Counsel in International Arbitration: Set-Aside Steps,”", publication: "book chapter in International Arbitration in Practice (co-author), edited by Courtney Lotfi, Alicja Zielinska-Eisen and Veronica Sandler Obregon, Kluwer International Law, 2024" },
    { title: "Lei de Arbitragem Comentada: Lei nº 9.307/1996", publication: "co-author, comments to Article 12, Revista dos Tribunais, 2023" },
    { title: "Litigation Alternatives for COVID-19 Hospitality Disputes", publication: "Law360, May 11, 2020" },
    { title: "Navigating Investors' Rights under the USMCA", publication: "co-author, Transnational Dispute Management, Vol. 17, No. 3, March 2020" },
    { title: "Mining Arbitration in Latin America: Social and Environmental Issues in Investment Arbitration Cases", publication: "co-author, Global Arbitration Review: The Guide to Mining Arbitrations, July 2019" },
    { title: "Construction contracts in Brazil", publication: "Lexology Q&A, March 2019" },
    { title: "A Structured Guide to Arbitration Law and Practice in Brazil", publication: "Lexology Q&A, September 2014, updated March 2019" },
    { title: "United States: Arbitration Q&A", publication: "The In-House Lawyer, October 2018" },
    { title: "Arbitragem Comercial Envolvendo Administração Pública: uma Realidade na América Latina?", publication: "co-author, Revista Visão Jurídica, April 2017" },
    { title: "Lições a Respeito de Decisões Vinculantes e Não Finais Proferidas por Dispute Adjudication Boards: o Caso CRW Joint Operation v. PT Perusahaan Gas Negara (PERSERO)", publication: "co-author, Revista de Arbitragem e Mediação – RArb, No. 48, April 2016" },
    { title: "Directrices Prácticas Para la Redacción del Acuerdo Arbitral", publication: "co-author, Tratado de Direito Arbitral, Vol. 2 (Co-author), March 2011" },
    { title: "US Judicial Discovery in Private International Arbitration: Outlook Remains Uncertain", publication: "Miami Arbitration Reports, Vol. 1, No. 5, October 2009" }
];

// Update speakingEngagements EN
content.thoughtLeadership.speakingEngagements = content.thoughtLeadership.speakingEngagements.map((item, index) => {
    if (originalEnSpeaking[index]) {
        item.title.EN = originalEnSpeaking[index].title;
        item.event.EN = `${originalEnSpeaking[index].event}, ${originalEnSpeaking[index].date}`;
    }
    return item;
});

// Update publications EN
content.thoughtLeadership.publications = content.thoughtLeadership.publications.map((item, index) => {
    if (originalEnPubs[index]) {
        item.title.EN = originalEnPubs[index].title;
        item.publication.EN = originalEnPubs[index].publication;
    }
    return item;
});

// Apply other corrections from instructions
content.about.p6.EN = content.about.p6.EN.replace("University of Miami Law School", "University of Miami School of Law");
content.about.p6.PT = content.about.p6.PT.replace("University of Miami Law School", "University of Miami School of Law");
content.about.p6.ES = content.about.p6.ES.replace("University of Miami Law School", "University of Miami School of Law");

// Update teachingExperience logos and links if needed
content.thoughtLeadership.teachingExperience = content.thoughtLeadership.teachingExperience.map(item => {
    if (item.institution.includes("University of Miami")) {
        item.institution = "University of Miami School of Law";
    }
    return item;
});

fs.writeFileSync(siteContentPath, JSON.stringify(siteContent, null, 4));
console.log("siteContent.json updated successfully.");
