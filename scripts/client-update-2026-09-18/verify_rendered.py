#!/usr/bin/env python3
"""
Verify the 2026-09-18 client update against the ORIGINAL request documents.

Two independent layers of evidence:
  A. RENDERED DOM  -- the production build is served, each page is rendered in a
     real headless Chromium, HTML text extracted, and every client-supplied
     string is asserted present.
  B. DATA INTEGRITY -- siteContent.json checked field-by-field for all three
     languages (EN/ES/PT), the CV PDFs, the footer flag and the netlify redirects.

Usage (server must already be running on :4173):
  python3 scripts/client-update-2026-09-18/verify_rendered.py [--out DIR]
"""
import argparse
import html
import json
import os
import re
import subprocess
import sys
import unicodedata

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import cdp_render  # noqa: E402

REPO = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
SITE = "http://localhost:4173"
CHROME = "/home/gonzalo-mena/.cache/ms-playwright/chromium-1234/chrome-linux64/chrome"
CLIENT_DOCS = "/home/gonzalo-mena/Documents/Franzarb"

results = []


def fold(s):
    """Accent-insensitive, quote/dash-normalised, whitespace-collapsed text."""
    s = html.unescape(s)
    s = unicodedata.normalize("NFD", s)
    s = "".join(ch for ch in s if not unicodedata.combining(ch))
    s = unicodedata.normalize("NFC", s)
    for a, b in [("\u2019", "'"), ("\u2018", "'"), ("\u201c", '"'), ("\u201d", '"'),
                 ("\u2013", "-"), ("\u2014", "-"), ("\u2011", "-"), ("\u00a0", " "),
                 ("\u2010", "-"), ("\u00ba", "o"), ("\u00aa", "a"),
                 ("\u00bf", ""), ("\u00a1", "")]:
        s = s.replace(a, b)
    s = re.sub(r"\s+", " ", s)
    # JSX renders inline siblings with a space before the following punctuation
    s = re.sub(r"\s+([,.;:?!%])", r"\1", s)
    return s.strip()


norm = fold  # alias used by the checks below


def check(scope, label, ok, detail=""):
    results.append({"scope": scope, "label": label, "pass": bool(ok), "detail": detail})
    return ok


def render(scope, cache):
    """scope is either '/path' or '/path|tab-text-to-click'."""
    if "|" in scope:
        path, tab = scope.split("|", 1)
    else:
        path, tab = scope, None
    key = (path, tab)
    if key in cache:
        return cache[key]
    dom, clicked = cdp_render.render(SITE + path, click=tab)
    text = fold(re.sub(r"<script.*?</script>|<style.*?</style>", " ", dom, flags=re.S))
    text = fold(re.sub(r"<[^>]+>", " ", text))
    cache[key] = text
    return text


