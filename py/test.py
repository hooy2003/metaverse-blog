# pip 套件管理系統
# eg. numpy


import urllib.request
import urllib.error
from bs4 import BeautifulSoup

quote_page = 'https://rate.bot.com.tw/xrt?Lang=zh-TW'
page = urllib.request.urlopen(quote_page)
soup = BeautifulSoup(page, 'html.parser')

tr_tag = soup.find('table').find("tbody").find_all("tr")


print(tr_tag[0].find_all("td")[1].get('data-table'))
print(tr_tag[0].find_all("td")[1].get_text())


# Target
# 先點一下story https://www.picuki.com/profile/0xninja
# stories_container > no_stories or stories_wrapper
# 動態爬蟲 Selenium
# https://medium.com/marketingdatascience/selenium%E6%95%99%E5%AD%B8-%E4%B8%80-%E5%A6%82%E4%BD%95%E4%BD%BF%E7%94%A8webdriver-send-keys-988816ce9bed


# MySQL 建立資料庫 > pymysql
# 這個暫時不需要


# python Flask 建立 API 
# https://medium.com/datainpoint/flask-web-api-quickstart-3b13d96cccc2
