#!/usr/bin/env python3
"""
Apply the client's 2026-09-18 website update requests to client/src/data/siteContent.json.

Sources (authoritative):
  /home/gonzalo-mena/Documents/Franzarb/Website Update 2026.09.18.docx
  /home/gonzalo-mena/Documents/Franzarb/2026.09.18 - Instructions to change Website About Page .docx
  /home/gonzalo-mena/Documents/Franzarb/Franzetti Curriculum Vitae Sept. 2026 (EN).pdf

Run from the repo root:
  python3 scripts/client-update-2026-09-18/apply_content_update.py

Writes siteContent.json (indent=4, no trailing newline -- matches the admin API writer)
and prints a JSON report of every change applied.
"""
import json
import os
import sys
from collections import OrderedDict

REPO = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
TARGET = os.path.join(REPO, "client", "src", "data", "siteContent.json")

REPORT = {"about": [], "translations": [], "experience": [], "cases": [], "speaking": [], "publications": []}


def norm(s):
    """Normalise apostrophes/quotes so matching is robust."""
    return (s.replace("\u2019", "'").replace("\u2018", "'")
             .replace("\u201c", '"').replace("\u201d", '"'))


def live(path):
    d = json.load(open(TARGET, encoding="utf-8"), object_pairs_hook=OrderedDict)
    for k in path:
        d = d[k]
    return d


