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

@app.route('/start/', methods=['POST'])
@cross_origin()
def start():
    try:
        #parameters  = request.args.to_dict()
        formData    = request.form.to_dict()
        
        return jsonify(main.startProcessing(formData))
    except:
        app.logger.error(str(sys.exc_info()[0]) + ' ' + str(sys.exc_info()[1]))
        return jsonify({'Status':'Error','Message':str(sys.exc_info()[1])})

logging.basicConfig(filename="logFile.txt",
            level=logging.DEBUG,
            format="%(asctime)s %(levelname)s %(module)s - %(funcName)s: %(message)s",
            datefmt="%Y-%m-%d %H:%M:%S")

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001)