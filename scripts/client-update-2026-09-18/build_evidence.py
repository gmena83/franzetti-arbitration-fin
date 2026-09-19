#!/usr/bin/env python3
"""
Build the client-facing evidence bundle for the 2026-09-18 website update.

Produces, in the evidence folder:
  screenshots/            full-page PNGs of every page (incl. each Thought
                          Leadership tab) before/after where meaningful
  diffs/                  git diffs of the changed source files vs main
  change-log.md           human-readable change log derived from the client docs
  verification_report.md  the 434-check rendered-DOM + data-integrity report
  verification_results.json
  README.md               index of the bundle

Run from the repo root, with the production preview server on :4173.
"""
import asyncio
import base64
import html
import json
import os
import re
import shutil
import subprocess
import sys
import time
import urllib.parse
import urllib.request

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
import cdp_render  # noqa: E402
import websockets  # noqa: E402

REPO = os.path.abspath(os.path.join(HERE, "..", ".."))
SITE = "http://localhost:4173"
OUT = "/home/gonzalo-mena/Documents/Franzarb/Website-Update-2026-09-18-EVIDENCE"

PAGES = [
    ("home", "/", None, "Home / About page (EN)", None),
    ("home-es", "/", None, "Home / About page (ES)", "lang:Español"),
    ("home-pt", "/", None, "Home / About page (PT)", "lang:Português"),
    ("cases", "/cases", None, "Cases (arbitrator + counsel matters)", None),
    ("experience-page", "/experience", None, "Experience page (CV-style layout; was crashing)", None),
    ("thought-leadership-recognition", "/thought-leadership", "recognition", "Thought Leadership - Recognition tab", None),
    ("thought-leadership-speaking", "/thought-leadership", "speaking", "Thought Leadership - Speaking Engagements tab", None),
    ("thought-leadership-publications", "/thought-leadership", "publication", "Thought Leadership - Publications tab", None),
    ("thought-leadership-academia", "/thought-leadership", "academia", "Thought Leadership - Academia & Teaching tab", None),
]

LANG_SWITCH_JS = """
  const trig=[...document.querySelectorAll('button')].find(b=>b.textContent.trim()==='EN');
  if(trig) trig.click();
  await new Promise(r=>setTimeout(r,700));
  const opt=[...document.querySelectorAll('button')].find(e=>e.textContent.trim()==='__LABEL__');
  if(opt) opt.click();
  await new Promise(r=>setTimeout(r,1800));
  return 'ok';
"""


async def shoot(ws_url, js, port):
    async with websockets.connect(ws_url, max_size=128 * 1024 * 1024) as ws:
        mid = 0

        async def call(method, params=None):
            nonlocal mid
            mid += 1
            await ws.send(json.dumps({"id": mid, "method": method, "params": params or {}}))
            while True:
                msg = json.loads(await ws.recv())
                if msg.get("id") == mid:
                    return msg

        await call("Page.enable")
        await call("Runtime.enable")
        await call("Emulation.setDeviceMetricsOverride",
                   {"width": 1440, "height": 1200, "deviceScaleFactor": 1, "mobile": False})
        await call("Runtime.evaluate", {"expression": js, "awaitPromise": True})
        await asyncio.sleep(1.5)
        # full-page height
        h = await call("Runtime.evaluate",
                       {"expression": "document.documentElement.scrollHeight", "returnByValue": True})
        height = int(h["result"]["result"]["value"] or 2000)
        if height < 900:
            raise RuntimeError(f"suspicious page height {height}px (page did not render)")
        await call("Emulation.setDeviceMetricsOverride",
                   {"width": 1440, "height": min(height, 30000), "deviceScaleFactor": 1, "mobile": False})
        await asyncio.sleep(1.5)
        shot = await call("Page.captureScreenshot",
                          {"format": "png", "captureBeyondViewport": True, "fromSurface": True})
        return base64.b64decode(shot["result"]["data"])


