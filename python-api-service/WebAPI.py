# -*- coding: utf-8 -*-
"""
Created on Tue Aug  3 18:37:00 2021

@author: nitis
"""
import sys
import os
import requests
from serpapi import GoogleSearch
import logging

class WebAPI():
    def __init__(self):
        self.api_key = os.environ.get('SERP_API_KEY')
        if self.api_key is None:
            logging.debug("DID NOT FIND THE SERP_API_KEY")
        else:
            logging.debug("Found the SERP_API_KEY")
    
    def getSearchResults(self, query, count='100', location='united states'):
        try:
            params = {
              "api_key": self.api_key,
              "engine": "google",
              "start": "0",
              "num": count,
              "q": query,
              "google_domain": "google.com",
              "gl": "us",
              "hl": "en",
              "location": location
            }
            
            search  = GoogleSearch(params)
            results = search.get_dict()
            
            return results.get('organic_results')
        except :
            print("ERROR_IN_GetSearchResults. Query:", query, sys.exc_info()[0])
            logging.exception("ERROR_IN_GetSearchResults. Query:" + query)
            return []
    
    def getContent(self, url):
        content = ""
        try:
            response    = requests.get(url, timeout = 10)
            content     = response.text
        except:
            print("ERROR_IN_GET. URL:", url, sys.exc_info()[0])
            logging.exception("ERROR_IN_GET. URL:" + url)
            content = "ERROR_IN_GET"
        
        return content