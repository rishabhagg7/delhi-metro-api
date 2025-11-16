import requests
from bs4 import BeautifulSoup
import re

url = 'https://en.wikipedia.org/wiki/Rajiv_Chowk_metro_station'
response = requests.get(url)
soup = BeautifulSoup(response.content, 'html.parser')

# Find layout section
for header in soup.find_all(['h2', 'h3']):
    if 'layout' in header.get_text().lower():
        print(f"Found layout header: {header.get_text()}")
        table = header.find_next('table')
        if table:
            rows = table.find_all('tr')
            print(f'Total rows: {len(rows)}\n')
            for idx, row in enumerate(rows):
                cells = row.find_all(['td', 'th'])
                row_text = ' | '.join([c.get_text(strip=True) for c in cells])
                if 'Platform 1' in row_text or 'Southbound' in row_text:
                    print(f'Row {idx} ({len(cells)} cells):')
                    for i, cell in enumerate(cells):
                        cell_text = cell.get_text(strip=True)
                        print(f'  Cell {i}: {cell_text[:100]}')
                        if 'towards' in cell_text.lower():
                            links = cell.find_all('a', href=re.compile(r'/wiki/.*metro_station'))
                            print(f'    Found {len(links)} links: {[l.get_text() for l in links]}')
                    print()
        break
