# -*- coding: utf-8 -*-
"""
Created on Thu Aug  5 23:38:35 2021

@author: nitis
"""
from bs4 import BeautifulSoup as BS
import string
import logging
import regex

class URLHelper():
    def __init__(self):
        pass
    
    def parseTitleTextFromContent(self, content):
        soup        = BS(content, "html.parser")
        lines       = list()
        printable   = set(string.printable)
        title       = ""
        
        try:
            titleSoup   = soup.find('title')
            if titleSoup is not None:
                title   = titleSoup.text
                title   = title.strip()
        except:
            logging.exception("Error_Parse_Content_Title!")
            print("Error_Parse_Content_Title")
        
        try:
            for p in soup.find_all('p'):
                line = p.text
                line = line.strip()
                line = ''.join(filter(lambda x: x in printable, line))
                line = regex.sub('\s+',' ', line)
                lines.append(line)
        except:
            logging.exception("Error_Parse_Content_Text!")
            print("Error_Parse_Content_Text")
        
        text = " ".join(lines)
        
        return title, text