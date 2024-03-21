import json
import joblib
import os
import pandas as pd

from openai import OpenAI


class YieldPredictor:
    def __init__(self):
        with open("./yieldPredictor/labels.json") as f:
            self.labels = json.load(f)
        self.ct = joblib.load("./yieldPredictor/colTrans.jbl.lzma")
        self.model = joblib.load("./yieldPredictor/model.jbl.lzma")
        self.client = OpenAI(api_key=os.environ["OPENAI_API_KEY"])

    def predict(self, data):
        data = pd.DataFrame(data).T
        datacp = data.copy()
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

        prediction = self.model.predict(self.ct.transform(data))[0]
        # response = self.client.chat.completions.create(
        #     model="gpt-3.5-turbo-0125",
        #     response_format={"type": "json_object"},
        #     messages=[
        #         {"role": "system", "content": "You are a helpful farming assistant."},
        #         {"role": "user", "content": f"Based on the input parameters:\n{datacp.iloc[0].values.flatten().tolist()}\nand the predicted yield of {prediction} kg/acre, here are some personalized suggestions to increase your yield:\n"},
        #     ]
        # )
        message = """\
    To optimize crop yield, select suitable crops based on climate and soil conditions, \
    time planting and harvesting appropriately, adhere to state-specific agricultural \
    guidelines, manage land efficiently, monitor production levels for timely intervention, \
    employ irrigation to supplement rainfall, conduct soil tests for precise fertilizer \
    application, implement integrated pest management for effective pest control, and \
    continually adjust practices based on real-time data. These strategies, coupled with \
    staying informed about advancements, will maximize yield and enhance agricultural productivity.\
    """
        return prediction, message # response.choices[0].message.content