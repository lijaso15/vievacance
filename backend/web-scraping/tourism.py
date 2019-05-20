# i want coordinates, and a paragraph block of text

# from django.utils.encoding import smart_str, smart_unicode
import json
from urllib.request import urlopen, Request
from bs4 import BeautifulSoup
import os

wiki_page = urlopen('https://en.wikipedia.org/wiki/Bangkok')
wiki_soup = BeautifulSoup(wiki_page, 'html.parser')
wiki_paragraph = wiki_soup.findAll('p')


# print(wiki_links[0].get('href'))

k = 0
content = {}
content['description'] = []
while len(content['description']) < 3:
    if len(wiki_paragraph[k].text) > 300:
        content['description'].append(wiki_paragraph[k].text)
    k += 1

print(content['description'][0])
print(content['description'][1])
print(content['description'][2])
