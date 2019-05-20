import json
from urllib.request import urlopen, Request
from bs4 import BeautifulSoup
import os
from unidecode import unidecode


if os.path.exists('cities.json'):
    os.remove('cities.json')

host_name = 'https://en.wikipedia.org'
url = host_name + '/wiki/List_of_cities_by_international_visitors'
page = urlopen(url)
soup = BeautifulSoup(page, 'html.parser')
table = soup.find('table', attrs={'class': 'wikitable'})


data = {}
data['city'] = []
# i need name of city, country and rank (index)

for i in range(1, len(table.findAll('tr'))):

    wiki_link = host_name + \
        table.findAll('tr')[i].findAll('td')[2].find('a')['href']
    city_name = unidecode(table.findAll('tr')[i].findAll('td')[
                          2].text.strip())

    content = {}
    # content['description'] = []
    content['photos'] = []

    wiki_page = urlopen(wiki_link)
    wiki_soup = BeautifulSoup(wiki_page, 'html.parser')
    wiki_paragraph = wiki_soup.findAll('p')

    headers = {'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) '
               'AppleWebKit/537.11 (KHTML, like Gecko) '
               'Chrome/23.0.1271.64 Safari/537.11',
               'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
               'Accept-Charset': 'ISO-8859-1,utf-8;q=0.7,*;q=0.3',
               'Accept-Encoding': 'none',
               'Accept-Language': 'en-US,en;q=0.8',
               'Connection': 'keep-alive'}

    reg_url = 'https://www.pexels.com/search/' + city_name
    req = Request(url=reg_url, headers=headers)

    # stock photos
    photo_page = urlopen(req)
    photo_soup = BeautifulSoup(photo_page, 'html.parser')
    photo_position = photo_soup.findAll('article')

    j = 0
    while len(content['photos']) < 3:
        if j >= len(photo_position):
            # print(photo_position[j].get('data-photo-modal-download-url'))
            headers = {'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) '
                       'AppleWebKit/537.11 (KHTML, like Gecko) '
                       'Chrome/23.0.1271.64 Safari/537.11',
                       'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                       'Accept-Charset': 'ISO-8859-1,utf-8;q=0.7,*;q=0.3',
                       'Accept-Encoding': 'none',
                       'Accept-Language': 'en-US,en;q=0.8',
                       'Connection': 'keep-alive'}

            reg_url = 'https://www.pexels.com/search/' + 'nature'
            req = Request(url=reg_url, headers=headers)

            # stock photos
            photo_page = urlopen(req)
            photo_soup = BeautifulSoup(photo_page, 'html.parser')
            photo_position = photo_soup.findAll('article')
        if int(photo_position[j].get('data-photo-modal-height')) <= int(photo_position[j].get('data-photo-modal-width')):
            content['photos'].append(
                photo_position[j].get('data-photo-modal-download-url'))
            print("I'll take this photo")
        j += 1

    # <img id="details-enlarged-image" class="js-search-result-thumbnail responsive-img" src="https://as2.ftcdn.net/jpg/00/57/63/17/500_F_57631762_GwCyoX7vMdqbv4rylU9aiSpJMTBSrymy.jpg" alt="The Venetian Hotel, Macao -  The largest casino in the world" itemprop="thumbnail" data-content-id="57631762">

    content['description'] = []

    k = 0
    while len(content['description']) < 3:
        if len(wiki_paragraph[k].text) > 300:
            content['description'].append(wiki_paragraph[k].text)
        k += 1

    wiki_links = wiki_soup.findAll('a', {'class': 'text'})
    l = 0
    href = ''
    while len(href) == 0:
        if ('geohack' in wiki_links[l].get('href')):
            href = wiki_links[l].get('href')
            break
        l += 1

    print(href)
    coord_page = urlopen('https:' + href)
    coord_soup = BeautifulSoup(coord_page, 'html.parser')

    latitude = coord_soup.find('span', {'class': 'latitude'}).text
    longitude = coord_soup.find('span', {'class': 'longitude'}).text

    data['city'].append({
        'name': city_name,
        'country': table.findAll('tr')[i].findAll('td')[3].text.strip(),
        'popularity': str(i),
        'link': wiki_link,
        'content': content,
        'latitude': latitude,
        'longitude': longitude
    })

with open('cities.json', 'w') as outfile:
    json.dump(data, outfile)


# href="https://clkde.tradedoubler.com/click?p=264311&a=3045532&g=24328740&epi=search_macao&url=
# https://stock.adobe.com/images/the-venetian-hotel-macao-the-largest-casino-in-the-world/57631762
# ?as_channel=affiliate&as_campaign=pexels&as_source=arvato"
