import json
import joblib
import numpy as np
import pandas as pd


class FertilizerRecommender:
    def __init__(self):
        with open("./fertilizerDetection/labels.json") as f:
            self.labels = json.load(f)
        self.ct = joblib.load("./fertilizerDetection/colTrans.jbl.lzma")
        self.model = joblib.load("./fertilizerDetection/model.jbl.lzma")

    def predict(self, data):
        data = pd.DataFrame(data).T
        data.columns = [
            "Temparature",
            "Humidity ",
            "Moisture",
            "Soil Type",
            "Crop Type",
            "Nitrogen",
            "Potassium",
            "Phosphorous",
        ]

        data["Soil_Code"] = data["Soil Type"].map(self.labels[0])
        data["Crop_Code"] = data["Crop Type"].map(self.labels[1])
        data.drop(["Soil Type"], axis=1, inplace=True)
        data.drop(["Crop Type"], axis=1, inplace=True)
        print(data)

        fertMap = {v: k for k, v in self.labels[2].items()}
        fertilizer = self.model.predict(self.ct.transform(data))[0]
        return fertMap[fertilizer]