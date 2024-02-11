import json
import joblib
import numpy as np
import pandas as pd


class YieldPredictor:
    def __init__(self):
        with open("./yieldPredictor/labels.json") as f:
            self.labels = json.load(f)
        self.ct = joblib.load("./yieldPredictor/colTrans.jbl.lzma")
        self.model = joblib.load("./yieldPredictor/model.jbl.lzma")

    def predict(self, data):
        data = pd.DataFrame(data).T
        data.columns = [
            "Crop",
            "Season",
            "State",
            "Area",
            "Production",
            "Annual_Rainfall",
            "Fertilizer",
            "Pesticide",
        ]
        data["Crop"] = data["Crop"].map(self.labels[0])
        data["Season"] = data["Season"].map(self.labels[1])
        data["State"] = data["State"].map(self.labels[2])

        return self.model.predict(self.ct.transform(data))[0]