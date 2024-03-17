import React, { useState } from 'react';
import '../styles/DiseasePredictor.css';
import img from '../assets/undraw_farm_girl_dnpe (1).svg';

function DiseasePredictor() {
    const [image, setImage] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [result, setResult] = useState("");

    const diseases = {
        "Apple___Apple_scab": {
            prevention: "Prevention: \n\n1. Plant resistant varieties when available.\n2. Rake and destroy infected leaves to reduce the number of fungal spores available to start the disease cycle over again next spring.\n3. Water in the evening or early morning hours (avoid overhead irrigation) to give the leaves time to dry out before infection can occur.\n4. Apply a fungicide to protect new growth as it emerges and throughout the growing season.",
            treatment: "Treatment: \n\n1. Apply a fungicide to protect new growth as it emerges and throughout the growing season.\n2. Rake and destroy infected leaves to reduce the number of fungal spores available to start the disease cycle over again next spring."
        },
        "Apple___Black_rot": {
            prevention: "Prevention: \n\n1. Prune trees to allow good air circulation.\n2. Remove mummified fruit from trees and the ground.\n3. Apply a fungicide to protect new growth as it emerges and throughout the growing season.",
            treatment: "Treatment: \n\n1. Apply a fungicide to protect new growth as it emerges and throughout the growing season.\n2. Prune trees to allow good air circulation."
        },
        "Apple___Cedar_apple_rust": {
            prevention: "Prevention: \n\n1. Plant resistant varieties when available.\n2. Remove nearby red cedar trees if possible.\n3. Apply a fungicide to protect new growth as it emerges and throughout the growing season.",
            treatment: "Treatment: \n\n1. Apply a fungicide to protect new growth as it emerges and throughout the growing season."
        },
        "Apple___healthy": {
            prevention: "Prevention: \n\n1. Plant resistant varieties when available.\n2. Prune trees to allow good air circulation.\n3. Remove mummified fruit from trees and the ground.\n4. Rake and destroy infected leaves to reduce the number of fungal spores available to start the disease cycle over again next spring.",
            treatment: "Treatment: \n\n1. Apply a fungicide to protect new growth as it emerges and throughout the growing season.\n2. Prune trees to allow good air circulation.\n3. Remove mummified fruit from trees and the ground."
        },
        "Blueberry___healthy":{
            prevention: "Prevention: \n\n1. Plant resistant varieties when available.\n2. Prune trees to allow good air circulation.\n3. Remove mummified fruit from trees and the ground.\n4. Rake and destroy infected leaves to reduce the number of fungal spores available to start the disease cycle over again next spring.",
            treatment: "Treatment: \n\n1. Apply a fungicide to protect new growth as it emerges and throughout the growing season.\n2. Prune trees to allow good air circulation.\n3. Remove mummified fruit from trees and the ground."
        },
        "Cherry_(including_sour)_Powdery_mildew": {
            prevention: "Prevention: \n\n1. Plant resistant varieties when available.\n2. Prune trees to allow good air circulation.\n3. Remove mummified fruit from trees and the ground.\n4. Rake and destroy infected leaves to reduce the number of fungal spores available to start the disease cycle over again next spring.",
            treatment: "Treatment: \n\n1. Apply a fungicide to protect new growth as it emerges and throughout the growing season.\n2. Prune trees to allow good air circulation.\n3. Remove mummified fruit from trees and the ground."
        },
        "Cherry_(including_sour)_healthy": {
            prevention: "Prevention: \n\n1. Plant resistant varieties when available.\n2. Prune trees to allow good air circulation.\n3. Remove mummified fruit from trees and the ground.\n4. Rake and destroy infected leaves to reduce the number of fungal spores available to start the disease cycle over again next spring.",
            treatment: "Treatment: \n\n1. Apply a fungicide to protect new growth as it emerges and throughout the growing season.\n2. Prune trees to allow good air circulation.\n3. Remove mummified fruit from trees and the ground."
        },
    "Corn_(maize)_Cercospora_leaf_spot Gray_leaf_spot": {
        prevention: "Prevention: \n\n1. Plant resistant varieties when available.\n2. Prune trees to allow good air circulation.\n3. Remove mummified fruit from trees and the ground.\n4. Rake and destroy infected leaves to reduce the number of fungal spores available to start the disease cycle over again next spring.",
        treatment: "Treatment: \n\n1. Apply a fungicide to protect new growth as it emerges and throughout the growing season.\n2. Prune trees to allow good air circulation.\n3. Remove mummified fruit from trees and the ground."
    },
    
        "Corn_(maize)_Common_rust":{
            prevention: "Prevention: \n\n1. Plant resistant varieties when available.\n2. Prune trees to allow good air circulation.\n3. Remove mummified fruit from trees and the ground.\n4. Rake and destroy infected leaves to reduce the number of fungal spores available to start the disease cycle over again next spring.",
            treatment: "Treatment: \n\n1. Apply a fungicide to protect new growth as it emerges and throughout the growing season.\n2. Prune trees to allow good air circulation.\n3. Remove mummified fruit from trees and the ground."
        },
        "Corn_(maize)_Northern_Leaf_Blight": {
            prevention: "Prevention: \n\n1. Plant resistant varieties when available.\n2. Prune trees to allow good air circulation.\n3. Remove mummified fruit from trees and the ground.\n4. Rake and destroy infected leaves to reduce the number of fungal spores available to start the disease cycle over again next spring.",
            treatment: "Treatment: \n\n1. Apply a fungicide to protect new growth as it emerges and throughout the growing season.\n2. Prune trees to allow good air circulation.\n3. Remove mummified fruit from trees and the ground."
        },
        "Corn_(maize)_healthy": {
            prevention: "Prevention: \n\n1. Plant resistant varieties when available.\n2. Prune trees to allow good air circulation.\n3. Remove mummified fruit from trees and the ground.\n4. Rake and destroy infected leaves to reduce the number of fungal spores available to start the disease cycle over again next spring.",
            treatment: "Treatment: \n\n1. Apply a fungicide to protect new growth as it emerges and throughout the growing season.\n2. Prune trees to allow good air circulation.\n3. Remove mummified fruit from trees and the ground."
        },
        "Grape___Black_rot": {
            prevention: "Prevention: \n\n1. Plant resistant varieties when available.\n2. Prune trees to allow good air circulation.\n3. Remove mummified fruit from trees and the ground.\n4. Rake and destroy infected leaves to reduce the number of fungal spores available to start the disease cycle over again next spring.",
            treatment: "Treatment: \n\n1. Apply a fungicide to protect new growth as it emerges and throughout the growing season.\n2. Prune trees to allow good air circulation.\n3. Remove mummified fruit from trees and the ground."
        },
        "Grape__Esca(Black_Measles)": {
            prevention: "Prevention: \n\n1. Plant resistant varieties when available.\n2. Prune trees to allow good air circulation.\n3. Remove mummified fruit from trees and the ground.\n4. Rake and destroy infected leaves to reduce the number of fungal spores available to start the disease cycle over again next spring.",
            treatment: "Treatment: \n\n1. Apply a fungicide to protect new growth as it emerges and throughout the growing season.\n2. Prune trees to allow good air circulation.\n3. Remove mummified fruit from trees and the ground."
        },
        "Grape__Leaf_blight(Isariopsis_Leaf_Spot)": {
            prevention: "Prevention: \n\n1. Plant resistant varieties when available.\n2. Prune trees to allow good air circulation.\n3. Remove mummified fruit from trees and the ground.\n4. Rake and destroy infected leaves to reduce the number of fungal spores available to start the disease cycle over again next spring.",
            treatment: "Treatment: \n\n1. Apply a fungicide to protect new growth as it emerges and throughout the growing season.\n2. Prune trees to allow good air circulation.\n3. Remove mummified fruit from trees and the ground."
        },
        
        "Grape___healthy": {
            prevention: "Prevention: \n\n1. Plant resistant varieties when available.\n2. Prune trees to allow good air circulation.\n3. Remove mummified fruit from trees and the ground.\n4. Rake and destroy infected leaves to reduce the number of fungal spores available to start the disease cycle over again next spring.",
            treatment: "Treatment: \n\n1. Apply a fungicide to protect new growth as it emerges and throughout the growing season.\n2. Prune trees to allow good air circulation.\n3. Remove mummified fruit from trees and the ground."
        },
        "Orange__Haunglongbing(Citrus_greening)": {
            prevention: "Prevention: \n\n1. Plant resistant varieties when available.\n2. Prune trees to allow good air circulation.\n3. Remove mummified fruit from trees and the ground.\n4. Rake and destroy infected leaves to reduce the number of fungal spores available to start the disease cycle over again next spring.",
            treatment: "Treatment: \n\n1. Apply a fungicide to protect new growth as it emerges and throughout the growing season.\n2. Prune trees to allow good air circulation.\n3. Remove mummified fruit from trees and the ground."
        },
        "Peach___Bacterial_spot": {
            prevention: "Prevention: \n\n1. Plant resistant varieties when available.\n2. Prune trees to allow good air circulation.\n3. Remove mummified fruit from trees and the ground.\n4. Rake and destroy infected leaves to reduce the number of fungal spores available to start the disease cycle over again next spring.",
            treatment: "Treatment: \n\n1. Apply a fungicide to protect new growth as it emerges and throughout the growing season.\n2. Prune trees to allow good air circulation.\n3. Remove mummified fruit from trees and the ground."
        },
        "Peach___healthy": {
            prevention: "Prevention: \n\n1. Plant resistant varieties when available.\n2. Prune trees to allow good air circulation.\n3. Remove mummified fruit from trees and the ground.\n4. Rake and destroy infected leaves to reduce the number of fungal spores available to start the disease cycle over again next spring.",
            treatment: "Treatment: \n\n1. Apply a fungicide to protect new growth as it emerges and throughout the growing season.\n2. Prune trees to allow good air circulation.\n3. Remove mummified fruit from trees and the ground."
        },
        "Pepper, bell__Bacterial_spot": {
            prevention: "Prevention: \n\n1. Plant resistant varieties when available.\n2. Prune trees to allow good air circulation.\n3. Remove mummified fruit from trees and the ground.\n4. Rake and destroy infected leaves to reduce the number of fungal spores available to start the disease cycle over again next spring.",
            treatment: "Treatment: \n\n1. Apply a fungicide to protect new growth as it emerges and throughout the growing season.\n2. Prune trees to allow good air circulation.\n3. Remove mummified fruit from trees and the ground."
        },
        "Pepper, bell__healthy": {
            prevention: "Prevention: \n\n1. Plant resistant varieties when available.\n2. Prune trees to allow good air circulation.\n3. Remove mummified fruit from trees and the ground.\n4. Rake and destroy infected leaves to reduce the number of fungal spores available to start the disease cycle over again next spring.",
            treatment: "Treatment: \n\n1. Apply a fungicide to protect new growth as it emerges and throughout the growing season.\n2. Prune trees to allow good air circulation.\n3. Remove mummified fruit from trees and the ground."
        },
        "Potato___Early_blight": {
            prevention: "Prevention: \n\n1. Plant resistant varieties when available.\n2. Prune trees to allow good air circulation.\n3. Remove mummified fruit from trees and the ground.\n4. Rake and destroy infected leaves to reduce the number of fungal spores available to start the disease cycle over again next spring.",
            treatment: "Treatment: \n\n1. Apply a fungicide to protect new growth as it emerges and throughout the growing season.\n2. Prune trees to allow good air circulation.\n3. Remove mummified fruit from trees and the ground."
        },
        "Potato___Late_blight": {
            prevention: "Prevention: \n\n1. Plant resistant varieties when available.\n2. Prune trees to allow good air circulation.\n3. Remove mummified fruit from trees and the ground.\n4. Rake and destroy infected leaves to reduce the number of fungal spores available to start the disease cycle over again next spring.",
            treatment: "Treatment: \n\n1. Apply a fungicide to protect new growth as it emerges and throughout the growing season.\n2. Prune trees to allow good air circulation.\n3. Remove mummified fruit from trees and the ground."
        },
        "Potato___healthy": {
            prevention: "Prevention: \n\n1. Plant resistant varieties when available.\n2. Prune trees to allow good air circulation.\n3. Remove mummified fruit from trees and the ground.\n4. Rake and destroy infected leaves to reduce the number of fungal spores available to start the disease cycle over again next spring.",
            treatment: "Treatment: \n\n1. Apply a fungicide to protect new growth as it emerges and throughout the growing season.\n2. Prune trees to allow good air circulation.\n3. Remove mummified fruit from trees and the ground."
        },
        "Raspberry___healthy": {
            prevention: "Prevention: \n\n1. Plant resistant varieties when available.\n2. Prune trees to allow good air circulation.\n3. Remove mummified fruit from trees and the ground.\n4. Rake and destroy infected leaves to reduce the number of fungal spores available to start the disease cycle over again next spring.",
            treatment: "Treatment: \n\n1. Apply a fungicide to protect new growth as it emerges and throughout the growing season.\n2. Prune trees to allow good air circulation.\n3. Remove mummified fruit from trees and the ground."
        },
        "Soybean___healthy": {
            prevention: "Prevention: \n\n1. Plant resistant varieties when available.\n2. Prune trees to allow good air circulation.\n3. Remove mummified fruit from trees and the ground.\n4. Rake and destroy infected leaves to reduce the number of fungal spores available to start the disease cycle over again next spring.",
            treatment: "Treatment: \n\n1. Apply a fungicide to protect new growth as it emerges and throughout the growing season.\n2. Prune trees to allow good air circulation.\n3. Remove mummified fruit from trees and the ground."
        },
        "Squash___Powdery_mildew": {
            prevention: "Prevention: \n\n1. Plant resistant varieties when available.\n2. Prune trees to allow good air circulation.\n3. Remove mummified fruit from trees and the ground.\n4. Rake and destroy infected leaves to reduce the number of fungal spores available to start the disease cycle over again next spring.",
            treatment: "Treatment: \n\n1. Apply a fungicide to protect new growth as it emerges and throughout the growing season.\n2. Prune trees to allow good air circulation.\n3. Remove mummified fruit from trees and the ground."
        },
        "Strawberry___Leaf_scorch": {
            prevention: "Prevention: \n\n1. Plant resistant varieties when available.\n2. Prune trees to allow good air circulation.\n3. Remove mummified fruit from trees and the ground.\n4. Rake and destroy infected leaves to reduce the number of fungal spores available to start the disease cycle over again next spring.",
            treatment: "Treatment: \n\n1. Apply a fungicide to protect new growth as it emerges and throughout the growing season.\n2. Prune trees to allow good air circulation.\n3. Remove mummified fruit from trees and the ground."
        },
        "Strawberry___healthy": {
            prevention: "Prevention: \n\n1. Plant resistant varieties when available.\n2. Prune trees to allow good air circulation.\n3. Remove mummified fruit from trees and the ground.\n4. Rake and destroy infected leaves to reduce the number of fungal spores available to start the disease cycle over again next spring.",
            treatment: "Treatment: \n\n1. Apply a fungicide to protect new growth as it emerges and throughout the growing season.\n2. Prune trees to allow good air circulation.\n3. Remove mummified fruit from trees and the ground."
        },
        "Tomato___Bacterial_spot": {
            prevention: "Prevention: \n\n1. Plant resistant varieties when available.\n2. Prune trees to allow good air circulation.\n3. Remove mummified fruit from trees and the ground.\n4. Rake and destroy infected leaves to reduce the number of fungal spores available to start the disease cycle over again next spring.",
            treatment: "Treatment: \n\n1. Apply a fungicide to protect new growth as it emerges and throughout the growing season.\n2. Prune trees to allow good air circulation.\n3. Remove mummified fruit from trees and the ground."
        },
        "Tomato___Early_blight": {
            prevention: "Prevention: \n\n1. Plant resistant varieties when available.\n2. Prune trees to allow good air circulation.\n3. Remove mummified fruit from trees and the ground.\n4. Rake and destroy infected leaves to reduce the number of fungal spores available to start the disease cycle over again next spring.",
            treatment: "Treatment: \n\n1. Apply a fungicide to protect new growth as it emerges and throughout the growing season.\n2. Prune trees to allow good air circulation.\n3. Remove mummified fruit from trees and the ground."
        },
        "Tomato___Late_blight": {
            prevention: "Prevention: \n\n1. Plant resistant varieties when available.\n2. Prune trees to allow good air circulation.\n3. Remove mummified fruit from trees and the ground.\n4. Rake and destroy infected leaves to reduce the number of fungal spores available to start the disease cycle over again next spring.",
            treatment: "Treatment: \n\n1. Apply a fungicide to protect new growth as it emerges and throughout the growing season.\n2. Prune trees to allow good air circulation.\n3. Remove mummified fruit from trees and the ground."
        },
        "Tomato___Leaf_Mold": {
            prevention: "Prevention: \n\n1. Plant resistant varieties when available.\n2. Prune trees to allow good air circulation.\n3. Remove mummified fruit from trees and the ground.\n4. Rake and destroy infected leaves to reduce the number of fungal spores available to start the disease cycle over again next spring.",
            treatment: "Treatment: \n\n1. Apply a fungicide to protect new growth as it emerges and throughout the growing season.\n2. Prune trees to allow good air circulation.\n3. Remove mummified fruit from trees and the ground."
        },
        "Tomato___Septoria_leaf_spot": {
            prevention: "Prevention: \n\n1. Plant resistant varieties when available.\n2. Prune trees to allow good air circulation.\n3. Remove mummified fruit from trees and the ground.\n4. Rake and destroy infected leaves to reduce the number of fungal spores available to start the disease cycle over again next spring.",
            treatment: "Treatment: \n\n1. Apply a fungicide to protect new growth as it emerges and throughout the growing season.\n2. Prune trees to allow good air circulation.\n3. Remove mummified fruit from trees and the ground."
        },
        "Tomato___Spider_mites_Two- spotted_spider_mite": {
            prevention: "Prevention: \n\n1. Plant resistant varieties when available.\n2. Prune trees to allow good air circulation.\n3. Remove mummified fruit from trees and the ground.\n4. Rake and destroy infected leaves to reduce the number of fungal spores available to start the disease cycle over again next spring.",
            treatment: "Treatment: \n\n1. Apply a fungicide to protect new growth as it emerges and throughout the growing season.\n2. Prune trees to allow good air circulation.\n3. Remove mummified fruit from trees and the ground."
        },
        "Tomato___Target_Spot": {
            prevention: "Prevention: \n\n1. Plant resistant varieties when available.\n2. Prune trees to allow good air circulation.\n3. Remove mummified fruit from trees and the ground.\n4. Rake and destroy infected leaves to reduce the number of fungal spores available to start the disease cycle over again next spring.",
            treatment: "Treatment: \n\n1. Apply a fungicide to protect new growth as it emerges and throughout the growing season.\n2. Prune trees to allow good air circulation.\n3. Remove mummified fruit from trees and the ground."
        },
        "Tomato___Tomato_Yellow_Leaf_Curl_Virus": {
            prevention: "Prevention: \n\n1. Plant resistant varieties when available.\n2. Prune trees to allow good air circulation.\n3. Remove mummified fruit from trees and the ground.\n4. Rake and destroy infected leaves to reduce the number of fungal spores available to start the disease cycle over again next spring.",
            treatment: "Treatment: \n\n1. Apply a fungicide to protect new growth as it emerges and throughout the growing season.\n2. Prune trees to allow good air circulation.\n3. Remove mummified fruit from trees and the ground."
        },
        "Tomato___Tomato_mosaic_virus": {
            prevention: "Prevention: \n\n1. Plant resistant varieties when available.\n2. Prune trees to allow good air circulation.\n3. Remove mummified fruit from trees and the ground.\n4. Rake and destroy infected leaves to reduce the number of fungal spores available to start the disease cycle over again next spring.",
            treatment: "Treatment: \n\n1. Apply a fungicide to protect new growth as it emerges and throughout the growing season.\n2. Prune trees to allow good air circulation.\n3. Remove mummified fruit from trees and the ground."
        },
        "Tomato___healthy": {
            prevention: "Prevention: \n\n1. Plant resistant varieties when available.\n2. Prune trees to allow good air circulation.\n3. Remove mummified fruit from trees and the ground.\n4. Rake and destroy infected leaves to reduce the number of fungal spores available to start the disease cycle over again next spring.",
            treatment: "Treatment: \n\n1. Apply a fungicide to protect new growth as it emerges and throughout the growing season.\n2. Prune trees to allow good air circulation.\n3. Remove mummified fruit from trees and the ground."
        }
    };
        

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
        console.log(typeof (selectedFile))
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
                setResult(data["result"]);
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
            {result ? (
                <div className="DiseasePredictor__result">
                    <h3>Result: {result}</h3>
                    <p>Prevention: {diseases[result]?.prevention}</p>
                    <p>Treatment: {diseases[result]?.treatment}</p>
                </div>
            ) : (
                <>
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
                </>
            )}


        </div>
    );
}

export default DiseasePredictor;