# ---------------------------------------------------------------------------
# 1. ABOUT PAGE  (docx: "Instructions to change Website About Page")
# ---------------------------------------------------------------------------
ABOUT = {
    "p1": {
        "EN": "Erica Franzetti is an independent arbitrator and international disputes counsel. With a 25-year legal career at market-leading law firms, she has extensive experience in commercial and investor-State arbitration across a wide range of industries and jurisdictions. Her practice focuses on serving as an independent arbitrator in complex cross-border disputes and advising on complex international disputes, particularly in the energy, natural resources, and infrastructure sectors.",
        "ES": "Erica Franzetti es una árbitra independiente y abogada especializada en disputas internacionales. Con una carrera jurídica de 25 años en firmas de abogados líderes en el mercado, cuenta con amplia experiencia en arbitraje comercial y de inversión-Estado en una amplia gama de industrias y jurisdicciones. Su práctica se centra en actuar como árbitra independiente en disputas transfronterizas complejas y en asesorar sobre disputas internacionales complejas, en particular en los sectores de energía, recursos naturales e infraestructura.",
        "PT": "Erica Franzetti é árbitra independente e advogada especializada em disputas internacionais. Com uma carreira jurídica de 25 anos em escritórios de advocacia líderes de mercado, possui ampla experiência em arbitragem comercial e de investimento (investidor-Estado) em uma ampla gama de setores e jurisdições. Sua prática concentra-se em atuar como árbitra independente em disputas transfronteiriças complexas e em assessorar sobre disputas internacionais complexas, especialmente nos setores de energia, recursos naturais e infraestrutura.",
    },
    "p2": {
        "EN": "A fellow of the Chartered Institute of Arbitrators (FCIArb), Erica serves as sole arbitrator, co-arbitrator and chair of arbitral tribunals. Her linguistic fluency and cultural sensitivity, together with her command of both civil law and common law systems, enable her to conduct proceedings efficiently, fairly, and with procedural rigor.",
        "ES": "Miembro del Chartered Institute of Arbitrators (FCIArb), Erica actúa como árbitra única, coárbitra y presidenta de tribunales arbitrales. Su fluidez lingüística y sensibilidad cultural, junto con su dominio tanto del derecho civil como del common law, le permiten conducir los procedimientos con eficiencia, equidad y rigor procesal.",
        "PT": "Membro do Chartered Institute of Arbitrators (FCIArb), Erica atua como árbitra única, co-árbitra e presidente de tribunais arbitrais. Sua fluência linguística e sensibilidade cultural, somadas ao seu domínio tanto do direito civil quanto do common law, permitem-lhe conduzir os procedimentos com eficiência, equidade e rigor procedimental.",
    },
    "serviceList1": {
        "EN": [
            "Experience under Multiple Arbitral Rules – Erica has acted as arbitrator and counsel in proceedings under the ICC, AAA, ICDR, LCIA, ICSID, and UNCITRAL Rules.",
            "Tribunal Management and Awards – She has substantial experience managing arbitral tribunals and drafting reasoned arbitral awards under diverse legal frameworks.",
            "Complex Cross-Border Disputes – Her work includes complex commercial and investor-State disputes involving significant commercial interests and reputational considerations.",
        ],
        "ES": [
            "Experiencia bajo múltiples reglamentos arbitrales – Erica ha actuado como árbitra y abogada en procedimientos bajo los reglamentos de la ICC, la AAA, el ICDR, la LCIA, el CIADI y la CNUDMI.",
            "Gestión de tribunales y laudos – Cuenta con amplia experiencia en la gestión de tribunales arbitrales y en la redacción de laudos arbitrales fundamentados bajo diversos marcos jurídicos.",
            "Disputas transfronterizas complejas – Su trabajo incluye disputas comerciales y de inversión-Estado complejas que involucran intereses comerciales significativos y consideraciones reputacionales.",
        ],
        "PT": [
            "Experiência sob diversos regulamentos arbitrais – Erica atuou como árbitra e advogada em procedimentos sob os regulamentos da ICC, AAA, ICDR, LCIA, ICSID e UNCITRAL.",
            "Gestão de tribunais e sentenças – Possui ampla experiência na gestão de tribunais arbitrais e na redação de sentenças arbitrais fundamentadas sob diversos marcos legais.",
            "Disputas transfronteiriças complexas – Seu trabalho inclui disputas comerciais e de investidor-Estado complexas, envolvendo interesses comerciais significativos e considerações reputacionais.",
        ],
    },
    "p3": {
        "EN": "Erica also provides strategic advisory and consulting services to clients worldwide, including:",
        "ES": "Erica también presta servicios de asesoría estratégica y consultoría a clientes en todo el mundo, entre ellos:",
        "PT": "Erica também presta serviços de assessoria estratégica e consultoria a clientes em todo o mundo, incluindo:",
    },
    "serviceList2": {
        "EN": [
            "Dispute Prevention and Risk Assessment – Assessment of potential disputes and development of structures designed to mitigate dispute risk.",
            "Dispute Strategy and Procedural Positioning – Advice on procedural strategy and tactical steps throughout the life cycle of a dispute.",
            "Protection of Cross-Border Investments – Analysis of treaty rights and obligations, risk assessment, and strategies to protect cross-border legal investments.",
            "Post-award and Enforcement Strategy – Strategic planning for the recognition and enforcement of awards, as well as the defense of set aside proceedings in multiple jurisdictions.",
        ],
        "ES": [
            "Prevención de disputas y evaluación de riesgos – Evaluación de posibles disputas y desarrollo de estructuras destinadas a mitigar el riesgo de disputas.",
            "Estrategia de disputas y posicionamiento procesal – Asesoramiento sobre estrategia procesal y pasos tácticos a lo largo del ciclo de vida de una disputa.",
            "Protección de inversiones transfronterizas – Análisis de los derechos y obligaciones derivados de tratados, evaluación de riesgos y estrategias para proteger inversiones jurídicas transfronterizas.",
            "Estrategia posterior al laudo y de ejecución – Planificación estratégica para el reconocimiento y la ejecución de laudos, así como la defensa en procedimientos de anulación en múltiples jurisdicciones.",
        ],
        "PT": [
            "Prevenção de disputas e avaliação de riscos – Avaliação de potenciais disputas e desenvolvimento de estruturas destinadas a mitigar o risco de disputas.",
            "Estratégia de disputas e posicionamento processual – Assessoria sobre estratégia processual e passos táticos ao longo do ciclo de vida de uma disputa.",
            "Proteção de investimentos transfronteiriços – Análise de direitos e obrigações previstos em tratados, avaliação de riscos e estratégias para proteger investimentos jurídicos transfronteiriços.",
            "Estratégia pós-sentença e de execução – Planejamento estratégico para o reconhecimento e a execução de sentenças, bem como a defesa em procedimentos de anulação em múltiplas jurisdições.",
        ],
    },
    "p4": {
        "EN": "Erica has acted in high-stakes arbitration proceedings across the Americas, Europe, Africa, and Asia, including matters involving the United States, Argentina, Brazil, Canada, Chile, Colombia, Croatia, the Dominican Republic, Ghana, Hungary, Mexico, Perú, and the Philippines. Her work spans a broad range of complex disputes, including:",
        "ES": "Erica ha actuado en procedimientos arbitrales de alto impacto en las Américas, Europa, África y Asia, incluidos asuntos relacionados con los Estados Unidos, Argentina, Brasil, Canadá, Chile, Colombia, Croacia, la República Dominicana, Ghana, Hungría, México, Perú y Filipinas. Su trabajo abarca una amplia gama de disputas complejas, entre ellas:",
        "PT": "Erica atuou em procedimentos arbitrais de alto impacto nas Américas, Europa, África e Ásia, incluindo casos envolvendo os Estados Unidos, Argentina, Brasil, Canadá, Chile, Colômbia, Croácia, República Dominicana, Gana, Hungria, México, Peru e Filipinas. Seu trabalho abrange uma ampla gama de disputas complexas, incluindo:",
    },
    "sectorList": {
        "EN": [
            "Commercial contracts – Hotel management and operation; distribution agreements; financial contracts; intellectual property; force majeure and changed-circumstances claims; and transactions governed by the United Nations Convention on Contracts for the International Sale of Goods (CISG).",
            "Infrastructure and Construction – Concessions, telecommunications, and transportation projects.",
            "Corporate and M&A – Corporate governance and accountability disputes, mergers and acquisitions, shareholder and joint-venture conflicts, and venture-capital transactions.",
            "Energy and Natural Resources – Mining, oil and gas, LNG pricing, and electricity and nuclear power generation.",
        ],
        "ES": [
            "Contratos comerciales – Gestión y operación hotelera; contratos de distribución; contratos financieros; propiedad intelectual; reclamaciones por fuerza mayor y cambio de circunstancias; y transacciones regidas por la Convención de las Naciones Unidas sobre los Contratos de Compraventa Internacional de Mercaderías (CISG).",
            "Infraestructura y construcción – Concesiones, telecomunicaciones y proyectos de transporte.",
            "Societario y fusiones y adquisiciones – Disputas de gobierno corporativo y rendición de cuentas, fusiones y adquisiciones, conflictos entre accionistas y socios de joint ventures, y operaciones de capital riesgo.",
            "Energía y recursos naturales – Minería, petróleo y gas, precios del GNL y generación de energía eléctrica y nuclear.",
        ],
        "PT": [
            "Contratos comerciais – Gestão e operação hoteleira; contratos de distribuição; contratos financeiros; propriedade intelectual; alegações de força maior e de mudança de circunstâncias; e transações regidas pela Convenção das Nações Unidas sobre Contratos de Compra e Venda Internacional de Mercadorias (CISG).",
            "Infraestrutura e construção – Concessões, telecomunicações e projetos de transporte.",
            "Societário e M&A – Disputas de governança corporativa e responsabilização, fusões e aquisições, conflitos entre acionistas e em joint ventures, e operações de capital de risco.",
            "Energia e recursos naturais – Mineração, petróleo e gás, precificação de GNL e geração de energia elétrica e nuclear.",
        ],
    },
    "p5": {
        "EN": "Erica has received prestigious recognition from leading legal directories, including Chambers and Partners, The Legal 500, Lexology (formerly Who’s Who Legal), Latin Lawyer, and Best Lawyers, and has been named one of Latin America’s Top 100 Female Lawyers by Latinvex.",
        "ES": "Erica ha recibido reconocimientos de prestigio de los principales directorios jurídicos, entre ellos Chambers and Partners, The Legal 500, Lexology (anteriormente Who’s Who Legal), Latin Lawyer y Best Lawyers, y ha sido nombrada una de las 100 Mejores Abogadas de América Latina por Latinvex.",
        "PT": "Erica recebeu reconhecimentos de prestígio dos principais diretórios jurídicos, incluindo Chambers and Partners, The Legal 500, Lexology (anteriormente Who’s Who Legal), Latin Lawyer e Best Lawyers, e foi nomeada uma das 100 Melhores Advogadas da América Latina pela Latinvex.",
    },
    "p6": {
        "EN": "She regularly publishes and speaks on international commercial arbitration, investor-State arbitration, and dispute-resolution strategy at international conferences and professional forums, and has taught at leading academic institutions, including the Georgetown University Law Center and the University of Miami School of Law.",
        "ES": "Publica y expone con regularidad sobre arbitraje comercial internacional, arbitraje de inversión-Estado y estrategia de resolución de disputas en conferencias internacionales y foros profesionales, y ha impartido docencia en instituciones académicas de primer nivel, como Georgetown University Law Center y la University of Miami School of Law.",
        "PT": "Publica e palestra regularmente sobre arbitragem comercial internacional, arbitragem de investidor-Estado e estratégia de resolução de disputas em conferências internacionais e fóruns profissionais, e lecionou em instituições acadêmicas de destaque, incluindo Georgetown University Law Center e a University of Miami School of Law.",
    },
    "p7": {
        "EN": "Before founding her own practice, Erica spent more than 17 years at major U.S. law firms, including approximately eight years as a partner in internationally recognized arbitration teams. She is admitted to practice in the District of Columbia, New York, and Brazil, and is fluent in English, Spanish, and Portuguese.",
        "ES": "Antes de fundar su propia práctica, Erica pasó más de 17 años en importantes firmas de abogados de Estados Unidos, incluidos aproximadamente ocho años como socia en equipos de arbitraje reconocidos internacionalmente. Está admitida para ejercer en el Distrito de Columbia, Nueva York y Brasil, y es fluida en inglés, español y portugués.",
        "PT": "Antes de fundar sua própria prática, Erica passou mais de 17 anos em grandes escritórios de advocacia dos Estados Unidos, incluindo aproximadamente oito anos como sócia em equipes de arbitragem reconhecidas internacionalmente. É admitida para advogar no Distrito de Columbia, Nova York e Brasil, e é fluente em inglês, espanhol e português.",
    },
}

