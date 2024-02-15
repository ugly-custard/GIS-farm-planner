import React, { useState } from 'react'
import "../styles/CropRecommendation.css"
import Connect from './Connect'
import img from "../assets/undraw_drag_re_shc0.svg"

function FertilizerRecommendation() {

    const soilTypes = [{'Sandy': 0, 'Loamy': 1, 'Black': 2, 'Red': 3, 'Clayey': 4}];
    const cropTypes = [{'Maize': 0, 'Sugarcane': 1, 'Cotton': 2, 'Tobacco': 3, 'Paddy': 4, 'Barley': 5, 'Wheat': 6, 'Millets': 7, 'Oil seeds': 8, 'Pulses': 9, 'Ground Nuts': 10}];

    // const [nitrogen, setNitrogen] = useState('');
    // const [phosphorous, setPhosphorous] = useState('');
    // const [potassium, setPotassium] = useState('');
    // const [temperature, setTemperature] = useState('');
    // const [humidity, setHumidity] = useState('');
    // const [ph, setPh] = useState('');
    // const [rainfall, setRainfall] = useState('');
    // const [selectedCrop, setSelectedCrop] = useState('');
    // const [selectedSoil, setSelectedSoil] = useState('');

    // 'Temparature', 'Humidity ', 'Moisture', 'Soil Type', 'Crop Type',
    //    'Nitrogen', 'Potassium', 'Phosphorous', 'Fertilizer Name'

    const [result, setResult] = useState(null)


    const [parameters, setParameters] = useState({
        temperature: '',
        humidity: '',
        moisture: '',
        selectedSoil: Object.keys(soilTypes)[0],
        selectedCrop: Object.keys(cropTypes)[0],
        nitrogen: '',
        potassium: '',
        phosphorous: '',
    })

    const onChange = (e) => {
        console.log(parameters)
        setParameters({ ...parameters, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const body = []
        Object.keys(parameters).forEach((key, i) => {
            let value = parameters[key];
            if (i != 3 && i != 4) {
                value = parseInt(value)
            }
            body.push(value);
        });
        console.log(body)
        
        const response = await fetch('http://localhost:8080/api/fertilizer-recommendation', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });
        const res = await response.json();
        console.log(res)
        setResult(res["predicted_fertilizer"])
    };


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
                            <input className="CropRecommendation__input" name='temperature' type="text" value={parameters.temperature} onChange={onChange} />
                        </label>
                        <label className="CropRecommendation__label">
                            Humidity:
                            <input className="CropRecommendation__input" name='humidity' type="text" value={parameters.humidity} onChange={onChange} />
                        </label>
                        <label className="CropRecommendation__label">
                            Moisture:
                            <input className="CropRecommendation__input" name='moisture' type="text" value={parameters.moisture} onChange={onChange} />
                        </label>
                        <label className="CropRecommendation__label">
                            Soil Type:
                            <select className="yeildPrediction__form__select" name='selectedSoil' value={parameters.selectedSoil} onChange={onChange}>
                                {Object.keys(soilTypes[0]).map((soilType, index) => (
                                    <option key={index} value={soilType}>{soilType}</option>
                                ))}
                            </select>
                        </label>
                        <label className="CropRecommendation__label">
                            Crop Type:
                            <select className="yeildPrediction__form__select" name='selectedCrop' value={parameters.selectedCrop} onChange={onChange}>
                                {Object.keys(cropTypes[0]).map((cropType, index) => (
                                    <option key={index} value={cropType}>{cropType}</option>
                                ))}
                            </select>
                        </label>
                        <label className="CropRecommendation__label">
                            Nitrogen:
                            <input className="CropRecommendation__input" name='nitrogen' type="text" value={parameters.nitrogen} onChange={onChange} />
                        </label>
                        <label className="CropRecommendation__label">
                            Phosphorous:
                            <input className="CropRecommendation__input" name='phosphorous' type="text" value={parameters.phosphorous} onChange={onChange} />
                        </label>
                        <label className="CropRecommendation__label">
                            Potassium:
                            <input className="CropRecommendation__input" name='potassium' type="text" value={parameters.potassium} onChange={onChange} />
                        </label>
                        <button type="submit">Submit</button>
                    </form>
                </div>
            </div>
            {result &&
            <div style={{border: "2px green", backgroundColor: "white", borderRadius: "2rem"}}>
                <p><strong>Predicted Fertilizer: </strong>{Math.round(result)} kg/m</p>
            </div>
            }
        </div>
    );
}


export default FertilizerRecommendation