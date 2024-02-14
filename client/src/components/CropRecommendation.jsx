import React, { useState } from 'react'
import "../styles/CropRecommendation.css"
import Connect from './Connect'
import img from "../assets/undraw_nature_benefits_re_kk70.svg"

function CropRecommendation() {

    const [nitrogen, setNitrogen] = useState('');
    const [phosphorous, setPhosphorous] = useState('');
    const [potassium, setPotassium] = useState('');
    const [temperature, setTemperature] = useState('');
    const [humidity, setHumidity] = useState('');
    const [ph, setPh] = useState('');
    const [rainfall, setRainfall] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <div className='CropRecommendation'>
            <div className="CropRecommendation__top">
                <Connect />
            </div>
            <div className="CropRecommendation__bottom">
                <div className="CropRecommendation__bottom__left">
                    <img src={img} alt="" />
                </div>
                <div className="CropRecommendation__bottom__right">
                    <form onSubmit={handleSubmit}>
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
                            Temperature:
                            <input className="CropRecommendation__input" type="text" value={temperature} onChange={(e) => setTemperature(e.target.value)} />
                        </label>
                        <label className="CropRecommendation__label">
                            Humidity:
                            <input className="CropRecommendation__input" type="text" value={humidity} onChange={(e) => setHumidity(e.target.value)} />
                        </label>
                        <label className="CropRecommendation__label">
                            pH:
                            <input className="CropRecommendation__input" type="text" value={ph} onChange={(e) => setPh(e.target.value)} />
                        </label>
                        <label className="CropRecommendation__label">
                            Rainfall:
                            <input className="CropRecommendation__input" type="text" value={rainfall} onChange={(e) => setRainfall(e.target.value)} />
                        </label>
                        <button type="submit">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
}


export default CropRecommendation