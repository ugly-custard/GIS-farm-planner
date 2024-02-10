import json
import joblib
import numpy as np
import pandas as pd


class YieldPredictor:
    def __init__(self):
        with open("labels.json") as f:
            self.labels = json.load(f)
        self.ct = joblib.load("colTrans.jbl.lzma")
        self.model = joblib.load("model.jbl.lzma")

    def predict(self, x):
        x = pd.DataFrame(x).T
        x.columns = [
            "Crop",
            "Season",
            "State",
            "Area",
            "Production",
            "Annual_Rainfall",
            "Fertilizer",
            "Pesticide",
        ]
        return self.model.predict(self.ct.transform(x))[0]
