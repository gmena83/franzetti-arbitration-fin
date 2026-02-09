const fs = require('fs');
const path = require('path');

const ptSpeakingRaw = `
"Corruption in Arbitration: Tackling Fraud and Bribery in Latin America's Commercial Landscape", HardTalk Miami, 4 de dezembro de 2025
"Energy Infrastructure Disputes", AIEN/ICC: Resolução de Conflitos no Setor de Energia, Rio de Janeiro, 3 de outubro de 2025
"Parallel Arbitration and Criminal Proceedings Involving Corruption Allegations", Sovereign & States Litigation Summit USA, Washington, DC, 24 de setembro de 2025
"International Construction Arbitration: Infrastructure Projects with Sovereigns", iLaw2025 The ILS Global Forum on International Law AAA-ICDR International Arbitration Track, 7 de fevereiro de 2025
"Increase in Disputes in Oil & Gas Industry”, HardTalk, Miami, 4 de dezembro de 2024
“Arbitragem no Setor de Aviação Comercial com Partes Brasileiras” — Arbitration Channel Webinar, 29 de outubro de 2024
"The Future of International Arbitration", Georgetown University Law Centre, Washington, DC, 29 de fevereiro de 2024
"So You're an International Arbitrator, How to Approach and Handle Some of the Issues That May Arise", iLaw2024 The ILS Global Forum on International Law AAA-ICDR International Arbitration Track, 16 de fevereiro de 2024
"Considerations About the Seat of Arbitration", III Dia Brasileiro de Arbitragem, organizado pela Georgetown University Law Centre, Washington, DC, 24 de janeiro de 2024
"Greener Grass or Scorched Earth: The Impact of Legislation and Court Reform on Arbitration Friendliness in the Americas", Chartered Institute – North American Branch e JAMS, Miami, 8 de novembro de 2023
"Roundtable on Enforcement Proceedings, Asset Tracing and Funding to Enforce and Collect", Miami International Arbitration Society, Miami, 18 de outubro de 2023
"Contratos Comerciais e Arbitragem em Setores Regulados: Autonomia das Partes e Heteronomia Regulatória", 22ª Conferência Internacional de Arbitragem do CBAR, Rio de Janeiro, 14 de setembro de 2023
"The Arbitration Proceedings", Escola de Verão em Arbitragem Internacional, NOVA School of Law, Lisboa, julho de 2023
"Corruption in International Arbitration and Enforcement Proceedings", Conferência Anual da Penn Carey Law International Arbitration Association, 24 de março de 2023
"Discovery em Arbitragem Internacional", Mesa Redonda do Grupo de Estudo do Comitê Brasileiro de Arbitragem (CBAR), 16 de março de 2023
"The Practical Impacts of the Supreme Court’s Ruling On Section 1782 Discovery", II Brazilian Arbitration Day organizado pela Georgetown University e Canal Arbitragem, 26 de janeiro de 2023
"Practical Issues on Producing Evidence in International Arbitration",, Universidade de Nova York, Universidade de Columbia e Câmara de Comércio Brasil-Estados Unidos, 26 de agosto de 2022
“Closing Remarks of I Brazilian Arbitration Day” — Georgetown University Law Center and Arbitration Channel, 8 de abril de 2022
“Corruption in International Arbitration” — I Brazilian Arbitration Day Congress, Georgetown University and the Arbitration Channel, 8 de abril de 2022
"Supply Chain Disputes", Trilha de Arbitragem Internacional AAA-ICDR do Evento Anual da Seccional de Direito Internacional da Ordem dos Advogados da Flórida, 1º de abril de 2022
"ICDR Rules on International Dispute Resolution Procedures", The Chartered Institute of Arbitrators (CIArb) - Representação Brasileira, 8 de dezembro de 2021
"Hot Topics Related to Arbitration", Câmara de Comércio Brasil-Estados Unidos, Nova York, 30 de novembro de 2021
"Key Types of Privileges and Their Application in International Disputes", Série de Webinars Dechert LLP, 17 de março, 5 de abril, 28 de abril de 2021
"Virtual Hearings in International Arbitration", Webinar do Centro Internacional de Arbitragem de Vancouver, 5 de outubro de 2020“
Key Considerations for Legal Positions on Force Majeure: Practical Steps if Disputes are Inevitable” — Nairobi Centre for International Arbitration Webina, 13 de agosto de 2020  
"From NAFTA to USMCA: A Discussion on Key Changes to Trade and Investment", Webinar Dechert LLP, 29 de julho de 2020
"Procedimentos Virtuais e Táticas de Guerrilha em Arbitragem", Webinar INOVARB AmCham Brazil, 4 de junho de 2020
"Arbitrajes Virtuales: Ventajas e Inconvenientes", IPA Instituto Peruano de Arbitraje, 14 de maio de 2020
"Tribunal's Power to Sanction Misconduct", Comitê de Direito de Investimento da Seção Americana da ILA e Sociedade de Arbitragem Internacional de Georgetown, Washington, DC, 28 de fevereiro de 2020
"Investor-State Disputes – A New Dawn in Treaty Reform?", Who's Who Legal Future Leaders: Conferência de Arbitragem EUA, Washington, DC, 14 de novembro de 2019
"Arbitration, Cybersecurity and Data Protection", VI Congresso de Arbitragem CAM-CCBC, São Paulo, 22 de outubro de 2019
“Social Media, Internet and BIT Protections” — Evento de Abertura do FDI Pre-Moot, Mattos Filho, Veiga Filho, Marrey Jr e Quiroga Advogados, São Paulo, 18 de outubro de 2019
The GAR Live Debate: “This House Believes that the Current Format of Investment Treaty Awards Undermines the Legitimacy of an Investor-State Arbitral Dispute Settlement” — Fifth Annual GAR Live BITs, Washington, DC, 16 de maio de 2019
"La Jurisprudencia Como Arma: ¿Es Urgente y Necesaria La Fijación de Criterios Jurisprudenciales Predecibles Por Las Cortes Nacionales Sobre Los Cuestionamientos a Los Laudos Arbitrales?", XII Congresso Internacional de Arbitragem, IPA, Lima, 24 de abril de 2019
"Ongoing Challenges to International Investment Arbitration", 3ª Conferência Anual da IAA, Filadélfia, PA, 22 de março de 2019
"¿Ha Llegado el Invierno al Arbitraje? ¿Crisis, Ética y Corrupción?",, Conferência Internacional de Mulheres em Arbitragem, Instituto Peruano de Arbitragem, Lima, 31 de janeiro de 2019
"¿Cómo Afrontar un Arbitraje Nacional o Internacional de Asociación Público-Privada?", Lima, 30 de janeiro de 2019
"HIALSA Arbitration Workshop: Evidence in International Arbitration", Cambridge, Massachusetts, 2 de outubro de 2018
"Introduction to International Commercial & Investment Arbitration", American University, Washington, College of Law, Washington, DC, 27 de setembro de 2018
"Duty to Disclose and Brazilian Arbitration Culture", Congresso CCMA CIESP/FIESP Dia da Arbitragem, Nova York, NY, 17 de abril de 2018
"Energy Across Borders: Geopolitics, Conflict and International Arbitration", Conferência Energy Days, Pennsylvania State University, Pensilvânia, 22 de maio de 2017
"Visión de los Arbitros y Abogados Sobre el Desarrollo del Arbitraje Internacional", Congresso de Arbitragem Nacional e Internacional, Centro de Arbitragem e Conciliação, Bogotá, Colômbia, 2 de abril de 2017
"Arbitragem e Administração Pública: Uma Realidade nos Países da América Latina? Jurisprudência e Posição do Poder Judiciário", III Congresso Pan-Americano de Arbitragem CAM-CCBC, São Paulo, Brasil, 24 de outubro de 2016
"Aspectos Prácticos del Arbitraje Internacional", International Centre for Dispute Resolution, Simpósio Internacional de Arbitragem, Nova York, NY, 27 de maio de 2016
"Strategies for Faster and Cheaper Cross-Border Disputes", ACC GNY Signature CLE Program, Nova York, NY, 14 de janeiro de 2016
“Is International Arbitration Really Open to New Faces?”— 27th Annual ITA Workshop: Influências Subconscientes da Arbitragem Internacional, Dallas, 17 de junho de 2015
"Dispute Resolution Current Trends Involving Arbitration and Compliance Issues in Brazil” — Georgetown University Law Center, Washington, DC, 15 de setembro de 2014
"Specific Themes of Doing Business in Latin America", Seção de Direito Internacional da ABA, Novas Perspectivas para Projetos de Infraestrutura na América Latina, São Paulo, 24 de agosto de 2013
"Budgeting and Managing an International Arbitration: How to Keep Arbitration Cost-Efficient and Effective", Reunião de Primavera de 2013 da Seção de Direito Internacional da ABA, Washington, DC, 24 de abril de 2013
"U.S. Judicial Discovery for Use in International Commercial Arbitration", Palestrante Convidado, Curso de Arbitragem Comercial Internacional na Georgetown University Law Center, Washington, DC, 19 de novembro de 2012
"O Papel do Árbitro na Avaliação de Danos", XI Congresso do Comitê Brasileiro de Arbitragem--CBAr: Aspectos Econômicos da Arbitragem, Porto Alegre, setembro de 2012
"How to Handle a BIT Arbitration, Nono Seminário Anual sobre Arbitragem Comercial Internacional na American University’s Washington College of Law, Washington, DC, 3 de outubro de 2012
"Documentary Evidence and the Use of Discovery, Evidence in International Arbitration" ICDR Young & International e ICC Young Arbitrators Forum, Bogotá, setembro de 2010
"Jurisdictional Issues in ICSID Arbitration", Seminário sobre questões jurídicas internacionais apresentado ao governo da República da Colômbia, Bogotá, junho de 2009
`;

