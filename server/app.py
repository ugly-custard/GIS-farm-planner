from flask import Flask , request , jsonify
import joblib
from sklearn.preprocessing import LabelEncoder
import pandas as pd
import numpy as np
from sklearn.preprocessing import MinMaxScaler

app = Flask(__name__)

@app.route("/")
def hello_world():
    return "<p>Hello, Poosay!</p>"

@app.route('/fertilizer-recommendation', methods=['POST'])
def fertilizer_recommendation():
   
    model = joblib.load('./fertilizer_reccomendation/random_forest_model.pkl')

    fertilizer_mapping = {
        0: '10-26-26',
        1: '14-35-14',
        2: '17-17-17',
        3: '20-20',
        4: '28-28',
        5: 'DAP',
        6: 'Urea'
    }

    data = request.json
    df = pd.DataFrame(data)

    le = LabelEncoder()

    df['Soil Type'] = le.fit_transform(df['Soil Type'])
    df['Crop Type'] = le.fit_transform(df['Crop Type'])

    scaler = MinMaxScaler()
    
    df_scaled = pd.DataFrame(scaler.fit_transform(df), columns=df.columns)
    
    X = np.array(df_scaled)

    prediction = model.predict(X)
    
    predicted_fertilizer = fertilizer_mapping[prediction[0]]
    
    return jsonify({"predicted_fertilizer": predicted_fertilizer})