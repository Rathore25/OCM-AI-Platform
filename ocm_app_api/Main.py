# -*- coding: utf-8 -*-
"""
Created on Tue Aug  3 18:35:13 2021

@author: nitis
"""
from ESManager import ESManager
from WebAPI import WebAPI
from URLHelper import URLHelper
from LanguageModel import LanguageModel
import sys
import logging
import time


class Main():
    def __init__(self):
        self.webAPI     = WebAPI()
        self.ESManager  = ESManager()
        self.URLHelper  = URLHelper()
        self.LangModel  = LanguageModel()
    
    def getRelatedURLs(self, queries, location, count='100'):
        results = []
        
        for query in queries:
            results.extend(self.webAPI.getSearchResults(query, count, location))
            
        return results
    
    def validateInput(self, postData):
        if len(postData) == 0 or 'queries' not in postData or len(postData['queries']) == 0:
            raise ValueError("Query is missing in form data!")
    
    def getInput(self, postData):
        queries     = str(postData.get('queries', ''))
        queries     = queries.split(',')
        count       = str(postData.get('count', '100'))
        location    = str(postData.get('location', 'united states'))
        
        return (queries, count, location)
        
    def startProcessing(self, postData):
        # Validate input
        self.validateInput(postData)
        
        # Get the input
        queries, count, location    = self.getInput(postData)
        startTime                   = time.time()
        totalCount                  = 0
        
        for num, query in enumerate(queries):
            logging.debug('Processing : {0} - {1} - {2} - {3}'.format(num, query, count, location))
            try:
                search_results = self.webAPI.getSearchResults(query, count, location)
                
                for result in search_results:
                    url         = result['link']
                    content     = self.webAPI.getContent(url)
                    title, text = self.URLHelper.parseTitleTextFromContent(content)
                    
                    if text is None or text == "":
                        continue
                    
                    self.ESManager.pushURLContents(url, query, title, text)
                    totalCount += 1
            except:
                logging.exception("ERROR_IN_startProcessing. Query:" + query + ' ' + str(sys.exc_info()[0]) + ' ' + str(sys.exc_info()[1]))
        
        logging.debug("Time taken(seconds):" + str(time.time() - startTime) + " seconds")
        logging.debug("Completed!")
        
        return {'Status':'Complete', 'Total':totalCount}
    
    def getGridData(self, query="", pageNo=0, pageSize=100):
        return self.ESManager.search(query, pageNo, pageSize)
    
    def updateRelevance(self, url, relevance=0.0):
        return self.ESManager.updateRelevance(url, relevance)
    
    def trainModel(self):
        return self.LangModel.buildModel()