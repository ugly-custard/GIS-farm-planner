from cropRecommender.crpRcmndr import CropRecommender
from fertilizerDetection.fertilizer import FertilizerRecommender
from flask import Flask, request, jsonify
from yieldPredictor.yieldPredictor import YieldPredictor

app = Flask(__name__)

fertilizer_recommender = FertilizerRecommender()
crop_recommender = CropRecommender()
yield_predictor = YieldPredictor()


@app.route("/")
def hello_world():
    return "<p>Hello, Poosay!</p>"


@app.route("/crop-recommendation", methods=["POST"])
def crop_recommendation():
    data = request.json
    crop = crop_recommender.predict(data)

    return jsonify({"recommended_crop": crop})


@app.route("/yield-prediction", methods=["POST"])
def yield_prediction():
    data = request.json
    predicted_yield = yield_predictor.predict(data)

    return jsonify({"predicted_yield": predicted_yield})


@app.route("/fertilizer-recommendation", methods=["POST"])
def fertilizer_recommendation():

    fertilizer_mapping = {
        0: "10-26-26",
        1: "14-35-14",
        2: "17-17-17",
        3: "20-20",
        4: "28-28",
        5: "DAP",
        6: "Urea",
    }

    data = request.json
    prediction = fertilizer_recommender.predict(data)

    predicted_fertilizer = fertilizer_mapping[prediction[0]]

    return jsonify({"predicted_fertilizer": predicted_fertilizer})
