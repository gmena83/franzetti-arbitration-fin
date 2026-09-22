#!/usr/bin/env python3
"""
Follow-ups from the adversarial regression audit.

  M3 - normalise every 'Washington, DC' / 'Washington D.C.' to 'Washington, D.C.'
       so the whole site matches the corrected CV (which uses the form with the
       comma everywhere). The client scoped the original instruction to
       Professional Background; this closes the remaining inconsistency.
  m3 - same string in the Contact page's meta/OG description.
  M5 - the footer notice said downloads were unavailable while a download link was
       live directly above it; reworded so the notice matches reality.
  M2 - the orphaned generated file thought_leadership_data.json still carried the
       old 'Centre of Dispute Resolution', 'Ciarb', and 'Washington, DC' strings.
"""
import collections
import json
import os
import re

REPO = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))


def normalise_wdc(s):
    s = s.replace("Washington D.C.", "Washington, D.C.")   # missing comma
    s = s.replace("Washington, DC", "Washington, D.C.")    # missing second period
    s = s.replace("Washington D.C.", "Washington, D.C.")   # idempotence
    return s


# ---- M3 + m3: the site content ------------------------------------------------
p = os.path.join(REPO, "client", "src", "data", "siteContent.json")
d = json.load(open(p, encoding="utf-8"), object_pairs_hook=collections.OrderedDict)
before = json.dumps(d, ensure_ascii=False)
counts = {"Washington D.C.": 0, "Washington, DC": 0}


def walk(o):
    if isinstance(o, dict):
        return collections.OrderedDict((k, walk(v)) for k, v in o.items())
    if isinstance(o, list):
        return [walk(v) for v in o]
    if isinstance(o, str):
        for bad in counts:
            counts[bad] += o.count(bad)
        return normalise_wdc(o)
    return o


d = walk(d)
with open(p, "w", encoding="utf-8") as fh:
    json.dump(d, fh, indent=4, ensure_ascii=False)
print(f"siteContent.json: normalised {counts['Washington D.C.']} 'Washington D.C.' "
      f"and {counts['Washington, DC']} 'Washington, DC' occurrences")

# ---- M5: footer notice wording -------------------------------------------------
p = os.path.join(REPO, "client", "src", "data", "siteContent.json")
d = json.load(open(p, encoding="utf-8"), object_pairs_hook=collections.OrderedDict)
d["translations"]["footer.cvUnavailable"] = collections.OrderedDict({
    "EN": "Some CV versions are temporarily unavailable while those documents are being updated.",
    "ES": "Algunas versiones del CV no están disponibles temporalmente mientras actualizamos esos documentos.",
    "PT": "Algumas versões do CV estão temporariamente indisponíveis enquanto atualizamos esses documentos.",
})
with open(p, "w", encoding="utf-8") as fh:
    json.dump(d, fh, indent=4, ensure_ascii=False)
print("footer.cvUnavailable: reworded (EN/ES/PT)")

# ---- m3: Contact page meta -----------------------------------------------------
p = os.path.join(REPO, "client", "src", "pages", "Contact.tsx")
s = open(p, encoding="utf-8").read()
n = s.count("Washington, DC")
s = s.replace("Washington, DC", "Washington, D.C.")
open(p, "w", encoding="utf-8").write(s)
print(f"Contact.tsx: {n} occurrence(s) normalised")

# ---- M2: the orphaned generated data file -------------------------------------
p = os.path.join(REPO, "client", "src", "data", "thought_leadership_data.json")
raw = open(p, encoding="utf-8").read()
orig = raw
raw = raw.replace("International Centre of Dispute Resolution", "International Centre for Dispute Resolution")
raw = raw.replace("ICDR/Ciarb/", "ICDR/CIArb/")
raw = re.sub(r"Washington(?:,)? D\.?C\.?", "Washington, D.C.", raw)
if raw != orig:
    open(p, "w", encoding="utf-8").write(raw)
print("thought_leadership_data.json: stale strings normalised")
print("  remaining 'Centre of Dispute':", raw.count("Centre of Dispute"),
      "| 'Ciarb':", raw.count("Ciarb"),
      "| bad Washington forms:", len(re.findall(r"Washington(?:,)? DC|Washington D\.C\.", raw)))