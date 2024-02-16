import joblib
import numpy as np
import pandas as pd


class CropRecommender:
    def __init__(self):
        self.model = joblib.load("./cropRecommender/model.jbl.lzma")

    def predict(self, data):
        data = pd.DataFrame(data).T
        data.columns = ["N", "P", "K", "temperature", "humidity", "ph", "rainfall"]
        
        return self.model.predict(data)[0]