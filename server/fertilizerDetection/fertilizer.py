import joblib
import numpy as np
import pandas as pd

from sklearn.preprocessing import LabelEncoder
from sklearn.preprocessing import MinMaxScaler


class FertilizerRecommender:
    def __init__(self):
        self.le = LabelEncoder()
        self.scaler = MinMaxScaler()
        self.model = joblib.load("random_forest_model.pkl")

    def predict(self, data):
        df = pd.DataFrame(data)

        df["Soil Type"] = self.le.fit_transform(df["Soil Type"])
        df["Crop Type"] = self.le.fit_transform(df["Crop Type"])

        df_scaled = pd.DataFrame(self.scaler.fit_transform(df), columns=df.columns)

        X = np.array(df_scaled)
        return self.model.predict(X)[0]
