import React, { useState } from 'react'
import "../styles/YeildPredictor.css"
import img from "../assets/undraw_flowers_vx06 1.svg"
import Connect from './Connect';

function YeildPredictor() {

    const cropOptions = { "Arecanut": 0, "Arhar/Tur": 1, "Castor seed": 2, "Coconut": 3, "Cotton(lint)": 4, "Dry chillies": 5, "Gram": 6, "Jute": 7, "Linseed": 8, "Maize": 9, "Mesta": 10, "Niger seed": 11, "Onion": 12, "Potato": 13, "Rapeseed &Mustard": 14, "Rice": 15, "Sesamum": 16, "Small millets": 17, "Sugarcane": 18, "Sweet potato": 19, "Tapioca": 20, "Tobacco": 21, "Turmeric": 22, "Wheat": 23, "Bajra": 24, "Black pepper": 25, "Cardamom": 26, "Coriander": 27, "Garlic": 28, "Ginger": 29, "Groundnut": 30, "Horse-gram": 31, "Jowar": 32, "Ragi": 33, "Cashewnut": 34, "Banana": 35, "Soyabean": 36, "Barley": 37, "Khesari": 38, "Masoor": 39, "Moong(Green Gram)": 40, "Safflower": 41, "Sannhamp": 42, "Sunflower": 43, "Urad": 44, "Peas & beans (Pulses)": 45, "other oilseeds": 46, "Other Cereals": 47, "Cowpea(Lobia)": 48, "Oilseeds total": 49, "Guar seed": 50, "Moth": 51 };
    const seasonOptions = { "Whole Year": 0, "Kharif": 1, "Rabi": 2, "Autumn": 3, "Summer": 4, "Winter": 5 };
    const stateOptions = { "Assam": 0, "Karnataka": 1, "Kerala": 2, "Meghalaya": 3, "West Bengal": 4, "Puducherry": 5, "Goa": 6, "Andhra Pradesh": 7, "Tamil Nadu": 8, "Odisha": 9, "Bihar": 10, "Gujarat": 11, "Madhya Pradesh": 12, "Maharashtra": 13, "Mizoram": 14, "Punjab": 15, "Uttar Pradesh": 16, "Haryana": 17, "Himachal Pradesh": 18, "Tripura": 19, "Nagaland": 20, "Chhattisgarh": 21, "Uttarakhand": 22, "Jharkhand": 23, "Delhi": 24, "Manipur": 25, "Jammu and Kashmir": 26, "Telangana": 27, "Arunachal Pradesh": 28, "Sikkim": 29 }

    const [result, setResult] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault();
        const body = []
        Object.keys(parameters).forEach((key, i) => {
            let value = parameters[key];
            if (i > 2) {
                value = parseFloat(value);
            }
            body.push(value);
        });
        console.log(body)
        const response = await fetch('http://localhost:8080/api/yield-prediction', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });
        const res = await response.json();
        console.log(res)
        setResult(res["predicted_yield"])
    }

    const [parameters, setParameters] = useState({
        crop: Object.keys(cropOptions)[0],
        season: Object.keys(seasonOptions)[0],
        state: Object.keys(stateOptions)[0],
        area: null,
        production: null,
        annual_rainfall: null,
        fertilizer: null,
        pesticide: null,
    })

    const onChange = (e) => {
        console.log(parameters)
        setParameters({ ...parameters, [e.target.name]: e.target.value });
    }


    return (
        <div className='YeildPredictor'>
            <Connect />
            <div className="YeildPredictorBottom">
                <img src={img} alt="" />
                <div className='YeildPredictor__form'>
                    <h2>Fill Out the Details Manually</h2>
                    <form className='YeildPredictorForm' onSubmit={handleSubmit}>
                        <label htmlFor="crop" className="yieldPrediction__form__label">Crop:</label>
                        <select onChange={onChange} value={parameters.crop} id="crop" name="crop" className="yeildPrediction__form__select">
                            {Object.keys(cropOptions).map((crop) => (
                                <option key={cropOptions[crop]} value={crop}>
                                    {crop}
                                </option>
                            ))}
                        </select>

                        <label htmlFor="season" className="yieldPrediction__form__label">Season:</label>
                        <select onChange={onChange} value={parameters.season} id="season" name="season" className="yeildPrediction__Form__Select">
                            {Object.keys(seasonOptions).map((season) => (
                                <option key={seasonOptions[season]} value={season}>
                                    {season}
                                </option>
                            ))}
                        </select>

                        <label htmlFor="state" className="yieldPrediction__form__label">State:</label>
                        <select onChange={onChange} value={parameters.state} id="state" name="state" className="yeildPrediction__Form__Select">
                            {Object.keys(stateOptions).map((state) => (
                                <option key={stateOptions[state]} value={state}>
                                    {state}
                                </option>
                            ))}
                        </select>

                        <label htmlFor="area" className="yieldPrediction__form__label">Area:</label>
                        <input onChange={onChange} value={parameters.area} type="text" id="area" name="area" className="yeildPrediction__Form__Select" placeholder='in hectres'/>

                        <label htmlFor="production" className="yieldPrediction__form__label">Production:</label>
                        <input onChange={onChange} value={parameters.production} type="text" id="production" name="production" className="yeildPrediction__Form__Select" placeholder='in Metric tonnes'/>

                        <label htmlFor="annual_rainfall" className="yieldPrediction__form__label">Annual Rainfall:</label>
                        <input onChange={onChange} value={parameters.annual_rainfall} type="text" id="annual_rainfall" name="annual_rainfall" className="yeildPrediction__Form__Select" placeholder='in mm'/>

                        <label htmlFor="fertilizer" className="yieldPrediction__form__label">Fertilizer:</label>
                        <input onChange={onChange} value={parameters.fertilizer} type="text" id="fertilizer" name="fertilizer" className="yeildPrediction__Form__Select" placeholder='in KG'/>

                        <label htmlFor="pesticide" className="yieldPrediction__form__label">Pesticide:</label>
                        <input onChange={onChange} value={parameters.pesticide} type="text" id="pesticide" name="pesticide" className="yeildPrediction__Form__Select" placeholder='in KG'/>

                        <button type='submit' >Submit</button>
                    </form>
                </div>

            </div>
            {result &&
                <div style={{ border: "2px green", backgroundColor: "white", borderRadius: "2rem" }}>
                    <p><strong>Predicted Yield: </strong>{result} production?unit area</p>
                </div>
            }

        </div>
    )
}

export default YeildPredictor