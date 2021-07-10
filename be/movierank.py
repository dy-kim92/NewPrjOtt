import requests, json, time
import schedule
from bs4 import BeautifulSoup
from pymongo import MongoClient

# mongodb connect
mongodb_URI = "mongodb://localhost:27017/nemv"
client = MongoClient(mongodb_URI)

# db 접근
db = client['nemv']
# Collection 접근
collection = db['movieranks']
# db 비우고 데이터 가져오기
collection.drop()
collection = db['movieranks']
def movieRank_crawling():
    url = "https://movie.naver.com/movie/running/current.nhn?view=list&tab=normal&order=reserve#"
    headers = {"User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36"}
    res = requests.get(url, headers= headers)
    res.raise_for_status()
    soup = BeautifulSoup(res.text, "lxml")
    rank = soup.find_all("dt", attrs={"class":"tit"})
    title = []
    for i in rank:
        if len(title) == 7:
            break
        tit = i.find('a').get_text()
        title.append(tit)
    image = soup.find_all("div", attrs={"class":"thumb"})
    images = []
    for i in image:
        if (len(images)) == 7:
            break
        img = i.find('img')['src']
        images.append(img)
    rate = soup.find_all("div", attrs={"class":"star_t1 b_star"})
    bookingRate = []
    for i in rate:
        l = ''
        if (len(bookingRate)) == 7:
            break
        k = i.find("span").get_text()
        l += k
        l += '%'
        bookingRate.append(l)
    url = "https://www.rottentomatoes.com/"
    headers = {"User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36"}
    res = requests.get(url, headers= headers)
    res.raise_for_status()
    soup = BeautifulSoup(res.text, "lxml")
    popular = soup.find_all("span", attrs={"class":"dynamic-text-list__item-title clamp clamp-1"})
    popularMovie = []
    for i in popular:
        if len(popularMovie) == 7:
            break
        h = i.get_text()
        popularMovie.append(h)
    for i in range(7):
        movieRank = {"title":title[i],"img":images[i],"bookingrate":bookingRate[i], "popular":popularMovie[i]}
        collection.insert_one(movieRank)
movieRank_crawling()