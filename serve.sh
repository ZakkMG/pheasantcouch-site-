#!/usr/bin/env bash
# ---------------------------------------------------------------
#  Pheasant Couch site - preview server for Mac and Linux.
#  Run:  ./serve.sh        (first time only: chmod +x serve.sh)
#  The site opens at http://localhost:8080. Ctrl+C to stop.
# ---------------------------------------------------------------
cd "$(dirname "$0")" || exit 1
if command -v python3 >/dev/null 2>&1; then
  exec python3 serve.py "$@"
fi
echo
echo "  Python 3 isn't installed. Get it from https://www.python.org/downloads/"
echo "  or just open site/index.html in your browser."
echo
exit 1