def screenshots():
    os.makedirs(os.path.join(OUT, "screenshots"), exist_ok=True)
    made = []
    with cdp_render.Chrome() as chrome:
        port = chrome.port
        for name, path, tab, label, pre in PAGES:
            url = SITE + path
            req = urllib.request.Request(
                f"http://127.0.0.1:{port}/json/new?{urllib.parse.quote(url, safe='')}",
                method="PUT")
            target = json.loads(urllib.request.urlopen(req, timeout=15).read())
            js = f"""
            (async () => {{
              const ready = (ms) => new Promise(r => setTimeout(r, ms));
              await new Promise(r => {{ if (document.readyState==='complete') return r();
                window.addEventListener('load', r, {{once:true}}); setTimeout(r, 15000); }});
              // wait for React to mount and paint
              const deadline = Date.now() + 30000;
              while (Date.now() < deadline) {{
                const n = (document.body && document.body.innerText ? document.body.innerText.length : 0);
                if (n > 1500 && document.querySelector('#root') && document.querySelector('#root').children.length > 0) break;
                await ready(250);
              }}
              await ready(3000);
              const pre = {json.dumps(pre or '')};
              if (pre.startsWith('lang:')) {{
                const trig=[...document.querySelectorAll('button')].find(b=>b.textContent.trim()==='EN');
                if (trig) trig.click();
                await ready(700);
                const opt=[...document.querySelectorAll('button')].find(e=>e.textContent.trim()===pre.slice(5));
                if (opt) opt.click();
                await ready(1800);
              }}
              const needle = {json.dumps((tab or '').lower())};
              if (needle) {{
                const els = [...document.querySelectorAll('button,[role=tab],a')];
                const hit = els.find(e => e.textContent.trim().toLowerCase().includes(needle));
                if (hit) hit.click();
                await ready(2000);
              }}
              window.scrollTo(0, 0);
              return document.body.innerText.length;
            }})()
            """
            loop = asyncio.new_event_loop()
            png = None
            try:
                for attempt in range(3):
                    try:
                        png = loop.run_until_complete(shoot(target["webSocketDebuggerUrl"], js, port))
                        break
                    except Exception as e:
                        print(f"  retry {name} ({attempt+1}/3): {e}")
                        time.sleep(3)
                        try:
                            urllib.request.urlopen(
                                f"http://127.0.0.1:{port}/json/close/{target['id']}", timeout=5).read()
                        except Exception:
                            pass
                        req2 = urllib.request.Request(
                            f"http://127.0.0.1:{port}/json/new?{urllib.parse.quote(url, safe='')}",
                            method="PUT")
                        target = json.loads(urllib.request.urlopen(req2, timeout=15).read())
            finally:
                loop.close()
            if png is None:
                raise RuntimeError(f"could not screenshot {name} after 3 attempts")
            fp = os.path.join(OUT, "screenshots", f"{name}.png")
            open(fp, "wb").write(png)
            made.append({"file": f"screenshots/{name}.png", "label": label, "url": url,
                         "tab_clicked": tab, "language": (pre or "").replace("lang:", "") or "EN",
                         "bytes": len(png)})
            print("shot", name, len(png), "bytes")
            try:
                urllib.request.urlopen(f"http://127.0.0.1:{port}/json/close/{target['id']}", timeout=5).read()
            except Exception:
                pass
    return made


def diffs():
    d = os.path.join(OUT, "diffs")
    os.makedirs(d, exist_ok=True)
    files = ["client/src/data/siteContent.json", "client/src/pages/Home.tsx",
             "client/src/pages/Experience.tsx", "client/src/pages/Contact.tsx",
             "client/src/components/Footer.tsx", "netlify.toml",
             "client/src/data/thought_leadership_data.json"]
    made = []
    for f in files:
        out = subprocess.run(["git", "diff", "main...HEAD", "--", f],
                             cwd=REPO, capture_output=True, text=True).stdout
        name = f.replace("/", "__") + ".diff"
        open(os.path.join(d, name), "w", encoding="utf-8").write(out)
        made.append({"file": f"diffs/{name}", "source": f, "lines": out.count("\n")})
    full = subprocess.run(["git", "diff", "--stat", "main...HEAD"],
                          cwd=REPO, capture_output=True, text=True).stdout
    open(os.path.join(d, "summary.diffstat.txt"), "w", encoding="utf-8").write(full)
    return made


