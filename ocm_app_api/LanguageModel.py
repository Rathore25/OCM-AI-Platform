# -*- coding: utf-8 -*-
"""
Created on Fri Aug 20 10:44:37 2021

@author: nitis
"""
import logging
import sys
import pandas as pd
from ESManager import ESManager
import tensorflow as tf
import tensorflow_hub as hub
from sklearn.model_selection import train_test_split
import time

class LanguageModel():
    def __init__(self):
        self.ESManager                  = ESManager()
        self.module_url_transformer     = "https://tfhub.dev/google/universal-sentence-encoder-large/5"
        self.model                      = None
    
    def getLabelledDataframe(self):
        response    = self.ESManager.getLabelledDataset(10000)
        result      = []
        
        for item in response:
            result.append({'content':item['_source']['content'],'target':item['_source']['relevance']})
        
        result      = pd.DataFrame(result)
        
        return result
    
    def trainModel(self, module_url, train_df, valid_df, trainable=False):
        try:
            hub_layer   = hub.KerasLayer(module_url, input_shape=[], output_shape=[512], dtype=tf.string, trainable=trainable)
              
            model       = tf.keras.models.Sequential([hub_layer,
                                                tf.keras.layers.Dense(256, activation='relu'),
                                                tf.keras.layers.Dense(64, activation='relu'),
                                                tf.keras.layers.Dense(1, activation='sigmoid')])
            
            model.compile(optimizer=tf.keras.optimizers.Adam(learning_rate=0.0001),loss=tf.losses.BinaryCrossentropy(),
                          metrics=[tf.metrics.BinaryAccuracy(name='accuracy')])
            
            model.summary()
              
            history     = model.fit(train_df['content'], train_df['target'],
                                    epochs = 100,
                                    batch_size = 32,
                                    validation_data = (valid_df['content'], valid_df['target']),
                                    callbacks = [
                                        tf.keras.callbacks.EarlyStopping(monitor='val_loss', patience=2, mode='min')
                                        ],
                                    verbose=0)
            self.model      = model
            self.history    = history
            
            return {'Status':'Success', 'History': history.history}
        except:
            logging.exception("ERROR in Train Model - " + str(sys.exc_info()[0]) + ' ' + str(sys.exc_info()[1]))
            return {'Status':'Error', 'Message': str(sys.exc_info()[0]) + ' ' + str(sys.exc_info()[1])}
    
    def buildModel(self):
        startTime           = time.time()
        
        logging.debug("Starting to build model!")
        
        df                  = self.getLabelledDataframe()
        logging.debug("Dataset size - " + str(df.shape))
        
        train_df, valid_df  = train_test_split(df, random_state=42, train_size=0.8, stratify=df.target.values)
        logging.debug("Train size - " + str(df.shape) + "Validation size - " + str(df.shape))
        
        response            = self.trainModel(self.module_url_transformer, train_df, valid_df)
        
        endTime             = time.time()
        response['TimeGap'] = endTime - startTime
        
        return response
    
    def predict(self, url):
        pass