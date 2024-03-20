import { React, useEffect, useState } from 'react';
import { FeatureGroup, MapContainer, TileLayer, Tooltip } from 'react-leaflet'
import { Marker, Popup } from 'react-leaflet';
import "../styles/map.css";
import 'leaflet/dist/leaflet.css';
import "leaflet-draw/dist/leaflet.draw.css"
import { EditControl } from 'react-leaflet-draw';
import axios from 'axios'; ``
import PriceIndexChart from './Chart';
import _01d from '../assets/weathericons/01d.png';
import _02d from '../assets/weathericons/02d.png';
import _03d from '../assets/weathericons/03d.png';
import _04d from '../assets/weathericons/04d.png';
import _09d from '../assets/weathericons/09d.png';
import _10d from '../assets/weathericons/10d.png';
import _11d from '../assets/weathericons/11d.png';
import _13d from '../assets/weathericons/13d.png';
import _50d from '../assets/weathericons/50d.png';
import _01n from '../assets/weathericons/01n.png';
import _02n from '../assets/weathericons/02n.png';
import _03n from '../assets/weathericons/03n.png';
import _04n from '../assets/weathericons/04n.png';
import _09n from '../assets/weathericons/09n.png';
import _10n from '../assets/weathericons/10n.png';
import _11n from '../assets/weathericons/11n.png';
import _13n from '../assets/weathericons/13n.png';
import _50n from '../assets/weathericons/50n.png';

//note: lets not map farms everytime we render the map, lets just map the farms once and then update the map when we add a new farm
//or another approach could be that we get the farms using lattitude and longitude and then map the farms
//rn it maps the farm everytime the coordinates are changed very bad for perfomance my computer is lagging....

const indiaCenter = [20.5937, 78.9629]; // Center coordinates of India
const geocodeKey = "65a5b22dc9fad405466629dzc6a56a3"
const openweatherKey = "584aadc6e842033725bee4e93bbe9874"


