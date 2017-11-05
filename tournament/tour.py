from flask import Flask, request, redirect, url_for, render_template, jsonify
import random
import cgi, cgitb
#import pdb; pdb.set_trace()
from octapus import add_country_post, get_posts, get_country_info, update_post


app = Flask(__name__)

ids = None
#@app.route('/', methods=['GET'])
#def main():
  #'''Main page of the forum.'''
  #name = "insert country name"
  #url = "insert country url"
  #chance = "insert country chance to win"
  #ids = "insert country ID"
  #return render_template("index.html", name=name, ids=ids, chance=chance, url=url)




@app.route('/', methods=['POST', 'GET'])
def post():
  #print request.json['rivals']
  print 'ok'
  id_list = []
  name_list = []
  url_list = []
  chance_list = []
  try:
    name = request.form['name']
    url = request.form['url']
    chance = request.form['chance']
    ids = request.form['ids']
    print ids


    for e in get_posts():
      id_list.append(str(e[0]))
      name_list.append(e[1])
      url_list.append(e[2])
      chance_list.append(str(e[3]))

    if str(ids) not in id_list and name not in name_list and url not in url_list:
      add_country_post(ids, name, url, chance)

    if str(ids) in id_list:
      update_post('name', name,'id', ids)
      update_post('url', url,'id', ids)
      update_post('chance', chance,'id', ids)
    elif name in name_list:
      update_post('id', ids,'name', name)
      update_post('url', url,'name', name)
      update_post('chance', chance, 'name', name)

  except:   
    name = "insert country name"
    url = "insert country url"
    chance = "insert country chance to win"
    ids = "insert country ID"
  return render_template("index.html", posts=get_posts(), name=name, ids=ids, chance=chance, url=url)

#@app.route('/<name>', methods=['GET'])
#def post2(name):
  #name = get_country_info(name)[0][1]
  #url = get_country_info(name)[0][2]
  #chance = get_country_info(name)[0][3]
  #ids = get_country_info(name)[0][0]
  #return render_template("index.html", posts=get_posts(), name=name, ids=ids, chance=chance, url=url)

@app.route('/api', methods=['GET'])
def json_convertorGet():
  list = []
  for e in get_posts():
    list.append({"id" : e[0], "name" : e[1], "url" : e[2], "chance" : e[3]})
  return jsonify(list)

@app.route('/api', methods=['POST'])
def json_convertorPost():
  result = {'name' : request.json['champResults']}
  get_posts().append(result)
  for e in get_posts():
    list.append({"id" : e[0], "name" : e[1], "url" : e[2], "chance" : e[3]})
  return jsonify(list)

languages = [{'name' : 'javascript'},{'name' : 'python'}]
@app.route('/test', methods=['GET'])  
def returnAll():
  return jsonify({'languages' : languages})

@app.route('/test', methods=['POST'])
def addOne():
  
  #data = json.loads('name')
  #print data 
  language = {"name" : request.json["name"]} 
  languages.append(language)
  return jsonify({"languages" : languages}) 

if __name__ == '__main__':
  app.run(host='0.0.0.0', port=8000)