# ---------------------------------------------------------------------------
# A. RENDERED DOM CHECKS -- strings taken verbatim from the client documents
# ---------------------------------------------------------------------------
DOM_CHECKS = [
    # ---- About page (from "Instructions to change Website About Page") ----
    ("/", "About: new first paragraph (docx: 'Replace first paragraph by this')",
     "Erica Franzetti is an independent arbitrator and international disputes counsel. With a 25-year legal career at market-leading law firms"),
    ("/", "About: quote 1 kept (The Legal 500)",
     'Erica is a superstar who stands out for her extremely well-versed approach in high-stakes international disputes.'),
    ("/", "About: quote 1 source = The Legal 500", "The Legal 500"),
    ("/", "About: new second paragraph (docx: 'Replace second paragraph by this')",
     "A fellow of the Chartered Institute of Arbitrators (FCIArb), Erica serves as sole arbitrator, co-arbitrator and chair of arbitral tribunals."),
    ("/", "About: NEW subtitle 'Arbitral Experience' (docx: 'Add this subtitle')",
     "Arbitral Experience"),
    ("/", "About: bullet 1 replaced (Experience under Multiple Arbitral Rules)",
     "Experience under Multiple Arbitral Rules - Erica has acted as arbitrator and counsel in proceedings under the ICC, AAA, ICDR, LCIA, ICSID, and UNCITRAL Rules."),
    ("/", "About: bullet 2 replaced (Tribunal Management and Awards)",
     "Tribunal Management and Awards - She has substantial experience managing arbitral tribunals and drafting reasoned arbitral awards under diverse legal frameworks."),
    ("/", "About: bullet 3 replaced (Complex Cross-Border Disputes)",
     "Complex Cross-Border Disputes - Her work includes complex commercial and investor-State disputes involving significant commercial interests and reputational considerations."),
    ("/", "About: NEW subtitle 'Advisory Experience' (docx: 'Add this subtitle')",
     "Advisory Experience"),
    ("/", "About: advisory sentence replaced",
     "Erica also provides strategic advisory and consulting services to clients worldwide, including:"),
    ("/", "About: advisory bullet 1 (Dispute Prevention and Risk Assessment)",
     "Dispute Prevention and Risk Assessment - Assessment of potential disputes and development of structures designed to mitigate dispute risk."),
    ("/", "About: advisory bullet 4 (Post-award and Enforcement Strategy)",
     "Post-award and Enforcement Strategy - Strategic planning for the recognition and enforcement of awards, as well as the defense of set aside proceedings in multiple jurisdictions."),
    ("/", "About: quote 2 kept (Chambers USA)",
     "I think really highly of her, she's fabulous. She comes across as very intelligent and capable, and she's always really professional and personable."),
    ("/", "About: Multijurisdictional heading kept",
     "Multijurisdictional and Multisectoral Experience"),
    ("/", "About: paragraph replaced (high-stakes ... Americas, Europe, Africa and Asia)",
     "Erica has acted in high-stakes arbitration proceedings across the Americas, Europe, Africa, and Asia, including matters involving the United States, Argentina, Brazil, Canada, Chile, Colombia, Croatia, the Dominican Republic, Ghana, Hungary, Mexico, Peru, and the Philippines."),
    ("/", "About: sector list replaced (Commercial contracts ... CISG)",
     "Commercial contracts - Hotel management and operation; distribution agreements; financial contracts; intellectual property; force majeure and changed-circumstances claims; and transactions governed by the United Nations Convention on Contracts for the International Sale of Goods (CISG)."),
    ("/", "About: sector list replaced (Energy and Natural Resources)",
     "Energy and Natural Resources - Mining, oil and gas, LNG pricing, and electricity and nuclear power generation."),
    ("/", "About: quote 3 kept (Lexology)",
     "Her technical skills, experience in the field, relentless dedication to client service and commercial mindset are really impressive."),
    ("/", "About: title replaced -> 'Recognition and Professional Background'",
     "Recognition and Professional Background"),
    ("/", "About: p5 replaced (recognition paragraph)",
     "Erica has received prestigious recognition from leading legal directories, including Chambers and Partners, The Legal 500, Lexology (formerly Who's Who Legal), Latin Lawyer, and Best Lawyers, and has been named one of Latin America's Top 100 Female Lawyers by Latinvex."),
    ("/", "About: p6 replaced (publishes and speaks)",
     "She regularly publishes and speaks on international commercial arbitration, investor-State arbitration, and dispute-resolution strategy at international conferences and professional forums"),
    ("/", "About: p7 replaced (17 years / admissions / languages)",
     "Before founding her own practice, Erica spent more than 17 years at major U.S. law firms, including approximately eight years as a partner in internationally recognized arbitration teams."),

    # ---- Experience / CV content (from "Website Update 2026.09.18") ----
    ("/", "Professional Background: King & Spalding location reads 'Washington, D.C. and Miami'",
     "Washington, D.C. and Miami"),
    ("/", "Professional Background: King & Spalding role/period intact",
     "Partner Sept. 2021 - Jan. 2026"),
    ("/", "Teaching Experience: American University Washington College of Law added",
     "American University Washington College of Law"),
    ("/", "Teaching Experience: NOVA School of Law added",
     "NOVA School of Law"),
    ("/", "Education: Georgetown reads 'Washington, D.C.'",
     "LL.M. International Studies, Distinction and Dean's List, Washington, D.C."),
    ("/", "Professional Associations: FCIArb added",
     "Fellow of the Chartered Institute of Arbitrators (FCIArb)"),
    ("/", "Professional Associations: Brazilian Arbitration Committee (CBAr) added",
     "Brazilian Arbitration Committee (CBAr)"),
    ("/", "Professional Associations: ICDR reads 'Centre for Dispute Resolution'",
     "International Centre for Dispute Resolution (ICDR)"),
    ("/", "Professional Associations: ICC Brazil reads 'International Chamber of Commerce'",
     "International Chamber of Commerce (ICC) Brazil"),

    # ---- Cases (arbitrator) ----
    ("/cases", "Arbitrator: EV-charging matter now seated in Wilmington, DE",
     "governed by the laws of the State of Delaware; seated in Wilmington, DE."),
    ("/cases", "Arbitrator: new AAA healthcare sales & purchase case added",
     "Sole arbitrator in an arbitration under the AAA Commercial Rules concerning a claim for breach of a sales and purchase agreement in the healthcare industry."),
    ("/cases", "Arbitrator: new AAA financial-services case added",
     "Sole arbitrator in an arbitration under the AAA Commercial Rules concerning a claim for breach of a services agreement in the financial services industry."),
    ("/cases", "Arbitrator: CCBC matter reads 'laws of Brazil'",
     "Co-arbitrator in a CCBC corporate dispute arising out of a share purchase agreement governed by the laws of Brazil; seated in New York."),
    ("/cases", "Arbitrator: ICDR highway concession now seated in Bogota",
     "concession agreement for the development of a highway project in Latin America; seated in Bogota; proceedings in Spanish."),
    ("/cases", "Arbitrator: ICDR large-scale concession now seated in Bogota",
     "concession agreement for a large-scale infrastructure project in Latin America; seated in Bogota; proceedings in Spanish."),
    ("/cases", "Arbitrator: Peru food-producer matter now seated in Lima",
     "between a food producer in the United States and a Peruvian company concerning a supply contract governed by the laws of Peru; seated in Lima."),
    ("/cases", "Arbitrator: Swiss/American matter now seated in Miami",
     "between a Swiss and an American company concerning the breach of a sales agreement governed by the laws of the State of Florida; seated in Miami."),

    # ---- Cases (counsel) ----
    ("/cases", "Counsel: Quanta Services text replaced",
     "Counsel to the Claimant in Quanta Services Netherlands B.V. v. Republic of Peru (ICSID Case No. ARB/21/1), a dispute under the Netherlands-Peru Bilateral Investment Treaty (BIT) arising from measures related to concessions to build and operate fiber-optic networks."),
    ("/cases", "Counsel: Gasoducto Sur Peruano text replaced",
     "Counsel to the Claimant in Gasoducto Sur Peruano S.A. en Liquidacion v. Republic of Peru (ICSID Case No. ARB/24/29), a contractual dispute over a gas pipeline project that collapsed in the wake of the Odebrecht corruption scandal."),
    ("/cases", "Counsel: MOL v. Croatia text replaced",
     "Counsel to the Claimant in MOL Hungarian Oil and Gas Company v. Republic of Croatia (ICSID Case No. ARB/13/32)"),
    ("/cases", "Counsel: Croatia v. MOL text replaced",
     "Counsel to the Respondent in Croatia v. MOL Hungarian Oil and Gas PLC (PCA Case No. 2014-15), a contractual dispute under the UNCITRAL Rules regarding shareholders' rights"),
    ("/cases", "Counsel: Chevron v. Philippines text replaced",
     "Chevron Overseas Finance GmbH v. the Republic of the Philippines (PCA Case No. 2019-25)"),
    ("/cases", "Counsel: Ruby Roz Agricol text replaced",
     "Ruby Roz Agricol LLP v. the Republic of Kazakhstan, an UNCITRAL investment arbitration about a Kazakh poultry farm investment"),
    ("/cases", "Counsel: Pluspetrol text replaced",
     "Pluspetrol Peru et al. v. Perupetro (ICSID Case No. ARB/12/28)"),
    ("/cases", "Counsel: Brazilian conglomerate indemnity matter replaced",
     "Counsel to an American company against a Brazilian construction conglomerate in an ICC arbitration concerning an indemnity agreement governed by the laws of Brazil."),
    ("/cases", "Counsel: Dutch investor / Delaware JV matter replaced",
     "Advisor to a Dutch investor on financing and corporate governance matters connected to a joint venture agreement governed by the laws of the State of Delaware for the development of a startup nuclear energy project in Latin America."),
    ("/cases", "Counsel: Colombian logistics matter replaced",
     "Counsel to a multinational logistics company in an ICC arbitration against a Colombian company in connection with a commercial representation agreement governed by the laws of the State of Texas."),

    # ---- Speaking engagements (original language) ----
    ("/thought-leadership|speaking", "Speaking: PT original - Arbitragem no Setor de Aviacao Comercial",
     "Arbitragem no Setor de Aviacao Comercial com Partes Brasileiras"),
    ("/thought-leadership|speaking", "Speaking: PT original - Contratos Comerciais e Arbitragem em Setores Regulados",
     "Contratos Comerciais e Arbitragem em Setores Regulados: Autonomia das Partes e Heteronomia Regulatoria"),
    ("/thought-leadership|speaking", "Speaking: PT original - Procedimentos Virtuais e Taticas de Guerrilha",
     "Procedimentos Virtuais e Taticas de Guerrilha em Arbitragem"),
    ("/thought-leadership|speaking", "Speaking: ES original - Arbitrajes Virtuales: Ventajas e Inconvenientes",
     "Arbitrajes Virtuales: Ventajas e Inconvenientes"),
    ("/thought-leadership|speaking", "Speaking: ES original - Ha Llegado el Invierno al Arbitraje",
     "Ha Llegado el Invierno al Arbitraje? Crisis, Etica y Corrupcion? Conferencia Internacional de Mujeres"),
    ("/thought-leadership|speaking", "Speaking: ES original - Como Afrontar un Arbitraje Nacional o Internacional de APP",
     "Como Afrontar un Arbitraje Nacional o Internacional de Asociacion Publico-Privada?"),
    ("/thought-leadership|speaking", "Speaking: ES original - Vision de los Arbitros y Abogados",
     "Vision de los Arbitros y Abogados Sobre el Desarrollo del Arbitraje Internacional"),
    ("/thought-leadership|speaking", "Speaking: PT original - O Papel do Arbitro na Avaliacao de Danos",
     "O Papel do Arbitro na Avaliacao de Danos"),
    ("/thought-leadership|speaking", "Speaking: added - From NAFTA to USMCA (July 29, 2020)",
     "From NAFTA to USMCA: A Discussion on Key Changes to Trade and Investment"),
    ("/thought-leadership|speaking", "Speaking: added - Negotiation of Treaties for Embassies (April 10, 2019)",
     "Negotiation of Treaties for the Promotion and Protection of Foreign Investment"),
    ("/thought-leadership|speaking", "Speaking: added - Aspectos Practicos / Direccion Nacional de Vialidad (July 27, 2018)",
     "Private seminar organized by Direccion Nacional de Vialidad, in cooperation with the ICDR, Buenos Aires, Argentina (July 27, 2018)"),
    ("/thought-leadership|speaking", "Speaking: replaced - ICDR/CIArb/University of Miami (March 2, 2026)",
     "ICDR/CIArb/University of Miami School of Law, Miami (March 2, 2026)"),
    ("/thought-leadership|speaking", "Speaking: replaced - Aspectos Practicos ICDR New York (May 27, 2016)",
     "ICDR, International Arbitration Symposium, New York (May 27, 2016)"),

    # ---- Publications ----
    ("/thought-leadership|publication", "Publication: new 2026 Organizacao da Audiencia de Instrucao added",
     "Organizacao da Audiencia de Instrucao: Boas Praticas"),
    ("/thought-leadership|publication", "Publication: Lei de Arbitragem Comentada (Article 12) present",
     "Lei de Arbitragem Comentada: Lei No. 9.307/1996"),
    ("/thought-leadership|publication", "Publication: A Structured Guide to Arbitration Law and Practice in Brazil present",
     "A Structured Guide to Arbitration Law and Practice in Brazil"),
    ("/thought-leadership|publication", "Publication: Directrices Practicas Para la Redaccion del Acuerdo Arbitral present",
     "Directrices Practicas Para la Redaccion del Acuerdo Arbitral"),
]


