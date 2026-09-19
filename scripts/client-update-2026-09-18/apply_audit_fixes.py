#!/usr/bin/env python3
"""Apply the small fixes raised by the independent CV/Resume content audit."""
import collections
import json
import os

REPO = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
p = os.path.join(REPO, "client", "src", "data", "siteContent.json")
d = json.load(open(p, encoding="utf-8"), object_pairs_hook=collections.OrderedDict)
c, tl = d["content"], d["content"]["thoughtLeadership"]
log = []

# --- 1. Education: Georgetown had notePT but no noteES -> Spanish fell back to English
for i, e in enumerate(c["education"]):
    if e["institution"] == "Georgetown University Law Center":
        if "noteES" not in e:
            new = collections.OrderedDict()
            for k, v in e.items():
                new[k] = v
                if k == "notePT":
                    new["noteES"] = "Estudios Internacionales, Distinción y Lista del Decano"
            c["education"][i] = new
            log.append("education: added noteES (was silently falling back to English)")

# --- 2/3/4. Publication wording brought in line with the client's document
for pub in tl["publications"]:
    t = pub["title"]["EN"]
    if t.startswith("Directrices Prácticas"):
        pub["publication"]["EN"] = "co-author, Tratado de Derecho Arbitral, Vol. 2, March 2011"
        pub["publication"]["PT"] = "coautora, Tratado de Direito Arbitral, Vol. 2, março de 2011"
        log.append("publication: EN/PT now say 'Tratado de Derecho Arbitral' (was 'Direito'); removed duplicated '(Co-author)'")
    if "Lei de Arbitragem Comentada" in t:
        pub["title"]["EN"] = "Lei de Arbitragem Comentada: Lei No. 9.307/1996"
        pub["title"]["PT"] = "Lei de Arbitragem Comentada: Lei No. 9.307/1996"
        log.append("publication: 'Lei No. 9.307/1996' (matches the client's document)")
    if t.startswith("A Structured Guide to Arbitration Law"):
        pub["publication"]["EN"] = "Lexology Q&A, September 17, 2014, updated March 2019"
        pub["publication"]["ES"] = "Lexology Q&A, 17 de septiembre de 2014, actualizado en marzo de 2019"
        pub["publication"]["PT"] = "Lexology Q&A, 17 de setembro de 2014, atualizado em março de 2019"
        log.append("publication: 'A Structured Guide' now carries the full date (September 17, 2014)")

# --- 5. Professional Background: real ES/PT locations for Weil and Crowell
for i, pb in enumerate(c["professionalBackground"]):
    if pb["title"] in ("Weil, Gotshal & Manges LLP", "Crowell & Moring LLP"):
        if "locationES" not in pb:
            new = collections.OrderedDict()
            for k, v in pb.items():
                new[k] = v
                if k == "roleES":
                    new["locationES"] = "Washington, D.C."
                    new["locationPT"] = "Washington, D.C."
            c["professionalBackground"][i] = new
            log.append(f"professionalBackground: {pb['title']} -> explicit ES/PT location keys")

with open(p, "w", encoding="utf-8") as fh:
    json.dump(d, fh, indent=4, ensure_ascii=False)

for line in log:
    print(" -", line)
print()
print("education[0] keys:", list(c["education"][0].keys()))
for pb in c["professionalBackground"]:
    print(" ", pb["title"], "|", {k: v for k, v in pb.items() if k.startswith("location")})