import requests, json, time
import schedule
from bs4 import BeautifulSoup
from pymongo import MongoClient

# mongodb connect
mongodb_URI = "mongodb://13.125.9.12:27017/nemv"
client = MongoClient(mongodb_URI)

# print(client.list_database_names())
# db 접근
db = client['nemv']
# Collection 접근
collection = db['cines']
# db 비우고 데이터 가져오기
collection.drop()
collection = db['cines']
def article_crawling():
    url = "http://www.cine21.com/news/issue/list"
    headers = {"User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36"}
    res = requests.get(url, headers= headers)
    res.raise_for_status()
    soup = BeautifulSoup(res.text, "lxml")
    news = soup.find_all("span", attrs={"class":"tit"})
    imgs = soup.find_all("span", attrs={"class":"thumb"})
    linkslist = []
    links = soup.select("ul.news li a")
    for link in links:
        if len(linkslist) == 8:
            break
        k = link['href']
        kk = 'http://www.cine21.com' + k
        linkslist.append(kk)
    newslist = []
    imglist = []
    for i in news:
        if len(newslist) == 8:
            break
        tit = i.get_text()
        newslist.append(tit)
    for i in imgs:
        if len(imglist) == 8:
            break
        img = i.find("img")["src"]
        imglist.append(img)
    for i in range(8):
        article = {"title": newslist[i], "img": imglist[i], "link": linkslist[i]}
        collection.insert_one(article)
article_crawling()