const Map = () => {
    const [showMarker, setShowMarker] = useState(true);
    const [locationInput, setLocationInput] = useState('');
    const [latitude, setLatitude] = useState(20.5937); // [latitude, longitude]
    const [longitude, setLongitude] = useState(78.9629); // [latitude, longitude]
    const [coordinates, setCoordinates] = useState([latitude, longitude]); // [latitude, longitude]
    const [forecast, setForecast] = useState({});

    const [farms, setFarms] = useState([])

    const getWeather = () => {
        axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${openweatherKey}`)
            .then(response => {
                console.log(response.data);
                setForecast(response.data);

            })
    };

    useEffect(() => {
        getWeather();
    }, [latitude, longitude]);

    const searchLocation = () => {
        axios.get(`https://geocode.maps.co/search?q=${locationInput}&api_key=${geocodeKey}`)
            .then(response => {
                console.log(response.data);
                setLatitude(response.data[0].lat);
                setLongitude(response.data[0].lon);
                setCoordinates([response.data[0].lat, response.data[0].lon])
            })
            .catch(error => {
                console.error('Error fetching location:', error);
            });
    };

    const getMyLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                setLatitude(position.coords.latitude);
                setLongitude(position.coords.longitude);
                setCoordinates([position.coords.latitude, position.coords.longitude]);
                setUserLocation(`${position.coords.latitude},${position.coords.longitude}`);
            });
        } else {
            alert('Geolocation is not supported by this browser.');
        }
    };


    const setUserLocation = (location) => {
        localStorage.setItem('user.location', location);
    };



    const _onCreated = e => {
        console.log(e)
        console.log("Latitude: ", e.layer._latlng.lat)
        console.log("Longitude: ", e.layer._latlng.lng)
        setCoordinates([e.layer._latlng.lat, e.layer._latlng.lng])
    }

    const _onEdited = e => {
        console.log(e)
        console.log("Latitude: ", e.layer._latlng.lat)
        console.log("Longitude: ", e.layer._latlng.lng)
        setCoordinates([e.layer._latlng.lat, e.layer._latlng.lng])
    }

    const _onDeleted = e => {
        console.log(e)
        console.log("Latitude: ", e.layer._latlng.lat)
        console.log("Longitude: ", e.layer._latlng.lng)
        setCoordinates([e.layer._latlng.lat, e.layer._latlng.lng])
    }

    const HandleCoordinates = () => {
        if (latitude && longitude)
            setCoordinates([latitude, longitude])
    }

    const handleLocations = async () => {
        console.log(typeof (coordinates[0]))
        const res = await fetch(`http://localhost:5000/getnearestpoints`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ Lat: coordinates[0], Long: coordinates[1] }),
        })
        const data = await res.json()
        setFarms(data)
    }


    useEffect(() => {
        const interval = setInterval(() => {
            getMyLocation();
        }, 5000);
        return () => clearInterval(interval);
    }, [])

    return (
        <div className='Map__main'>


            <div className="map" >
                

                <div className="content">
                    <div className="forecast" id='forecast_1'>
                        
                            <h1>Main</h1>
                            {forecast.main &&
                                <div>
                                    <p>Humidity: {forecast.main.humidity}</p>
                                    <p>Pressure: {forecast.main.pressure}</p>
                                    <p>Sea_level: {forecast.main.sea_level}</p>
                                    <p>Temperature: {forecast.main.temp}</p>
                                </div>
                            }
                        
                    </div>
                    <div className="forecast" id='forecast_2'>
                        <h2>Weather</h2>
                        {forecast.weather &&
                            <div>
                                <div className="weatherIcon">
                                    {(() => {
                                        switch (forecast.weather[0].icon) {
                                            case "01d": return <img src={_01d} alt="01d" />
                                            case "02d": return <img src={_02d} alt="02d" />
                                            case "03d": return <img src={_03d} alt="03d" />
                                            case "04d": return <img src={_04d} alt="04d" />
                                            case "09d": return <img src={_09d} alt="09d" />
                                            case "10d": return <img src={_10d} alt="10d" />
                                            case "11d": return <img src={_11d} alt="11d" />
                                            case "13d": return <img src={_13d} alt="13d" />
                                            case "50d": return <img src={_50d} alt="50d" />
                                            case "01n": return <img src={_01n} alt="01n" />
                                            case "02n": return <img src={_02n} alt="02n" />
                                            case "03n": return <img src={_03n} alt="03n" />
                                            case "04n": return <img src={_04n} alt="04n" />
                                            case "09n": return <img src={_09n} alt="09n" />
                                            case "10n": return <img src={_10n} alt="10n" />
                                            case "11n": return <img src={_11n} alt="11n" />
                                            case "13n": return <img src={_13n} alt="13n" />
                                            case "50n": return <img src={_50n} alt="50n" />
                                            default: return <img src={_01d} alt="01d" />
                                        }
                                    }
                                    )()}
                                </div>
                                <p>{forecast.weather[0].main}</p>
                                <p>{forecast.weather[0].description}</p>
                            </div>
                        }
                    </div>
                    <div className="forecast" id='forecast_3'>
                        <h2>Wind Speed</h2>
                        {forecast.wind &&
                            <div>
                                <p>Wind Temp:{forecast.wind.deg}</p>
                                <p>Wind Speed:{forecast.wind.speed}</p>
                                <p>Wind Gust:{forecast.wind.gust}</p>
                            </div>
                        }
                    </div>
                    <div className="forecast" id='forecast_4'>
                        <h2>Timezone</h2>
                        {forecast.timezone &&
                            <div>
                                <p>Timezone{forecast.timezone}</p>
                                <p>Visibility{forecast.visibility}</p>
                                <p>no. of clouds:{forecast.clouds.all}</p>
                            </div>
                        }
                    </div>
                </div>

                <div className='map_map'>
                    {/* <div className="searchbar">
                        <label htmlFor="location">Location:</label>
                        <input
                            type="text"
                            id="location"
                            placeholder="Enter location"
                            value={locationInput}
                            onChange={(e) => setLocationInput(e.target.value)}
                        />
                        <button onClick={searchLocation}>Search</button>
                    </div> */}

                    <MapContainer key={coordinates.toString()} center={coordinates} zoom={10} style={{ height: '86.7vh', width: '35vw', margin: 0, borderRadius: "15px", }} className='map_container'>
                        <style>
                            {`
                            @media screen and (max-width: 768px) {
                                .map_container {
                                    width: 100vw;
                                    height: 100vh;
                                }
                            }
                            `}
                        </style>

                        <FeatureGroup>
                            <EditControl
                                position='topright'
                                onCreated={_onCreated}
                                onEdited={_onEdited}
                                onDeleted={_onDeleted}
                                draw={{
                                    rectangle: false,
                                    polyline: false,
                                    circlemarker: false,
                                    marker: false
                                }}
                            />
                        </FeatureGroup>

                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        />

                        {/* Conditional Marker and Popup for India */}
                        {showMarker && (
                            <Marker position={coordinates}>
                                <Popup>
                                    <h2></h2>
                                    <p>You're here</p>

                                </Popup>
                            </Marker>
                        )}

                        {/* {Object.keys(farms).map((farm) => {
                        return (
                            <Circle
                                key={farm}
                                center={[farms["Latitude"], farms["Longitude"]]}
                                pathOptions={{ color: 'red' }}
                                radius={200}>
                                <Tooltip>Cover Crop: {farms["CoverCrop"]} | Cover Crop Group: {farms["CoverCropGroup"]} | Grain Crop: {farms["GrainCrop"]} | Grain Crop Group: {farms["GrainCropGroup"]}</Tooltip>
                            </Circle>
                        )
                    })} */}

                        {/* Had to do this to map the array, Before the endpoint was returning an object and now it returns an array */}
                        {farms.length != 0 && farms.map((farm) => {
                            console.log(farm["latitude"])
                            return (
                                <Marker
                                    key={farm["id"]}
                                    position={[farm["latitude"], farm["longitude"]]}
                                    pathOptions={{ color: 'red' }}

                                >
                                    <Tooltip>You're here</Tooltip>
                                </Marker>
                            )
                        })}
                    </MapContainer >
                    {/* <button onClick={handleLocations}>
                        Get Nearest Points
                    </button> */}
                    {/* <button onClick={getMyLocation}>
                        Get My Location
                    </button>
                </div>

                <div className="content">
                    <div className="forecast">
                        <div className="main">
                            <h1>Main</h1>
                            {forecast.main &&
                                <div>
                                    <p>{forecast.main.humitdy}</p>
                                    <p>{forecast.main.pressure}</p>
                                    <p>{forecast.main.sea_level}</p>
                                    <p>{forecast.main.temp}</p>
                                </div>
                            }
                        </div>
                    </div>
                    <div className="forecast">
                        <h2>Weather</h2>
                        {forecast.weather &&
                            <div>
                                <img src={`../assets/weathericons/${forecast.weather[0].icon}.png`} alt={forecast.weather[0].icon} />
                                <p>{forecast.weather[0].main}</p>
                                <p>{forecast.weather[0].description}</p>
                            </div>
                        }
                    </div>
                    <div className="forecast">
                        <h2>Wind Speed</h2>
                        {forecast.wind &&
                            <div>
                                <p>{forecast.wind.deg}</p>
                                <p>{forecast.wind.speed}</p>
                                <p>{forecast.wind.gust}</p>
                            </div>
                        }
                    </div>
                    <div className="forecast">
                        <h2>Timezone</h2>
                        {forecast.timezone &&
                            <div>
                                <p>{forecast.timezone}</p>
                                <p>{forecast.visibility}</p>
                                <p>no. of clouds:{forecast.clouds.all}</p>
                            </div>
                        }
                    </div>
                    </button> */}
                </div>
                {/* Tooltip content */}
                {/* {farms.length != 0 && farms.map((farm) => {
                    return (
                        <div key={farm["id"]} className="tooltip-item">
                            <h3>{farm["siteinfor"]}</h3>
                            <ul>
                                <li>Control Description: {farm["controldescription"]}</li>
                                <li>Conservation Type: {farm["conservation_type"]}</li>
                                <li>Cover Crop: {farm["covercrop"]}</li>
                                <li>Cover Crop Group: {farm["covercropgroup"]}</li>
                                <li>Grain Crop: {farm["graincrop"]}</li>
                                <li>Grain Crop Group: {farm["sandperc"]}</li>
                                <li>Percent of Sand: {farm["graincropgroupsandperc"]}</li>
                                <li>Percent of Silt: {farm["siltperc"]}</li>
                                <li>Texture: {farm["texture"]}</li>
                                <li>Fertilization Control: {farm["fertilization_c"]}</li>
                                <li>Fertilization Treatment: {farm["fertilization_t"]}</li>
                                <li>Grain Crop Group: {farm["graincropgroup"]}</li>
                            </ul>
                        </div>
                    )
                })} */}
            </div>

        </div >
    );
};

export default Map;
