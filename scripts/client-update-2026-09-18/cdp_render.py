#!/usr/bin/env python3
"""
Minimal CDP page renderer: renders a URL in headless Chromium, optionally clicks
a tab/toggle by visible text, and returns the post-interaction DOM.

Used by verify_rendered.py because the Thought Leadership page renders its
Speaking Engagements / Publications lists only inside a tab panel.
"""
import asyncio
import json
import os
import subprocess
import time
import urllib.parse
import urllib.request

try:
    import websockets
except ImportError:  # pragma: no cover
    websockets = None

CHROME = "/home/gonzalo-mena/.cache/ms-playwright/chromium-1234/chrome-linux64/chrome"
PORT = 9333


class Chrome:
    def __init__(self, port=PORT):
        self.port = port
        self.proc = None

    def __enter__(self):
        self.proc = subprocess.Popen(
            [CHROME, "--headless=new", "--disable-gpu", "--no-sandbox",
             "--disable-dev-shm-usage", f"--remote-debugging-port={self.port}",
             "--window-size=1440,1000", "about:blank"],
            stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
        deadline = time.time() + 30
        while time.time() < deadline:
            try:
                urllib.request.urlopen(f"http://127.0.0.1:{self.port}/json/version", timeout=2).read()
                return self
            except Exception:
                time.sleep(0.4)
        raise RuntimeError("chrome did not expose the debugging port")

    def __exit__(self, *exc):
        if self.proc:
            self.proc.terminate()
            try:
                self.proc.wait(timeout=10)
            except subprocess.TimeoutExpired:
                self.proc.kill()


async def _evaluate(ws_url, js, wait_after=0.0):
    async with websockets.connect(ws_url, max_size=64 * 1024 * 1024) as ws:
        mid = 0

        async def call(method, params=None):
            nonlocal mid
            mid += 1
            await ws.send(json.dumps({"id": mid, "method": method, "params": params or {}}))
            while True:
                msg = json.loads(await ws.recv())
                if msg.get("id") == mid:
                    return msg

        await call("Runtime.enable")
        if wait_after:
            await asyncio.sleep(wait_after)
        res = await call("Runtime.evaluate",
                         {"expression": js, "returnByValue": True, "awaitPromise": True})
        return res.get("result", {}).get("result", {}).get("value")


def render(url, click=None, settle=2.5, timeout=45):
    """Return the DOM outerHTML of `url`, after clicking the control whose visible
    text contains `click` (case-insensitive), if given."""
    with Chrome() as _:
        newtab_url = f"http://127.0.0.1:{PORT}/json/new?{urllib.parse.quote(url, safe='')}"
        # Chrome >= 111 requires PUT for /json/new
        req = urllib.request.Request(newtab_url, method="PUT")
        target = json.loads(urllib.request.urlopen(req, timeout=15).read())
        ws_url = target["webSocketDebuggerUrl"]
        script = f"""
        (async () => {{
          await new Promise(r => {{
            if (document.readyState === 'complete') return r();
            window.addEventListener('load', r, {{once: true}});
            setTimeout(r, 8000);
          }});
          await new Promise(r => setTimeout(r, {int(settle*1000)}));
          const needle = {json.dumps((click or '').lower())};
          let clicked = null;
          if (needle) {{
            const els = [...document.querySelectorAll('button,[role=tab],a')];
            const hit = els.find(e => e.textContent.trim().toLowerCase().includes(needle));
            if (hit) {{ hit.click(); clicked = hit.textContent.trim(); }}
            await new Promise(r => setTimeout(r, 1200));
          }}
          return JSON.stringify({{clicked, html: document.documentElement.outerHTML}});
        }})()
        """
        raw = None
        loop = asyncio.new_event_loop()
        try:
            raw = loop.run_until_complete(_evaluate(ws_url, script))
        finally:
            loop.close()
        try:
            urllib.request.urlopen(f"http://127.0.0.1:{PORT}/json/close/{target['id']}", timeout=5).read()
        except Exception:
            pass
        data = json.loads(raw)
        return data["html"], data["clicked"]
