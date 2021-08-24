# -*- coding: utf-8 -*-
"""
Created on Thu Aug  5 02:33:34 2021

@author: nitis
"""
import logging
import sys
from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin
from Main import Main

main    = Main()
app     = Flask(__name__)
cors    = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route('/', methods=['GET'])
@cross_origin()
def home():
    return "<h1>Home</h1><p>This site is a prototype API for OCM Advisory - AI Platform.</p>"

@app.route('/api/v1/process/', methods=['POST'])
@cross_origin()
def process():
    try:
        postData    = request.get_json()
        
        return jsonify(main.startProcessing(postData))
    except:
        app.logger.error(str(sys.exc_info()[0]) + ' ' + str(sys.exc_info()[1]))
        return jsonify({'Status':'Error','Message':str(sys.exc_info()[1])})

@app.route('/api/v1/search/', methods=['POST'])
@cross_origin()
def search():
    try:
        postData    = request.get_json()
        query       = ""
        pageNumber  = 0
        pageSize    = 100
        
        if "query" in postData:
            query = str(postData["query"]).strip()
        if "pageNumber" in postData:
            pageNumber = int(str(postData["pageNumber"]))
        if "pageSize" in postData:
            pageSize = int(str(postData["pageSize"]))
        
        logging.debug('Search : query - {0}  pageNo - {1}  pageSize - {2}'.format(query, pageNumber, pageSize))
        
        return jsonify(main.getGridData(query, pageNumber, pageSize))
    except:
        app.logger.error(str(sys.exc_info()[0]) + ' ' + str(sys.exc_info()[1]))
        return jsonify({'Status':'Error', 'Message': str(sys.exc_info()[1])})

@app.route('/api/v1/update/relevance/', methods=['POST'])
@cross_origin()
def updateRelevance():
    try:
        postData    = request.get_json()
        
        main.updateRelevance(postData['url'], postData['relevance'])
        
        return jsonify({'status':'Success'})
    except:
        app.logger.error(str(sys.exc_info()[0]) + ' ' + str(sys.exc_info()[1]))
        return jsonify({'Status':'Error','Message':str(sys.exc_info()[1])})

@app.route('/api/v1/model/train/', methods=['POST'])
@cross_origin()
def trainModel():
    try:
        return jsonify(main.trainModel())
    except:
        app.logger.error(str(sys.exc_info()[0]) + ' ' + str(sys.exc_info()[1]))
        return jsonify({'Status':'Error','Message':str(sys.exc_info()[1])})

logging.basicConfig(filename="logFile.txt",
            level=logging.DEBUG,
            format="%(asctime)s %(levelname)s %(module)s - %(funcName)s: %(message)s",
            datefmt="%Y-%m-%d %H:%M:%S")

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001)