const esSpeakingRaw = `
"Corruption in Arbitration: Tackling Fraud and Bribery in Latin America’s Commercial Landscape", HardTalk Miami, Miami, 4 de diciembre de 2025
"Energy Infrastructure Disputes", AIEN/ICC: Dispute Resolution in the Energy Business, Río de Janeiro, 3 de octubre de 2025
"Parallel Arbitration and Criminal Proceedings Involving Corruption Allegations", Sovereign & States Litigation Summit USA, Washington, DC, 24 de septiembre de 2025
"International Construction Arbitration: Infrastructure Projects with Sovereigns", iLaw2025 TheILS Forum on International Law AAA-ICDR International Arbitration Track, 7 de febrero de 2025
"Increase in Disputes in Oil & Gas Industry", HardTalk Miami, Miami, 4 de diciembre de 2024
"Arbitragem no Setor de Aviação Comercial com Partes Brasileiras", Arbitration Channel Webinar, 29 de octubre de 2024
"The Future of International Arbitration", Georgetown University Law Centre, Washington, DC, 29 de febrero de 2024
"So You’re an International Arbitrator, How to Approach and Handle Some of the Issues that May Arise", iLaw2024, The ILS Global Forum on International Law AAA-ICDR International Arbitration Track, Miami, 16 de febrero de 2024
"Considerations About the Seat of Arbitration", Georgetown Brazilian Arbitration Day, Georgetown University Law Center, Washington, DC, 24 de enero de 2024
"Greener Grass or Scorched Earth: The Impact of Legislation and Court Reform on Arbitration Friendliness in the Americas", Chartered Institute – North America Branch y JAMS, Miami, 8 de noviembre de 2023
Roundtable on Enforcement Proceedings, Asset Tracing and Funding to Enforce and Collect, Miami International Arbitration Society, Miami, 18 de octubre de 2023
"Contratos Comerciais e Arbitragem em Setores Regulados: Autonomia das Partes e Heretomia Regulatória", 22a Conferência Internacional de Arbitragem do CBAR, Río de Janeiro, 14 de septiembre de 2023
"The Arbitration Proceedings", Escola de Verão em Arbitragem Internacional, NOVA School of Law, Lisboa, julio de 2023
"Corruption in International Arbitration and Enforcement Proceedings", Annual Conference of the Penn Carey Law International Arbitration Association, Filadelfia, 24 de marzo de 2023
"Discovery em Arbitragem Internacional", Mesa Redonda del Grupo de Estudio del Comité Brasileño de Arbitraje (CBAR), Río de Janeiro, 16 de marzo de 2023
"The Practical Impacts of the Supreme Court’s Ruling on Section 1782 Discovery", II Brazilian Arbitration Day, Georgetown University Law Center y Canal Arbitragem, Washington, DC, 26 de enero de 2023
"Practical Issues on Producing Evidence in International Arbitration", New York University, Columbia University, y la Cámara de Comercio Brasil-Estados Unidos, Nueva York, 26 de agosto de 2022
Closing Remarks, I Brazilian Arbitration Day, Georgetown University Law Center y Arbitration Channel, 8 de abril de 2022
"Corruption in International Arbitration", I Brazilian Arbitration Day Congress, Georgetown University y Arbitration Channel, 8 de abril de 2022
"Supply Chain Disputes", AAA-ICDR International Arbitration Track of the Florida Bar’s International Law Sectional Annual Event, Miami, 1 de abril de 2022
"ICDR Rules on International Dispute Resolution Procedures", The Chartered Institute of Arbitrators (CIArb) Brazil Branch, Webinar, 8 de diciembre de 2021
"Hot Topics Related to Arbitration", Cámara de Comercio Brasil-Estados Unidos, Nueva York, 30 de noviembre de 2021
"Key Types of Privileges and Their Application in International Disputes", Serie de Seminarios Web de Dechert LLP, 17 de marzo, 5 de abril, 28 de abril de 2021
"Virtual Hearings in International Arbitration", Vancouver International Arbitration Centre, Webinar, 5 de octubre de 2020
"Key Considerations for Legal Positions on Force Majeure: Practical Steps if Disputes are Inevitable", Nairobi Centre for International Arbitration, Webinar, 13 de agosto de 2020
"From NAFTA to USMCA: Discussion on Key Changes to Trade and Investment", Serie de Seminarios Web de Dechert LLP, 29 de julio de 2020
"Procedimentos Virtuais e Táticas de Gerrilha em Arbitragem", INOVARB AmCham Brazil, Webinar, 4 de junio de 2020
"Arbitrajes Virtuales: Ventajas e Inconvenientes", Instituto Peruano de Arbitraje (IPA), Webinar, 14 de mayo de 2020
"Tribunal’s Power to Sanction Misconduct", ILA American Branch Investment Law Committee y Georgetown International Arbitration Society, Washington, DC, 28 de febrero de 2020
"Investor-State Disputes – A New Dawn in Treaty Reform?", Who's Who Legal Future Leaders: Arbitration Conference USA, Washington, DC, 14 de noviembre de 2019
"Arbitragem, Cibersegurança e Proteção de Dados", VI Congreso de Arbitraje CAM-CCBC, São Paulo, 22 de octubre de 2019
"Social Media, Internet and BIT Protections", Evento de Apertura del FDI Pre-Moot, Mattos Filho, Veiga Filho, y Marrey Jr e Quiroga Advogados, São Paulo, 18 de octubre de 2019
"This House Believes that the Current Format of Investment Treaty Awards Undermines the Legitimacy of an Investor-State Arbitral Dispute Settlement", Fifth Annual GAR Live BITs, Washington, DC, 16 de mayo de 2019
"La Jurisprudencia Como Arma: ¿Es Urgente y Necesaria La Fijación de Criterios Jurisprudenciales Predecibles Por Las Cortes Nacionales Sobre Los Cuestionamientos a Los Laudos Arbitrales?", XII Congreso Internacional de Arbitraje, IPA, Lima, 24 de abril de 2019
"Ongoing Challenges to International Investment Arbitration", 3rd Annual IAA Conference, Filadelfia, 22 de marzo de 2019
"¿Ha Llegado el Invierno al Arbitraje? ¿Crisis, Ética y Corrupción?", Conferencia Internacional de Mujeres en Arbitraje, IPA, Lima, 31 de enero de 2019
"¿Cómo Afrontar un Arbitraje Nacional o Internacional de Asociación Público-Privada?", IPA, Lima, 30 de enero de 2019
"HIALSA Arbitration Workshop: Evidence in International Arbitration", Harvard University, Cambridge, 2 de octubre de 2018
"Introduction to International Commercial & Investment Arbitration", American University Washington College of Law, Washington, DC, 27 de septiembre de 2018
"Duty to Disclose and Brazilian Arbitration Culture", CCMA CIESP/FIESP Congress Arbitration Day, Nueva York, 17 de abril de 2018
"Energy Across Borders: Geopolitics, Conflict and International Arbitration", Energy Days Conference, Pennsylvania State University, University Park, 22 de mayo de 2017
"Visión de los Árbitros y Abogados Sobre el Desarrollo del Arbitraje Internacional", Congreso de Arbitraje Nacional e Internacional, Centro de Arbitraje y Conciliación, Bogotá, 2 de abril de 2017
"Arbitragem e Administração Pública: Uma Realidade nos Países da América Latina? Jurisprudência e Posição do Poder Judiciário", III Congreso Panamericano de Arbitraje CAM-CCBC, São Paulo, 24 de octubre de 2016
"Aspectos Prácticos del Arbitraje Internacional", International Centre for Dispute Resolution (ICDR), International Arbitration Symposium, Nueva York, 27 de mayo de 2016
"Strategies for Faster and Cheaper Cross-Border Disputes", GNY Signature CLE Program, New York Corporate Counsel Association (ACC GNY), Nueva York, 14 de enero de 2016
"Is International Arbitration Really Open to New Faces?", 27th Annual ITA Workshop: Subconscious Influences of International Arbitration, Dallas 17 de junio de 2015
"Dispute Resolution Current Trends Involving Arbitration and Compliance Issues in Brazil", Georgetown University Law Center, Washington, DC, 15 de septiembre de 2014
"Specific Themes of Doing Business in Latin America", Sección de Derecho Internacional de la American Bar Association (ABA), Nuevas Perspectivas para Proyectos de Infraestrutura en América Latina, São Paulo, 24 de agosto de 2013
"Budgeting and Managing an International Arbitration: How to Keep Arbitration Cost Efficient and Effective", ABA Section of International Law Spring Meeting, Washington, DC, 24 de abril de 2013
"U.S. Judicial Discovery for Use in the International Commercial Arbitration", Ponente, Clase de Arbitraje Comercial Internacional, Georgetown University Law Center, Washington, DC, 19 de noviembre de 2012
"O Papel do Árbitro na Avaliação de Danos", XI Congreso del Comité Brasileño de Arbitraje (CBAr): Aspectos Económicos del Arbitraje, Porto Alegre, septiembre de 2012
"How to Handle a BIT Arbitration", Ninth Annual Seminar on International Commercial Arbitration, American University Washington College of Law, Washington, DC, 3 de octubre de 2012
"Documentary Evidence and the Use of Discovery, Evidence in International Arbitration", ICDR Young & International y ICC Young Arbitrators Forum, Bogotá, septiembre de 2010
"Jurisdiccional Issues in ICSID Arbitration", Seminario sobre cuestiones jurídicas internacionales, presentado al gobierno de la República de Colombia, Bogotá, junio de 2009
`;

