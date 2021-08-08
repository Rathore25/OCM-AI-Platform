# -*- coding: utf-8 -*-
"""
Created on Wed Aug  4 12:02:23 2021

@author: nitis
"""
import json

class SettingsHelper():
    def __init__(self):
        self.app_settings_path = "./Settings/AppSettings.json"
        self.URLContent_index_configuration_path = "./Settings/ES_URLContentIndexSettings.json"
    
    def getAppSettings(self):
        with open(self.app_settings_path) as file:
            data = json.load(file)
        
        return data
    
    def getURLContentIndexConfig(self):
        with open(self.URLContent_index_configuration_path) as file:
            data = json.load(file)
        
        return data