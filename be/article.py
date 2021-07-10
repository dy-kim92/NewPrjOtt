import requests, json, time
import schedule
from bs4 import BeautifulSoup
from pymongo import MongoClient

# mongodb connect
mongodb_URI = "mongodb://localhost:27017/nemv"
client = MongoClient(mongodb_URI)

# print(client.list_database_names())
# db 접근
db = client['nemv']
# Collection 접근
collection = db['news']
# db 비우고 데이터 가져오기
collection.drop()
collection = db['news']
# collection.remove({})
def article_crawling():
    url = "https://search.naver.com/search.naver?sm=tab_hty.top&where=news&query=OTT&oquery=ott&tqi=hL%2FNHwp0JXossl1pQMsssssstrh-302643&nso=so%3Ar%2Cp%3Aall%2Ca%3Aall&sort=0"
    headers = {"User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36"}
    res = requests.get(url, headers= headers)
    res.raise_for_status()
    soup = BeautifulSoup(res.text, "lxml")
    
    article = {}
    news = soup.find_all("div", attrs={"class":"news_wrap api_ani_send"})
    for i in news:
        media = i.find("a", attrs={"class":"info press"}).get_text()
        media_ = ''
        for j in media:
            if j == "언":
                break
            else:
                media_ += j
        time = i.find("span", attrs={"class":"info"}).get_text()
        title = i.find("div", attrs={"class":"news_area"}).find("a",attrs={"class":"news_tit"}).get_text(strip=True)
        link = i.find("div", attrs={"class":"news_area"}).find("a",attrs={"class":"news_tit"})['href']
        article = {"media":media_, "time":time, "title":title, "link":link }
        collection.insert_one(article)
        # print(article)
# schedule.every(1).minutes.do(article_crawling)
# schedule.every(30).minutes.do(article_crawling) #30분마다 실행
# schedule.every().monday.at("00:10").do(article_crawling) #월요일 00:10분에 실행
# schedule.every().day.at("10:30").do(article_crawling) #매일 10시30분에 
# while True:
#     schedule.run_pending()
#     time.sleep(1) # 1초 대기
article_crawling()