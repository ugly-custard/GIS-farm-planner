from flask import Flask, request, jsonify
from flask_cors import CORS

from cropRecommender.crpRcmndr import CropRecommender
from fertilizerDetection.fertilizer import FertilizerRecommender
from yieldPredictor.yieldPredictor import YieldPredictor
from chatbot.run import Chatbot

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}})

fertilizer_recommender = FertilizerRecommender()
crop_recommender = CropRecommender()
yield_predictor = YieldPredictor()
chatbot = Chatbot(intents_file="./chatbot/intent.json", model_file="./chatbot/model_keras.h5", data_file="./chatbot/data.pickle")


@app.route("/")
def hello_world():
    return "<p>Hello, Poosay!</p>"


@app.route("/api/crop-recommendation", methods=["POST"])
def crop_recommendation():
    data = request.json
    crop = crop_recommender.predict(data)

    return jsonify({"recommended_crop": crop})


@app.route("/api/yield-prediction", methods=["POST"])
def yield_prediction():
    data = request.json
    predicted_yield = yield_predictor.predict(data)

    return jsonify({"predicted_yield": predicted_yield})


@app.route("/api/fertilizer-recommendation", methods=["POST"])
def fertilizer_recommendation():
    data = request.json
    prediction = fertilizer_recommender.predict(data)

    return jsonify({"predicted_fertilizer": prediction})

@app.route('/api/chatbot', methods=['POST'])
def get_response():
    data = request.get_json()
    query = data['query']
    response , queries = chatbot.get_response(query)
    return jsonify({'response': response , 'queries': queries})


if __name__ == "__main__":
    app.run(debug=True, port=8080)