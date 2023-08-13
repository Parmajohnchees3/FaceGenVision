from facenet_pytorch import MTCNN, InceptionResnetV1
import torch
from torchvision import datasets
from PIL import Image


# class FaceRecognizer to load pretrained models 

class FaceRecognizer:
    def __init__(self):
        self.device = torch.device('cuda:0' if torch.cuda.is_available() else 'cpu')

        self.mtcnn = MTCNN(
            image_size=160, margin=0, min_face_size=20,
            thresholds=[0.6, 0.7, 0.7], factor=0.709, post_process=True,
            device=self.device
        )
        
        self.resnet = InceptionResnetV1(
            classify=True,
            num_classes=1,
        ).to(self.device)

        # Load trained model weights (insert the path to your trained model)
        self.resnet.load_state_dict(torch.load('/Users/johnyoo/Documents/Code Projects/VDG/Backend/ML/model_weights/model.pth'))
        self.resnet.eval()

        self.dataset = datasets.ImageFolder('/Users/johnyoo/Documents/Code Projects/VDG/Backend/data/test_images')
        self.dataset.idx_to_class = {i:c for c, i in self.dataset.class_to_idx.items()}

        self.threshold = 0.95

    def recognize_face(self, image):
        # If image is a file path, load the image
        if isinstance(image, str):
            image = Image.open(image)
        
        # Forward pass the image through MTCNN and Resnet
        img_cropped, prob = self.mtcnn(image, return_prob=True)
        
        if img_cropped is not None:
            print('Face detected with probability: {:8f}'.format(prob))
            img_cropped = img_cropped.to(self.device)

        # for now, just using face detection probability to pass check - come back to face recognition later
            if prob >= self.threshold:
                print('Face detected')
                return True
            else:
                print('Face not detected')
                return False
        else:
            print('No face detected.')
            return None