# Subtitle texts. The two "old" translation keys were already present in the file
# (section.independentArbitrator / section.strategicAdvisory) but not rendered
# anywhere; the client now asks for these two subtitles, so those keys are
# repurposed rather than duplicating them.
SUBTITLE_KEYS = {
    "section.independentArbitrator": {
        "EN": "Arbitral Experience", "ES": "Experiencia Arbitral", "PT": "Experiência Arbitral",
    },
    "section.strategicAdvisory": {
        "EN": "Advisory Experience", "ES": "Experiencia en Asesoría", "PT": "Experiência em Assessoria",
    },
}

# "Replace next title by and paragraphs by:" -> Recognition and Professional Background
TRAJECTORY_TITLE_KEY = "section.thoughtLeadershipTrajectory"
TRAJECTORY_TITLE = {
    "EN": "Recognition and Professional Background",
    "ES": "Reconocimiento y Trayectoria Profesional",
    "PT": "Reconhecimento e Trajetória Profissional",
}

# meta description mirror of the About lead paragraph
META_DESCRIPTION_KEY = "about.description"


# ---------------------------------------------------------------------------
# 2. TEACHING EXPERIENCE additions (docx: "Website Update")
# ---------------------------------------------------------------------------
NEW_TEACHING = [
    {
        "institution": "American University Washington College of Law",
        "role": "Guest Lecturer",
        "rolePT": "Professora Convidada",
        "roleES": "Profesora Invitada",
        "course": "Advanced Practical Seminar on International Arbitration Involving a State Party; Practical Seminar on International Arbitration",
        "coursePT": "Seminário Prático Avançado sobre Arbitragem Internacional Envolvendo um Estado-Parte; Seminário Prático sobre Arbitragem Internacional",
        "courseES": "Seminario Práctico Avanzado sobre Arbitraje Internacional con una Parte Estatal; Seminario Práctico sobre Arbitraje Internacional",
        "period": "July 2026; Sept. 2018",
        "logo": "/images/american-university-wcl-logo.svg",
        "url": "https://www.wcl.american.edu",
    },
    {
        "institution": "NOVA School of Law",
        "role": "Guest Lecturer",
        "rolePT": "Professora Convidada",
        "roleES": "Profesora Invitada",
        "course": "Summer School on International Arbitration",
        "coursePT": "Escola de Verão sobre Arbitragem Internacional",
        "courseES": "Escuela de Verano sobre Arbitraje Internacional",
        "period": "July 2023",
        "logo": "/images/nova-school-of-law-logo.svg",
        "url": "https://novalaw.unl.pt",
    },
]


def tl_teaching(item):
    """Same two entries in the Thought Leadership shape (role/course localised dicts)."""
    return {
        "institution": item["institution"],
        "role": {"EN": item["role"], "PT": item["rolePT"], "ES": item["roleES"]},
        "course": {"EN": item["course"], "PT": item["coursePT"], "ES": item["courseES"]},
        "period": item["period"],
        "logo": item["logo"],
        "url": item["url"],
    }


# ---------------------------------------------------------------------------
# 3. PROFESSIONAL ASSOCIATIONS
# ---------------------------------------------------------------------------
ASSOC_FIXES = [
    # (unique fragment of current EN name, new EN, new ES, new PT)
    (
        "International Centre of Dispute Resolution (ICDR)",
        "Panel of Arbitrators of the International Centre for Dispute Resolution (ICDR)",
        "Panel de Árbitros del Centro Internacional para la Resolución de Disputas (ICDR)",
        "Lista de Árbitros do International Centre for Dispute Resolution (ICDR)",
    ),
    (
        "International Court of Commerce (ICC)",
        "Arbitration & Mediation Committee of the International Chamber of Commerce (ICC) Brazil",
        "Comité de Arbitraje y Mediación de la Cámara de Comercio Internacional (CCI) Brasil",
        "Comitê de Arbitragem e Mediação da Câmara de Comércio Internacional (CCI) Brasil",
    ),
]
NEW_ASSOCS_HEAD = {
    "name": "Fellow of the Chartered Institute of Arbitrators (FCIArb)",
    "nameES": "Miembro del Chartered Institute of Arbitrators (FCIArb)",
    "namePT": "Membro do Chartered Institute of Arbitrators (FCIArb)",
    "logo": "/images/logos/ciarb.jpg",
    "url": "https://www.ciarb.org",
}
NEW_ASSOCS_TAIL = {
    "name": "Brazilian Arbitration Committee (CBAr)",
    "nameES": "Comité Brasileño de Arbitraje (CBAr)",
    "namePT": "Comitê Brasileiro de Arbitragem (CBAr)",
    "logo": "/images/logos/cbar.jpg",
    "url": "https://cbar.org.br",
}