# ---------------------------------------------------------------------------
# B. DATA-INTEGRITY CHECKS
# ---------------------------------------------------------------------------
def data_checks():
    data = json.load(open(os.path.join(REPO, "client", "src", "data", "siteContent.json"), encoding="utf-8"))
    before = json.load(open("/tmp/siteContent.before.json", encoding="utf-8"))
    c, t = data["content"], data["translations"]
    c0 = before["content"]

    # --- all three languages present + non-empty on every touched About field
    for key in ["p1", "p2", "p3", "p4", "p5", "p6", "p7", "serviceList1", "serviceList2", "sectorList"]:
        for lang in ("EN", "ES", "PT"):
            v = c["about"][key][lang]
            check("data/about", f"about.{key}.{lang} present and non-empty", bool(v) and len(str(v)) > 20,
                  f"{len(str(v))} chars")

    # --- About fields actually changed from the pre-update file
    for key in ["p1", "p2", "p3", "p4", "p5", "p6", "p7", "serviceList1", "serviceList2", "sectorList"]:
        check("data/about", f"about.{key} differs from original",
              json.dumps(c["about"][key], ensure_ascii=False) != json.dumps(c0["about"][key], ensure_ascii=False))

    # --- subtitles
    for key, expect in [("section.independentArbitrator", "Arbitral Experience"),
                        ("section.strategicAdvisory", "Advisory Experience")]:
        for lang in ("EN", "ES", "PT"):
            check("data/translations", f"{key}.{lang} = {expect!r}",
                  t[key][lang] and t[key]["EN"] == expect, t[key][lang])

    check("data/translations", "trajectory title = 'Recognition and Professional Background'",
          t["section.thoughtLeadershipTrajectory"]["EN"] == "Recognition and Professional Background")
    for lang in ("EN", "ES", "PT"):
        check("data/translations", f"meta description (about.description.{lang}) mirrors new About p1",
              t["about.description"][lang] == c["about"]["p1"][lang])

    # --- no stray "Washington, DC" (missing periods) in the CV sections the client scoped
    pb = fold(json.dumps(c["professionalBackground"], ensure_ascii=False))
    ed = fold(json.dumps(c["education"], ensure_ascii=False))
    check("data/experience", "Professional Background has no 'Washington, DC' (missing periods)",
          "Washington, DC" not in pb)
    check("data/experience", "Education has no 'Washington, DC' (missing periods)",
          "Washington, DC" not in ed)
    check("data/experience", "'Washington, D.C.' present in Professional Background",
          "Washington, D.C." in pb)
    check("data/experience", "'Washington, D.C.' present in Education", "Washington, D.C." in ed)

    # --- teaching experience
    insts = [x["institution"] for x in c["teachingExperience"]]
    check("data/experience", "teachingExperience has 4 entries", len(insts) == 4, str(insts))
    for name in ["American University Washington College of Law", "NOVA School of Law"]:
        check("data/experience", f"teachingExperience contains {name!r}", name in insts)
    tl_insts = [x["institution"] for x in c["thoughtLeadership"]["teachingExperience"]]
    check("data/experience", "Thought Leadership teaching list mirrors the same 4",
          tl_insts == insts, str(tl_insts))
    for item in c["thoughtLeadership"]["teachingExperience"]:
        check("data/experience", f"TL teaching {item['institution']!r} has a logo file that exists",
              item.get("logo") and os.path.exists(os.path.join(REPO, "client", "public", item["logo"].lstrip("/"))),
              item.get("logo", ""))

    # --- professional associations
    names = [a["name"] for a in c["professionalAssociations"]]
    for expect in ["Fellow of the Chartered Institute of Arbitrators (FCIArb)",
                   "Brazilian Arbitration Committee (CBAr)",
                   "Panel of Arbitrators of the International Centre for Dispute Resolution (ICDR)",
                   "Arbitration & Mediation Committee of the International Chamber of Commerce (ICC) Brazil"]:
        check("data/experience", f"associations contain {expect!r}", expect in names)
    check("data/experience", "associations count = 12 (10 + 2 added)", len(names) == 12, str(len(names)))
    for a in c["professionalAssociations"]:
        missing = [k for k in ("name", "nameES", "namePT") if not a.get(k)]
        check("data/experience", f"association {a['name'][:45]!r} localised in EN/ES/PT", not missing, str(missing))

    # --- association logos exist, and the HKIAC/B3 pair points at the right artwork
    try:
        from PIL import Image
        for a in c["professionalAssociations"]:
            if not a.get("logo"):
                continue
            p = os.path.join(REPO, "client", "public", a["logo"].lstrip("/"))
            check("data/experience", f"logo file exists for {a['name'][:45]!r}",
                  os.path.exists(p), a["logo"])
        def art(name_frag):
            for a in c["professionalAssociations"]:
                if name_frag in a["name"]:
                    p = os.path.join(REPO, "client", "public", a["logo"].lstrip("/"))
                    return Image.open(p).size
            return None
        hk = art("Hong Kong International")
        b3 = art("Capital Market Chamber")
        # HKIAC's wordmark is wide; B3's is a small square mark
        check("data/experience", "HKIAC entry points at the wide HKIAC wordmark (not the B3 square mark)",
              hk and hk[0] > 200 and hk[0] > hk[1], str(hk))
        check("data/experience", "B3/CAM entry points at the B3 square mark (not the HKIAC wordmark)",
              b3 and b3[0] < 200, str(b3))
    except ImportError:
        check("data/experience", "PIL available to check association logo artwork", False, "PIL missing")

    # --- cases: language coverage + counts
    arb = c["cases"]["arbitratorAppointments"]
    coun = c["cases"]["mattersAsCounsel"]
    check("data/cases", "arbitrator appointments = 19 (17 + 2 added)", len(arb) == 19, str(len(arb)))
    check("data/cases", "counsel matters = 45 (unchanged count)", len(coun) == 45, str(len(coun)))
    for grp, items in (("arbitratorAppointments", arb), ("mattersAsCounsel", coun)):
        for i, item in enumerate(items):
            for lang in ("EN", "ES", "PT"):
                check("data/cases", f"{grp}[{i}].text.{lang} non-empty",
                      bool(item["text"].get(lang, "").strip()))

    # --- speaking engagements ordering (reverse chronological)
    sp = c["thoughtLeadership"]["speakingEngagements"]
    check("data/speaking", "speaking engagements = 60 (57 + 3 added)", len(sp) == 60, str(len(sp)))
    for title in ["From NAFTA to USMCA", "Negotiation of Treaties for the Promotion",
                  "Direccion Nacional de Vialidad"]:
        check("data/speaking", f"added speaking item {title!r} present",
              any(fold(title) in fold(s["title"]["EN"]) or fold(title) in fold(s["event"]["EN"]) for s in sp))

    def year(s):
        m = re.findall(r"(19|20)\d{2}", s["event"]["EN"])
        return max(int(x) for x in re.findall(r"(?:19|20)\d{2}", s["event"]["EN"])) if m else 0
    years = [year(s) for s in sp]
    desc = all(years[i] >= years[i + 1] for i in range(len(years) - 1))
    check("data/speaking", "speaking engagements still in reverse-chronological order", desc,
          "out-of-order at: " + str([(sp[i]["title"]["EN"][:40], years[i], years[i + 1])
                                     for i in range(len(years) - 1) if years[i] < years[i + 1]]))
    # original-language requirement
    for s in sp:
        t_en, t_es, t_pt = s["title"]["EN"], s["title"].get("ES"), s["title"].get("PT")
        check("data/speaking", f"title localised (non-empty ES/PT): {t_en[:45]!r}",
              bool(t_es and t_pt))
    for frag, lang in [("Arbitragem no Setor de Aviacao", "PT"),
                       ("Contratos Comerciais e Arbitragem em Setores Regulados", "PT"),
                       ("Procedimentos Virtuais e Taticas de Guerrilha", "PT"),
                       ("Arbitrajes Virtuales", "ES"),
                       ("Ha Llegado el Invierno al Arbitraje", "ES"),
                       ("Como Afrontar un Arbitraje Nacional", "ES"),
                       ("Vision de los Arbitros y Abogados", "ES"),
                       ("O Papel do Arbitro na Avaliacao de Danos", "PT")]:
        hit = [s for s in sp if fold(frag) in fold(s["title"]["EN"])]
        check("data/speaking", f"'{frag}' shown in original language in every UI language",
              bool(hit) and all(fold(h["title"]["EN"]) == fold(h["title"]["ES"]) == fold(h["title"]["PT"]) for h in hit))

    # --- publications
    pubs = [fold(p["title"]["EN"]) for p in c["thoughtLeadership"]["publications"]]
    check("data/publications", "publications = 14 (13 + 1 added)", len(pubs) == 14, str(len(pubs)))
    check("data/publications", "new 2026 construction-evidence chapter added",
          any("Organizacao da Audiencia de Instrucao" in p for p in pubs))
    check("data/publications", "new publication sits at the top of the 2026 entries",
          "Organizacao da Audiencia" in pubs[1], pubs[1][:70])

    # --- every CV list item fully localised (no silent English fallback)
    for item in c["professionalBackground"]:
        for f in ("location", "locationES", "locationPT", "role", "roleES", "rolePT"):
            check("data/experience", f"professionalBackground {item['title'][:28]!r}.{f} localised",
                  bool(str(item.get(f, "")).strip()), repr(item.get(f)))
    for item in c["education"]:
        # only require a language variant where the English field is actually populated
        for base in ("degree", "note", "location"):
            if str(item.get(base, "")).strip():
                check("data/experience", f"education {item['institution'][:28]!r}.{base} localised in ES/PT",
                      bool(str(item.get(base + "ES", "")).strip()) and bool(str(item.get(base + "PT", "")).strip()),
                      f"ES={item.get(base + 'ES')!r} PT={item.get(base + 'PT')!r}")

    # --- publication wording aligned with the client's document
    pub_txt = {p["title"]["EN"]: p["publication"] for p in c["thoughtLeadership"]["publications"]}
    dp = next((v for k, v in pub_txt.items() if k.startswith("Directrices")), {})
    check("data/publications", "'Directrices...' EN cites 'Tratado de Derecho Arbitral' (Spanish title)",
          "Tratado de Derecho Arbitral" in dp.get("EN", ""), dp.get("EN", ""))
    check("data/publications", "'Directrices...' EN no longer duplicates '(Co-author)'",
          "(Co-author)" not in dp.get("EN", "") and "(Coautor)" not in dp.get("PT", ""), dp.get("EN", ""))
    sg = next((v for k, v in pub_txt.items() if k.startswith("A Structured Guide")), {})
    check("data/publications", "'A Structured Guide' carries the full date (September 17, 2014)",
          "September 17, 2014" in sg.get("EN", ""), sg.get("EN", ""))
    check("data/publications", "'Lei No. 9.307/1996' in the commented-arbitration-act title",
          any(k.endswith("Lei No. 9.307/1996") for k in pub_txt), "")

    # --- CV PDF: byte-identical to the client's supplied file
    import hashlib
    def md5(p):
        return hashlib.md5(open(p, "rb").read()).hexdigest()
    src = os.path.join(CLIENT_DOCS, "Franzetti Curriculum Vitae Sept. 2026 (EN).pdf")
    pub = os.path.join(REPO, "client", "public", "cv", "Franzetti-CV-English.pdf")
    check("data/cv", "published EN CV PDF is byte-identical to the client's Sept. 2026 file",
          md5(src) == md5(pub), md5(pub))
    check("data/cv", "published EN CV PDF is 11 pages", "Pages:           11" in
          subprocess.run(["pdfinfo", pub], capture_output=True, text=True).stdout)

    # --- footer flag + netlify redirects
    footer = open(os.path.join(REPO, "client", "src", "components", "Footer.tsx"), encoding="utf-8").read()
    for key, expect in [("english", True), ("englishMini", False), ("spanish", False),
                        ("spanishMini", False), ("portuguese", False), ("portugueseMini", False)]:
        m = re.search(rf"{key}:\s*(true|false)", footer)
        check("data/cv", f"Footer CV_DOWNLOAD_ENABLED.{key} == {expect}",
              m and (m.group(1) == "true") == expect, m.group(0) if m else "not found")

    nf = open(os.path.join(REPO, "netlify.toml"), encoding="utf-8").read()
    check("data/cv", "netlify: blanket /cv/* 404 block removed", 'from = "/cv/*"' not in nf)
    for f in ["Franzetti-Mini-CV-English.pdf", "Franzetti-CV-Spanish.pdf", "Franzetti-Mini-CV-Spanish.pdf",
              "Franzetti-CV-Portuguese.pdf", "Franzetti-Mini-CV-Portuguese.pdf"]:
        check("data/cv", f"netlify: stale file /cv/{f} still 404-blocked", f'from = "/cv/{f}"' in nf)
    check("data/cv", "netlify: corrected EN CV is NOT 404-blocked",
          'from = "/cv/Franzetti-CV-English.pdf"' not in nf)

    # --- new logo assets ship in the build
    for logo in ["american-university-wcl-logo.svg", "nova-school-of-law-logo.svg"]:
        check("data/assets", f"logo asset present: {logo}",
              os.path.exists(os.path.join(REPO, "client", "public", "images", logo)))
        check("data/assets", f"logo asset copied into build output: {logo}",
              os.path.exists(os.path.join(REPO, "dist", "public", "images", logo)))


