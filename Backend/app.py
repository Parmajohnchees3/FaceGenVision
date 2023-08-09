from flask import Flask, render_template, redirect, url_for, request, jsonify
import re
import json
import ast
import os
import io
import logging
import base64
from flask_cors import CORS
from PIL import Image
from ML.facerecognizer import FaceRecognizer
from werkzeug.utils import secure_filename

app = Flask(__name__)
CORS(app, origins=["https://localhost:3000", "*"])

face_recognizer = FaceRecognizer()

logging.basicConfig(level=logging.DEBUG)

@app.route('/process_image', methods=['POST'])
def process_image():
    image_data = request.form.get('image')

    if image_data is None:
        return jsonify({"message": "No image data received"}), 400

    header, image_data = image_data.split(',', 1)

    # Decode the image from base64 and convert to PIL Image
    image_data = base64.b64decode(image_data)
    image = Image.open(io.BytesIO(image_data))

    # Call recognize_face with the image
    result = face_recognizer.recognize_face(image)

    # if result == True:
        

    # return "PICTURE RECEIVED", 200
    # if result == True:



