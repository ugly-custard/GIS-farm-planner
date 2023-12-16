
import { React, useState } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet'
import { Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import "./map.css";


const indiaCenter = [20.5937, 78.9629]; // Center coordinates of India

const Map = () => {
    const [showMarker, setShowMarker] = useState(true);

    const handleToggleMarker = () => {
        setShowMarker(!showMarker);
    };

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


                </MapContainer >
            </div>
            <button onClick={handleToggleMarker}>
                {showMarker ? 'Hide Marker' : 'Show Marker'}
            </button>
        </div>
    );
};

export default Map;
