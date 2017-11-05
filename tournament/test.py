from flask import Flask, request, jsonify
app = Flask(__name__)



languages = [{'name' : 'javascript'},{'name' : 'python'}]
@app.route('/test', methods=['GET'])  
def returnAll():
  return jsonify({'languages' : languages})

@app.route('/test', methods=['POST'])
def addOne():
  language = {'name' : request.json['name']} 
  languages.append(language)
  return jsonify({'languages' : languages}) 

if __name__ == '__main__':
  app.run(host='0.0.0.0', port=8000)