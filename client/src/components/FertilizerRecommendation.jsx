import React, { useState } from 'react'
import "../styles/CropRecommendation.css"
import Connect from './Connect'
import img from "../assets/undraw_drag_re_shc0.svg"

function FertilizerRecommendation() {

    const [nitrogen, setNitrogen] = useState('');
    const [phosphorous, setPhosphorous] = useState('');
    const [potassium, setPotassium] = useState('');
    const [temperature, setTemperature] = useState('');
    const [humidity, setHumidity] = useState('');
    const [ph, setPh] = useState('');
    const [rainfall, setRainfall] = useState('');
    const [selectedCrop, setSelectedCrop] = useState('');
    const [selectedSoil, setSelectedSoil] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    const soilTypes = [{'Sandy': 0, 'Loamy': 1, 'Black': 2, 'Red': 3, 'Clayey': 4}];
    const cropTypes = [{'Maize': 0, 'Sugarcane': 1, 'Cotton': 2, 'Tobacco': 3, 'Paddy': 4, 'Barley': 5, 'Wheat': 6, 'Millets': 7, 'Oil seeds': 8, 'Pulses': 9, 'Ground Nuts': 10}];

    return (
        <div className='CropRecommendation'>
            <div className="CropRecommendation__top">
                <Connect />
            </div>
            <div className="CropRecommendation__bottom">
                <div className="CropRecommendation__bottom__left">
                    <img src={img} alt="" style={{ marginTop: '100px' }} />
                </div>
                <div className="CropRecommendation__bottom__right">
                    <form onSubmit={handleSubmit}>
                        <label className="CropRecommendation__label">
                            Temperature:
                            <input className="CropRecommendation__input" type="text" value={temperature} onChange={(e) => setTemperature(e.target.value)} />
                        </label>
                        <label className="CropRecommendation__label">
                            Humidity:
                            <input className="CropRecommendation__input" type="text" value={humidity} onChange={(e) => setHumidity(e.target.value)} />
                        </label>
                        <label className="CropRecommendation__label">
                            Moisture:
                            <input className="CropRecommendation__input" type="text" value={ph} onChange={(e) => setPh(e.target.value)} />
                        </label>
                        <label className="CropRecommendation__label">
                            Soil Type:
                            <select className="yeildPrediction__form__select" value={selectedSoil} onChange={(e) => setSelectedSoil(e.target.value)}>
                                {Object.keys(soilTypes[0]).map((soilType, index) => (
                                    <option key={index} value={soilType}>{soilType}</option>
                                ))}
                            </select>
                        </label>
                        <label className="CropRecommendation__label">
                            Crop Type:
                            <select className="yeildPrediction__form__select" value={selectedCrop} onChange={(e) => setSelectedCrop(e.target.value)}>
                                {Object.keys(cropTypes[0]).map((cropType, index) => (
                                    <option key={index} value={cropType}>{cropType}</option>
                                ))}
                            </select>
                        </label>
                        <label className="CropRecommendation__label">
                            Nitrogen:
                            <input className="CropRecommendation__input" type="text" value={nitrogen} onChange={(e) => setNitrogen(e.target.value)} />
                        </label>
                        <label className="CropRecommendation__label">
                            Phosphorous:
                            <input className="CropRecommendation__input" type="text" value={phosphorous} onChange={(e) => setPhosphorous(e.target.value)} />
                        </label>
                        <label className="CropRecommendation__label">
                            Potassium:
                            <input className="CropRecommendation__input" type="text" value={potassium} onChange={(e) => setPotassium(e.target.value)} />
                        </label>
                        <label className="CropRecommendation__label">
                            Phosphorous:
                            <input className="CropRecommendation__input" type="text" value={ph} onChange={(e) => setPh(e.target.value)} />
                        </label>
                        <button type="submit">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
}


export default FertilizerRecommendation