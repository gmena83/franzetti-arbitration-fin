#!/usr/bin/env python3
"""Close the remaining ES fallback on the two Brazilian education entries."""
import collections
import json
import os

REPO = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
p = os.path.join(REPO, "client", "src", "data", "siteContent.json")
d = json.load(open(p, encoding="utf-8"), object_pairs_hook=collections.OrderedDict)
c = d["content"]

for i, e in enumerate(c["education"]):
    if "locationES" not in e:
        new = collections.OrderedDict()
        for k, v in e.items():
            new[k] = v
            if k == "location":
                new["locationES"] = "São Paulo, Brasil"
        c["education"][i] = new
        print(f"  {e['institution']}: added locationES")

with open(p, "w", encoding="utf-8") as fh:
    json.dump(d, fh, indent=4, ensure_ascii=False)

for e in c["education"]:
    print(" ", e["institution"], "->", e.get("location"), "|", e.get("locationES"), "|", e.get("locationPT"))