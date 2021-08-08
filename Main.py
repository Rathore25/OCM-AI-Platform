# -*- coding: utf-8 -*-
"""
Created on Tue Aug  3 18:35:13 2021

@author: nitis
"""
from ESManager import ESManager
from WebAPI import WebAPI
from URLHelper import URLHelper
import sys
import logging
import time

class Main():
    def __init__(self):
        self.webAPI     = WebAPI()
        self.ESManager  = ESManager()
        self.URLHelper  = URLHelper()
    
    def getRelatedURLs(self, queries, location, count='100'):
        results = []
        
        for query in queries:
            results.extend(self.webAPI.getSearchResults(query, count, location))
            
        return results
    
    def validateInput(self, formData):
        if len(formData) == 0 or 'queries' not in formData or len(formData['queries']) == 0:
            raise ValueError("Query is missing in form data!")
    
    def getInput(self, formData):
        queries     = str(formData.get('queries'))
        queries     = queries.split(',')
        count       = str(formData.get('count', '100'))
        location    = str(formData.get('location', 'united states'))
        
        return (queries, count, location)
        
        
    def startProcessing(self, formData):
        # Validate input
        print("Validating input!")
        self.validateInput(formData)
        
        # Get the input
        print("Extracting the input!")
        queries, count, location = self.getInput(formData)
        
        logging.debug("Queries: " + ",".join(queries))
        
        startTime = time.time()
        
        print("Starting the processing of queries!")
        for num, query in enumerate(queries):
            logging.debug('{0} - {1} - {2} - {3}'.format(num, query, count, location))
            try:
                search_results = self.webAPI.getSearchResults(query, count, location)
                
                for result in search_results:
                    url         = result['link']
                    content     = self.webAPI.getContent(url)
                    title, text = self.URLHelper.parseTitleTextFromContent(content)
                    
                    if text is None or text == "":
                        continue
                    
                    self.ESManager.pushURLContents(url, query, title, text)
            except:
                print("ERROR_IN_startProcessing. Query:", query, sys.exc_info()[0], sys.exc_info()[1])
                logging.exception("ERROR_IN_startProcessing. Query:" + query + ' ' + str(sys.exc_info()[0]) + ' ' + str(sys.exc_info()[1]))
        
        print("Completed processing the queries!")
        print("Time taken(seconds):", time.time() - startTime)
        logging.debug("Completed!")
        
        return {'Status':'Complete'}