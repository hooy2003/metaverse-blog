import urllib.request
import urllib.error
from bs4 import BeautifulSoup


def searchIGstory():
  quote_page = 'https://rate.bot.com.tw/xrt?Lang=zh-TW'
  page = urllib.request.urlopen(quote_page)
  soup = BeautifulSoup(page, 'html.parser')

  return soup.find('table').find("tbody").find_all("tr")

# print(tr_tag[0].find_all("td")[1].get('data-table'))
print(searchIGstory()[0].find_all("td")[1].get_text())

