from flask import Flask, render_template, redirect, url_for, request, jsonify, send_file
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
from ML.ghibli_gen import GhibliGenerator

face_recognizer = FaceRecognizer()
ghibli_generator = GhibliGenerator()

app = Flask(__name__)
CORS(app, origins=["https://localhost:3000", "*"])

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
    face_detected = face_recognizer.recognize_face(image)

    if face_detected == True:
        return "PICTURE RECEIVED", 200

@app.route('/generate_image', methods=['POST'])
def generate_image():
    image_data = request.form.get('image')
    prompt = request.form.get('prompt')
    print("Received Prompt:", prompt)

    if image_data is None:
        return jsonify({"message": "No image data received"}), 400

    header, image_data = image_data.split(',', 1)

    # Decode the image from base64 and convert to PIL Image
    image_data = base64.b64decode(image_data)
    image = Image.open(io.BytesIO(image_data))
    # negative_prompt = "bad anatomy"

    # Call GhibliGenerator with the image and prompt
    result_image = ghibli_generator.generate_image(image, prompt)

    return send_file(result_image, mimetype='image/jpeg')



