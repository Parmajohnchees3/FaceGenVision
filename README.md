# FaceGenVision
FaceGenVision is a web application made for my dearest, Victoria. I wanted to make something for our anniversary that was special to her, which was anime. This particular project allows you to create images of yourself in the style of Studio Ghibli. You can prompt it to look like certain things or act out any scenario. Due to us being mostly mid to long distance, I wanted to make something that Victoria could use on a daily basis to make cute images of us doing things together, hence the name of the web application, which is Vix and John's Visions. Happy anniversary Vix.


## Technologies
This is a simple web application using the React.js framework. Flask & Python were used to deploy the backend in order to process all of the image data and handle the image creation. Using Stable Diffusion, this model is trained on Studio Ghibli images in order to generate images in that style. You can find the link to the model [here](https://huggingface.co/nitrosocke/Ghibli-Diffusion).

## How to Use
The web app will first prompt if your camera can be used. Select allow (for obvious reasons). Then take a picture. If you do not like it, you can take another one. Once you are happy with your picture, submit it. If you correctly showed your face in the image, the web app will then prompt you to type in a prompt. To generate the image in ghibli style, type "ghibli style" into the prompt. Then click "Generate Image", and wait for the image to appear. After around a minute, the image should show up next to the image that you took. Enjoy!

