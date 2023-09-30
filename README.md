# FaceGenVision
FaceGenVision is a web application that allows users to take pictures of themselves and then create an image of yourself in the style of Studio Ghibli.
<!-- FaceGenVision is a web application made for my dearest, Victoria. I wanted to make something for our anniversary that was special to her, which was anime. This particular project allows you to create images of yourself in the style of Studio Ghibli. You can prompt it to look like certain things or act out any scenario. Due to us being mostly mid to long distance, I wanted to make something that Victoria could use on a daily basis to make cute images of us doing things together, hence the name of the web application, which is Vix and John's Visions. Happy anniversary Vix. -->


## Technologies
This is a simple web application using the React.js framework. Flask & Python were used to deploy the backend in order to process all of the image data and handle the image creation. Using Stable Diffusion, this model is trained on Studio Ghibli images in order to generate images in that style. You can find the link to the model [here](https://huggingface.co/nitrosocke/Ghibli-Diffusion).

## Installation
This app uses Node.js and React to deploy its frontend. In your terminal, follow these steps (*note that sudo will only work for macOS or Unix):
- First do `sudo apt update`
- Type `sudo apt install nodejs` to install node
- Then enter `npm install -g npm` to install npm

We will now have to set up a virtual environment. If on an Apple Silicon device, you can create a venv with these commands:
- `sudo apt-get install python3-venv` (this is only if you don't already have venv installed)
- `python3 -m venv ~/venv-metal`
- `source ~/venv-metal/bin/activate`
- `python -m pip install -U pip`

You will also need Tensorflow. To download the appropriate version, use these commands:
- `python -m pip install tensorflow-macos`
- `python -m pip install tensorflow-metal`

You can check if Tensorflow was properly installed in your venv by typing `pip show tensorflow`

- Now download all of the necessary dependencies in this project by typing `pip install requirements.txt`. This may take a while as there some large packages being used for the inference. Please be patient.

## How to Run
Since this app is not yet hosted on a cloud, it must be run locally. First do `cd frontend` and type `npm start`. This starts the frontend and should automatically run a browser. Next in another terminal window do `cd Backend`. Then run the backend by typing `flask run`. This will take a while each time as the modules have to load and are generally very large.

## How to Use
The web app will first prompt if your camera can be used. Select allow (for obvious reasons). Then take a picture. If you do not like it, you can take another one. Once you are happy with your picture, submit it. If you correctly showed your face in the image, the web app will then prompt you to type in a prompt. To generate the image in ghibli style, type "ghibli style" into the prompt. Then click "Generate Image", and wait for the image to appear. After around a minute, the image should show up next to the image that you took. Enjoy!

