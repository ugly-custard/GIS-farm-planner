import { React, useEffect, useState } from 'react';
import { FeatureGroup, MapContainer, TileLayer, Tooltip } from 'react-leaflet'
import { Marker, Popup } from 'react-leaflet';
import "./map.css";
import 'leaflet/dist/leaflet.css';
import "leaflet-draw/dist/leaflet.draw.css"
import { EditControl } from 'react-leaflet-draw';
import axios from 'axios';

//note: lets not map farms everytime we render the map, lets just map the farms once and then update the map when we add a new farm
//or another approach could be that we get the farms using lattitude and longitude and then map the farms
//rn it maps the farm everytime the coordinates are changed very bad for perfomance my computer is lagging....

const indiaCenter = [20.5937, 78.9629]; // Center coordinates of India

const Map = () => {
    const [showMarker, setShowMarker] = useState(false);
    const [locationInput, setLocationInput] = useState(''); 
    const [latitude, setLatitude] = useState(20.5937); // [latitude, longitude]
    const [longitude, setLongitude] = useState(78.9629); // [latitude, longitude]
    const [coordinates, setCoordinates] = useState([latitude, longitude]); // [latitude, longitude]

    const [farms, setFarms] = useState([])

    const searchLocation = () => {
        axios.get(`https://geocode.maps.co/search?q=${locationInput}&api_key=65a5b22dc9fad405466629dzc6a56a3`)
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
        console.log(coordinates)
        console.log(farms)
    }, [farms])

    return (
        <div className='Map__main'>
            <label htmlFor="location">Location:</label>
            <input
                type="text"
                id="location"
                placeholder="Enter location"
                value={locationInput}
                onChange={(e) => setLocationInput(e.target.value)}
            />
            <button onClick={searchLocation}>Search</button>

            <div className="map" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: '90vh' }} >
                <MapContainer key={coordinates.toString()} center={coordinates} zoom={5} style={{ height: '50vh', width: '50vw' }}>

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
                                add location name based on coordinates in h2 and coordinates in p
                                <h2></h2>
                                <p>Latitude: {coordinates[0]}, longitude: {coordinates[1]}</p>
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
                                <Tooltip>Cover Crop: {farm["covercrop"]} | Cover Crop Group: {farm["covercropgroup"]} | Grain Crop: {farm["graincrop"]} | Grain Crop Group: {farm["graincropgroup"]}</Tooltip>
                            </Marker>
                        )
                    })}
                </MapContainer >

                <div className="content">
                    <h1>info</h1>
                {/* Tooltip content */}
                {farms.length != 0 && farms.map((farm) => {
                    return (
                        <div key={farm["id"]} className="tooltip-item">
                            <p>Cover Crop: {farm["covercrop"]}</p>
                            <p>Cover Crop Group: {farm["covercropgroup"]}</p>
                            <p>Grain Crop: {farm["graincrop"]}</p>
                            <p>Grain Crop Group: {farm["graincropgroup"]}</p>
                        </div>
                    )
                })}
            </div>
            </div>

            

            <button onClick={() => setShowMarker(!showMarker)}>
                {showMarker ? 'Hide Marker' : 'Show Marker'}
            </button>

            <button onClick={handleLocations}>
                Get Nearest Points
            </button>
        </div >
    );
};

export default Map;
