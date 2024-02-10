import joblib
import numpy as np
import pandas as pd


class CropRecommender:
    def __init__(self):
        self.model = joblib.load("model.jbl.lzma")

    def predict(self, x):
        x = pd.DataFrame(x).T
        x.columns = ["K", "N", "P", "humidity", "ph", "rainfall", "temperature"]
        return self.model.predict(x)[0]