# ---------------------------------------------------------------------------
# 4. CASES
# ---------------------------------------------------------------------------
ARBITRATOR_REPLACEMENTS = [
    ("electric vehicle charging equipment",
     "President of an arbitral tribunal in an ICDR arbitration between two multinational companies concerning the purchase of electric vehicle charging equipment governed by the laws of the State of Delaware; seated in Wilmington, DE.",
     "Presidenta de un tribunal arbitral en un arbitraje del ICDR entre dos empresas multinacionales relativo a la compra de equipos de carga para vehículos eléctricos, regido por las leyes del Estado de Delaware; sede en Wilmington, DE.",
     "Presidente de um tribunal arbitral em uma arbitragem do ICDR entre duas empresas multinacionais referente à compra de equipamentos de carregamento para veículos elétricos, regida pelas leis do Estado de Delaware; sede em Wilmington, DE."),
    ("CCBC corporate dispute",
     "Co-arbitrator in a CCBC corporate dispute arising out of a share purchase agreement governed by the laws of Brazil; seated in New York.",
     "Coárbitra en una disputa societaria ante la CCBC derivada de un contrato de compraventa de acciones regido por las leyes de Brasil; sede en Nueva York.",
     "Co-árbitra em uma disputa societária da CCBC decorrente de um contrato de compra e venda de ações regido pelas leis do Brasil; sede em Nova York."),
    ("highway project in Latin America",
     "Co-arbitrator in an ICDR construction dispute concerning a concession agreement for the development of a highway project in Latin America; seated in Bogotá; proceedings in Spanish.",
     "Coárbitra en un arbitraje de construcción del ICDR relativo a un contrato de concesión para el desarrollo de un proyecto de autopista en América Latina; sede en Bogotá; procedimiento en español.",
     "Co-árbitra em uma disputa de construção do ICDR referente a um contrato de concessão para o desenvolvimento de um projeto de rodovia na América Latina; sede em Bogotá; procedimento em espanhol."),
    ("large-scale infrastructure project in Latin America",
     "Co-arbitrator in an ICDR construction dispute concerning a concession agreement for a large-scale infrastructure project in Latin America; seated in Bogotá; proceedings in Spanish.",
     "Coárbitra en un arbitraje de construcción del ICDR relativo a un contrato de concesión para un proyecto de infraestructura de gran escala en América Latina; sede en Bogotá; procedimiento en español.",
     "Co-árbitra em uma disputa de construção do ICDR referente a um contrato de concessão para um projeto de infraestrutura de grande porte na América Latina; sede em Bogotá; procedimento em espanhol."),
    ("food producer in the United States",
     "Co-arbitrator in an ICDR arbitration between a food producer in the United States and a Peruvian company concerning a supply contract governed by the laws of Peru; seated in Lima.",
     "Coárbitra en un arbitraje del ICDR entre un productor de alimentos de los Estados Unidos y una empresa peruana relativo a un contrato de suministro regido por las leyes del Perú; sede en Lima.",
     "Co-árbitra em uma arbitragem do ICDR entre uma produtora de alimentos dos Estados Unidos e uma empresa peruana referente a um contrato de fornecimento regido pelas leis do Peru; sede em Lima."),
    ("a Swiss and an American company",
     "Co-arbitrator in an ICDR arbitration between a Swiss and an American company concerning the breach of a sales agreement governed by the laws of the State of Florida; seated in Miami.",
     "Coárbitra en un arbitraje del ICDR entre una empresa suiza y una estadounidense relativo al incumplimiento de un contrato de compraventa regido por las leyes del Estado de Florida; sede en Miami.",
     "Co-árbitra em uma arbitragem do ICDR entre uma empresa suíça e uma empresa americana referente ao inadimplemento de um contrato de compra e venda regido pelas leis do Estado da Flórida; sede em Miami."),
    ("offshore infrastructure and operation services agreements",
     "Co-arbitrator in an ICC dispute between energy-sector companies concerning offshore infrastructure and operation services agreements governed by the laws of Brazil; seated in Rio de Janeiro.",
     "Coárbitra en una disputa de la ICC entre empresas del sector energético relativa a contratos de infraestructura offshore y de servicios de operación regidos por las leyes de Brasil; sede en Río de Janeiro.",
     "Co-árbitra em uma disputa da ICC entre empresas do setor de energia referente a contratos de infraestrutura offshore e de serviços de operação regidos pelas leis do Brasil; sede no Rio de Janeiro."),
]

# inserted into the commercial block of the arbitrator list, in CV order
ARBITRATOR_ADDITIONS = [
    ("loan agreement in the financial services industry", "before",
     "Sole arbitrator in an arbitration under the AAA Commercial Rules concerning a claim for breach of a services agreement in the financial services industry.",
     "Árbitra única en un arbitraje bajo el Reglamento Comercial de la AAA relativo a una reclamación por incumplimiento de un contrato de servicios en el sector de servicios financieros.",
     "Árbitra única em uma arbitragem sob o Regulamento Comercial da AAA referente a uma alegação de inadimplemento de um contrato de prestação de serviços no setor de serviços financeiros."),
    ("hotel management agreement", "before",
     "Sole arbitrator in an arbitration under the AAA Commercial Rules concerning a claim for breach of a sales and purchase agreement in the healthcare industry.",
     "Árbitra única en un arbitraje bajo el Reglamento Comercial de la AAA relativo a una reclamación por incumplimiento de un contrato de compraventa en el sector de la salud.",
     "Árbitra única em uma arbitragem sob o Regulamento Comercial da AAA referente a uma alegação de inadimplemento de um contrato de compra e venda no setor de saúde."),
]

