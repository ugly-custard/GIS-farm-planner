
import { React, useEffect, useState } from 'react';
import { Circle, FeatureGroup, MapContainer, TileLayer, Tooltip } from 'react-leaflet'
import { Marker, Popup } from 'react-leaflet';
import "./map.css";
import 'leaflet/dist/leaflet.css';
import "leaflet-draw/dist/leaflet.draw.css"
import { EditControl } from 'react-leaflet-draw';


const indiaCenter = [20.5937, 78.9629]; // Center coordinates of India

const Map = () => {
    const [showMap, setShowMap] = useState(true);

    const [farms, setFarms] = useState([])

    const handleToggleMap = () => {
        setShowMap(!showMap);
    };

    useEffect(() => {
        getFarms()
        console.log(farms)
    }, [])

    const getFarms = async () => {
        const farmData = await fetch(`http://localhost:5000/farms`).then(res => res.json())
        // console(farmData)
        setFarms(farmData)
    }

    const _onCreated = e => {
        console.log(e)
        console.log("Latitude: ",e.layer._latlng.lat)
        console.log("Longitude: ",e.layer._latlng.lng)
    }

    const _onEdited = e => {
        console.log(e)
        console.log("Latitude: ",e.layer._latlng.lat)
        console.log("Longitude: ",e.layer._latlng.lng)
    }

    const _onDeleted = e => {
        console.log(e)
        console.log("Latitude: ",e.layer._latlng.lat)
        console.log("Longitude: ",e.layer._latlng.lng)
    }


    return (
        <div className='Map__main'>
            <div className="map" style={{ display: 'flex',flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: '90vh'}} >
                {showMap && 
                
                <MapContainer center={indiaCenter} zoom={5} style={{ height: '50vh', width: '50vw' }}>

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
                    {/* {showMarker && (
                        <Marker position={indiaCenter}>
                            <Popup>
                                <div>
                                    <h3>India</h3>
                                    <p>This is India!</p>
                                </div>
                            </Popup>
                        </Marker>
                    )} */}

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
                    {farms.map((farm) => {
                        // console.log(farm)
                        return (
                            <Marker
                                key={farm["id"]}
                                position={[farm["latitude"], farm["longitude"]]}
                                >
                                <Tooltip>Cover Crop: {farm["covercrop"]} | Cover Crop Group: {farm["covercropgroup"]} | Grain Crop: {farm["graincrop"]} | Grain Crop Group: {farm["graincropgroup"]}</Tooltip>
                            </Marker>
                        )
                    })}


                </MapContainer >
                }
            </div>
            <button onClick={handleToggleMap}>
                {showMap ? 'Hide Map' : 'Show Map'}
            </button>
        </div>
    );
};

export default Map;
