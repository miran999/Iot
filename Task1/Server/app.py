from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
from joblib import load
import json

clf = load('model.joblib') 

app = Flask(__name__)
CORS(app)
        
@app.route('/prediction', methods=['POST'])
def Prediction():
    global predict
    if request.method == 'POST':
        requested_data = request.get_json()
        print("aloo")
        data =([requested_data["value"]])
        print(data)
        predict = clf.predict(data)
        return str(predict.tolist()[0]) , 200
    
@app.route('/Prediction', methods=['GET'])
def getPredict():
    if request.method == 'GET':
        return jsonify(value = (predict.tolist()[0])) , 200

if __name__ == "__main__":
    app.run(host='192.168.1.13', port= 8090, debug=True)