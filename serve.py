#!/usr/bin/env python3
"""
Pheasant Couch site server: preview the site on your PC, or serve it
through a Cloudflare Tunnel (README, "Hosting from your own PC").

    python serve.py              preview at http://localhost:8080 (opens your browser)
    python serve.py --port 9000  use a different port
    python serve.py --lan        also reachable from your phone on the same Wi-Fi
    python serve.py --no-open    don't open a browser (use this for the tunnel)

It behaves like the real host, so what you see here is what visitors get:
  - /privacy serves privacy.html (clean addresses, like Cloudflare Pages)
  - a missing page gets the site's own 404.html
  - folders never list their files
  - nothing is cached, so a refresh always shows your latest edit
Only the files inside the site folder are ever served.
"""
import argparse
import http.server
import os
import sys
import threading
import webbrowser
from urllib.parse import urlsplit, unquote

ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "site")


class Handler(http.server.SimpleHTTPRequestHandler):
    extensions_map = {
        **http.server.SimpleHTTPRequestHandler.extensions_map,
        ".html": "text/html; charset=utf-8",
        ".js": "text/javascript; charset=utf-8",
        ".css": "text/css; charset=utf-8",
        ".txt": "text/plain; charset=utf-8",
        ".xml": "application/xml; charset=utf-8",
        ".webmanifest": "application/manifest+json",
        ".woff2": "font/woff2",
        ".ico": "image/x-icon",
    }

    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=ROOT, **kwargs)

    # -- routing -----------------------------------------------------------
    def _route(self):
        """Rewrite clean addresses to files; return False when the answer is a 404."""
        parts = urlsplit(self.path)
        url_path = unquote(parts.path)
        if any(seg.startswith(".") for seg in url_path.split("/") if seg):
            return False                      # never serve hidden files
        fs_path = self.translate_path(parts.path)
        if os.path.isdir(fs_path):
            if not url_path.endswith("/"):
                return True                   # the base class adds the slash
            return os.path.isfile(os.path.join(fs_path, "index.html"))
        if os.path.isfile(fs_path):
            return True
        if os.path.isfile(fs_path + ".html"):
            self.path = parts.path + ".html" + ("?" + parts.query if parts.query else "")
            return True
        return False

    def do_GET(self):
        if self._route():
            return super().do_GET()
        self._not_found()

    def do_HEAD(self):
        if self._route():
            return super().do_HEAD()
        self._not_found()

    def list_directory(self, path):          # no file listings, ever
        self._not_found()
        return None

    def _not_found(self):
        page = os.path.join(ROOT, "404.html")
        body = b"<h1>404</h1><p>Not found.</p>"
        if os.path.isfile(page):
            with open(page, "rb") as f:
                body = f.read()
        self.send_response(404)
        self.send_header("Content-Type", "text/html; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        if self.command != "HEAD":
            self.wfile.write(body)

    def end_headers(self):
        self.send_header("Cache-Control", "no-cache")
        self.send_header("X-Content-Type-Options", "nosniff")
        super().end_headers()


def main():
    ap = argparse.ArgumentParser(description="Serve the Pheasant Couch site.")
    ap.add_argument("--port", type=int, default=8080)
    ap.add_argument("--lan", action="store_true", help="listen on your local network too")
    ap.add_argument("--no-open", action="store_true", help="don't open a browser")
    args = ap.parse_args()

    if not os.path.isfile(os.path.join(ROOT, "index.html")):
        print("Can't find the site folder next to serve.py (expected " + ROOT + ").")
        return 1

    host = "0.0.0.0" if args.lan else "127.0.0.1"
    try:
        server = http.server.ThreadingHTTPServer((host, args.port), Handler)
    except OSError:
        print(f"\n  Port {args.port} is already in use. Close the other server window,")
        print(f"  or pick another port:  python serve.py --port {args.port + 1}\n")
        return 1

    url = f"http://localhost:{args.port}"
    print(f"\n  Pheasant Couch site running at {url}")
    if args.lan:
        print("  Also open on your Wi-Fi: use this PC's local IP address with the same port.")
    print("  Edit site/content.js, save, refresh the browser.")
    print("  Press Ctrl+C (or close this window) to stop.\n")
    if not args.no_open:
        threading.Timer(0.8, lambda: webbrowser.open(url)).start()
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\n  Stopped.")
    finally:
        server.server_close()
    return 0


if __name__ == "__main__":
    sys.exit(main())
