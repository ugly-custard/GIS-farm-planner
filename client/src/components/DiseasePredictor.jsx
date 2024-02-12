import React, { useState } from 'react';
import '../styles/DiseasePredictor.css';
import img from '../assets/undraw_farm_girl_dnpe (1).svg';

function DiseasePredictor() {
    const [image, setImage] = useState(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file && file.type.startsWith('image/')) {
            setImage(URL.createObjectURL(file));
        }
    };

    const handleDrop = (event) => {
        event.preventDefault();
        const file = event.dataTransfer.files[0];
        if (file && file.type.startsWith('image/')) {
            setImage(URL.createObjectURL(file));
        }
    };

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    const handleCameraClick = () => {
        const constraints = {
            video: true,
        };

        navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
            const video = document.createElement('video');
            video.srcObject = stream;
            video.play();

            const modal = document.createElement('div');
            modal.style.position = 'fixed';
            modal.style.top = '0';
            modal.style.left = '0';
            modal.style.width = '100%';
            modal.style.height = '100%';
            modal.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
            modal.style.display = 'flex';
            modal.style.justifyContent = 'center';
            modal.style.alignItems = 'center';

            modal.appendChild(video);

            const captureButton = document.createElement('button');
            captureButton.innerText = 'Capture';
            captureButton.style.position = 'absolute';
            captureButton.style.bottom = '20px';
            captureButton.style.left = '50%';
            captureButton.style.transform = 'translateX(-50%)';
            captureButton.style.padding = '10px 20px';
            captureButton.style.backgroundColor = 'white';
            captureButton.style.border = 'none';
            captureButton.style.borderRadius = '5px';
            captureButton.style.cursor = 'pointer';

            captureButton.addEventListener('click', () => {
                const canvas = document.createElement('canvas');
                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;
                const context = canvas.getContext('2d');
                context.drawImage(video, 0, 0, canvas.width, canvas.height);
                const capturedImage = canvas.toDataURL('image/png');
                setImage(capturedImage);
                modal.remove();
            });

            modal.appendChild(captureButton);
            document.body.appendChild(modal);
        });
    };

    return (
        <div className="DiseasePredictor__container">
            <p>Upload an image of the crop to predict the disease</p>
            <div className='DiseasePredictor__Buttons'>
            <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="DiseasePredictor__fileInput"
            />
            <p>or</p>
            <button onClick={handleCameraClick} className="DiseasePredictor__cameraButton">
                Turn on Camera
            </button>
            </div>
            <div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                className="DiseasePredictor__dropZone"
            >
                {image ? (
                    <img
                        src={image}
                        alt="User Image"
                        style={{ width: '100%', height: '100%' }}
                        className="DiseasePredictor__image"
                    />
                ) : (
                    <img src={img} alt="" className='diseasePredictorImg'/>
                )}
            </div>
            
        </div>
    );
}

export default DiseasePredictor;
