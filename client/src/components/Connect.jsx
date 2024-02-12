import React from 'react'
import "../styles/YeildPredictor.css"

function Connect() {
    return (
        <div>
            <div className="iot-device-status">
                <h1>Connect To IOT-Device</h1>
                <p className='connStat'>NOT-CONNECTED</p>
                <button>Connect now!</button>
            </div>
        </div>
    )
}

export default Connect