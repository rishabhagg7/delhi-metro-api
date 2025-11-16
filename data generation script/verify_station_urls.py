#!/usr/bin/env python3
"""Verify station_wikipedia_urls.json entries.

Checks:
- HTTP status (200)
- Page title presence
- Presence of metro-related keywords (Delphi Metro / DMRC / Rapid Metro / Aqua Line)

Writes results to verification_report.json and prints a short summary.
"""

import json
import time
import requests
from bs4 import BeautifulSoup
from urllib.parse import urlparse

URLS_FILE = 'station_wikipedia_urls.json'
REPORT_FILE = 'verification_report.json'

HEADERS = {'User-Agent': 'Mozilla/5.0 (compatible; VerificationBot/1.0; +https://example.com)'}


def verify_url(url):
    try:
        r = requests.get(url, headers=HEADERS, timeout=15)
    except Exception as e:
        return {'ok': False, 'reason': f'request-error: {type(e).__name__}: {e}'}

    if r.status_code != 200:
        return {'ok': False, 'reason': f'http-{r.status_code}'}

    text = r.text
    soup = BeautifulSoup(r.content, 'html.parser')
    title_tag = soup.find('h1')
    title = title_tag.get_text(strip=True) if title_tag else ''

    lower = text.lower()
    is_metro = False
    # Check common indicators
    if 'delhi metro' in lower or 'dmrc' in lower or 'metro station' in lower:
        is_metro = True
    if 'rapid metro' in lower or 'rapid_metro' in url.lower():
        is_metro = True
    if 'aqua line' in lower or 'noida metro' in lower or 'aqua_line' in url.lower():
        is_metro = True

    return {'ok': True, 'title': title, 'is_metro': is_metro, 'status_code': r.status_code}


def main():
    with open(URLS_FILE, 'r') as f:
        urls = json.load(f)

    report = {}
    total = len(urls)
    found = 0
    missing = 0
    failed = 0

    for i, (sid, url) in enumerate(urls.items(), 1):
        print(f'[{i}/{total}] Verifying: {sid}')
        if not url:
            report[sid] = {'url': None, 'result': {'ok': False, 'reason': 'null'}}
            missing += 1
            continue

        res = verify_url(url)
        report[sid] = {'url': url, 'result': res}

        if res.get('ok') and res.get('is_metro'):
            found += 1
            print(f"   ✅ OK ({res.get('status_code')}) Title: {res.get('title')[:60]!s}")
        elif res.get('ok') and not res.get('is_metro'):
            failed += 1
            print(f"   ⚠️  Page fetched but doesn't look like a metro page. Title: {res.get('title')[:60]!s}")
        else:
            failed += 1
            print(f"   ❌ Fail: {res.get('reason')}")

        # polite delay
        time.sleep(0.25)

    summary = {'total': total, 'found': found, 'missing': missing, 'failed': failed}

    with open(REPORT_FILE, 'w') as f:
        json.dump({'summary': summary, 'details': report}, f, indent=2)

    print('\n=== Verification Summary ===')
    print(f"Total: {total}, OK: {found}, Missing: {missing}, Failed: {failed}")
    print(f'Report saved to: {REPORT_FILE}')


if __name__ == '__main__':
    main()