COUNSEL_REPLACEMENTS = [
    ("Quanta Services Netherlands",
     "Counsel to the Claimant in Quanta Services Netherlands B.V. v. Republic of Perú (ICSID Case No. ARB/21/1), a dispute under the Netherlands-Perú Bilateral Investment Treaty (BIT) arising from measures related to concessions to build and operate fiber-optic networks.",
     "Abogada de la Demandante en Quanta Services Netherlands B.V. c. República del Perú (Caso CIADI n.º ARB/21/1), una disputa bajo el Tratado Bilateral de Inversión (TBI) Países Bajos-Perú derivada de medidas relacionadas con las concesiones para construir y operar redes de fibra óptica.",
     "Advogada da Requerente em Quanta Services Netherlands B.V. v. República do Peru (Caso ICSID n.º ARB/21/1), uma disputa sob o Tratado Bilateral de Investimento (TBI) Países Baixos-Peru decorrente de medidas relacionadas a concessões para construir e operar redes de fibra óptica."),
    ("Gasoducto Sur Peruano",
     "Counsel to the Claimant in Gasoducto Sur Peruano S.A. en Liquidación v. Republic of Perú (ICSID Case No. ARB/24/29), a contractual dispute over a gas pipeline project that collapsed in the wake of the Odebrecht corruption scandal.",
     "Abogada de la Demandante en Gasoducto Sur Peruano S.A. en Liquidación c. República del Perú (Caso CIADI n.º ARB/24/29), una disputa contractual relativa a un proyecto de gasoducto que colapsó tras el escándalo de corrupción de Odebrecht.",
     "Advogada da Requerente em Gasoducto Sur Peruano S.A. en Liquidación v. República do Peru (Caso ICSID n.º ARB/24/29), uma disputa contratual relativa a um projeto de gasoduto que colapsou na esteira do escândalo de corrupção da Odebrecht."),
    ("MOL Hungarian Oil and Gas Company v.",
     "Counsel to the Claimant in MOL Hungarian Oil and Gas Company v. Republic of Croatia (ICSID Case No. ARB/13/32), a dispute under the Energy Charter Treaty concerning measures related to the privatization of a Croatian oil and gas company, the supply of gas, and the criminal prosecution of Claimant's CEO on bribery accusations.",
     "Abogada de la Demandante en MOL Hungarian Oil and Gas Company c. República de Croacia (Caso CIADI n.º ARB/13/32), una disputa bajo el Tratado sobre la Carta de la Energía relativa a medidas vinculadas con la privatización de una empresa croata de petróleo y gas, el suministro de gas y el enjuiciamiento penal del director ejecutivo de la Demandante por acusaciones de soborno.",
     "Advogada da Requerente em MOL Hungarian Oil and Gas Company v. República da Croácia (Caso ICSID n.º ARB/13/32), uma disputa sob o Tratado da Carta da Energia referente a medidas relacionadas à privatização de uma empresa croata de petróleo e gás, ao fornecimento de gás e à persecução criminal do CEO da Requerente por acusações de suborno."),
    ("Croatia v. MOL Hungarian Oil and Gas PLC",
     "Counsel to the Respondent in Croatia v. MOL Hungarian Oil and Gas PLC (PCA Case No. 2014-15), a contractual dispute under the UNCITRAL Rules regarding shareholders' rights and the corporate governance of a Croatian oil and gas company, the validity of a gas master agreement, and corruption allegations.",
     "Abogada de la Demandada en Croacia c. MOL Hungarian Oil and Gas PLC (Caso CPA n.º 2014-15), una disputa contractual bajo el Reglamento de la CNUDMI relativa a los derechos de los accionistas y el gobierno corporativo de una empresa croata de petróleo y gas, la validez de un contrato marco de gas y alegaciones de corrupción.",
     "Advogada da Requerida em Croácia v. MOL Hungarian Oil and Gas PLC (Caso PCA n.º 2014-15), uma disputa contratual sob o Regulamento da UNCITRAL referente a direitos dos acionistas e à governança corporativa de uma empresa croata de petróleo e gás, à validade de um contrato-mestre de gás e a alegações de corrupção."),
    ("Chevron Overseas Finance",
     "Counsel to the Respondent in Chevron Overseas Finance GmbH v. the Republic of the Philippines (PCA Case No. 2019-25), a dispute under the Philippines-Switzerland BIT and the UNCITRAL Rules involving the Malampaya gas field.",
     "Abogada de la Demandada en Chevron Overseas Finance GmbH c. la República de Filipinas (Caso CPA n.º 2019-25), una disputa bajo el TBI Filipinas-Suiza y el Reglamento de la CNUDMI relativa al yacimiento de gas Malampaya.",
     "Advogada da Requerida em Chevron Overseas Finance GmbH v. a República das Filipinas (Caso PCA n.º 2019-25), uma disputa sob o TBI Filipinas-Suíça e o Regulamento da UNCITRAL relativa ao campo de gás Malampaya."),
    ("Ruby Roz Agricol",
     "Counsel to the Claimant in Ruby Roz Agricol LLP v. the Republic of Kazakhstan, an UNCITRAL investment arbitration about a Kazakh poultry farm investment concerning alleged breaches of an investment contract and the Kazakh Foreign Investments Law.",
     "Abogada de la Demandante en Ruby Roz Agricol LLP c. la República de Kazajistán, un arbitraje de inversión bajo el Reglamento de la CNUDMI relativo a una inversión en una granja avícola kazaja, por presuntos incumplimientos de un contrato de inversión y de la Ley de Inversiones Extranjeras de Kazajistán.",
     "Advogada da Requerente em Ruby Roz Agricol LLP v. a República do Cazaquistão, uma arbitragem de investimento sob o Regulamento da UNCITRAL sobre um investimento em um complexo avícola cazaque, referente a alegadas violações de um contrato de investimento e da Lei de Investimentos Estrangeiros do Cazaquistão."),
    ("Pluspetrol",
     "Counsel to the Claimants in Pluspetrol Perú et al. v. Perupetro (ICSID Case No. ARB/12/28), a dispute arising out of a gas supply contract regarding royalty payments and the sale of liquefied natural gas (LNG); proceedings in Spanish.",
     "Abogada de los Demandantes en Pluspetrol Perú y otros c. Perupetro (Caso CIADI n.º ARB/12/28), una disputa derivada de un contrato de suministro de gas relativa a pagos de regalías y la venta de gas natural licuado (GNL); procedimiento en español.",
     "Advogada dos Requerentes em Pluspetrol Perú e outros v. Perupetro (Caso ICSID n.º ARB/12/28), uma disputa decorrente de um contrato de fornecimento de gás referente a pagamentos de royalties e à venda de gás natural liquefeito (GNL); procedimento em espanhol."),
    ("construction Brazilian conglomerate",
     "Counsel to an American company against a Brazilian construction conglomerate in an ICC arbitration concerning an indemnity agreement governed by the laws of Brazil.",
     "Abogada de una empresa estadounidense contra un conglomerado brasileño de construcción en un arbitraje de la ICC relativo a un acuerdo de indemnización regido por las leyes de Brasil.",
     "Advogada de uma empresa americana contra um conglomerado brasileiro de construção em uma arbitragem da ICC referente a um acordo de indenização regido pelas leis do Brasil."),
    ("Dutch investor",
     "Advisor to a Dutch investor on financing and corporate governance matters connected to a joint venture agreement governed by the laws of the State of Delaware for the development of a startup nuclear energy project in Latin America.",
     "Asesora de un inversionista neerlandés en cuestiones de financiamiento y gobierno corporativo vinculadas a un contrato de joint venture regido por las leyes del Estado de Delaware para el desarrollo de un proyecto de energía nuclear en etapa inicial en América Latina.",
     "Assessora de um investidor holandês em questões de financiamento e governança corporativa relacionadas a um contrato de joint venture regido pelas leis do Estado de Delaware para o desenvolvimento de um projeto de energia nuclear em fase inicial na América Latina."),
    ("logistics multinational company",
     "Counsel to a multinational logistics company in an ICC arbitration against a Colombian company in connection with a commercial representation agreement governed by the laws of the State of Texas.",
     "Abogada de una empresa multinacional de logística en un arbitraje de la ICC contra una empresa colombiana en relación con un contrato de representación comercial regido por las leyes del Estado de Texas.",
     "Advogada de uma empresa multinacional de logística em uma arbitragem da ICC contra uma empresa colombiana referente a um contrato de representação comercial regido pelas leis do Estado do Texas."),
]


