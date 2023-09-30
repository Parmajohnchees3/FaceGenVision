import torch
import requests
from PIL import Image
from io import BytesIO
from diffusers import StableDiffusionImg2ImgPipeline


class GhibliGenerator:
    def __init__(self):
        self.device = "mps"
        self.pipe = StableDiffusionImg2ImgPipeline.from_pretrained("nitrosocke/Ghibli-Diffusion", torch_dtype=torch.float32).to(
            self.device
        )

    def generate_image(self, init_image, prompt, negative_prompt="bad anatomy", output_path='output_image.jpg'):
        init_image = init_image.convert("RGB")
        init_image = init_image.resize((512, 512))
        generator = torch.Generator(device=self.device).manual_seed(1024)
        image = self.pipe(prompt=prompt, negative_prompt=negative_prompt, image=init_image, strength=0.75, guidance_scale=7.5, generator=generator).images[0]
        print("Saving to:", output_path)  # Debugging
        image.save(output_path, format='JPEG')
        return output_path
    

