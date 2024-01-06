
import { React, useEffect, useState } from 'react';
import { Circle, CircleMarker, MapContainer, TileLayer, Tooltip } from 'react-leaflet'
import { Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import "./map.css";


const indiaCenter = [20.5937, 78.9629]; // Center coordinates of India

const Map = () => {
    const [showMarker, setShowMarker] = useState(true);

    const [farms, setFarms] = useState({})

    const handleToggleMarker = () => {
        setShowMarker(!showMarker);
    };

    useEffect(() => {
        getFarms()
        console.log(farms)
    }, [])

    const getFarms = async () => {
        const farmData = await fetch(`http://localhost:5000/farms`).then(res => res.json())
        // console(farmData)
        setFarms(farmData[0])
    }


    return (
        <div className='Map__main'>
            <div className="map">
                <MapContainer center={indiaCenter} zoom={5} style={{ height: '400px', width: '100vw' }}>
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />

                    {/* Conditional Marker and Popup for India */}
                    {showMarker && (
                        <Marker position={indiaCenter}>
                            <Popup>
                                <div>
                                    <h3>India</h3>
                                    <p>This is India!</p>
                                </div>
                            </Popup>
                        </Marker>
                    )}

                    {Object.keys(farms).map((farm) => {
                        return (
                            <Circle
                                key={farm}
                                center={[farms["Latitude"], farms["Longitude"]]}
                                pathOptions={{ color: 'red' }}
                                radius={200}>
                                <Tooltip>Cover Crop: {farms["CoverCrop"]} | Cover Crop Group: {"CoverCropGroup"} | Grain Crop: {farms["GrainCrop"]} | Grain Crop Group: {"GrainCropGroup"}</Tooltip>
                            </Circle>
                        )
                    })}


                </MapContainer >
            </div>
            <button onClick={handleToggleMarker}>
                {showMarker ? 'Hide Marker' : 'Show Marker'}
            </button>
        </div>
    );
};

export default Map;
