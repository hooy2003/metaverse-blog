import json
from flask import Flask, jsonify, request
from flask.views import MethodView
from flask_cors import CORS


app = Flask(__name__)
app.config["JSON_AS_ASCII"] = False
CORS(app)

ig_stories_list = []

@app.route('/', methods=['GET'])
def home():
    return "<h1>Hello NFT!</h1>"

# @app.route('/igstories/0xninja', methods=['GET'])
# def igstories_0xninja():

# @app.route('/igstories/juliawu94', methods=['POST'])
# def createIgstories_juliawu94():
#     content = json.loads(request.data)
#     print(content)
#     global ig_stories_list 
#     ig_stories_list = content
#     return jsonify({'status': True})

# @app.route('/igstories/juliawu94', methods=['GET'])
# def getIgstories_juliawu94():
#     return jsonify({'status': 200, 'data':ig_stories_list})

class IG_stories(MethodView):
    def get(self, username):
        # if username is None:
        #     pass
        # else:
        return jsonify({'status': 200, 'data':ig_stories_list})

    def put(self, username):
        print(request.data)
        content = json.loads(request.data)
        global ig_stories_list

        # 類似js 的 find [data for data in sample_list if data.get('key')==1][0]
        for index,icon in enumerate(ig_stories_list):
          if([icon.get('username')==username][0]):
            print('已有',username,'覆蓋掉', )
            # print('那原本的list是', ig_stories_list)
            ig_stories_list[index] = {'username':username, 'data': content.get('data')}
            return jsonify({'status': 200})
        # 如果不是 已有的資料則新增一筆該使用者的
        print('沒有，新增一筆', username)
        ig_stories_list.append( {'username':username, 'data': content.get('data')} )
        return jsonify({'status': 200})


user_view = IG_stories.as_view('igstories')
app.add_url_rule('/igstories/', defaults={'username': None},
                 view_func=user_view, methods=['GET'])
app.add_url_rule('/igstories/<username>', view_func=user_view,
                 methods=['GET', 'PUT'])


#__name__ == '__main__'是python常用的方法，表示只有直接启动本脚本时候，才用app.run方法
if __name__ == '__main__':
  app.run(debug=True)