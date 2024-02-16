import React, { useEffect, useState } from 'react'
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

    const [result, setResult] = useState('')

    const fertilizerOptions = {
        'Urea': 'Urea is a common nitrogen fertilizer widely used in agriculture. It contains a high concentration of nitrogen, typically around 46%. It\'s usually applied to crops as granules or in solution form to provide a readily available source of nitrogen for plant growth. It\'s suitable for most crops and is particularly effective for promoting vegetative growth.',
        'DAP (Diammonium phosphate)': 'DAP is a phosphorus fertilizer that contains nitrogen and phosphorus in the form of ammonium and phosphate. It typically has an N-P-K ratio of 18-46-0, meaning it contains 18% nitrogen and 46% phosphorus. DAP is commonly used to promote root development and early plant growth, making it suitable for a wide range of crops, especially those with high phosphorus requirements like legumes and oilseeds.',
        '14-35-14': 'This is a fertilizer formulation with an N-P-K ratio of 14-35-14, meaning it contains 14% nitrogen, 35% phosphorus, and 14% potassium. This balanced ratio makes it suitable for promoting overall plant growth and development, as well as enhancing flowering and fruiting in crops. It\'s commonly used during the early stages of growth or during flowering and fruiting stages.',
        '28-28': 'This fertilizer has an N-P-K ratio of 28-28-0, meaning it contains 28% nitrogen and 28% phosphorus, with no potassium. It\'s a high-phosphorus fertilizer suitable for promoting root development and early plant growth. It\'s often used as a starter fertilizer for crops that require a significant amount of phosphorus, such as corn, wheat, and vegetables.',
        '17-17-17': 'This fertilizer has a balanced N-P-K ratio of 17-17-17, providing equal amounts of nitrogen, phosphorus, and potassium. It\'s suitable for promoting overall plant growth and development throughout the growing season. It\'s commonly used for a wide range of crops and can be applied as a general-purpose fertilizer for both soil and foliar applications.',
        '10-26-10': 'This fertilizer formulation has a higher phosphorus content, with an N-P-K ratio of 10-26-10. It contains 10% nitrogen, 26% phosphorus, and 10% potassium. This high-phosphorus fertilizer is often used to promote root development, flowering, and fruiting in crops. It\'s particularly beneficial for crops that have high phosphorus requirements during the early stages of growth and for flowering and fruiting stages.',
    };



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
        console.log(res.predicted_fertilizer)
        setResult(res.predicted_fertilizer)
        console.log(result)
    };

    useEffect(() => {
        console.log(toString(fertilizerOptions[result]));
    }, [result])


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
                    {result ? (
                        <div className="CropRecommendation__result">
                            <h2>Recommended Fertilizer: {result}</h2>
                            <h3>Details:</h3>
                            <p>{fertilizerOptions[result]}</p>
                        </div>
                    ) : (
                            <form onSubmit={handleSubmit}>
                        <label className="CropRecommendation__label">
                            Temperature:
                                    <input className="CropRecommendation__input" name='temperature' type="text" value={parameters.temperature} onChange={onChange} placeholder='in degree celcius' />
                        </label>
                        <label className="CropRecommendation__label">
                            Relative Humidity:
                            <input className="CropRecommendation__input" name='humidity' type="text" value={parameters.humidity} onChange={onChange} placeholder='in %'/>
                        </label>
                        <label className="CropRecommendation__label">
                            Moisture:
                            <input className="CropRecommendation__input" name='moisture' type="text" value={parameters.moisture} onChange={onChange} placeholder='in percentage'/>
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
                            <input className="CropRecommendation__input" name='nitrogen' type="text" value={parameters.nitrogen} onChange={onChange} placeholder='in ratio'/>
                        </label>
                        <label className="CropRecommendation__label">
                            Phosphorous:
                            <input className="CropRecommendation__input" name='phosphorous' type="text" value={parameters.phosphorous} onChange={onChange} placeholder='in ratio'/>
                        </label>
                        <label className="CropRecommendation__label">
                            Potassium:
                            <input className="CropRecommendation__input" name='potassium' type="text" value={parameters.potassium} onChange={onChange} placeholder='in ratio'/>
                        </label>
                        <button type="submit">Submit</button>
                    </form>
                    )}
                </div>
            </div>

        </div>
    );
}


export default FertilizerRecommendation