# ---------------------------------------------------------------------------
# 5. SPEAKING ENGAGEMENTS
# ---------------------------------------------------------------------------
# "The names of the presentations should be in the original language" -> the
# original-language string is written to EN/ES/PT so it always renders as-is.
SPEAKING_ORIGINAL_LANGUAGE = [
    ("Arbitration in the Commercial Aviation Sector with Brazilian Parties",
     "Arbitragem no Setor de Aviação Comercial com Partes Brasileiras",
     "Arbitration Channel Webinar (October 29, 2024)",
     "Webinar do Arbitration Channel (29 de outubro de 2024)",
     "Webinar del Arbitration Channel (29 de octubre de 2024)"),
    ("Business Contracts and Arbitration in Regulated Sectors",
     "Contratos Comerciais e Arbitragem em Setores Regulados: Autonomia das Partes e Heteronomia Regulatória",
     "CBAr 22nd International Arbitration Conference, Rio de Janeiro (September 14, 2023)",
     "22ª Conferência Internacional de Arbitragem do CBAr, Rio de Janeiro (14 de setembro de 2023)",
     "22.ª Conferencia Internacional de Arbitraje del CBAr, Río de Janeiro (14 de septiembre de 2023)"),
    ("Virtual Proceedings and Guerrilla Tactics in Arbitration",
     "Procedimentos Virtuais e Táticas de Guerrilha em Arbitragem",
     "INOVARB AmCham Brazil Webinar (June 4, 2020)",
     "Webinar INOVARB AmCham Brasil (4 de junho de 2020)",
     "Webinar INOVARB AmCham Brasil (4 de junio de 2020)"),
    ("Virtual Arbitrations: Advantages and Disadvantages",
     "Arbitrajes Virtuales: Ventajas e Inconvenientes",
     "IPA Instituto Peruano de Arbitraje Webinar (May 14, 2020)",
     "Webinar do IPA Instituto Peruano de Arbitraje (14 de maio de 2020)",
     "Webinar del IPA Instituto Peruano de Arbitraje (14 de mayo de 2020)"),
    ("Has Winter Arrived in Arbitration?",
     "¿Ha Llegado el Invierno al Arbitraje? ¿Crisis, Ética y Corrupción?",
     "Conferencia Internacional de Mujeres en Arbitraje, Instituto Peruano de Arbitraje, Lima (January 31, 2019)",
     "Conferência Internacional de Mulheres em Arbitragem, Instituto Peruano de Arbitraje, Lima (31 de janeiro de 2019)",
     "Conferencia Internacional de Mujeres en Arbitraje, Instituto Peruano de Arbitraje, Lima (31 de enero de 2019)"),
    ("How to Address a Domestic or International Public-Private Partnership Arbitration?",
     "¿Cómo Afrontar un Arbitraje Nacional o Internacional de Asociación Público-Privada?",
     "Lima (January 30, 2019)",
     "Lima (30 de janeiro de 2019)",
     "Lima (30 de enero de 2019)"),
    ("Arbitrators and Counsel's Perspectives on the Development of International Arbitration",
     "Visión de los Árbitros y Abogados Sobre el Desarrollo del Arbitraje Internacional",
     "National and International Arbitration Congress, Arbitration and Conciliation Center, Bogotá (April 2, 2017)",
     "Congresso Nacional e Internacional de Arbitragem, Centro de Arbitragem e Conciliação, Bogotá (2 de abril de 2017)",
     "Congreso Nacional e Internacional de Arbitraje, Centro de Arbitraje y Conciliación, Bogotá (2 de abril de 2017)"),
    ("The Arbitrator's Role in the Assessment of Damages",
     "O Papel do Árbitro na Avaliação de Danos",
     "XI Congresso do CBAr: Aspectos Econômicos da Arbitragem, Porto Alegre (September 2012)",
     "XI Congresso do CBAr: Aspectos Econômicos da Arbitragem, Porto Alegre (setembro de 2012)",
     "XI Congreso del CBAr: Aspectos Económicos del Arbitraje, Porto Alegre (septiembre de 2012)"),
]

# small field corrections on existing entries
SPEAKING_FIELD_FIXES = [
    ("Using Witness Statements in Arbitration in Latin America",
     {"EN": "ICDR/CIArb/University of Miami School of Law, Miami (March 2, 2026)",
      "ES": "ICDR/CIArb/Facultad de Derecho de la Universidad de Miami, Miami (2 de marzo de 2026)",
      "PT": "ICDR/CIArb/Faculdade de Direito da Universidade de Miami, Miami (2 de março de 2026)"},
     "ICDR/Ciarb/University of Miami School of Law, Miami (March 2, 2026)"),
    ("Aspectos Prácticos del Arbitraje Internacional",
     {"EN": "ICDR, International Arbitration Symposium, New York (May 27, 2016)",
      "ES": "ICDR, Simposio de Arbitraje Internacional, Nueva York (27 de mayo de 2016)",
      "PT": "ICDR, Simpósio de Arbitragem Internacional, Nova York (27 de maio de 2016)"},
     "International Centre of Dispute Resolution, International Arbitration Symposium, New York, NY (May 27, 2016)"),
    ("La Jurisprudencia Como Arma",
     {"EN": "XII Congreso Internacional de Arbitraje, IPA, Lima (April 24, 2019)"},
     "XII Congreso Internacional de Arbitraje, IPA, Lima, (April 24, 2019)  (Translate)"),
]

