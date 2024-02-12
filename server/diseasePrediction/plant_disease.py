import torch
import torchvision.transforms as transforms
from PIL import Image
import matplotlib.pyplot as plt

from Plant_Disease_Identification import Plant_Disease_Model2


class_labels = ['Apple___Apple_scab', 'Apple___Black_rot', 'Apple___Cedar_apple_rust', 'Apple___healthy', 'Blueberry___healthy', 'Cherry_(including_sour)___Powdery_mildew', 'Cherry_(including_sour)___healthy', 'Corn_(maize)___Cercospora_leaf_spot Gray_leaf_spot', 'Corn_(maize)___Common_rust_', 'Corn_(maize)___Northern_Leaf_Blight', 'Corn_(maize)___healthy', 'Grape___Black_rot', 'Grape___Esca_(Black_Measles)', 'Grape___Leaf_blight_(Isariopsis_Leaf_Spot)', 'Grape___healthy', 'Orange___Haunglongbing_(Citrus_greening)', 'Peach___Bacterial_spot', 'Peach___healthy', 'Pepper,_bell___Bacterial_spot', 'Pepper,_bell___healthy', 'Potato___Early_blight', 'Potato___Late_blight', 'Potato___healthy', 'Raspberry___healthy', 'Soybean___healthy', 'Squash___Powdery_mildew', 'Strawberry___Leaf_scorch', 'Strawberry___healthy', 'Tomato___Bacterial_spot', 'Tomato___Early_blight', 'Tomato___Late_blight', 'Tomato___Leaf_Mold', 'Tomato___Septoria_leaf_spot', 'Tomato___Spider_mites Two-spotted_spider_mite', 'Tomato___Target_Spot', 'Tomato___Tomato_Yellow_Leaf_Curl_Virus', 'Tomato___Tomato_mosaic_virus', 'Tomato___healthy'] # List of class labels

transform = transforms.Compose(
    [transforms.Resize(size = 128),
     transforms.ToTensor()])


def predict_image(image_path, model):
   
    img = Image.open(image_path) 
    img = transform(img).unsqueeze(0)
    with torch.no_grad():
        model.eval()
        output = model(img)
        _, predicted = torch.max(output, 1)
        predicted_label = class_labels[predicted.item()]
    return predicted_label


model = Plant_Disease_Model2()  
model.load_state_dict(torch.load('plantDisease-resnet34.pth'))
model.eval()


image_paths = ['./test_data/PotatoEarlyBlight1.jpg', './test_data/AppleCedarRust2.jpg', './test_data/AppleScab1.jpg']
for image_path in image_paths:
    predicted_label = predict_image(image_path, model)
    img = Image.open(image_path)
    plt.imshow(img)
    plt.title('Predicted label: ' + predicted_label)
    plt.show()
