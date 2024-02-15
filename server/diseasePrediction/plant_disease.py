import cv2
import torch
import numpy as np
from PIL import Image
from torchvision import transforms

from diseasePrediction.Plant_Disease_Identification import Plant_Disease_Model2


class_labels = ['Apple___Apple_scab', 'Apple___Black_rot', 'Apple___Cedar_apple_rust', 'Apple___healthy', 'Blueberry___healthy', 'Cherry_(including_sour)___Powdery_mildew', 'Cherry_(including_sour)___healthy', 'Corn_(maize)___Cercospora_leaf_spot Gray_leaf_spot', 'Corn_(maize)___Common_rust_', 'Corn_(maize)___Northern_Leaf_Blight', 'Corn_(maize)___healthy', 'Grape___Black_rot', 'Grape___Esca_(Black_Measles)', 'Grape___Leaf_blight_(Isariopsis_Leaf_Spot)', 'Grape___healthy', 'Orange___Haunglongbing_(Citrus_greening)', 'Peach___Bacterial_spot', 'Peach___healthy', 'Pepper,_bell___Bacterial_spot', 'Pepper,_bell___healthy', 'Potato___Early_blight', 'Potato___Late_blight', 'Potato___healthy', 'Raspberry___healthy', 'Soybean___healthy', 'Squash___Powdery_mildew', 'Strawberry___Leaf_scorch', 'Strawberry___healthy', 'Tomato___Bacterial_spot', 'Tomato___Early_blight', 'Tomato___Late_blight', 'Tomato___Leaf_Mold', 'Tomato___Septoria_leaf_spot', 'Tomato___Spider_mites Two-spotted_spider_mite', 'Tomato___Target_Spot', 'Tomato___Tomato_Yellow_Leaf_Curl_Virus', 'Tomato___Tomato_mosaic_virus', 'Tomato___healthy'] # List of class labels


class diseasePredictor():
    def __init__(self):
        self.transform = transforms.Compose(
            [transforms.Resize(size = 128),
             transforms.ToTensor()]
        )
        self.model = Plant_Disease_Model2()  
        self.model.load_state_dict(torch.load('diseasePrediction/plantDisease-resnet34.pth'))
        self.model.eval()


    def processImg(self, img):
        # img2 = img.copy()
        lab = cv2.cvtColor(img, cv2.COLOR_BGR2LAB)

        a_channel = lab[:,:,1]
        _, th = cv2.threshold(a_channel,127,255,cv2.THRESH_BINARY_INV+cv2.THRESH_OTSU)
        masked  = cv2.bitwise_and(img, img, mask = th)

        grey = cv2.cvtColor(masked, cv2.COLOR_BGR2GRAY)
        blur = cv2.GaussianBlur(grey, (5, 5), cv2.BORDER_DEFAULT)
        _, thresh = cv2.threshold(blur, 127, 255, cv2.THRESH_BINARY+cv2.THRESH_OTSU)

        kernel = np.ones((3, 3), np.uint8)
        opening = cv2.morphologyEx(thresh, cv2.MORPH_OPEN, kernel, iterations=2)
        sure_bg = cv2.dilate(opening, kernel, iterations=3)

        dist_transform = cv2.distanceTransform(sure_bg, cv2.DIST_L2, 3)
        ret, sure_fg = cv2.threshold(dist_transform, 0.1*dist_transform.max(), 255, 0)

        edges = cv2.Canny(np.uint8(sure_fg), 50, 100)
        contours, _ = cv2.findContours(edges, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_NONE)
        if len(contours) != 0:
            c = max(contours, key = cv2.contourArea)
            x,y,w,h = cv2.boundingRect(c)

            cv2.rectangle(img,(x,y),(x+w,y+h),(0,0,255),1)

            ## Model works without resizing, no need for the below bs
            # if w > 255 and h > 255:
            #     img2 = cv2.resize(img2[x:x+w, y:y+h], (256,256))
            # else:
            #     img2 = cv2.resize()
        return img


    def predict_image(self, img):
        img = Image.open(img)
        img = self.transform(img).unsqueeze(0)
        with torch.no_grad():
            output = self.model(img)
            _, predicted = torch.max(output, 1)
            predicted_label = class_labels[predicted.item()]
        # print("Predicted image:", predicted_label)
        return predicted_label