# Pre-existing data defects found while applying the client's list: in these
# entries the date/organiser got captured into the TITLE field and the EVENT
# field was left with a dangling fragment, which renders as a broken line on
# the site. Repaired here so the Speaking Engagements list reads correctly.
SPEAKING_REPAIRS = [
    {"match_title": "Virtual Hearings in International Arbitration",
     "match_event": "2020)",
     "title": {"EN": "Virtual Hearings in International Arbitration",
               "ES": "Audiencias Virtuales en Arbitraje Internacional",
               "PT": "Audiências Virtuais em Arbitragem Internacional"},
     "event": {"EN": "Vancouver International Arbitration Centre Webinar (October 5, 2020)",
               "ES": "Webinar del Centro de Arbitraje Internacional de Vancouver (5 de octubre de 2020)",
               "PT": "Webinar do Centro de Arbitragem Internacional de Vancouver (5 de outubro de 2020)"}},
    {"match_title": "Key Considerations for Legal Positions on Force Majeure",
     "match_event": "2020)",
     "title": {"EN": "Key Considerations for Legal Positions on Force Majeure: Practical Steps if Disputes are Inevitable",
               "ES": "Consideraciones Clave para Posiciones Legales sobre Fuerza Mayor: Pasos Prácticos si las Disputas son Inevitables",
               "PT": "Considerações Chave para Posições Legais sobre Força Maior: Passos Práticos se as Disputas são Inevitáveis"},
     "event": {"EN": "Nairobi Centre for International Arbitration Webinar (August 13, 2020)",
               "ES": "Webinar del Centro de Arbitraje Internacional de Nairobi (13 de agosto de 2020)",
               "PT": "Webinar do Centro de Arbitragem Internacional de Nairobi (13 de agosto de 2020)"}},
    {"match_title": "Arbitration",
     "match_event": "Cybersecurity and Data Protection",
     "title": {"EN": "Arbitration, Cybersecurity and Data Protection",
               "ES": "Arbitraje, Ciberseguridad y Protección de Datos",
               "PT": "Arbitragem, Cibersegurança e Proteção de Dados"},
     "event": {"EN": "VI CAM-CCBC Arbitration Congress, São Paulo (October 22, 2019)",
               "ES": "VI Congreso de Arbitraje CAM-CCBC, São Paulo (22 de octubre de 2019)",
               "PT": "VI Congresso de Arbitragem CAM-CCBC, São Paulo (22 de outubro de 2019)"}},
]

SPEAKING_ADDITIONS = [
    ("INOVARB AmCham Brazil Webinar",          # insert before this entry's event
     "From NAFTA to USMCA: A Discussion on Key Changes to Trade and Investment",
     "Dechert LLP Webinar (July 29, 2020)",
     "Webinar da Dechert LLP (29 de julho de 2020)",
     "Webinar de Dechert LLP (29 de julio de 2020)"),
    ("3rd Annual IAA Conference, Philadelphia",
     "Negotiation of Treaties for the Promotion and Protection of Foreign Investment",
     "Private seminar organized by Dechert LLP for Embassies, Washington, D.C. (April 10, 2019)",
     "Seminário privado organizado pela Dechert LLP para Embaixadas, Washington, D.C. (10 de abril de 2019)",
     "Seminario privado organizado por Dechert LLP para Embajadas, Washington, D.C. (10 de abril de 2019)"),
    ("CCMA CIESP/FIESP Congress Arbitration Day",
     "Aspectos Prácticos del Arbitraje Internacional",
     "Private seminar organized by Dirección Nacional de Vialidad, in cooperation with the ICDR, Buenos Aires, Argentina (July 27, 2018)",
     "Seminário privado organizado pela Dirección Nacional de Vialidad, em cooperação com o ICDR, Buenos Aires, Argentina (27 de julho de 2018)",
     "Seminario privado organizado por la Dirección Nacional de Vialidad, en cooperación con el ICDR, Buenos Aires, Argentina (27 de julio de 2018)"),
]


# ---------------------------------------------------------------------------
# 6. PUBLICATIONS
# ---------------------------------------------------------------------------
NEW_PUBLICATION = {
    "title": {
        "EN": "“Organização da Audiência de Instrução: Boas Práticas,” chapter in the book Produção de Provas em Arbitragens de Construção (co-author), edited by Bruno Guandalini and Romulo Greff Mariana — Synergia (2026).",
        "PT": "“Organização da Audiência de Instrução: Boas Práticas,” capítulo do livro Produção de Provas em Arbitragens de Construção (coautora), editado por Bruno Guandalini e Romulo Greff Mariana — Synergia (2026).",
        "ES": "“Organização da Audiência de Instrução: Boas Práticas,” capítulo en el libro Produção de Provas em Arbitragens de Construção (coautora), editado por Bruno Guandalini y Romulo Greff Mariana — Synergia (2026).",
    },
    "publication": {
        "EN": "Book chapter in Produção de Provas em Arbitragens de Construção — Synergia (2026)",
        "PT": "Capítulo do livro Produção de Provas em Arbitragens de Construção — Synergia (2026)",
        "ES": "Capítulo en el libro Produção de Provas em Arbitragens de Construção — Synergia (2026)",
    },
}


