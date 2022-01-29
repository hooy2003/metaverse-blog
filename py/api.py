import flask
from flask import jsonify
from igstore import searchIGstory


app = flask.Flask(__name__)
app.config["DEBUG"] = True
app.config["JSON_AS_ASCII"] = False

igStore = searchIGstory()

# test data
cunt = {
  'title': igStore[0].find_all("td")[1].get('data-table'),
  'price': igStore[0].find_all("td")[1].get_text()
}
prices = [cunt]
# tpe = {
#     "id": 0,
#     "city_name": "台北",
#     "country_name": "台灣",
#     "is_capital": True,
#     "location": {
#         "longitude": 121.569649,
#         "latitude": 25.036786
#     }
# }
# nyc = {
#     "id": 1,
#     "city_name": "紐約",
#     "country_name": "美國",
#     "is_capital": False,
#     "location": {
#         "longitude": -74.004364,
#         "latitude": 40.710405
#     }
# }
# ldn = {
#     "id": 2,
#     "city_name": "倫敦",
#     "country_name": "英國",
#     "is_capital": True,
#     "location": {
#         "longitude": -0.114089,
#         "latitude": 51.507497
#     }
# }
# cities = [tpe, nyc, ldn]


@app.route('/', methods=['GET'])
def home():
    return "<h1>Hello NFT!</h1>"

@app.route('/prices/all', methods=['GET'])
def prices_all():
    return jsonify(prices)

# @app.route('/cities/all', methods=['GET'])
# def cities_all():
#     return jsonify(cities)


app.run()
# 上雲