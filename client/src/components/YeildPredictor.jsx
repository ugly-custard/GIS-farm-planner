import React from 'react'
import "../styles/YeildPredictor.css"
import img from "../assets/undraw_flowers_vx06 1.svg"
import Connect from './Connect';

function YeildPredictor() {
    const cropOptions = {
        'Maize': 0,
        'Sugarcane': 1,
        'Cotton': 2,
        'Tobacco': 3,
        'Paddy': 4,
        'Barley': 5,
        'Wheat': 6,
        'Millets': 7,
        'Oil seeds': 8,
        'Pulses': 9,
        'Ground Nuts': 10
    };

    return (
        <div className='YeildPredictor'>
            <Connect />
            <div className="YeildPredictorBottom">
                <img src={img} alt="" />
                <div className='YeildPredictor__form'>
                <h2>Fill Out the Details Manually</h2>
                <form className='YeildPredictorForm'>
                    <label htmlFor="crop" className="yieldPrediction__form__label">Crop:</label>
                    <select id="crop" name="crop" className="yeildPrediction__form__select">
                        {Object.keys(cropOptions).map((crop) => (
                            <option key={cropOptions[crop]} value={cropOptions[crop]}>
                                {crop}
                            </option>
                        ))}
                    </select>

                    <label htmlFor="season" className="yieldPrediction__form__label">Season:</label>
                    <select id="season" name="season" className="yeildPrediction__Form__Select">
                        <option value="summer">Summer</option>
                        <option value="winter">Winter</option>
                        <option value="autumn">Autumn</option>
                        <option value="spring">Spring</option>
                    </select>

                    <label htmlFor="state" className="yieldPrediction__form__label">State:</label>
                    <input type="text" id="state" name="state" className="yeildPrediction__Form__Select" />

                    <label htmlFor="area" className="yieldPrediction__form__label">Area:</label>
                    <input type="text" id="area" name="area" className="yeildPrediction__Form__Select" />

                    <label htmlFor="production" className="yieldPrediction__form__label">Production:</label>
                    <input type="text" id="production" name="production" className="yeildPrediction__Form__Select" />

                    <label htmlFor="annual_rainfall" className="yieldPrediction__form__label">Annual Rainfall:</label>
                    <input type="text" id="annual_rainfall" name="annual_rainfall" className="yeildPrediction__Form__Select" />

                    <label htmlFor="fertilizer" className="yieldPrediction__form__label">Fertilizer:</label>
                    <input type="text" id="fertilizer" name="fertilizer" className="yeildPrediction__Form__Select" />

                    <label htmlFor="pesticide" className="yieldPrediction__form__label">Pesticide:</label>
                    <input type="text" id="pesticide" name="pesticide" className="yeildPrediction__Form__Select" />

                    <button>Submit</button>
                </form>
                </div>
                
            </div>
            
        </div>
    )
}

export default YeildPredictor