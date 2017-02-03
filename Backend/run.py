from flask import Flask, request
import json

app = Flask(__name__)

@app.route('/')
def hello():
    return "True", {'Access-Control-Allow-Origin': '*'}

@app.route('/status', methods=['GET']) #server status
def getStatus():
    return "ON"

@app.route('/addClient', methods=['Post']) # add client
def addClient():
    name=request.form['name']
    add = True
    with open('clients.json') as json_data:
        d = json.load(json_data)
        print(d)
        for i in range(len(d)):
            if name == d[i]['name']:
                add = False
        if add == True:
            a = d
            a.append({'name': name})
            with open('clients.json', 'w') as json_file:
                json.dump(a, json_file)
            print(a)
    return "OK"

@app.route('/getClients', methods=['GET'])
def getClients():
    with open('clients.json') as json_data:
        d = json.load(json_data)
        print(d)
        data = json.dumps(d, skipkeys=True) 
        return data, {'Access-Control-Allow-Origin': '*'} 
    

if  __name__ == "__main__":
    app.run()