const ptPubsRaw = `
“The Role of Counsel in International Arbitration: Set-Aside Steps,, capítulo do livro Arbitragem Internacional na Prática (coautora), editado por Courtney Lotfi, Alicja Zielinska-Eisen e Veronica Sandler Obregon, Kluwer International Law, 2024
"Lei de Arbitragem Comentada: Lei nº 9.307/1996", coautora, comentários ao Artigo 12, Revista dos Tribunais, 2023
"Litigation Alternatives for COVID-19 Hospitality Disputes", Law360, 11 de maio de 2020
"Navigating Investors' Rights under the USMCA", coautora, Transnational Dispute Management, Vol. 17, Nº 3, março de 2020
"Mining Arbitration in Latin America: Social and Environmental Issues in Investment Arbitration Cases", coautora, Global Arbitration Review: The Guide to Mining Arbitrations, julho de 2019
"Construction contracts in Brazil", Lexology Q&A, março de 2019
"A Structured Guide to Arbitration Law and Practice in Brazil", Lexology Q&A, setembro de 2014, atualizado em março de 2019
"United States: Arbitration Q&A", The In-House Lawyer, outubro de 2018
"Arbitragem Comercial Envolvendo Administração Pública: uma Realidade na América Latina?", Revista Visão Jurídica, abril de 2017
"Lições a Respeito de Decisões Vinculantes e Não Finais Proferidas por Dispute Adjudication Boards: o Caso CRW Joint Operation v. PT Perusahaan Gas Negara (PERSERO)", coautora, Revista de Arbitragem e Mediação – RArb, nº 48, abril de 2016
"Directrices Prácticas Para la Redacción del Acuerdo Arbitral", coautora, Tratado de Direito Arbitral, Vol. 2 (Coautor), março de 2011
"US Judicial Discovery in Private International Arbitration: Outlook Remains Uncertain", Miami Arbitration Reports, Vol. 1, Nº 5, outubro de 2009
`;

