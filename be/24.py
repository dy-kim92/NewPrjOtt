import requests
from bs4 import BeautifulSoup as BS
import csv
import json

import requests
import csv
import json
from bs4 import BeautifulSoup
from pymongo import MongoClient

# mongodb connect
# mongodb_URI = "mongodb://localhost:27017/nemv"
# client = MongoClient(mongodb_URI)

# print(client.list_database_names())
# db 접근
# db = client['nemv']
# Collection 접근
# print(db.list_collection_names())
# collection = db['movies']
# def toJson(dict_data):
#     with open('films_data.json', 'w', encoding='utf-8') as file :
#         json.dump(dict_data, file, ensure_ascii=False, indent='\t')
cnt = 1
movies = []
for i in range(1,5):
    url = "https://m.kinolights.com/title/"
    headers = {"User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36"}
    try: 
        res = requests.get(url + str(i), headers = headers)
        res.raise_for_status() # 문제시 종료
        soup = BeautifulSoup(res.text, "lxml")
        idx = cnt
        title_kr = soup.find("div", attrs = {"class":"movie-title-wrap"}).find("h3").get_text()
        title_en = soup.find("div", attrs = {"class":"movie-title-wrap"}).find("h4").get_text()
        genre = soup.find("div", attrs = {"class":"movie-title-wrap"}).find("span").get_text()
        genre_ = ''
        for i in genre:
            if i == " ":
                break
            else:
                genre_ += i
        release = soup.find("div", attrs = {"class":"movie-title-wrap"}).find("span").next_sibling.get_text()
        tomato = soup.find("span", attrs = {"class":"rotten-wrap"}).get_text(strip=True)
        tomatoes = ''
        for i in tomato:
            if i == "%":
                tomatoes += i
                break
            else:
                tomatoes += i
        img_url = soup.find(
            "div", attrs={"class": "modal-container"}).find("img")["src"]
        # 키노 새로고침 오류로 데이터 문제발생 
        # ott = soup.find_all("li", attrs = {"class":"movie-price-item"})
        # otts = []
        # for item in ott:
        #     k = item.find("span", attrs = {"class":"cell provider-name"}).get_text()
        #     otts.append(k)

        person = soup.find_all("div", attrs = {"class":"person"})
        director = []
        actor = []
        for item in person:
            if item.find("div",attrs={"class":"character"}).get_text() == "감독":
                director.append(item.find("div",attrs={"class":"name"}).get_text())
            else:
                actor.append(item.find("div",attrs={"class":"name"}).get_text())
        synopsis = soup.find("p", attrs={"class":"synopsis"}).get_text(strip=True)
        posts = {"title_kr":title_kr, "title_en":title_en, "genre":genre_,
                                "release":release, "img":img_url, "tomato":tomatoes, "director":director,
                                 "actor":actor, "synopsis":synopsis,
                                 }    
        cnt += 1    
        # collection.insert_one(posts)
        movies.append(posts)
    except requests.exceptions.HTTPError:
        print("예외발생")
        continue
    except AttributeError:
        print("null값")
print(movies)
# toJson(temp_dict)
    
