import React from 'react';
import './App.css';
import Button from '@mui/material/Button';
import Webcam from "react-webcam";
import axios from 'axios';


const WebcamCapture = () => {
  const webcamRef = React.useRef(null);
  const [imageSrc, setImageSrc] = React.useState(null);
  const [showCamera, setShowCamera] = React.useState(true);

  const capture = React.useCallback(() => {
    const src = webcamRef.current.getScreenshot();
    setImageSrc(src);
    setShowCamera(false);
  }, [webcamRef, setImageSrc, setShowCamera]);

  const handleNewPhoto = () => {
    setImageSrc(null);
    setShowCamera(true);
  }

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
      console.log(response.data);
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }
  

  return (
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
      {showCamera ? 
        <div>
          <Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg" />
          <Button type="submit" variant="contained" color="primary" onClick={capture}>
            Take a photo!
          </Button>
        </div>
        :
        <div>
          {imageSrc && <img src={imageSrc} alt="captured" />}
          <Button type="submit" variant="contained" color="primary" onClick={handleNewPhoto}>
            Take another photo!
          </Button>
          <Button type="submit" variant="contained" color="primary" onClick={handleSubmit}>
            Submit
          </Button>
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