# ---------------------------------------------------------------------------
# C. SPANISH / PORTUGUESE RENDERED-DOM CHECKS
# The switcher is a dropdown whose options are labelled with the full language
# name, so the pre-step opens it and picks the option.
# ---------------------------------------------------------------------------
LANG_SWITCH_JS = """
  const trig=[...document.querySelectorAll('button')].find(b=>b.textContent.trim()==='EN');
  if(trig) trig.click();
  await new Promise(r=>setTimeout(r,700));
  const opt=[...document.querySelectorAll('button')].find(e=>e.textContent.trim()==='OPTION_LABEL');
  if(opt) opt.click();
  await new Promise(r=>setTimeout(r,1800));
  return 'ok';
"""

LANG_CHECKS = {
    "Español": [
        ("About p1 translated", "carrera jurídica de 25 años en firmas de abogados líderes en el mercado"),
        ("About p2 translated", "Miembro del Chartered Institute of Arbitrators (FCIArb), Erica actúa como árbitra única"),
        ("Subtitle 'Arbitral Experience'", "Experiencia Arbitral"),
        ("Subtitle 'Advisory Experience'", "Experiencia en Asesoría"),
        ("serviceList1 bullet 1 translated", "Experiencia bajo múltiples reglamentos arbitrales"),
        ("serviceList2 bullet 4 translated", "Estrategia posterior al laudo y de ejecución"),
        ("Trajectory title translated", "Reconocimiento y Trayectoria Profesional"),
        ("Association: FCIArb", "Miembro del Chartered Institute of Arbitrators (FCIArb)"),
        ("Association: CBAr", "Comité Brasileño de Arbitraje (CBAr)"),
        ("Association: ICC Brazil corrected", "Cámara de Comercio Internacional (CCI) Brasil"),
        ("Association: ICDR corrected", "Centro Internacional para la Resolución de Disputas (ICDR)"),
        ("Teaching: American University", "American University Washington College of Law"),
        ("Teaching: NOVA", "NOVA School of Law"),
        ("Education: Georgetown note translated (no EN fallback)", "Estudios Internacionales, Distinción y Lista del Decano"),
        ("Professional Background: Weil / Crowell location", "Washington, D.C., Asociada Senior"),
    ],
    "Português": [
        ("About p1 translated", "carreira jurídica de 25 anos em escritórios de advocacia líderes de mercado"),
        ("About p2 translated", "Membro do Chartered Institute of Arbitrators (FCIArb), Erica atua como árbitra única"),
        ("Subtitle 'Arbitral Experience'", "Experiência Arbitral"),
        ("Subtitle 'Advisory Experience'", "Experiência em Assessoria"),
        ("serviceList1 bullet 1 translated", "Experiência sob diversos regulamentos arbitrais"),
        ("serviceList2 bullet 4 translated", "Estratégia pós-sentença e de execução"),
        ("Trajectory title translated", "Reconhecimento e Trajetória Profissional"),
        ("Association: FCIArb", "Membro do Chartered Institute of Arbitrators (FCIArb)"),
        ("Association: CBAr", "Comitê Brasileiro de Arbitragem (CBAr)"),
        ("Association: ICC Brazil corrected", "Câmara de Comércio Internacional (CCI) Brasil"),
        ("Teaching: NOVA", "NOVA School of Law"),
        ("Teaching: American University", "American University Washington College of Law"),
    ],
}


