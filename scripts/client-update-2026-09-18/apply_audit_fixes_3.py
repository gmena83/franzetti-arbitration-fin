#!/usr/bin/env python3
"""Merge the FGV degree + note into a single phrase so the English, Spanish and
Portuguese records carry the same shape (the note was populated only in English,
which is what left the ES/PT render short of a value)."""
import collections
import json
import os

REPO = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
p = os.path.join(REPO, "client", "src", "data", "siteContent.json")
d = json.load(open(p, encoding="utf-8"), object_pairs_hook=collections.OrderedDict)
c = d["content"]

for i, e in enumerate(c["education"]):
    if e["institution"] == "Getúlio Vargas Foundation":
        degree = e["degree"]
        note = e.get("note", "")
        merged = (degree + " " + note).strip()
        e["degree"] = merged
        e["note"] = ""
        e["noteES"] = ""
        e["notePT"] = ""
        print(f"  FGV degree: {degree!r} + note {note!r} -> {merged!r}")

with open(p, "w", encoding="utf-8") as fh:
    json.dump(d, fh, indent=4, ensure_ascii=False)

for e in c["education"]:
    print(" ", e["institution"], "| degree:", e["degree"], "| note:", repr(e.get("note")))