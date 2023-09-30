import React from 'react';
import './App.css';
import Button from '@mui/material/Button';
import Webcam from "react-webcam";
import axios from 'axios';

const WebcamCapture = () => {
  const webcamRef = React.useRef(null);
  const [imageSrc, setImageSrc] = React.useState(null);
  const [showCamera, setShowCamera] = React.useState(true);
  const [showPrompt, setShowPrompt] = React.useState(false);
  const [prompt, setPrompt] = React.useState('');
  const [generatedImage, setGeneratedImage] = React.useState(null);
  const [loadingProgress, setLoadingProgress] = React.useState(0); 

  const loadingBarStyle = {
    width: `${loadingProgress}%`,
    height: '5px',
    backgroundColor: 'blue',
  };

  const capture = React.useCallback(() => {
    const src = webcamRef.current.getScreenshot();
    setImageSrc(src);
    setShowCamera(false);
  }, [webcamRef, setImageSrc, setShowCamera]);

  const handleNewPhoto = () => {
    setLoadingProgress(0); // Reset loading progress
    setImageSrc(null);
    setShowCamera(true);
    setShowPrompt(false);
  };

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append('image', imageSrc);
    
    axios({
      method: 'post',
      url: 'http://127.0.0.1:5000/process_image',
      data: formData,
      headers: { 'Content-Type': 'multipart/form-data' }
    })
    .then(response => {
      if (response.status === 200) {
        setShowPrompt(true);
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
  };

  const handlePromptSubmit = () => {
    const formData = new FormData();
    formData.append('image', imageSrc);
    formData.append('prompt', prompt);

    setLoadingProgress(10); // Start loading progress

    const progressInterval = setInterval(() => {
      setLoadingProgress((prevProgress) => Math.min(prevProgress + 1, 90));
    }, 555.55);    

    axios({
      method: 'post',
      url: 'http://127.0.0.1:5000/generate_image',
      data: formData,
      headers: { 'Content-Type': 'multipart/form-data' },
      responseType: 'blob' // Specify that you want a Blob
    })
    .then(response => {
      clearInterval(progressInterval);
      setLoadingProgress(100);
      const url = window.URL.createObjectURL(new Blob([response.data]));
      setGeneratedImage(url); // Set the generated image URL
    })
    .catch(error => {
      clearInterval(progressInterval);
      console.error('Error:', error);
    });
  };

  const restartProcess = () => {
    setImageSrc(null);
    setShowCamera(true);
    setShowPrompt(false);
    setGeneratedImage(null);
    setPrompt('');
    setLoadingProgress(0);
  };


  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={loadingBarStyle}></div> {/* Loading bar */}
      {showCamera ? 
        <div>
          <Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg" />
          <Button type="submit" variant="contained" color="primary" onClick={capture}>
            Take a photo!
          </Button>
        </div>
        :
        <div>
          {imageSrc && !generatedImage && <img src={imageSrc} alt="captured" />}
          <div>
            {generatedImage && <img src={generatedImage} alt="generated" />} {/* Display the generated image */}
            {generatedImage && 
                <div style={{ marginTop: '10px' }}>
                    <a href={generatedImage} download="generated_image.jpg">
                        <Button variant="contained" color="primary">
                            Download Generated Image
                        </Button>
                    </a>
                </div>
            }
        </div>
          <div>
      {!generatedImage && showPrompt ? 
        <div>
            <input type="text" value={prompt} onChange={e => setPrompt(e.target.value)} placeholder="Enter your prompt" />
            <Button type="submit" variant="contained" color="primary" onClick={handlePromptSubmit}>
                Generate Image
            </Button>
        </div>
    : 
        <div>
            {!generatedImage && 
            <>
                <Button type="submit" variant="contained" color="primary" onClick={handleNewPhoto}>
                    Take another photo!
                </Button>
                <Button type="submit" variant="contained" color="primary" onClick={handleSubmit}>
                    Submit
                </Button>
            </>}
        </div>
    }
    {generatedImage &&
    <Button variant="contained" color="secondary" onClick={restartProcess} style={{ marginTop: '10px' }}>
        Restart Process
    </Button>}
    </div>
        </div>
      }
    </div>
  );

};

function App() {
  return (
      <div className="App">
          <h1 className="centered-title">Vix and John's Visions</h1>
          <h4 className="centered-title">Please take a photo of your lovely face</h4>
          <WebcamCapture />
      </div>
  );
}

export default App;