def language_checks(cache):
    for label, probes in LANG_CHECKS.items():
        key = ("/", "lang-" + label)
        if key not in cache:
            dom, _ = cdp_render.render(SITE + "/", pre_js=LANG_SWITCH_JS.replace("OPTION_LABEL", label))
            cache[key] = fold(re.sub(r"<[^>]+>", " ",
                                     fold_dom(dom)))
        text = cache[key]
        for name, needle in probes:
            check(f"rendered/{label}", f"[{label}] {name}", fold(needle) in text,
                  "" if fold(needle) in text else "not found in rendered DOM")


def fold_dom(dom):
    return re.sub(r"<script.*?</script>|<style.*?</style>", " ", dom, flags=re.S)


# ---------------------------------------------------------------------------
# D. SECTION ORDERING CHECKS
# The client's document prescribes the sequence of the About page, so presence
# alone is not enough: assert the subtitles sit where the document puts them
# ("Arbitral Experience" AFTER the second paragraph and BEFORE its bullet list;
# "Advisory Experience" BEFORE the advisory sentence and its bullet list).
# ---------------------------------------------------------------------------
ORDER_CHECKS = [
    ("/", None, "EN: second paragraph before the 'Arbitral Experience' subtitle",
     "A fellow of the Chartered Institute of Arbitrators (FCIArb), Erica serves as sole arbitrator",
     "Arbitral Experience"),
    ("/", None, "EN: 'Arbitral Experience' subtitle before its bullet list",
     "Arbitral Experience",
     "Experience under Multiple Arbitral Rules"),
    ("/", None, "EN: 'Advisory Experience' subtitle after the arbitral bullets",
     "Tribunal Management and Awards",
     "Advisory Experience"),
    ("/", None, "EN: 'Advisory Experience' subtitle before the advisory sentence",
     "Advisory Experience",
     "Erica also provides strategic advisory and consulting services to clients worldwide"),
    ("/", None, "EN: advisory sentence before its bullet list",
     "Erica also provides strategic advisory and consulting services to clients worldwide",
     "Dispute Prevention and Risk Assessment"),
    ("/", "lang:Español", "ES: para 2 before 'Experiencia Arbitral'",
     "Miembro del Chartered Institute of Arbitrators (FCIArb), Erica actúa",
     "Experiencia Arbitral"),
    ("/", "lang:Português", "PT: para 2 before 'Experiência Arbitral'",
     "Membro do Chartered Institute of Arbitrators (FCIArb), Erica atua",
     "Experiência Arbitral"),
]