const esPubsRaw = `
"The Role of Counsel in International Arbitration: Set-Aside Steps ", capítulo (coautora) en International Arbitration in Practice, editado por Courtney Lotfi, Alicja Zielinska-Eisen y Veronica Sandler Obregon, Kluwer International Law, 2024.
"Lei de Arbitragem Comentada: Lei No. 9.307/1996", coautora, Comentarios al Artículo 12, Revista dos Tribunais, 2023.
"Litigation Alternatives for COVID-19 Hospitality Disputes", Law360, 11 de mayo de 2020
"Navigating Investors’ Rights under the USMCA", coautora, Transnational Dispute Management, vol. 17, nº 3, marzo de 2020.
"Mining Arbitration in Latin America: Social and Environmental Issues in Investment Arbitration Cases ", coautora, Global Arbitration Review: The Guide to Mining Arbitrations, julio de 2019.
"Construction Contracts in Brazil", Lexology Q&A, marzo de 2019.
"A Structured Guide to Arbitration Law and Practice in Brazil", Lexology Q&A, septiembre 2014, actualizado marzo 2019
"United States: Arbitration Q&A", The In-House Lawyer, octubre de 2018.
"Arbitragem Comercial Envolvendo Administraçao Pública: uma Realidade na América Latina?", coautora, Revista Visão Jurídica, abril de 2017.
"Liçoes a Respeito de Decisoes Vinculantes e Nao Finais Proferidas por Dispute Adjudication Boards: o CasoCRW Joint Operation v. PT Perusahaan Gas Negara (PERSERO)", coautora, Revista de Arbitraje y Mediación – RArb, nº 48, abril de 2016.
"Directrices Prácticas Para la Redacción del Acuerdo Arbitral", coautora, Tratado de Derecho Arbitral, vol. 2, coautora, marzo de 2011.
"US Judicial Discovery in Private International Arbitration: Outlook Remains Uncertain", Miami Arbitration Reports, vol. 1, nº 5, octubre de 2009.
`;