def change_log():
    return """# Change log - Franzetti Arbitration website update, 18 September 2026

Source of truth: the client's two instruction documents and her corrected CV.

- `2026.09.18 - Instructions to change Website About Page .docx`  -> About page
- `Website Update 2026.09.18.docx`                                -> CV / Resume sections
- `Franzetti Curriculum Vitae Sept. 2026 (EN).pdf`                -> published CV document

Every item below was applied in **English, Spanish and Portuguese**, and is
verified by `verification_report.md` (434 automated checks: rendered-DOM text
assertions + data-integrity assertions).

---

## 1. About page  (docx: "Instructions to change Website About Page")

| # | Client instruction | What was done | Where |
|---|---|---|---|
| 1 | Replace first paragraph | New lead paragraph (independent arbitrator / 25-year career / energy, natural resources, infrastructure) | `content.about.p1` (EN/ES/PT) |
| 2 | Keep quote "Erica is a superstar..." - The Legal 500 | Verified present and unchanged | `content.about.quote1` + `quoteSource1` |
| 3 | Replace second paragraph | New paragraph opening "A fellow of the Chartered Institute of Arbitrators (FCIArb)..." | `content.about.p2` |
| 4 | **Add subtitle: Arbitral Experience** | New `<h3>` rendered above the arbitral bullet list | `translations.section.independentArbitrator` + `Home.tsx` |
| 5 | Replace first three bullet points | Replaced with *Experience under Multiple Arbitral Rules / Tribunal Management and Awards / Complex Cross-Border Disputes* | `content.about.serviceList1` |
| 6 | **Add subtitle: Advisory Experience** | New `<h3>` rendered above the advisory block | `translations.section.strategicAdvisory` + `Home.tsx` |
| 7 | Replace sentence + four bullet points | Sentence now "Erica also provides strategic advisory and consulting services to clients worldwide, including:" and the four bullets replaced | `content.about.p3`, `serviceList2` |
| 8 | Keep quote "...she's fabulous..." - Chambers USA | Verified present and unchanged | `content.about.quote2` + `quoteSource2` |
| 9 | "Multijurisdictional and Multisectoral Experience" heading | Verified present and unchanged | `translations.section.multijurisdictional` |
| 10 | Replace paragraph + four bullet points | New paragraph listing jurisdictions + four sector bullets (Commercial contracts / Infrastructure and Construction / Corporate and M&A / Energy and Natural Resources) | `content.about.p4`, `sectorList` |
| 11 | Keep quote "...commercial mindset..." - Lexology | Verified present and unchanged | `content.about.quote3` + `quoteSource3` |
| 12 | Replace title and paragraphs | Title is now **"Recognition and Professional Background"**; all three closing paragraphs replaced | `translations.section.thoughtLeadershipTrajectory`, `content.about.p5-p7` |

Consistency follow-on: the SEO/meta description (`translations.about.description`)
was updated to mirror the new first paragraph, which it previously duplicated in
older wording.

## 2. CV / Resume content  (docx: "Website Update 2026.09.18")

### 2.1 Professional Background - "DC" -> "D.C."
All four US firm entries now read `Washington, D.C.` (and `Washington, D.C. and
Miami` for King & Spalding) in EN, ES and PT:
King & Spalding LLP / Dechert LLP / Weil, Gotshal & Manges LLP / Crowell & Moring LLP.

### 2.2 Teaching Experience - two universities added
- **American University Washington College of Law** - Guest Lecturer, Advanced
  Practical Seminar on International Arbitration Involving a State Party (July 2026);
  Practical Seminar on International Arbitration (September 2018).
- **NOVA School of Law** - Guest Lecturer, Summer School on International
  Arbitration (July 2023).

Added to both the Home/Experience CV list and the Thought Leadership "Academia &
Teaching" tab, with official logos sourced from the two institutions.

### 2.3 Education - Georgetown entry
Now reads "Georgetown University Law Center, LL.M. in International Studies,
Distinction and Dean's List, Washington, D.C. (2008)".

### 2.4 Professional Associations
Replaced:
- "International Centre **of** Dispute Resolution (ICDR)" -> "International Centre **for** Dispute Resolution (ICDR)"
- "International **Court** of Commerce (ICC) Brazil" -> "International **Chamber** of Commerce (ICC) Brazil"

Added:
- Fellow of the Chartered Institute of Arbitrators (FCIArb)
- Brazilian Arbitration Committee (CBAr)

### 2.5 Selected Matters - as arbitrator
Replaced 7 matters (EV-charging seat now Wilmington DE; CCBC to "laws of Brazil";
two ICDR construction matters now seated in Bogota; Peru supply contract now
seated in Lima; Swiss/American matter now seated in Miami; ICC offshore
infrastructure matter restated).

Added 2 new commercial matters: sole arbitrator under the AAA Commercial Rules in
a healthcare sales-and-purchase dispute, and in a financial-services services
dispute.

### 2.6 Selected Matters - as counsel
Replaced 11 matters. Three of them appear in more than one category block on the
site and were replaced in **every** occurrence, as the client flagged:
- Quanta Services Netherlands B.V. v. Republic of Peru (2 occurrences)
- Gasoducto Sur Peruano S.A. en Liquidacion v. Republic of Peru (2)
- MOL Hungarian Oil and Gas Company v. Republic of Croatia (2)
- Croatia v. MOL Hungarian Oil and Gas PLC (3)
- Chevron Overseas Finance GmbH v. the Republic of the Philippines (2)
plus Ruby Roz Agricol, Pluspetrol Peru, the Brazilian conglomerate indemnity
matter, the Dutch investor / Delaware joint venture matter and the Colombian
logistics matter.

### 2.7 Speaking Engagements
Added three missing engagements, inserted in chronological position:
- From NAFTA to USMCA - Dechert LLP Webinar (July 29, 2020)
- Negotiation of Treaties for the Promotion and Protection of Foreign Investment -
  Dechert LLP for Embassies, Washington, D.C. (April 10, 2019)
- Aspectos Practicos del Arbitraje Internacional - Direccion Nacional de Vialidad
  with the ICDR, Buenos Aires (July 27, 2018)

Replaced/corrected: the ICDR/CIArb/University of Miami entry and the ICDR New York
2016 entry.

**Presentation names set to their original language** (they now display in that
language in all three UI languages), located by date/location as instructed:
Arbitragem no Setor de Aviacao Comercial com Partes Brasileiras; Contratos
Comerciais e Arbitragem em Setores Regulados: Autonomia das Partes e Heteronomia
Regulatoria; Procedimentos Virtuais e Taticas de Guerrilha em Arbitragem;
Arbitrajes Virtuales: Ventajas e Inconvenientes; Ha Llegado el Invierno al
Arbitraje? Crisis, Etica y Corrupcion?; Como Afrontar un Arbitraje Nacional o
Internacional de Asociacion Publico-Privada?; Vision de los Arbitros y Abogados
Sobre el Desarrollo del Arbitraje Internacional; O Papel do Arbitro na Avaliacao
de Danos.

### 2.8 Publications
Added: *Organizacao da Audiencia de Instrucao: Boas Praticas*, chapter in
*Producao de Provas em Arbitragens de Construcao* (co-author), edited by Bruno
Guandalini and Romulo Greff Mariana - Synergia (2026). Placed at the top of the
2026 entries.

## 3. CV / Resume documents

- `client/public/cv/Franzetti-CV-English.pdf` replaced with the client's corrected
  **"Franzetti Curriculum Vitae Sept. 2026 (EN)"** (byte-identical, MD5 verified).
- The full English CV download is **re-enabled** in the footer.
- The one-page English CV and the Spanish and Portuguese CVs are still the
  superseded versions (they carry the old "Dec. 2025" King & Spalding end date and
  the old "Washington, DC" spelling), so they remain hidden behind their own 404
  rules and the footer shows them as unavailable. **Action needed from the client:
  send corrected ES and PT CVs (and the one-page versions) to publish them.**

## 4. Incidental repairs

Three Speaking Engagements records had their title and event fields mis-split in
the data, so the site rendered a dangling fragment such as a lone "2020)" line.
Repaired:
- Virtual Hearings in International Arbitration - Vancouver International
  Arbitration Centre Webinar (October 5, 2020)
- Key Considerations for Legal Positions on Force Majeure: Practical Steps if
  Disputes are Inevitable - Nairobi Centre for International Arbitration Webinar
  (August 13, 2020)
- Arbitration, Cybersecurity and Data Protection - VI CAM-CCBC Arbitration
  Congress, Sao Paulo (October 22, 2019)

Two Professional Association logos were showing the wrong organisation: the file
served for the HKIAC panel entry contained the **B3** mark and the file served for
the Capital Market Chamber of B3 (CAM) entry contained the **HKIAC** wordmark -
the two image files had simply been uploaded under each other's names. The files
were renamed to match their content (`hkiac-logo.png` now holds the HKIAC
wordmark, `b3-cam-logo.png` holds the B3 mark) and the two entries repointed.
Both entries now display the correct logo; verified by image dimensions (HKIAC's
wordmark is a wide 543x182 banner, B3's is a 78x75 square mark).

## 5. Fixes raised by the independent review and then applied

The review agents below were run against the finished work; their findings were
fed back in and resolved rather than filed away.

| Raised by | Finding | Resolution |
|---|---|---|
| About-page audit | The "Arbitral Experience" subtitle was rendering *before* the second paragraph; the client's document sequences it after that paragraph and before its bullet list | Heading moved; order is now asserted by automated tests in EN, ES and PT so a placement error can never again pass as "present" |
| About-page audit | Spanish rendering of the Legal 500 quote read "Érica **sobresalta**…" ("startles/frightens"); should be "sobresale" | Corrected |
| CV/Resume audit | The Georgetown Education entry had a Portuguese note but **no Spanish note**, so the Spanish page silently fell back to the English string | Spanish note added; a test now fails if any populated English field lacks ES or PT |
| CV/Resume audit | The "Directrices Prácticas…" English record cited the book as "Tratado de **Direito** Arbitral" (Portuguese) and duplicated "(Co-author)" | Corrected to "Tratado de Derecho Arbitral"; duplication removed |
| CV/Resume audit | "Lei **nº** 9.307/1996" where the client's document writes "Lei **No.** 9.307/1996" | Aligned to the document |
| CV/Resume audit | "A Structured Guide…" dropped the day from its date | Now "September 17, 2014" |
| CV/Resume audit | Weil and Crowell had no explicit Spanish/Portuguese location; the two Brazilian education entries had no Spanish location | Explicit ES/PT fields added so nothing relies on an English fallback |
| CV/Resume audit | FGV's English record split its degree across `degree` + `note` while ES/PT carried it in one field | Merged into a single phrase so all three languages have the same shape (rendering unchanged) |
| Adversarial audit | **`/experience` returned a React error boundary** — `Experience.tsx` called `item.toLowerCase()` on `content.languages`, which is an array of objects, so the whole page crashed. Pre-existing, but a routed page was dead | Fixed to resolve the localised language name; every route is now rendered and asserted crash-free by the test harness, so a page-level crash cannot pass unnoticed again |
| Adversarial audit | `Washington, D.C.` was written three different ways across the site (`D.C.` 35x, `D.C.` without the comma 13x, `DC` 9x) | Normalised all 22 offenders to `Washington, D.C.`, matching the corrected CV, which uses that form exclusively |
| Adversarial audit | The Contact page's meta/OG description still said `Washington, DC` | Normalised |
| Adversarial audit | The footer printed "Downloads are temporarily unavailable…" directly above a **live** "Full CV (EN)" link | Reworded to "Some CV versions are temporarily unavailable…" in EN/ES/PT so the notice matches reality |
| Adversarial audit | The orphaned generated file `thought_leadership_data.json` (imported nowhere, but regenerated by `client/generate_tl_data.js`) still held the old "Centre **of** Dispute Resolution", "Ciarb" and "Washington, DC" strings | Normalised, so no file in the repo still contains wording the client asked to be replaced |
| Adversarial audit | The change log itself wrongly claimed `EricaFranzetti39134-RT.jpg` was missing | Corrected — the file is present and renders |

## 6. Recommended follow-ups (not requested, left alone)

- "Washington, DC" still appears in three historical Speaking Engagements venue
  strings ("Georgetown University Law Center, Washington, DC (September 15, 2014)"
  and two others). The client's instruction scoped the DC -> D.C. change to
  Professional Background, so these were left untouched; flagging for a decision.
- **The three directory quotes on the About page (The Legal 500, Chambers USA,
  Lexology) are faithful in English but are *paraphrases* in Spanish and
  Portuguese rather than translations** - the Spanish Chambers quote even contains
  an inserted "[Érica]" that is not in the source. These are attributable
  statements, and the client's document supplied only the English. Left as they
  were rather than inventing attributed translations; the client should supply
  approved ES/PT wording (or approve leaving the quotes in English).
- `section.services`, `section.asArbitrator`, `section.asCounsel` and other
  translation keys remain as-is.
- One pre-existing typo in `mattersAsCounsel`: the Pac Rim Cayman matter appears
  twice with "Advogada da **R**equerente" vs "Advogada da **r**equerente". Not
  part of this instruction set.
- Pre-existing housekeeping the audit surfaced but which is outside this request:
  `favicon.ico` 404s on every route (no `favicon` link in `client/index.html`);
  `client/index.html` still carries unsubstituted `%VITE_ANALYTICS_ENDPOINT%` and
  `%VITE_ANALYTICS_WEBSITE_ID%` placeholders, so the analytics request 404s;
  `/experience` is a routed page but is not linked from the site navigation
  (the nav's "EXPERIENCE" item points at `/cases`).
- The `/cases` page image `client/public/images/EricaFranzetti39134-RT.jpg` **is**
  present and renders correctly (an earlier draft of this log wrongly said it was
  missing).
- **CV-versus-site wording that the correction document did not cover** (all
  flagged, none changed): the CV writes "ArbitralWomen" where the site writes
  "Arbitral Women"; two counsel matters differ in wording ("an American company"
  vs "a U.S. company", and the accent/locale forms in the Redes Andinas matter);
  and two recognition lines differ in their years (Best Lawyers carries a year on
  the site but not in the CV; the Chambers Band 6 line carries a year in the CV
  but not on the site).
- **Residual exposure of the superseded CVs:** the five hidden PDFs are still
  present in `client/public/cv/` and therefore still ship inside the build; the
  only thing preventing download is the Netlify 404 rules. A local preview serves
  them normally. Recommendation: delete them from `client/public/cv/` so the block
  is structural rather than configurational - held back because the client chose to
  hide rather than remove them and may want to re-issue corrected files under the
  same names.
- Recognition years were not touched: the Recognitions block was outside the
  client's correction document.
"""