def order_checks(cache):
    for path, pre, label, before, after in ORDER_CHECKS:
        key = (path, pre or "default")
        if key not in cache:
            dom, _ = cdp_render.render(
                SITE + path,
                pre_js=LANG_SWITCH_JS.replace("OPTION_LABEL", pre.split(":")[1]) if pre else None)
            cache[key] = fold(re.sub(r"<[^>]+>", " ", fold_dom(dom)))
        text = cache[key]
        i, j = text.find(fold(before)), text.find(fold(after))
        check(f"order{path}", label, i != -1 and j != -1 and i < j,
              f"positions {i} / {j}" if (i == -1 or j == -1 or i >= j) else "")


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--out", default=os.path.join(CLIENT_DOCS, "Website-Update-2026-09-18-EVIDENCE"))
    args = ap.parse_args()
    os.makedirs(args.out, exist_ok=True)

    cache = {}
    for path, label, needle in DOM_CHECKS:
        text = render(path, cache)
        check(f"rendered{path}", label, norm(needle) in text,
              "not found in rendered DOM" if norm(needle) not in text else "")

    language_checks(cache)

    order_checks(cache)

    data_checks()

    passed = sum(1 for r in results if r["pass"])
    failed = [r for r in results if not r["pass"]]

    with open(os.path.join(args.out, "verification_results.json"), "w", encoding="utf-8") as fh:
        json.dump({"total": len(results), "passed": passed, "failed": len(failed),
                   "results": results}, fh, ensure_ascii=False, indent=2)

    lines = ["# Verification results - Franzetti website update 2026-09-18", "",
             f"Total checks: {len(results)}  |  PASS: {passed}  |  FAIL: {len(failed)}", ""]
    if failed:
        lines += ["## FAILURES", ""]
        for r in failed:
            lines += [f"- [{r['scope']}] {r['label']}" + (f"  ({r['detail']})" if r["detail"] else "")]
        lines += [""]
    lines += ["## All checks", ""]
    cur = None
    for r in results:
        if r["scope"] != cur:
            cur = r["scope"]
            lines += ["", f"### {cur}", ""]
        lines += [f"- [{'PASS' if r['pass'] else 'FAIL'}] {r['label']}" + (f"  -> {r['detail']}" if r["detail"] else "")]
    with open(os.path.join(args.out, "verification_report.md"), "w", encoding="utf-8") as fh:
        fh.write("\n".join(lines) + "\n")

    print(f"TOTAL {len(results)}  PASS {passed}  FAIL {len(failed)}")
    for r in failed:
        print(f"  FAIL [{r['scope']}] {r['label']}  {r['detail']}")
    print(f"report -> {os.path.join(args.out, 'verification_report.md')}")
    return 1 if failed else 0


if __name__ == "__main__":
    sys.exit(main())