def main():
    data = json.load(open(TARGET, encoding="utf-8"), object_pairs_hook=OrderedDict)
    content = data["content"]
    tl = content["thoughtLeadership"]

    # -- 1. About ----------------------------------------------------------
    for key, val in ABOUT.items():
        old = content["about"][key]
        content["about"][key] = OrderedDict(val)
        REPORT["about"].append({"field": key, "changed": True,
                                "old_en": old.get("EN") if isinstance(old, dict) else old,
                                "new_en": val["EN"]})
    # meta description mirrors the new lead paragraph
    data["translations"][META_DESCRIPTION_KEY] = OrderedDict(
        {"EN": ABOUT["p1"]["EN"], "ES": ABOUT["p1"]["ES"], "PT": ABOUT["p1"]["PT"]})
    REPORT["translations"].append({"key": META_DESCRIPTION_KEY, "action": "updated to match new About p1"})

    # -- subtitles ---------------------------------------------------------
    for key, val in SUBTITLE_KEYS.items():
        REPORT["translations"].append({"key": key, "action": "repurposed + now rendered",
                                       "value": val["EN"]})
        data["translations"][key] = OrderedDict(val)
    REPORT["translations"].append({"key": TRAJECTORY_TITLE_KEY, "action": "title replaced",
                                   "value": TRAJECTORY_TITLE["EN"]})
    data["translations"][TRAJECTORY_TITLE_KEY] = OrderedDict(TRAJECTORY_TITLE)

    # -- 2. Professional Background: "DC" -> "D.C." ------------------------
    for item in content["professionalBackground"]:
        for field in ("location", "locationES", "locationPT"):
            if field in item and isinstance(item[field], str):
                new = item[field].replace("Washington, DC", "Washington, D.C.")
                if new != item[field]:
                    REPORT["experience"].append({"section": "professionalBackground",
                                                 "field": f"{item['title']}.{field}",
                                                 "old": item[field], "new": new})
                    item[field] = new

    # -- 3. Teaching Experience -------------------------------------------
    for t in NEW_TEACHING:
        content["teachingExperience"].append(OrderedDict(t))
        tl["teachingExperience"].append(OrderedDict(tl_teaching(t)))
        REPORT["experience"].append({"section": "teachingExperience", "action": "added",
                                     "institution": t["institution"], "period": t["period"]})

    # -- 4. Education: Washington D.C. ------------------------------------
    for item in content["education"]:
        if item.get("institution") == "Georgetown University Law Center":
            item["location"] = "Washington, D.C."
            item["locationES"] = "Washington, D.C."
            item["locationPT"] = "Washington, D.C."
            REPORT["experience"].append({"section": "education",
                                         "action": "location normalised to 'Washington, D.C.'"})

    # -- 5. Professional Associations -------------------------------------
    assocs = content["professionalAssociations"]
    for frag, en, es, pt in ASSOC_FIXES:
        hits = 0
        for a in assocs:
            if frag in a["name"]:
                REPORT["experience"].append({"section": "professionalAssociations",
                                             "action": "replaced", "old": a["name"], "new": en})
                a["name"], a["nameES"], a["namePT"] = en, es, pt
                hits += 1
        assert hits == 1, f"association fragment {frag!r} matched {hits} entries"

    assocs.insert(0, OrderedDict(NEW_ASSOCS_HEAD))
    REPORT["experience"].append({"section": "professionalAssociations", "action": "added",
                                 "new": NEW_ASSOCS_HEAD["name"]})
    # CV order puts CBAr just before ArbitralWomen
    idx_tail = next(i for i, a in enumerate(assocs) if a["name"] == "Arbitral Women")
    assocs.insert(idx_tail, OrderedDict(NEW_ASSOCS_TAIL))
    REPORT["experience"].append({"section": "professionalAssociations", "action": "added",
                                 "new": NEW_ASSOCS_TAIL["name"]})

    # -- 6. Cases: as arbitrator ------------------------------------------
    arb = content["cases"]["arbitratorAppointments"]
    for frag, en, es, pt in ARBITRATOR_REPLACEMENTS:
        hits = 0
        for c in arb:
            if frag in norm(c["text"]["EN"]):
                c["text"]["EN"], c["text"]["ES"], c["text"]["PT"] = en, es, pt
                hits += 1
        assert hits == 1, f"arbitrator fragment {frag!r} matched {hits}"
        REPORT["cases"].append({"list": "arbitratorAppointments", "action": "replaced", "match": frag})

    for anchor, where, en, es, pt in ARBITRATOR_ADDITIONS:
        pos = next(i for i, c in enumerate(arb) if anchor in c["text"]["EN"])
        arb.insert(pos, OrderedDict({"text": OrderedDict({"EN": en, "ES": es, "PT": pt}),
                                     "categories": ["commercial"]}))
        REPORT["cases"].append({"list": "arbitratorAppointments", "action": "added", "match": en[:70]})

    # -- 7. Cases: as counsel ---------------------------------------------
    coun = content["cases"]["mattersAsCounsel"]
    for frag, en, es, pt in COUNSEL_REPLACEMENTS:
        hits = 0
        for c in coun:
            if frag in norm(c["text"]["EN"]):
                c["text"]["EN"], c["text"]["ES"], c["text"]["PT"] = en, es, pt
                hits += 1
        assert hits >= 1, f"counsel fragment {frag!r} matched nothing"
        REPORT["cases"].append({"list": "mattersAsCounsel", "action": "replaced",
                                "match": frag, "occurrences": hits})

    # -- 8. Speaking engagements ------------------------------------------
    sp = tl["speakingEngagements"]
    for frag, original, event_en, event_pt, event_es in SPEAKING_ORIGINAL_LANGUAGE:
        hits = 0
        for s in sp:
            if frag in norm(s["title"]["EN"]):
                s["title"] = OrderedDict({"EN": original, "ES": original, "PT": original})
                s["event"]["EN"], s["event"]["PT"], s["event"]["ES"] = event_en, event_pt, event_es
                hits += 1
        assert hits == 1, f"speaking fragment {frag!r} matched {hits}"
        REPORT["speaking"].append({"action": "title set to original language", "match": frag})

    for frag, new_event, old_event in SPEAKING_FIELD_FIXES:
        hits = 0
        for s in sp:
            if frag in s["title"]["EN"] and norm(s["event"]["EN"]) == norm(old_event):
                s["event"]["EN"] = new_event["EN"]
                if "ES" in new_event:
                    s["event"]["ES"] = new_event["ES"]
                if "PT" in new_event:
                    s["event"]["PT"] = new_event["PT"]
                hits += 1
        assert hits == 1, f"speaking field fix {frag!r} matched {hits}"
        REPORT["speaking"].append({"action": "event corrected", "match": frag, "old": old_event,
                                   "new": new_event["EN"]})

    for rep in SPEAKING_REPAIRS:
        hits = 0
        for s in sp:
            if rep["match_title"] in norm(s["title"]["EN"]) and rep["match_event"] in norm(s["event"]["EN"]):
                s["title"] = OrderedDict(rep["title"])
                s["event"] = OrderedDict(rep["event"])
                hits += 1
        assert hits == 1, f"speaking repair {rep['match_title']!r} matched {hits}"
        REPORT["speaking"].append({"action": "repaired mis-split title/event",
                                   "title": rep["title"]["EN"]})

    for anchor, title, event_en, event_pt, event_es in SPEAKING_ADDITIONS:
        pos = next(i for i, s in enumerate(sp) if anchor in s["event"]["EN"])
        sp.insert(pos, OrderedDict({
            "title": OrderedDict({"EN": title, "ES": title, "PT": title}),
            "event": OrderedDict({"EN": event_en, "ES": event_es, "PT": event_pt}),
        }))
        REPORT["speaking"].append({"action": "added (chronological position)", "title": title})

    # -- 9. Publications ---------------------------------------------------
    tl["publications"].insert(1, OrderedDict(NEW_PUBLICATION))
    REPORT["publications"].append({"action": "added", "title": NEW_PUBLICATION["title"]["EN"][:80]})

    # -- write -------------------------------------------------------------
    with open(TARGET, "w", encoding="utf-8") as fh:
        json.dump(data, fh, indent=4, ensure_ascii=False)

    print(json.dumps(REPORT, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