function parseLines(raw) {
    return raw.split('\n').map(line => line.trim()).filter(line => line.length > 0);
}

function extractData(line, type) {
    // Regex to capture content inside quotes as Title, and the rest as Details
    // Supporting "Title" — Event, Date format or "Title", Event, Date
    let match = line.match(/^["“”](.*?)["“”],?\s?(.*)/);

    if (!match) {
        // Fallback or explicit handling for lines without quotes (e.g. Closing Remarks)
        match = line.match(/^(.*?), (.*)/);
        if (!match) return { title: line, details: "" };
    }

    const title = match[1].trim();
    let remaining = match[2].trim();

    // Remove leading/trailing commas or dashes
    if (remaining.startsWith('—') || remaining.startsWith(',') || remaining.startsWith('-')) {
        remaining = remaining.substring(1).trim();
    }
    if (remaining.startsWith(',')) remaining = remaining.substring(1).trim();

    // Try to separate Date if possible (usually at the end)
    // This is optional, for now just returning the full remaining string as 'event' or 'publication'
    return { title, details: remaining };
}

const ptS = parseLines(ptSpeakingRaw);
const esS = parseLines(esSpeakingRaw);
const ptP = parseLines(ptPubsRaw);
const esP = parseLines(esPubsRaw);

const speakingEngagements = ptS.map((line, i) => {
    const ptData = extractData(line);
    const esData = esS[i] ? extractData(esS[i]) : ptData; // Fallback

    // Check if title is English (simple heuristic: common english words or same as title)
    // Most titles are English so we assume default english unless it looks very portuguese/spanish
    // AND if the PT title is identical to ES title, it's likely English or a proper name.

    // Ideally EN uses the title from the raw text (which is often English).
    // If different, we prioritize the text found in PT list as 'EN' source if it looks English.

    // Let's assume EN title = PT title (as many are English).
    // If specific translation needed, manual fix or use conditional logic.

    return {
        title: {
            EN: ptData.title, // Defaulting to the title found in PT list
            PT: ptData.title,
            ES: esData.title
        },
        event: {
            EN: ptData.details, // Use PT details as base, but this might be in Portuguese. 
            // Better to use ES details for ES. EN details? 
            // We'll leave EN as PT for now and I might need to manual review or just use PT.
            // Actually, we should try to support EN if possible. 
            // But since I don't have an EN source file, I'll use PT for EN for now, or maybe ES.
            PT: ptData.details,
            ES: esData.details
        }
    };
});

const publications = ptP.map((line, i) => {
    const ptData = extractData(line);
    const esData = esP[i] ? extractData(esP[i]) : ptData;

    return {
        title: {
            EN: ptData.title,
            PT: ptData.title,
            ES: esData.title
        },
        publication: {
            EN: ptData.details,
            PT: ptData.details,
            ES: esData.details
        }
    };
});

const output = {
    speakingEngagements,
    publications
};

fs.writeFileSync(path.join(__dirname, 'src/data/thought_leadership_data.json'), JSON.stringify(output, null, 2));
console.log('JSON generated successfully.');