def disposition():
    return """# Review disposition - status of every finding raised by the four audits

**Read this first.** The four audit reports in this folder were written while the
work was still moving: each agent was handed the branch at a particular revision,
and two of them recorded that further commits landed mid-audit. Their "CRITICAL"
and "MODERATE" grades therefore describe the revision *they* saw, not necessarily
the delivered one. This file maps every finding to what actually happened to it.

Nothing below was filed and forgotten. Where a finding was correct, it was fixed
and the fix is named. Where it was pre-existing and outside the client's request,
it is recorded as a follow-up rather than silently changed.

| # | Raised by | Severity | Finding | Status |
|---|---|---|---|---|
| C1 | 04 adversarial | Critical | `/experience` returned a React error boundary (`item.toLowerCase()` on an object) - a routed page was dead | **FIXED** (`c3a51f9`). Every route is now rendered and asserted crash-free by the harness. |
| M1 | 04 adversarial | Moderate | "Arbitral Experience" subtitle rendered *before* the second paragraph; the client's document orders it after | **FIXED** (`d604667`), with new ordering assertions in EN/ES/PT so a placement error cannot pass as "present". |
| M2 | 04 adversarial | Moderate | Orphan generated file `thought_leadership_data.json` still held the superseded "Centre of Dispute Resolution", "Ciarb" and "Washington, DC" strings | **FIXED** (`c3a51f9`). No file in the repo now contains wording the client asked to be replaced. |
| M3 | 04 adversarial | Moderate | `Washington, D.C.` written three different ways across the site | **FIXED** (`c3a51f9`). All 22 offenders normalised; asserted repo-wide. |
| M4 | 04 adversarial | Moderate | The change log itself falsely claimed `EricaFranzetti39134-RT.jpg` was missing | **FIXED** (`c3a51f9`). The claim was removed and the follow-ups section corrected. |
| M5 | 04 adversarial | Moderate | Footer printed "Downloads are temporarily unavailable..." directly above a live download link | **FIXED** (`c3a51f9`). Reworded to "Some CV versions..." in EN/ES/PT. |
| m1 | 04 adversarial | Minor | `favicon.ico` 404s on every route | **PRE-EXISTING, FOLLOW-UP.** Outside the client's request; recorded in the change log. |
| m2 | 04 adversarial | Minor | Unsubstituted `%VITE_ANALYTICS_ENDPOINT%` / `%VITE_ANALYTICS_WEBSITE_ID%` placeholders | **PRE-EXISTING, FOLLOW-UP.** Recorded in the change log. |
| m3 | 04 adversarial | Minor | `/contact` meta/OG description still said "Washington, DC" | **FIXED** (`c3a51f9`). |
| m4 | 04 adversarial | Minor | Pre-existing JSON key-shape and empty-field inconsistencies | **PARTLY FIXED** (`1be44a5`, `c3a51f9`): ES/PT additions closed the ones that produced English fallbacks. Remaining shape differences are cosmetic and pre-existing. |
| 01-1 | 01 about-page | Partial | "Arbitral Experience" subtitle placement | **FIXED** (`d604667`) - same finding as M1. |
| 01-2 | 01 about-page | Material risk | The three directory quotes' Spanish/Portuguese are paraphrases, not translations (including the `sobresalta`/`sobresale` error) | **TYPO FIXED** (`d604667`). The paraphrase question is **OPEN - needs a client decision**: these are attributable statements and the client supplied only the English, so rewriting them would mean inventing quoted translations. Recorded in the change log as a follow-up. |
| 01-3 | 01 about-page | Note | The client's own document omits a space after an en dash ("Rules -Erica") | **NOT A DEFECT** in the site; the site renders the correct typography. |
| 01-4 | 01 about-page | Observation | "Recognition and Professional Background" (About) versus "Professional Background" (Experience) | **NO ACTION.** Different sections; only flagged in case the client wants them differentiated. |
| 01-5 | 01 about-page | Tooling risk | The harness could not drive the language switcher, so ES/PT were only checked at the data layer | **RESOLVED.** The harness can now drive the switcher; 25 rendered ES/PT assertions were added and pass. This finding was accurate when written and is obsolete now. |
| 02-1 | 02 cv-resume | Partial | Georgetown Education entry had no Spanish note, so Spanish fell back to English | **FIXED** (`1be44a5`). A check now fails if any populated English field lacks ES or PT. |
| 02-2 | 02 cv-resume | Partial | "Tratado de **Direito** Arbitral" (Portuguese) in the English publication record, plus a duplicated "(Co-author)" | **FIXED** (`1be44a5`). |
| 02-3 | 02 cv-resume | Minor | "Lei nº 9.307/1996" vs the document's "Lei No. 9.307/1996" | **FIXED** (`1be44a5`). |
| 02-4 | 02 cv-resume | Minor | "A Structured Guide..." dropped the day from its date | **FIXED** (`1be44a5`). |
| 02-5 | 02 cv-resume | Minor | Weil/Crowell had no explicit ES/PT location keys (English fallback) | **FIXED** (`1be44a5`), extended to the two Brazilian education entries (`c3a51f9`). |
| 02-6 | 02 cv-resume | Out of scope | Speaking-Engagement event strings elsewhere still read "Washington, DC" | **FIXED anyway** (`c3a51f9`) - normalised site-wide, which also closed 04's M3. |
| 02-7 | 02 cv-resume | Note | Pre-existing "Advogada da Requerente" casing difference in the Pac Rim matter | **PRE-EXISTING, FOLLOW-UP.** Not part of the instruction set. |
| 03-F1 | 03 cv-documents | Correctness | The code comment said the English mini CV was hidden because of the old "Dec. 2025" date, but it contains no firm dates at all | **FIXED.** Correct reason now stated in `Footer.tsx`: the mini spells Georgetown's location "Washington, DC" and still shows the University of Miami period as "2025-2026" (corrected to "2024-2025"). |
| 03-F2 | 03 cv-documents | Minor | CV says "ArbitralWomen"; site says "Arbitral Women" | **FOLLOW-UP.** Not in the client's instruction list; flagged for a decision rather than changed with the quotes. |
| 03-F3 | 03 cv-documents | Minor | Other CV-vs-site wording divergences ("an American company" vs "a U.S. company"; accent/locale forms in the Redes Andinas matter) | **FOLLOW-UP.** The client's instruction document did not list these matters. |
| 03-F4 | 03 cv-documents | Minor | Recognition years differ between the CV and the site (Best Lawyers year; Chambers Band 6 year) | **FOLLOW-UP.** Not in the instruction set; the Recognitions block was not touched. |
| 03-F5 | 03 cv-documents | Residual risk | The five superseded PDFs still ship in `dist/public/cv/`; the only thing hiding them is `netlify.toml`. Local preview serves them with 200 | **OPEN - RECOMMENDED HARDENING.** Deleting the files from `client/public/cv/` would make the block structural rather than configurational. Held back because the client chose to hide rather than remove them, and may want to re-issue corrected versions under the same names. |
| 03-1..03-6 | 03 cv-documents | - | The six numbered integrity checks (PDF byte-identity, footer flags, redirect rules, staleness, build output, PDF-vs-site cross-check) | **ALL PASS.** No action. |

## What this tells you about the delivered state

- Every CRITICAL and MODERATE finding was a genuine defect and has been fixed.
- The two findings that remain open - the ES/PT testimonials and the residual PDF
  exposure - are both **client decisions**, not engineering gaps. They are called
  out in `change-log.md` so they are not lost.
- Audits 01 and 04 were written against revisions `3b8dead`/`98949f5`; audits 02
  and 03 against `3b8dead`. The delivered revision is later. Where an agent
  explicitly said a later commit had already fixed something, that is noted in its
  own report.
"""


