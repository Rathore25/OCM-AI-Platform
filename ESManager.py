# -*- coding: utf-8 -*-
"""
Created on Tue Aug  3 18:56:04 2021

@author: nitis
"""
import logging
from SettingsHelper import SettingsHelper
from elasticsearch import Elasticsearch
import sys

class ESManager():
    def __init__(self):
        self.settingsHelper = SettingsHelper()
        self.urlContentIndexName = "urlcontent"
        self.start_up()
    
    # Get elastic search client
    def getClient(self):
        client = Elasticsearch([{'host':'ocm_ai_elasticsearch'}])
        return client
    
    # Start up
    def start_up(self):
        self.createURLContentIndex()

    # Create Index
    def createURLContentIndex(self):
        try:
            body        = self.settingsHelper.getURLContentIndexConfig()
            response    = self.createIndex(self.urlContentIndexName, body)
            print("URL Content index created:", response)
        except:
            print("Unexpected error in URL Content index creation:", sys.exc_info()[0])
            logging.exception("ERROR in createURLContentIndex - " + str(sys.exc_info()[0]) + ' ' + str(sys.exc_info()[1]))
    
    def createIndex(self, indexName, body):
        print('Creating Index:', indexName)    
        client      = self.getClient()
        response    = client.indices.create(index=indexName, body=body)
        return response
    
    # Push to Elasticsearch
    def pushURLContents(self, url, query, title, text):
        try:
            body        = {'title':title, 'content':text, 'query': query}
            response    = self.push(self.urlContentIndexName, url, body)
        except:
            logging.exception("ERROR in pushURLContents - " + str(sys.exc_info()[0]) + ' ' + str(sys.exc_info()[1]))

    
    def push(self, index, id, body):
        client      = self.getClient()
        response    = client.index(index = index, id = id, body = body)
        return response
    
    def search(self, query:str, pageNo = 0, pageSize = 100):
        if query is None:
            query = ""
        
        query   = (query.strip()).lower()
        fromId  = pageNo * pageSize
        
        searchBody = {
            "from": fromId,
            "size": pageSize,
            "query": {
                "multi_match": {
                    "query": query
                    }
                }
            }
        
        searchBody1 = {
            "from": fromId,
            "size": pageSize,
            "query": {
                "query_string": {
                    "query": query
                    }
                }
            }
        
        client      = self.getClient()
        response    = client.search(index=self.urlContentIndexName,body=searchBody1)
                
        return response