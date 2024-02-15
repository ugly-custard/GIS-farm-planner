import React, { useState } from 'react';
import '../styles/DiseasePredictor.css';
import img from '../assets/undraw_farm_girl_dnpe (1).svg';

function DiseasePredictor() {
    const [image, setImage] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file && file.type.startsWith('image/')) {
            setImage(URL.createObjectURL(file));
            setSelectedFile(event.target.files[0])
            // console.log(event.target.files[0])
        }
    };

    const handleDrop = (event) => {
        event.preventDefault();
        const file = event.dataTransfer.files[0];
        if (file && file.type.startsWith('image/')) {
            setImage(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(typeof(selectedFile))
        if (!selectedFile) {
            alert('Please select a file first!');
            return;
        }

        const formData = new FormData();
        console.log(formData)
        formData.append('file', selectedFile);
        console.log(formData)

        try {
            const response = await fetch('http://localhost:8080/api/disease_prediction', {
                method: 'POST',
                body: formData,
                // Headers are not needed here as 'Content-Type' will be automatically set to 'multipart/form-data'
                // and the correct boundary will be added by the browser
            });
            if (response.ok) {
                const data = await response.json();
                console.log(data);
                alert('Image uploaded successfully!');
            } else {
                throw new Error('Failed to upload image');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error uploading image');
        }
    }

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
                    <img src={img} alt="" className='diseasePredictorImg' />
                )}
            </div>
            <button onClick={handleSubmit} style={{ padding: "2px 14px", margin: "5px 5px", backgroundColor: "lightgreen", borderRadius: "5px" }}>submit</button>

        </div>
    );
}

export default DiseasePredictor;
