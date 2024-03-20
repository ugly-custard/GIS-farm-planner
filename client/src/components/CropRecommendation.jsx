import React, { useEffect, useState } from 'react'
import "../styles/CropRecommendation.css"
import Connect from './Connect'
import img from "../assets/undraw_nature_benefits_re_kk70.svg"

function CropRecommendation() {

    // const [nitrogen, setNitrogen] = useState('');
    // const [phosphorous, setPhosphorous] = useState('');
    // const [potassium, setPotassium] = useState('');
    // const [temperature, setTemperature] = useState('');
    // const [humidity, setHumidity] = useState('');
    // const [ph, setPh] = useState('');
    // const [rainfall, setRainfall] = useState('');

    const [result, setResult] = useState(null)

    const cropValues = {
        Rice: {
            soil: "Clayey soil with good water retention or loamy soil with good drainage.",
            nutrients: "Requires nitrogen, phosphorus, and potassium. Responds well to organic matter.",
            moisture: "Requires standing water or flooded fields for growth."
        },
        maize: {
            soil: "Wide range of soils but prefers well-drained, fertile soil.",
            nutrients: "Requires nitrogen, phosphorus, and potassium. Responds well to fertilizers.",
            moisture: "Requires moderate water, especially during the growing season."
        },
        chickpea: {
            soil: "Well-drained soil with a neutral pH.",
            nutrients: "Fixes nitrogen in the soil, benefiting other crops.",
            moisture: "Requires moderate moisture but can tolerate dry conditions."
        },
        kidneyBeans: {
            soil: "Well-drained soil.",
            nutrients: "Fixes nitrogen in the soil.",
            moisture: "Requires moderate moisture."
        },
        pigeonPeas: {
            soil: "Well-drained soil.",
            nutrients: "Drought-tolerant once established.",
            moisture: "Requires moderate water."
        },
        mothBeans: {
            soil: "Sandy, well-drained soil.",
            nutrients: "Drought-tolerant.",
            moisture: "Requires moderate water."
        },
        mungBean: {
            soil: "Sandy loam soil with good drainage.",
            nutrients: "Drought-tolerant.",
            moisture: "Requires moderate water."
        },
        blackGram: {
            soil: "Well-drained, sandy loam soil.",
            nutrients: "Drought-tolerant.",
            moisture: "Requires moderate water."
        },
        lentil: {
            soil: "Well-drained soil.",
            nutrients: "Fixes nitrogen in the soil.",
            moisture: "Requires moderate water."
        },
        pomegranate: {
            soil: "Well-drained, loamy soil.",
            nutrients: "Requires phosphorus and potassium.",
            moisture: "Tolerates drought once established."
        },
        banana: {
            soil: "Well-drained, fertile soil.",
            nutrients: "Requires potassium.",
            moisture: "Requires ample moisture."
        },
        mango: {
            soil: "Well-drained soil.",
            nutrients: "Requires nitrogen, phosphorus, and potassium.",
            moisture: "Tolerates drought once established."
        },
        grapes: {
            soil: "Well-drained soil with good organic content.",
            nutrients: "Requires phosphorus and potassium.",
            moisture: "Moderate water requirements."
        },
        watermelon: {
            soil: "Well-drained, sandy soil.",
            nutrients: "Requires nitrogen, phosphorus, and potassium.",
            moisture: "High moisture requirements."
        },
        muskmelon: {
            soil: "Well-drained, sandy loam soil.",
            nutrients: "Requires nitrogen, phosphorus, and potassium.",
            moisture: "Moderate moisture requirements."
        },
        apple: {
            soil: "Well-drained, loamy soil.",
            nutrients: "Requires nitrogen, phosphorus, and potassium.",
            moisture: "Moderate moisture requirements."
        },
        orange: {
            soil: "Well-drained soil.",
            nutrients: "Requires nitrogen, phosphorus, and potassium.",
            moisture: "Moderate moisture requirements."
        },
        papaya: {
            soil: "Well-drained soil.",
            nutrients: "Requires nitrogen, phosphorus, and potassium.",
            moisture: "Moderate moisture requirements."
        },
        coconut: {
            soil: "Sandy or loamy soil.",
            nutrients: "Requires potassium.",
            moisture: "Tolerates drought once established."
        },
        cotton: {
            soil: "Well-drained, sandy loam soil.",
            nutrients: "Requires nitrogen, phosphorus, and potassium.",
            moisture: "Requires ample moisture."
        },
        jute: {
            soil: "Fertile, well-drained soil.",
            nutrients: "Requires nitrogen, phosphorus, and potassium.",
            moisture: "Requires ample moisture."
        },
        coffee: {
            soil: "Well-drained, acidic soil.",
            nutrients: "Requires nitrogen, phosphorus, and potassium.",
            moisture: "Moderate moisture requirements."
        }
    };

    const [parameters, setParameters] = useState({
        nitrogen: '',
        phosphorous: '',
        potassium: '',
        temperature: '',
        humidity: '',
        ph: '',
        rainfall: '',
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
            if (i > 2) {
                value = parseFloat(value);
            }
            else {
                value = parseInt(value)
            }
            body.push(value);
        });
        console.log(body)

        const response = await fetch('http://localhost:8080/api/crop-recommendation', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });
        const res = await response.json();
        console.log(res)
        setResult(res["recommended_crop"])
    };

    useEffect(() => {
        console.log(result)
    }, [result])

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
                    {result ? (
                        <div className='YeildPredictor__result'>
                            <h1>Recommended Crop: {result}</h1>
                            <h3>Soil Type: {cropValues[result].soil}</h3>
                            <h3>Nutrient Requirements: {cropValues[result].nutrients}</h3>
                            <h3>Moisture Requirements: {cropValues[result].moisture}</h3>
                        </div>
                    ) : (
                        <>
                            <h1>Enter the parameters to get the recommended crop</h1>
                            <form onSubmit={handleSubmit}>
                                <label className="CropRecommendation__label">
                                    Nitrogen:
                                    <input className="CropRecommendation__input" name='nitrogen' type="text" value={parameters.nitrogen} onChange={onChange} placeholder='in ratio' />
                                </label>
                                <label className="CropRecommendation__label">
                                    Phosphorous:
                                    <input className="CropRecommendation__input" name='phosphorous' type="text" value={parameters.phosphorous} onChange={onChange} placeholder='in ratio' />
                                </label>
                                <label className="CropRecommendation__label">
                                    Potassium:
                                    <input className="CropRecommendation__input" name='potassium' type="text" value={parameters.potassium} onChange={onChange} placeholder='in ratio' />
                                </label>
                                <label className="CropRecommendation__label">
                                    Temperature:
                                    <input className="CropRecommendation__input" name='temperature' type="text" value={parameters.temperature} onChange={onChange} placeholder='in degree celcius' />
                                </label>
                                <label className="CropRecommendation__label">
                                    Relative Humidity:
                                    <input className="CropRecommendation__input" name='humidity' type="text" value={parameters.humidity} onChange={onChange} placeholder='in %' />
                                </label>
                                <label className="CropRecommendation__label">
                                    pH:
                                    <input className="CropRecommendation__input" name='ph' type="text" value={parameters.ph} onChange={onChange} placeholder='0 to 14' />
                                </label>
                                <label className="CropRecommendation__label">
                                    Rainfall:
                                    <input className="CropRecommendation__input" name='rainfall' type="text" value={parameters.rainfall} onChange={onChange} placeholder='in mm' />
                                </label>
                                <button type="submit">Submit</button>
                            </form>
                        </>
                    )}

                </div>
            </div>
        </div>
    );
}


export default CropRecommendation