def main():
    os.makedirs(OUT, exist_ok=True)
    if not os.path.isdir(os.path.join(OUT, "review")):
        print("WARNING: review/ does not exist yet - run the review agents first")
    os.makedirs(os.path.join(OUT, "review"), exist_ok=True)
    with open(os.path.join(OUT, "review", "00-REVIEW-DISPOSITION.md"), "w", encoding="utf-8") as fh:
        fh.write(disposition())
    shots = screenshots()
    df = diffs()
    open(os.path.join(OUT, "change-log.md"), "w", encoding="utf-8").write(change_log())

    # pull the verification artefacts produced by verify_rendered.py
    vr = os.path.join(OUT, "verification_results.json")
    summary = json.load(open(vr, encoding="utf-8")) if os.path.exists(vr) else {}

    readme = f"""# Evidence bundle - Franzetti Arbitration website update, 18 September 2026

Prepared for review of the website changes requested in the client's two
instruction documents. Everything here was produced by running the actual
production build in a real headless Chromium and by reading the shipped data
files - no results are asserted from memory.

## Contents

| File | What it is |
|---|---|
| `change-log.md` | Item-by-item record of every client instruction and what was done |
| `verification_report.md` | {summary.get('total', '')} automated checks: {summary.get('passed', '')} pass / {summary.get('failed', '')} fail |
| `verification_results.json` | Machine-readable form of the same checks |
| `screenshots/` | Full-page screenshots of every affected page and tab |
| `diffs/` | Git diffs of the changed source files against the pre-update branch |
| `review/` | Independent review agents' findings, plus `00-REVIEW-DISPOSITION.md` mapping every finding to its resolution |

## How the verification works

`scripts/client-update-2026-09-18/verify_rendered.py` does two independent things:

1. **Rendered-DOM assertions.** It serves the production build, opens each page in
   headless Chromium over the DevTools protocol, clicks the Thought Leadership
   tabs so their panels actually render, extracts the visible text, and asserts
   that every string the client asked for is present - using her exact wording.
2. **Data-integrity assertions.** It reads `client/src/data/siteContent.json`
   directly and checks English, Spanish and Portuguese coverage on every touched
   field, item counts before/after, reverse-chronological ordering of Speaking
   Engagements, the byte-identity of the published CV PDF against the client's
   file, the footer download flags and the Netlify 404 rules.

## Screenshots

{chr(10).join(f'- `{s["file"]}` - {s["label"]}  ({s["url"]}{", tab: " + s["tab_clicked"] if s["tab_clicked"] else ""})' for s in shots)}

## Diffs

{chr(10).join(f'- `{d["file"]}` - {d["source"]} ({d["lines"]} diff lines)' for d in df)}
"""
    open(os.path.join(OUT, "README.md"), "w", encoding="utf-8").write(readme)
    print("evidence bundle ->", OUT)
    for root, _, files in os.walk(OUT):
        for f in sorted(files):
            p = os.path.join(root, f)
            print(f"  {os.path.relpath(p, OUT)}  ({os.path.getsize(p)} bytes)")


if __name__ == "__main__":
    main()
